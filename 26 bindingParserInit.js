(function bindingParserInit(global, undefined) {
    "use strict";


    var strings = {
        get invalidBinding() { return WinJS.Resources._getWinJSString("base/invalidBinding").value; },
        get bindingInitializerNotFound() { return WinJS.Resources._getWinJSString("base/bindingInitializerNotFound").value; },
    };

    /*
        See comment for data-win-options attribute grammar for context.
    
        Syntactic grammar for the value of the data-win-bind attribute.
    
            BindDeclarations:
                BindDeclaration
                BindDeclarations ; BindDeclaration
    
            BindDeclaration:
                DestinationPropertyName : SourcePropertyName
                DestinationPropertyName : SourcePropertyName InitializerName
    
            DestinationPropertyName:
                IdentifierExpression
    
            SourcePropertyName:
                IdentifierExpression
    
            InitializerName:
                IdentifierExpression
    
            Value:
                NumberLiteral
                StringLiteral
    
            AccessExpression:
                [ Value ]
                . Identifier
    
            AccessExpressions:
                AccessExpression
                AccessExpressions AccessExpression
    
            IdentifierExpression:
                Identifier
                Identifier AccessExpressions
    
    */
    var lexer = WinJS.UI._optionsLexer;
    var tokenType = lexer.tokenType;
    var requireSupportedForProcessing = WinJS.Utilities.requireSupportedForProcessing;

    var BindingInterpreter = WinJS.Class.derive(WinJS.UI.optionsParser._BaseInterpreter,
        function (tokens, originalSource, context) {
            this._initialize(tokens, originalSource, context);
        },
        {
            _error: function (message) {
                throw new WinJS.ErrorFromName("WinJS.Binding.ParseError", WinJS.Resources._formatString(strings.invalidBinding, this._originalSource, message));
            },
            _evaluateInitializerName: function () {
                if (this._current.type === tokenType.identifier) {
                    var initializer = this._evaluateIdentifierExpression();
                    if (WinJS.log && !initializer) {
                        WinJS.log(WinJS.Resources._formatString(strings.bindingInitializerNotFound, this._originalSource), "winjs binding", "error");
                    }
                    return requireSupportedForProcessing(initializer);
                }
                return;
            },
            _evaluateValue: function () {
                switch (this._current.type) {
                    case tokenType.stringLiteral:
                    case tokenType.numberLiteral:
                        var value = this._current.value;
                        this._read();
                        return value;

                    default:
                        this._unexpectedToken(tokenType.stringLiteral, tokenType.numberLiteral);
                        return;
                }
            },
            _readBindDeclarations: function () {
                var bindings = [];
                while (true) {
                    switch (this._current.type) {
                        case tokenType.identifier:
                        case tokenType.thisKeyword:
                            bindings.push(this._readBindDeclaration());
                            break;

                        case tokenType.semicolon:
                            this._read();
                            break;

                        case tokenType.eof:
                            return bindings;

                        default:
                            this._unexpectedToken(tokenType.identifier, tokenType.semicolon, tokenType.eof);
                            return;
                    }
                }
            },
            _readBindDeclaration: function () {
                var dest = this._readDestinationPropertyName();
                this._read(tokenType.colon);
                var src = this._readSourcePropertyName();
                var initializer = this._evaluateInitializerName();
                return {
                    destination: dest,
                    source: src,
                    initializer: initializer
                };
            },
            _readDestinationPropertyName: function () {
                return this._readIdentifierExpression();
            },
            _readSourcePropertyName: function () {
                return this._readIdentifierExpression();
            },
            run: function () {
                return this._readBindDeclarations();
            }
        }, {
            supportedForProcessing: false,
        }
    );

    function parser(text, context) {
        msWriteProfilerMark("WinJS.Binding:bindingParser,StartTM");
        var tokens = lexer(text);
        var interpreter = new BindingInterpreter(tokens, text, context || {});
        var res = interpreter.run();
        msWriteProfilerMark("WinJS.Binding:bindingParser,StopTM");
        return res;
    }

    WinJS.Namespace.define("WinJS.Binding", {
        _bindingParser: parser
    });

})(this);

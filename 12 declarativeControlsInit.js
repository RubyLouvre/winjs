(function declarativeControlsInit(global, WinJS, undefined) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    var strings = {
        get errorActivatingControl() { return WinJS.Resources._getWinJSString("base/errorActivatingControl").value; },
    };

    var markSupportedForProcessing = WinJS.Utilities.markSupportedForProcessing;
    var requireSupportedForProcessing = WinJS.Utilities.requireSupportedForProcessing;
    var processedAllCalled = false;

    function createSelect(element) {
        var result = function select(selector) {
            /// <signature helpKeyword="WinJS.UI.select.createSelect">
            /// <summary locid="WinJS.UI.select.createSelect">
            /// Walks the DOM tree from the given  element to the root of the document, whenever
            /// a selector scope is encountered select performs a lookup within that scope for
            /// the given selector string. The first matching element is returned.
            /// </summary>
            /// <param name="selector" type="String" locid="WinJS.UI.select.createSelect_p:selector">The selector string.</param>
            /// <returns type="HTMLElement" domElement="true" locid="WinJS.UI.select.createSelect_returnValue">The target element, if found.</returns>
            /// </signature>
            var current = element;
            var selected;
            while (current) {
                if (current.msParentSelectorScope) {
                    var scope = current.parentNode;
                    if (scope) {
                        // In order to be inclusive of the scope in the lookup we do a QSA across
                        // the parent of the scope and see if this scope is in the list.
                        var scopeParent = scope.parentNode;
                        if (scopeParent && -1 !== Array.prototype.indexOf.call(scopeParent.querySelectorAll(selector), scope)) {
                            selected = scope;
                        }
                        if (selected = selected || scope.querySelector(selector)) {
                            break;
                        }
                    }
                }
                current = current.parentNode;
            }

            return selected || document.querySelector(selector);
        }
        return markSupportedForProcessing(result);
    }

    function activate(element, handler) {
        return new WinJS.Promise(function activate2(complete, error) {
            try {
                var options;
                var optionsAttribute = element.getAttribute("data-win-options");
                if (optionsAttribute) {
                    options = WinJS.UI.optionsParser(optionsAttribute, global, {
                        select: createSelect(element)
                    });
                }

                var ctl;
                var count = 1;

                // handler is required to call complete if it takes that parameter
                //
                if (handler.length > 2) {
                    count++;
                }
                var checkComplete = function checkComplete() {
                    count--;
                    if (count === 0) {
                        element.winControl = element.winControl || ctl;
                        complete(ctl);
                    }
                };

                // async exceptions from the handler get dropped on the floor...
                //
                ctl = new handler(element, options, checkComplete);
                checkComplete();
            }
            catch (err) {
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.errorActivatingControl, err && err.message), "winjs controls", "error");
                error(err);
            }
        });
    };

    function processAllImpl(rootElement) {
        return new WinJS.Promise(function processAllImpl2(complete, error) {
            msWriteProfilerMark("WinJS.UI:processAll,StartTM");
            rootElement = rootElement || document.body;
            var pending = 0;
            var selector = "[data-win-control]";
            var allElements = rootElement.querySelectorAll(selector);
            var elements = [];
            if (getControlHandler(rootElement)) {
                elements.push(rootElement);
            }
            for (var i = 0, len = allElements.length; i < len; i++) {
                elements.push(allElements[i]);
            }

            // bail early if there is nothing to process
            //
            if (elements.length === 0) { complete(rootElement); return; }

            var checkAllComplete = function () {
                pending = pending - 1;
                if (pending < 0) {
                    msWriteProfilerMark("WinJS.UI:processAll,StopTM");
                    complete(rootElement);
                }
            }

            // First go through and determine which elements to activate
            //
            var controls = new Array(elements.length);
            for (var i = 0, len = elements.length; i < len; i++) {
                var element = elements[i];
                var control;
                var instance = element.winControl;
                if (instance) {
                    control = instance.constructor;
                    // already activated, don't need to add to controls array
                }
                else {
                    controls[i] = control = getControlHandler(element);
                }
                if (control && control.isDeclarativeControlContainer) {
                    i += element.querySelectorAll(selector).length;
                }
            }

            // Now go through and activate those
            //
            msWriteProfilerMark("WinJS.UI:processAllActivateControls,StartTM");
            for (var i = 0, len = elements.length; i < len; i++) {
                var ctl = controls[i];
                if (ctl) {
                    pending++;
                    activate(elements[i], ctl).then(checkAllComplete, error);
                }
            }
            msWriteProfilerMark("WinJS.UI:processAllActivateControls,StopTM");

            checkAllComplete();
        });
    };

    function getControlHandler(element) {
        if (element.getAttribute) {
            var evaluator = element.getAttribute("data-win-control");
            if (evaluator) {
                return WinJS.Utilities._getMemberFiltered(evaluator.trim(), global, requireSupportedForProcessing);
            }
        }
    };

    WinJS.Namespace.define("WinJS.UI", {

        scopedSelect: function (selector, element) {
            /// <signature helpKeyword="WinJS.UI.scopedSelect">
            /// <summary locid="WinJS.UI.scopedSelect">
            /// Walks the DOM tree from the given  element to the root of the document, whenever
            /// a selector scope is encountered select performs a lookup within that scope for
            /// the given selector string. The first matching element is returned.
            /// </summary>
            /// <param name="selector" type="String" locid="WinJS.UI.scopedSelect_p:selector">The selector string.</param>
            /// <returns type="HTMLElement" domElement="true" locid="WinJS.UI.scopedSelect_returnValue">The target element, if found.</returns>
            /// </signature>
            return createSelect(element)(selector);
        },

        processAll: function (rootElement) {
            /// <signature helpKeyword="WinJS.UI.processAll">
            /// <summary locid="WinJS.UI.processAll">
            /// Applies declarative control binding to all elements, starting at the specified root element.
            /// </summary>
            /// <param name="rootElement" type="Object" domElement="true" locid="WinJS.UI.processAll_p:rootElement">
            /// The element at which to start applying the binding. If this parameter is not specified, the binding is applied to the entire document.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.UI.processAll_returnValue">
            /// A promise that is fulfilled when binding has been applied to all the controls.
            /// </returns>
            /// </signature>

            if (!processedAllCalled) {
                return WinJS.Utilities.ready().then(function () {
                    processedAllCalled = true;
                    return processAllImpl(rootElement);
                });
            }
            else {
                return processAllImpl(rootElement);
            }
        },

        process: function (element) {
            /// <signature helpKeyword="WinJS.UI.process">
            /// <summary locid="WinJS.UI.process">
            /// Applies declarative control binding to the specified element.
            /// </summary>
            /// <param name="element" type="Object" domElement="true" locid="WinJS.UI.process_p:element">
            /// The element to bind.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.UI.process_returnValue">
            /// A promise that is fulfilled after the control is activated. The value of the
            /// promise is the control that is attached to element.
            /// </returns>
            /// </signature>

            if (element && element.winControl) {
                return WinJS.Promise.as(element.winControl);
            }
            var handler = getControlHandler(element);
            if (!handler) {
                return WinJS.Promise.as(); // undefined, no handler
            }
            else {
                return activate(element, handler);
            }
        }
    });
})(this, WinJS);
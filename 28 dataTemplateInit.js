(function dataTemplateInit(WinJS, undefined) {
    "use strict";

    var markSupportedForProcessing = WinJS.Utilities.markSupportedForProcessing;

    WinJS.Namespace.define("WinJS.Binding", {

        /// <summary locid="WinJS.Binding.Template">
        /// Provides a reusable declarative binding element.
        /// </summary>
        /// <name locid="WinJS.Binding.Template_name">Template</name>
        /// <htmlSnippet supportsContent="true"><![CDATA[<div data-win-control="WinJS.Binding.Template"><div>Place content here</div></div>]]></htmlSnippet>
        /// <icon src="base_winjs.ui.template.12x12.png" width="12" height="12" />
        /// <icon src="base_winjs.ui.template.16x16.png" width="16" height="16" />
        /// <resource type="javascript" src="//Microsoft.WinJS.1.0/js/base.js" shared="true" />
        /// <resource type="css" src="//Microsoft.WinJS.1.0/css/ui-dark.css" shared="true" />
        Template: WinJS.Class.define(
            function Template_ctor(element, options) {
                /// <signature helpKeyword="WinJS.Binding.Template.Template">
                /// <summary locid="WinJS.Binding.Template.constructor">
                /// Creates a template that provides a reusable declarative binding element.
                /// </summary>
                /// <param name="element" type="DOMElement" locid="WinJS.Binding.Template.constructor_p:element">
                /// The DOM element to convert to a template.
                /// </param>
                /// <param name="options" type="{href:String}" optional="true" locid="WinJS.Binding.Template.constructor_p:options">
                /// If this parameter is supplied, the template is loaded from the URI and
                /// the content of the element parameter is ignored.
                /// </param>
                /// </signature>

                msWriteProfilerMark("WinJS.Binding:newTemplate,StartTM");

                this._element = element = element || document.createElement("div");
                var that = this;
                if (element) {
                    element.renderItem = function (item, recycled) { return that.renderItem(item, recycled); };
                }
                if (options) {
                    this.href = options.href;
                    this.enableRecycling = !!options.enableRecycling;
                    if (options.processTimeout) {
                        this.processTimeout = options.processTimeout;
                    }
                }
                if (!this.href) {
                    this.element.style.display = "none";
                }
                this.bindingCache = { expressions: {} };

                msWriteProfilerMark("WinJS.Binding:newTemplate,StopTM");
            },
            {
                /// <field type="Number" integer="true" locid="WinJS.Binding.Template.processTimeout" helpKeyword="WinJS.Binding.Template.processTimeout">
                /// Number of milliseconds to delay instantiating declarative controls. Zero (0) will result in no delay, any negative number
                /// will result in a setImmediate delay, any positive number will be treated as the number of milliseconds.
                /// </field>
                processTimeout: 0,

                /// <field type="HTMLElement" domElement="true" hidden="true" locid="WinJS.Binding.Template.element" helpKeyword="WinJS.Binding.Template.element">
                /// Gets the DOM element that is used as the template.
                /// </field>
                element: {
                    get: function () { return this._element; },
                },

                renderItem: function (item, recycled) {
                    /// <signature helpKeyword="WinJS.Binding.Template.renderItem">
                    /// <summary locid="WinJS.Binding.Template.renderItem">
                    /// Renders an instance of this template bound to the data contained in item. If
                    /// the recycled parameter is present, and enableRecycling is true, then the template attempts
                    /// to reuse the DOM elements from the recycled parameter.
                    /// </summary>
                    /// <param name="item" type="Object" optional="false" locid="WinJS.Binding.Template.renderItem_p:item">
                    /// The object that contains the data to bind to. Only item.data is required.
                    /// </param>
                    /// <param name="recycled" type="DOMElement" optional="true" locid="WinJS.Binding.Template.renderItem_p:recycled">
                    /// A previously-generated template instance.
                    /// </param>
                    /// <returns type="DOMElement" locid="WinJS.Binding.Template.renderItem_returnValue">
                    /// The DOM element.
                    /// </returns>
                    /// </signature>
                    var that = this;

                    // we only enable element cache when we are trying
                    // to recycle. Otherwise our element cache would
                    // grow unbounded.
                    //
                    if (this.enableRecycling && !this.bindingCache.elements) {
                        this.bindingCache.elements = {};
                    }

                    if (this.enableRecycling
                        && recycled
                        && recycled.msOriginalTemplate === this) {

                        // If we are asked to recycle, we cleanup any old work no matter what
                        //
                        var cacheEntry = this.bindingCache.elements[recycled.id];
                        var okToReuse = true;
                        if (cacheEntry) {
                            cacheEntry.bindings.forEach(function (v) { v(); });
                            cacheEntry.bindings = [];
                            okToReuse = !cacheEntry.nocache;
                        }

                        // If our cache indicates that we hit a non-cancelable thing, then we are
                        // in an unknown state, so we actually can't recycle the tree. We have
                        // cleaned up what we can, but at this point we need to reset and create
                        // a new tree.
                        //
                        if (okToReuse) {
                            // Element recycling requires that there be no other content in "recycled" other than this
                            // templates' output.
                            //
                            var renderComplete = WinJS.Promise.as(item).then(function (i) {
                                WinJS.Binding.processAll(recycled, i.data, true, that.bindingCache);
                            });
                            return { element: recycled, renderComplete: renderComplete };
                        }
                    }

                    var render = this._renderImpl(item.then(function (i) { return i.data; }));
                    render.element = render.element.then(function (e) { e.msOriginalTemplate = that; return e; });
                    return render;
                },

                render: function (dataContext, container) {
                    /// <signature helpKeyword="WinJS.Binding.Template.render">
                    /// <summary locid="WinJS.Binding.Template.render">
                    /// Binds values from the specified data context to elements that are descendents of the specified root element
                    /// and have the declarative binding attributes (data-win-bind).
                    /// </summary>
                    /// <param name="dataContext" type="Object" optional="true" locid="WinJS.Binding.Template.render_p:dataContext">
                    /// The object to use for default data binding.
                    /// </param>
                    /// <param name="container" type="DOMElement" optional="true" locid="WinJS.Binding.Template.render_p:container">
                    /// The element to which to add this rendered template. If this parameter is omitted, a new DIV is created.
                    /// </param>
                    /// <returns type="WinJS.Promise" locid="WinJS.Binding.Template.render_returnValue">
                    /// A promise that is completed after binding has finished. The value is
                    /// either the element specified in the container parameter or the created DIV.
                    /// </returns>
                    /// </signature>

                    var render = this._renderImpl(dataContext, container);
                    return render.element.then(function () { return render.renderComplete; });
                },
                _renderImpl: function (dataContext, container) {
                    msWriteProfilerMark("WinJS.Binding:templateRender,StartTM");

                    var d = container || document.createElement("div");
                    WinJS.Utilities.addClass(d, "win-template");
                    WinJS.Utilities.addClass(d, "win-loading");
                    var that = this;
                    function done() {
                        WinJS.Utilities.removeClass(d, "win-loading");
                        msWriteProfilerMark("WinJS.Binding:templateRender,StopTM");
                        return d;
                    }
                    var initial = d.children.length;
                    var element = WinJS.UI.Fragments.renderCopy(that.href || that.element, d);
                    var renderComplete = element.
                        then(function Template_renderImpl_renderComplete_then() {
                            var work;
                            // If no existing children, we can do the faster path of just calling
                            // on the root element...
                            //
                            if (initial === 0) {
                                work = function (f, a, b, c) { return f(d, a, b, c); };
                            }
                                // We only grab the newly added nodes (always at the end)
                                // and in the common case of only adding a single new element
                                // we avoid the "join" overhead
                                //
                            else {
                                var all = d.children;
                                if (all.length === initial + 1) {
                                    work = function (f, a, b, c) { return f(all[initial], a, b, c); };
                                }
                                else {
                                    // we have to capture the elements first, in case
                                    // doing the work affects the children order/content
                                    //
                                    var elements = [];
                                    for (var i = initial, l = all.length; i < l; i++) {
                                        elements.push(all[i]);
                                    }
                                    work = function (f, a, b, c) {
                                        var join = [];
                                        elements.forEach(function (e) {
                                            join.push(f(e, a, b, c));
                                        });
                                        return WinJS.Promise.join(join);
                                    };
                                }
                            }

                            var child = d.firstElementChild;
                            while (child) {
                                child.msParentSelectorScope = true;
                                child = child.nextElementSibling;
                            }

                            // This allows "0" to mean no timeout (at all) and negative values
                            // mean setImmediate (no setTimeout). Since Promise.timeout uses
                            // zero to mean setImmediate, we have to coerce.
                            //
                            var timeout = that.processTimeout;
                            function complete() {
                                return work(WinJS.UI.processAll).
                                    then(function () {
                                        return dataContext;
                                    }).
                                    then(function Template_renderImpl_Binding_processAll(data) {
                                        // !initial -- skipRoot when we do process on the container
                                        return work(WinJS.Binding.processAll, data, !initial, that.bindingCache);
                                    });
                            }
                            if (timeout) {
                                if (timeout < 0) { timeout = 0; }
                                return WinJS.Promise.timeout(timeout).then(complete);
                            }
                            else {
                                return complete();
                            }
                        }).then(done, function (err) { done(); return WinJS.Promise.wrapError(err); });

                    return { element: element, renderComplete: renderComplete };
                }
            }
        )
    });

    markSupportedForProcessing(WinJS.Binding.Template.prototype.render);

    Object.defineProperties(WinJS.Binding.Template, {
        isDeclarativeControlContainer: { value: true, writable: false, configurable: false },
        render: {
            value: function (href, dataContext, container) {
                /// <signature helpKeyword="WinJS.Binding.Template.render.value">
                /// <summary locid="WinJS.Binding.Template.render.value">
                /// Renders a template based on a URI.
                /// </summary>
                /// <param name="href" type="String" locid="WinJS.Binding.Template.render.value_p:href">
                /// The URI from which to load the template.
                /// </param>
                /// <param name="dataContext" type="Object" optional="true" locid="WinJS.Binding.Template.render.value_p:dataContext">
                /// The object to use for default data binding.
                /// </param>
                /// <param name="container" type="DOMElement" optional="true" locid="WinJS.Binding.Template.render.value_p:container">
                /// The element to which to add this rendered template. If this parameter is omitted, a new DIV is created.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Binding.Template.render.value_returnValue">
                /// A promise that is completed after binding has finished. The value is
                /// either the object in the container parameter or the created DIV.
                /// </returns>
                /// </signature>
                return new WinJS.Binding.Template(null, { href: href }).render(dataContext, container);
            }
        }
    });

    if (WinJS.Utilities && WinJS.Utilities.QueryCollection) {
        WinJS.Class.mix(WinJS.Utilities.QueryCollection, {
            template: function (templateElement, data, renderDonePromiseCallback) {
                /// <signature helpKeyword="WinJS.Utilities.QueryCollection.template">
                /// <summary locid="WinJS.Utilities.QueryCollection.template">
                /// Renders a template that is bound to the given data
                /// and parented to the elements included in the QueryCollection.
                /// If the QueryCollection contains multiple elements, the template
                /// is rendered multiple times, once at each element in the QueryCollection
                /// per item of data passed.
                /// </summary>
                /// <param name="templateElement" type="DOMElement" locid="WinJS.Utilities.QueryCollection.template_p:templateElement">
                /// The DOM element to which the template control is attached to.
                /// </param>
                /// <param name="data" type="Object" locid="WinJS.Utilities.QueryCollection.template_p:data">
                /// The data to render. If the data is an array (or any other object
                /// that has a forEach method) then the template is rendered
                /// multiple times, once for each item in the collection.
                /// </param>
                /// <param name="renderDonePromiseCallback" type="Function" locid="WinJS.Utilities.QueryCollection.template_p:renderDonePromiseCallback">
                /// If supplied, this function is called
                /// each time the template gets rendered, and is passed a promise
                /// that is fulfilled when the template rendering is complete.
                /// </param>
                /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.template_returnValue">
                /// The QueryCollection.
                /// </returns>
                /// </signature>
                if (templateElement instanceof WinJS.Utilities.QueryCollection) {
                    templateElement = templateElement[0];
                }
                var template = templateElement.winControl;

                if (data === null || data === undefined || !data.forEach) {
                    data = [data];
                }

                renderDonePromiseCallback = renderDonePromiseCallback || function () { };

                var that = this;
                var donePromises = [];
                data.forEach(function (datum) {
                    that.forEach(function (element) {
                        donePromises.push(template.render(datum, element));
                    });
                });
                renderDonePromiseCallback(WinJS.Promise.join(donePromises));

                return this;
            }
        });
    }

})(WinJS);

(function declarativeInit(WinJS, global, undefined) {
    "use strict";

    var uid = (Math.random() * 1000) >> 0;

    var optimizeBindingReferences = false;

    var strings = {
        get attributeBindingSingleProperty() { return WinJS.Resources._getWinJSString("base/attributeBindingSingleProperty").value; },
        get cannotBindToThis() { return WinJS.Resources._getWinJSString("base/cannotBindToThis").value; },
        get creatingNewProperty() { return WinJS.Resources._getWinJSString("base/creatingNewProperty").value; },
        get dataSourceNotFound() { return WinJS.Resources._getWinJSString("base/dataSourceNotFound").value; },
        get duplicateBindingDetected() { return WinJS.Resources._getWinJSString("base/duplicateBindingDetected").value; },
        get elementNotFound() { return WinJS.Resources._getWinJSString("base/elementNotFound").value; },
        get errorInitializingBindings() { return WinJS.Resources._getWinJSString("base/errorInitializingBindings").value; },
        get propertyDoesNotExist() { return WinJS.Resources._getWinJSString("base/propertyDoesNotExist").value; },
        get idBindingNotSupported() { return WinJS.Resources._getWinJSString("base/idBindingNotSupported").value; },
        get nestedDOMElementBindingNotSupported() { return WinJS.Resources._getWinJSString("base/nestedDOMElementBindingNotSupported").value; }
    }

    var markSupportedForProcessing = WinJS.Utilities.markSupportedForProcessing;
    var requireSupportedForProcessing = WinJS.Utilities.requireSupportedForProcessing;

    function registerAutoDispose(bindable, callback) {
        var d = bindable._autoDispose;
        d && d.push(callback);
    }
    function autoDispose(bindable) {
        bindable._autoDispose = (bindable._autoDispose || []).filter(function (callback) { return callback(); });
    }

    function inContainer(baseElement, control, start) {
        if (control && control.constructor.isDeclarativeControlContainer) { return true; }
        if (start && start !== baseElement && start.parentNode && start.parentNode !== baseElement) {
            start = start.parentNode;
            return inContainer(baseElement, start.winControl, start);
        }
        return false;
    }

    function checkBindingToken(element, bindingId) {
        if (element) {
            if (element.winBindingToken === bindingId) {
                return element;
            }
            else {
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.duplicateBindingDetected, element.id), "winjs binding", "error");
            }
        }
        else {
            return element;
        }
    }

    function setBindingToken(element) {
        if (element.winBindingToken) {
            return element.winBindingToken;
        }

        var bindingToken = "_win_bind" + (uid++);
        Object.defineProperty(element, "winBindingToken", { configurable: false, writable: false, enumerable: false, value: bindingToken });
        return bindingToken;
    }

    function initializerOneBinding(bind, ref, bindingId, source, e, pend, cacheEntry) {
        var initializer = bind.initializer;
        if (initializer) {
            initializer = initializer.winControl || initializer["data-win-control"] || initializer;
        }
        if (initializer instanceof Function) {
            var result = initializer(source, bind.source, e, bind.destination);

            if (cacheEntry) {
                if (result && result.cancel) {
                    cacheEntry.bindings.push(function () { result.cancel(); });
                }
                else {
                    // notify the cache that we encountered an uncancellable thing
                    //
                    cacheEntry.nocache = true;
                }
            }
            return result;
        }
        else if (initializer && initializer.render) {
            pend.count++;

            // notify the cache that we encountered an uncancellable thing
            //
            if (cacheEntry) {
                cacheEntry.nocache = true;
            }

            requireSupportedForProcessing(initializer.render).call(initializer, getValue(source, bind.source), e).
                then(function () {
                    pend.checkComplete();
                });
        }
    }

    function makeBinding(ref, bindingId, pend, bindable, bind, cacheEntry) {
        var first = true;
        var bindResult;
        var canceled = false;

        autoDispose(bindable);

        var resolveWeakRef = function () {
            if (canceled) { return; }

            var found = checkBindingToken(WinJS.Utilities._getWeakRefElement(ref), bindingId);
            if (!found) {
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.elementNotFound, ref), "winjs binding", "info");
                if (bindResult) {
                    bindResult.cancel();
                }
            }
            return found;
        }
        var bindingAction = function (v) {
            var found = resolveWeakRef();
            if (found) {
                nestedSet(found, bind.destination, v);
            }
            if (first) {
                pend.checkComplete();
                first = false;
            }
        };
        registerAutoDispose(bindable, resolveWeakRef);

        bindResult = bindWorker(bindable, bind.source, bindingAction);
        if (bindResult) {
            var cancel = bindResult.cancel;
            bindResult.cancel = function () {
                canceled = true;
                return cancel.call(bindResult);
            };
            if (cacheEntry) {
                cacheEntry.bindings.push(function () { bindResult.cancel(); });
            }
        }

        return bindResult;
    }

    function sourceOneBinding(bind, ref, bindingId, source, e, pend, cacheEntry) {
        var bindable;
        if (source !== global) {
            source = WinJS.Binding.as(source);
        }
        if (source._getObservable) {
            bindable = source._getObservable();
        }
        if (bindable) {
            pend.count++;
            // declarative binding must use a weak ref to the target element
            //
            return makeBinding(ref, bindingId, pend, bindable, bind, cacheEntry);
        }
        else {
            nestedSet(e, bind.destination, getValue(source, bind.source));
        }
    }

    function filterIdBinding(declBind, bindingStr) {
        for (var bindIndex = declBind.length - 1; bindIndex >= 0; bindIndex--) {
            var bind = declBind[bindIndex];
            var dest = bind.destination;
            if (dest.length === 1 && dest[0] === "id") {
                if (WinJS.validation) {
                    throw new WinJS.ErrorFromName("WinJS.Binding.IdBindingNotSupported", WinJS.Resources._formatString(strings.idBindingNotSupported, bindingStr));
                }
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.idBindingNotSupported, bindingStr), "winjs binding", "error");
                declBind.splice(bindIndex, 1);
            }
        }
        return declBind;
    }

    function calcBinding(bindingStr, bindingCache) {
        if (bindingCache) {
            var declBindCache = bindingCache.expressions[bindingStr];
            var declBind;
            if (!declBindCache) {
                declBind = filterIdBinding(WinJS.Binding._bindingParser(bindingStr, global), bindingStr);
                bindingCache.expressions[bindingStr] = declBind;
            }
            if (!declBind) {
                declBind = declBindCache;
            }
            return declBind;
        }
        else {
            return filterIdBinding(WinJS.Binding._bindingParser(bindingStr, global), bindingStr);
        }
    }

    function declarativeBindImpl(rootElement, dataContext, skipRoot, bindingCache, c, e, p) {
        msWriteProfilerMark("WinJS.Binding:processAll,StartTM");

        var pend = {
            count: 0,
            checkComplete: function checkComplete() {
                this.count--;
                if (this.count === 0) {
                    msWriteProfilerMark("WinJS.Binding:processAll,StopTM");
                    c();
                }
            }
        };
        var baseElement = (rootElement || document.body);
        var attr = "data-win-bind"
        var elements = baseElement.querySelectorAll("[" + attr + "]");
        var neg;
        if (!skipRoot && baseElement.getAttribute(attr)) {
            neg = baseElement;
        }

        pend.count++;
        var source = dataContext || global;

        WinJS.Utilities._DOMWeakRefTable_fastLoadPath = true;
        try {
            for (var i = (neg ? -1 : 0), l = elements.length; i < l; i++) {
                var element = i < 0 ? neg : elements[i];
                // If this element is inside of a declarative control container
                // (e.g. WinJS.Binding.Template) then we don't process it.
                //
                if (inContainer(baseElement, element.winControl, element)) {
                    continue;
                }
                var original = element.getAttribute(attr);
                var declBind = calcBinding(original, bindingCache);

                if (!declBind.implemented) {
                    for (var bindIndex = 0, bindLen = declBind.length; bindIndex < bindLen; bindIndex++) {
                        var bind = declBind[bindIndex];
                        if (bind.initializer) {
                            bind.implementation = initializerOneBinding;
                        }
                        else {
                            bind.implementation = sourceOneBinding;
                        }
                    }
                    declBind.implemented = true;
                }

                pend.count++;

                var ref = element.id;
                var bindingId = setBindingToken(element);

                if (!ref) {
                    // We use our own counter here, as the IE "uniqueId" is only
                    // global to a document, which means that binding against
                    // unparented DOM elements would get duplicate IDs.
                    //
                    // The elements may not be parented at this point, but they
                    // will be parented by the time the binding action is fired.
                    //
                    if (optimizeBindingReferences) {
                        ref = bindingId;
                    } else {
                        element.id = ref = bindingId;
                    }
                }
                WinJS.Utilities._createWeakRef(element, ref);
                var elementData = WinJS.Utilities.data(element);
                elementData.winBindings = null;
                var cacheEntry;
                if (bindingCache && bindingCache.elements) {
                    cacheEntry = bindingCache.elements[ref];
                    if (!cacheEntry) {
                        bindingCache.elements[ref] = cacheEntry = { bindings: [] };
                    }
                }

                for (var bindIndex2 = 0, bindLen2 = declBind.length; bindIndex2 < bindLen2; bindIndex2++) {
                    var bind2 = declBind[bindIndex2];
                    var cancel2 = bind2.implementation(bind2, ref, bindingId, source, element, pend, cacheEntry);
                    if (cancel2) {
                        elementData.winBindings = elementData.winBindings || [];
                        elementData.winBindings.push(cancel2);
                    }
                }
                pend.count--;
            }
        }
        finally {
            WinJS.Utilities._DOMWeakRefTable_fastLoadPath = false;
        }
        pend.checkComplete();
    }

    function declarativeBind(rootElement, dataContext, skipRoot, bindingCache) {
        /// <signature helpKeyword="WinJS.Binding.declarativeBind">
        /// <summary locid="WinJS.Binding.declarativeBind">
        /// Binds values from the specified data context to elements that are descendants of the specified root element
        /// and have declarative binding attributes (data-win-bind).
        /// </summary>
        /// <param name="rootElement" type="DOMElement" optional="true" locid="WinJS.Binding.declarativeBind_p:rootElement">
        /// The element at which to start traversing to find elements to bind to. If this parameter is omitted, the entire document
        /// is searched.
        /// </param>
        /// <param name="dataContext" type="Object" optional="true" locid="WinJS.Binding.declarativeBind_p:dataContext">
        /// The object to use for default data binding.
        /// </param>
        /// <param name="skipRoot" type="Boolean" optional="true" locid="WinJS.Binding.declarativeBind_p:skipRoot">
        /// If true, the elements to be bound skip the specified root element and include only the children.
        /// </param>
        /// <param name="bindingCache" locid="WinJS.Binding.declarativeBind_p:bindingCache">
        /// The cached binding data.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Binding.declarativeBind_returnValue">
        /// A promise that completes when each item that contains binding declarations has
        /// been processed and the update has started.
        /// </returns>
        /// </signature>

        return new WinJS.Promise(function (c, e, p) {
            declarativeBindImpl(rootElement, dataContext, skipRoot, bindingCache, c, e, p);
        }).then(null, function (e) {
            WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.errorInitializingBindings, e && e.message), "winjs binding", "error");
            return WinJS.Promise.wrapError(e);
        });
    }

    function converter(convert) {
        /// <signature helpKeyword="WinJS.Binding.converter">
        /// <summary locid="WinJS.Binding.converter">
        /// Creates a default binding initializer for binding between a source
        /// property and a destination property with a provided converter function
        /// that is executed on the value of the source property.
        /// </summary>
        /// <param name="convert" type="Function" locid="WinJS.Binding.converter_p:convert">
        /// The conversion that operates over the result of the source property
        /// to produce a value that is set to the destination property.
        /// </param>
        /// <returns type="Function" locid="WinJS.Binding.converter_returnValue">
        /// The binding initializer.
        /// </returns>
        /// </signature>
        var userConverter = function (source, sourceProperties, dest, destProperties) {
            var ref = dest.id;
            var bindingId = setBindingToken(dest);

            if (!ref) {
                uid++;
                if (optimizeBindingReferences) {
                    ref = bindingId;
                } else {
                    dest.id = ref = bindingId;
                }
            }
            WinJS.Utilities._createWeakRef(dest, ref);

            var workerResult = bindWorker(WinJS.Binding.as(source), sourceProperties, function (v) {
                var found = checkBindingToken(WinJS.Utilities._getWeakRefElement(ref), bindingId);
                if (found) {
                    nestedSet(found, destProperties, convert(requireSupportedForProcessing(v)));
                }
                else if (workerResult) {
                    WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.elementNotFound, ref), "winjs binding", "info");
                    workerResult.cancel();
                }
            });

            return workerResult;
        };
        return markSupportedForProcessing(userConverter);
    }

    function getValue(obj, path) {
        if (obj !== global) {
            obj = requireSupportedForProcessing(obj);
        }
        if (path) {
            for (var i = 0, len = path.length; i < len && (obj !== null && obj !== undefined) ; i++) {
                obj = requireSupportedForProcessing(obj[path[i]]);
            }
        }
        return obj;
    }

    function nestedSet(dest, destProperties, v) {
        requireSupportedForProcessing(v);
        dest = requireSupportedForProcessing(dest);
        for (var i = 0, len = (destProperties.length - 1) ; i < len; i++) {
            dest = requireSupportedForProcessing(dest[destProperties[i]]);
            if (!dest) {
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.propertyDoesNotExist, destProperties[i], destProperties.join(".")), "winjs binding", "error");
                return;
            }
            else if (dest instanceof Node) {
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.nestedDOMElementBindingNotSupported, destProperties[i], destProperties.join(".")), "winjs binding", "error");
                return;
            }
        }
        if (destProperties.length === 0) {
            WinJS.log && WinJS.log(strings.cannotBindToThis, "winjs binding", "error");
            return;
        }
        var prop = destProperties[destProperties.length - 1];
        if (WinJS.log) {
            if (dest[prop] === undefined) {
                WinJS.log(WinJS.Resources._formatString(strings.creatingNewProperty, prop, destProperties.join(".")), "winjs binding", "warn");
            }
        }
        dest[prop] = v;
    }

    function attributeSet(dest, destProperties, v) {
        dest = requireSupportedForProcessing(dest);
        if (!destProperties || destProperties.length !== 1 || !destProperties[0]) {
            WinJS.log && WinJS.log(strings.attributeBindingSingleProperty, "winjs binding", "error");
            return;
        }
        dest.setAttribute(destProperties[0], v);
    }

    function setAttribute(source, sourceProperties, dest, destProperties) {
        /// <signature helpKeyword="WinJS.Binding.setAttribute">
        /// <summary locid="WinJS.Binding.setAttribute">
        /// Creates a one-way binding between the source object and
        /// an attribute on the destination element.
        /// </summary>
        /// <param name="source" type="Object" locid="WinJS.Binding.setAttribute_p:source">
        /// The source object.
        /// </param>
        /// <param name="sourceProperties" type="Array" locid="WinJS.Binding.setAttribute_p:sourceProperties">
        /// The path on the source object to the source property.
        /// </param>
        /// <param name="dest" type="Object" locid="WinJS.Binding.setAttribute_p:dest">
        /// The destination object (must be a DOM element).
        /// </param>
        /// <param name="destProperties" type="Array" locid="WinJS.Binding.setAttribute_p:destProperties">
        /// The path on the destination object to the destination property, this must be a single name.
        /// </param>
        /// <returns type="{ cancel: Function }" locid="WinJS.Binding.setAttribute_returnValue">
        /// An object with a cancel method that is used to coalesce bindings.
        /// </returns>
        /// </signature>

        var ref = dest.id;
        var bindingId = setBindingToken(dest);

        if (!ref) {
            uid++;
            if (optimizeBindingReferences) {
                ref = bindingId;
            } else {
                dest.id = ref = bindingId;
            }
        }
        WinJS.Utilities._createWeakRef(dest, ref);

        var workerResult = bindWorker(WinJS.Binding.as(source), sourceProperties, function (v) {
            var found = checkBindingToken(WinJS.Utilities._getWeakRefElement(ref), bindingId);
            if (found) {
                attributeSet(found, destProperties, requireSupportedForProcessing(v));
            }
            else if (workerResult) {
                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.elementNotFound, ref), "winjs binding", "info");
                workerResult.cancel();
            }
        });

        return workerResult;
    }
    function setAttributeOneTime(source, sourceProperties, dest, destProperties) {
        /// <signature helpKeyword="WinJS.Binding.setAttributeOneTime">
        /// <summary locid="WinJS.Binding.setAttributeOneTime">
        /// Sets an attribute on the destination element to the value of the source property
        /// </summary>
        /// <param name="source" type="Object" locid="WinJS.Binding.setAttributeOneTime_p:source">
        /// The source object.
        /// </param>
        /// <param name="sourceProperties" type="Array" locid="WinJS.Binding.setAttributeOneTime_p:sourceProperties">
        /// The path on the source object to the source property.
        /// </param>
        /// <param name="dest" type="Object" locid="WinJS.Binding.setAttributeOneTime_p:dest">
        /// The destination object (must be a DOM element).
        /// </param>
        /// <param name="destProperties" type="Array" locid="WinJS.Binding.setAttributeOneTime_p:destProperties">
        /// The path on the destination object to the destination property, this must be a single name.
        /// </param>
        /// </signature>
        return attributeSet(dest, destProperties, getValue(source, sourceProperties));
    }

    var defaultBindImpl = converter(function defaultBind_passthrough(v) { return v; });

    function defaultBind(source, sourceProperties, dest, destProperties) {
        /// <signature helpKeyword="WinJS.Binding.defaultBind">
        /// <summary locid="WinJS.Binding.defaultBind">
        /// Creates a one-way binding between the source object and
        /// the destination object.
        /// </summary>
        /// <param name="source" type="Object" locid="WinJS.Binding.defaultBind_p:source">
        /// The source object.
        /// </param>
        /// <param name="sourceProperties" type="Array" locid="WinJS.Binding.defaultBind_p:sourceProperties">
        /// The path on the source object to the source property.
        /// </param>
        /// <param name="dest" type="Object" locid="WinJS.Binding.defaultBind_p:dest">
        /// The destination object.
        /// </param>
        /// <param name="destProperties" type="Array" locid="WinJS.Binding.defaultBind_p:destProperties">
        /// The path on the destination object to the destination property.
        /// </param>
        /// <returns type="{ cancel: Function }" locid="WinJS.Binding.defaultBind_returnValue">
        /// An object with a cancel method that is used to coalesce bindings.
        /// </returns>
        /// </signature>

        return defaultBindImpl(source, sourceProperties, dest, destProperties);
    }
    function bindWorker(bindable, sourceProperties, func) {
        if (sourceProperties.length > 1) {
            var root = {};
            var current = root;
            for (var i = 0, l = sourceProperties.length - 1; i < l; i++) {
                current = current[sourceProperties[i]] = {};
            }
            current[sourceProperties[sourceProperties.length - 1]] = func;

            return WinJS.Binding.bind(bindable, root, true);
        }
        else if (sourceProperties.length === 1) {
            bindable.bind(sourceProperties[0], func, true);
            return {
                cancel: function () {
                    bindable.unbind(sourceProperties[0], func);
                    this.cancel = noop;
                }
            };
        }
        else {
            // can't bind to object, so we just push it through
            //
            func(bindable);
        }
    }
    function noop() { }
    function oneTime(source, sourceProperties, dest, destProperties) {
        /// <signature helpKeyword="WinJS.Binding.oneTime">
        /// <summary locid="WinJS.Binding.oneTime">
        /// Sets the destination property to the value of the source property.
        /// </summary>
        /// <param name="source" type="Object" locid="WinJS.Binding.oneTime_p:source">
        /// The source object.
        /// </param>
        /// <param name="sourceProperties" type="Array" locid="WinJS.Binding.oneTime_p:sourceProperties">
        /// The path on the source object to the source property.
        /// </param>
        /// <param name="dest" type="Object" locid="WinJS.Binding.oneTime_p:dest">
        /// The destination object.
        /// </param>
        /// <param name="destProperties" type="Array" locid="WinJS.Binding.oneTime_p:destProperties">
        /// The path on the destination object to the destination property.
        /// </param>
        /// <returns type="{ cancel: Function }" locid="WinJS.Binding.oneTime_returnValue">
        /// An object with a cancel method that is used to coalesce bindings.
        /// </returns>
        /// </signature>
        nestedSet(dest, destProperties, getValue(source, sourceProperties));
        return { cancel: noop };
    }

    function initializer(customInitializer) {
        /// <signature helpKeyword="WinJS.Binding.initializer">
        /// <summary locid="WinJS.Binding.initializer">
        /// Marks a custom initializer function as being compatible with declarative data binding.
        /// </summary>
        /// <param name="customInitializer" type="Function" locid="WinJS.Binding.initializer_p:customInitializer">
        /// The custom initializer to be marked as compatible with declarative data binding.
        /// </param>
        /// <returns type="Function" locid="WinJS.Binding.initializer_returnValue">
        /// The input customInitializer.
        /// </returns>
        /// </signature>
        return markSupportedForProcessing(customInitializer);
    }

    WinJS.Namespace.define("WinJS.Binding", {
        processAll: declarativeBind,
        oneTime: initializer(oneTime),
        defaultBind: initializer(defaultBind),
        converter: converter,
        initializer: initializer,
        setAttribute: initializer(setAttribute),
        setAttributeOneTime: initializer(setAttributeOneTime),
        optimizeBindingReferences: {
            get: function () { return optimizeBindingReferences; },
            set: function (v) {
                if (!!v && WinJS.Utilities.hasWinRT && global.msSetWeakWinRTProperty && global.msGetWeakWinRTProperty) {
                    optimizeBindingReferences = true;
                } else {
                    optimizeBindingReferences = false;
                }
            }
        },
    });

})(WinJS, this);

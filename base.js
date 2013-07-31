/// <loc filename="Metadata\base_loc_oam.xml" format="messagebundle" />
/*!
  © Microsoft. All rights reserved.

  This library is supported for use in Windows Store apps only.

  Build: 1.0.9200.20498.win8_ldr.120817-1716
  
  Version: Microsoft.WinJS.1.0
*/
/// <reference path="ms-appx://Microsoft.WinJS.1.0/js/base.js" />
(function baseInit(global, undefined) {
    "use strict";

    function initializeProperties(target, members) {
        var keys = Object.keys(members);
        var properties;
        var i, len;
        for (i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var enumerable = key.charCodeAt(0) !== /*_*/95;
            var member = members[key];
            if (member && typeof member === 'object') {
                if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
                    if (member.enumerable === undefined) {
                        member.enumerable = enumerable;
                    }
                    properties = properties || {};
                    properties[key] = member;
                    continue;
                }
            }
            if (!enumerable) {
                properties = properties || {};
                properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
                continue;
            }
            target[key] = member;
        }
        if (properties) {
            Object.defineProperties(target, properties);
        }
    }

    (function (rootNamespace) {

        // Create the rootNamespace in the global namespace
        if (!global[rootNamespace]) {
            global[rootNamespace] = Object.create(Object.prototype);
        }

        // Cache the rootNamespace we just created in a local variable
        var _rootNamespace = global[rootNamespace];
        if (!_rootNamespace.Namespace) {
            _rootNamespace.Namespace = Object.create(Object.prototype);
        }

        function defineWithParent(parentNamespace, name, members) {
            /// <signature helpKeyword="WinJS.Namespace.defineWithParent">
            /// <summary locid="WinJS.Namespace.defineWithParent">
            /// Defines a new namespace with the specified name under the specified parent namespace.
            /// </summary>
            /// <param name="parentNamespace" type="Object" locid="WinJS.Namespace.defineWithParent_p:parentNamespace">
            /// The parent namespace.
            /// </param>
            /// <param name="name" type="String" locid="WinJS.Namespace.defineWithParent_p:name">
            /// The name of the new namespace.
            /// </param>
            /// <param name="members" type="Object" locid="WinJS.Namespace.defineWithParent_p:members">
            /// The members of the new namespace.
            /// </param>
            /// <returns type="Object" locid="WinJS.Namespace.defineWithParent_returnValue">
            /// The newly-defined namespace.
            /// </returns>
            /// </signature>
            var currentNamespace = parentNamespace,
                namespaceFragments = name.split(".");

            for (var i = 0, len = namespaceFragments.length; i < len; i++) {
                var namespaceName = namespaceFragments[i];
                if (!currentNamespace[namespaceName]) {
                    Object.defineProperty(currentNamespace, namespaceName,
                        { value: {}, writable: false, enumerable: true, configurable: true }
                    );
                }
                currentNamespace = currentNamespace[namespaceName];
            }

            if (members) {
                initializeProperties(currentNamespace, members);
            }

            return currentNamespace;
        }

        function define(name, members) {
            /// <signature helpKeyword="WinJS.Namespace.define">
            /// <summary locid="WinJS.Namespace.define">
            /// Defines a new namespace with the specified name.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Namespace.define_p:name">
            /// The name of the namespace. This could be a dot-separated name for nested namespaces.
            /// </param>
            /// <param name="members" type="Object" locid="WinJS.Namespace.define_p:members">
            /// The members of the new namespace.
            /// </param>
            /// <returns type="Object" locid="WinJS.Namespace.define_returnValue">
            /// The newly-defined namespace.
            /// </returns>
            /// </signature>
            return defineWithParent(global, name, members);
        }

        // Establish members of the "WinJS.Namespace" namespace
        Object.defineProperties(_rootNamespace.Namespace, {

            defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

            define: { value: define, writable: true, enumerable: true, configurable: true }

        });

    })("WinJS");

    (function (WinJS) {

        function define(constructor, instanceMembers, staticMembers) {
            /// <signature helpKeyword="WinJS.Class.define">
            /// <summary locid="WinJS.Class.define">
            /// Defines a class using the given constructor and the specified instance members.
            /// </summary>
            /// <param name="constructor" type="Function" locid="WinJS.Class.define_p:constructor">
            /// A constructor function that is used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object" locid="WinJS.Class.define_p:instanceMembers">
            /// The set of instance fields, properties, and methods made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object" locid="WinJS.Class.define_p:staticMembers">
            /// The set of static fields, properties, and methods made available on the class.
            /// </param>
            /// <returns type="Function" locid="WinJS.Class.define_returnValue">
            /// The newly-defined class.
            /// </returns>
            /// </signature>
            constructor = constructor || function () { };
            WinJS.Utilities.markSupportedForProcessing(constructor);
            if (instanceMembers) {
                initializeProperties(constructor.prototype, instanceMembers);
            }
            if (staticMembers) {
                initializeProperties(constructor, staticMembers);
            }
            return constructor;
        }

        function derive(baseClass, constructor, instanceMembers, staticMembers) {
            /// <signature helpKeyword="WinJS.Class.derive">
            /// <summary locid="WinJS.Class.derive">
            /// Creates a sub-class based on the supplied baseClass parameter, using prototypal inheritance.
            /// </summary>
            /// <param name="baseClass" type="Function" locid="WinJS.Class.derive_p:baseClass">
            /// The class to inherit from.
            /// </param>
            /// <param name="constructor" type="Function" locid="WinJS.Class.derive_p:constructor">
            /// A constructor function that is used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object" locid="WinJS.Class.derive_p:instanceMembers">
            /// The set of instance fields, properties, and methods to be made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object" locid="WinJS.Class.derive_p:staticMembers">
            /// The set of static fields, properties, and methods to be made available on the class.
            /// </param>
            /// <returns type="Function" locid="WinJS.Class.derive_returnValue">
            /// The newly-defined class.
            /// </returns>
            /// </signature>
            if (baseClass) {
                constructor = constructor || function () { };
                var basePrototype = baseClass.prototype;
                constructor.prototype = Object.create(basePrototype);
                WinJS.Utilities.markSupportedForProcessing(constructor);
                Object.defineProperty(constructor.prototype, "constructor", { value: constructor, writable: true, configurable: true, enumerable: true });
                if (instanceMembers) {
                    initializeProperties(constructor.prototype, instanceMembers);
                }
                if (staticMembers) {
                    initializeProperties(constructor, staticMembers);
                }
                return constructor;
            } else {
                return define(constructor, instanceMembers, staticMembers);
            }
        }

        function mix(constructor) {
            /// <signature helpKeyword="WinJS.Class.mix">
            /// <summary locid="WinJS.Class.mix">
            /// Defines a class using the given constructor and the union of the set of instance members
            /// specified by all the mixin objects. The mixin parameter list is of variable length.
            /// </summary>
            /// <param name="constructor" locid="WinJS.Class.mix_p:constructor">
            /// A constructor function that is used to instantiate this class.
            /// </param>
            /// <returns type="Function" locid="WinJS.Class.mix_returnValue">
            /// The newly-defined class.
            /// </returns>
            /// </signature>
            constructor = constructor || function () { };
            var i, len;
            for (i = 1, len = arguments.length; i < len; i++) {
                initializeProperties(constructor.prototype, arguments[i]);
            }
            return constructor;
        }

        // Establish members of "WinJS.Class" namespace
        WinJS.Namespace.define("WinJS.Class", {
            define: define,
            derive: derive,
            mix: mix
        });

    })(WinJS);

})(this);


(function baseUtilsInit(global, WinJS) {
    "use strict";

    var hasWinRT = !!global.Windows;

    var strings = {
        get notSupportedForProcessing() { return WinJS.Resources._getWinJSString("base/notSupportedForProcessing").value; }
    };

    function nop(v) {
        return v;
    }

    function getMemberFiltered(name, root, filter) {
        return name.split(".").reduce(function (currentNamespace, name) {
            if (currentNamespace) {
                return filter(currentNamespace[name]);
            }
            return null;
        }, root);
    }

    // Establish members of "WinJS.Utilities" namespace
    WinJS.Namespace.define("WinJS.Utilities", {
        // Used for mocking in tests
        _setHasWinRT: {
            value: function (value) {
                hasWinRT = value;
            },
            configurable: false,
            writable: false,
            enumerable: false
        },

        /// <field type="Boolean" locid="WinJS.Utilities.hasWinRT" helpKeyword="WinJS.Utilities.hasWinRT">Determine if WinRT is accessible in this script context.</field>
        hasWinRT: {
            get: function () { return hasWinRT; },
            configurable: false,
            enumerable: true
        },

        _getMemberFiltered: getMemberFiltered,

        getMember: function (name, root) {
            /// <signature helpKeyword="WinJS.Utilities.getMember">
            /// <summary locid="WinJS.Utilities.getMember">
            /// Gets the leaf-level type or namespace specified by the name parameter.
            /// </summary>
            /// <param name="name" locid="WinJS.Utilities.getMember_p:name">
            /// The name of the member.
            /// </param>
            /// <param name="root" locid="WinJS.Utilities.getMember_p:root">
            /// The root to start in. Defaults to the global object.
            /// </param>
            /// <returns type="Object" locid="WinJS.Utilities.getMember_returnValue">
            /// The leaf-level type or namespace in the specified parent namespace.
            /// </returns>
            /// </signature>
            if (!name) {
                return null;
            }
            return getMemberFiltered(name, root || global, nop);
        },

        ready: function (callback, async) {
            /// <signature helpKeyword="WinJS.Utilities.ready">
            /// <summary locid="WinJS.Utilities.ready">
            /// Ensures that the specified function executes only after the DOMContentLoaded event has fired
            /// for the current page.
            /// </summary>
            /// <returns type="WinJS.Promise" locid="WinJS.Utilities.ready_returnValue">A promise that completes after DOMContentLoaded has occurred.</returns>
            /// <param name="callback" optional="true" locid="WinJS.Utilities.ready_p:callback">
            /// A function that executes after DOMContentLoaded has occurred.
            /// </param>
            /// <param name="async" optional="true" locid="WinJS.Utilities.ready_p:async">
            /// If true, the callback should be executed asynchronously.
            /// </param>
            /// </signature>
            return new WinJS.Promise(function (c, e) {
                function complete() {
                    if (callback) {
                        try {
                            callback();
                            c();
                        }
                        catch (err) {
                            e(err);
                        }
                    }
                    else {
                        c();
                    }
                }

                var readyState = WinJS.Utilities.testReadyState;
                if (!readyState) {
                    if (global.document) {
                        readyState = document.readyState;
                    }
                    else {
                        readyState = "complete";
                    }
                }
                if (readyState === "complete" || (global.document && document.body !== null)) {
                    if (async) {
                        msSetImmediate(complete);
                    }
                    else {
                        complete();
                    }
                }
                else {
                    global.addEventListener("DOMContentLoaded", complete, false);
                }
            });
        },

        /// <field type="Boolean" locid="WinJS.Utilities.strictProcessing" helpKeyword="WinJS.Utilities.strictProcessing">Determines if strict declarative processing is enabled in this script context.</field>
        strictProcessing: {
            get: function () { return true; },
            configurable: false,
            enumerable: true,
        },

        markSupportedForProcessing: {
            value: function (func) {
                /// <signature helpKeyword="WinJS.Utilities.markSupportedForProcessing">
                /// <summary locid="WinJS.Utilities.markSupportedForProcessing">
                /// Marks a function as being compatible with declarative processing, such as WinJS.UI.processAll
                /// or WinJS.Binding.processAll.
                /// </summary>
                /// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
                /// The function to be marked as compatible with declarative processing.
                /// </param>
                /// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
                /// The input function.
                /// </returns>
                /// </signature>
                func.supportedForProcessing = true;
                return func;
            },
            configurable: false,
            writable: false,
            enumerable: true
        },

        requireSupportedForProcessing: {
            value: function (value) {
                /// <signature helpKeyword="WinJS.Utilities.requireSupportedForProcessing">
                /// <summary locid="WinJS.Utilities.requireSupportedForProcessing">
                /// Asserts that the value is compatible with declarative processing, such as WinJS.UI.processAll
                /// or WinJS.Binding.processAll. If it is not compatible an exception will be thrown.
                /// </summary>
                /// <param name="value" type="Object" locid="WinJS.Utilities.requireSupportedForProcessing_p:value">
                /// The value to be tested for compatibility with declarative processing. If the
                /// value is a function it must be marked with a property 'supportedForProcessing'
                /// with a value of true.
                /// </param>
                /// <returns type="Object" locid="WinJS.Utilities.requireSupportedForProcessing_returnValue">
                /// The input value.
                /// </returns>
                /// </signature>
                var supportedForProcessing = true;

                supportedForProcessing = supportedForProcessing && !(value === global);
                supportedForProcessing = supportedForProcessing && !(value === global.location);
                supportedForProcessing = supportedForProcessing && !(value instanceof HTMLIFrameElement);
                supportedForProcessing = supportedForProcessing && !(typeof value === "function" && !value.supportedForProcessing);

                switch (global.frames.length) {
                    case 0:
                        break;

                    case 1:
                        supportedForProcessing = supportedForProcessing && !(value === global.frames[0]);
                        break;

                    default:
                        for (var i = 0, len = global.frames.length; supportedForProcessing && i < len; i++) {
                            supportedForProcessing = supportedForProcessing && !(value === global.frames[i]);
                        }
                        break;
                }

                if (supportedForProcessing) {
                    return value;
                }

                throw new WinJS.ErrorFromName("WinJS.Utilities.requireSupportedForProcessing", WinJS.Resources._formatString(strings.notSupportedForProcessing, value));
            },
            configurable: false,
            writable: false,
            enumerable: true
        },

    });

    WinJS.Namespace.define("WinJS", {
        validation: false,

        strictProcessing: {
            value: function () {
                /// <signature helpKeyword="WinJS.strictProcessing">
                /// <summary locid="WinJS.strictProcessing">
                /// Strict processing is always enforced, this method has no effect.
                /// </summary>
                /// </signature>
            },
            configurable: false,
            writable: false,
            enumerable: false
        },
    });
})(this, WinJS);


(function logInit() {
    "use strict";

    var spaceR = /\s+/g;
    var typeR = /^(error|warn|info|log)$/;

    function format(message, tag, type) {
        /// <signature helpKeyword="WinJS.Utilities.formatLog">
        /// <summary locid="WinJS.Utilities.formatLog">
        /// Adds tags and type to a logging message.
        /// </summary>
        /// <param name="message" type="String" locid="WinJS.Utilities.startLog_p:message">The message to be formatted.</param>
        /// <param name="tag" type="String" locid="WinJS.Utilities.startLog_p:tag">The tag(s) to be applied to the message. Multiple tags should be separated by spaces.</param>
        /// <param name="type" type="String" locid="WinJS.Utilities.startLog_p:type">The type of the message.</param>
        /// <returns type="String" locid="WinJS.Utilities.startLog_returnValue">The formatted message.</returns>
        /// </signature>
        var m = message;
        if (typeof (m) === "function") { m = m(); }

        return ((type && typeR.test(type)) ? ("") : (type ? (type + ": ") : "")) +
            (tag ? tag.replace(spaceR, ":") + ": " : "") +
            m;
    }
    function defAction(message, tag, type) {
        var m = WinJS.Utilities.formatLog(message, tag, type);
        console[(type && typeR.test(type)) ? type : "log"](m);
    }
    function escape(s) {
        // \s (whitespace) is used as separator, so don't escape it
        return s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    }
    WinJS.Namespace.define("WinJS.Utilities", {
        startLog: function (options) {
            /// <signature helpKeyword="WinJS.Utilities.startLog">
            /// <summary locid="WinJS.Utilities.startLog">
            /// Configures a logger that writes messages containing the specified tags from WinJS.log to console.log.
            /// </summary>
            /// <param name="options" type="String" locid="WinJS.Utilities.startLog_p:options">The tags for messages to log. Multiple tags should be separated by spaces.</param>
            /// </signature>
            /// <signature>
            /// <summary locid="WinJS.Utilities.startLog2">
            /// Configure a logger to write WinJS.log output.
            /// </summary>
            /// <param name="options" type="Object" locid="WinJS.Utilities.startLog_p:options2">
            /// May contain .type, .tags, .excludeTags and .action properties.
            /// - .type is a required tag.
            /// - .excludeTags is a space-separated list of tags, any of which will result in a message not being logged.
            /// - .tags is a space-separated list of tags, any of which will result in a message being logged.
            /// - .action is a function that, if present, will be called with the log message, tags and type. The default is to log to the console.
            /// </param>
            /// </signature>
            options = options || {};
            if (typeof options === "string") {
                options = { tags: options };
            }
            var el = options.type && new RegExp("^(" + escape(options.type).replace(spaceR, " ").split(" ").join("|") + ")$");
            var not = options.excludeTags && new RegExp("(^|\\s)(" + escape(options.excludeTags).replace(spaceR, " ").split(" ").join("|") + ")(\\s|$)", "i");
            var has = options.tags && new RegExp("(^|\\s)(" + escape(options.tags).replace(spaceR, " ").split(" ").join("|") + ")(\\s|$)", "i");
            var action = options.action || defAction;

            if (!el && !not && !has && !WinJS.log) {
                WinJS.log = action;
                return;
            }

            var result = function (message, tag, type) {
                if (!((el && !el.test(type))          // if the expected log level is not satisfied
                    || (not && not.test(tag))         // if any of the excluded categories exist
                    || (has && !has.test(tag)))) {    // if at least one of the included categories doesn't exist
                    action(message, tag, type);
                }

                result.next && result.next(message, tag, type);
            };
            result.next = WinJS.log;
            WinJS.log = result;
        },
        stopLog: function () {
            /// <signature helpKeyword="WinJS.Utilities.stopLog">
            /// <summary locid="WinJS.Utilities.stopLog">
            /// Removes the previously set up logger.
            /// </summary>
            /// </signature>
            delete WinJS.log;
        },
        formatLog: format
    });
})();

(function eventsInit(WinJS, undefined) {
    "use strict";


    function createEventProperty(name) {
        var eventPropStateName = "_on" + name + "state";

        return {
            get: function () {
                var state = this[eventPropStateName];
                return state && state.userHandler;
            },
            set: function (handler) {
                var state = this[eventPropStateName];
                if (handler) {
                    if (!state) {
                        state = { wrapper: function (evt) { return state.userHandler(evt); }, userHandler: handler };
                        Object.defineProperty(this, eventPropStateName, { value: state, enumerable: false, writable: true, configurable: true });
                        this.addEventListener(name, state.wrapper, false);
                    }
                    state.userHandler = handler;
                } else if (state) {
                    this.removeEventListener(name, state.wrapper, false);
                    this[eventPropStateName] = null;
                }
            },
            enumerable: true
        }
    }

    function createEventProperties(events) {
        /// <signature helpKeyword="WinJS.Utilities.createEventProperties">
        /// <summary locid="WinJS.Utilities.createEventProperties">
        /// Creates an object that has one property for each name passed to the function.
        /// </summary>
        /// <param name="events" locid="WinJS.Utilities.createEventProperties_p:events">
        /// A variable list of property names.
        /// </param>
        /// <returns type="Object" locid="WinJS.Utilities.createEventProperties_returnValue">
        /// The object with the specified properties. The names of the properties are prefixed with 'on'.
        /// </returns>
        /// </signature>
        var props = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
            var name = arguments[i];
            props["on" + name] = createEventProperty(name);
        }
        return props;
    }

    var EventMixinEvent = WinJS.Class.define(
        function EventMixinEvent_ctor(type, detail, target) {
            this.detail = detail;
            this.target = target;
            this.timeStamp = Date.now();
            this.type = type;
        },
        {
            bubbles: { value: false, writable: false },
            cancelable: { value: false, writable: false },
            currentTarget: {
                get: function () { return this.target; }
            },
            defaultPrevented: {
                get: function () { return this._preventDefaultCalled; }
            },
            trusted: { value: false, writable: false },
            eventPhase: { value: 0, writable: false },
            target: null,
            timeStamp: null,
            type: null,

            preventDefault: function () {
                this._preventDefaultCalled = true;
            },
            stopImmediatePropagation: function () {
                this._stopImmediatePropagationCalled = true;
            },
            stopPropagation: function () {
            }
        }, {
            supportedForProcessing: false,
        }
    );

    var eventMixin = {
        _listeners: null,

        addEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="WinJS.Utilities.eventMixin.addEventListener">
            /// <summary locid="WinJS.Utilities.eventMixin.addEventListener">
            /// Adds an event listener to the control.
            /// </summary>
            /// <param name="type" locid="WinJS.Utilities.eventMixin.addEventListener_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" locid="WinJS.Utilities.eventMixin.addEventListener_p:listener">
            /// The listener to invoke when the event gets raised.
            /// </param>
            /// <param name="useCapture" locid="WinJS.Utilities.eventMixin.addEventListener_p:useCapture">
            /// if true initiates capture, otherwise false.
            /// </param>
            /// </signature>
            useCapture = useCapture || false;
            this._listeners = this._listeners || {};
            var eventListeners = (this._listeners[type] = this._listeners[type] || []);
            for (var i = 0, len = eventListeners.length; i < len; i++) {
                var l = eventListeners[i];
                if (l.useCapture === useCapture && l.listener === listener) {
                    return;
                }
            }
            eventListeners.push({ listener: listener, useCapture: useCapture });
        },
        dispatchEvent: function (type, details) {
            /// <signature helpKeyword="WinJS.Utilities.eventMixin.dispatchEvent">
            /// <summary locid="WinJS.Utilities.eventMixin.dispatchEvent">
            /// Raises an event of the specified type and with the specified additional properties.
            /// </summary>
            /// <param name="type" locid="WinJS.Utilities.eventMixin.dispatchEvent_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="details" locid="WinJS.Utilities.eventMixin.dispatchEvent_p:details">
            /// The set of additional properties to be attached to the event object when the event is raised.
            /// </param>
            /// <returns type="Boolean" locid="WinJS.Utilities.eventMixin.dispatchEvent_returnValue">
            /// true if preventDefault was called on the event.
            /// </returns>
            /// </signature>
            var listeners = this._listeners && this._listeners[type];
            if (listeners) {
                var eventValue = new EventMixinEvent(type, details, this);
                // Need to copy the array to protect against people unregistering while we are dispatching
                listeners = listeners.slice(0, listeners.length);
                for (var i = 0, len = listeners.length; i < len && !eventValue._stopImmediatePropagationCalled; i++) {
                    listeners[i].listener(eventValue);
                }
                return eventValue.defaultPrevented || false;
            }
            return false;
        },
        removeEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="WinJS.Utilities.eventMixin.removeEventListener">
            /// <summary locid="WinJS.Utilities.eventMixin.removeEventListener">
            /// Removes an event listener from the control.
            /// </summary>
            /// <param name="type" locid="WinJS.Utilities.eventMixin.removeEventListener_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" locid="WinJS.Utilities.eventMixin.removeEventListener_p:listener">
            /// The listener to remove.
            /// </param>
            /// <param name="useCapture" locid="WinJS.Utilities.eventMixin.removeEventListener_p:useCapture">
            /// Specifies whether to initiate capture.
            /// </param>
            /// </signature>
            useCapture = useCapture || false;
            var listeners = this._listeners && this._listeners[type];
            if (listeners) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    var l = listeners[i];
                    if (l.listener === listener && l.useCapture === useCapture) {
                        listeners.splice(i, 1);
                        if (listeners.length === 0) {
                            delete this._listeners[type];
                        }
                        // Only want to remove one element for each call to removeEventListener
                        break;
                    }
                }
            }
        }
    };

    WinJS.Namespace.define("WinJS.Utilities", {
        _createEventProperty: createEventProperty,
        createEventProperties: createEventProperties,
        eventMixin: eventMixin
    });

})(WinJS);


(function resourcesInit(global, WinJS, undefined) {
    "use strict";

    var resourceMap;
    var mrtEventHook = false;
    var contextChangedET = "contextchanged";

    var ListenerType = WinJS.Class.mix(WinJS.Class.define(null, { /* empty */ }, { supportedForProcessing: false }), WinJS.Utilities.eventMixin);
    var listeners = new ListenerType();

    var strings = {
        get malformedFormatStringInput() { return WinJS.Resources._getWinJSString("base/malformedFormatStringInput").value; },
    };

    WinJS.Namespace.define("WinJS.Resources", {
        addEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="WinJS.Resources.addEventListener">
            /// <summary locid="WinJS.Resources.addEventListener">
            /// Registers an event handler for the specified event.
            /// </summary>
            /// <param name="type" type="String" locid="WinJS.Resources.addEventListener_p:type">
            /// The name of the event to handle.
            /// </param>
            /// <param name="listener" type="Function" locid="WinJS.Resources.addEventListener_p:listener">
            /// The listener to invoke when the event gets raised.
            /// </param>
            /// <param name="useCapture" type="Boolean" locid="WinJS.Resources.addEventListener_p:useCapture">
            /// Set to true to register the event handler for the capturing phase; set to false to register for the bubbling phase.
            /// </param>
            /// </signature>
            if (WinJS.Utilities.hasWinRT && !mrtEventHook) {
                if (type === contextChangedET) {
                    try {
                        Windows.ApplicationModel.Resources.Core.ResourceManager.current.defaultContext.qualifierValues.addEventListener("mapchanged", function (e) {
                            WinJS.Resources.dispatchEvent(contextChangedET, { qualifier: e.key, changed: e.target[e.key] });
                        }, false);

                        mrtEventHook = true;
                    } catch (e) {
                    }
                }
            }
            listeners.addEventListener(type, listener, useCapture);
        },
        removeEventListener: listeners.removeEventListener.bind(listeners),
        dispatchEvent: listeners.dispatchEvent.bind(listeners),

        _formatString: function (string) {
            var args = arguments;
            if (args.length > 1) {
                string = string.replace(/({{)|(}})|{(\d+)}|({)|(})/g, function (unused, left, right, index, illegalLeft, illegalRight) {
                    if (illegalLeft || illegalRight) { throw WinJS.Resources._formatString(strings.malformedFormatStringInput, illegalLeft || illegalRight); }
                    return (left && "{") || (right && "}") || args[(index | 0) + 1];
                });
            }
            return string;
        },

        _getStringWinRT: function (resourceId) {
            if (!resourceMap) {
                var mainResourceMap = Windows.ApplicationModel.Resources.Core.ResourceManager.current.mainResourceMap;
                try {
                    resourceMap = mainResourceMap.getSubtree('Resources');
                }
                catch (e) {
                }
                if (!resourceMap) {
                    resourceMap = mainResourceMap;
                }
            }

            var stringValue;
            var langValue;
            var resCandidate;
            try {
                resCandidate = resourceMap.getValue(resourceId);
                if (resCandidate) {
                    stringValue = resCandidate.valueAsString;
                    if (stringValue === undefined) {
                        stringValue = resCandidate.toString();
                    }
                }
            }
            catch (e) { }

            if (!stringValue) {
                return { value: resourceId, empty: true };
            }

            try {
                langValue = resCandidate.getQualifierValue("Language");
            }
            catch (e) {
                return { value: stringValue };
            }

            return { value: stringValue, lang: langValue };
        },

        _getStringJS: function (resourceId) {
            var str = global.strings && global.strings[resourceId];
            if (typeof str === "string") {
                str = { value: str };
            }
            return str || { value: resourceId, empty: true };
        }
    });

    Object.defineProperties(WinJS.Resources, WinJS.Utilities.createEventProperties(contextChangedET));

    var getStringImpl;

    WinJS.Resources.getString = function (resourceId) {
        /// <signature helpKeyword="WinJS.Resources.getString">
        /// <summary locid="WinJS.Resources.getString">
        /// Retrieves the resource string that has the specified resource id.
        /// </summary>
        /// <param name="resourceId" type="Number" locid="WinJS.Resources.getString._p:resourceId">
        /// The resource id of the string to retrieve.
        /// </param>
        /// <returns type="Object" locid="WinJS.Resources.getString_returnValue">
        /// An object that can contain these properties:
        /// 
        /// value:
        /// The value of the requested string. This property is always present.
        /// 
        /// empty:
        /// A value that specifies whether the requested string wasn't found.
        /// If its true, the string wasn't found. If its false or undefined,
        /// the requested string was found.
        /// 
        /// lang:
        /// The language of the string, if specified. This property is only present
        /// for multi-language resources.
        /// 
        /// </returns>
        /// </signature>
        getStringImpl =
            getStringImpl ||
                (WinJS.Utilities.hasWinRT
                    ? WinJS.Resources._getStringWinRT
                    : WinJS.Resources._getStringJS);

        return getStringImpl(resourceId);
    };


})(this, WinJS);


(function promiseInit(global, undefined) {
    "use strict";

    global.Debug && (global.Debug.setNonUserCodeExceptions = true);

    var ListenerType = WinJS.Class.mix(WinJS.Class.define(null, { /*empty*/ }, { supportedForProcessing: false }), WinJS.Utilities.eventMixin);
    var promiseEventListeners = new ListenerType();
    // make sure there is a listeners collection so that we can do a more trivial check below
    promiseEventListeners._listeners = {};
    var errorET = "error";
    var canceledName = "Canceled";
    var tagWithStack = false;
    var tag = {
        promise: 0x01,
        thenPromise: 0x02,
        errorPromise: 0x04,
        exceptionPromise: 0x08,
        completePromise: 0x10,
    };
    tag.all = tag.promise | tag.thenPromise | tag.errorPromise | tag.exceptionPromise | tag.completePromise;

    //
    // Global error counter, for each error which enters the system we increment this once and then
    // the error number travels with the error as it traverses the tree of potential handlers.
    //
    // When someone has registered to be told about errors (WinJS.Promise.callonerror) promises
    // which are in error will get tagged with a ._errorId field. This tagged field is the
    // contract by which nested promises with errors will be identified as chaining for the
    // purposes of the callonerror semantics. If a nested promise in error is encountered without
    // a ._errorId it will be assumed to be foreign and treated as an interop boundary and
    // a new error id will be minted.
    //
    var error_number = 1;

    //
    // The state machine has a interesting hiccup in it with regards to notification, in order
    // to flatten out notification and avoid recursion for synchronous completion we have an
    // explicit set of *_notify states which are responsible for notifying their entire tree
    // of children. They can do this because they know that immediate children are always
    // ThenPromise instances and we can therefore reach into their state to access the
    // _listeners collection.
    //
    // So, what happens is that a Promise will be fulfilled through the _completed or _error
    // messages at which point it will enter a *_notify state and be responsible for to move
    // its children into an (as appropriate) success or error state and also notify that child's
    // listeners of the state transition, until leaf notes are reached.
    //

    var state_created,              // -> working
        state_working,              // -> error | error_notify | success | success_notify | canceled | waiting
        state_waiting,              // -> error | error_notify | success | success_notify | waiting_canceled
        state_waiting_canceled,     // -> error | error_notify | success | success_notify | canceling
        state_canceled,             // -> error | error_notify | success | success_notify | canceling
        state_canceling,            // -> error_notify
        state_success_notify,       // -> success
        state_success,              // -> .
        state_error_notify,         // -> error
        state_error;                // -> .

    // Noop function, used in the various states to indicate that they don't support a given
    // message. Named with the somewhat cute name '_' because it reads really well in the states.

    function _() { }

    // Initial state
    //
    state_created = {
        name: "created",
        enter: function (promise) {
            promise._setState(state_working);
        },
        cancel: _,
        done: _,
        then: _,
        _completed: _,
        _error: _,
        _notify: _,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Ready state, waiting for a message (completed/error/progress), able to be canceled
    //
    state_working = {
        name: "working",
        enter: _,
        cancel: function (promise) {
            promise._setState(state_canceled);
        },
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Waiting state, if a promise is completed with a value which is itself a promise
    // (has a then() method) it signs up to be informed when that child promise is
    // fulfilled at which point it will be fulfilled with that value.
    //
    state_waiting = {
        name: "waiting",
        enter: function (promise) {
            var waitedUpon = promise._value;
            var error = function (value) {
                if (waitedUpon._errorId) {
                    promise._chainedError(value, waitedUpon);
                } else {
                    // Because this is an interop boundary we want to indicate that this 
                    //  error has been handled by the promise infrastructure before we
                    //  begin a new handling chain.
                    //
                    callonerror(promise, value, detailsForHandledError, waitedUpon, error);
                    promise._error(value);
                }
            };
            error.handlesOnError = true;
            waitedUpon.then(
                promise._completed.bind(promise),
                error,
                promise._progress.bind(promise)
            );
        },
        cancel: function (promise) {
            promise._setState(state_waiting_canceled);
        },
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Waiting canceled state, when a promise has been in a waiting state and receives a
    // request to cancel its pending work it will forward that request to the child promise
    // and then waits to be informed of the result. This promise moves itself into the
    // canceling state but understands that the child promise may instead push it to a
    // different state.
    //
    state_waiting_canceled = {
        name: "waiting_canceled",
        enter: function (promise) {
            // Initiate a transition to canceling. Triggering a cancel on the promise
            // that we are waiting upon may result in a different state transition
            // before the state machine pump runs again.
            promise._setState(state_canceling);
            var waitedUpon = promise._value;
            if (waitedUpon.cancel) {
                waitedUpon.cancel();
            }
        },
        cancel: _,
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Canceled state, moves to the canceling state and then tells the promise to do
    // whatever it might need to do on cancelation.
    //
    state_canceled = {
        name: "canceled",
        enter: function (promise) {
            // Initiate a transition to canceling. The _cancelAction may change the state
            // before the state machine pump runs again.
            promise._setState(state_canceling);
            promise._cancelAction();
        },
        cancel: _,
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Canceling state, commits to the promise moving to an error state with an error
    // object whose 'name' and 'message' properties contain the string "Canceled"
    //
    state_canceling = {
        name: "canceling",
        enter: function (promise) {
            var error = new Error(canceledName);
            error.name = error.message;
            promise._value = error;
            promise._setState(state_error_notify);
        },
        cancel: _,
        done: _,
        then: _,
        _completed: _,
        _error: _,
        _notify: _,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Success notify state, moves a promise to the success state and notifies all children
    //
    state_success_notify = {
        name: "complete_notify",
        enter: function (promise) {
            promise.done = CompletePromise.prototype.done;
            promise.then = CompletePromise.prototype.then;
            if (promise._listeners) {
                var queue = [promise];
                var p;
                while (queue.length) {
                    p = queue.pop();
                    p._state._notify(p, queue);
                }
            }
            promise._setState(state_success);
        },
        cancel: _,
        done: null, /*error to get here */
        then: null, /*error to get here */
        _completed: _,
        _error: _,
        _notify: notifySuccess,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Success state, moves a promise to the success state and does NOT notify any children.
    // Some upstream promise is owning the notification pass.
    //
    state_success = {
        name: "success",
        enter: function (promise) {
            promise.done = CompletePromise.prototype.done;
            promise.then = CompletePromise.prototype.then;
            promise._cleanupAction();
        },
        cancel: _,
        done: null, /*error to get here */
        then: null, /*error to get here */
        _completed: _,
        _error: _,
        _notify: notifySuccess,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Error notify state, moves a promise to the error state and notifies all children
    //
    state_error_notify = {
        name: "error_notify",
        enter: function (promise) {
            promise.done = ErrorPromise.prototype.done;
            promise.then = ErrorPromise.prototype.then;
            if (promise._listeners) {
                var queue = [promise];
                var p;
                while (queue.length) {
                    p = queue.pop();
                    p._state._notify(p, queue);
                }
            }
            promise._setState(state_error);
        },
        cancel: _,
        done: null, /*error to get here*/
        then: null, /*error to get here*/
        _completed: _,
        _error: _,
        _notify: notifyError,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Error state, moves a promise to the error state and does NOT notify any children.
    // Some upstream promise is owning the notification pass.
    //
    state_error = {
        name: "error",
        enter: function (promise) {
            promise.done = ErrorPromise.prototype.done;
            promise.then = ErrorPromise.prototype.then;
            promise._cleanupAction();
        },
        cancel: _,
        done: null, /*error to get here*/
        then: null, /*error to get here*/
        _completed: _,
        _error: _,
        _notify: notifyError,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    //
    // The statemachine implementation follows a very particular pattern, the states are specified
    // as static stateless bags of functions which are then indirected through the state machine
    // instance (a Promise). As such all of the functions on each state have the promise instance
    // passed to them explicitly as a parameter and the Promise instance members do a little
    // dance where they indirect through the state and insert themselves in the argument list.
    //
    // We could instead call directly through the promise states however then every caller
    // would have to remember to do things like pumping the state machine to catch state transitions.
    //

    var PromiseStateMachine = WinJS.Class.define(null, {
        _listeners: null,
        _nextState: null,
        _state: null,
        _value: null,

        cancel: function () {
            /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
            /// <summary locid="WinJS.PromiseStateMachine.cancel">
            /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
            /// already been fulfilled and cancellation is supported, the promise enters
            /// the error state with a value of Error("Canceled").
            /// </summary>
            /// </signature>
            this._state.cancel(this);
            this._run();
        },
        done: function Promise_done(onComplete, onError, onProgress) {
            /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
            /// <summary locid="WinJS.PromiseStateMachine.done">
            /// Allows you to specify the work to be done on the fulfillment of the promised value,
            /// the error handling to be performed if the promise fails to fulfill
            /// a value, and the handling of progress notifications along the way.
            /// 
            /// After the handlers have finished executing, this function throws any error that would have been returned
            /// from then() as a promise in the error state.
            /// </summary>
            /// <param name="onComplete" type="Function" locid="WinJS.PromiseStateMachine.done_p:onComplete">
            /// The function to be called if the promise is fulfilled successfully with a value.
            /// The fulfilled value is passed as the single argument. If the value is null,
            /// the fulfilled value is returned. The value returned
            /// from the function becomes the fulfilled value of the promise returned by
            /// then(). If an exception is thrown while executing the function, the promise returned
            /// by then() moves into the error state.
            /// </param>
            /// <param name="onError" type="Function" optional="true" locid="WinJS.PromiseStateMachine.done_p:onError">
            /// The function to be called if the promise is fulfilled with an error. The error
            /// is passed as the single argument. If it is null, the error is forwarded.
            /// The value returned from the function is the fulfilled value of the promise returned by then().
            /// </param>
            /// <param name="onProgress" type="Function" optional="true" locid="WinJS.PromiseStateMachine.done_p:onProgress">
            /// the function to be called if the promise reports progress. Data about the progress
            /// is passed as the single argument. Promises are not required to support
            /// progress.
            /// </param>
            /// </signature>
            this._state.done(this, onComplete, onError, onProgress);
        },
        then: function Promise_then(onComplete, onError, onProgress) {
            /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
            /// <summary locid="WinJS.PromiseStateMachine.then">
            /// Allows you to specify the work to be done on the fulfillment of the promised value,
            /// the error handling to be performed if the promise fails to fulfill
            /// a value, and the handling of progress notifications along the way.
            /// </summary>
            /// <param name="onComplete" type="Function" locid="WinJS.PromiseStateMachine.then_p:onComplete">
            /// The function to be called if the promise is fulfilled successfully with a value.
            /// The value is passed as the single argument. If the value is null, the value is returned.
            /// The value returned from the function becomes the fulfilled value of the promise returned by
            /// then(). If an exception is thrown while this function is being executed, the promise returned
            /// by then() moves into the error state.
            /// </param>
            /// <param name="onError" type="Function" optional="true" locid="WinJS.PromiseStateMachine.then_p:onError">
            /// The function to be called if the promise is fulfilled with an error. The error
            /// is passed as the single argument. If it is null, the error is forwarded.
            /// The value returned from the function becomes the fulfilled value of the promise returned by then().
            /// </param>
            /// <param name="onProgress" type="Function" optional="true" locid="WinJS.PromiseStateMachine.then_p:onProgress">
            /// The function to be called if the promise reports progress. Data about the progress
            /// is passed as the single argument. Promises are not required to support
            /// progress.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
            /// The promise whose value is the result of executing the complete or
            /// error function.
            /// </returns>
            /// </signature>
            return this._state.then(this, onComplete, onError, onProgress);
        },

        _chainedError: function (value, context) {
            var result = this._state._error(this, value, detailsForChainedError, context);
            this._run();
            return result;
        },
        _completed: function (value) {
            var result = this._state._completed(this, value);
            this._run();
            return result;
        },
        _error: function (value) {
            var result = this._state._error(this, value, detailsForError);
            this._run();
            return result;
        },
        _progress: function (value) {
            this._state._progress(this, value);
        },
        _setState: function (state) {
            this._nextState = state;
        },
        _setCompleteValue: function (value) {
            this._state._setCompleteValue(this, value);
            this._run();
        },
        _setChainedErrorValue: function (value, context) {
            var result = this._state._setErrorValue(this, value, detailsForChainedError, context);
            this._run();
            return result;
        },
        _setExceptionValue: function (value) {
            var result = this._state._setErrorValue(this, value, detailsForException);
            this._run();
            return result;
        },
        _run: function () {
            while (this._nextState) {
                this._state = this._nextState;
                this._nextState = null;
                this._state.enter(this);
            }
        }
    }, {
        supportedForProcessing: false
    });

    //
    // Implementations of shared state machine code.
    //

    function completed(promise, value) {
        var targetState;
        if (value && typeof value === "object" && typeof value.then === "function") {
            targetState = state_waiting;
        } else {
            targetState = state_success_notify;
        }
        promise._value = value;
        promise._setState(targetState);
    }
    function createErrorDetails(exception, error, promise, id, parent, handler) {
        return {
            exception: exception,
            error: error,
            promise: promise,
            handler: handler,
            id: id,
            parent: parent
        };
    }
    function detailsForHandledError(promise, errorValue, context, handler) {
        var exception = context._isException;
        var errorId = context._errorId;
        return createErrorDetails(
            exception ? errorValue : null,
            exception ? null : errorValue,
            promise,
            errorId,
            context,
            handler
        );
    }
    function detailsForChainedError(promise, errorValue, context) {
        var exception = context._isException;
        var errorId = context._errorId;
        setErrorInfo(promise, errorId, exception);
        return createErrorDetails(
            exception ? errorValue : null,
            exception ? null : errorValue,
            promise,
            errorId,
            context
        );
    }
    function detailsForError(promise, errorValue) {
        var errorId = ++error_number;
        setErrorInfo(promise, errorId);
        return createErrorDetails(
            null,
            errorValue,
            promise,
            errorId
        );
    }
    function detailsForException(promise, exceptionValue) {
        var errorId = ++error_number;
        setErrorInfo(promise, errorId, true);
        return createErrorDetails(
            exceptionValue,
            null,
            promise,
            errorId
        );
    }
    function done(promise, onComplete, onError, onProgress) {
        pushListener(promise, { c: onComplete, e: onError, p: onProgress });
    }
    function error(promise, value, onerrorDetails, context) {
        promise._value = value;
        callonerror(promise, value, onerrorDetails, context);
        promise._setState(state_error_notify);
    }
    function notifySuccess(promise, queue) {
        var value = promise._value;
        var listeners = promise._listeners;
        if (!listeners) {
            return;
        }
        promise._listeners = null;
        var i, len;
        for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
            var listener = len === 1 ? listeners : listeners[i];
            var onComplete = listener.c;
            var target = listener.promise;
            if (target) {
                try {
                    target._setCompleteValue(onComplete ? onComplete(value) : value);
                } catch (ex) {
                    target._setExceptionValue(ex);
                }
                if (target._state !== state_waiting && target._listeners) {
                    queue.push(target);
                }
            } else {
                CompletePromise.prototype.done.call(promise, onComplete);
            }
        }
    }
    function notifyError(promise, queue) {
        var value = promise._value;
        var listeners = promise._listeners;
        if (!listeners) {
            return;
        }
        promise._listeners = null;
        var i, len;
        for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
            var listener = len === 1 ? listeners : listeners[i];
            var onError = listener.e;
            var target = listener.promise;
            if (target) {
                try {
                    if (onError) {
                        if (!onError.handlesOnError) {
                            callonerror(target, value, detailsForHandledError, promise, onError);
                        }
                        target._setCompleteValue(onError(value))
                    } else {
                        target._setChainedErrorValue(value, promise);
                    }
                } catch (ex) {
                    target._setExceptionValue(ex);
                }
                if (target._state !== state_waiting && target._listeners) {
                    queue.push(target);
                }
            } else {
                ErrorPromise.prototype.done.call(promise, null, onError);
            }
        }
    }
    function callonerror(promise, value, onerrorDetailsGenerator, context, handler) {
        if (promiseEventListeners._listeners[errorET]) {
            if (value instanceof Error && value.message === canceledName) {
                return;
            }
            promiseEventListeners.dispatchEvent(errorET, onerrorDetailsGenerator(promise, value, context, handler));
        }
    }
    function progress(promise, value) {
        var listeners = promise._listeners;
        if (listeners) {
            var i, len;
            for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
                var listener = len === 1 ? listeners : listeners[i];
                var onProgress = listener.p;
                if (onProgress) {
                    try { onProgress(value); } catch (ex) { }
                }
                if (!(listener.c || listener.e) && listener.promise) {
                    listener.promise._progress(value);
                }
            }
        }
    }
    function pushListener(promise, listener) {
        var listeners = promise._listeners;
        if (listeners) {
            // We may have either a single listener (which will never be wrapped in an array)
            // or 2+ listeners (which will be wrapped). Since we are now adding one more listener
            // we may have to wrap the single listener before adding the second.
            listeners = Array.isArray(listeners) ? listeners : [listeners];
            listeners.push(listener);
        } else {
            listeners = listener;
        }
        promise._listeners = listeners;
    }
    // The difference beween setCompleteValue()/setErrorValue() and complete()/error() is that setXXXValue() moves
    // a promise directly to the success/error state without starting another notification pass (because one
    // is already ongoing).
    function setErrorInfo(promise, errorId, isException) {
        promise._isException = isException || false;
        promise._errorId = errorId;
    }
    function setErrorValue(promise, value, onerrorDetails, context) {
        promise._value = value;
        callonerror(promise, value, onerrorDetails, context);
        promise._setState(state_error);
    }
    function setCompleteValue(promise, value) {
        var targetState;
        if (value && typeof value === "object" && typeof value.then === "function") {
            targetState = state_waiting;
        } else {
            targetState = state_success;
        }
        promise._value = value;
        promise._setState(targetState);
    }
    function then(promise, onComplete, onError, onProgress) {
        var result = new ThenPromise(promise);
        pushListener(promise, { promise: result, c: onComplete, e: onError, p: onProgress });
        return result;
    }

    //
    // Internal implementation detail promise, ThenPromise is created when a promise needs
    // to be returned from a then() method.
    //
    var ThenPromise = WinJS.Class.derive(PromiseStateMachine,
        function (creator) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.thenPromise))) {
                this._stack = WinJS.Promise._getStack();
            }

            this._creator = creator;
            this._setState(state_created);
            this._run();
        }, {
            _creator: null,

            _cancelAction: function () { if (this._creator) { this._creator.cancel(); } },
            _cleanupAction: function () { this._creator = null; }
        }, {
            supportedForProcessing: false
        }
    );

    //
    // Slim promise implementations for already completed promises, these are created
    // under the hood on synchronous completion paths as well as by WinJS.Promise.wrap
    // and WinJS.Promise.wrapError.
    //

    var ErrorPromise = WinJS.Class.define(
        function ErrorPromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.errorPromise))) {
                this._stack = WinJS.Promise._getStack();
            }

            this._value = value;
            callonerror(this, value, detailsForError);
        }, {
            cancel: function () {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
                /// <summary locid="WinJS.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
            },
            done: function ErrorPromise_done(unused, onError) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
                /// <summary locid="WinJS.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                var value = this._value;
                if (onError) {
                    try {
                        if (!onError.handlesOnError) {
                            callonerror(null, value, detailsForHandledError, this, onError);
                        }
                        var result = onError(value);
                        if (result && typeof result === "object" && typeof result.done === "function") {
                            // If a promise is returned we need to wait on it.
                            result.done();
                        }
                        return;
                    } catch (ex) {
                        value = ex;
                    }
                }
                if (value instanceof Error && value.message === canceledName) {
                    // suppress cancel
                    return;
                }
                // force the exception to be thrown asyncronously to avoid any try/catch blocks
                //
                setImmediate(function () {
                    throw value;
                });
            },
            then: function ErrorPromise_then(unused, onError) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
                /// <summary locid="WinJS.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>

                // If the promise is already in a error state and no error handler is provided
                // we optimize by simply returning the promise instead of creating a new one.
                //
                if (!onError) { return this; }
                var result;
                var value = this._value;
                try {
                    if (!onError.handlesOnError) {
                        callonerror(null, value, detailsForHandledError, this, onError);
                    }
                    result = new CompletePromise(onError(value));
                } catch (ex) {
                    // If the value throw from the error handler is the same as the value
                    // provided to the error handler then there is no need for a new promise.
                    //
                    if (ex === value) {
                        result = this;
                    } else {
                        result = new ExceptionPromise(ex);
                    }
                }
                return result;
            }
        }, {
            supportedForProcessing: false
        }
    );

    var ExceptionPromise = WinJS.Class.derive(ErrorPromise,
        function ExceptionPromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.exceptionPromise))) {
                this._stack = WinJS.Promise._getStack();
            }

            this._value = value;
            callonerror(this, value, detailsForException);
        }, {
            /* empty */
        }, {
            supportedForProcessing: false
        }
    );

    var CompletePromise = WinJS.Class.define(
        function CompletePromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.completePromise))) {
                this._stack = WinJS.Promise._getStack();
            }

            if (value && typeof value === "object" && typeof value.then === "function") {
                var result = new ThenPromise(null);
                result._setCompleteValue(value);
                return result;
            }
            this._value = value;
        }, {
            cancel: function () {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
                /// <summary locid="WinJS.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
            },
            done: function CompletePromise_done(onComplete) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
                /// <summary locid="WinJS.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                if (!onComplete) { return; }
                try {
                    var result = onComplete(this._value);
                    if (result && typeof result === "object" && typeof result.done === "function") {
                        result.done();
                    }
                } catch (ex) {
                    // force the exception to be thrown asynchronously to avoid any try/catch blocks
                    setImmediate(function () {
                        throw ex;
                    });
                }
            },
            then: function CompletePromise_then(onComplete) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
                /// <summary locid="WinJS.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>
                try {
                    // If the value returned from the completion handler is the same as the value
                    // provided to the completion handler then there is no need for a new promise.
                    //
                    var newValue = onComplete ? onComplete(this._value) : this._value;
                    return newValue === this._value ? this : new CompletePromise(newValue);
                } catch (ex) {
                    return new ExceptionPromise(ex);
                }
            }
        }, {
            supportedForProcessing: false
        }
    );

    //
    // Promise is the user-creatable WinJS.Promise object.
    //

    function timeout(timeoutMS) {
        var id;
        return new WinJS.Promise(
            function (c) {
                if (timeoutMS) {
                    id = setTimeout(c, timeoutMS);
                } else {
                    setImmediate(c);
                }
            },
            function () {
                if (id) {
                    clearTimeout(id);
                }
            }
        );
    }

    function timeoutWithPromise(timeout, promise) {
        var cancelPromise = function () { promise.cancel(); }
        var cancelTimeout = function () { timeout.cancel(); }
        timeout.then(cancelPromise);
        promise.then(cancelTimeout, cancelTimeout);
        return promise;
    }

    var staticCanceledPromise;

    var Promise = WinJS.Class.derive(PromiseStateMachine,
        function Promise_ctor(init, oncancel) {
            /// <signature helpKeyword="WinJS.Promise">
            /// <summary locid="WinJS.Promise">
            /// A promise provides a mechanism to schedule work to be done on a value that
            /// has not yet been computed. It is a convenient abstraction for managing
            /// interactions with asynchronous APIs.
            /// </summary>
            /// <param name="init" type="Function" locid="WinJS.Promise_p:init">
            /// The function that is called during construction of the  promise. The function
            /// is given three arguments (complete, error, progress). Inside this function
            /// you should add event listeners for the notifications supported by this value.
            /// </param>
            /// <param name="oncancel" optional="true" locid="WinJS.Promise_p:oncancel">
            /// The function to call if a consumer of this promise wants
            /// to cancel its undone work. Promises are not required to
            /// support cancellation.
            /// </param>
            /// </signature>

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.promise))) {
                this._stack = WinJS.Promise._getStack();
            }

            this._oncancel = oncancel;
            this._setState(state_created);
            this._run();

            try {
                var complete = this._completed.bind(this);
                var error = this._error.bind(this);
                var progress = this._progress.bind(this);
                init(complete, error, progress);
            } catch (ex) {
                this._setExceptionValue(ex);
            }
        }, {
            _oncancel: null,

            _cancelAction: function () {
                if (this._oncancel) {
                    try { this._oncancel(); } catch (ex) { }
                }
            },
            _cleanupAction: function () { this._oncancel = null; }
        }, {

            addEventListener: function Promise_addEventListener(eventType, listener, capture) {
                /// <signature helpKeyword="WinJS.Promise.addEventListener">
                /// <summary locid="WinJS.Promise.addEventListener">
                /// Adds an event listener to the control.
                /// </summary>
                /// <param name="eventType" locid="WinJS.Promise.addEventListener_p:eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name="listener" locid="WinJS.Promise.addEventListener_p:listener">
                /// The listener to invoke when the event is raised.
                /// </param>
                /// <param name="capture" locid="WinJS.Promise.addEventListener_p:capture">
                /// Specifies whether or not to initiate capture.
                /// </param>
                /// </signature>
                promiseEventListeners.addEventListener(eventType, listener, capture);
            },
            any: function Promise_any(values) {
                /// <signature helpKeyword="WinJS.Promise.any">
                /// <summary locid="WinJS.Promise.any">
                /// Returns a promise that is fulfilled when one of the input promises
                /// has been fulfilled.
                /// </summary>
                /// <param name="values" type="Array" locid="WinJS.Promise.any_p:values">
                /// An array that contains promise objects or objects whose property
                /// values include promise objects.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.any_returnValue">
                /// A promise that on fulfillment yields the value of the input (complete or error).
                /// </returns>
                /// </signature>
                return new Promise(
                    function (complete, error, progress) {
                        var keys = Object.keys(values);
                        var errors = Array.isArray(values) ? [] : {};
                        if (keys.length === 0) {
                            complete();
                        }
                        var canceled = 0;
                        keys.forEach(function (key) {
                            Promise.as(values[key]).then(
                                function () { complete({ key: key, value: values[key] }); },
                                function (e) {
                                    if (e instanceof Error && e.name === canceledName) {
                                        if ((++canceled) === keys.length) {
                                            complete(WinJS.Promise.cancel);
                                        }
                                        return;
                                    }
                                    error({ key: key, value: values[key] });
                                }
                            );
                        });
                    },
                    function () {
                        var keys = Object.keys(values);
                        keys.forEach(function (key) {
                            var promise = Promise.as(values[key]);
                            if (typeof promise.cancel === "function") {
                                promise.cancel();
                            }
                        });
                    }
                );
            },
            as: function Promise_as(value) {
                /// <signature helpKeyword="WinJS.Promise.as">
                /// <summary locid="WinJS.Promise.as">
                /// Returns a promise. If the object is already a promise it is returned;
                /// otherwise the object is wrapped in a promise.
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.as_p:value">
                /// The value to be treated as a promise.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.as_returnValue">
                /// A promise.
                /// </returns>
                /// </signature>
                if (value && typeof value === "object" && typeof value.then === "function") {
                    return value;
                }
                return new CompletePromise(value);
            },
            /// <field type="WinJS.Promise" helpKeyword="WinJS.Promise.cancel" locid="WinJS.Promise.cancel">
            /// Canceled promise value, can be returned from a promise completion handler
            /// to indicate cancelation of the promise chain.
            /// </field>
            cancel: {
                get: function () {
                    return (staticCanceledPromise = staticCanceledPromise || new ErrorPromise(new WinJS.ErrorFromName(canceledName)));
                }
            },
            dispatchEvent: function Promise_dispatchEvent(eventType, details) {
                /// <signature helpKeyword="WinJS.Promise.dispatchEvent">
                /// <summary locid="WinJS.Promise.dispatchEvent">
                /// Raises an event of the specified type and properties.
                /// </summary>
                /// <param name="eventType" locid="WinJS.Promise.dispatchEvent_p:eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name="details" locid="WinJS.Promise.dispatchEvent_p:details">
                /// The set of additional properties to be attached to the event object.
                /// </param>
                /// <returns type="Boolean" locid="WinJS.Promise.dispatchEvent_returnValue">
                /// Specifies whether preventDefault was called on the event.
                /// </returns>
                /// </signature>
                return promiseEventListeners.dispatchEvent(eventType, details);
            },
            is: function Promise_is(value) {
                /// <signature helpKeyword="WinJS.Promise.is">
                /// <summary locid="WinJS.Promise.is">
                /// Determines whether a value fulfills the promise contract.
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.is_p:value">
                /// A value that may be a promise.
                /// </param>
                /// <returns type="Boolean" locid="WinJS.Promise.is_returnValue">
                /// true if the specified value is a promise, otherwise false.
                /// </returns>
                /// </signature>
                return value && typeof value === "object" && typeof value.then === "function";
            },
            join: function Promise_join(values) {
                /// <signature helpKeyword="WinJS.Promise.join">
                /// <summary locid="WinJS.Promise.join">
                /// Creates a promise that is fulfilled when all the values are fulfilled.
                /// </summary>
                /// <param name="values" type="Object" locid="WinJS.Promise.join_p:values">
                /// An object whose fields contain values, some of which may be promises.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.join_returnValue">
                /// A promise whose value is an object with the same field names as those of the object in the values parameter, where
                /// each field value is the fulfilled value of a promise.
                /// </returns>
                /// </signature>
                return new Promise(
                    function (complete, error, progress) {
                        var keys = Object.keys(values);
                        var errors = Array.isArray(values) ? [] : {};
                        var results = Array.isArray(values) ? [] : {};
                        var undefineds = 0;
                        var pending = keys.length;
                        var argDone = function (key) {
                            if ((--pending) === 0) {
                                var errorCount = Object.keys(errors).length;
                                if (errorCount === 0) {
                                    complete(results);
                                } else {
                                    var canceledCount = 0;
                                    keys.forEach(function (key) {
                                        var e = errors[key];
                                        if (e instanceof Error && e.name === canceledName) {
                                            canceledCount++;
                                        }
                                    });
                                    if (canceledCount === errorCount) {
                                        complete(WinJS.Promise.cancel);
                                    } else {
                                        error(errors);
                                    }
                                }
                            } else {
                                progress({ Key: key, Done: true });
                            }
                        };
                        keys.forEach(function (key) {
                            var value = values[key];
                            if (value === undefined) {
                                undefineds++;
                            } else {
                                Promise.then(value,
                                    function (value) { results[key] = value; argDone(key); },
                                    function (value) { errors[key] = value; argDone(key); }
                                );
                            }
                        });
                        pending -= undefineds;
                        if (pending === 0) {
                            complete(results);
                            return;
                        }
                    },
                    function () {
                        Object.keys(values).forEach(function (key) {
                            var promise = Promise.as(values[key]);
                            if (typeof promise.cancel === "function") {
                                promise.cancel();
                            }
                        });
                    }
                );
            },
            removeEventListener: function Promise_removeEventListener(eventType, listener, capture) {
                /// <signature helpKeyword="WinJS.Promise.removeEventListener">
                /// <summary locid="WinJS.Promise.removeEventListener">
                /// Removes an event listener from the control.
                /// </summary>
                /// <param name='eventType' locid="WinJS.Promise.removeEventListener_eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name='listener' locid="WinJS.Promise.removeEventListener_listener">
                /// The listener to remove.
                /// </param>
                /// <param name='capture' locid="WinJS.Promise.removeEventListener_capture">
                /// Specifies whether or not to initiate capture.
                /// </param>
                /// </signature>
                promiseEventListeners.removeEventListener(eventType, listener, capture);
            },
            supportedForProcessing: false,
            then: function Promise_then(value, onComplete, onError, onProgress) {
                /// <signature helpKeyword="WinJS.Promise.then">
                /// <summary locid="WinJS.Promise.then">
                /// A static version of the promise instance method then().
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.then_p:value">
                /// the value to be treated as a promise.
                /// </param>
                /// <param name="onComplete" type="Function" locid="WinJS.Promise.then_p:complete">
                /// The function to be called if the promise is fulfilled with a value.
                /// If it is null, the promise simply
                /// returns the value. The value is passed as the single argument.
                /// </param>
                /// <param name="onError" type="Function" optional="true" locid="WinJS.Promise.then_p:error">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument.
                /// </param>
                /// <param name="onProgress" type="Function" optional="true" locid="WinJS.Promise.then_p:progress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.then_returnValue">
                /// A promise whose value is the result of executing the provided complete function.
                /// </returns>
                /// </signature>
                return Promise.as(value).then(onComplete, onError, onProgress);
            },
            thenEach: function Promise_thenEach(values, onComplete, onError, onProgress) {
                /// <signature helpKeyword="WinJS.Promise.thenEach">
                /// <summary locid="WinJS.Promise.thenEach">
                /// Performs an operation on all the input promises and returns a promise
                /// that has the shape of the input and contains the result of the operation
                /// that has been performed on each input.
                /// </summary>
                /// <param name="values" locid="WinJS.Promise.thenEach_p:values">
                /// A set of values (which could be either an array or an object) of which some or all are promises.
                /// </param>
                /// <param name="onComplete" type="Function" locid="WinJS.Promise.thenEach_p:complete">
                /// The function to be called if the promise is fulfilled with a value.
                /// If the value is null, the promise returns the value.
                /// The value is passed as the single argument.
                /// </param>
                /// <param name="onError" type="Function" optional="true" locid="WinJS.Promise.thenEach_p:error">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument.
                /// </param>
                /// <param name="onProgress" type="Function" optional="true" locid="WinJS.Promise.thenEach_p:progress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.thenEach_returnValue">
                /// A promise that is the result of calling Promise.join on the values parameter.
                /// </returns>
                /// </signature>
                var result = Array.isArray(values) ? [] : {};
                Object.keys(values).forEach(function (key) {
                    result[key] = Promise.as(values[key]).then(onComplete, onError, onProgress);
                });
                return Promise.join(result);
            },
            timeout: function Promise_timeout(time, promise) {
                /// <signature helpKeyword="WinJS.Promise.timeout">
                /// <summary locid="WinJS.Promise.timeout">
                /// Creates a promise that is fulfilled after a timeout.
                /// </summary>
                /// <param name="timeout" type="Number" optional="true" locid="WinJS.Promise.timeout_p:timeout">
                /// The timeout period in milliseconds. If this value is zero or not specified
                /// setImmediate is called, otherwise setTimeout is called.
                /// </param>
                /// <param name="promise" type="Promise" optional="true" locid="WinJS.Promise.timeout_p:promise">
                /// A promise that will be canceled if it doesn't complete before the
                /// timeout has expired.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.timeout_returnValue">
                /// A promise that is completed asynchronously after the specified timeout.
                /// </returns>
                /// </signature>
                var to = timeout(time);
                return promise ? timeoutWithPromise(to, promise) : to;
            },
            wrap: function Promise_wrap(value) {
                /// <signature helpKeyword="WinJS.Promise.wrap">
                /// <summary locid="WinJS.Promise.wrap">
                /// Wraps a non-promise value in a promise. You can use this function if you need
                /// to pass a value to a function that requires a promise.
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.wrap_p:value">
                /// Some non-promise value to be wrapped in a promise.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.wrap_returnValue">
                /// A promise that is successfully fulfilled with the specified value
                /// </returns>
                /// </signature>
                return new CompletePromise(value);
            },
            wrapError: function Promise_wrapError(error) {
                /// <signature helpKeyword="WinJS.Promise.wrapError">
                /// <summary locid="WinJS.Promise.wrapError">
                /// Wraps a non-promise error value in a promise. You can use this function if you need
                /// to pass an error to a function that requires a promise.
                /// </summary>
                /// <param name="error" locid="WinJS.Promise.wrapError_p:error">
                /// A non-promise error value to be wrapped in a promise.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.wrapError_returnValue">
                /// A promise that is in an error state with the specified value.
                /// </returns>
                /// </signature>
                return new ErrorPromise(error);
            },

            _veryExpensiveTagWithStack: {
                get: function () { return tagWithStack; },
                set: function (value) { tagWithStack = value; }
            },
            _veryExpensiveTagWithStack_tag: tag,
            _getStack: function () {
                if (Debug.debuggerEnabled) {
                    try { throw new Error(); } catch (e) { return e.stack; }
                }
            },

        }
    );
    Object.defineProperties(Promise, WinJS.Utilities.createEventProperties(errorET));

    var SignalPromise = WinJS.Class.derive(PromiseStateMachine,
        function (cancel) {
            this._oncancel = cancel;
            this._setState(state_created);
            this._run();
        }, {
            _cancelAction: function () { this._oncancel && this._oncancel(); },
            _cleanupAction: function () { this._oncancel = null; }
        }, {
            supportedForProcessing: false
        }
    );

    var Signal = WinJS.Class.define(
        function Signal_ctor(oncancel) {
            this._promise = new SignalPromise(oncancel);
        }, {
            promise: {
                get: function () { return this._promise; }
            },

            cancel: function Signal_cancel() {
                this._promise.cancel();
            },
            complete: function Signal_complete(value) {
                this._promise._completed(value);
            },
            error: function Signal_error(value) {
                this._promise._error(value);
            },
            progress: function Signal_progress(value) {
                this._promise._progress(value);
            }
        }, {
            supportedForProcessing: false,
        }
    );

    // Publish WinJS.Promise
    //
    WinJS.Namespace.define("WinJS", {
        Promise: Promise,
        _Signal: Signal
    });

}(this));

(function errorsInit(global, WinJS) {
    "use strict";


    WinJS.Namespace.define("WinJS", {
        // ErrorFromName establishes a simple pattern for returning error codes.
        //
        ErrorFromName: WinJS.Class.derive(Error, function (name, message) {
            /// <signature helpKeyword="WinJS.ErrorFromName">
            /// <summary locid="WinJS.ErrorFromName">
            /// Creates an Error object with the specified name and message properties.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.ErrorFromName_p:name">The name of this error. The name is meant to be consumed programmatically and should not be localized.</param>
            /// <param name="message" type="String" optional="true" locid="WinJS.ErrorFromName_p:message">The message for this error. The message is meant to be consumed by humans and should be localized.</param>
            /// <returns type="Error" locid="WinJS.ErrorFromName_returnValue">Error instance with .name and .message properties populated</returns>
            /// </signature>
            this.name = name;
            this.message = message || name;
        }, {
            /* empty */
        }, {
            supportedForProcessing: false,
        })
    });

})(this, WinJS);


(function xhrInit() {
    "use strict";


    WinJS.Namespace.define("WinJS", {
        xhr: function (options) {
            /// <signature helpKeyword="WinJS.xhr">
            /// <summary locid="WinJS.xhr">
            /// Wraps calls to XMLHttpRequest in a promise.
            /// </summary>
            /// <param name="options" type="Object" locid="WinJS.xhr_p:options">
            /// The options that are applied to the XMLHttpRequest object. They are: type,
            /// url, user, password, headers, responseType, data, and customRequestInitializer.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.xhr_returnValue">
            /// A promise that returns the XMLHttpRequest object when it completes.
            /// </returns>
            /// </signature>
            var req;
            return new WinJS.Promise(
                function (c, e, p) {
                    /// <returns value="c(new XMLHttpRequest())" locid="WinJS.xhr.constructor._returnValue" />
                    req = new XMLHttpRequest();
                    req.onreadystatechange = function () {
                        if (req._canceled) { return; }

                        if (req.readyState === 4) {
                            if (req.status >= 200 && req.status < 300) {
                                c(req);
                            } else {
                                e(req);
                            }
                            req.onreadystatechange = function () { };
                        } else {
                            p(req);
                        }
                    };

                    req.open(
                        options.type || "GET",
                        options.url,
                        // Promise based XHR does not support sync.
                        //
                        true,
                        options.user,
                        options.password
                    );
                    req.responseType = options.responseType || "";

                    Object.keys(options.headers || {}).forEach(function (k) {
                        req.setRequestHeader(k, options.headers[k]);
                    });

                    if (options.customRequestInitializer) {
                        options.customRequestInitializer(req);
                    }

                    req.send(options.data);
                },
                function () {
                    req._canceled = true;
                    req.abort();
                }
            );
        }
    });

})();


(function safeHTMLInit(global, undefined) {
    "use strict";


    var setInnerHTML,
        setInnerHTMLUnsafe,
        setOuterHTML,
        setOuterHTMLUnsafe,
        insertAdjacentHTML,
        insertAdjacentHTMLUnsafe;

    var strings = {
        get nonStaticHTML() { return WinJS.Resources._getWinJSString("base/nonStaticHTML").value; },
    };

    setInnerHTML = setInnerHTMLUnsafe = function (element, text) {
        /// <signature helpKeyword="WinJS.Utilities.setInnerHTML">
        /// <summary locid="WinJS.Utilities.setInnerHTML">
        /// Sets the innerHTML property of the specified element to the specified text.
        /// </summary>
        /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.setInnerHTML_p:element">
        /// The element on which the innerHTML property is to be set.
        /// </param>
        /// <param name="text" type="String" locid="WinJS.Utilities.setInnerHTML_p:text">
        /// The value to be set to the innerHTML property.
        /// </param>
        /// </signature>
        element.innerHTML = text;
    };
    setOuterHTML = setOuterHTMLUnsafe = function (element, text) {
        /// <signature helpKeyword="WinJS.Utilities.setOuterHTML">
        /// <summary locid="WinJS.Utilities.setOuterHTML">
        /// Sets the outerHTML property of the specified element to the specified text.
        /// </summary>
        /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.setOuterHTML_p:element">
        /// The element on which the outerHTML property is to be set.
        /// </param>
        /// <param name="text" type="String" locid="WinJS.Utilities.setOuterHTML_p:text">
        /// The value to be set to the outerHTML property.
        /// </param>
        /// </signature>
        element.outerHTML = text;
    };
    insertAdjacentHTML = insertAdjacentHTMLUnsafe = function (element, position, text) {
        /// <signature helpKeyword="WinJS.Utilities.insertAdjacentHTML">
        /// <summary locid="WinJS.Utilities.insertAdjacentHTML">
        /// Calls insertAdjacentHTML on the specified element.
        /// </summary>
        /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.insertAdjacentHTML_p:element">
        /// The element on which insertAdjacentHTML is to be called.
        /// </param>
        /// <param name="position" type="String" locid="WinJS.Utilities.insertAdjacentHTML_p:position">
        /// The position relative to the element at which to insert the HTML.
        /// </param>
        /// <param name="text" type="String" locid="WinJS.Utilities.insertAdjacentHTML_p:text">
        /// The value to be provided to insertAdjacentHTML.
        /// </param>
        /// </signature>
        element.insertAdjacentHTML(position, text);
    };

    var msApp = global.MSApp;
    if (msApp) {
        setInnerHTMLUnsafe = function (element, text) {
            /// <signature helpKeyword="WinJS.Utilities.setInnerHTMLUnsafe">
            /// <summary locid="WinJS.Utilities.setInnerHTMLUnsafe">
            /// Sets the innerHTML property of the specified element to the specified text.
            /// </summary>
            /// <param name='element' type='HTMLElement' locid="WinJS.Utilities.setInnerHTMLUnsafe_p:element">
            /// The element on which the innerHTML property is to be set.
            /// </param>
            /// <param name='text' type="String" locid="WinJS.Utilities.setInnerHTMLUnsafe_p:text">
            /// The value to be set to the innerHTML property.
            /// </param>
            /// </signature>
            msApp.execUnsafeLocalFunction(function () {
                element.innerHTML = text;
            });
        };
        setOuterHTMLUnsafe = function (element, text) {
            /// <signature helpKeyword="WinJS.Utilities.setOuterHTMLUnsafe">
            /// <summary locid="WinJS.Utilities.setOuterHTMLUnsafe">
            /// Sets the outerHTML property of the specified element to the specified text
            /// in the context of msWWA.execUnsafeLocalFunction.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.setOuterHTMLUnsafe_p:element">
            /// The element on which the outerHTML property is to be set.
            /// </param>
            /// <param name="text" type="String" locid="WinJS.Utilities.setOuterHTMLUnsafe_p:text">
            /// The value to be set to the outerHTML property.
            /// </param>
            /// </signature>
            msApp.execUnsafeLocalFunction(function () {
                element.outerHTML = text;
            });
        };
        insertAdjacentHTMLUnsafe = function (element, position, text) {
            /// <signature helpKeyword="WinJS.Utilities.insertAdjacentHTMLUnsafe">
            /// <summary locid="WinJS.Utilities.insertAdjacentHTMLUnsafe">
            /// Calls insertAdjacentHTML on the specified element in the context
            /// of msWWA.execUnsafeLocalFunction.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.insertAdjacentHTMLUnsafe_p:element">
            /// The element on which insertAdjacentHTML is to be called.
            /// </param>
            /// <param name="position" type="String" locid="WinJS.Utilities.insertAdjacentHTMLUnsafe_p:position">
            /// The position relative to the element at which to insert the HTML.
            /// </param>
            /// <param name="text" type="String" locid="WinJS.Utilities.insertAdjacentHTMLUnsafe_p:text">
            /// Value to be provided to insertAdjacentHTML.
            /// </param>
            /// </signature>
            msApp.execUnsafeLocalFunction(function () {
                element.insertAdjacentHTML(position, text);
            });
        };
    }
    else if (global.msIsStaticHTML) {
        var check = function (str) {
            if (!global.msIsStaticHTML(str)) {
                throw new WinJS.ErrorFromName("WinJS.Utitilies.NonStaticHTML", strings.nonStaticHTML);
            }
        }
        // If we ever get isStaticHTML we can attempt to recreate the behavior we have in the local
        // compartment, in the mean-time all we can do is sanitize the input.
        //
        setInnerHTML = function (element, text) {
            /// <signature helpKeyword="WinJS.Utilities.setInnerHTML">
            /// <summary locid="WinJS.Utilities.msIsStaticHTML.setInnerHTML">
            /// Sets the innerHTML property of a element to the specified text
            /// if it passes a msIsStaticHTML check.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.msIsStaticHTML.setInnerHTML_p:element">
            /// The element on which the innerHTML property is to be set.
            /// </param>
            /// <param name="text" type="String" locid="WinJS.Utilities.msIsStaticHTML.setInnerHTML_p:text">
            /// The value to be set to the innerHTML property.
            /// </param>
            /// </signature>
            check(text);
            element.innerHTML = text;
        };
        setOuterHTML = function (element, text) {
            /// <signature helpKeyword="WinJS.Utilities.setOuterHTML">
            /// <summary locid="WinJS.Utilities.msIsStaticHTML.setOuterHTML">
            /// Sets the outerHTML property of a element to the specified text
            /// if it passes a msIsStaticHTML check.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.msIsStaticHTML.setOuterHTML_p:element">
            /// The element on which the outerHTML property is to be set.
            /// </param>
            /// <param name="text" type="String" locid="WinJS.Utilities.msIsStaticHTML.setOuterHTML_p:text">
            /// The value to be set to the outerHTML property.
            /// </param>
            /// </signature>
            check(text);
            element.outerHTML = text;
        };
        insertAdjacentHTML = function (element, position, text) {
            /// <signature helpKeyword="WinJS.Utilities.insertAdjacentHTML">
            /// <summary locid="WinJS.Utilities.msIsStaticHTML.insertAdjacentHTML">
            /// Calls insertAdjacentHTML on the element if it passes
            /// a msIsStaticHTML check.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.msIsStaticHTML.insertAdjacentHTML_p:element">
            /// The element on which insertAdjacentHTML is to be called.
            /// </param>
            /// <param name="position" type="String" locid="WinJS.Utilities.msIsStaticHTML.insertAdjacentHTML_p:position">
            /// The position relative to the element at which to insert the HTML.
            /// </param>
            /// <param name="text" type="String" locid="WinJS.Utilities.msIsStaticHTML.insertAdjacentHTML_p:text">
            /// The value to be provided to insertAdjacentHTML.
            /// </param>
            /// </signature>
            check(text);
            element.insertAdjacentHTML(position, text);
        };
    }

    WinJS.Namespace.define("WinJS.Utilities", {
        setInnerHTML: setInnerHTML,
        setInnerHTMLUnsafe: setInnerHTMLUnsafe,
        setOuterHTML: setOuterHTML,
        setOuterHTMLUnsafe: setOuterHTMLUnsafe,
        insertAdjacentHTML: insertAdjacentHTML,
        insertAdjacentHTMLUnsafe: insertAdjacentHTMLUnsafe
    });

}(this));

(function getWinJSStringInit() {
    "use strict";

    var appxVersion = "Microsoft.WinJS.1.0";
    var developerPrefix = "Developer.";
    if (appxVersion.indexOf(developerPrefix) === 0) {
        appxVersion = appxVersion.substring(developerPrefix.length);
    }

    WinJS.Namespace.define("WinJS.Resources", {
        _getWinJSString: function (id) {
            return WinJS.Resources.getString("ms-resource://" + appxVersion + "/" + id);
        }
    });
}(this));
(function controlInit(global, WinJS, undefined) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }


    var DOMEventMixin = {
        _domElement: null,

        addEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="WinJS.UI.DOMEventMixin.addEventListener">
            /// <summary locid="WinJS.UI.DOMEventMixin.addEventListener">
            /// Adds an event listener to the control.
            /// </summary>
            /// <param name="type" type="String" locid="WinJS.UI.DOMEventMixin.addEventListener_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" type="Function" locid="WinJS.UI.DOMEventMixin.addEventListener_p:listener">
            /// The listener to invoke when the event gets raised.
            /// </param>
            /// <param name="useCapture" type="Boolean" locid="WinJS.UI.DOMEventMixin.addEventListener_p:useCapture">
            /// true to initiate capture; otherwise, false.
            /// </param>
            /// </signature>
            (this.element || this._domElement).addEventListener(type, listener, useCapture || false);
        },
        dispatchEvent: function (type, eventProperties) {
            /// <signature helpKeyword="WinJS.UI.DOMEventMixin.dispatchEvent">
            /// <summary locid="WinJS.UI.DOMEventMixin.dispatchEvent">
            /// Raises an event of the specified type, adding the specified additional properties.
            /// </summary>
            /// <param name="type" type="String" locid="WinJS.UI.DOMEventMixin.dispatchEvent_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="eventProperties" type="Object" locid="WinJS.UI.DOMEventMixin.dispatchEvent_p:eventProperties">
            /// The set of additional properties to be attached to the event object when the event is raised.
            /// </param>
            /// <returns type="Boolean" locid="WinJS.UI.DOMEventMixin.dispatchEvent_returnValue">
            /// true if preventDefault was called on the event, otherwise false.
            /// </returns>
            /// </signature>
            var eventValue = document.createEvent("Event");
            eventValue.initEvent(type, false, false);
            eventValue.detail = eventProperties;
            if (typeof eventProperties === "object") {
                Object.keys(eventProperties).forEach(function (key) {
                    eventValue[key] = eventProperties[key];
                });
            }
            return (this.element || this._domElement).dispatchEvent(eventValue);
        },
        removeEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="WinJS.UI.DOMEventMixin.removeEventListener">
            /// <summary locid="WinJS.UI.DOMEventMixin.removeEventListener">
            /// Removes an event listener from the control.
            /// </summary>
            /// <param name="type" type="String" locid="WinJS.UI.DOMEventMixin.removeEventListener_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" type="Function" locid="WinJS.UI.DOMEventMixin.removeEventListener_p:listener">
            /// The listener to remove.
            /// </param>
            /// <param name="useCapture" type="Boolean" locid="WinJS.UI.DOMEventMixin.removeEventListener_p:useCapture">
            /// true to initiate capture; otherwise, false.
            /// </param>
            /// </signature>
            (this.element || this._domElement).removeEventListener(type, listener, useCapture || false);
        }
    };

    function setOptions(control, options) {
        /// <signature helpKeyword="WinJS.UI.DOMEventMixin.setOptions">
        /// <summary locid="WinJS.UI.DOMEventMixin.setOptions">
        /// Adds the set of declaratively specified options (properties and events) to the specified control.
        /// If name of the options property begins with "on", the property value is a function and the control
        /// supports addEventListener. The setOptions method calls the addEventListener method on the control.
        /// </summary>
        /// <param name="control" type="Object" domElement="false" locid="WinJS.UI.DOMEventMixin.setOptions_p:control">
        /// The control on which the properties and events are to be applied.
        /// </param>
        /// <param name="options" type="Object" domElement="false" locid="WinJS.UI.DOMEventMixin.setOptions_p:options">
        /// The set of options that are specified declaratively.
        /// </param>
        /// </signature>
        _setOptions(control, options);
    };

    function _setOptions(control, options, eventsOnly) {
        if (typeof options === "object") {
            var keys = Object.keys(options);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                var value = options[key];
                if (key.length > 2) {
                    var ch1 = key[0];
                    var ch2 = key[1];
                    if ((ch1 === 'o' || ch1 === 'O') && (ch2 === 'n' || ch2 === 'N')) {
                        if (typeof value === "function") {
                            if (control.addEventListener) {
                                control.addEventListener(key.substr(2), value);
                                continue;
                            }
                        }
                    }
                }

                if (!eventsOnly) {
                    control[key] = value;
                }
            }
        }
    };

    WinJS.Namespace.define("WinJS.UI", {
        DOMEventMixin: DOMEventMixin,
        setOptions: setOptions,
        _setOptions: _setOptions
    });


})(this, WinJS);


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

(function elementListUtilities(global, WinJS, undefined) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    var QueryCollection = WinJS.Class.derive(Array, function (items) {
        /// <signature helpKeyword="WinJS.Utilities.QueryCollection">
        /// <summary locid="WinJS.Utilities.QueryCollection">
        /// Represents the result of a query selector, and provides
        /// various operations that perform actions over the elements of
        /// the collection.
        /// </summary>
        /// <param name="items" locid="WinJS.Utilities.QueryCollection_p:items">
        /// The items resulting from the query.
        /// </param>
        /// </signature>
        if (items) {
            this.include(items);
        }
    }, {
        forEach: function (callbackFn, thisArg) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.forEach">
            /// <summary locid="WinJS.Utilities.QueryCollection.forEach">
            /// Performs an action on each item in the QueryCollection
            /// </summary>
            /// <param name="callbackFn" type="function(value, Number index, traversedObject)" locid="WinJS.Utilities.QueryCollection.forEach_p:callbackFn">
            /// Action to perform on each item.
            /// </param>
            /// <param name="thisArg" isOptional="true" type="function(value, Number index, traversedObject)" locid="WinJS.Utilities.QueryCollection.forEach_p:thisArg">
            /// Argument to bind to callbackFn
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.forEach_returnValue">
            /// Returns the QueryCollection
            /// </returns>
            /// </signature>
            Array.prototype.forEach.apply(this, [callbackFn, thisArg]);
            return this;
        },
        get: function (index) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.get">
            /// <summary locid="WinJS.Utilities.QueryCollection.get">
            /// Gets an item from the QueryCollection.
            /// </summary>
            /// <param name="index" type="Number" locid="WinJS.Utilities.QueryCollection.get_p:index">
            /// The index of the item to return.
            /// </param>
            /// <returns type="Object" locid="WinJS.Utilities.QueryCollection.get_returnValue">
            /// A single item from the collection.
            /// </returns>
            /// </signature>
            return this[index];
        },
        setAttribute: function (name, value) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.setAttribute">
            /// <summary locid="WinJS.Utilities.QueryCollection.setAttribute">
            /// Sets an attribute value on all the items in the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.setAttribute_p:name">
            /// The name of the attribute to be set.
            /// </param>
            /// <param name="value" type="String" locid="WinJS.Utilities.QueryCollection.setAttribute_p:value">
            /// The value of the attribute to be set.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.setAttribute_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                item.setAttribute(name, value);
            });
            return this;
        },
        getAttribute: function (name) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.getAttribute">
            /// <summary locid="WinJS.Utilities.QueryCollection.getAttribute">
            /// Gets an attribute value from the first element in the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.getAttribute_p:name">
            /// The name of the attribute.
            /// </param>
            /// <returns type="String" locid="WinJS.Utilities.QueryCollection.getAttribute_returnValue">
            /// The value of the attribute.
            /// </returns>
            /// </signature>
            if (this.length > 0) {
                return this[0].getAttribute(name);
            }
        },
        addClass: function (name) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.addClass">
            /// <summary locid="WinJS.Utilities.QueryCollection.addClass">
            /// Adds the specified class to all the elements in the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.addClass_p:name">
            /// The name of the class to add.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.addClass_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                WinJS.Utilities.addClass(item, name);
            });
            return this;
        },
        hasClass: function (name) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.hasClass">
            /// <summary locid="WinJS.Utilities.QueryCollection.hasClass">
            /// Determines whether the specified class exists on the first element of the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.hasClass_p:name">
            /// The name of the class.
            /// </param>
            /// <returns type="Boolean" locid="WinJS.Utilities.QueryCollection.hasClass_returnValue">
            /// true if the element has the specified class; otherwise, false.
            /// </returns>
            /// </signature>
            if (this.length > 0) {
                return WinJS.Utilities.hasClass(this[0], name);
            }
            return false;
        },
        removeClass: function (name) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.removeClass">
            /// <summary locid="WinJS.Utilities.QueryCollection.removeClass">
            /// Removes the specified class from all the elements in the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.removeClass_p:name">
            /// The name of the class to be removed.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.removeClass_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                WinJS.Utilities.removeClass(item, name);
            });
            return this;
        },
        toggleClass: function (name) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.toggleClass">&gt;
            /// <summary locid="WinJS.Utilities.QueryCollection.toggleClass">
            /// Toggles (adds or removes) the specified class on all the elements in the collection.
            /// If the class is present, it is removed; if it is absent, it is added.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.toggleClass_p:name">
            /// The name of the class to be toggled.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.toggleClass_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                WinJS.Utilities.toggleClass(item, name);
            });
            return this;
        },
        listen: function (eventType, listener, capture) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.listen">
            /// <summary locid="WinJS.Utilities.QueryCollection.listen">
            /// Registers the listener for the specified event on all the elements in the collection.
            /// </summary>
            /// <param name="eventType" type="String" locid="WinJS.Utilities.QueryCollection.listen_p:eventType">
            /// The name of the event.
            /// </param>
            /// <param name="listener" type="Function" locid="WinJS.Utilities.QueryCollection.listen_p:listener">
            /// The event handler function to be called when the event occurs.
            /// </param>
            /// <param name="capture" type="Boolean" locid="WinJS.Utilities.QueryCollection.listen_p:capture">
            /// true if capture == true is to be passed to addEventListener; otherwise, false.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.listen_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                item.addEventListener(eventType, listener, capture);
            });
            return this;
        },
        removeEventListener: function (eventType, listener, capture) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.removeEventListener">
            /// <summary locid="WinJS.Utilities.QueryCollection.removeEventListener">
            /// Unregisters the listener for the specified event on all the elements in the collection.
            /// </summary>
            /// <param name="eventType" type="String" locid="WinJS.Utilities.QueryCollection.removeEventListener_p:eventType">
            /// The name of the event.
            /// </param>
            /// <param name="listener" type="Function" locid="WinJS.Utilities.QueryCollection.removeEventListener_p:listener">
            /// The event handler function.
            /// </param>
            /// <param name="capture" type="Boolean" locid="WinJS.Utilities.QueryCollection.removeEventListener_p:capture">
            /// true if capture == true; otherwise, false.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.removeEventListener_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                item.removeEventListener(eventType, listener, capture);
            });
            return this;
        },
        setStyle: function (name, value) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.setStyle">
            /// <summary locid="WinJS.Utilities.QueryCollection.setStyle">
            /// Sets the specified style property for all the elements in the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.setStyle_p:name">
            /// The name of the style property.
            /// </param>
            /// <param name="value" type="String" locid="WinJS.Utilities.QueryCollection.setStyle_p:value">
            /// The value for the property.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.setStyle_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                item.style[name] = value;
            });
            return this;
        },
        clearStyle: function (name) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.clearStyle">
            /// <summary locid="WinJS.Utilities.QueryCollection.clearStyle">
            /// Clears the specified style property for all the elements in the collection.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Utilities.QueryCollection.clearStyle_p:name">
            /// The name of the style property to be cleared.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.clearStyle_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            this.forEach(function (item) {
                item.style[name] = "";
            });
            return this;
        },
        query: function (query) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.query">
            /// <summary locid="WinJS.Utilities.QueryCollection.query">
            /// Executes a query selector on all the elements in the collection
            /// and aggregates the result into a QueryCollection.
            /// </summary>
            /// <param name="query" type="String" locid="WinJS.Utilities.QueryCollection.query_p:query">
            /// The query selector string.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.query_returnValue">
            /// A QueryCollection object containing the aggregate results of
            /// executing the query on all the elements in the collection.
            /// </returns>
            /// </signature>
            var newCollection = new WinJS.Utilities.QueryCollection();
            this.forEach(function (item) {
                newCollection.include(item.querySelectorAll(query));
            });
            return newCollection;
        },
        include: function (items) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.include">
            /// <summary locid="WinJS.Utilities.QueryCollection.include">
            /// Adds a set of items to this QueryCollection.
            /// </summary>
            /// <param name="items" locid="WinJS.Utilities.QueryCollection.include_p:items">
            /// The items to add to the QueryCollection. This may be an
            /// array-like object, a document fragment, or a single item.
            /// </param>
            /// </signature>
            if (typeof items.length === "number") {
                for (var i = 0; i < items.length; i++) {
                    this.push(items[i]);
                }
            } else if (items.DOCUMENT_FRAGMENT_NODE && items.nodeType === items.DOCUMENT_FRAGMENT_NODE) {
                this.include(items.childNodes);
            } else {
                this.push(items);
            }
        },
        control: function (ctor, options) {
            /// <signature helpKeyword="WinJS.Utilities.QueryCollection.control">
            /// <summary locid="WinJS.Utilities.QueryCollection.control">
            /// Creates controls that are attached to the elements in this QueryCollection.
            /// </summary>
            /// <param name="ctor" locid="WinJS.Utilities.QueryCollection.control_p:ctor">
            /// A constructor function that is used to create controls to attach to the elements.
            /// </param>
            /// <param name="options" locid="WinJS.Utilities.QueryCollection.control_p:options">
            /// The options passed to the newly-created controls.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.control_returnValue">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>
            /// <signature>
            /// <summary locid="WinJS.Utilities.QueryCollection.control2">
            /// Configures the controls that are attached to the elements in this QueryCollection.
            /// </summary>
            /// <param name="ctor" locid="WinJS.Utilities.QueryCollection.control_p:ctor2">
            /// The options passed to the controls.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.QueryCollection.control_returnValue2">
            /// This QueryCollection object.
            /// </returns>
            /// </signature>

            if (ctor && typeof (ctor) === "function") {
                this.forEach(function (element) {
                    element.winControl = new ctor(element, options);
                });
            } else {
                options = ctor;
                this.forEach(function (element) {
                    WinJS.UI.process(element).done(function (control) {
                        control && WinJS.UI.setOptions(control, options);
                    })
                });
            }
            return this;
        }
    }, {
        supportedForProcessing: false,
    });

    WinJS.Namespace.define("WinJS.Utilities", {
        QueryCollection: QueryCollection,
        query: function (query, element) {
            /// <signature helpKeyword="WinJS.Utilities.query">
            /// <summary locid="WinJS.Utilities.query">
            /// Executes a query selector on the specified element or the entire document.
            /// </summary>
            /// <param name="query" type="String" locid="WinJS.Utilities.query_p:query">
            /// The query selector to be executed.
            /// </param>
            /// <param name="element" optional="true" type="HTMLElement" locid="WinJS.Utilities.query_p:element">
            /// The element on which to execute the query. If this parameter is not specified, the
            /// query is executed on the entire document.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.query_returnValue">
            /// The QueryCollection that contains the results of the query.
            /// </returns>
            /// </signature>
            return new WinJS.Utilities.QueryCollection((element || document).querySelectorAll(query));
        },
        id: function (id) {
            /// <signature helpKeyword="WinJS.Utilities.id">
            /// <summary locid="WinJS.Utilities.id">
            /// Looks up an element by ID and wraps the result in a QueryCollection.
            /// </summary>
            /// <param name="id" type="String" locid="WinJS.Utilities.id_p:id">
            /// The ID of the element.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.id_returnValue">
            /// A QueryCollection that contains the element, if it is found.
            /// </returns>
            /// </signature>
            var e = document.getElementById(id);
            return new WinJS.Utilities.QueryCollection(e ? [e] : []);
        },
        children: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.children">
            /// <summary locid="WinJS.Utilities.children">
            /// Creates a QueryCollection that contains the children of the specified parent element.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.children_p:element">
            /// The parent element.
            /// </param>
            /// <returns type="WinJS.Utilities.QueryCollection" locid="WinJS.Utilities.children_returnValue">
            /// The QueryCollection that contains the children of the element.
            /// </returns>
            /// </signature>
            return new WinJS.Utilities.QueryCollection(element.children);
        }
    });
})(this, WinJS);

(function elementUtilities(global, WinJS, undefined) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    function removeEmpties(arr) {
        var len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            if (!arr[i]) {
                arr.splice(i, 1);
                len--;
            }
        }
        return len;
    }

    function getClassName(e) {
        var name = e.className || "";
        if (typeof (name) == "string") {
            return name;
        }
        else {
            return name.baseVal || "";
        }
    };
    function setClassName(e, value) {
        // SVG elements (which use e.className.baseVal) are never undefined,
        // so this logic makes the comparison a bit more compact.
        //
        var name = e.className || "";
        if (typeof (name) == "string") {
            e.className = value;
        }
        else {
            e.className.baseVal = value;
        }
        return e;
    };
    function getDimension(element, property) {
        return WinJS.Utilities.convertToPixels(element, window.getComputedStyle(element, null)[property]);
    }

    WinJS.Namespace.define("WinJS.Utilities", {
        _dataKey: "_msDataKey",
        _pixelsRE: /^-?\d+(px)?$/i,
        _numberRE: /^-?\d+/i,

        /// <field locid="WinJS.Utilities.Key" helpKeyword="WinJS.Utilities.Key">
        /// Defines a set of keyboard values.
        /// </field>
        Key: {
            /// <field locid="WinJS.Utilities.Key.backspace" helpKeyword="WinJS.Utilities.Key.backspace">
            /// BACKSPACE key.
            /// </field>
            backspace: 8,

            /// <field locid="WinJS.Utilities.Key.tab" helpKeyword="WinJS.Utilities.Key.tab">
            /// TAB key.
            /// </field>
            tab: 9,

            /// <field locid="WinJS.Utilities.Key.enter" helpKeyword="WinJS.Utilities.Key.enter">
            /// ENTER key.
            /// </field>
            enter: 13,

            /// <field locid="WinJS.Utilities.Key.shift" helpKeyword="WinJS.Utilities.Key.shift">
            /// Shift key.
            /// </field>
            shift: 16,

            /// <field locid="WinJS.Utilities.Key.ctrl" helpKeyword="WinJS.Utilities.Key.ctrl">
            /// CTRL key.
            /// </field>
            ctrl: 17,

            /// <field locid="WinJS.Utilities.Key.alt" helpKeyword="WinJS.Utilities.Key.alt">
            /// ALT key
            /// </field>
            alt: 18,

            /// <field locid="WinJS.Utilities.Key.pause" helpKeyword="WinJS.Utilities.Key.pause">
            /// Pause key.
            /// </field>
            pause: 19,

            /// <field locid="WinJS.Utilities.Key.capsLock" helpKeyword="WinJS.Utilities.Key.capsLock">
            /// CAPS LOCK key.
            /// </field>
            capsLock: 20,

            /// <field locid="WinJS.Utilities.Key.escape" helpKeyword="WinJS.Utilities.Key.escape">
            /// ESCAPE key.
            /// </field>
            escape: 27,

            /// <field locid="WinJS.Utilities.Key.space" helpKeyword="WinJS.Utilities.Key.space">
            /// SPACE key.
            /// </field>
            space: 32,

            /// <field locid="WinJS.Utilities.Key.pageUp" helpKeyword="WinJS.Utilities.Key.pageUp">
            /// PAGE UP key.
            /// </field>
            pageUp: 33,

            /// <field locid="WinJS.Utilities.Key.pageDown" helpKeyword="WinJS.Utilities.Key.pageDown">
            /// PAGE DOWN key.
            /// </field>
            pageDown: 34,

            /// <field locid="WinJS.Utilities.Key.end" helpKeyword="WinJS.Utilities.Key.end">
            /// END key.
            /// </field>
            end: 35,

            /// <field locid="WinJS.Utilities.Key.home" helpKeyword="WinJS.Utilities.Key.home">
            /// HOME key.
            /// </field>
            home: 36,

            /// <field locid="WinJS.Utilities.Key.leftArrow" helpKeyword="WinJS.Utilities.Key.leftArrow">
            /// Left arrow key.
            /// </field>
            leftArrow: 37,

            /// <field locid="WinJS.Utilities.Key.upArrow" helpKeyword="WinJS.Utilities.Key.upArrow">
            /// Up arrow key.
            /// </field>
            upArrow: 38,

            /// <field locid="WinJS.Utilities.Key.rightArrow" helpKeyword="WinJS.Utilities.Key.rightArrow">
            /// Right arrow key.
            /// </field>
            rightArrow: 39,

            /// <field locid="WinJS.Utilities.Key.downArrow" helpKeyword="WinJS.Utilities.Key.downArrow">
            /// Down arrow key.
            /// </field>
            downArrow: 40,

            /// <field locid="WinJS.Utilities.Key.insert" helpKeyword="WinJS.Utilities.Key.insert">
            /// INSERT key.
            /// </field>
            insert: 45,

            /// <field locid="WinJS.Utilities.Key.deleteKey" helpKeyword="WinJS.Utilities.Key.deleteKey">
            /// DELETE key.
            /// </field>
            deleteKey: 46,

            /// <field locid="WinJS.Utilities.Key.num0" helpKeyword="WinJS.Utilities.Key.num0">
            /// Number 0 key.
            /// </field>
            num0: 48,

            /// <field locid="WinJS.Utilities.Key.num1" helpKeyword="WinJS.Utilities.Key.num1">
            /// Number 1 key.
            /// </field>
            num1: 49,

            /// <field locid="WinJS.Utilities.Key.num2" helpKeyword="WinJS.Utilities.Key.num2">
            /// Number 2 key.
            /// </field>
            num2: 50,

            /// <field locid="WinJS.Utilities.Key.num3" helpKeyword="WinJS.Utilities.Key.num3">
            /// Number 3 key.
            /// </field>
            num3: 51,

            /// <field locid="WinJS.Utilities.Key.num4" helpKeyword="WinJS.Utilities.Key.num4">
            /// Number 4 key.
            /// </field>
            num4: 52,

            /// <field locid="WinJS.Utilities.Key.num5" helpKeyword="WinJS.Utilities.Key.num5">
            /// Number 5 key.
            /// </field>
            num5: 53,

            /// <field locid="WinJS.Utilities.Key.num6" helpKeyword="WinJS.Utilities.Key.num6">
            /// Number 6 key.
            /// </field>
            num6: 54,

            /// <field locid="WinJS.Utilities.Key.num7" helpKeyword="WinJS.Utilities.Key.num7">
            /// Number 7 key.
            /// </field>
            num7: 55,

            /// <field locid="WinJS.Utilities.Key.num8" helpKeyword="WinJS.Utilities.Key.num8">
            /// Number 8 key.
            /// </field>
            num8: 56,

            /// <field locid="WinJS.Utilities.Key.num9" helpKeyword="WinJS.Utilities.Key.num9">
            /// Number 9 key.
            /// </field>
            num9: 57,

            /// <field locid="WinJS.Utilities.Key.a" helpKeyword="WinJS.Utilities.Key.a">
            /// A key.
            /// </field>
            a: 65,

            /// <field locid="WinJS.Utilities.Key.b" helpKeyword="WinJS.Utilities.Key.b">
            /// B key.
            /// </field>
            b: 66,

            /// <field locid="WinJS.Utilities.Key.c" helpKeyword="WinJS.Utilities.Key.c">
            /// C key.
            /// </field>
            c: 67,

            /// <field locid="WinJS.Utilities.Key.d" helpKeyword="WinJS.Utilities.Key.d">
            /// D key.
            /// </field>
            d: 68,

            /// <field locid="WinJS.Utilities.Key.e" helpKeyword="WinJS.Utilities.Key.e">
            /// E key.
            /// </field>
            e: 69,

            /// <field locid="WinJS.Utilities.Key.f" helpKeyword="WinJS.Utilities.Key.f">
            /// F key.
            /// </field>
            f: 70,

            /// <field locid="WinJS.Utilities.Key.g" helpKeyword="WinJS.Utilities.Key.g">
            /// G key.
            /// </field>
            g: 71,

            /// <field locid="WinJS.Utilities.Key.h" helpKeyword="WinJS.Utilities.Key.h">
            /// H key.
            /// </field>
            h: 72,

            /// <field locid="WinJS.Utilities.Key.i" helpKeyword="WinJS.Utilities.Key.i">
            /// I key.
            /// </field>
            i: 73,

            /// <field locid="WinJS.Utilities.Key.j" helpKeyword="WinJS.Utilities.Key.j">
            /// J key.
            /// </field>
            j: 74,

            /// <field locid="WinJS.Utilities.Key.k" helpKeyword="WinJS.Utilities.Key.k">
            /// K key.
            /// </field>
            k: 75,

            /// <field locid="WinJS.Utilities.Key.l" helpKeyword="WinJS.Utilities.Key.l">
            /// L key.
            /// </field>
            l: 76,

            /// <field locid="WinJS.Utilities.Key.m" helpKeyword="WinJS.Utilities.Key.m">
            /// M key.
            /// </field>
            m: 77,

            /// <field locid="WinJS.Utilities.Key.n" helpKeyword="WinJS.Utilities.Key.n">
            /// N key.
            /// </field>
            n: 78,

            /// <field locid="WinJS.Utilities.Key.o" helpKeyword="WinJS.Utilities.Key.o">
            /// O key.
            /// </field>
            o: 79,

            /// <field locid="WinJS.Utilities.Key.p" helpKeyword="WinJS.Utilities.Key.p">
            /// P key.
            /// </field>
            p: 80,

            /// <field locid="WinJS.Utilities.Key.q" helpKeyword="WinJS.Utilities.Key.q">
            /// Q key.
            /// </field>
            q: 81,

            /// <field locid="WinJS.Utilities.Key.r" helpKeyword="WinJS.Utilities.Key.r">
            /// R key.
            /// </field>
            r: 82,

            /// <field locid="WinJS.Utilities.Key.s" helpKeyword="WinJS.Utilities.Key.s">
            /// S key.
            /// </field>
            s: 83,

            /// <field locid="WinJS.Utilities.Key.t" helpKeyword="WinJS.Utilities.Key.t">
            /// T key.
            /// </field>
            t: 84,

            /// <field locid="WinJS.Utilities.Key.u" helpKeyword="WinJS.Utilities.Key.u">
            /// U key.
            /// </field>
            u: 85,

            /// <field locid="WinJS.Utilities.Key.v" helpKeyword="WinJS.Utilities.Key.v">
            /// V key.
            /// </field>
            v: 86,

            /// <field locid="WinJS.Utilities.Key.w" helpKeyword="WinJS.Utilities.Key.w">
            /// W key.
            /// </field>
            w: 87,

            /// <field locid="WinJS.Utilities.Key.x" helpKeyword="WinJS.Utilities.Key.x">
            /// X key.
            /// </field>
            x: 88,

            /// <field locid="WinJS.Utilities.Key.y" helpKeyword="WinJS.Utilities.Key.y">
            /// Y key.
            /// </field>
            y: 89,

            /// <field locid="WinJS.Utilities.Key.z" helpKeyword="WinJS.Utilities.Key.z">
            /// Z key.
            /// </field>
            z: 90,

            /// <field locid="WinJS.Utilities.Key.leftWindows" helpKeyword="WinJS.Utilities.Key.leftWindows">
            /// Left Windows key.
            /// </field>
            leftWindows: 91,

            /// <field locid="WinJS.Utilities.Key.rightWindows" helpKeyword="WinJS.Utilities.Key.rightWindows">
            /// Right Windows key.
            /// </field>
            rightWindows: 92,

            /// <field locid="WinJS.Utilities.Key.menu" helpKeyword="WinJS.Utilities.Key.menu">
            /// Menu key.
            /// </field>
            menu: 93,

            /// <field locid="WinJS.Utilities.Key.numPad0" helpKeyword="WinJS.Utilities.Key.numPad0">
            /// Number pad 0 key.
            /// </field>
            numPad0: 96,

            /// <field locid="WinJS.Utilities.Key.numPad1" helpKeyword="WinJS.Utilities.Key.numPad1">
            /// Number pad 1 key.
            /// </field>
            numPad1: 97,

            /// <field locid="WinJS.Utilities.Key.numPad2" helpKeyword="WinJS.Utilities.Key.numPad2">
            /// Number pad 2 key.
            /// </field>
            numPad2: 98,

            /// <field locid="WinJS.Utilities.Key.numPad3" helpKeyword="WinJS.Utilities.Key.numPad3">
            /// Number pad 3 key.
            /// </field>
            numPad3: 99,

            /// <field locid="WinJS.Utilities.Key.numPad4" helpKeyword="WinJS.Utilities.Key.numPad4">
            /// Number pad 4 key.
            /// </field>
            numPad4: 100,

            /// <field locid="WinJS.Utilities.Key.numPad5" helpKeyword="WinJS.Utilities.Key.numPad5">
            /// Number pad 5 key.
            /// </field>
            numPad5: 101,

            /// <field locid="WinJS.Utilities.Key.numPad6" helpKeyword="WinJS.Utilities.Key.numPad6">
            /// Number pad 6 key.
            /// </field>
            numPad6: 102,

            /// <field locid="WinJS.Utilities.Key.numPad7" helpKeyword="WinJS.Utilities.Key.numPad7">
            /// Number pad 7 key.
            /// </field>
            numPad7: 103,

            /// <field locid="WinJS.Utilities.Key.numPad8" helpKeyword="WinJS.Utilities.Key.numPad8">
            /// Number pad 8 key.
            /// </field>
            numPad8: 104,

            /// <field locid="WinJS.Utilities.Key.numPad9" helpKeyword="WinJS.Utilities.Key.numPad9">
            /// Number pad 9 key.
            /// </field>
            numPad9: 105,

            /// <field locid="WinJS.Utilities.Key.multiply" helpKeyword="WinJS.Utilities.Key.multiply">
            /// Multiplication key.
            /// </field>
            multiply: 106,

            /// <field locid="WinJS.Utilities.Key.add" helpKeyword="WinJS.Utilities.Key.add">
            /// Addition key.
            /// </field>
            add: 107,

            /// <field locid="WinJS.Utilities.Key.subtract" helpKeyword="WinJS.Utilities.Key.subtract">
            /// Subtraction key.
            /// </field>
            subtract: 109,

            /// <field locid="WinJS.Utilities.Key.decimalPoint" helpKeyword="WinJS.Utilities.Key.decimalPoint">
            /// Decimal point key.
            /// </field>
            decimalPoint: 110,

            /// <field locid="WinJS.Utilities.Key.divide" helpKeyword="WinJS.Utilities.Key.divide">
            /// Division key.
            /// </field>
            divide: 111,

            /// <field locid="WinJS.Utilities.Key.F1" helpKeyword="WinJS.Utilities.Key.F1">
            /// F1 key.
            /// </field>
            F1: 112,

            /// <field locid="WinJS.Utilities.Key.F2" helpKeyword="WinJS.Utilities.Key.F2">
            /// F2 key.
            /// </field>
            F2: 113,

            /// <field locid="WinJS.Utilities.Key.F3" helpKeyword="WinJS.Utilities.Key.F3">
            /// F3 key.
            /// </field>
            F3: 114,

            /// <field locid="WinJS.Utilities.Key.F4" helpKeyword="WinJS.Utilities.Key.F4">
            /// F4 key.
            /// </field>
            F4: 115,

            /// <field locid="WinJS.Utilities.Key.F5" helpKeyword="WinJS.Utilities.Key.F5">
            /// F5 key.
            /// </field>
            F5: 116,

            /// <field locid="WinJS.Utilities.Key.F6" helpKeyword="WinJS.Utilities.Key.F6">
            /// F6 key.
            /// </field>
            F6: 117,

            /// <field locid="WinJS.Utilities.Key.F7" helpKeyword="WinJS.Utilities.Key.F7">
            /// F7 key.
            /// </field>
            F7: 118,

            /// <field locid="WinJS.Utilities.Key.F8" helpKeyword="WinJS.Utilities.Key.F8">
            /// F8 key.
            /// </field>
            F8: 119,

            /// <field locid="WinJS.Utilities.Key.F9" helpKeyword="WinJS.Utilities.Key.F9">
            /// F9 key.
            /// </field>
            F9: 120,

            /// <field locid="WinJS.Utilities.Key.F10" helpKeyword="WinJS.Utilities.Key.F10">
            /// F10 key.
            /// </field>
            F10: 121,

            /// <field locid="WinJS.Utilities.Key.F11" helpKeyword="WinJS.Utilities.Key.F11">
            /// F11 key.
            /// </field>
            F11: 122,

            /// <field locid="WinJS.Utilities.Key.F12" helpKeyword="WinJS.Utilities.Key.F12">
            /// F12 key.
            /// </field>
            F12: 123,

            /// <field locid="WinJS.Utilities.Key.numLock" helpKeyword="WinJS.Utilities.Key.numLock">
            /// NUMBER LOCK key.
            /// </field>
            numLock: 144,

            /// <field locid="WinJS.Utilities.Key.scrollLock" helpKeyword="WinJS.Utilities.Key.scrollLock">
            /// SCROLL LOCK key.
            /// </field>
            scrollLock: 145,

            /// <field locid="WinJS.Utilities.Key.browserBack" helpKeyword="WinJS.Utilities.Key.browserBack">
            /// Browser back key.
            /// </field>
            browserBack: 166,

            /// <field locid="WinJS.Utilities.Key.browserForward" helpKeyword="WinJS.Utilities.Key.browserForward">
            /// Browser forward key.
            /// </field>
            browserForward: 167,

            /// <field locid="WinJS.Utilities.Key.semicolon" helpKeyword="WinJS.Utilities.Key.semicolon">
            /// SEMICOLON key.
            /// </field>
            semicolon: 186,

            /// <field locid="WinJS.Utilities.Key.equal" helpKeyword="WinJS.Utilities.Key.equal">
            /// EQUAL key.
            /// </field>
            equal: 187,

            /// <field locid="WinJS.Utilities.Key.comma" helpKeyword="WinJS.Utilities.Key.comma">
            /// COMMA key.
            /// </field>
            comma: 188,

            /// <field locid="WinJS.Utilities.Key.dash" helpKeyword="WinJS.Utilities.Key.dash">
            /// DASH key.
            /// </field>
            dash: 189,

            /// <field locid="WinJS.Utilities.Key.period" helpKeyword="WinJS.Utilities.Key.period">
            /// PERIOD key.
            /// </field>
            period: 190,

            /// <field locid="WinJS.Utilities.Key.forwardSlash" helpKeyword="WinJS.Utilities.Key.forwardSlash">
            /// FORWARD SLASH key.
            /// </field>
            forwardSlash: 191,

            /// <field locid="WinJS.Utilities.Key.graveAccent" helpKeyword="WinJS.Utilities.Key.graveAccent">
            /// Accent grave key.
            /// </field>
            graveAccent: 192,

            /// <field locid="WinJS.Utilities.Key.openBracket" helpKeyword="WinJS.Utilities.Key.openBracket">
            /// OPEN BRACKET key.
            /// </field>
            openBracket: 219,

            /// <field locid="WinJS.Utilities.Key.backSlash" helpKeyword="WinJS.Utilities.Key.backSlash">
            /// BACKSLASH key.
            /// </field>
            backSlash: 220,

            /// <field locid="WinJS.Utilities.Key.closeBracket" helpKeyword="WinJS.Utilities.Key.closeBracket">
            /// CLOSE BRACKET key.
            /// </field>
            closeBracket: 221,

            /// <field locid="WinJS.Utilities.Key.singleQuote" helpKeyword="WinJS.Utilities.Key.singleQuote">
            /// SINGLE QUOTE key.
            /// </field>
            singleQuote: 222
        },

        data: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.data">
            /// <summary locid="WinJS.Utilities.data">
            /// Gets the data value associated with the specified element.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.data_p:element">
            /// The element.
            /// </param>
            /// <returns type="Object" locid="WinJS.Utilities.data_returnValue">
            /// The value associated with the element.
            /// </returns>
            /// </signature>
            if (!element[WinJS.Utilities._dataKey]) {
                element[WinJS.Utilities._dataKey] = {};
            }
            return element[WinJS.Utilities._dataKey];
        },

        hasClass: function (e, name) {
            /// <signature helpKeyword="WinJS.Utilities.hasClass">
            /// <summary locid="WinJS.Utilities.hasClass">
            /// Determines whether the specified element has the specified class.
            /// </summary>
            /// <param name="e" type="HTMLElement" locid="WinJS.Utilities.hasClass_p:e">
            /// The element.
            /// </param>
            /// <param name="name" type="String" locid="WinJS.Utilities.hasClass_p:name">
            /// The name of the class.
            /// </param>
            /// <returns type="Boolean" locid="WinJS.Utilities.hasClass_returnValue">
            /// true if the specified element contains the specified class; otherwise, false.
            /// </returns>
            /// </signature>
            var className = getClassName(e);
            var names = className.trim().split(" ");
            var l = names.length;
            for (var i = 0; i < l; i++) {
                if (names[i] == name) {
                    return true;
                }
            }
            return false;
        },

        addClass: function (e, name) {
            /// <signature helpKeyword="WinJS.Utilities.addClass">
            /// <summary locid="WinJS.Utilities.addClass">
            /// Adds the specified class(es) to the specified element. Multiple classes can be added using space delimited names.
            /// </summary>
            /// <param name="e" type="HTMLElement" locid="WinJS.Utilities.addClass_p:e">
            /// The element to which to add the class.
            /// </param>
            /// <param name="name" type="String" locid="WinJS.Utilities.addClass_p:name">
            /// The name of the class to add, multiple classes can be added using space delimited names
            /// </param>
            /// <returns type="HTMLElement" locid="WinJS.Utilities.addClass_returnValue">
            /// The element.
            /// </returns>
            /// </signature>
            var className = getClassName(e);
            var names = className.split(" ");
            var l = removeEmpties(names);
            var toAdd;

            // we have a fast path for the common case of a single name in the class name
            //
            if (name.indexOf(" ") >= 0) {
                var namesToAdd = name.split(" ");
                removeEmpties(namesToAdd);
                for (var i = 0; i < l; i++) {
                    var found = namesToAdd.indexOf(names[i])
                    if (found >= 0) {
                        namesToAdd.splice(found, 1);
                    }
                }
                if (namesToAdd.length > 0) {
                    toAdd = namesToAdd.join(" ");
                }
            }
            else {
                var saw = false;
                for (var i = 0; i < l; i++) {
                    if (names[i] === name) {
                        saw = true;
                        break;
                    }
                }
                if (!saw) { toAdd = name; }

            }
            if (toAdd) {
                if (l > 0 && names[0].length > 0) {
                    setClassName(e, className + " " + toAdd);
                }
                else {
                    setClassName(e, toAdd);
                }
            }
            return e;
        },

        removeClass: function (e, name) {
            /// <signature helpKeyword="WinJS.Utilities.removeClass">
            /// <summary locid="WinJS.Utilities.removeClass">
            /// Removes the specified class from the specified element.
            /// </summary>
            /// <param name="e" type="HTMLElement" locid="WinJS.Utilities.removeClass_p:e">
            /// The element from which to remove the class.
            /// </param>
            /// <param name="name" type="String" locid="WinJS.Utilities.removeClass_p:name">
            /// The name of the class to remove.
            /// </param>
            /// <returns type="HTMLElement" locid="WinJS.Utilities.removeClass_returnValue">
            /// The element.
            /// </returns>
            /// </signature>
            var original = getClassName(e);
            var namesToRemove;
            var namesToRemoveLen;

            if (name.indexOf(" ") >= 0) {
                namesToRemove = name.split(" ");
                namesToRemoveLen = removeEmpties(namesToRemove);
            }
            else {
                // early out for the case where you ask to remove a single
                // name and that name isn't found.
                //
                if (original.indexOf(name) < 0) {
                    return e;
                }
                namesToRemove = [name];
                namesToRemoveLen = 1;
            }
            var removed;
            var names = original.split(" ");
            var namesLen = removeEmpties(names);

            for (var i = namesLen - 1; i >= 0; i--) {
                if (namesToRemove.indexOf(names[i]) >= 0) {
                    names.splice(i, 1);
                    removed = true;
                }
            }

            if (removed) {
                setClassName(e, names.join(" "));
            }
            return e;
        },

        toggleClass: function (e, name) {
            /// <signature helpKeyword="WinJS.Utilities.toggleClass">
            /// <summary locid="WinJS.Utilities.toggleClass">
            /// Toggles (adds or removes) the specified class on the specified element.
            /// If the class is present, it is removed; if it is absent, it is added.
            /// </summary>
            /// <param name="e" type="HTMLElement" locid="WinJS.Utilities.toggleClass_p:e">
            /// The element on which to toggle the class.
            /// </param>
            /// <param name="name" type="String" locid="WinJS.Utilities.toggleClass_p:name">
            /// The name of the class to toggle.
            /// </param>
            /// <returns type="HTMLElement" locid="WinJS.Utilities.toggleClass_returnValue">
            /// The element.
            /// </returns>
            /// </signature>
            var className = getClassName(e);
            var names = className.trim().split(" ");
            var l = names.length;
            var found = false;
            for (var i = 0; i < l; i++) {
                if (names[i] == name) {
                    found = true;
                }
            }
            if (!found) {
                if (l > 0 && names[0].length > 0) {
                    setClassName(e, className + " " + name);
                }
                else {
                    setClassName(e, className + name);
                }
            }
            else {
                setClassName(e, names.reduce(function (r, e) {
                    if (e == name) {
                        return r;
                    }
                    else if (r && r.length > 0) {
                        return r + " " + e;
                    }
                    else {
                        return e;
                    }
                }, ""));
            }
            return e;
        },

        getRelativeLeft: function (element, parent) {
            /// <signature helpKeyword="WinJS.Utilities.getRelativeLeft">
            /// <summary locid="WinJS.Utilities.getRelativeLeft">
            /// Gets the left coordinate of the specified element relative to the specified parent.
            /// </summary>
            /// <param name="element" domElement="true" locid="WinJS.Utilities.getRelativeLeft_p:element">
            /// The element.
            /// </param>
            /// <param name="parent" domElement="true" locid="WinJS.Utilities.getRelativeLeft_p:parent">
            /// The parent element.
            /// </param>
            /// <returns type="Number" locid="WinJS.Utilities.getRelativeLeft_returnValue">
            /// The relative left coordinate.
            /// </returns>
            /// </signature>
            if (!element) {
                return 0;
            }

            var left = element.offsetLeft;
            var e = element.parentNode;
            while (e) {
                left -= e.offsetLeft;

                if (e === parent)
                    break;
                e = e.parentNode;
            }

            return left;
        },

        getRelativeTop: function (element, parent) {
            /// <signature helpKeyword="WinJS.Utilities.getRelativeTop">
            /// <summary locid="WinJS.Utilities.getRelativeTop">
            /// Gets the top coordinate of the element relative to the specified parent.
            /// </summary>
            /// <param name="element" domElement="true" locid="WinJS.Utilities.getRelativeTop_p:element">
            /// The element.
            /// </param>
            /// <param name="parent" domElement="true" locid="WinJS.Utilities.getRelativeTop_p:parent">
            /// The parent element.
            /// </param>
            /// <returns type="Number" locid="WinJS.Utilities.getRelativeTop_returnValue">
            /// The relative top coordinate.
            /// </returns>
            /// </signature>
            if (!element) {
                return 0;
            }

            var top = element.offsetTop;
            var e = element.parentNode;
            while (e) {
                top -= e.offsetTop;

                if (e === parent)
                    break;
                e = e.parentNode;
            }

            return top;
        },

        empty: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.empty">
            /// <summary locid="WinJS.Utilities.empty">
            /// Removes all the child nodes from the specified element.
            /// </summary>
            /// <param name="element" type="HTMLElement" domElement="true" locid="WinJS.Utilities.empty_p:element">
            /// The element.
            /// </param>
            /// <returns type="HTMLElement" locid="WinJS.Utilities.empty_returnValue">
            /// The element.
            /// </returns>
            /// </signature>
            if (element.childNodes && element.childNodes.length > 0) {
                for (var i = element.childNodes.length - 1; i >= 0; i--) {
                    element.removeChild(element.childNodes.item(i));
                }
            }
            return element;
        },

        _isDOMElement: function (element) {
            return element &&
                typeof element === "object" &&
                typeof element.tagName === "string";
        },

        getContentWidth: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.getContentWidth">
            /// <summary locid="WinJS.Utilities.getContentWidth">
            /// Gets the width of the content of the specified element. The content width does not include borders or padding.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.getContentWidth_p:element">
            /// The element.
            /// </param>
            /// <returns type="Number" locid="WinJS.Utilities.getContentWidth_returnValue">
            /// The content width of the element.
            /// </returns>
            /// </signature>
            var border = getDimension(element, "borderLeftWidth") + getDimension(element, "borderRightWidth"),
                padding = getDimension(element, "paddingLeft") + getDimension(element, "paddingRight");
            return element.offsetWidth - border - padding;
        },

        getTotalWidth: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.getTotalWidth">
            /// <summary locid="WinJS.Utilities.getTotalWidth">
            /// Gets the width of the element, including margins.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.getTotalWidth_p:element">
            /// The element.
            /// </param>
            /// <returns type="Number" locid="WinJS.Utilities.getTotalWidth_returnValue">
            /// The width of the element including margins.
            /// </returns>
            /// </signature>
            var margin = getDimension(element, "marginLeft") + getDimension(element, "marginRight");
            return element.offsetWidth + margin;
        },

        getContentHeight: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.getContentHeight">
            /// <summary locid="WinJS.Utilities.getContentHeight">
            /// Gets the height of the content of the specified element. The content height does not include borders or padding.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.getContentHeight_p:element">
            /// The element.
            /// </param>
            /// <returns type="Number" integer="true" locid="WinJS.Utilities.getContentHeight_returnValue">
            /// The content height of the element.
            /// </returns>
            /// </signature>
            var border = getDimension(element, "borderTopWidth") + getDimension(element, "borderBottomWidth"),
                padding = getDimension(element, "paddingTop") + getDimension(element, "paddingBottom");
            return element.offsetHeight - border - padding;
        },

        getTotalHeight: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.getTotalHeight">
            /// <summary locid="WinJS.Utilities.getTotalHeight">
            /// Gets the height of the element, including its margins.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.getTotalHeight_p:element">
            /// The element.
            /// </param>
            /// <returns type="Number" locid="WinJS.Utilities.getTotalHeight_returnValue">
            /// The height of the element including margins.
            /// </returns>
            /// </signature>
            var margin = getDimension(element, "marginTop") + getDimension(element, "marginBottom");
            return element.offsetHeight + margin;
        },

        getPosition: function (element) {
            /// <signature helpKeyword="WinJS.Utilities.getPosition">
            /// <summary locid="WinJS.Utilities.getPosition">
            /// Gets the position of the specified element.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.getPosition_p:element">
            /// The element.
            /// </param>
            /// <returns type="Object" locid="WinJS.Utilities.getPosition_returnValue">
            /// An object that contains the left, top, width and height properties of the element.
            /// </returns>
            /// </signature>
            var fromElement = element,
                offsetParent = element.offsetParent,
                top = element.offsetTop,
                left = element.offsetLeft;

            while ((element = element.parentNode) &&
                    element !== document.body &&
                    element !== document.documentElement) {
                top -= element.scrollTop;
                var dir = document.defaultView.getComputedStyle(element, null).direction;
                left -= dir !== "rtl" ? element.scrollLeft : -element.scrollLeft;

                if (element === offsetParent) {
                    top += element.offsetTop;
                    left += element.offsetLeft;
                    offsetParent = element.offsetParent;
                }
            }

            return {
                left: left,
                top: top,
                width: fromElement.offsetWidth,
                height: fromElement.offsetHeight
            };
        },

        convertToPixels: function (element, value) {
            /// <signature helpKeyword="WinJS.Utilities.convertToPixels">
            /// <summary locid="WinJS.Utilities.convertToPixels">
            /// Converts a CSS positioning string for the specified element to pixels.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.convertToPixels_p:element">
            /// The element.
            /// </param>
            /// <param name="value" type="String" locid="WinJS.Utilities.convertToPixels_p:value">
            /// The CSS positioning string.
            /// </param>
            /// <returns type="Number" locid="WinJS.Utilities.convertToPixels_returnValue">
            /// The number of pixels.
            /// </returns>
            /// </signature>
            if (!this._pixelsRE.test(value) && this._numberRE.test(value)) {
                var previousValue = element.style.left;

                element.style.left = value;
                value = element.style.pixelLeft;

                element.style.left = previousValue;

                return value;
            } else {
                return parseInt(value, 10) || 0;
            }
        },

        eventWithinElement: function (element, event) {
            /// <signature helpKeyword="WinJS.Utilities.eventWithinElement">
            /// <summary locid="WinJS.Utilities.eventWithinElement">
            /// Determines whether the specified event occurred within the specified element.
            /// </summary>
            /// <param name="element" type="HTMLElement" locid="WinJS.Utilities.eventWithinElement_p:element">
            /// The element.
            /// </param>
            /// <param name="event" type="Event" locid="WinJS.Utilities.eventWithinElement_p:event">
            /// The event.
            /// </param>
            /// <returns type="Boolean" locid="WinJS.Utilities.eventWithinElement_returnValue">
            /// true if the event occurred within the element; otherwise, false.
            /// </returns>
            /// </signature>
            var related = event.relatedTarget;
            if (related && related !== element) {
                return element.contains(related);
            }

            return false;
        }
    });
})(this, WinJS);

(function fragmentControlInit(global) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    function abs(uri) {
        var a = document.createElement("a");
        a.href = uri;
        return a.href.toLowerCase();
    }
    var viewMap = {};

    function selfhost(uri) {
        return document.location.href.toLowerCase() === uri.toLowerCase();
    }

    WinJS.Namespace.define("WinJS.UI.Pages", {
        _mixin: {
            load: function (uri) {
                /// <signature helpKeyword="WinJS.UI.Pages._mixin.load">
                /// <summary locid="WinJS.UI.Pages._mixin.load">
                /// Creates a copy of the DOM elements from the specified URI.  In order for this override
                /// to be used, the page that contains the load override needs to be defined by calling
                /// WinJS.UI.Pages.define() before WinJS.UI.Pages.render() is called.
                /// </summary>
                /// <param name="uri" locid="WinJS.UI.Pages._mixin.load_p:uri">
                /// The URI from which to copy the DOM elements.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages._mixin.load_returnValue">
                /// A promise whose fulfilled value is the set of unparented DOM elements, if asynchronous processing is necessary. If not, returns nothing.
                /// </returns>
                /// </signature>
                if (!this.selfhost) {
                    return WinJS.UI.Fragments.renderCopy(abs(uri));
                }
            },
            init: function (element, options) {
                /// <signature helpKeyword="WinJS.UI.Pages._mixin.init">
                /// <summary locid="WinJS.UI.Pages._mixin.init">
                /// Initializes the control before the content of the control is set.
                /// Use the processed method for any initialization that should be done after the content
                /// of the control has been set.
                /// </summary>
                /// <param name="element" locid="WinJS.UI.Pages._mixin.init_p:element">
                /// The DOM element that will contain all the content for the page.
                /// </param>
                /// <param name="options" locid="WinJS.UI.Pages._mixin.init_p:options">
                /// The options passed to the constructor of the page.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages._mixin.init_returnValue">
                /// A promise that is fulfilled when initialization is complete, if asynchronous processing is necessary. If not, returns nothing.
                /// </returns>
                /// </signature>
            },
            processed: function (element, options) {
                /// <signature helpKeyword="WinJS.UI.Pages._mixin.processed">
                /// <summary locid="WinJS.UI.Pages._mixin.processed">
                /// Initializes the control after the content of the control is set.
                /// </summary>
                /// <param name="element" locid="WinJS.UI.Pages._mixin.processed_p:element">
                /// The DOM element that will contain all the content for the page.
                /// </param>
                /// <param name="options" locid="WinJS.UI.Pages._mixin.processed_p:options">
                /// The options that are to be passed to the constructor of the page.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages._mixin.processed_returnValue">
                /// A promise that is fulfilled when initialization is complete, if asynchronous processing is necessary. If not, returns nothing.
                /// </returns>
                /// </signature>
            },
            render: function (element, options, loadResult) {
                /// <signature helpKeyword="WinJS.UI.Pages._mixin.render">
                /// <summary locid="WinJS.UI.Pages._mixin.render">
                /// Renders the control, typically by adding the elements specified in the loadResult parameter to the specified element.
                /// </summary>
                /// <param name="element" locid="WinJS.UI.Pages._mixin.render_p:element">
                /// The DOM element that will contain all the content for the page.
                /// </param>
                /// <param name="options" locid="WinJS.UI.Pages._mixin.render_p:options">
                /// The options passed into the constructor of the page.
                /// </param>
                /// <param name="loadResult" locid="WinJS.UI.Pages._mixin.render_p:loadResult">
                /// The elements returned from the load method.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages._mixin.render_returnValue">
                /// A promise that is fulfilled when rendering is complete, if asynchronous processing is necessary. If not, returns nothing.
                /// </returns>
                /// </signature>
                if (!this.selfhost) {
                    element.appendChild(loadResult);
                }
                return element;
            },
            ready: function (element, options) {
                /// <signature helpKeyword="WinJS.UI.Pages._mixin.ready">
                /// <summary locid="WinJS.UI.Pages._mixin.ready">
                /// Called after all initialization and rendering is complete. At this
                /// time the element is ready for use.
                /// </summary>
                /// <param name="element" locid="WinJS.UI.Pages._mixin.ready_p:element">
                /// The DOM element that contains all the content for the page.
                /// </param>
                /// <param name="options" locid="WinJS.UI.Pages._mixin.ready_p:options">
                /// The options passed into the constructor of the page
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages._mixin.ready_returnValue">
                /// A promise that is fulfilled when the element is ready for use, if asynchronous processing is necessary. If not, returns nothing
                /// </returns>
                /// </signature>
            },
            error: function (err) {
                /// <signature helpKeyword="WinJS.UI.Pages._mixin.error">
                /// <summary locid="WinJS.UI.Pages._mixin.error">
                /// Called if any error occurs during the processing of the page.
                /// </summary>
                /// <param name="err" locid="WinJS.UI.Pages._mixin.error_p:err">
                /// The error that occurred.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages._mixin.error_returnValue">
                /// Nothing if the error was handled, or an error promise if the error was not handled.
                /// </returns>
                /// </signature>
                return WinJS.Promise.wrapError(err);
            }
        },
        define: function (uri, members) {
            /// <signature helpKeyword="WinJS.UI.Pages.define">
            /// <summary locid="WinJS.UI.Pages.define">
            /// Creates a new page control from the specified URI that contains the specified members.
            /// Multiple calls to this method for the same URI are allowed, and all members will be
            /// merged.
            /// </summary>
            /// <param name="uri" locid="WinJS.UI.Pages.define_p:uri">
            /// The URI for the content that defines the page.
            /// </param>
            /// <param name="members" locid="WinJS.UI.Pages.define_p:members">
            /// Additional members that the control will have.
            /// </param>
            /// <returns type="Function" locid="WinJS.UI.Pages.define_returnValue">
            /// A constructor function that creates the page.
            /// </returns>
            /// </signature>
            uri = abs(uri);

            var base = viewMap[uri.toLowerCase()];
            if (!base) {
                base = WinJS.Class.define(
                    // This needs to follow the WinJS.UI.processAll "async constructor"
                    // pattern to interop nicely in the "Views.Control" use case.
                    //
                    function PageControl_ctor(element, options, complete, parentedPromise) {
                        var that = this;
                        this.element = element = element || document.createElement("div");
                        element.msSourceLocation = uri;
                        this.uri = uri;
                        this.selfhost = selfhost(uri);
                        element.winControl = this;
                        WinJS.Utilities.addClass(element, "pagecontrol");
                        msWriteProfilerMark("WinJS.UI.Pages:createPage,StartTM");

                        var load = WinJS.Promise.wrap().
                            then(function Pages_load() { return that.load(uri); });

                        var renderCalled = load.then(function Pages_init(loadResult) {
                            return WinJS.Promise.join({
                                loadResult: loadResult,
                                initResult: that.init(element, options)
                            });
                        }).then(function Pages_render(result) {
                            return that.render(element, options, result.loadResult);
                        });

                        this.elementReady = renderCalled.then(function () { return element; });

                        this.renderComplete = renderCalled.
                            then(function Pages_processAll(f) {
                                return WinJS.UI.processAll(f).then(function () { return f; });
                            }).then(function Pages_processed(f) {
                                return that.processed(element, options);
                            }).then(function () {
                                return that;
                            });

                        var callComplete = function () {
                            complete && complete(that);
                            msWriteProfilerMark("WinJS.UI.Pages:createPage,StopTM");
                        };

                        // promises guarantee order, so this will be called prior to ready path below
                        //
                        this.renderComplete.then(callComplete, callComplete);

                        this.renderComplete.then(function () {
                            return parentedPromise;
                        }).then(function Pages_ready() {
                            that.ready(element, options);
                        }).then(
                            null,
                            function Pages_error(err) {
                                return that.error(err);
                            }
                        );
                    },
                    WinJS.UI.Pages._mixin
                );
                base = WinJS.Class.mix(base, WinJS.UI.DOMEventMixin);
                viewMap[uri.toLowerCase()] = base;
            }

            // Lazily mix in the members, allowing for multiple definitions of "define" to augment
            // the shared definition of the member.
            //
            if (members) {
                base = WinJS.Class.mix(base, members);
            }

            if (selfhost(uri)) {
                WinJS.Utilities.ready(function () {
                    WinJS.UI.Pages.render(uri, document.body);
                });
            }

            return base;
        },

        get: function (uri) {
            /// <signature helpKeyword="WinJS.UI.Pages.get">
            /// <summary locid="WinJS.UI.Pages.get">
            /// Gets an already-defined page control for the specified URI, or creates a new one.
            /// </summary>
            /// <param name="uri" locid="WinJS.UI.Pages.get_p:uri">
            /// The URI for the content that defines the page.
            /// </param>
            /// <returns type="Function" locid="WinJS.UI.Pages.get_returnValue">
            /// A constructor function that creates the page.
            /// </returns>
            /// </signature>
            uri = abs(uri);
            var ctor = viewMap[uri.toLowerCase()];
            if (!ctor) {
                ctor = WinJS.UI.Pages.define(uri);
            }
            return ctor;
        },

        _remove: function (uri) {
            uri = abs(uri);
            WinJS.UI.Fragments.clearCache(uri);
            delete viewMap[uri]
        },

        render: function (uri, element, options, parentedPromise) {
            /// <signature helpKeyword="WinJS.UI.Pages.render">
            /// <summary locid="WinJS.UI.Pages.render">
            /// Creates a page control from the specified URI inside
            /// the specified element with the specified options.
            /// </summary>
            /// <param name="uri" locid="WinJS.UI.Pages.render_p:uri">
            /// The URI for the content that defines the page.
            /// </param>
            /// <param name="element" isOptional="true" locid="WinJS.UI.Pages.render_p:element">
            /// The element to populate with the page.
            /// </param>
            /// <param name="options" isOptional="true" locid="WinJS.UI.Pages.render_p:options">
            /// The options for configuring the page.
            /// </param>
            /// <param name="parentedPromise" isOptional="true" locid="WinJS.UI.Pages.render_p:parentedPromise">
            /// A promise that is fulfilled when the specified element is parented to the final document.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.UI.Pages.render_returnValue">
            /// A promise that is fulfilled when the page is done rendering
            /// </returns>
            /// </signature>
            var ctor = WinJS.UI.Pages.get(uri);
            var control = new ctor(element, options, null, parentedPromise);
            return control.renderComplete;
        }
    });

    WinJS.Namespace.define("WinJS.UI", {
        /// <summary locid="WinJS.UI.HtmlControl">
        /// Enables you to include an HTML page dynamically.
        /// </summary>
        /// <name locid="WinJS.UI.HtmlControl_name">HtmlControl</name>
        /// <icon src="base_winjs.ui.htmlcontrol.12x12.png" width="12" height="12" />
        /// <icon src="base_winjs.ui.htmlcontrol.16x16.png" width="16" height="16" />
        /// <htmlSnippet><![CDATA[<div data-win-control="WinJS.UI.HtmlControl" data-win-options="{ uri: 'somePage.html' }"></div>]]></htmlSnippet>
        /// <resource type="javascript" src="//Microsoft.WinJS.1.0/js/base.js" shared="true" />
        /// <resource type="css" src="//Microsoft.WinJS.1.0/css/ui-dark.css" shared="true" />
        HtmlControl: WinJS.Class.define(function HtmlControl_ctor(element, options, complete) {
            /// <signature helpKeyword="WinJS.UI.HtmlControl.HtmlControl">
            /// <summary locid="WinJS.UI.HtmlControl.constructor">
            /// Initializes a new instance of HtmlControl to define a new page control.
            /// </summary>
            /// <param name="element" locid="WinJS.UI.HtmlControl.constructor_p:element">
            /// The element that hosts the HtmlControl.
            /// </param>
            /// <param name="options" locid="WinJS.UI.HtmlControl.constructor_p:options">
            /// The options for configuring the page. The uri option is required in order to specify the source
            /// document for the content of the page.
            /// </param>
            /// </signature>
            WinJS.UI.Pages.render(options.uri, element, options).
                then(complete, function () { complete(); });
        })
    });
})(this);

(function fragmentLoaderInit(global, WinJS, undefined) {
    "use strict";

    var strings = {
        get invalidFragmentUri() { return WinJS.Resources._getWinJSString("base/invalidFragmentUri").value; },
    };

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    var forEach = function (arrayLikeValue, action) {
        for (var i = 0, l = arrayLikeValue.length; i < l; i++) {
            action(arrayLikeValue[i], i);
        }
    };
    var head = document.head || document.getElementsByTagName("head")[0];
    var scripts = {};
    var styles = {};
    var links = {};
    var initialized = false;
    var cacheStore = {};

    function addScript(scriptTag, fragmentHref, position) {
        // We synthesize a name for inline scripts because today we put the
        // inline scripts in the same processing pipeline as src scripts. If
        // we seperated inline scripts into their own logic, we could simplify
        // this somewhat.
        //
        var src = scriptTag.src;
        if (!src) {
            src = fragmentHref + "script[" + position + "]";
        }
        src = src.toLowerCase();

        if (!(src in scripts)) {
            scripts[src] = true;
            var n = document.createElement("script");
            if (scriptTag.language) {
                n.setAttribute("language", "javascript");
            }
            n.setAttribute("type", scriptTag.type);
            if (scriptTag.id) {
                n.setAttribute("id", scriptTag.id);
            }
            if (scriptTag.src) {
                n.setAttribute("src", scriptTag.src);
            }
            else {
                n.text = scriptTag.text;
            }
            head.appendChild(n);
        }
    };

    function addStyle(styleTag, fragmentHref, position) {
        var src = (fragmentHref + "script[" + position + "]").toLowerCase();
        if (!(src in styles)) {
            styles[src] = true;
            head.appendChild(styleTag.cloneNode(true));
        }
    };

    function addLink(styleTag) {
        var src = styleTag.href.toLowerCase();
        if (!(src in links)) {
            links[src] = true;
            var n = styleTag.cloneNode(false);
            n.href = styleTag.href;
            head.appendChild(n);
        }
    };

    function getStateRecord(href, removeFromCache) {
        if (typeof href === "string") {
            return loadFromCache(href, removeFromCache);
        }
        else {
            var state = {
                docfrag: WinJS.Utilities.data(href).docFragment
            };
            if (!state.docfrag) {
                var fragment = document.createDocumentFragment();
                while (href.childNodes.length > 0) {
                    fragment.appendChild(href.childNodes[0]);
                };
                state.docfrag = WinJS.Utilities.data(href).docFragment = fragment;
                href.setAttribute("data-win-hasfragment", "");
            }
            if (removeFromCache) {
                clearCache(href);
            }
            return WinJS.Promise.as(state);
        }
    }
    function createEntry(state, href) {
        return WinJS.UI.Fragments._populateDocument(state, href).
            then(function () {
                if (state.document) {
                    return processDocument(href, state);
                }
                else {
                    return state;
                }
            }).
            then(WinJS.UI.Fragments._cleanupDocument).
            then(function () {
                return state;
            });
    }

    function loadFromCache(href, removeFromCache) {
        var fragmentId = href.toLowerCase();
        var state = cacheStore[fragmentId];

        if (state) {
            if (removeFromCache) {
                delete cacheStore[fragmentId];
            }
            if (state.promise) {
                return state.promise;
            }
            else {
                return WinJS.Promise.as(state);
            }
        }
        else {
            state = {};
            if (!removeFromCache) {
                cacheStore[fragmentId] = state;
            }
            var result = state.promise = createEntry(state, href);
            state.promise.then(function () { delete state.promise; });
            return result;
        }
    }

    function processDocument(href, state) {
        // Once the control's static state has been loaded in the temporary iframe,
        // this method spelunks the iframe's document to retrieve all relevant information. Also,
        // this performs any needed fixups on the DOM (like adjusting relative URLs).

        var cd = state.document;
        var b = cd.body;

        forEach(cd.querySelectorAll('link[rel="stylesheet"], link[type="text/css"]'), addLink);
        forEach(cd.getElementsByTagName('style'), function (e, i) { addStyle(e, href, i); });
        forEach(cd.getElementsByTagName('script'), function (e, i) { addScript(e, href, i); });

        forEach(b.getElementsByTagName('img'), function (e) { e.src = e.src; });
        forEach(b.getElementsByTagName('a'), function (e) {
            // for # only anchor tags, we don't update the href
            //
            if (e.href !== "") {
                var href = e.getAttribute("href");
                if (href && href[0] != "#") {
                    e.href = e.href;
                }
            }
        });

        // strip inline scripts from the body, they got copied to the
        // host document with the rest of the scripts above...
        //
        var localScripts = b.getElementsByTagName("script");
        while (localScripts.length > 0) {
            var s = localScripts[0];
            s.parentNode.removeChild(s);
        }

        // Create the docfrag which is just the body children
        //
        var fragment = document.createDocumentFragment();
        var imported = document.importNode(cd.body, true);
        while (imported.childNodes.length > 0) {
            fragment.appendChild(imported.childNodes[0]);
        }
        state.docfrag = fragment;

        return state;
    };

    function initialize() {
        if (initialized) { return; }

        initialized = true;

        forEach(head.querySelectorAll("script"), function (e) {
            scripts[e.src.toLowerCase()] = true;
        });


        forEach(head.querySelectorAll('link[rel="stylesheet"], link[type="text/css"]'), function (e) {
            links[e.href.toLowerCase()] = true;
        });
    };

    function renderCopy(href, target) {
        /// <signature helpKeyword="WinJS.UI.Fragments.renderCopy">
        /// <summary locid="WinJS.UI.Fragments.renderCopy">
        /// Copies the contents of the specified URI into the specified element.
        /// </summary>
        /// <param name="href" type="String" locid="WinJS.UI.Fragments.renderCopy_p:href">
        /// The URI that contains the fragment to copy.
        /// </param>
        /// <param name="target" type="HTMLElement" optional="true" locid="WinJS.UI.Fragments.renderCopy_p:target">
        /// The element to which the fragment is appended.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.UI.Fragments.renderCopy_returnValue">
        /// A promise that is fulfilled when the fragment has been loaded.
        /// If a target element is not specified, the copied fragment is the
        /// completed value.
        /// </returns>
        /// </signature>

        return renderImpl(href, target, true);
    };

    function renderImpl(href, target, copy) {
        initialize();
        return getStateRecord(href, !copy).then(function (state) {
            var frag = state.docfrag;
            if (copy) {
                frag = frag.cloneNode(true);
            }

            var child = frag.firstChild;
            while (child) {
                if (child.nodeType === 1 /*Element node*/) {
                    child.msParentSelectorScope = true;
                }
                child = child.nextSibling;
            }

            if (target) {
                target.appendChild(frag);
                return target;
            }
            else {
                return frag;
            }
        });
    };

    function render(href, target) {
        /// <signature helpKeyword="WinJS.UI.Fragments.render">
        /// <summary locid="WinJS.UI.Fragments.render">
        /// Copies the contents of the specified URI into the specified element.
        /// </summary>
        /// <param name='href' type='String' locid="WinJS.UI.Fragments.render_p:href">
        /// The URI that contains the fragment to copy.
        /// </param>
        /// <param name='target' type='HTMLElement' optional='true' locid="WinJS.UI.Fragments.render_p:target">
        /// The element to which the fragment is appended.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.UI.Fragments.render_returnValue">
        /// A promise that is fulfilled when the fragment has been loaded.
        /// If a target element is not specified, the copied fragment is the
        /// completed value.
        /// </returns>
        /// </signature>

        return renderImpl(href, target, false);
    };

    function cache(href) {
        /// <signature helpKeyword="WinJS.UI.Fragments.cache">
        /// <summary locid="WinJS.UI.Fragments.cache">
        /// Starts loading the fragment at the specified location. The returned promise completes
        /// when the fragment is ready to be copied.
        /// </summary>
        /// <param name="href" type="String or DOMElement" locid="WinJS.UI.Fragments.cache_p:href">
        /// The URI that contains the fragment to be copied.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.UI.Fragments.cache_returnValue">
        /// A promise that is fulfilled when the fragment has been prepared for copying.
        /// </returns>
        /// </signature>
        initialize();
        return getStateRecord(href).then(function (state) { return state.docfrag; });
    };

    function clearCache(href) {
        /// <signature helpKeyword="WinJS.UI.Fragments.clearCache">
        /// <summary locid="WinJS.UI.Fragments.clearCache">
        /// Removes any cached information about the specified fragment. This method does not unload any scripts
        /// or styles that are referenced by the fragment.
        /// </summary>
        /// <param name="href" type="String or DOMElement" locid="WinJS.UI.Fragments.clearCache_p:href">
        /// The URI that contains the fragment to be cleared. If no URI is provided, the entire contents of the cache are cleared.
        /// </param>
        /// </signature>

        if (!href) {
            cacheStore = {};
        }
        else if (typeof (href) == "string") {
            delete cacheStore[href.toLowerCase()];
        }
        else {
            delete WinJS.Utilities.data(href).docFragment;
            href.removeAttribute("data-win-hasfragment");
        }
    };

    function forceLocal(uri) {
        if (WinJS.Utilities.hasWinRT) {
            // we force the URI to be cannonicalized and made absolute by IE
            //
            var a = document.createElement("a");
            a.href = uri;

            var absolute = a.href;

            // WinRT Uri class doesn't provide URI construction, but can crack the URI
            // appart to let us reliably discover the scheme.
            //
            var wuri = new Windows.Foundation.Uri(absolute);

            // Only "ms-appx" (local package content) are allowed when running in the local 
            // context. Both strings are known to be safe to compare in any culture (including Turkish).
            //
            var scheme = wuri.schemeName;
            if (scheme !== "ms-appx") {

                throw new WinJS.ErrorFromName("WinJS.UI.Fragments.InvalidUri", strings.invalidFragmentUri);
            }

            return absolute;
        }
        return uri;
    }

    WinJS.Namespace.define("WinJS.UI.Fragments", {
        renderCopy: renderCopy,
        render: render,
        cache: cache,
        clearCache: clearCache,
        _cacheStore: { get: function () { return cacheStore; } },
        _forceLocal: forceLocal
    });
})(this, WinJS);

(function fragmentLoader2Init(global) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    function cleanupDocumentIFrame(state) {
        // This is to work around a weird bug where removing the
        // IFrame from the DOM triggers DOMContentLoaded a second time.
        var temp = state.iframe;
        if (temp) {
            temp.contentDocument.removeEventListener("DOMContentLoaded", state.domContentLoaded, false);
            temp.parentNode.removeChild(temp);
            delete state.document;
            delete state.iframe;
            delete state.domContentLoaded;
        }
    };

    function populateDocumentIFrame(state, href) {
        return new WinJS.Promise(function (c, e, p) {
            var temp = document.createElement('iframe');
            temp.src = href;
            temp.style.display = 'none';

            state.domContentLoaded = function () {
                state.document = temp.contentDocument;
                state.iframe = temp;
                c();
            };

            document.body.appendChild(temp);
            temp.contentWindow.onerror = function (e) {
                // It's OK to swallow these as they will occur in the main document
                //
                return true;
            };
            temp.contentDocument.addEventListener("DOMContentLoaded", state.domContentLoaded, false);
        });
    };

    function cleanupDocumentXHR(state) {
        if (state.document) {
            delete state.document;
        }
        return WinJS.Promise.as();
    };

    function populateDocumentXHR(state, href) {
        // Because we later use "setInnerHTMLUnsafe" ("Unsafe" is the magic word here), we 
        // want to force the href to only support local package content when running
        // in the local context. When running in the web context, this will be a no-op.
        //
        href = WinJS.UI.Fragments._forceLocal(href);

        var htmlDoc = document.implementation.createHTMLDocument("frag");
        var base = htmlDoc.createElement("base");
        htmlDoc.head.appendChild(base);
        var anchor = htmlDoc.createElement("a");
        htmlDoc.body.appendChild(anchor);
        base.href = document.location.href; // Initialize base URL to primary document URL
        anchor.setAttribute("href", href); // Resolve the relative path to an absolute path
        base.href = anchor.href; // Update the base URL to be the resolved absolute path
        // 'anchor' is no longer needed at this point and will be removed by the innerHTML call
        state.document = htmlDoc;
        return WinJS.xhr({ url: href }).then(function (req) {
            WinJS.Utilities.setInnerHTMLUnsafe(htmlDoc.documentElement, req.responseText);
            htmlDoc.head.appendChild(base);
        });
    };

    if (global.MSApp) {
        WinJS.Namespace.define("WinJS.UI.Fragments", {
            _populateDocument: populateDocumentXHR,
            _cleanupDocument: cleanupDocumentXHR
        });
    }
    else {
        WinJS.Namespace.define("WinJS.UI.Fragments", {
            _populateDocument: populateDocumentIFrame,
            _cleanupDocument: cleanupDocumentIFrame
        });
    }
})(this);

(function optionsLexerInit(global, undefined) {
    "use strict";


    /*

Lexical grammar is defined in ECMA-262-5, section 7.

Lexical productions used in this grammar defined in ECMA-262-5:

Production          Section
--------------------------------
Identifier          7.6
NullLiteral         7.8.1
BooleanLiteral      7.8.2
NumberLiteral       7.8.3
StringLiteral       7.8.4

*/

    var tokenType = {
        leftBrace: 1,           // {
        rightBrace: 2,          // }
        leftBracket: 3,         // [
        rightBracket: 4,        // ]
        separator: 5,           // ECMA-262-5, 7.2
        colon: 6,               // :
        semicolon: 7,           // ;
        comma: 8,               // ,
        dot: 9,                 // .
        nullLiteral: 10,        // ECMA-262-5, 7.8.1 (null)
        trueLiteral: 11,        // ECMA-262-5, 7.8.2 (true)
        falseLiteral: 12,       // ECMA-262-5, 7.8.2 (false)
        numberLiteral: 13,      // ECMA-262-5, 7.8.3
        stringLiteral: 14,      // ECMA-262-5, 7.8.4
        identifier: 15,         // ECMA-262-5, 7.6
        reservedWord: 16,
        thisKeyword: 17,
        leftParentheses: 18,    // (
        rightParentheses: 19,   // )
        eof: 20,
        error: 21
    };
    // debugging - this costs something like 20%
    //
    //Object.keys(tokenType).forEach(function (key) {
    //    tokenType[key] = key.toString();
    //});
    var tokens = {
        leftBrace: { type: tokenType.leftBrace, length: 1 },
        rightBrace: { type: tokenType.rightBrace, length: 1 },
        leftBracket: { type: tokenType.leftBracket, length: 1 },
        rightBracket: { type: tokenType.rightBracket, length: 1 },
        colon: { type: tokenType.colon, length: 1 },
        semicolon: { type: tokenType.semicolon, length: 1 },
        comma: { type: tokenType.comma, length: 1 },
        dot: { type: tokenType.dot, length: 1 },
        nullLiteral: { type: tokenType.nullLiteral, length: 4, value: null, keyword: true },
        trueLiteral: { type: tokenType.trueLiteral, length: 4, value: true, keyword: true },
        falseLiteral: { type: tokenType.falseLiteral, length: 5, value: false, keyword: true },
        thisKeyword: { type: tokenType.thisKeyword, length: 4, value: "this", keyword: true },
        leftParentheses: { type: tokenType.leftParentheses, length: 1 },
        rightParentheses: { type: tokenType.rightParentheses, length: 1 },
        eof: { type: tokenType.eof, length: 0 }
    };

    function reservedWord(word) {
        return { type: tokenType.reservedWord, value: word, length: word.length, keyword: true };
    }
    function reservedWordLookup(identifier) {
        // Moving from a simple object literal lookup for reserved words to this
        // switch was worth a non-trivial performance increase (5-7%) as this path
        // gets taken for any identifier.
        //
        switch (identifier.charCodeAt(0)) {
            case /*b*/98:
                switch (identifier) {
                    case 'break':
                        return reservedWord(identifier);
                }
                break;

            case /*c*/99:
                switch (identifier) {
                    case 'case':
                    case 'catch':
                    case 'class':
                    case 'const':
                    case 'continue':
                        return reservedWord(identifier);
                }
                break;

            case /*d*/100:
                switch (identifier) {
                    case 'debugger':
                    case 'default':
                    case 'delete':
                    case 'do':
                        return reservedWord(identifier);
                }
                break;

            case /*e*/101:
                switch (identifier) {
                    case 'else':
                    case 'enum':
                    case 'export':
                    case 'extends':
                        return reservedWord(identifier);
                }
                break;

            case /*f*/102:
                switch (identifier) {
                    case 'false':
                        return tokens.falseLiteral;

                    case 'finally':
                    case 'for':
                    case 'function':
                        return reservedWord(identifier);
                }

                break;
            case /*i*/105:
                switch (identifier) {
                    case 'if':
                    case 'import':
                    case 'in':
                    case 'instanceof':
                        return reservedWord(identifier);
                }
                break;

            case /*n*/110:
                switch (identifier) {
                    case 'null':
                        return tokens.nullLiteral;

                    case 'new':
                        return reservedWord(identifier);
                }
                break;

            case /*r*/114:
                switch (identifier) {
                    case 'return':
                        return reservedWord(identifier);
                }
                break;

            case /*s*/115:
                switch (identifier) {
                    case 'super':
                    case 'switch':
                        return reservedWord(identifier);
                }
                break;

            case /*t*/116:
                switch (identifier) {
                    case 'true':
                        return tokens.trueLiteral;

                    case 'this':
                        return tokens.thisKeyword;

                    case 'throw':
                    case 'try':
                    case 'typeof':
                        return reservedWord(identifier);
                }
                break;

            case /*v*/118:
                switch (identifier) {
                    case 'var':
                    case 'void':
                        return reservedWord(identifier);
                }
                break;

            case /*w*/119:
                switch (identifier) {
                    case 'while':
                    case 'with':
                        return reservedWord(identifier);
                }
                break;
        }
        return;
    }

    var lexer = (function () {
        function isIdentifierStartCharacter(code, text, offset, limit) {
            // The ES5 spec decalares that identifiers consist of a bunch of unicode classes, without
            // WinRT support for determining unicode class membership we are looking at 2500+ lines of
            // javascript code to encode the relevant class tables. Instead we look for everything
            // which is legal and < 0x7f, we exclude whitespace and line terminators, and then accept
            // everything > 0x7f.
            //
            // Here's the ES5 production:
            //
            //  Lu | Ll | Lt | Lm | Lo | Nl
            //  $
            //  _
            //  \ UnicodeEscapeSequence
            //
            switch (code) {
                case (code >= /*a*/97 && code <= /*z*/122) && code:
                case (code >= /*A*/65 && code <= /*Z*/90) && code:
                case /*$*/36:
                case /*_*/95:
                    return true;

                case isWhitespace(code) && code:
                case isLineTerminator(code) && code:
                    return false;

                case (code > 0x7f) && code:
                    return true;

                case /*\*/92:
                    if (offset + 4 < limit) {
                        if (text.charCodeAt(offset) === /*u*/117 &&
                            isHexDigit(text.charCodeAt(offset + 1)) &&
                            isHexDigit(text.charCodeAt(offset + 2)) &&
                            isHexDigit(text.charCodeAt(offset + 3)) &&
                            isHexDigit(text.charCodeAt(offset + 4))) {
                            return true;
                        }
                    }
                    return false;

                default:
                    return false;
            }
        }
        /*
// Hand-inlined into readIdentifierPart
function isIdentifierPartCharacter(code) {
// See comment in isIdentifierStartCharacter.
//
// Mn | Mc | Nd | Pc
// <ZWNJ> | <ZWJ>
//
switch (code) {
case isIdentifierStartCharacter(code) && code:
case isDecimalDigit(code) && code:
return true;

default:
return false;
}
}
*/
        function readIdentifierPart(text, offset, limit) {
            var hasEscape = false;
            while (offset < limit) {
                var code = text.charCodeAt(offset);
                switch (code) {
                    //case isIdentifierStartCharacter(code) && code:
                    case (code >= /*a*/97 && code <= /*z*/122) && code:
                    case (code >= /*A*/65 && code <= /*Z*/90) && code:
                    case /*$*/36:
                    case /*_*/95:
                        break;

                    case isWhitespace(code) && code:
                    case isLineTerminator(code) && code:
                        return hasEscape ? -offset : offset;

                    case (code > 0x7f) && code:
                        break;

                        //case isDecimalDigit(code) && code:
                    case (code >= /*0*/48 && code <= /*9*/57) && code:
                        break;

                    case /*\*/92:
                        if (offset + 5 < limit) {
                            if (text.charCodeAt(offset + 1) === /*u*/117 &&
                                isHexDigit(text.charCodeAt(offset + 2)) &&
                                isHexDigit(text.charCodeAt(offset + 3)) &&
                                isHexDigit(text.charCodeAt(offset + 4)) &&
                                isHexDigit(text.charCodeAt(offset + 5))) {
                                offset += 5;
                                hasEscape = true;
                                break;
                            }
                        }
                        return hasEscape ? -offset : offset;

                    default:
                        return hasEscape ? -offset : offset;
                }
                offset++;
            }
            return hasEscape ? -offset : offset;
        }
        function readIdentifierToken(text, offset, limit) {
            var startOffset = offset;
            offset = readIdentifierPart(text, offset, limit);
            var hasEscape = false;
            if (offset < 0) {
                offset = -offset;
                hasEscape = true;
            }
            var identifier = text.substr(startOffset, offset - startOffset);
            if (hasEscape) {
                identifier = "" + JSON.parse('"' + identifier + '"');
            }
            var wordToken = reservedWordLookup(identifier);
            if (wordToken) {
                return wordToken;
            }
            return {
                type: tokenType.identifier,
                length: offset - startOffset,
                value: identifier
            };
        }
        function isHexDigit(code) {
            switch (code) {
                case (code >= /*0*/48 && code <= /*9*/57) && code:
                case (code >= /*a*/97 && code <= /*f*/102) && code:
                case (code >= /*A*/65 && code <= /*F*/70) && code:
                    return true;

                default:
                    return false;
            }
        }
        function readHexIntegerLiteral(text, offset, limit) {
            while (offset < limit && isHexDigit(text.charCodeAt(offset))) {
                offset++;
            }
            return offset;
        }
        function isDecimalDigit(code) {
            switch (code) {
                case (code >= /*0*/48 && code <= /*9*/57) && code:
                    return true;

                default:
                    return false;
            }
        }
        function readDecimalDigits(text, offset, limit) {
            while (offset < limit && isDecimalDigit(text.charCodeAt(offset))) {
                offset++;
            }
            return offset;
        }
        function readDecimalLiteral(text, offset, limit) {
            offset = readDecimalDigits(text, offset, limit);
            if (offset < limit && text.charCodeAt(offset) === /*.*/46 && offset + 1 < limit && isDecimalDigit(text.charCodeAt(offset + 1))) {
                offset = readDecimalDigits(text, offset + 2, limit);
            }
            if (offset < limit) {
                var code = text.charCodeAt(offset);
                if (code === /*e*/101 || code === /*E*/69) {
                    var tempOffset = offset + 1;
                    if (tempOffset < limit) {
                        code = text.charCodeAt(tempOffset);
                        if (code === /*+*/43 || code === /*-*/45) {
                            tempOffset++;
                        }
                        offset = readDecimalDigits(text, tempOffset, limit);
                    }
                }
            }
            return offset;
        }
        function readDecimalLiteralToken(text, start, offset, limit) {
            var offset = readDecimalLiteral(text, offset, limit);
            var length = offset - start;
            return {
                type: tokenType.numberLiteral,
                length: length,
                value: +text.substr(start, length)
            };
        }
        function isLineTerminator(code) {
            switch (code) {
                case 0x000A:    // line feed
                case 0x000D:    // carriage return
                case 0x2028:    // line separator
                case 0x2029:    // paragraph separator
                    return true;

                default:
                    return false;
            }
        }
        function readStringLiteralToken(text, offset, limit) {
            var startOffset = offset;
            var quoteCharCode = text.charCodeAt(offset);
            var hasEscape = false;
            offset++;
            while (offset < limit && !isLineTerminator(text.charCodeAt(offset))) {
                if (offset + 1 < limit && text.charCodeAt(offset) === /*\*/92) {
                    hasEscape = true;

                    switch (text.charCodeAt(offset + 1)) {
                        case quoteCharCode:
                        case 0x005C:    // \
                        case 0x000A:    // line feed
                        case 0x2028:    // line separator
                        case 0x2029:    // paragraph separator
                            offset += 2;
                            continue;

                        case 0x000D:    // carriage return
                            if (offset + 2 < limit && text.charCodeAt(offset + 2) === 0x000A) {
                                // Skip \r\n
                                offset += 3;
                            } else {
                                offset += 2;
                            }
                            continue;
                    }
                }
                offset++;
                if (text.charCodeAt(offset - 1) === quoteCharCode) {
                    break;
                }
            }
            var length = offset - startOffset;
            // If we don't have a terminating quote go through the escape path.
            hasEscape = hasEscape || length === 1 || text.charCodeAt(offset - 1) !== quoteCharCode;
            var stringValue;
            if (hasEscape) {
                stringValue = eval(text.substr(startOffset, length));
            } else {
                stringValue = text.substr(startOffset + 1, length - 2);
            }
            return {
                type: tokenType.stringLiteral,
                length: length,
                value: stringValue
            };
        }
        function isWhitespace(code) {
            switch (code) {
                case 0x0009:    // tab
                case 0x000B:    // vertical tab
                case 0x000C:    // form feed
                case 0x0020:    // space
                case 0x00A0:    // no-breaking space
                case 0xFEFF:    // BOM
                    return true;

                    // There are no category Zs between 0x00A0 and 0x1680.
                    //
                case (code < 0x1680) && code:
                    return false;

                    // Unicode category Zs
                    //
                case 0x1680:
                case 0x180e:
                case (code >= 0x2000 && code <= 0x200a) && code:
                case 0x202f:
                case 0x205f:
                case 0x3000:
                    return true;

                default:
                    return false;
            }
        }
        // Hand-inlined isWhitespace.
        function readWhitespace(text, offset, limit) {
            while (offset < limit) {
                var code = text.charCodeAt(offset);
                switch (code) {
                    case 0x0009:    // tab
                    case 0x000B:    // vertical tab
                    case 0x000C:    // form feed
                    case 0x0020:    // space
                    case 0x00A0:    // no-breaking space
                    case 0xFEFF:    // BOM
                        break;

                        // There are no category Zs between 0x00A0 and 0x1680.
                        //
                    case (code < 0x1680) && code:
                        return offset;

                        // Unicode category Zs
                        //
                    case 0x1680:
                    case 0x180e:
                    case (code >= 0x2000 && code <= 0x200a) && code:
                    case 0x202f:
                    case 0x205f:
                    case 0x3000:
                        break;

                    default:
                        return offset;
                }
                offset++;
            }
            return offset;
        }
        function lex(result, text, offset, limit) {
            while (offset < limit) {
                var startOffset = offset;
                var code = text.charCodeAt(offset++);
                var type = undefined;
                var token = undefined;
                switch (code) {
                    case isWhitespace(code) && code:
                    case isLineTerminator(code) && code:
                        offset = readWhitespace(text, offset, limit);
                        token = { type: tokenType.separator, length: offset - startOffset };
                        // don't include whitespace in the token stream.
                        continue;

                    case /*"*/34:
                    case /*'*/39:
                        token = readStringLiteralToken(text, offset - 1, limit);
                        break;

                    case /*(*/40:
                        token = tokens.leftParentheses;
                        break;

                    case /*)*/41:
                        token = tokens.rightParentheses;
                        break;

                    case /*+*/43:
                    case /*-*/45:
                        if (offset < limit) {
                            var afterSign = text.charCodeAt(offset);
                            if (afterSign === /*.*/46) {
                                var signOffset = offset + 1;
                                if (signOffset < limit && isDecimalDigit(text.charCodeAt(signOffset))) {
                                    token = readDecimalLiteralToken(text, startOffset, signOffset, limit);
                                    break;
                                }
                            } else if (isDecimalDigit(afterSign)) {
                                token = readDecimalLiteralToken(text, startOffset, offset, limit);
                                break;
                            }
                        }
                        token = { type: tokenType.error, length: offset - startOffset, value: text.substring(startOffset, offset) };
                        break;

                    case /*,*/44:
                        token = tokens.comma;
                        break;

                    case /*.*/46:
                        token = tokens.dot;
                        if (offset < limit && isDecimalDigit(text.charCodeAt(offset))) {
                            token = readDecimalLiteralToken(text, startOffset, offset, limit);
                        }
                        break;

                    case /*0*/48:
                        var ch2 = (offset < limit ? text.charCodeAt(offset) : 0);
                        if (ch2 === /*x*/120 || ch2 === /*X*/88) {
                            var hexOffset = readHexIntegerLiteral(text, offset + 1, limit);
                            token = {
                                type: tokenType.numberLiteral,
                                length: hexOffset - startOffset,
                                value: +text.substr(startOffset, hexOffset - startOffset)
                            };
                        } else {
                            token = readDecimalLiteralToken(text, startOffset, offset, limit);
                        }
                        break;

                    case (code >= /*1*/49 && code <= /*9*/57) && code:
                        token = readDecimalLiteralToken(text, startOffset, offset, limit);
                        break;

                    case /*:*/58:
                        token = tokens.colon;
                        break;

                    case /*;*/59:
                        token = tokens.semicolon;
                        break;

                    case /*[*/91:
                        token = tokens.leftBracket;
                        break;

                    case /*]*/93:
                        token = tokens.rightBracket;
                        break;

                    case /*{*/123:
                        token = tokens.leftBrace;
                        break;

                    case /*}*/125:
                        token = tokens.rightBrace;
                        break;

                    default:
                        if (isIdentifierStartCharacter(code, text, offset, limit)) {
                            token = readIdentifierToken(text, offset - 1, limit);
                            break;
                        }
                        token = { type: tokenType.error, length: offset - startOffset, value: text.substring(startOffset, offset) };
                        break;
                }

                offset += (token.length - 1);
                result.push(token);
            }
        }
        return function (text) {
            var result = [];
            lex(result, text, 0, text.length);
            result.push(tokens.eof);
            return result;
        };
    })();
    lexer.tokenType = tokenType;

    WinJS.Namespace.define("WinJS.UI", {
        _optionsLexer: lexer
    });
})(this);
(function optionsParserInit(global, undefined) {
    "use strict";

    var strings = {
        get invalidOptionsRecord() { return WinJS.Resources._getWinJSString("base/invalidOptionsRecord").value; },
        get unexpectedTokenExpectedToken() { return WinJS.Resources._getWinJSString("base/unexpectedTokenExpectedToken").value; },
        get unexpectedTokenExpectedTokens() { return WinJS.Resources._getWinJSString("base/unexpectedTokenExpectedTokens").value; },
        get unexpectedTokenGeneric() { return WinJS.Resources._getWinJSString("base/unexpectedTokenGeneric").value; },
    };

    /*
    Notation is described in ECMA-262-5 (ECMAScript Language Specification, 5th edition) section 5.

    Lexical grammar is defined in ECMA-262-5, section 7.

    Lexical productions used in this grammar defined in ECMA-262-5:

        Production          Section
        --------------------------------
        Identifier          7.6
        NullLiteral         7.8.1
        BooleanLiteral      7.8.2
        NumberLiteral       7.8.3
        StringLiteral       7.8.4

    Syntactic grammar for the value of the data-win-options attribute.

        OptionsLiteral:
            ObjectLiteral

        ObjectLiteral:
            { }
            { ObjectProperties }
            { ObjectProperties , }

        ObjectProperties:
            ObjectProperty
            ObjectProperties, ObjectProperty

        ObjectProperty:
            PropertyName : Value

        PropertyName:                       (from ECMA-262-6, 11.1.5)
            StringLiteral
            NumberLiteral
            Identifier

        ArrayLiteral:
            [ ]
            [ Elision ]
            [ ArrayElements ]
            [ ArrayElements , ]
            [ ArrayElements , Elision ]

        ArrayElements:
            Value
            Elision Value
            ArrayElements , Value
            ArrayElements , Elision Value

        Elision:
            ,
            Elision ,

        Value:
            NullLiteral
            NumberLiteral
            BooleanLiteral
            StringLiteral
            ArrayLiteral
            ObjectLiteral
            IdentifierExpression
            ObjectQueryExpression

        AccessExpression:
            [ Value ]
            . Identifier

        AccessExpressions:
            AccessExpression
            AccessExpressions AccessExpression

        IdentifierExpression:
            Identifier
            Identifier AccessExpressions

        ObjectQueryExpression:
            Identifier ( StringLiteral )
            Identifier ( StringLiteral ) AccessExpressions


    NOTE: We have factored the above grammar to allow the infrastructure to be used
          by the BindingInterpreter as well. The BaseInterpreter does NOT provide an
          implementation of _evaluateValue(), this is expected to be provided by the
          derived class since right now the two have different grammars for Value

        AccessExpression:
            [ Value ]
            . Identifier

        AccessExpressions:
            AccessExpression
            AccessExpressions AccessExpression

        Identifier:
            Identifier                      (from ECMA-262-6, 7.6)

        IdentifierExpression:
            Identifier
            Identifier AccessExpressions

        Value:
            *** Provided by concrete interpreter ***

*/

    var lexer = WinJS.UI._optionsLexer;
    var tokenType = lexer.tokenType;
    var requireSupportedForProcessing = WinJS.Utilities.requireSupportedForProcessing;

    function tokenTypeName(type) {
        var keys = Object.keys(tokenType);
        for (var i = 0, len = keys.length; i < len; i++) {
            if (type === tokenType[keys[i]]) {
                return keys[i];
            }
        }
        return "<unknown>";
    }

    var BaseInterpreter = WinJS.Class.define(null,
        {
            _error: function (message) {
                throw new WinJS.ErrorFromName("WinJS.UI.ParseError", message);
            },
            _currentOffset: function () {
                var l = this._tokens.length;
                var p = this._pos;
                var offset = 0;
                for (var i = 0; i < p; i++) {
                    offset += this._tokens[i].length;
                }
                return offset;
            },
            _evaluateAccessExpression: function (value) {
                switch (this._current.type) {
                    case tokenType.dot:
                        this._read();
                        switch (this._current.type) {
                            case tokenType.identifier:
                            case this._current.keyword && this._current.type:
                                var id = this._current.value;
                                this._read();
                                return value[id];

                            default:
                                this._unexpectedToken(tokenType.identifier, tokenType.reservedWord);
                                break;
                        }
                        return;

                    case tokenType.leftBracket:
                        this._read();
                        var index = this._evaluateValue();
                        this._read(tokenType.rightBracket);
                        return value[index];

                        // default: is unreachable because all the callers are conditional on
                        // the next token being either a . or {
                        //
                }
            },
            _evaluateAccessExpressions: function (value) {
                while (true) {
                    switch (this._current.type) {
                        case tokenType.dot:
                        case tokenType.leftBracket:
                            value = this._evaluateAccessExpression(value);
                            break;

                        default:
                            return value;
                    }
                }
            },
            _evaluateIdentifier: function (nested, value) {
                var id = this._readIdentifier();
                value = nested ? value[id] : this._context[id];
                return value;
            },
            _evaluateIdentifierExpression: function () {
                var value = this._evaluateIdentifier(false);

                switch (this._current.type) {
                    case tokenType.dot:
                    case tokenType.leftBracket:
                        return this._evaluateAccessExpressions(value);
                    default:
                        return value;
                }
            },
            _initialize: function (tokens, originalSource, context, functionContext) {
                this._originalSource = originalSource;
                this._tokens = tokens;
                this._context = context;
                this._functionContext = functionContext;
                this._pos = 0;
                this._current = this._tokens[0];
            },
            _read: function (expected) {
                if (expected && this._current.type !== expected) {
                    this._unexpectedToken(expected);
                }
                if (this._current !== tokenType.eof) {
                    this._current = this._tokens[++this._pos];
                }
            },
            _peek: function (expected) {
                if (expected && this._current.type !== expected) {
                    return;
                }
                if (this._current !== tokenType.eof) {
                    return this._tokens[this._pos + 1];
                }
            },
            _readAccessExpression: function (parts) {
                switch (this._current.type) {
                    case tokenType.dot:
                        this._read();
                        switch (this._current.type) {
                            case tokenType.identifier:
                            case this._current.keyword && this._current.type:
                                parts.push(this._current.value);
                                this._read();
                                break;

                            default:
                                this._unexpectedToken(tokenType.identifier, tokenType.reservedWord);
                                break;
                        }
                        return;

                    case tokenType.leftBracket:
                        this._read();
                        parts.push(this._evaluateValue());
                        this._read(tokenType.rightBracket);
                        return;

                        // default: is unreachable because all the callers are conditional on
                        // the next token being either a . or {
                        //
                }
            },
            _readAccessExpressions: function (parts) {
                while (true) {
                    switch (this._current.type) {
                        case tokenType.dot:
                        case tokenType.leftBracket:
                            this._readAccessExpression(parts);
                            break;

                        default:
                            return;
                    }
                }
            },
            _readIdentifier: function () {
                var id = this._current.value;
                this._read(tokenType.identifier);
                return id;
            },
            _readIdentifierExpression: function () {
                var parts = [];
                if (this._peek(tokenType.thisKeyword) && parts.length === 0) {
                    this._read();
                }
                else {
                    parts.push(this._readIdentifier());
                }

                switch (this._current.type) {
                    case tokenType.dot:
                    case tokenType.leftBracket:
                        this._readAccessExpressions(parts);
                        break;
                }

                return parts;
            },
            _unexpectedToken: function (expected) {
                var unexpected = (this._current.type === tokenType.error ? "'" + this._current.value + "'" : tokenTypeName(this._current.type));
                if (expected) {
                    if (arguments.length == 1) {
                        expected = tokenTypeName(expected);
                        this._error(WinJS.Resources._formatString(strings.unexpectedTokenExpectedToken, unexpected, expected, this._currentOffset()));
                    } else {
                        var names = [];
                        for (var i = 0, len = arguments.length; i < len; i++) {
                            names.push(tokenTypeName(arguments[i]));
                        }
                        expected = names.join(", ");
                        this._error(WinJS.Resources._formatString(strings.unexpectedTokenExpectedTokens, unexpected, expected, this._currentOffset()));
                    }
                } else {
                    this._error(WinJS.Resources._formatString(strings.unexpectedTokenGeneric, unexpected, this._currentOffset()));
                }
            }
        }, {
            supportedForProcessing: false,
        }
    );

    var OptionsInterpreter = WinJS.Class.derive(BaseInterpreter,
        function (tokens, originalSource, context, functionContext) {
            this._initialize(tokens, originalSource, context, functionContext);
        },
        {
            _error: function (message) {
                throw new WinJS.ErrorFromName("WinJS.UI.ParseError", WinJS.Resources._formatString(strings.invalidOptionsRecord, this._originalSource, message));
            },
            _evaluateArrayLiteral: function () {
                var a = [];
                this._read(tokenType.leftBracket);
                this._readArrayElements(a);
                this._read(tokenType.rightBracket);
                return a;
            },
            _evaluateObjectLiteral: function () {
                var o = {};
                this._read(tokenType.leftBrace);
                this._readObjectProperties(o);
                this._tryReadComma();
                this._read(tokenType.rightBrace);
                return o;
            },
            _evaluateOptionsLiteral: function () {
                var value = this._evaluateValue();
                if (this._current.type !== tokenType.eof) {
                    this._unexpectedToken(tokenType.eof);
                }
                return value;
            },
            _peekValue: function () {
                switch (this._current.type) {
                    case tokenType.falseLiteral:
                    case tokenType.nullLiteral:
                    case tokenType.stringLiteral:
                    case tokenType.trueLiteral:
                    case tokenType.numberLiteral:
                    case tokenType.leftBrace:
                    case tokenType.leftBracket:
                    case tokenType.identifier:
                        return true;
                    default:
                        return false;
                }
            },
            _evaluateValue: function () {
                switch (this._current.type) {
                    case tokenType.falseLiteral:
                    case tokenType.nullLiteral:
                    case tokenType.stringLiteral:
                    case tokenType.trueLiteral:
                    case tokenType.numberLiteral:
                        var value = this._current.value;
                        this._read();
                        return value;

                    case tokenType.leftBrace:
                        return this._evaluateObjectLiteral();

                    case tokenType.leftBracket:
                        return this._evaluateArrayLiteral();

                    case tokenType.identifier:
                        if (this._peek(tokenType.identifier).type == tokenType.leftParentheses) {
                            return requireSupportedForProcessing(this._evaluateObjectQueryExpression());
                        }
                        return requireSupportedForProcessing(this._evaluateIdentifierExpression());

                    default:
                        this._unexpectedToken(tokenType.falseLiteral, tokenType.nullLiteral, tokenType.stringLiteral,
                            tokenType.trueLiteral, tokenType.numberLiteral, tokenType.leftBrace, tokenType.leftBracket,
                            tokenType.identifier);
                        break;
                }
            },
            _tryReadElement: function (a) {
                if (this._peekValue()) {
                    a.push(this._evaluateValue());
                    return true;
                } else {
                    return false;
                }
            },
            _tryReadComma: function () {
                if (this._peek(tokenType.comma)) {
                    this._read();
                    return true;
                }
                return false;
            },
            _tryReadElision: function (a) {
                var found = false;
                while (this._tryReadComma()) {
                    a.push(undefined);
                    found = true;
                }
                return found;
            },
            _readArrayElements: function (a) {
                while (!this._peek(tokenType.rightBracket)) {
                    var elision = this._tryReadElision(a);
                    var element = this._tryReadElement(a);
                    var comma = this._peek(tokenType.comma);
                    if (element && comma) {
                        // if we had a element followed by a comma, eat the comma and try to read the next element
                        this._read();
                    } else if (element || elision) {
                        // if we had a element without a trailing comma or if all we had were commas we're done
                        break;
                    } else {
                        // if we didn't have a element or elision then we are done and in error
                        this._unexpectedToken(tokenType.falseLiteral, tokenType.nullLiteral, tokenType.stringLiteral,
                            tokenType.trueLiteral, tokenType.numberLiteral, tokenType.leftBrace, tokenType.leftBracket,
                            tokenType.identifier);
                        break;
                    }
                }
            },
            _readObjectProperties: function (o) {
                while (!this._peek(tokenType.rightBrace)) {
                    var property = this._tryReadObjectProperty(o);
                    var comma = this._peek(tokenType.comma);
                    if (property && comma) {
                        // if we had a property followed by a comma, eat the comma and try to read the next property
                        this._read();
                    } else if (property) {
                        // if we had a property without a trailing comma we're done
                        break;
                    } else {
                        // if we didn't have a property then we are done and in error
                        this._unexpectedToken(tokenType.numberLiteral, tokenType.stringLiteral, tokenType.identifier);
                        break;
                    }
                }
            },
            _tryReadObjectProperty: function (o) {
                switch (this._current.type) {
                    case tokenType.numberLiteral:
                    case tokenType.stringLiteral:
                    case tokenType.identifier:
                    case this._current.keyword && this._current.type:
                        var propertyName = this._current.value;
                        this._read();
                        this._read(tokenType.colon);
                        o[propertyName] = this._evaluateValue();
                        return true;

                    default:
                        return false;
                }
            },
            _failReadObjectProperty: function () {
                this._unexpectedToken(tokenType.numberLiteral, tokenType.stringLiteral, tokenType.identifier, tokenType.reservedWord);
            },
            _evaluateObjectQueryExpression: function () {
                var functionName = this._current.value;
                this._read(tokenType.identifier);
                this._read(tokenType.leftParentheses);
                var queryExpression = this._current.value;
                this._read(tokenType.stringLiteral);
                this._read(tokenType.rightParentheses);

                var value = requireSupportedForProcessing(this._functionContext[functionName])(queryExpression);
                switch (this._current.type) {
                    case tokenType.dot:
                    case tokenType.leftBracket:
                        return this._evaluateAccessExpressions(value);

                    default:
                        return value;
                }
            },
            run: function () {
                return this._evaluateOptionsLiteral();
            }
        }, {
            supportedForProcessing: false,
        }
    );

    var parser = function (text, context, functionContext) {
        var tokens = lexer(text);
        var interpreter = new OptionsInterpreter(tokens, text, context || {}, functionContext || {});
        return interpreter.run();
    };
    parser._BaseInterpreter = BaseInterpreter;

    WinJS.Namespace.define("WinJS.UI", {
        optionsParser: parser
    });

})(this);


(function tabManagerInit(global, WinJS, undefined) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }


    function fireEvent(element, name) {
        var event = document.createEvent('UIEvent');
        event.initUIEvent(name, false, false, window, 1);
        element.dispatchEvent(event);
    }

    function onBeforeActivate(e, element, hasFocus) {
        fireEvent(element, hasFocus ? "onTabExit" : "onTabEnter");
        e.cancelBubble = true;
        return false;
    }

    function prefixBeforeActivateHandler(e) {
        return onBeforeActivate(e, e.srcElement.nextSibling, e.shiftKey);
    }

    function postfixBeforeActivateHandler(e) {
        return onBeforeActivate(e, e.srcElement.previousSibling, !e.shiftKey);
    }

    function TabHelperObject(element, tabIndex) {
        function createCatcher(beforeActivateHandler) {
            var fragment = document.createElement("DIV");
            fragment.tabIndex = (tabIndex ? tabIndex : 0);
            fragment.attachEvent("onbeforeactivate", beforeActivateHandler);
            fragment.setAttribute("aria-hidden", true);
            return fragment;
        };

        var parent = element.parentNode;

        // Insert prefix focus catcher
        var catcherBegin = createCatcher(prefixBeforeActivateHandler);
        parent.insertBefore(catcherBegin, element);

        // Insert postfix focus catcher
        var catcherEnd = createCatcher(postfixBeforeActivateHandler);
        parent.insertBefore(catcherEnd, element.nextSibling);

        var refCount = 1;
        this.addRef = function () {
            refCount++;
        };
        this.release = function () {
            if (--refCount === 0) {
                if (catcherBegin.parentElement) {
                    parent.removeChild(catcherBegin);
                }
                if (catcherEnd.parentElement) {
                    parent.removeChild(catcherEnd);
                }
            }
            return refCount;
        };
        this.updateTabIndex = function (tabIndex) {
            catcherBegin.tabIndex = tabIndex;
            catcherEnd.tabIndex = tabIndex;
        }
    }

    WinJS.Namespace.define("WinJS.UI.TrackTabBehavior", {
        attach: function (element, tabIndex) {
            ///
            if (!element["win-trackTabHelperObject"]) {
                element["win-trackTabHelperObject"] = new TabHelperObject(element, tabIndex);
            } else {
                element["win-trackTabHelperObject"].addRef();
            }

            return element["win-trackTabHelperObject"];
        },

        detach: function (element) {
            ///
            if (!element["win-trackTabHelperObject"].release()) {
                delete element["win-trackTabHelperObject"];
            }
        }
    });

    WinJS.Namespace.define("WinJS.UI", {
        TabContainer: WinJS.Class.define(function TabContainer_ctor(element, options) {
            /// <signature helpKeyword="WinJS.UI.TabContainer.TabContainer">
            /// <summary locid="WinJS.UI.TabContainer.constructor">
            /// Constructs the TabContainer.
            /// </summary>
            /// <param name="element" type="HTMLElement" domElement="true" locid="WinJS.UI.TabContainer.constructor_p:element">
            /// The DOM element to be associated with the TabContainer.
            /// </param>
            /// <param name="options" type="Object" locid="WinJS.UI.TabContainer.constructor_p:options">
            /// The set of options to be applied initially to the TabContainer.
            /// </param>
            /// <returns type="WinJS.UI.TabContainer" locid="WinJS.UI.TabContainer.constructor_returnValue">
            /// A constructed TabContainer.
            /// </returns>
            /// </signature>
            // TabContainer uses 2 TrackTabBehavior for its implementation: one for itself, another one for the active element.
            // When onTabEnter is caught on TabContainer, it directly set focus on the active element.
            // When onTabExit is caught on the active element (_tabExitHandler), it first prevents focus from being set on any element,
            // effectively letting the focus skip any remaining items in the TabContainer. Then, when onTabExit is caught on
            // TabContainer, it turns back on the possibility to receive focus on child elements.
            this._element = element;
            this._tabIndex = 0;
            var that = this;
            this._tabExitHandler = function () {
                that._canFocus(false);
            };

            element.addEventListener("onTabEnter", function () {
                if (that.childFocus) {
                    that.childFocus.focus();
                } else {
                    that._canFocus(false);
                }
            });

            element.addEventListener("onTabExit", function () {
                that._canFocus(true);
            });

            this._elementTabHelper = WinJS.UI.TrackTabBehavior.attach(element, this._tabIndex);
        }, {

            // Public members

            /// <field type="HTMLElement" domElement="true" locid="WinJS.UI.TabContainer.childFocus" helpKeyword="WinJS.UI.TabContainer.childFocus">
            /// Gets or sets the child element that has focus.
            /// </field>
            childFocus: {
                set: function (e) {
                    if (e != this._focusElement) {
                        if (this._focusElement) {
                            WinJS.UI.TrackTabBehavior.detach(this._focusElement);
                            this._childTabHelper = null;
                            this._focusElement.removeEventListener("onTabExit", this._tabExitHandler);
                        }

                        if (e && e.parentNode) {
                            this._focusElement = e;
                            this._childTabHelper = WinJS.UI.TrackTabBehavior.attach(e, this._tabIndex);
                            this._focusElement.addEventListener("onTabExit", this._tabExitHandler);
                        } else {
                            //#DBG _ASSERT(!!e.parentNode);
                            this._focusElement = null;
                        }
                    }
                },
                get: function () {
                    return this._focusElement;
                }
            },

            /// <field type="Number" integer="true" locid="WinJS.UI.TabContainer.tabIndex" helpKeyword="WinJS.UI.TabContainer.tabIndex">
            /// Gets or sets the tab order of the control within its container.
            /// </field>
            tabIndex: {
                set: function (tabIndex) {
                    this._tabIndex = tabIndex;
                    this._elementTabHelper.updateTabIndex(tabIndex);
                    if (this._childTabHelper) {
                        this._childTabHelper.updateTabIndex(tabIndex);
                    }
                },

                get: function () {
                    return this._tabIndex;
                }
            },

            // Private members

            _element: null,
            _skipper: function (e) {
                e.cancelBubble = true;
                return false;
            },
            _canFocus: function (canfocus) {
                if (canfocus) {
                    this._element.detachEvent("onbeforeactivate", this._skipper);
                } else {
                    this._element.attachEvent("onbeforeactivate", this._skipper);
                }
            },

            _focusElement: null

        }, { // Static Members
            supportedForProcessing: false,
        })
    });
})(this, WinJS);

(function transitionAnimationInit(global, WinJS, undefined) {
    "use strict";

    // not supported in WebWorker
    if (!global.document) {
        return;
    }

    function makeArray(elements) {
        if (elements instanceof Array || elements instanceof NodeList || elements instanceof HTMLCollection) {
            return elements;
        } else if (elements) {
            return [elements];
        } else {
            return [];
        }
    }

    var keyframeCounter = 0;
    function getUniqueKeyframeName() {
        return "WinJSUIAnimation" + ++keyframeCounter;
    }
    function isUniqueKeyframeName(s) {
        return "WinJSUIAnimation" === s.substring(0, 16);
    }

    function resolveStyles(elem) {
        window.getComputedStyle(elem, null).opacity;
    }

    function copyWithEvaluation(iElem, elem) {
        return function (obj) {
            var newObj = {};
            for (var p in obj) {
                var v = obj[p];
                if (typeof v === "function") {
                    v = v(iElem, elem);
                }
                newObj[p] = v;
            }
            if (!newObj.exactTiming) {
                newObj.delay += UI._libraryDelay;
            }
            return newObj;
        };
    }

    var activeActions = [];

    var reason_ended = 0;
    var reason_interrupted = 1;
    var reason_canceled = 2;

    function stopExistingAction(id, prop) {
        var key = id + "|" + prop;
        var finish = activeActions[key];
        if (finish) {
            finish(reason_interrupted);
        }
    }

    function registerAction(id, prop, finish) {
        activeActions[id + "|" + prop] = finish;
    }

    function unregisterAction(id, prop) {
        delete activeActions[id + "|" + prop];
    }

    var StyleCache = WinJS.Class.define(
        // Constructor
        function StyleCache_ctor(id, desc, style) {
            this.cref = 0;
            this.id = id;
            this.desc = desc;
            this.removed = {};
            this.prevStyles = desc.props.map(function (p) { return style[p[0]]; });
            this.prevNames = this.names = style[desc.nameProp];
            desc.styleCaches[id] = this;
        }, {
            // Members
            destroy: function StyleCache_destroy(style) {
                var desc = this.desc;
                delete desc.styleCaches[this.id];
                if (this.prevNames === "" &&
                    this.prevStyles.every(function (s) { return s === ""; })) {
                    style[desc.shorthandProp] = "";
                } else {
                    desc.props.forEach(function (p, i) {
                        style[p[0]] = this.prevStyles[i];
                    }, this);
                    style[desc.nameProp] = this.prevNames;
                }
            },
            removeName: function StyleCache_removeName(style, name, elem) {
                var nameValue = this.names;
                var names = nameValue.split(", ");
                var index = names.lastIndexOf(name);
                if (index >= 0) {
                    names.splice(index, 1);
                    this.names = nameValue = names.join(", ");
                    if (nameValue === "" && this.desc.isTransition) {
                        nameValue = "none";
                    }
                }
                if (--this.cref) {
                    style[this.desc.nameProp] = nameValue;
                    if (!isUniqueKeyframeName(name)) {
                        this.removed[name] = true;
                    }
                } else {
                    if (elem && nameValue === "none") {
                        style[this.desc.nameProp] = nameValue;
                        resolveStyles(elem);
                    }
                    this.destroy(style);
                }
            }
        });

    function setTemporaryStyles(elem, id, style, actions, desc) {
        var styleCache = desc.styleCaches[id] ||
                         new StyleCache(id, desc, style);
        styleCache.cref += actions.length;

        actions.forEach(function (action) {
            stopExistingAction(id, action.property);
        });

        if (desc.isTransition ||
            actions.some(function (action) {
                return styleCache.removed[action[desc.nameField]];
        })) {
            resolveStyles(elem);
            styleCache.removed = {};
        }

        var newShorthand = actions.map(function (action) {
            return action[desc.nameField] + " " +
                desc.props.map(function (p) {
                    return (p[1] ? action[p[1]] : "") + p[2];
                }).join(" ");
        }).join(", ");

        var newNames = actions.map(function (action) {
            return action[desc.nameField];
        }).join(", ");
        if (styleCache.names !== "") {
            newShorthand = styleCache.names + ", " + newShorthand;
            newNames = styleCache.names + ", " + newNames;
        }

        style[desc.shorthandProp] = newShorthand;
        styleCache.names = newNames;
        return styleCache;
    }

    var elementTransitionProperties = {
        shorthandProp: "transition",
        nameProp: "transition-property",
        nameField: "property",
        props: [
            ["transition-duration", "duration", "ms"],
            ["transition-timing-function", "timing", ""],
            ["transition-delay", "delay", "ms"]
        ],
        isTransition: true,
        styleCaches: []
    };

    function completePromise(c, synchronous) {
        if (synchronous) {
            c();
        } else {
            setImmediate(c);
        }
    }

    var uniformizeStyle;
    function executeElementTransition(elem, index, transitions, promises, animate) {
        if (transitions.length > 0) {
            var style = elem.style;
            var id = elem.uniqueID;
            if (!uniformizeStyle) {
                uniformizeStyle = document.createElement("DIV").style;
            }
            transitions = transitions.map(copyWithEvaluation(index, elem));
            transitions.forEach(function (transition) {
                if (transition.hasOwnProperty("from")) {
                    style[transition.property] = transition.from;
                }
                uniformizeStyle[transition.property] = transition.to;
                transition.to = uniformizeStyle[transition.property];
            });

            if (animate) {
                var styleCache = setTemporaryStyles(elem, id, style, transitions, elementTransitionProperties);
                var listener = elem.disabled ? document : elem;

                transitions.forEach(function (transition) {
                    var finish;
                    promises.push(new WinJS.Promise(function (c, e, p) {
                        finish = function (reason) {
                            if (onTransitionEnd) {
                                listener.removeEventListener("transitionend", onTransitionEnd, false);
                                unregisterAction(id, transition.property);
                                styleCache.removeName(style, transition.property, reason ? elem : null);
                                clearTimeout(timeoutId);
                                onTransitionEnd = null;
                            }
                            completePromise(c, reason === reason_canceled);
                        };

                        var onTransitionEnd = function (event) {
                            if (event.srcElement === elem && event.propertyName === transition.property) {
                                finish();
                            }
                        };

                        registerAction(id, transition.property, finish);
                        listener.addEventListener("transitionend", onTransitionEnd, false);

                        var padding = 0;
                        if (style[transition.property] !== transition.to) {
                            style[transition.property] = transition.to;
                            padding = 50;
                        }
                        var timeoutId = setTimeout(function () {
                            timeoutId = setTimeout(finish, transition.delay + transition.duration);
                        }, padding);
                    }, function () { finish(reason_canceled); }));
                });
            } else {
                transitions.forEach(function (transition) {
                    style[transition.property] = transition.to;
                });
            }
        }
    }

    var elementAnimationProperties = {
        shorthandProp: "animation",
        nameProp: "animation-name",
        nameField: "keyframe",
        props: [
            ["animation-duration", "duration", "ms"],
            ["animation-timing-function", "timing", ""],
            ["animation-delay", "delay", "ms"],
            ["animation-iteration-count", "", "1"],
            ["animation-direction", "", "normal"],
            ["animation-fill-mode", "", "both"]
        ],
        isTransition: false,
        styleCaches: []
    };

    function executeElementAnimation(elem, index, anims, promises, animate) {
        if (animate && anims.length > 0) {
            var style = elem.style;
            var id = elem.uniqueID;
            anims = anims.map(copyWithEvaluation(index, elem));
            var styleElem;
            var listener = elem.disabled ? document : elem;
            anims.forEach(function (anim) {
                if (!anim.keyframe) {
                    if (!styleElem) {
                        styleElem = document.createElement("STYLE");
                        document.documentElement.appendChild(styleElem);
                    }
                    anim.keyframe = getUniqueKeyframeName();
                    var kf = "@keyframes " + anim.keyframe + " { from {" + anim.property + ":" + anim.from + ";} to {" + anim.property + ":" + anim.to + ";}}";
                    styleElem.sheet.insertRule(kf, 0);
                }
            });
            var styleCache = setTemporaryStyles(elem, id, style, anims, elementAnimationProperties);
            anims.forEach(function (anim) {
                var finish;
                promises.push(new WinJS.Promise(function (c, e, p) {

                    finish = function (reason) {
                        if (onAnimationEnd) {
                            listener.removeEventListener("animationend", onAnimationEnd, false);
                            unregisterAction(id, anim.property);
                            styleCache.removeName(style, anim.keyframe);
                            clearTimeout(timeoutId);
                            onAnimationEnd = null;
                        }
                        completePromise(c, reason === reason_canceled);
                    };

                    var onAnimationEnd = function (event) {
                        if (event.srcElement === elem && event.animationName === anim.keyframe) {
                            finish();
                        }
                    };

                    registerAction(id, anim.property, finish);
                    var timeoutId = setTimeout(function () {
                        timeoutId = setTimeout(finish, anim.delay + anim.duration);
                    }, 50);
                    listener.addEventListener("animationend", onAnimationEnd, false);
                }, function () { finish(reason_canceled); }));
            });
            if (styleElem) {
                setTimeout(function () {
                    var parentElement = styleElem.parentElement;
                    if (parentElement) {
                        parentElement.removeChild(styleElem);
                    }
                }, 50);
            }
        }
    }

    var enableCount = 0;
    var animationSettings;
    function initAnimations() {
        if (!animationSettings) {
            if (WinJS.Utilities.hasWinRT) {
                animationSettings = new Windows.UI.ViewManagement.UISettings();
            }
            else {
                animationSettings = { animationsEnabled: true };
            }
        }
    }

    function isAnimationEnabled() {
        /// <signature helpKeyword="WinJS.UI.isAnimationEnabled">
        /// <summary locid="WinJS.UI.isAnimationEnabled">
        /// Determines whether the WinJS Animation Library will perform animations.
        /// </summary>
        /// <returns type="Boolean" locid="WinJS.UI.isAnimationEnabled_returnValue">
        /// true if WinJS animations will be performed.
        /// false if WinJS animations are suppressed.
        /// </returns>
        /// </signature>
        initAnimations();
        return enableCount + animationSettings.animationsEnabled > 0;
    }

    function createImmediatePromise() {
        var complete;
        return new WinJS.Promise(function (c, e, p) {
            complete = c;
            setImmediate(c);
        }, function () { complete(); });
    }

    function applyAction(element, action, execAction) {
        try {
            var animate = WinJS.UI.isAnimationEnabled();
            var elems = makeArray(element);
            var actions = makeArray(action);

            var promises = [];

            for (var i = 0; i < elems.length; i++) {
                if (elems[i] instanceof Array) {
                    for (var j = 0; j < elems[i].length; j++) {
                        execAction(elems[i][j], i, actions, promises, animate);
                    }
                } else {
                    execAction(elems[i], i, actions, promises, animate);
                }
            }

            if (promises.length) {
                return WinJS.Promise.join(promises);
            } else {
                return createImmediatePromise();
            }
        } catch (e) {
            return WinJS.Promise.wrapError(e);
        }
    }

    var UI = WinJS.Namespace.define("WinJS.UI", {
        disableAnimations: function () {
            /// <signature helpKeyword="WinJS.UI.disableAnimations">
            /// <summary locid="WinJS.UI.disableAnimations">
            /// Disables animations in the WinJS Animation Library
            /// by decrementing the animation enable count.
            /// </summary>
            /// </signature>
            enableCount--;
        },

        enableAnimations: function () {
            /// <signature helpKeyword="WinJS.UI.enableAnimations">
            /// <summary locid="WinJS.UI.enableAnimations">
            /// Enables animations in the WinJS Animation Library
            /// by incrementing the animation enable count.
            /// </summary>
            /// </signature>
            enableCount++;
        },

        isAnimationEnabled: isAnimationEnabled,

        _libraryDelay: 34,

        executeAnimation: function (element, animation) {
            /// <signature helpKeyword="WinJS.UI.executeAnimation">
            /// <summary locid="WinJS.UI.executeAnimation">
            /// Perform a CSS animation that can coexist with other
            /// Animation Library animations. Applications are not expected
            /// to call this function directly; they should prefer to use
            /// the high-level animations in the Animation Library.
            /// </summary>
            /// <param name="element" locid="WinJS.UI.executeAnimation_p:element">
            /// Single element or collection of elements on which
            /// to perform a CSS animation.
            /// </param>
            /// <param name="animation" locid="WinJS.UI.executeAnimation_p:animation">
            /// Single animation description or array of animation descriptions.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.UI.executeAnimation_returnValue">
            /// Promise object that completes when the CSS animation is complete.
            /// </returns>
            /// </signature>
            return applyAction(element, animation, executeElementAnimation);
        },

        executeTransition: function (element, transition) {
            /// <signature helpKeyword="WinJS.UI.executeTransition">
            /// <summary locid="WinJS.UI.executeTransition">
            /// Perform a CSS transition that can coexist with other
            /// Animation Library animations. Applications are not expected
            /// to call this function directly; they should prefer to use
            /// the high-level animations in the Animation Library.
            /// </summary>
            /// <param name="element" locid="WinJS.UI.executeTransition_p:element">
            /// Single element or collection of elements on which
            /// to perform a CSS transition.
            /// </param>
            /// <param name="transition" locid="WinJS.UI.executeTransition_p:transition">
            /// Single transition description or array of transition descriptions.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.UI.executeTransition_returnValue">
            /// Promise object that completes when the CSS transition is complete.
            /// </returns>
            /// </signature>
            return applyAction(element, transition, executeElementTransition);
        }
    });
})(this, WinJS);

(function utilitiesInit(global, undefined) {
    "use strict";

    var markSupportedForProcessing = WinJS.Utilities.markSupportedForProcessing;

    WinJS.Namespace.define("WinJS.UI", {
        eventHandler: function (handler) {
            /// <signature helpKeyword="WinJS.UI.eventHandler">
            /// <summary locid="WinJS.UI.eventHandler">
            /// Marks a event handler function as being compatible with declarative processing.
            /// </summary>
            /// <param name="handler" type="Object" locid="WinJS.UI.eventHandler_p:handler">
            /// The handler to be marked as compatible with declarative processing.
            /// </param>
            /// <returns type="Object" locid="WinJS.UI.eventHandler_returnValue">
            /// The input handler.
            /// </returns>
            /// </signature>
            return markSupportedForProcessing(handler);
        }
    });


    WinJS.Namespace.define("WinJS.Utilities", {

        _clamp: function (value, lowerBound, upperBound, defaultValue) {
            var n = Math.max(lowerBound, Math.min(upperBound, +value));
            return n === 0 ? 0 : n || Math.max(lowerBound, Math.min(upperBound, defaultValue));
        }

    });

}(this));

(function applicationInit(global, WinJS, undefined) {
    "use strict";

    global.Debug && (global.Debug.setNonUserCodeExceptions = true);

    var checkpointET = "checkpoint",
        unloadET = "unload",
        activatedET = "activated",
        loadedET = "loaded",
        readyET = "ready",
        errorET = "error",
        settingsET = "settings";

    var outstandingPromiseErrors;
    var eventQueue = [];
    var running = false;
    var registered = false;
    // check for WinRT & document, which means we will disabled application WinRT stuff in web worker context
    //
    var useWinRT = WinJS.Utilities.hasWinRT && global.document;

    var ListenerType = WinJS.Class.mix(WinJS.Class.define(null, { /* empty */ }, { supportedForProcessing: false }), WinJS.Utilities.eventMixin);
    var listeners = new ListenerType();
    var pendingDeferrals = {};
    var pendingDeferralID = 0;

    function safeSerialize(obj) {
        var str;
        try {
            str = JSON.stringify(obj);
        }
        catch (err) {
            // primitives, undefined, null, etc, all get serialized fine. In the
            // case that stringify fails (typically due to circular graphs) we 
            // just show "[object]". While we may be able to tighten the condition
            // for the exception, we never way this serialize to fail.
            // 
            // Note: we make this be a JSON string, so that consumers of the log
            // can always call JSON.parse.
            str = JSON.stringify("[object]");
        }
        return str;
    }

    var pendingDrain;

    var terminateAppHandler = function (data, e) {
        // This is the unhandled exception handler in WinJS. This handler is invoked whenever a promise
        // has an exception occur that is not handled (via an error handler passed to then() or a call to done()).
        //
        // To see the original exception stack, look at data.stack.
        // For more information on debugging and exception handling go to http://go.microsoft.com/fwlink/p/?LinkId=253583.
        debugger;
        MSApp.terminateApp(data);
    };

    function captureDeferral(obj) {
        var id = "def" + (pendingDeferralID++);
        return { deferral: pendingDeferrals[id] = obj.getDeferral(), id: id }
    }
    function completeDeferral(deferral, deferralID) {
        // If we have a deferralID we our table to find the
        // deferral. Since we remove it on completion, this
        // ensures that we never double notify a deferral
        // in the case of a user call "Application.stop" in 
        // the middle of processing an event
        //
        if (deferralID) {
            deferral = pendingDeferrals[deferralID];
            delete pendingDeferrals[deferralID];
        }
        if (deferral) {
            deferral.complete();
        }
    }
    function cleanupAllPendingDeferrals() {
        if (pendingDeferrals) {
            Object.keys(pendingDeferrals).forEach(function (k) {
                pendingDeferrals[k].complete();
            });
            pendingDeferrals = {};
        }
    }

    function dispatchEvent(eventRecord) {
        msWriteProfilerMark("WinJS.Application:Event_" + eventRecord.type + ",StartTM");

        var waitForPromise = WinJS.Promise.as();
        eventRecord.setPromise = function (promise) {
            /// <signature helpKeyword="WinJS.Application.eventRecord.setPromise">
            /// <summary locid="WinJS.Application.event.setPromise">
            /// Used to inform the application object that asynchronous work is being performed, and that this
            /// event handler should not be considered complete until the promise completes.
            /// </summary>
            /// <param name="promise" type="WinJS.Promise" locid="WinJS.Application.eventRecord.setPromise_p:promise">
            /// The promise to wait for.
            /// </param>
            /// </signature>
            waitForPromise = waitForPromise.then(function () { return promise; });
        };
        eventRecord.detail = eventRecord.detail || {};
        if (typeof (eventRecord.detail) === "object") {
            eventRecord.detail.setPromise = eventRecord.setPromise;
        }

        try {
            if (listeners._listeners) {
                var handled = false;
                l = listeners._listeners[eventRecord.type];
                if (l) {
                    l.forEach(function dispatchOne(e) {
                        handled = e.listener(eventRecord) || handled;
                    });
                }
            }

            // Fire built in listeners last, for checkpoint this is important
            // as it lets our built in serialization see any mutations to
            // app.sessionState
            //
            var l = builtInListeners[eventRecord.type];
            if (l) {
                l.forEach(function dispatchOne(e) { e(eventRecord, handled); });
            }
        }
        catch (err) {
            queueEvent({ type: errorET, detail: err });
        }


        function cleanup(r) {
            msWriteProfilerMark("WinJS.Application:Event_" + eventRecord.type + ",StopTM");

            if (eventRecord._deferral) {
                completeDeferral(eventRecord._deferral, eventRecord._deferralID);
            }
            return r;
        }

        return waitForPromise.then(cleanup, function (r) {
            return WinJS.Promise.wrapError(cleanup(r));
        });
    }

    function drainQueue(queue) {
        pendingDrain = true;
        if (queue.length === 0) {
            if (eventQueue.length > 0) {
                return drainQueue(copyAndClearQueue());
            }
            pendingDrain = false;
            return WinJS.Promise.as(queue);
        }
        function drainNext() {
            if (running) {
                return drainQueue(queue.slice(1));
            }
        }
        function drainError(err) {
            queueEvent({ type: errorET, detail: err });
            return drainNext();
        }
        return dispatchEvent(queue[0]).
            then(drainNext, drainError);
    }

    function queueEvent(eventRecord) {
        /// <signature helpKeyword="WinJS.Application.queueEvent">
        /// <summary locid="WinJS.Application.queueEvent">
        /// Queues an event to be processed by the WinJS.Application event queue.
        /// </summary>
        /// <param name="eventRecord" type="Object" locid="WinJS.Application.queueEvent_p:eventRecord">
        /// The event object is expected to have a type property that is
        /// used as the event name when dispatching on the WinJS.Application
        /// event queue. The entire object is provided to event listeners
        /// in the detail property of the event.
        /// </param>
        /// </signature>
        msWriteProfilerMark("WinJS.Application:Event_" + eventRecord.type + " queued,Info");
        eventQueue.push(eventRecord);
        if (running && !pendingDrain) {
            drainQueue(copyAndClearQueue());
        }
    }

    function copyAndClearQueue() {
        var queue = eventQueue;
        eventQueue = [];
        return queue;
    }

    var builtInListeners = {
        activated: [
            function Application_activatedHandler() {
                queueEvent({ type: readyET });
            }
        ],
        checkpoint: [
            function Application_checkpointHandler(e) {
                // comes from state.js
                WinJS.Application._oncheckpoint(e);
            }
        ],
        error: [
            function Application_errorHandler(e, handled) {
                if (handled) {
                    return;
                }

                WinJS.log && WinJS.log(safeSerialize(e), "winjs", "error");

                if (useWinRT && WinJS.Application._terminateApp) {
                    var data = e.detail;
                    var number = data && (data.number || (data.exception && data.exception.number) || (data.error && data.error.number) || data.errorCode || 0);
                    var terminateData = {
                        description: safeSerialize(data),
                        // note: because of how we listen to events, we rarely get a stack
                        stack: data && (data.stack || (data.exception && data.exception.stack) || (data.error && data.error.stack) || null),
                        errorNumber: number,
                        number: number
                    };
                    WinJS.Application._terminateApp(terminateData, e);
                }
            }
        ],
    };

    // loaded == DOMContentLoaded
    // activated == after WinRT Activated
    // ready == after all of the above
    //
    function activatedHandler(e) {
        var def = captureDeferral(e.activatedOperation);
        WinJS.Application._loadState(e).then(function () {
            queueEvent({ type: activatedET, detail: e, _deferral: def.deferral, _deferralID: def.id });
        });
    }
    function suspendingHandler(e) {
        var def = captureDeferral(e.suspendingOperation);
        WinJS.Application.queueEvent({ type: checkpointET, _deferral: def.deferral, _deferralID: def.id });
    }
    function domContentLoadedHandler(e) {
        queueEvent({ type: loadedET });
        if (!useWinRT) {
            var activatedArgs = {
                arguments: "",
                kind: "Windows.Launch",
                previousExecutionState: 0 //Windows.ApplicationModel.Activation.ApplicationExecutionState.NotRunning
            };
            WinJS.Application._loadState(activatedArgs).then(function () {
                queueEvent({ type: activatedET, detail: activatedArgs });
            });
        }
    }
    function beforeUnloadHandler(e) {
        cleanupAllPendingDeferrals();
        queueEvent({ type: unloadET });
    }
    function errorHandler(e) {
        var flattenedError = {};
        for (var k in e) {
            flattenedError[k] = e[k];
        }
        var data;
        var handled = true;
        var prev = WinJS.Application._terminateApp;
        try {
            WinJS.Application._terminateApp = function (d, e) {
                handled = false;
                data = d;
                if (prev !== terminateAppHandler) {
                    prev(d, e);
                }
            }
            dispatchEvent({ type: errorET, detail: { error: flattenedError, errorLine: event.errorLine, errorCharacter: event.errorCharacter, errorCode: event.errorCode, errorUrl: event.errorUrl, errorMessage: event.errorMessage } });
        } finally {
            WinJS.Application._terminateApp = prev;
        }
        return handled;
    }
    function promiseErrorHandler(e) {
        //
        // e.detail looks like: { exception, error, promise, handler, id, parent }
        //
        var details = e.detail;
        var id = details.id;

        // If the error has a parent promise then this is not the origination of the
        //  error so we check if it has a handler, and if so we mark that the error
        //  was handled by removing it from outstandingPromiseErrors
        //
        if (details.parent) {
            if (details.handler && outstandingPromiseErrors) {
                delete outstandingPromiseErrors[id];
            }
            return;
        }

        // If this is the first promise error to occur in this period we need to schedule
        //  a helper to come along after a setImmediate that propagates any remaining
        //  errors to the application's queue.
        //
        var shouldScheduleErrors = !outstandingPromiseErrors;

        // Indicate that this error was orignated and needs to be handled
        //
        outstandingPromiseErrors = outstandingPromiseErrors || [];
        outstandingPromiseErrors[id] = details;

        if (shouldScheduleErrors) {
            setImmediate(function () {
                var errors = outstandingPromiseErrors;
                outstandingPromiseErrors = null;
                errors.forEach(function (error) {
                    queueEvent({ type: errorET, detail: error });
                });
            });
        }
    }

    // capture this early
    //
    if (global.document) {
        document.addEventListener("DOMContentLoaded", domContentLoadedHandler, false);
    }

    function commandsRequested(e) {
        var event = { e: e, applicationcommands: undefined };
        listeners.dispatchEvent(settingsET, event);
    }

    function register() {
        if (!registered) {
            registered = true;
            global.addEventListener("beforeunload", beforeUnloadHandler, false);

            if (useWinRT) {
                global.addEventListener("error", errorHandler, false);

                var wui = Windows.UI.WebUI.WebUIApplication;
                wui.addEventListener("activated", activatedHandler, false);
                wui.addEventListener("suspending", suspendingHandler, false);

                var settingsPane = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
                settingsPane.addEventListener("commandsrequested", commandsRequested);
            }

            WinJS.Promise.addEventListener("error", promiseErrorHandler);
        }
    }
    function unregister() {
        if (registered) {
            registered = false;
            global.removeEventListener("beforeunload", beforeUnloadHandler, false);

            if (useWinRT) {
                global.removeEventListener("error", errorHandler, false);

                var wui = Windows.UI.WebUI.WebUIApplication;
                wui.removeEventListener("activated", activatedHandler, false);
                wui.removeEventListener("suspending", suspendingHandler, false);

                var settingsPane = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
                settingsPane.removeEventListener("commandsrequested", commandsRequested);
            }

            WinJS.Promise.removeEventListener("error", promiseErrorHandler);
        }
    }


    WinJS.Namespace.define("WinJS.Application", {
        stop: function () {
            /// <signature helpKeyword="WinJS.Application.stop">
            /// <summary locid="WinJS.Application.stop">
            /// Stops application event processing and resets WinJS.Application
            /// to its initial state.
            /// </summary>
            /// </signature>

            // Need to clear out the event properties explicitly to clear their backing
            //  state.
            //
            this.onactivated = null;
            this.oncheckpoint = null;
            this.onerror = null;
            this.onloaded = null;
            this.onready = null;
            this.onsettings = null;
            this.onunload = null;
            listeners = new ListenerType();
            WinJS.Application.sessionState = {};
            running = false;
            copyAndClearQueue();
            unregister();
            cleanupAllPendingDeferrals();
        },

        addEventListener: function (eventType, listener, capture) {
            /// <signature helpKeyword="WinJS.Application.addEventListener">
            /// <summary locid="WinJS.Application.addEventListener">
            /// Adds an event listener to the control.
            /// </summary>
            /// <param name="eventType" locid="WinJS.Application.addEventListener_p:eventType">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" locid="WinJS.Application.addEventListener_p:listener">
            /// The listener to invoke when the event is raised.
            /// </param>
            /// <param name="capture" locid="WinJS.Application.addEventListener_p:capture">
            /// true to initiate capture; otherwise, false.
            /// </param>
            /// </signature>
            listeners.addEventListener(eventType, listener, capture);
        },
        removeEventListener: function (eventType, listener, capture) {
            /// <signature helpKeyword="WinJS.Application.removeEventListener">
            /// <summary locid="WinJS.Application.removeEventListener">
            /// Removes an event listener from the control.
            /// </summary>
            /// <param name="eventType" locid="WinJS.Application.removeEventListener_p:eventType">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" locid="WinJS.Application.removeEventListener_p:listener">
            /// The listener to remove.
            /// </param>
            /// <param name="capture" locid="WinJS.Application.removeEventListener_p:capture">
            /// Specifies whether or not to initiate capture.
            /// </param>
            /// </signature>
            listeners.removeEventListener(eventType, listener, capture);
        },

        checkpoint: function () {
            /// <signature helpKeyword="WinJS.Application.checkpoint">
            /// <summary locid="WinJS.Application.checkpoint">
            /// Queues a checkpoint event.
            /// </summary>
            /// </signature>
            queueEvent({ type: checkpointET });
        },

        start: function () {
            /// <signature helpKeyword="WinJS.Application.start">
            /// <summary locid="WinJS.Application.start">
            /// Starts processing events in the WinJS.Application event queue.
            /// </summary>
            /// </signature>
            register();
            var queue = copyAndClearQueue();
            running = true;
            drainQueue(queue);
        },

        queueEvent: queueEvent,

        _terminateApp: terminateAppHandler,

    });

    Object.defineProperties(WinJS.Application, WinJS.Utilities.createEventProperties(checkpointET, unloadET, activatedET, loadedET, readyET, settingsET, errorET));
})(this, WinJS);

(function navigationInit(WinJS, undefined) {
    "use strict";

    var navigatedEventName = "navigated";
    var navigatingEventName = "navigating";
    var beforenavigateEventName = "beforenavigate";
    var ListenerType = WinJS.Class.mix(WinJS.Class.define(null, { /* empty */ }, { supportedForProcessing: false }), WinJS.Utilities.eventMixin);
    var listeners = new ListenerType();
    var history = {
        backStack: [],
        current: { location: "", initialPlaceholder: true },
        forwardStack: []
    };

    var raiseBeforeNavigate = function (proposed) {
        msWriteProfilerMark("WinJS.Navigation:navigation,StartTM");
        return WinJS.Promise.as().
            then(function () {
                var waitForPromise = WinJS.Promise.as();
                var defaultPrevented = listeners.dispatchEvent(beforenavigateEventName, {
                    setPromise: function (promise) {
                        /// <signature helpKeyword="WinJS.Navigation.beforenavigate.setPromise">
                        /// <summary locid="WinJS.Navigation.beforenavigate.setPromise">
                        /// Used to inform the ListView that asynchronous work is being performed, and that this
                        /// event handler should not be considered complete until the promise completes.
                        /// </summary>
                        /// <param name="promise" type="WinJS.Promise" locid="WinJS.Navigation.beforenavigate.setPromise_p:promise">
                        /// The promise to wait for.
                        /// </param>
                        /// </signature>

                        waitForPromise = waitForPromise.then(function () { return promise; });
                    },
                    location: proposed.location,
                    state: proposed.state
                });
                return waitForPromise.then(function beforeNavComplete(cancel) {
                    return defaultPrevented || cancel;
                });
            });
    };
    var raiseNavigating = function (delta) {
        return WinJS.Promise.as().
            then(function () {
                var waitForPromise = WinJS.Promise.as();
                listeners.dispatchEvent(navigatingEventName, {
                    setPromise: function (promise) {
                        /// <signature helpKeyword="WinJS.Navigation.navigating.setPromise">
                        /// <summary locid="WinJS.Navigation.navigating.setPromise">
                        /// Used to inform the ListView that asynchronous work is being performed, and that this
                        /// event handler should not be considered complete until the promise completes. 
                        /// </summary>
                        /// <param name="promise" type="WinJS.Promise" locid="WinJS.Navigation.navigating.setPromise_p:promise">
                        /// The promise to wait for.
                        /// </param>
                        /// </signature>

                        waitForPromise = waitForPromise.then(function () { return promise; });
                    },
                    location: history.current.location,
                    state: history.current.state,
                    delta: delta
                });
                return waitForPromise;
            });
    };
    var raiseNavigated = function (value, err) {
        msWriteProfilerMark("WinJS.Navigation:navigation,StopTM");
        var waitForPromise = WinJS.Promise.as();
        var detail = {
            value: value,
            location: history.current.location,
            state: history.current.state,
            setPromise: function (promise) {
                /// <signature helpKeyword="WinJS.Navigation.navigated.setPromise">
                /// <summary locid="WinJS.Navigation.navigated.setPromise">
                /// Used to inform the ListView that asynchronous work is being performed, and that this
                /// event handler should not be considered complete until the promise completes. 
                /// </summary>
                /// <param name="promise" type="WinJS.Promise" locid="WinJS.Navigation.navigated.setPromise_p:promise">
                /// The promise to wait for.
                /// </param>
                /// </signature>

                waitForPromise = waitForPromise.then(function () { return promise; });
            }
        };
        if (!value && err) {
            detail.error = err;
        }
        listeners.dispatchEvent(navigatedEventName, detail);
        return waitForPromise;
    };

    var go = function (distance, fromStack, toStack, delta) {
        distance = Math.min(distance, fromStack.length);
        if (distance > 0) {
            return raiseBeforeNavigate(fromStack[fromStack.length - distance]).
                then(function goBeforeCompleted(cancel) {
                    if (!cancel) {
                        toStack.push(history.current);
                        while (distance - 1 != 0) {
                            distance--;
                            toStack.push(fromStack.pop());
                        }
                        history.current = fromStack.pop();
                        return raiseNavigating(delta).then(
                            raiseNavigated,
                            function (err) {
                                raiseNavigated(undefined, err || true);
                                throw err;
                            }).then(function () { return true; });
                    }
                    else {
                        return false;
                    }
                });
        }
        return WinJS.Promise.wrap(false);
    }

    WinJS.Namespace.define("WinJS.Navigation", {
        /// <field name="canGoForward" type="Boolean" locid="WinJS.Navigation.canGoForward" helpKeyword="WinJS.Navigation.canGoForward">
        /// Determines whether it is possible to navigate forwards.
        /// </field>
        canGoForward: {
            get: function () {
                return history.forwardStack.length > 0;
            }
        },
        /// <field name="canGoBack" type="Boolean" locid="WinJS.Navigation.canGoBack" helpKeyword="WinJS.Navigation.canGoBack">
        /// Determines whether it is possible to navigate backwards.
        /// </field>
        canGoBack: {
            get: function () {
                return history.backStack.length > 0;
            }
        },
        /// <field name="location" locid="WinJS.Navigation.location" helpKeyword="WinJS.Navigation.location">
        /// Gets the current location.
        /// </field>
        location: {
            get: function () {
                return history.current.location;
            }
        },
        /// <field name="state" locid="WinJS.Navigation.state" helpKeyword="WinJS.Navigation.state">
        /// Gets or sets the navigation state.
        /// </field>
        state: {
            get: function () {
                return history.current.state;
            },
            set: function (value) {
                history.current.state = value;
            }
        },
        /// <field name="history" locid="WinJS.Navigation.history" helpKeyword="WinJS.Navigation.history">
        /// Gets or sets the navigation history.
        /// </field>
        history: {
            get: function () {
                return history;
            },
            set: function (value) {
                var s = history = value;

                // ensure the require fields are present
                //
                s.backStack = s.backStack || [];
                s.forwardStack = s.forwardStack || [];
                s.current = s.current || { location: "", initialPlaceholder: true };
                s.current.location = s.current.location || "";
            }
        },
        forward: function (distance) {
            /// <signature helpKeyword="WinJS.Navigation.forward">
            /// <summary locid="WinJS.Navigation.forward">
            /// Navigates forwards.
            /// </summary>
            /// <param name="distance" type="Number" optional="true" locid="WinJS.Navigation.forward_p:distance">
            /// The number of entries to go forward.
            /// </param>
            /// <returns type="Promise" locid="WinJS.Navigation.forward_returnValue">
            /// A promise that is completed with a value that indicates whether or not
            /// the navigation was successful.
            /// </returns>
            /// </signature>
            distance = distance || 1;
            return go(distance, history.forwardStack, history.backStack, distance);
        },
        back: function (distance) {
            /// <signature helpKeyword="WinJS.Navigation.back">
            /// <summary locid="WinJS.Navigation.back">
            /// Navigates backwards.
            /// </summary>
            /// <param name="distance" type="Number" optional="true" locid="WinJS.Navigation.back_p:distance">
            /// The number of entries to go back into the history.
            /// </param>
            /// <returns type="Promise" locid="WinJS.Navigation.back_returnValue">
            /// A promise that is completed with a value that indicates whether or not
            /// the navigation was successful.
            /// </returns>
            /// </signature>
            distance = distance || 1;
            return go(distance, history.backStack, history.forwardStack, -distance);
        },
        navigate: function (location, initialState) {
            /// <signature helpKeyword="WinJS.Navigation.navigate">
            /// <summary locid="WinJS.Navigation.navigate">
            /// Navigates to a location.
            /// </summary>
            /// <param name="location" type="Object" locid="WinJS.Navigation.navigate_p:location">
            /// The location to navigate to. Generally the location is a string, but
            /// it may be anything.
            /// </param>
            /// <param name="initialState" type="Object" locid="WinJS.Navigation.navigate_p:initialState">
            /// The navigation state that may be accessed through WinJS.Navigation.state.
            /// </param>
            /// <returns type="Promise" locid="WinJS.Navigation.navigate_returnValue">
            /// A promise that is completed with a value that indicates whether or not
            /// the navigation was successful.
            /// </returns>
            /// </signature>
            var proposed = { location: location, state: initialState };
            return raiseBeforeNavigate(proposed).
                then(function navBeforeCompleted(cancel) {
                    if (!cancel) {
                        if (!history.current.initialPlaceholder) {
                            history.backStack.push(history.current);
                        }
                        history.forwardStack = [];
                        history.current = proposed;

                        // error or no, we go from navigating -> navigated
                        // cancelation should be handled with "beforenavigate"
                        //
                        return raiseNavigating().then(
                            raiseNavigated,
                            function (err) {
                                raiseNavigated(undefined, err || true);
                                throw err;
                            }).then(function () { return true; });
                    }
                    else {
                        return false;
                    }
                });
        },
        addEventListener: function (eventType, listener, capture) {
            /// <signature helpKeyword="WinJS.Navigation.addEventListener">
            /// <summary locid="WinJS.Navigation.addEventListener">
            /// Adds an event listener to the control.
            /// </summary>
            /// <param name="eventType" type="String" locid="WinJS.Navigation.addEventListener_p:eventType">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" type="Function" locid="WinJS.Navigation.addEventListener_p:listener">
            /// The listener to invoke when the event gets raised.
            /// </param>
            /// <param name="capture" type="Boolean" locid="WinJS.Navigation.addEventListener_p:capture">
            /// Specifies whether or not to initiate capture.
            /// </param>
            /// </signature>
            listeners.addEventListener(eventType, listener, capture);
        },
        removeEventListener: function (eventType, listener, capture) {
            /// <signature helpKeyword="WinJS.Navigation.removeEventListener">
            /// <summary locid="WinJS.Navigation.removeEventListener">
            /// Removes an event listener from the control.
            /// </summary>
            /// <param name='eventType' type="String" locid="WinJS.Navigation.removeEventListener_p:eventType">
            /// The type (name) of the event.
            /// </param>
            /// <param name='listener' type='Function' locid="WinJS.Navigation.removeEventListener_p:listener">
            /// The listener to remove.
            /// </param>
            /// <param name='capture' type='Boolean' locid="WinJS.Navigation.removeEventListener_p:capture">
            /// Specifies whether or not to initiate capture.
            /// </param>
            /// </signature>
            listeners.removeEventListener(eventType, listener, capture);
        }
    });

    Object.defineProperties(WinJS.Navigation, WinJS.Utilities.createEventProperties(navigatedEventName, navigatingEventName, beforenavigateEventName));
})(WinJS);

(function stateInit(global) {
    "use strict";

    function initWithWinRT() {
        var local, temp, roaming;

        var IOHelper = WinJS.Class.define(
        function IOHelper_ctor(folder) {
            this.folder = folder;
            this._path = folder.path;
        }, {
            exists: function (fileName) {
                /// <signature helpKeyword="WinJS.Application.IOHelper.exists">
                /// <summary locid="WinJS.Application.IOHelper.exists">
                /// Determines if the specified file exists in the container
                /// </summary>
                /// <param name="fileName" type="String" locid="WinJS.Application.IOHelper.exists_p:fileName">
                /// The file which may exist within this folder
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Application.IOHelper.exists_returnValue">
                /// Promise with either true (file exists) or false.
                /// </returns>
                /// </signature>
                return this.folder.getFileAsync(fileName).
                        then(
                            function () { return true; },
                            function () { return false; }
                        );
            },
            remove: function (fileName) {
                /// <signature helpKeyword="WinJS.Application.IOHelper.remove">
                /// <summary locid="WinJS.Application.IOHelper.remove">
                /// Delets a file in the container
                /// </summary>
                /// <param name="fileName" type="String" locid="WinJS.Application.IOHelper.remove_p:fileName">
                /// The file to be deleted
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Application.IOHelper.remove_returnValue">
                /// Promise which is fulfilled when the file has been deleted
                /// </returns>
                /// </signature>
                var that = this;
                return that.folder.getFileAsync(fileName).
                    then(
                        function (fileItem) {
                            return fileItem.deleteAsync();
                        },
                        function () { return false; }
                    );
            },
            writeText: function (fileName, str) {
                /// <signature helpKeyword="WinJS.Application.IOHelper.writeText">
                /// <summary locid="WinJS.Application.IOHelper.writeText">
                /// Writes a file to the container with the specified text
                /// </summary>
                /// <param name="fileName" type="String" locid="WinJS.Application.IOHelper.writeText_p:fileName">
                /// The file to write to
                /// </param>
                /// <param name="str" type="String" locid="WinJS.Application.IOHelper.writeText_p:str">
                /// Content to be written to the file
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Application.IOHelper.writeText_returnValue">
                /// Promise with the count of characters written
                /// </returns>
                /// </signature>
                var sto = Windows.Storage;
                var that = this;
                return that.folder.createFileAsync(fileName, sto.CreationCollisionOption.openIfExists).
                    then(function (fileItem) {
                        if (sto.FileIO) {
                            return sto.FileIO.writeTextAsync(fileItem, str);
                        }
                        else {
                            return sto.StorageHelpers.writeAllTextUsingFileAsync(fileItem, str);
                        }
                    });
            },
            readText: function (fileName, def) {
                /// <signature helpKeyword="WinJS.Application.IOHelper.readText">
                /// <summary locid="WinJS.Application.IOHelper.readText">
                /// Reads the contents of a file from the container, if the file
                /// doesn't exist, def is returned.
                /// </summary>
                /// <param name="fileName" type="String" locid="WinJS.Application.IOHelper.readText_p:fileName">
                /// The file to read from
                /// </param>
                /// <param name="def" type="String" locid="WinJS.Application.IOHelper.readText_p:def">
                /// Default value to be returned if the file failed to open
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Application.IOHelper.readText_returnValue">
                /// Promise containing the contents of the file, or def.
                /// </returns>
                /// </signature>
                var sto = Windows.Storage;
                var that = this;
                function onerror() { return def; }
                return that.folder.getFileAsync(fileName).
                    then(function (fileItem) {
                        if (sto.FileIO) {
                            return sto.FileIO.readTextAsync(fileItem);
                        }
                        else {
                            return sto.StorageHelpers.readAllTextUsingFileAsync(fileItem);
                        }
                    }, onerror);
            }
        }, {
            supportedForProcessing: false,
        });

        WinJS.Namespace.define("WinJS.Application", {
            /// <field type="Object" helpKeyword="WinJS.Application.local" locid="WinJS.Application.local">
            /// Allows access to create files in the application local storage, which is preserved across runs
            /// of an application and does not roam.
            /// </field>
            local: {
                get: function () {
                    if (!local) {
                        local = new IOHelper(Windows.Storage.ApplicationData.current.localFolder);
                    }
                    return local;
                }
            },
            /// <field type="Object" helpKeyword="WinJS.Application.temp" locid="WinJS.Application.temp">
            /// Allows access to create files in the application temp storage, which may be reclaimed
            /// by the system between application runs.
            /// </field>
            temp: {
                get: function () {
                    if (!temp) {
                        temp = new IOHelper(Windows.Storage.ApplicationData.current.temporaryFolder);
                    }
                    return temp;
                }
            },
            /// <field type="Object" helpKeyword="WinJS.Application.roaming" locid="WinJS.Application.roaming">
            /// Allows access to create files in the application roaming storage, which is preserved across runs
            /// of an application and roams with the user across multiple machines.
            /// </field>
            roaming: {
                get: function () {
                    if (!roaming) {
                        roaming = new IOHelper(Windows.Storage.ApplicationData.current.roamingFolder);
                    }
                    return roaming;
                }
            }
        });
    };

    function initWithStub() {
        var InMemoryHelper = WinJS.Class.define(
            function InMemoryHelper_ctor() {
                this.storage = {};
            }, {
                exists: function (fileName) {
                    /// <signature helpKeyword="WinJS.Application.InMemoryHelper.exists">
                    /// <summary locid="WinJS.Application.InMemoryHelper.exists">
                    /// Determines if the specified file exists in the container
                    /// </summary>
                    /// <param name="fileName" type="String" locid="WinJS.Application.InMemoryHelper.exists_p:fileName">
                    /// The filename which may exist within this folder
                    /// </param>
                    /// <returns type="WinJS.Promise" locid="WinJS.Application.InMemoryHelper.exists_returnValue">
                    /// Promise with either true (file exists) or false.
                    /// </returns>
                    /// </signature>
                    // force conversion to boolean
                    //
                    return WinJS.Promise.as(this.storage[fileName] !== undefined);
                },
                remove: function (fileName) {
                    /// <signature helpKeyword="WinJS.Application.InMemoryHelper.remove">
                    /// <summary locid="WinJS.Application.InMemoryHelper.remove">
                    /// Deletes a file in the container
                    /// </summary>
                    /// <param name="fileName" type="String" locid="WinJS.Application.InMemoryHelper.remove_p:fileName">
                    /// The file to be deleted
                    /// </param>
                    /// <returns type="WinJS.Promise" locid="WinJS.Application.InMemoryHelper.remove_returnValue">
                    /// Promise which is fulfilled when the file has been deleted
                    /// </returns>
                    /// </signature>
                    delete this.storage[fileName];
                    return WinJS.Promise.as();
                },
                writeText: function (fileName, str) {
                    /// <signature helpKeyword="WinJS.Application.InMemoryHelper.writeText">
                    /// <summary locid="WinJS.Application.InMemoryHelper.writeText">
                    /// Writes a file to the container with the specified text
                    /// </summary>
                    /// <param name="fileName" type="String" locid="WinJS.Application.InMemoryHelper.writeText_p:fileName">
                    /// The filename to write to
                    /// </param>
                    /// <param name="str" type="String" locid="WinJS.Application.InMemoryHelper.writeText_p:str">
                    /// Content to be written to the file
                    /// </param>
                    /// <returns type="WinJS.Promise" locid="WinJS.Application.InMemoryHelper.writeText_returnValue">
                    /// Promise with the count of characters written
                    /// </returns>
                    /// </signature>
                    this.storage[fileName] = str;
                    return WinJS.Promise.as(str.length);
                },
                readText: function (fileName, def) {
                    /// <signature helpKeyword="WinJS.Application.InMemoryHelper.readText">
                    /// <summary locid="WinJS.Application.InMemoryHelper.readText">
                    /// Reads the contents of a file from the container, if the file
                    /// doesn't exist, def is returned.
                    /// </summary>
                    /// <param name="fileName" type="String" locid="WinJS.Application.InMemoryHelper.readText_p:fileName">
                    /// The filename to read from
                    /// </param>
                    /// <param name="def" type="String" locid="WinJS.Application.InMemoryHelper.readText_p:def">
                    /// Default value to be returned if the file failed to open
                    /// </param>
                    /// <returns type="WinJS.Promise" locid="WinJS.Application.InMemoryHelper.readText_returnValue">
                    /// Promise containing the contents of the file, or def.
                    /// </returns>
                    /// </signature>
                    var result = this.storage[fileName];
                    return WinJS.Promise.as(typeof result === "string" ? result : def);
                }
            }, {
                supportedForProcessing: false,
            }
        );

        WinJS.Namespace.define("WinJS.Application", {
            /// <field type="Object" helpKeyword="WinJS.Application.local" locid="WinJS.Application.local">
            /// Allows access to create files in the application local storage, which is preserved across runs
            /// of an application and does not roam.
            /// </field>
            local: new InMemoryHelper(),
            /// <field type="Object" helpKeyword="WinJS.Application.temp" locid="WinJS.Application.temp">
            /// Allows access to create files in the application temp storage, which may be reclaimed
            /// by the system between application runs.
            /// </field>
            temp: new InMemoryHelper(),
            /// <field type="Object" helpKeyword="WinJS.Application.roaming" locid="WinJS.Application.roaming">
            /// Allows access to create files in the application roaming storage, which is preserved across runs
            /// of an application and roams with the user across multiple machines.
            /// </field>
            roaming: new InMemoryHelper()
        });
    }

    if (WinJS.Utilities.hasWinRT) {
        initWithWinRT();
    }
    else {
        initWithStub();
    }

    WinJS.Namespace.define("WinJS.Application", {
        sessionState: {},
        _loadState: function (e) {
            var app = WinJS.Application;

            // we only restore state if we are coming back from a clear termination from PLM
            //
            if (e.previousExecutionState === 3 /* ApplicationExecutionState.Terminated */) {
                return app.local.readText("_sessionState.json", "{}").
                    then(function (str) {
                        var sessionState = JSON.parse(str);
                        if (sessionState && Object.keys(sessionState).length > 0) {
                            app._sessionStateLoaded = true;
                        }
                        app.sessionState = sessionState;
                    }).
                    then(null, function (err) {
                        app.queueEvent({ type: "error", detail: err });
                    });
            }
            else {
                return WinJS.Promise.as();
            }
        },
        _oncheckpoint: function (e) {
            var app = WinJS.Application;
            var sessionState = app.sessionState;
            if ((sessionState && Object.keys(sessionState).length > 0) || app._sessionStateLoaded) {
                e.setPromise(
                    app.local.writeText("_sessionState.json", JSON.stringify(sessionState)).
                        then(null, function (err) {
                            app.queueEvent({ type: "error", detail: err });
                        })
                );
            }
        }
    });
})(this);

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

(function dataInit(WinJS, undefined) {
    "use strict";


    var strings = {
        get exceptionFromBindingInitializer() { return WinJS.Resources._getWinJSString("base/exceptionFromBindingInitializer").value; },
        get propertyIsUndefined() { return WinJS.Resources._getWinJSString("base/propertyIsUndefined").value; },
        get unsupportedDataTypeForBinding() { return WinJS.Resources._getWinJSString("base/unsupportedDataTypeForBinding").value; },
    };

    var observableMixin = {
        _listeners: null,
        _pendingNotifications: null,
        _notifyId: 0,

        _getObservable: function () {
            return this;
        },

        _cancel: function (name) {
            var v = this._pendingNotifications;
            var hit = false;
            if (v) {
                var k = Object.keys(v);
                for (var i = k.length - 1; i >= 0; i--) {
                    var entry = v[k[i]];
                    if (entry.target === name) {
                        if (entry.promise) {
                            entry.promise.cancel();
                            entry.promise = null;
                        }
                        delete v[k[i]];
                        hit = true;
                    }
                }
            }
            return hit;
        },

        notify: function (name, newValue, oldValue) {
            /// <signature helpKeyword="WinJS.Binding.observableMixin.notify">
            /// <summary locid="WinJS.Binding.observableMixin.notify">
            /// Notifies listeners that a property value was updated.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.observableMixin.notify_p:name">The name of the property that is being updated.</param>
            /// <param name="newValue" type="Object" locid="WinJS.Binding.observableMixin.notify_p:newValue">The new value for the property.</param>
            /// <param name="oldValue" type="Object" locid="WinJS.Binding.observableMixin.notify_p:oldValue">The old value for the property.</param>
            /// <returns type="WinJS.Promise" locid="WinJS.Binding.observableMixin.notify_returnValue">A promise that is completed when the notifications are complete.</returns>
            /// </signature>
            var listeners = this._listeners && this._listeners[name];
            if (listeners) {
                var that = this;

                // Handle the case where we are updating a value that is currently updating
                //
                that._cancel(name);

                // Starting new work, we cache the work description and queue up to do the notifications
                //
                that._pendingNotifications = that._pendingNotifications || {};
                var x = that._notifyId++;
                var cap = that._pendingNotifications[x] = { target: name };

                var cleanup = function () {
                    delete that._pendingNotifications[x];
                }

                // Binding guarantees async notification, so we do timeout()
                //
                cap.promise = WinJS.Promise.timeout().
                    then(function () {
                        // cap.promise is removed after canceled, so we use this as a signal
                        // to indicate that we should abort early
                        //
                        for (var i = 0, l = listeners.length; i < l && cap.promise; i++) {
                            try {
                                listeners[i](newValue, oldValue);
                            }
                            catch (e) {
                                WinJS.log && WinJS.log(WinJS.Resources._formatString(strings.exceptionFromBindingInitializer, e.toString()), "winjs binding", "error");
                            }
                        }
                    }).
                    then(cleanup).
                    then(function () { return newValue; });

                return cap.promise;
            }

            return WinJS.Promise.as();
        },

        bind: function (name, action) {
            /// <signature helpKeyword="WinJS.Binding.observableMixin.bind">
            /// <summary locid="WinJS.Binding.observableMixin.bind">
            /// Links the specified action to the property specified in the name parameter.
            /// This function is invoked when the value of the property may have changed.
            /// It is not guaranteed that the action will be called only when a value has actually changed,
            /// nor is it guaranteed that the action will be called for every value change. The implementation
            /// of this function coalesces change notifications, such that multiple updates to a property
            /// value may result in only a single call to the specified action.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.observableMixin.bind_p:name">
            /// The name of the property to which to bind the action.
            /// </param>
            /// <param name="action" type="function" locid="WinJS.Binding.observableMixin.bind_p:action">
            /// The function to invoke asynchronously when the property may have changed.
            /// </param>
            /// <returns type="Object" locid="WinJS.Binding.observableMixin.bind_returnValue">
            /// This object is returned.
            /// </returns>
            /// </signature>

            this._listeners = this._listeners || {};
            var listeners = this._listeners[name] = this._listeners[name] || [];

            // duplicate detection, multiple binds with the same action should have no effect
            //
            var found = false;
            for (var i = 0, l = listeners.length; i < l; i++) {
                if (listeners[i] === action) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                listeners.push(action);

                // out of band notification, we want to avoid a broadcast to all listeners
                // so we can't just call notify.
                //
                action(unwrap(this[name]));
            }
            return this;
        },

        unbind: function (name, action) {
            /// <signature helpKeyword="WinJS.Binding.observableMixin.unbind">
            /// <summary locid="WinJS.Binding.observableMixin.unbind">
            /// Removes one or more listeners from the notification list for a given property.
            /// </summary>
            /// <param name="name" type="String" optional="true" locid="WinJS.Binding.observableMixin.unbind_p:name">
            /// The name of the property to unbind. If this parameter is omitted, all listeners
            /// for all events are removed.
            /// </param>
            /// <param name="action" type="function" optional="true" locid="WinJS.Binding.observableMixin.unbind_p:action">
            /// The function to remove from the listener list for the specified property. If this parameter is omitted, all listeners
            /// are removed for the specific property.
            /// </param>
            /// <returns type="Object" locid="WinJS.Binding.observableMixin.unbind_returnValue">
            /// This object is returned.
            /// </returns>
            /// </signature>

            this._listeners = this._listeners || {};

            if (name && action) {
                // this assumes we rarely have more than one
                // listener, so we optimize to not do a lot of
                // array manipulation, although it means we
                // may do some extra GC churn in the other cases...
                //
                var listeners = this._listeners[name];
                if (listeners) {
                    var nl;
                    for (var i = 0, l = listeners.length; i < l; i++) {
                        if (listeners[i] !== action) {
                            (nl = nl || []).push(listeners[i]);
                        }
                    }
                    this._listeners[name] = nl;
                }

                // we allow any pending notification sweep to complete,
                // which means that "unbind" inside of a notification
                // will not prevent that notification from occuring.
                //
            }
            else if (name) {
                this._cancel(name);
                delete this._listeners[name];
            }
            else {
                var that = this;
                if (that._pendingNotifications) {
                    var v = that._pendingNotifications;
                    that._pendingNotifications = {};
                    Object.keys(v).forEach(function (k) {
                        var n = v[k];
                        if (n.promise) { n.promise.cancel(); }
                    });
                }
                this._listeners = {};
            }
            return this;
        }
    };

    var dynamicObservableMixin = {
        _backingData: null,

        _initObservable: function (data) {
            this._backingData = data || {};
        },

        getProperty: function (name) {
            /// <signature helpKeyword="WinJS.Binding.dynamicObservableMixin.getProperty">
            /// <summary locid="WinJS.Binding.dynamicObservableMixin.getProperty">
            /// Gets a property value by name.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.dynamicObservableMixin.getProperty_p:name">
            /// The name of property to get.
            /// </param>
            /// <returns type="Object" locid="WinJS.Binding.dynamicObservableMixin.getProperty_returnValue">
            /// The value of the property as an observable object.
            /// </returns>
            /// </signature>
            var data = this._backingData[name];
            if (WinJS.log && data === undefined) {
                WinJS.log(WinJS.Resources._formatString(strings.propertyIsUndefined, name), "winjs binding", "warn");
            }
            return as(data);
        },

        setProperty: function (name, value) {
            /// <signature helpKeyword="WinJS.Binding.dynamicObservableMixin.setProperty">
            /// <summary locid="WinJS.Binding.dynamicObservableMixin.setProperty">
            /// Updates a property value and notifies any listeners.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.dynamicObservableMixin.setProperty_p:name">
            /// The name of the property to update.
            /// </param>
            /// <param name="value" locid="WinJS.Binding.dynamicObservableMixin.setProperty_p:value">
            /// The new value of the property.
            /// </param>
            /// <returns type="Object" locid="WinJS.Binding.dynamicObservableMixin.setProperty_returnValue">
            /// This object is returned.
            /// </returns>
            /// </signature>

            this.updateProperty(name, value);
            return this;
        },

        addProperty: function (name, value) {
            /// <signature helpKeyword="WinJS.Binding.dynamicObservableMixin.addProperty">
            /// <summary locid="WinJS.Binding.dynamicObservableMixin.addProperty">
            /// Adds a property with change notification to this object, including a ECMAScript5 property definition.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.dynamicObservableMixin.addProperty_p:name">
            /// The name of the property to add.
            /// </param>
            /// <param name="value" locid="WinJS.Binding.dynamicObservableMixin.addProperty_p:value">
            /// The value of the property.
            /// </param>
            /// <returns type="Object" locid="WinJS.Binding.dynamicObservableMixin.addProperty_returnValue">
            /// This object is returned.
            /// </returns>
            /// </signature>

            // we could walk Object.keys to more deterministically determine this,
            // however in the normal case this avoids a bunch of string compares
            //
            if (!this[name]) {
                Object.defineProperty(this,
                    name, {
                        get: function () { return this.getProperty(name); },
                        set: function (value) { this.setProperty(name, value); },
                        enumerable: true,
                        configurable: true
                    }
                );
            }
            return this.setProperty(name, value);
        },

        updateProperty: function (name, value) {
            /// <signature helpKeyword="WinJS.Binding.dynamicObservableMixin.updateProperty">
            /// <summary locid="WinJS.Binding.dynamicObservableMixin.updateProperty">
            /// Updates a property value and notifies any listeners.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.dynamicObservableMixin.updateProperty_p:name">
            /// The name of the property to update.
            /// </param>
            /// <param name="value" locid="WinJS.Binding.dynamicObservableMixin.updateProperty_p:value">
            /// The new value of the property.
            /// </param>
            /// <returns type="WinJS.Promise" locid="WinJS.Binding.dynamicObservableMixin.updateProperty_returnValue">
            /// A promise that completes when the notifications for
            /// this property change have been processed. If multiple notifications are coalesced,
            /// the promise may be canceled or the value of the promise may be updated.
            /// The fulfilled value of the promise is the new value of the property for
            /// which the notifications have been completed.
            /// </returns>
            /// </signature>

            var oldValue = this._backingData[name];
            var newValue = unwrap(value);
            if (oldValue !== newValue) {
                this._backingData[name] = newValue;

                // This will complete when the listeners are notified, even
                // if a new value is used. The only time this promise will fail
                // (cancel) will be if we start notifying and then have to
                // cancel in the middle of processing it. That's a pretty
                // subtle contract.
                //
                return this.notify(name, newValue, oldValue);
            }
            return WinJS.Promise.as();
        },

        removeProperty: function (name) {
            /// <signature helpKeyword="WinJS.Binding.dynamicObservableMixin.removeProperty">
            /// <summary locid="WinJS.Binding.dynamicObservableMixin.removeProperty">
            /// Removes a property value.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.Binding.dynamicObservableMixin.removeProperty_p:name">
            /// The name of the property to remove.
            /// </param>
            /// <returns type="Object" locid="WinJS.Binding.dynamicObservableMixin.removeProperty_returnValue">
            /// This object is returned.
            /// </returns>
            /// </signature>

            var oldValue = this._backingData[name];
            var value; // capture "undefined"
            // in strict mode these may throw
            try {
                delete this._backingData[name];
            } catch (e) { }
            try {
                delete this[name];
            } catch (e) { }
            this.notify(name, value, oldValue);
            return this;
        }
    };

    // Merge "obsevable" into "dynamicObservable"
    //
    Object.keys(observableMixin).forEach(function (k) {
        dynamicObservableMixin[k] = observableMixin[k];
    });


    var bind = function (observable, bindingDescriptor) {
        /// <signature helpKeyword="WinJS.Binding.bind">
        /// <summary locid="WinJS.Binding.bind">
        /// Binds to one or more properties on the observable object or or on child values
        /// of that object.
        /// </summary>
        /// <param name="observable" type="Object" locid="WinJS.Binding.bind_p:observable">
        /// The object to bind to.
        /// </param>
        /// <param name="bindingDescriptor" type="Object" locid="WinJS.Binding.bind_p:bindingDescriptor">
        /// An object literal containing the binding declarations. Binding declarations take the form:
        /// { propertyName: (function | bindingDeclaration), ... }
        /// 
        /// For example, binding to a nested member of an object is declared like this:
        /// bind(someObject, { address: { street: function(v) { ... } } });
        /// </param>
        /// <returns type="Object" locid="WinJS.Binding.bind_returnValue">
        /// An object that contains at least a "cancel" field, which is
        /// a function that removes all bindings associated with this bind
        /// request.
        /// </returns>
        /// </signature>
        return bindImpl(observable, bindingDescriptor);
    }
    var bindRefId = 0;
    var createBindRefId = function () {
        return "bindHandler" + (bindRefId++);
    };
    var createProxy = function (func, bindStateRef) {
        if (!WinJS.Utilities.hasWinRT) {
            return func;
        }

        var id = createBindRefId();
        WinJS.Utilities._getWeakRefElement(bindStateRef)[id] = func;
        return function (n, o) {
            var bindState = WinJS.Utilities._getWeakRefElement(bindStateRef);
            if (bindState) {
                bindState[id](n, o);
            }
        };
    }
    var bindImpl = function (observable, bindingDescriptor, bindStateRef) {
        observable = WinJS.Binding.as(observable);
        if (!observable) {
            return { cancel: function () { }, empty: true };
        }

        var bindState;
        if (!bindStateRef) {
            bindStateRef = createBindRefId();
            bindState = {};
            WinJS.Utilities._createWeakRef(bindState, bindStateRef);
        }

        var complexLast = {};
        var simpleLast = null;

        function cancelSimple() {
            if (simpleLast) {
                simpleLast.forEach(function (e) {
                    e.source.unbind(e.prop, e.listener);
                });
            }
            simpleLast = null;
        }

        function cancelComplex(k) {
            if (complexLast[k]) {
                complexLast[k].complexBind.cancel();
                delete complexLast[k];
            }
        }

        Object.keys(bindingDescriptor).forEach(function (k) {
            var listener = bindingDescriptor[k];
            if (listener instanceof Function) {
                // Create a proxy for the listener which indirects weakly through the bind
                // state, if this is the root object tack the bind state onto the listener
                //
                listener = createProxy(listener, bindStateRef);
                listener.bindState = bindState;
                simpleLast = simpleLast || [];
                simpleLast.push({ source: observable, prop: k, listener: listener });
                observable.bind(k, listener);
            }
            else {
                var propChanged = function (v) {
                    cancelComplex(k);
                    var complexBind = bindImpl(as(v), listener, bindStateRef);

                    // In the case that we hit an "undefined" in the chain, we prop the change
                    // notification to all listeners, basically saying that x.y.z where "y"
                    // is undefined resolves to undefined.
                    //
                    if (complexBind.empty) {
                        var recursiveNotify = function (root) {
                            Object.keys(root).forEach(function (key) {
                                var item = root[key];
                                if (item instanceof Function) {
                                    item(undefined, undefined);
                                }
                                else {
                                    recursiveNotify(item);
                                }
                            });
                        };
                        recursiveNotify(listener);
                    }
                    complexLast[k] = { source: v, complexBind: complexBind };
                };

                // Create a proxy for the listener which indirects weakly through the bind
                // state, if this is the root object tack the bind state onto the listener
                //
                propChanged = createProxy(propChanged, bindStateRef);
                propChanged.bindState = bindState;
                simpleLast = simpleLast || [];
                simpleLast.push({ source: observable, prop: k, listener: propChanged });
                observable.bind(k, propChanged);
            }
        });

        return {
            cancel: function () {
                cancelSimple();
                Object.keys(complexLast).forEach(function (k) { cancelComplex(k); });
            }
        }
    };


    var ObservableProxy = WinJS.Class.mix(function (data) {
        this._initObservable(data);
        Object.defineProperties(this, expandProperties(data));
    }, dynamicObservableMixin);

    var expandProperties = function (shape) {
        /// <signature helpKeyword="WinJS.Binding.expandProperties">
        /// <summary locid="WinJS.Binding.expandProperties">
        /// Wraps the specified object so that all its properties
        /// are instrumented for binding. This is meant to be used in
        /// conjunction with the binding mixin.
        /// </summary>
        /// <param name="shape" type="Object" locid="WinJS.Binding.expandProperties_p:shape">
        /// The specification for the bindable object.
        /// </param>
        /// <returns type="Object" locid="WinJS.Binding.expandProperties_returnValue">
        /// An object with a set of properties all of which are wired for binding.
        /// </returns>
        /// </signature>
        var props = {};
        function addToProps(k) {
            props[k] = {
                get: function () { return this.getProperty(k); },
                set: function (value) { this.setProperty(k, value); },
                enumerable: true,
                configurable: true // enables delete
            };
        }
        while (shape && shape !== Object.prototype) {
            Object.keys(shape).forEach(addToProps);
            shape = Object.getPrototypeOf(shape);
        }
        return props;
    };

    var define = function (data) {
        /// <signature helpKeyword="WinJS.Binding.define">
        /// <summary locid="WinJS.Binding.define">
        /// Creates a new constructor function that supports observability with
        /// the specified set of properties.
        /// </summary>
        /// <param name="data" type="Object" locid="WinJS.Binding.define_p:data">
        /// The object to use as the pattern for defining the set of properties, for example:
        /// var MyPointClass = define({x:0,y:0});
        /// </param>
        /// <returns type="Function" locid="WinJS.Binding.define_returnValue">
        /// A constructor function with 1 optional argument that is the initial state of
        /// the properties.
        /// </returns>
        /// </signature>

        // Common unsupported types, we just coerce to be an empty record
        //
        if (!data || typeof (data) !== "object" || (data instanceof Date) || (data instanceof Array)) {
            if (WinJS.validation) {
                throw new WinJS.ErrorFromName("WinJS.Binding.UnsupportedDataType", WinJS.Resources._formatString(strings.unsupportedDataTypeForBinding));
            }
            else {
                return;
            }
        }

        return WinJS.Class.mix(
            function (init) {
                /// <signature helpKeyword="WinJS.Binding.define.return">
                /// <summary locid="WinJS.Binding.define.return">
                /// Creates a new observable object.
                /// </summary>
                /// <param name="init" type="Object" locid="WinJS.Binding.define.return_p:init">
                /// The initial values for the properties.
                /// </param>
                /// </signature>

                this._initObservable(init || Object.create(data));
            },
            WinJS.Binding.dynamicObservableMixin,
            WinJS.Binding.expandProperties(data)
        );
    };

    var as = function (data) {
        /// <signature helpKeyword="WinJS.Binding.as">
        /// <summary locid="WinJS.Binding.as">
        /// Returns an observable object. This may be an observable proxy for the specified object, an existing proxy, or
        /// the specified object itself if it directly supports observability.
        /// </summary>
        /// <param name="data" type="Object" locid="WinJS.Binding.as_p:data">
        /// Object to provide observability for.
        /// </param>
        /// <returns type="Object" locid="WinJS.Binding.as_returnValue">
        /// The observable object.
        /// </returns>
        /// </signature>

        if (!data) {
            return data;
        }

        var type = typeof data;
        if (type === "object"
            && !(data instanceof Date)
            && !(data instanceof Array)) {
            if (data._getObservable) {
                return data._getObservable();
            }

            var observable = new ObservableProxy(data);
            observable.backingData = data;
            Object.defineProperty(
            data,
            "_getObservable",
            {
                value: function () { return observable; },
                enumerable: false,
                writable: false
            }
        );
            return observable;
        }
        else {
            return data;
        }
    };

    var unwrap = function (data) {
        /// <signature helpKeyword="WinJS.Binding.unwrap">
        /// <summary locid="WinJS.Binding.unwrap">
        /// Returns the original (non-observable) object is returned if the specified object is an observable proxy, .
        /// </summary>
        /// <param name="data" type="Object" locid="WinJS.Binding.unwrap_p:data">
        /// The object for which to retrieve the original value.
        /// </param>
        /// <returns type="Object" locid="WinJS.Binding.unwrap_returnValue">
        /// If the specified object is an observable proxy, the original object is returned, otherwise the same object is returned.
        /// </returns>
        /// </signature>
        if (data && data.backingData)
            return data.backingData;
        else
            return data;
    };

    WinJS.Namespace.define("WinJS.Binding", {
        // must use long form because mixin has "get" and "set" as members, so the define
        // method thinks it's a property
        mixin: { value: dynamicObservableMixin, enumerable: false, writable: true, configurable: true },
        dynamicObservableMixin: { value: dynamicObservableMixin, enumerable: true, writable: true, configurable: true },
        observableMixin: { value: observableMixin, enumerable: true, writable: true, configurable: true },
        expandProperties: expandProperties,
        define: define,
        as: as,
        unwrap: unwrap,
        bind: bind
    });
})(WinJS);

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

(function DOMWeakRefTableInit(global, undefined) {
    "use strict";

    var U = WinJS.Utilities;

    // Defaults 
    var SWEEP_PERIOD = 500;
    var TIMEOUT = 1000;
    var table = {};
    var cleanupToken;

    function cleanup() {
        if (U._DOMWeakRefTable_sweepPeriod === 0) {     // If we're using post
            cleanupToken = 0;                           // indicate that cleanup has run
        }
        var keys = Object.keys(table);
        var time = Date.now() - U._DOMWeakRefTable_timeout;
        var i, len;
        for (i = 0, len = keys.length; i < len; i++) {
            var id = keys[i];
            if (table[id].time < time) {
                delete table[id];
            }
        }
        unscheduleCleanupIfNeeded();
    }

    function scheduleCleanupIfNeeded() {
        if ((Debug.debuggerEnabled && U._DOMWeakRefTable_noTimeoutUnderDebugger) || cleanupToken) {
            return;
        }
        var period = U._DOMWeakRefTable_sweepPeriod;
        if (period === 0) {
            setImmediate(cleanup);
            cleanupToken = 1;
        } else {
            cleanupToken = setInterval(cleanup, U._DOMWeakRefTable_sweepPeriod);
        }
    }

    function unscheduleCleanupIfNeeded() {
        if (Debug.debuggerEnabled && U._DOMWeakRefTable_noTimeoutUnderDebugger) {
            return;
        }
        var period = U._DOMWeakRefTable_sweepPeriod;
        if (period === 0) {                             // if we're using post
            if (!cleanupToken) {                        // and there isn't already one scheduled
                if (Object.keys(table).length !== 0) {  // and there are items in the table
                    setImmediate(cleanup);           // schedule another call to cleanup
                    cleanupToken = 1;                   // and protect against overscheduling
                }
            }
        } else if (cleanupToken) {
            if (Object.keys(table).length === 0) {
                clearInterval(cleanupToken);
                cleanupToken = 0;
            }
        }
    }

    function createWeakRef(element, id) {
        table[id] = { element: element, time: Date.now() };
        scheduleCleanupIfNeeded();
        return id;
    }

    function getWeakRefElement(id) {
        if (WinJS.Utilities._DOMWeakRefTable_fastLoadPath) {
            var entry = table[id];
            if (entry) {
                return entry.element;
            }
            else {
                return document.getElementById(id);
            }
        }
        else {
            var element = document.getElementById(id);
            if (element) {
                delete table[id];
                unscheduleCleanupIfNeeded();
            } else {
                var entry = table[id];
                if (entry) {
                    entry.time = Date.now();
                    element = entry.element;
                }
            }
            return element;
        }
    }

    WinJS.Namespace.define("WinJS.Utilities", {
        _DOMWeakRefTable_noTimeoutUnderDebugger: true,
        _DOMWeakRefTable_sweepPeriod: SWEEP_PERIOD,
        _DOMWeakRefTable_timeout: TIMEOUT,
        _DOMWeakRefTable_tableSize: { get: function () { return Object.keys(table).length; } },
        _DOMWeakRefTable_fastLoadPath: false,
        _createWeakRef: createWeakRef,
        _getWeakRefElement: getWeakRefElement

    });

    if (WinJS.Utilities.hasWinRT && global.msSetWeakWinRTProperty && global.msGetWeakWinRTProperty) {

        var host = new Windows.Foundation.Uri("about://blank");

        WinJS.Namespace.define("WinJS.Utilities", {

            _createWeakRef: function (element, id) {
                msSetWeakWinRTProperty(host, id, element);
                return id;
            },

            _getWeakRefElement: function (id) {
                return msGetWeakWinRTProperty(host, id);
            }

        });

    }

}(this));

// WinJS.Binding.List
//
(function listInit(global, undefined) {
    "use strict";

    var strings = {
        get sparseArrayNotSupported() { return WinJS.Resources._getWinJSString("base/sparseArrayNotSupported").value; },
        get illegalListLength() { return WinJS.Resources._getWinJSString("base/illegalListLength").value; },
    };

    function copyargs(args) {
        return Array.prototype.slice.call(args, 0);
    }

    function cloneItem(item) {
        return {
            handle: item.handle,
            key: item.key,
            data: item.data,
            groupKey: item.groupKey,
            groupSize: item.groupSize,
            firstItemKey: item.firstItemKey,
            firstItemIndexHint: item.firstItemIndexHint
        };
    }

    function asNumber(n) {
        return n === undefined ? undefined : +n;
    }

    var createEvent = WinJS.Utilities._createEventProperty;

    var ListBase = WinJS.Class.define(
        null, {
            _annotateWithIndex: function (item, index) {
                var result = cloneItem(item);
                result.index = index;
                return result;
            },

            /// <field type="Function" locid="WinJS.Binding.ListBase.onitemchanged" helpKeyword="WinJS.Binding.ListBase.onitemchanged">
            /// The value identified by the specified key has been replaced with a different value.
            /// </field>
            onitemchanged: createEvent("itemchanged"),

            /// <field type="Function" locid="WinJS.Binding.ListBase.oniteminserted" helpKeyword="WinJS.Binding.ListBase.oniteminserted">
            /// A new value has been inserted into the list.
            /// </field>
            oniteminserted: createEvent("iteminserted"),

            /// <field type="Function" locid="WinJS.Binding.ListBase.onitemmoved" helpKeyword="WinJS.Binding.ListBase.onitemmoved">
            /// The value identified by the specified key has been moved from one index in the list to another index.
            /// </field>
            onitemmoved: createEvent("itemmoved"),

            /// <field type="Function" locid="WinJS.Binding.ListBase.onitemmutated" helpKeyword="WinJS.Binding.ListBase.onitemmutated">
            /// The value identified by the specified key has been mutated.
            /// </field>
            onitemmutated: createEvent("itemmutated"),

            /// <field type="Function" locid="WinJS.Binding.ListBase.onitemremoved" helpKeyword="WinJS.Binding.ListBase.onitemremoved">
            /// The value identified by the specified key has been removed from the list.
            /// </field>
            onitemremoved: createEvent("itemremoved"),

            /// <field type="Function" locid="WinJS.Binding.ListBase.onreload" helpKeyword="WinJS.Binding.ListBase.onreload">
            /// The list has been refreshed. Any references to items in the list may be incorrect.
            /// </field>
            onreload: createEvent("reload"),

            _notifyItemChanged: function (key, index, oldValue, newValue, oldItem, newItem) {
                if (this._listeners && this._listeners.itemchanged) {
                    this.dispatchEvent("itemchanged", { key: key, index: index, oldValue: oldValue, newValue: newValue, oldItem: oldItem, newItem: newItem });
                }
            },
            _notifyItemInserted: function (key, index, value) {
                if (this._listeners && this._listeners.iteminserted) {
                    this.dispatchEvent("iteminserted", { key: key, index: index, value: value });
                }
                var len = this.length;
                if (len !== this._lastNotifyLength) {
                    this.notify("length", len, this._lastNotifyLength);
                    this._lastNotifyLength = len;
                }
            },
            _notifyItemMoved: function (key, oldIndex, newIndex, value) {
                if (this._listeners && this._listeners.itemmoved) {
                    this.dispatchEvent("itemmoved", { key: key, oldIndex: oldIndex, newIndex: newIndex, value: value });
                }
            },
            _notifyItemMutated: function (key, value, item) {
                if (this._listeners && this._listeners.itemmutated) {
                    this.dispatchEvent("itemmutated", { key: key, value: value, item: item });
                }
            },
            _notifyItemRemoved: function (key, index, value, item) {
                if (this._listeners && this._listeners.itemremoved) {
                    this.dispatchEvent("itemremoved", { key: key, index: index, value: value, item: item });
                }
                var len = this.length;
                if (len !== this._lastNotifyLength) {
                    this.notify("length", len, this._lastNotifyLength);
                    this._lastNotifyLength = len;
                }
            },
            _notifyReload: function () {
                if (this._listeners && this._listeners.reload) {
                    this.dispatchEvent("reload");
                }
                if (len !== this._lastNotifyLength) {
                    var len = this.length;
                    this.notify("length", len, this._lastNotifyLength);
                    this._lastNotifyLength = len;
                }
            },

            _normalizeIndex: function (index) {
                index = asNumber(index);
                return index < 0 ? this.length + index : index;
            },

            // ABSTRACT: length

            // Notifications:
            //
            // ABSTRACT: notifyMutated: function (index)
            _notifyMutatedFromKey: function (key) {
                var item = this.getItemFromKey(key);
                this._notifyItemMutated(key, item.data, item);
            },
            notifyReload: function () {
                /// <signature helpKeyword="WinJS.Binding.ListBase.notifyReload">
                /// <summary locid="WinJS.Binding.ListBase.notifyReload">
                /// Forces the list to send a reload notification to any listeners.
                /// </summary>
                /// </signature>
                this._notifyReload();
            },

            // NOTE: performance can be improved in a number of the projections by overriding getAt/_getArray/_getFromKey/_getKey
            //
            getAt: function (index) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.getAt">
                /// <summary locid="WinJS.Binding.ListBase.getAt">
                /// Gets the value at the specified index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.ListBase.getAt_p:index">The index of the value to get.</param>
                /// <returns type="Object" mayBeNull="true" locid="WinJS.Binding.ListBase.getAt_returnValue">The value at the specified index.</returns>
                /// </signature>
                index = asNumber(index);
                var item = this.getItem(index);
                return item && item.data;
            },
            // returns [ data* ]
            _getArray: function () {
                var results = new Array(this.length);
                for (var i = 0, len = this.length; i < len; i++) {
                    var item = this.getItem(i);
                    if (item) {
                        results[i] = item.data;
                    }
                }
                return results;
            },
            // returns data
            _getFromKey: function (key) {
                var item = this.getItemFromKey(key);
                return item && item.data;
            },
            // ABSTRACT: getItem(index)
            // ABSTRACT: getItemFromKey(key)
            // returns string
            _getKey: function (index) {
                index = asNumber(index);
                var item = this.getItem(index);
                return item && item.key;
            },

            // Normal list non-modifiying operations
            //
            concat: function (item) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.concat">
                /// <summary locid="WinJS.Binding.ListBase.concat">
                /// Returns a new list consisting of a combination of two arrays.
                /// </summary>
                /// <parameter name="item" type="Object" optional="true" parameterArray="true">Additional items to add to the end of the list.</parameter>
                /// <returns type="Array" locid="WinJS.Binding.ListBase.concat_returnValue">An array containing the concatenation of the list and any other supplied items.</returns>
                /// </signature>
                var a = this._getArray();
                return a.concat.apply(a, arguments);
            },
            join: function (separator) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.join">
                /// <summary locid="WinJS.Binding.ListBase.join">
                /// Returns a string consisting of all the elements of a list separated by the specified separator string.
                /// </summary>
                /// <param name="separator" type="String" optional="true" locid="WinJS.Binding.ListBase.join_p:separator">A string used to separate the elements of a list. If this parameter is omitted, the list elements are separated with a comma.</param>
                /// <returns type="String" locid="WinJS.Binding.ListBase.join_returnValue">The elements of a list separated by the specified separator string.</returns>
                /// </signature>
                return this._getArray().join(separator || ",");
            },
            slice: function (begin, end) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.slice">
                /// <summary locid="WinJS.Binding.ListBase.slice">
                /// Extracts a section of a list and returns a new list.
                /// </summary>
                /// <param name="begin" type="Number" integer="true" locid="WinJS.Binding.ListBase.slice_p:begin">The index that specifies the beginning of the section.</param>
                /// <param name="end" type="Number" integer="true" optional="true" locid="WinJS.Binding.ListBase.slice_p:end">The index that specifies the end of the section.</param>
                /// <returns type="Array" locid="WinJS.Binding.ListBase.slice_returnValue">Returns a section of an array.</returns>
                /// </signature>
                return this._getArray().slice(begin, end);
            },
            indexOf: function (searchElement, fromIndex) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.indexOf">
                /// <summary locid="WinJS.Binding.ListBase.indexOf">
                /// Gets the index of the first occurrence of the specified value in a list.
                /// </summary>
                /// <param name="searchElement" type="Object" locid="WinJS.Binding.ListBase.indexOf_p:searchElement">The value to locate in the list.</param>
                /// <param name="fromIndex" type="Number" integer="true" optional="true" locid="WinJS.Binding.ListBase.indexOf_p:fromIndex">The index at which to begin the search. If fromIndex is omitted, the search starts at index 0.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.ListBase.indexOf_returnValue">Index of the first occurrence of a value in a list or -1 if not found.</returns>
                /// </signature>
                fromIndex = asNumber(fromIndex);
                fromIndex = Math.max(0, this._normalizeIndex(fromIndex) || 0);
                for (var i = fromIndex, len = this.length; i < len; i++) {
                    var item = this.getItem(i);
                    if (item && item.data === searchElement) {
                        return i;
                    }
                }
                return -1;
            },
            // ABSTRACT: indexOfKey(key)
            lastIndexOf: function (searchElement, fromIndex) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.lastIndexOf">
                /// <summary locid="WinJS.Binding.ListBase.lastIndexOf">
                /// Gets the index of the last occurrence of the specified value in a list.
                /// </summary>
                /// <param name="searchElement" type="Object" locid="WinJS.Binding.ListBase.lastIndexOf_p:searchElement">The value to locate in the list.</param>
                /// <param name="fromIndex" type="Number" integer="true" optional="true" locid="WinJS.Binding.ListBase.lastIndexOf_p:fromIndex">The index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.ListBase.lastIndexOf_returnValue">The index of the last occurrence of a value in a list, or -1 if not found.</returns>
                /// </signature>
                fromIndex = asNumber(fromIndex);
                var length = this.length;
                fromIndex = Math.min(this._normalizeIndex(fromIndex !== undefined ? fromIndex : length), length - 1);
                var i;
                for (i = fromIndex; i >= 0; i--) {
                    var item = this.getItem(i);
                    if (item && item.data === searchElement) {
                        return i;
                    }
                }
                return -1;
            },

            //
            // Normal list projection operations
            //

            every: function (callback, thisArg) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.every">
                /// <summary locid="WinJS.Binding.ListBase.every">
                /// Checks whether the specified callback function returns true for all elements in a list.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.every_p:callback">A function that accepts up to three arguments. This function is called for each element in the list until it returns false or the end of the list is reached.</param>
                /// <param name="thisArg" type="Object" optional="true" locid="WinJS.Binding.ListBase.every_p:thisArg">An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used.</param>
                /// <returns type="Boolean" locid="WinJS.Binding.ListBase.every_returnValue">True if the callback returns true for all elements in the list.</returns>
                /// </signature>
                return this._getArray().every(callback, thisArg);
            },
            filter: function (callback, thisArg) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.filter">
                /// <summary locid="WinJS.Binding.ListBase.filter">
                /// Returns the elements of a list that meet the condition specified in a callback function.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.filter_p:callback">A function that accepts up to three arguments. The function is called for each element in the list.</param>
                /// <param name="thisArg" type="Object" optional="true" locid="WinJS.Binding.ListBase.filter_p:thisArg">An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used.</param>
                /// <returns type="Array" locid="WinJS.Binding.ListBase.filter_returnValue">An array containing the elements that meet the condition specified in the callback function.</returns>
                /// </signature>
                return this._getArray().filter(callback, thisArg);
            },
            forEach: function (callback, thisArg) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.forEach">
                /// <summary locid="WinJS.Binding.ListBase.forEach">
                /// Calls the specified callback function for each element in a list.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.forEach_p:callback">A function that accepts up to three arguments. The function is called for each element in the list.</param>
                /// <param name="thisArg" type="Object" optional="true" locid="WinJS.Binding.ListBase.forEach_p:thisArg">An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used.</param>
                /// </signature>
                this._getArray().forEach(callback, thisArg);
            },
            map: function (callback, thisArg) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.map">
                /// <summary locid="WinJS.Binding.ListBase.map">
                /// Calls the specified callback function on each element of a list, and returns an array that contains the results.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.map_p:callback">A function that accepts up to three arguments. The function is called for each element in the list.</param>
                /// <param name="thisArg" type="Object" optional="true" locid="WinJS.Binding.ListBase.map_p:thisArg">An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used.</param>
                /// <returns type="Array" locid="WinJS.Binding.ListBase.map_returnValue">An array containing the result of calling the callback function on each element in the list.</returns>
                /// </signature>
                return this._getArray().map(callback, thisArg);
            },
            some: function (callback, thisArg) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.some">
                /// <summary locid="WinJS.Binding.ListBase.some">
                /// Checks whether the specified callback function returns true for any element of a list.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.some_p:callback">A function that accepts up to three arguments. The function is called for each element in the list until it returns true, or until the end of the list.</param>
                /// <param name="thisArg" type="Object" optional="true" locid="WinJS.Binding.ListBase.some_p:thisArg">An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used.</param>
                /// <returns type="Boolean" locid="WinJS.Binding.ListBase.some_returnValue">True if callback returns true for any element in the list.</returns>
                /// </signature>
                return this._getArray().some(callback, thisArg);
            },
            reduce: function (callback, initialValue) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.reduce">
                /// <summary locid="WinJS.Binding.ListBase.reduce">
                /// Accumulates a single result by calling the specified callback function for all elements in a list. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.reduce_p:callback">A function that accepts up to four arguments. The function is called for each element in the list.</param>
                /// <param name="initialValue" type="Object" optional="true" locid="WinJS.Binding.ListBase.reduce_p:initialValue">If initialValue is specified, it is used as the value with which to start the accumulation. The first call to the function provides this value as an argument instead of a list value.</param>
                /// <returns type="Object" locid="WinJS.Binding.ListBase.reduce_returnValue">The return value from the last call to the callback function.</returns>
                /// </signature>
                if (arguments.length > 1) {
                    return this._getArray().reduce(callback, initialValue);
                }
                return this._getArray().reduce(callback);
            },
            reduceRight: function (callback, initialValue) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.reduceRight">
                /// <summary locid="WinJS.Binding.ListBase.reduceRight">
                /// Accumulates a single result by calling the specified callback function for all elements in a list, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
                /// </summary>
                /// <param name="callback" type="Function" locid="WinJS.Binding.ListBase.reduceRight_p:callback">A function that accepts up to four arguments. The function is called for each element in the list.</param>
                /// <param name="initialValue" type="Object" optional="true" locid="WinJS.Binding.ListBase.reduceRight_p:initialValue">If initialValue is specified, it is used as the value with which to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a list value.</param>
                /// <returns type="Object" locid="WinJS.Binding.ListBase.reduceRight_returnValue">The return value from last call to callback function.</returns>
                /// </signature>
                if (arguments.length > 1) {
                    return this._getArray().reduceRight(callback, initialValue);
                }
                return this._getArray().reduceRight(callback);
            },

            //
            // Live Projections - if you want the lifetime of the returned projections to
            //  be shorter than that of the list object on which they are based you have
            //  to remember to call .dispose() on them when done.
            //

            createFiltered: function (predicate) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.createFiltered">
                /// <summary locid="WinJS.Binding.ListBase.createFiltered">
                /// Creates a live filtered projection over this list. As the list changes, the filtered projection reacts to those changes and may also change.
                /// </summary>
                /// <param name="predicate" type="Function" locid="WinJS.Binding.ListBase.createFiltered_p:predicate">A function that accepts a single argument. The createFiltered function calls the callback with each element in the list. If the function returns true, that element will be included in the filtered list.</param>
                /// <returns type="WinJS.Binding.List" locid="WinJS.Binding.ListBase.createFiltered_returnValue">Filtered projection over the list.</returns>
                /// </signature>
                return new FilteredListProjection(this, predicate);
            },
            createGrouped: function (groupKey, groupData, groupSorter) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.createGrouped">
                /// <summary locid="WinJS.Binding.ListBase.createGrouped">
                /// Creates a live grouped projection over this list. As the list changes, the grouped projection reacts to those changes and may also change. The grouped projection sorts all the elements of the list to be in group-contiguous order. The grouped projection also contains a .groups property which is a WinJS.Binding.List representing the groups that were found in the list.
                /// </summary>
                /// <param name="groupKey" type="Function" locid="WinJS.Binding.ListBase.createGrouped_p:groupKey">A function that accepts a single argument. The function is called with each element in the list, the function should return a string representing the group containing the element.</param>
                /// <param name="groupData" type="Function" locid="WinJS.Binding.ListBase.createGrouped_p:groupData">A function that accepts a single argument. The function is called on an element in the list for each group. It should return the value that should be set as the data of the .groups list element for this group.</param>
                /// <param name="groupSorter" type="Function" optional="true" locid="WinJS.Binding.ListBase.createGrouped_p:groupSorter">A function that accepts two arguments. The function is called with the key of groups found in the list. It must return one of the following numeric values: negative if the first argument is less than the second, zero if the two arguments are equivalent, positive if the first argument is greater than the second. If omitted, the groups are sorted in ascending, ASCII character order.</param>
                /// <returns type="WinJS.Binding.List" locid="WinJS.Binding.ListBase.createGrouped_returnValue">A grouped projection over the list.</returns>
                /// </signature>
                return new GroupedSortedListProjection(this, groupKey, groupData, groupSorter);
            },
            createSorted: function (sorter) {
                /// <signature helpKeyword="WinJS.Binding.ListBase.createSorted">
                /// <summary locid="WinJS.Binding.ListBase.createSorted">
                /// Creates a live sorted projection over this list. As the list changes, the sorted projection reacts to those changes and may also change.
                /// </summary>
                /// <param name="sorter" type="Function" locid="WinJS.Binding.ListBase.createSorted_p:sorter">A function that accepts two arguments. The function is called with elements in the list. It must return one of the following numeric values: negative if the first argument is less than the second, zero if the two arguments are equivalent, positive if the first argument is greater than the second.</param>
                /// <returns type="WinJS.Binding.List" locid="WinJS.Binding.ListBase.createSorted_returnValue">A sorted projection over the list.</returns>
                /// </signature>
                return new SortedListProjection(this, sorter);
            }
        }, {
            supportedForProcessing: false,
        }
    );

    WinJS.Class.mix(ListBase, WinJS.Binding.observableMixin);
    WinJS.Class.mix(ListBase, WinJS.Utilities.eventMixin);

    var ListBaseWithMutators = WinJS.Class.derive(ListBase,
        null, {
            // ABSTRACT: setAt(index, value)

            // Normal list modifying operations
            //
            // returns data from tail of list
            pop: function () {
                /// <signature helpKeyword="WinJS.Binding.ListBaseWithMutators.pop">
                /// <summary locid="WinJS.Binding.ListBaseWithMutators.pop">
                /// Removes the last element from a list and returns it.
                /// </summary>
                /// <returns type="Object" locid="WinJS.Binding.ListBaseWithMutators.pop_returnValue">Last element from the list.</returns>
                /// </signature>
                return this.splice(-1, 1)[0];
            },
            push: function (value) {
                /// <signature helpKeyword="WinJS.Binding.ListBaseWithMutators.push">
                /// <summary locid="WinJS.Binding.ListBaseWithMutators.push">
                /// Appends new element(s) to a list, and returns the new length of the list.
                /// </summary>
                /// <param name="value" type="Object" parameterArray="true" locid="WinJS.Binding.ListBaseWithMutators.push_p:value">The element to insert at the end of the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.ListBaseWithMutators.push_returnValue">The new length of the list.</returns>
                /// </signature>
                if (arguments.length === 1) {
                    this.splice(this.length, 0, value);
                    return this.length;
                } else {
                    var args = copyargs(arguments);
                    args.splice(0, 0, this.length, 0);
                    this.splice.apply(this, args);
                    return this.length;
                }
            },
            // returns data from head of list
            shift: function () {
                /// <signature helpKeyword="WinJS.Binding.ListBaseWithMutators.shift">
                /// <summary locid="WinJS.Binding.ListBaseWithMutators.shift">
                /// Removes the first element from a list and returns it.
                /// </summary>
                /// <returns type="Object" locid="WinJS.Binding.ListBaseWithMutators.shift_returnValue">First element from the list.</returns>
                /// </signature>
                return this.splice(0, 1)[0];
            },
            unshift: function (value) {
                /// <signature helpKeyword="WinJS.Binding.ListBaseWithMutators.unshift">
                /// <summary locid="WinJS.Binding.ListBaseWithMutators.unshift">
                /// Appends new element(s) to a list, and returns the new length of the list.
                /// </summary>
                /// <param name="value" type="Object" parameterArray="true" locid="WinJS.Binding.ListBaseWithMutators.unshift_p:value">The element to insert at the start of the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.ListBaseWithMutators.unshift_returnValue">The new length of the list.</returns>
                /// </signature>
                if (arguments.length === 1) {
                    this.splice(0, 0, value);
                } else {
                    var args = copyargs(arguments);
                    // Wow, this looks weird. Insert 0, 0 at the beginning of splice.
                    args.splice(0, 0, 0, 0);
                    this.splice.apply(this, args);
                }
                return this.length;
            }

            // ABSTRACT: splice(index, howMany, values...)
            // ABSTRACT: _spliceFromKey(key, howMany, values...)
        }, {
            supportedForProcessing: false,
        }
    );

    var emptyOptions = {};

    var List = WinJS.Class.derive(ListBaseWithMutators,
        function (list, options) {
            /// <signature helpKeyword="WinJS.Binding.List.List">
            /// <summary locid="WinJS.Binding.List.constructor">
            /// Creates a WinJS.Binding.List object.
            /// </summary>
            /// <param name="list" type="Array" optional="true" locid="WinJS.Binding.List.constructor_p:list">The array containing the elements to initalize the list.</param>
            /// <param name="options" type="Object" optional="true" locid="WinJS.Binding.List.constructor_p:options">If options.binding is true, the list will contain the result of calling WinJS.Binding.as() on the element values. If options.proxy is true, the list specified as the first parameter is used as the storage for the WinJS.Binding.List. This option should be used with care because uncoordinated edits to the data storage will result in errors.</param>
            /// <returns type="WinJS.Binding.List" locid="WinJS.Binding.List.constructor_returnValue">The newly-constructed WinJS.Binding.List instance.</returns>
            /// </signature>

            this._currentKey = 0;
            this._keys = null;
            this._keyMap = {};

            // options:
            //  - binding: binding.as on items
            //  - proxy: proxy over input data
            //
            options = options || emptyOptions;
            this._proxy = options.proxy;
            this._binding = options.binding;
            if (this._proxy) {
                if (Object.keys(list).length !== list.length) {
                    throw new WinJS.ErrorFromName("WinJS.Binding.List.NotSupported", strings.sparseArrayNotSupported);
                }
                this._data = list;
                this._currentKey = list.length;
            } else if (list) {
                var keyDataMap = this._keyMap;
                var pos = 0, i = 0;
                for (var len = list.length; i < len; i++) {
                    if (i in list) {
                        var item = list[i];
                        if (this._binding) {
                            item = WinJS.Binding.as(item);
                        }
                        var key = pos.toString();
                        pos++;
                        keyDataMap[key] = { handle: key, key: key, data: item };
                    }
                }
                if (pos !== i) {
                    this._initializeKeys();
                }
                this._currentKey = pos;
            }
        }, {
            _currentKey: 0,

            _keys: null,
            _keyMap: null,

            _modifyingData: 0,

            _initializeKeys: function () {
                if (this._keys) {
                    return;
                }

                var keys = [];
                if (this._data) {
                    // If this list is a proxy over the data then we will have been lazily initializing
                    // the entries in the list, however the 1:1 mapping between index and key is about
                    // to go away so this is our last chance to pull the items out of the data.
                    //
                    var keyMap = this._keyMap;
                    var data = this._data;
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (i in data) {
                            var key = i.toString();
                            keys[i] = key;
                            if (!(key in keyMap)) {
                                var item = data[i];
                                if (this._binding) {
                                    item = WinJS.Binding.as(item);
                                }
                                keyMap[key] = { handle: key, key: key, data: item };
                            }
                        }
                    }
                } else {
                    // In the case where List owns the data we will have created the keyMap at initialization
                    // time and can use that to harvest all the keys into the _keys list.
                    //
                    Object.keys(this._keyMap).forEach(function (key) {
                        keys[key >>> 0] = key;
                    });
                }
                this._keys = keys;
            },
            _lazyPopulateEntry: function (index) {
                if (this._data && index in this._data) {
                    var item = this._data[index];
                    if (this._binding) {
                        item = WinJS.Binding.as(item);
                    }
                    var key = index.toString();
                    var entry = { handle: key, key: key, data: item };
                    this._keyMap[entry.key] = entry;
                    return entry;
                }
            },

            _assignKey: function () {
                return (++this._currentKey).toString();
            },

            /// <field type="Number" integer="true" locid="WinJS.Binding.List.length" helpKeyword="WinJS.Binding.List.length">Gets or sets the length of the list, which is an integer value one higher than the highest element defined in the list.</field>
            length: {
                get: function () {
                    // If we are proxying use the underlying list's length
                    // If we have already allocated keys use that length
                    // If we haven't allocated keys then we can use _currentKey which was set at initialization time
                    //  to be length of the input list.
                    if (this._data) {
                        return this._data.length;
                    } else if (this._keys) {
                        return this._keys.length;
                    } else {
                        return this._currentKey;
                    }
                },
                set: function (value) {
                    if (typeof value === "number" && value >= 0) {
                        this._initializeKeys();
                        var current = this.length;
                        if (current > value) {
                            this.splice(value, current - value);
                        } else {
                            // We don't support setting lengths to longer in order to have sparse behavior
                            value = current;
                        }
                        if (this._data) {
                            this._modifyingData++;
                            try {
                                this._data.length = value;
                            } finally {
                                this._modifyingData--;
                            }
                        }
                        if (this._keys) {
                            this._keys.length = value;
                        }
                    } else {
                        throw new WinJS.ErrorFromName("WinJS.Binding.List.IllegalLength", strings.illegalListLength);
                    }
                }
            },

            getItem: function (index) {
                /// <signature helpKeyword="WinJS.Binding.List.getItem">
                /// <summary locid="WinJS.Binding.List.getItem">
                /// Gets a key/data pair for the specified list index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.List.getItem_p:index">The index of value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.List.getItem_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                var entry;
                var key;
                index = asNumber(index);
                if (this._keys) {
                    key = this._keys[index];
                    entry = key && this._keyMap[key];
                } else {
                    key = index.toString();
                    entry = this._keyMap[key] || this._lazyPopulateEntry(index);
                }
                return entry;
            },
            getItemFromKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.List.getItemFromKey">
                /// <summary locid="WinJS.Binding.List.getItemFromKey">
                /// Gets a key/data pair for the list item key specified.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.List.getItemFromKey_p:key">The key of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.List.getItemFromKey_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                var entry;
                // if we have a keys list we know to go through the keyMap, or if we are not
                // proxying through _data we also know to go through the keyMap.
                if (this._keys || !this._data) {
                    entry = this._keyMap[key];
                } else {
                    entry = this.getItem(key >>> 0);
                }
                return entry;
            },

            indexOfKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.List.indexOfKey">
                /// <summary locid="WinJS.Binding.List.indexOfKey">
                /// Gets the index of the first occurrence of a key in a list.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.List.indexOfKey_p:key">The key to locate in the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.List.indexOfKey_returnValue">The index of the first occurrence of a key in a list, or -1 if not found.</returns>
                /// </signature>
                var index = -1;
                if (this._keys) {
                    index = this._keys.indexOf(key);
                } else {
                    var t = key >>> 0;
                    if (t < this._currentKey) {
                        index = t;
                    }
                }
                return index;
            },

            move: function (index, newIndex) {
                /// <signature helpKeyword="WinJS.Binding.List.move">
                /// <summary locid="WinJS.Binding.List.move">
                /// Moves the value at index to the specified position.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.List.move_p:index">The original index of the value.</param>
                /// <param name="newIndex" type="Number" integer="true" locid="WinJS.Binding.List.move_p:newIndex">The index of the value after the move.</param>
                /// </signature>
                index = asNumber(index);
                newIndex = asNumber(newIndex);
                this._initializeKeys();
                if (index === newIndex || index < 0 || newIndex < 0 || index >= this.length || newIndex >= this.length) {
                    return;
                }
                if (this._data) {
                    this._modifyingData++;
                    try {
                        var item = this._data.splice(index, 1)[0];
                        this._data.splice(newIndex, 0, item);
                    } finally {
                        this._modifyingData--;
                    }
                }
                var key = this._keys.splice(index, 1)[0];
                this._keys.splice(newIndex, 0, key);
                this._notifyItemMoved(key, index, newIndex, this.getItemFromKey(key).data);
            },

            notifyMutated: function (index) {
                /// <signature helpKeyword="WinJS.Binding.List.notifyMutated">
                /// <summary locid="WinJS.Binding.List.notifyMutated">
                /// Forces the list to send a itemmutated notification to any listeners for the value at the specified index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.List.notifyMutated_p:index">The index of the value that was mutated.</param>
                /// </signature>
                index = asNumber(index);
                var key = this._keys ? this._keys[index] : index.toString();
                this._notifyMutatedFromKey(key);
            },

            setAt: function (index, newValue) {
                /// <signature helpKeyword="WinJS.Binding.List.setAt">
                /// <summary locid="WinJS.Binding.List.setAt">
                /// Replaces the value at the specified index with a new value.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.List.setAt_p:index">The index of the value that was replaced.</param>
                /// <param name="newValue" type="Object" locid="WinJS.Binding.List.setAt_p:newValue">The new value.</param>
                /// </signature>
                index = asNumber(index);
                this._initializeKeys();
                var length = this.length;
                if (index === length) {
                    this.push(newValue);
                } else if (index < length) {
                    if (this._data) {
                        this._modifyingData++;
                        try {
                            this._data[index] = newValue;
                        } finally {
                            this._modifyingData--;
                        }
                    }
                    if (this._binding) {
                        newValue = WinJS.Binding.as(newValue);
                    }
                    if (index in this._keys) {
                        var key = this._keys[index];
                        var oldEntry = this._keyMap[key];
                        var newEntry = cloneItem(oldEntry);
                        newEntry.data = newValue;
                        this._keyMap[key] = newEntry;
                        this._notifyItemChanged(key, index, oldEntry.data, newValue, oldEntry, newEntry);
                    }
                }
            },

            _setAtKey: function (key, newValue) {
                this.setAt(this.indexOfKey(key), newValue);
            },

            // These are the traditional Array mutators, they don't result in projections. In particular
            //  having both sort and sorted is a bit confusing. It may be the case that we want to eliminate
            //  the various array helpers outside of the standard push/pop,shift/unshift,splice,get*,setAt
            //  and then offer up the specific projections: filter, sorted, grouped. Anything else can be
            //  obtained through _getArray().
            //
            reverse: function () {
                /// <signature helpKeyword="WinJS.Binding.List.reverse">
                /// <summary locid="WinJS.Binding.List.reverse">
                /// Returns a list with the elements reversed. This method reverses the elements of a list object in place. It does not create a new list object during execution.
                /// </summary>
                /// <returns type="WinJS.Binding.List" locid="WinJS.Binding.List.reverse_returnValue">The reversed list.</returns>
                /// </signature>
                this._initializeKeys();
                if (this._data) {
                    this._modifyingData++;
                    try {
                        this._data.reverse();
                    } finally {
                        this._modifyingData--;
                    }
                }
                this._keys.reverse();
                this._notifyReload();
                return this;
            },
            sort: function (sortFunction) {
                /// <signature helpKeyword="WinJS.Binding.List.sort">
                /// <summary locid="WinJS.Binding.List.sort">
                /// Returns a list with the elements sorted. This method sorts the elements of a list object in place. It does not create a new list object during execution.
                /// </summary>
                /// <param name="sortFunction" type="Function" locid="WinJS.Binding.List.sort_p:sortFunction">The function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.</param>
                /// <returns type="WinJS.Binding.List" locid="WinJS.Binding.List.sort_returnValue">The sorted list.</returns>
                /// </signature>
                this._initializeKeys();
                if (this._data) {
                    this._modifyingData++;
                    try {
                        this._data.sort(sortFunction);
                    } finally {
                        this._modifyingData--;
                    }
                }
                var that = this;
                this._keys.sort(function (l, r) {
                    l = that._keyMap[l];
                    r = that._keyMap[r];
                    if (sortFunction) {
                        return sortFunction(l.data, r.data);
                    }
                    l = (l && l.data || "").toString();
                    r = (l && r.data || "").toString();
                    return l < r ? -1 : l === r ? 0 : 1;
                });
                this._notifyReload();
            },

            pop: function () {
                /// <signature helpKeyword="WinJS.Binding.List.pop">
                /// <summary locid="WinJS.Binding.List.pop">
                /// Removes the last element from a list and returns it.
                /// </summary>
                /// <returns type="Object" locid="WinJS.Binding.List.pop_returnValue">Last element from the list.</returns>
                /// </signature>
                if (this.length === 0) {
                    return;
                }
                this._initializeKeys();
                var key = this._keys.pop();
                var entry = this._keyMap[key];
                var data = entry && entry.data;
                if (this._data) {
                    this._modifyingData++;
                    try {
                        this._data.pop();
                    } finally {
                        this._modifyingData--;
                    }
                }
                delete this._keyMap[key];
                this._notifyItemRemoved(key, this._keys.length, data, entry);
                return data;
            },

            push: function (value) {
                /// <signature helpKeyword="WinJS.Binding.List.push">
                /// <summary locid="WinJS.Binding.List.push">
                /// Appends new element(s) to a list, and returns the new length of the list.
                /// </summary>
                /// <param name="value" type="Object" parameterArray="true" locid="WinJS.Binding.List.push_p:value">The element to insert at the end of the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.List.push_returnValue">The new length of the list.</returns>
                /// </signature>
                this._initializeKeys();
                var length = arguments.length;
                for (var i = 0; i < length; i++) {
                    var item = arguments[i];
                    if (this._binding) {
                        item = WinJS.Binding.as(item);
                    }
                    var key = this._assignKey();
                    this._keys.push(key);
                    if (this._data) {
                        this._modifyingData++;
                        try {
                            this._data.push(arguments[i])
                        } finally {
                            this._modifyingData--;
                        }
                    }
                    this._keyMap[key] = { handle: key, key: key, data: item };
                    this._notifyItemInserted(key, this._keys.length - 1, item);
                }
                return this.length;
            },

            shift: function () {
                /// <signature helpKeyword="WinJS.Binding.List.shift">
                /// <summary locid="WinJS.Binding.List.shift">
                /// Removes the first element from a list and returns it.
                /// </summary>
                /// <returns type="Object" locid="WinJS.Binding.List.shift_returnValue">First element from the list.</returns>
                /// </signature>
                if (this.length === 0) {
                    return;
                }

                this._initializeKeys();
                var key = this._keys.shift();
                var entry = this._keyMap[key];
                var data = entry && entry.data;
                if (this._data) {
                    this._modifyingData++;
                    try {
                        this._data.shift();
                    } finally {
                        this._modifyingData--;
                    }
                }
                delete this._keyMap[key];
                this._notifyItemRemoved(key, 0, data, entry);
                return data;
            },

            unshift: function (value) {
                /// <signature helpKeyword="WinJS.Binding.List.unshift">
                /// <summary locid="WinJS.Binding.List.unshift">
                /// Appends new element(s) to a list, and returns the new length of the list.
                /// </summary>
                /// <param name="value" type="Object" parameterArray="true" locid="WinJS.Binding.List.unshift_p:value">The element to insert at the start of the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.List.unshift_returnValue">The new length of the list.</returns>
                /// </signature>
                this._initializeKeys();
                var length = arguments.length;
                for (var i = length - 1; i >= 0; i--) {
                    var item = arguments[i];
                    if (this._binding) {
                        item = WinJS.Binding.as(item);
                    }
                    var key = this._assignKey();
                    this._keys.unshift(key);
                    if (this._data) {
                        this._modifyingData++;
                        try {
                            this._data.unshift(arguments[i])
                        } finally {
                            this._modifyingData--;
                        }
                    }
                    this._keyMap[key] = { handle: key, key: key, data: item };
                    this._notifyItemInserted(key, 0, item);
                }
                return this.length;
            },

            splice: function (index, howMany, item) {
                /// <signature helpKeyword="WinJS.Binding.List.splice">
                /// <summary locid="WinJS.Binding.List.splice">
                /// Removes elements from a list and, if necessary, inserts new elements in their place, returning the deleted elements.
                /// </summary>
                /// <param name="start" type="Number" integer="true" locid="WinJS.Binding.List.splice_p:start">The zero-based location in the list from which to start removing elements.</param>
                /// <param name="howMany" type="Number" integer="true" locid="WinJS.Binding.List.splice_p:howMany">The number of elements to remove.</param>
                /// <param name="item" type="Object" optional="true" parameterArray="true" locid="WinJS.Binding.List.splice_p:item">The elements to insert into the list in place of the deleted elements.</param>
                /// <returns type="Array" locid="WinJS.Binding.List.splice_returnValue">The deleted elements.</returns>
                /// </signature>
                index = asNumber(index);
                this._initializeKeys();
                index = Math.max(0, this._normalizeIndex(index));
                howMany = Math.max(0, Math.min(howMany || 0, this.length - index));
                var result = [];
                while (howMany) {
                    var key = this._keys[index];
                    var entry = this._keyMap[key];
                    var data = entry && entry.data;
                    result.push(data);
                    this._keys.splice(index, 1);
                    if (this._data) {
                        this._modifyingData++;
                        try {
                            this._data.splice(index, 1);
                        } finally {
                            this._modifyingData--;
                        }
                    }
                    delete this._keyMap[key];
                    this._notifyItemRemoved(key, index, data, entry);
                    --howMany;
                }
                if (arguments.length > 2) {
                    for (var i = 2, len = arguments.length; i < len; i++) {
                        var additionalItem = arguments[i];
                        if (this._binding) {
                            additionalItem = WinJS.Binding.as(additionalItem);
                        }
                        var pos = Math.min(index + i - 2, this.length);
                        var newKey = this._assignKey();
                        this._keys.splice(pos, 0, newKey);
                        if (this._data) {
                            this._modifyingData++;
                            try {
                                this._data.splice(pos, 0, arguments[i]);
                            } finally {
                                this._modifyingData--;
                            }
                        }
                        this._keyMap[newKey] = { handle: newKey, key: newKey, data: additionalItem };
                        this._notifyItemInserted(newKey, pos, additionalItem);
                    }
                }
                return result;
            },
            // returns [ data* ] of removed items
            _spliceFromKey: function (key, howMany) {
                this._initializeKeys();
                var args = copyargs(arguments);
                args[0] = this._keys.indexOf(key);
                return this.splice.apply(this, args);
            }
        }, {
            supportedForProcessing: false,
        }
    );

    var ListProjection = WinJS.Class.derive(ListBaseWithMutators,
        null, {
            _list: null,
            _myListeners: null,

            _addListListener: function (name, func) {
                var l = { name: name, handler: func.bind(this) };
                this._myListeners = this._myListeners || [];
                this._myListeners.push(l);
                this._list.addEventListener(name, l.handler);
            },

            // ABSTRACT: _listReload()

            dispose: function () {
                /// <signature helpKeyword="WinJS.Binding.ListProjection.dispose">
                /// <summary locid="WinJS.Binding.ListProjection.dispose">
                /// Disconnects this WinJS.Binding.List projection from its underlying WinJS.Binding.List. This is important only if they have different lifetimes.
                /// </summary>
                /// </signature>
                var list = this._list;

                var listeners = this._myListeners;
                this._myListeners = [];

                for (var i = 0, len = listeners.length; i < len; i++) {
                    var l = listeners[i];
                    list.removeEventListener(l.name, l.handler);
                }

                // Set this to an empty list and tell everyone that they need to reload to avoid
                //  consumers null-refing on an empty list.
                this._list = new WinJS.Binding.List();
                this._listReload();
            },

            getItemFromKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.ListProjection.getItemFromKey">
                /// <summary locid="WinJS.Binding.ListProjection.getItemFromKey">
                /// Gets a key/data pair for the specified key.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.ListProjection.getItemFromKey_p:key">The key of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.ListProjection.getItemFromKey_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                return this._list.getItemFromKey(key);
            },

            move: function (index, newIndex) {
                /// <signature helpKeyword="WinJS.Binding.ListProjection.move">
                /// <summary locid="WinJS.Binding.ListProjection.move">
                /// Moves the value at index to position newIndex.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.ListProjection.move_p:index">The original index of the value.</param>
                /// <param name="newIndex" type="Number" integer="true" locid="WinJS.Binding.ListProjection.move_p:newIndex">The index of the value after the move.</param>
                /// </signature>
                index = asNumber(index);
                newIndex = asNumber(newIndex);
                if (index === newIndex || index < 0 || newIndex < 0 || index >= this.length || newIndex >= this.length) {
                    return;
                }
                index = this._list.indexOfKey(this._getKey(index));
                newIndex = this._list.indexOfKey(this._getKey(newIndex));
                this._list.move(index, newIndex);
            },

            _notifyMutatedFromKey: function (key) {
                this._list._notifyMutatedFromKey(key);
            },

            splice: function (index, howMany, item) {
                /// <signature helpKeyword="WinJS.Binding.ListProjection.splice">
                /// <summary locid="WinJS.Binding.ListProjection.splice">
                /// Removes elements from a list and, if necessary, inserts new elements in their place, returning the deleted elements.
                /// </summary>
                /// <param name="start" type="Number" integer="true" locid="WinJS.Binding.ListProjection.splice_p:start">The zero-based location in the list from which to start removing elements.</param>
                /// <param name="howMany" type="Number" integer="true" locid="WinJS.Binding.ListProjection.splice_p:howMany">The number of elements to remove.</param>
                /// <param name="item" type="Object" optional="true" parameterArray="true" locid="WinJS.Binding.ListProjection.splice_p:item">The elements to insert into the list in place of the deleted elements.</param>
                /// <returns type="Array" locid="WinJS.Binding.ListProjection.splice_returnValue">The deleted elements.</returns>
                /// </signature>
                index = asNumber(index);
                index = Math.max(0, this._normalizeIndex(index));
                var args = copyargs(arguments);
                if (index === this.length) {
                    // In order to getAt the tail right we just push on to the end of the underlying list
                    args[0] = this._list.length;
                    return this._list.splice.apply(this._list, args);
                } else {
                    args[0] = this._getKey(index);
                    return this._spliceFromKey.apply(this, args);
                }
            },

            _setAtKey: function (key, value) {
                this._list._setAtKey(key, value);
            },

        }, {
            supportedForProcessing: false,
        }
    );

    var FilteredListProjection = WinJS.Class.derive(ListProjection,
        function (list, filter) {
            this._list = list;
            this._addListListener("itemchanged", this._listItemChanged);
            this._addListListener("iteminserted", this._listItemInserted);
            this._addListListener("itemmutated", this._listItemMutated);
            this._addListListener("itemmoved", this._listItemMoved);
            this._addListListener("itemremoved", this._listItemRemoved);
            this._addListListener("reload", this._listReload);
            this._filter = filter;
            this._initFilteredKeys();
        }, {
            _filter: null,
            _filteredKeys: null,
            _initFilteredKeys: function () {
                var filter = this._filter;
                var list = this._list;
                var keys = [];
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list.getItem(i);
                    if (item && filter(item.data)) {
                        keys.push(item.key);
                    }
                }
                this._filteredKeys = keys;
            },

            _findInsertionPosition: function (key, index) {
                // find the spot to insert this by identifing the previous element in the list
                var filter = this._filter;
                var previousKey;
                while ((--index) >= 0) {
                    var item = this._list.getItem(index);
                    if (item && filter(item.data)) {
                        previousKey = item.key;
                        break;
                    }
                }
                var filteredKeys = this._filteredKeys;
                var filteredIndex = previousKey ? (filteredKeys.indexOf(previousKey) + 1) : 0;
                return filteredIndex;
            },

            _listItemChanged: function (event) {
                var key = event.detail.key;
                var index = event.detail.index;
                var oldValue = event.detail.oldValue;
                var newValue = event.detail.newValue;
                var oldItem = event.detail.oldItem;
                var newItem = event.detail.newItem;
                var filter = this._filter;
                var oldInFilter = filter(oldValue);
                var newInFilter = filter(newValue);
                if (oldInFilter && newInFilter) {
                    var filteredKeys = this._filteredKeys;
                    var filteredIndex = filteredKeys.indexOf(key);
                    this._notifyItemChanged(key, filteredIndex, oldValue, newValue, oldItem, newItem);
                } else if (oldInFilter) {
                    this._listItemRemoved({ detail: { key: key, index: index, value: oldValue, item: oldItem } });
                } else if (newInFilter) {
                    this._listItemInserted({ detail: { key: key, index: index, value: newValue } });
                }
            },
            _listItemInserted: function (event) {
                var key = event.detail.key;
                var index = event.detail.index;
                var value = event.detail.value;
                var filter = this._filter;
                if (filter(value)) {
                    var filteredIndex = this._findInsertionPosition(key, index);
                    var filteredKeys = this._filteredKeys;
                    filteredKeys.splice(filteredIndex, 0, key);
                    this._notifyItemInserted(key, filteredIndex, value);
                }
            },
            _listItemMoved: function (event) {
                var key = event.detail.key;
                var newIndex = event.detail.newIndex;
                var value = event.detail.value;
                var filteredKeys = this._filteredKeys;
                var oldFilteredIndex = filteredKeys.indexOf(key);
                if (oldFilteredIndex !== -1) {
                    filteredKeys.splice(oldFilteredIndex, 1);
                    var newFilteredIndex = this._findInsertionPosition(key, newIndex);
                    filteredKeys.splice(newFilteredIndex, 0, key);
                    this._notifyItemMoved(key, oldFilteredIndex, newFilteredIndex, value);
                }
            },
            _listItemMutated: function (event) {
                var key = event.detail.key;
                var value = event.detail.value;
                var item = event.detail.item;
                var filter = this._filter;
                var filteredKeys = this._filteredKeys;
                var filteredIndex = filteredKeys.indexOf(key);
                if (filteredIndex !== -1) {
                    if (!filter(value)) {
                        filteredKeys.splice(filteredIndex, 1);
                        this._notifyItemRemoved(key, filteredIndex, value, item);
                        return;
                    }
                } else {
                    if (filter(value)) {
                        this._listItemInserted({ detail: { key: key, index: this._list.indexOfKey(key), value: value } });
                        return;
                    }
                }
                this._notifyItemMutated(key, value, item);
            },
            _listItemRemoved: function (event) {
                var key = event.detail.key;
                var value = event.detail.value;
                var item = event.detail.item;
                var filteredKeys = this._filteredKeys;
                var filteredIndex = filteredKeys.indexOf(key);
                if (filteredIndex !== -1) {
                    filteredKeys.splice(filteredIndex, 1);
                    this._notifyItemRemoved(key, filteredIndex, value, item);
                }
            },
            _listReload: function () {
                this._initFilteredKeys();
                this._notifyReload();
            },

            /// <field type="Number" integer="true" locid="WinJS.Binding.FilteredListProjection.length" helpKeyword="WinJS.Binding.FilteredListProjection.length">Returns an integer value one higher than the highest element defined in an list.</field>
            length: {
                get: function () { return this._filteredKeys.length; },
                set: function (value) {
                    if (typeof value === "number" && value >= 0) {
                        var current = this.length;
                        if (current > value) {
                            this.splice(value, current - value);
                        }
                    } else {
                        throw new WinJS.ErrorFromName("WinJS.Binding.List.IllegalLength", strings.illegalListLength);
                    }
                }
            },

            getItem: function (index) {
                /// <signature helpKeyword="WinJS.Binding.FilteredListProjection.getItem">
                /// <summary locid="WinJS.Binding.FilteredListProjection.getItem">
                /// Returns a key/data pair for the specified index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.FilteredListProjection.getItem_p:index">The index of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.FilteredListProjection.getItem_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                index = asNumber(index);
                return this.getItemFromKey(this._filteredKeys[index]);
            },

            indexOfKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.FilteredListProjection.indexOfKey">
                /// <summary locid="WinJS.Binding.FilteredListProjection.indexOfKey">
                /// Returns the index of the first occurrence of a key in a list.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.FilteredListProjection.indexOfKey_p:key">The key to locate in the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.FilteredListProjection.indexOfKey_returnValue">The index of the first occurrence of a key in a list, or -1 if not found.</returns>
                /// </signature>
                return this._filteredKeys.indexOf(key);
            },

            notifyMutated: function (index) {
                /// <signature helpKeyword="WinJS.Binding.FilteredListProjection.notifyMutated">
                /// <summary locid="WinJS.Binding.FilteredListProjection.notifyMutated">
                /// Forces the list to send a itemmutated notification to any listeners for the value at the specified index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.FilteredListProjection.notifyMutated_p:index">The index of the value that was mutated.</param>
                /// </signature>
                index = asNumber(index);
                return this._notifyMutatedFromKey(this._filteredKeys[index]);
            },

            setAt: function (index, value) {
                /// <signature helpKeyword="WinJS.Binding.FilteredListProjection.setAt">
                /// <summary locid="WinJS.Binding.FilteredListProjection.setAt">
                /// Replaces the value at the specified index with a new value.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.FilteredListProjection.setAt_p:index">The index of the value that was replaced.</param>
                /// <param name="newValue" type="Object" locid="WinJS.Binding.FilteredListProjection.setAt_p:newValue">The new value.</param>
                /// </signature>
                index = asNumber(index);
                this._setAtKey(this._filteredKeys[index], value);
            },

            // returns [ data* ] of removed items
            _spliceFromKey: function (key, howMany) {
                // first add in all the new items if we have any, this should serve to push key to the right
                if (arguments.length > 2) {
                    var args = copyargs(arguments);
                    args[1] = 0; // howMany
                    this._list._spliceFromKey.apply(this._list, args);
                }
                // now we can remove anything that needs to be removed, since they are not necessarially contiguous
                // in the underlying list we remove them one by one.
                var result = [];
                if (howMany) {
                    var keysToRemove = [];
                    var filteredKeys = this._filteredKeys;
                    var filteredKeyIndex = filteredKeys.indexOf(key);
                    for (var i = filteredKeyIndex, len = filteredKeys.length; i < len && (i - filteredKeyIndex) < howMany; i++) {
                        var key = filteredKeys[i];
                        keysToRemove.push(key);
                    }
                    var that = this;
                    keysToRemove.forEach(function (key) {
                        result.push(that._list._spliceFromKey(key, 1)[0]);
                    });
                }
                return result;
            }
        }, {
            supportedForProcessing: false,
        }
    );

    // We need a stable sort in order to implement SortedListProjection because we want to be able to
    // perform insertions in a predictable location s.t. if we were to apply another sorted projection
    // over the same list (now containing the inserted data) the resulting order would be the same.
    //
    function mergeSort(m, sorter) {
        var length = m.length;
        if (length <= 1) {
            return m;
        }
        var middle = (length / 2) >>> 0;
        var left = mergeSort(m.slice(0, middle), sorter);
        var right = mergeSort(m.slice(middle), sorter);
        return merge(left, right, sorter);
    }
    function merge(left, right, sorter) {
        var result = [];
        while (left.length && right.length) {
            var r = sorter(left[0], right[0]);
            if (r <= 0) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        if (left.length) {
            result.push.apply(result, left);
        }
        if (right.length) {
            result.push.apply(result, right);
        }
        return result;
    }

    var SortedListProjection = WinJS.Class.derive(ListProjection,
        function (list, sortFunction) {
            this._list = list;
            this._addListListener("itemchanged", this._listItemChanged);
            this._addListListener("iteminserted", this._listItemInserted);
            this._addListListener("itemmoved", this._listItemMoved);
            this._addListListener("itemmutated", this._listItemMutated);
            this._addListListener("itemremoved", this._listItemRemoved);
            this._addListListener("reload", this._listReload);
            this._sortFunction = sortFunction;
            this._initSortedKeys();
        }, {
            _sortFunction: null,
            _sortedKeys: null,
            _initSortedKeys: function () {
                var list = this._list;
                var keys = [];
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list.getItem(i);
                    if (item) {
                        keys[i] = item.key;
                    }
                }
                var sorter = this._sortFunction;
                var sorted = mergeSort(keys, function (l, r) {
                    l = list.getItemFromKey(l).data;
                    r = list.getItemFromKey(r).data;
                    return sorter(l, r);
                });
                this._sortedKeys = sorted;
            },

            _findInsertionPos: function (key, index, value, startingMin, startingMax) {
                var sorter = this._sortFunction;
                var sortedKeys = this._sortedKeys;
                var min = Math.max(0, startingMin || -1);
                var max = Math.min(sortedKeys.length, startingMax || Number.MAX_VALUE);
                var mid = min;
                while (min <= max) {
                    mid = ((min + max) / 2) >>> 0;
                    var sortedKey = sortedKeys[mid];
                    if (!sortedKey) {
                        break;
                    }
                    var sortedItem = this.getItemFromKey(sortedKey);
                    var r = sorter(sortedItem.data, value);
                    if (r < 0) {
                        min = mid + 1;
                    } else if (r === 0) {
                        return this._findStableInsertionPos(key, index, min, max, mid, value);
                    } else {
                        max = mid - 1;
                    }
                }
                return min;
            },
            _findBeginningOfGroup: function (mid, sorter, list, sortedKeys, value) {
                // we made it to the beginning of the list without finding something
                // that sorts equal to this value, insert this key at the beginning of
                // this section of keys.
                var min = 0;
                var max = mid;
                while (min <= max) {
                    mid = ((min + max) / 2) >>> 0;
                    var sortedKey = sortedKeys[mid];
                    var sortedItem = list.getItemFromKey(sortedKey);
                    var r = sorter(sortedItem.data, value);
                    if (r < 0) {
                        min = mid + 1;
                    } else {
                        max = mid - 1;
                    }
                }
                return min;
            },
            _findEndOfGroup: function (mid, sorter, list, sortedKeys, value) {
                // we made it ot the end of the list without finding something that sorts
                // equal to this value, insert this key at the end of this section of
                // keys.
                var min = mid;
                var max = sortedKeys.length;
                while (min <= max) {
                    mid = ((min + max) / 2) >>> 0;
                    var sortedKey = sortedKeys[mid];
                    if (!sortedKey) {
                        return sortedKeys.length;
                    }
                    var sortedItem = list.getItemFromKey(sortedKey);
                    var r = sorter(sortedItem.data, value);
                    if (r <= 0) {
                        min = mid + 1;
                    } else {
                        max = mid - 1;
                    }
                }
                return min;
            },
            _findStableInsertionPos: function (key, index, min, max, mid, value) {
                var list = this._list;
                var length = list.length;
                var sorter = this._sortFunction;
                var sortedKeys = this._sortedKeys;
                if (index < (length / 2)) {
                    for (var i = index - 1; i >= 0; i--) {
                        var item = list.getItem(i);
                        if (sorter(item.data, value) === 0) {
                            // we have found the next item to the left, insert this item to
                            // the right of that.
                            if ((length - min) > max) {
                                return sortedKeys.indexOf(item.key, min) + 1;
                            } else {
                                return sortedKeys.lastIndexOf(item.key, max) + 1;
                            }
                        }
                    }
                    return this._findBeginningOfGroup(mid, sorter, list, sortedKeys, value);
                } else {
                    for (var i = index + 1; i < length; i++) {
                        var item = list.getItem(i);
                        if (sorter(item.data, value) === 0) {
                            // we have found the next item to the right, insert this item
                            // to the left of that.
                            if ((length - min) > max) {
                                return sortedKeys.indexOf(item.key, min);
                            } else {
                                return sortedKeys.lastIndexOf(item.key, max);
                            }
                        }
                    }
                    return this._findEndOfGroup(mid, sorter, list, sortedKeys, value);
                }
            },

            _listItemChanged: function (event) {
                var key = event.detail.key;
                var newValue = event.detail.newValue;
                var oldValue = event.detail.oldValue;
                var sortFunction = this._sortFunction;
                if (sortFunction(oldValue, newValue) === 0) {
                    var sortedIndex = this.indexOfKey(key);
                    this._notifyItemChanged(key, sortedIndex, oldValue, newValue, event.detail.oldItem, event.detail.newItem);
                } else {
                    this._listItemRemoved({ detail: { key: key, index: event.detail.index, value: event.detail.oldValue, item: event.detail.oldItem } });
                    this._listItemInserted({ detail: { key: key, index: event.detail.index, value: event.detail.newValue } });
                }
            },
            _listItemInserted: function (event, knownMin, knownMax) {
                var key = event.detail.key;
                var index = event.detail.index;
                var value = event.detail.value;
                var sortedIndex = this._findInsertionPos(key, index, value, knownMin, knownMax);
                this._sortedKeys.splice(sortedIndex, 0, key);
                this._notifyItemInserted(key, sortedIndex, value);
            },
            _listItemMoved: function (event, knownMin, knownMax) {
                var key = event.detail.key;
                var newIndex = event.detail.newIndex;
                var value = event.detail.value;
                var sortedKeys = this._sortedKeys;
                var oldSortedIndex = sortedKeys.indexOf(key, knownMin);
                sortedKeys.splice(oldSortedIndex, 1);
                var newSortedIndex = this._findInsertionPos(key, newIndex, value, knownMin, knownMax);
                sortedKeys.splice(newSortedIndex, 0, key);
                if (newSortedIndex !== oldSortedIndex) {
                    // The move in the underlying list resulted in a move in the sorted list
                    //
                    this._notifyItemMoved(key, oldSortedIndex, newSortedIndex, value);
                } else {
                    // The move in the underlying list resulted in no change in the sorted list
                    //
                }
            },
            _listItemMutated: function (event) {
                var key = event.detail.key;
                var value = event.detail.value;
                var item = event.detail.item;
                var index = this._list.indexOfKey(key);
                var sortedIndex = this._sortedKeys.indexOf(key);
                this._sortedKeys.splice(sortedIndex, 1);
                var targetIndex = this._findInsertionPos(key, index, value);
                this._sortedKeys.splice(sortedIndex, 0, key);
                if (sortedIndex === targetIndex) {
                    this._notifyItemMutated(key, value, item);
                    return;
                }
                this._listItemRemoved({ detail: { key: key, index: index, value: value, item: item } });
                this._listItemInserted({ detail: { key: key, index: index, value: value } });
            },
            _listItemRemoved: function (event, knownMin) {
                var key = event.detail.key;
                var value = event.detail.value;
                var item = event.detail.item;
                var sortedKeys = this._sortedKeys;
                var sortedIndex = sortedKeys.indexOf(key, knownMin);
                sortedKeys.splice(sortedIndex, 1);
                this._notifyItemRemoved(key, sortedIndex, value, item);
            },
            _listReload: function () {
                this._initSortedKeys();
                this._notifyReload();
            },

            /// <field type="Number" integer="true" locid="WinJS.Binding.SortedListProjection.length" helpKeyword="WinJS.Binding.SortedListProjection.length">Gets or sets the length of the list. Returns an integer value one higher than the highest element defined in a list.</field>
            length: {
                get: function () { return this._sortedKeys.length; },
                set: function (value) {
                    if (typeof value === "number" && value >= 0) {
                        var current = this.length;
                        if (current > value) {
                            this.splice(value, current - value);
                        }
                    } else {
                        throw new WinJS.ErrorFromName("WinJS.Binding.List.IllegalLength", strings.illegalListLength);
                    }
                }
            },

            getItem: function (index) {
                /// <signature helpKeyword="WinJS.Binding.SortedListProjection.getItem">
                /// <summary locid="WinJS.Binding.SortedListProjection.getItem">
                /// Returns a key/data pair for the specified index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.SortedListProjection.getItem_p:index">The index of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.SortedListProjection.getItem_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                index = asNumber(index);
                return this.getItemFromKey(this._sortedKeys[index]);
            },

            indexOfKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.SortedListProjection.getItem">
                /// <summary locid="WinJS.Binding.SortedListProjection.getItem">
                /// Returns the index of the first occurrence of a key.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.SortedListProjection.indexOfKey_p:key">The key to locate in the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.SortedListProjection.indexOfKey_returnValue">The index of the first occurrence of a key in a list, or -1 if not found.</returns>
                /// </signature>
                return this._sortedKeys.indexOf(key);
            },

            notifyMutated: function (index) {
                /// <signature helpKeyword="WinJS.Binding.SortedListProjection.notifyMutated">
                /// <summary locid="WinJS.Binding.SortedListProjection.notifyMutated">
                /// Forces the list to send a itemmutated notification to any listeners for the value at the specified index.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.SortedListProjection.notifyMutated_p:index">The index of the value that was mutated.</param>
                /// </signature>
                index = asNumber(index);
                this._notifyMutatedFromKey(this._sortedKeys[index]);
            },

            setAt: function (index, value) {
                /// <signature helpKeyword="WinJS.Binding.SortedListProjection.setAt">
                /// <summary locid="WinJS.Binding.SortedListProjection.setAt">
                /// Replaces the value at the specified index with a new value.
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.SortedListProjection.setAt_p:index">The index of the value that was replaced.</param>
                /// <param name="newValue" type="Object" locid="WinJS.Binding.SortedListProjection.setAt_p:newValue">The new value.</param>
                /// </signature>
                index = asNumber(index);
                this._setAtKey(this._sortedKeys[index], value);
            },

            // returns [ data* ] of removed items
            _spliceFromKey: function (key, howMany) {
                // first add in all the new items if we have any, this should serve to push key to the right
                if (arguments.length > 2) {
                    var args = copyargs(arguments);
                    args[1] = 0; // howMany
                    this._list._spliceFromKey.apply(this._list, args);
                }
                // now we can remove anything that needs to be removed, since they are not necessarially contiguous
                // in the underlying list we remove them one by one.
                var result = [];
                if (howMany) {
                    var keysToRemove = [];
                    var sortedKeys = this._sortedKeys;
                    var sortedKeyIndex = sortedKeys.indexOf(key);
                    for (var i = sortedKeyIndex, len = sortedKeys.length; i < len && (i - sortedKeyIndex) < howMany; i++) {
                        keysToRemove.push(sortedKeys[i]);
                    }
                    var that = this;
                    keysToRemove.forEach(function (key) {
                        result.push(that._list._spliceFromKey(key, 1)[0]);
                    });
                }
                return result;
            }
        }, {
            supportedForProcessing: false,
        }
    );

    // This projection sorts the underlying list by group key and within a group
    //  respects the position of the item in the underlying list. It is built on top
    //  of the SortedListProjection and has an intimate contract with
    //  GroupsListProjection.
    //
    var GroupedSortedListProjection = WinJS.Class.derive(SortedListProjection,
        function (list, groupKeyOf, groupDataOf, groupSorter) {
            this._list = list;
            this._addListListener("itemchanged", this._listGroupedItemChanged);
            this._addListListener("iteminserted", this._listGroupedItemInserted);
            this._addListListener("itemmoved", this._listGroupedItemMoved);
            this._addListListener("itemmutated", this._listGroupedItemMutated);
            this._addListListener("itemremoved", this._listGroupedItemRemoved);
            this._addListListener("reload", this._listReload);
            this._sortFunction = function (l, r) {
                l = groupKeyOf(l);
                r = groupKeyOf(r);
                if (groupSorter) {
                    return groupSorter(l, r);
                } else {
                    return l < r ? -1 : l === r ? 0 : 1;
                }
            };
            this._groupKeyOf = groupKeyOf;
            this._groupDataOf = groupDataOf;
            this._initSortedKeys();
            this._initGroupedItems();
        }, {
            _groupKeyOf: null,
            _groupDataOf: null,

            _groupedItems: null,
            _initGroupedItems: function () {
                var groupedItems = {};
                var list = this._list;
                var groupKeyOf = this._groupKeyOf;
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = cloneItem(list.getItem(i));
                    item.groupKey = groupKeyOf(item.data);
                    groupedItems[item.key] = item;
                }
                this._groupedItems = groupedItems;
            },

            _groupsProjection: null,

            _listGroupedItemChanged: function (event) {
                var key = event.detail.key;
                var oldValue = event.detail.oldValue;
                var newValue = event.detail.newValue;
                var groupedItems = this._groupedItems;
                var oldGroupedItem = groupedItems[key];
                var newGroupedItem = cloneItem(oldGroupedItem);
                newGroupedItem.data = newValue;
                newGroupedItem.groupKey = this._groupKeyOf(newValue);
                groupedItems[key] = newGroupedItem;
                var index;
                if (oldGroupedItem.groupKey === newGroupedItem.groupKey) {
                    index = this.indexOfKey(key);
                    this._notifyItemChanged(key, index, oldValue, newValue, oldGroupedItem, newGroupedItem);
                } else {
                    index = event.detail.index;
                    this._listItemChanged({ detail: { key: key, index: index, oldValue: oldValue, newValue: newValue, oldItem: oldGroupedItem, newItem: newGroupedItem } });
                }
            },
            _listGroupedItemInserted: function (event) {
                var key = event.detail.key;
                var value = event.detail.value;
                var groupKey = this._groupKeyOf(value);
                this._groupedItems[key] = {
                    handle: key,
                    key: key,
                    data: value,
                    groupKey: groupKey
                };
                var groupMin, groupMax;
                if (this._groupsProjection) {
                    var groupItem = this._groupsProjection._groupItems[groupKey];
                    if (groupItem) {
                        groupMin = groupItem.firstItemIndexHint;
                        groupMax = groupMin + groupItem.groupSize;
                    }
                }
                this._listItemInserted(event, groupMin, groupMax);
            },
            _listGroupedItemMoved: function (event) {
                var groupMin, groupMax;
                var groupKey = this._groupedItems[event.detail.key].groupKey;
                if (this._groupsProjection) {
                    var groupItem = this._groupsProjection._groupItems[groupKey];
                    groupMin = groupItem.firstItemIndexHint;
                    groupMax = groupMin + groupItem.groupSize;
                }
                this._listItemMoved(event, groupMin, groupMax);
            },
            _listGroupedItemMutated: function (event) {
                var key = event.detail.key;
                var value = event.detail.value;
                var groupedItems = this._groupedItems;
                var oldGroupedItem = groupedItems[key];
                var groupKey = this._groupKeyOf(value);
                if (oldGroupedItem.groupKey === groupKey) {
                    this._notifyItemMutated(key, value, oldGroupedItem);
                } else {
                    var newGroupedItem = cloneItem(oldGroupedItem);
                    newGroupedItem.groupKey = groupKey;
                    groupedItems[key] = newGroupedItem;
                    var index = this._list.indexOfKey(key);
                    this._listItemRemoved({ detail: { key: key, index: index, value: value, item: oldGroupedItem } });
                    this._listItemInserted({ detail: { key: key, index: index, value: value } });
                }
            },
            _listGroupedItemRemoved: function (event) {
                var key = event.detail.key;
                var index = event.detail.index;
                var value = event.detail.value;
                var groupedItems = this._groupedItems;
                var groupedItem = groupedItems[key];
                delete groupedItems[key];
                var groupMin, groupMax;
                if (this._groupsProjection) {
                    var groupItem = this._groupsProjection._groupItems[groupedItem.groupKey];
                    groupMin = groupItem.firstItemIndexHint;
                    groupMax = groupMin + groupItem.groupSize;
                }
                this._listItemRemoved({ detail: { key: key, index: index, value: value, item: groupedItem } }, groupMin, groupMax);
            },

            // override _listReload
            _listReload: function () {
                this._initGroupedItems();
                SortedListProjection.prototype._listReload.call(this);
            },

            /// <field type="WinJS.Binding.List" locid="WinJS.Binding.GroupedSortedListProjection.groups" helpKeyword="WinJS.Binding.GroupedSortedListProjection.groups">Gets a WinJS.Binding.List, which is a projection of the groups that were identified in this list.</field>
            groups: {
                get: function () {
                    if (this._groupsProjection === null) {
                        this._groupsProjection = new GroupsListProjection(this, this._groupKeyOf, this._groupDataOf);
                    }
                    return this._groupsProjection;
                }
            },

            // We have to implement this because we keep our own set of items so that we can
            //  tag them with groupKey.
            //
            getItemFromKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.GroupedSortedListProjection.getItemFromKey">
                /// <summary locid="WinJS.Binding.GroupedSortedListProjection.getItemFromKey">
                /// Gets a key/data pair for the specified item key.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.GroupedSortedListProjection.getItemFromKey_p:key">The key of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.GroupedSortedListProjection.getItemFromKey_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                return this._groupedItems[key];
            }
        }, {
            supportedForProcessing: false,
        }
    );

    // This is really an implementation detail of GroupedSortedListProjection and takes a
    // dependency on its internals and implementation details.
    //
    var GroupsListProjection = WinJS.Class.derive(ListBase,
        function (list, groupKeyOf, groupDataOf) {
            this._list = list;
            // itemchanged is handled by the GroupedSortedListProjection because if the item
            //  changes groups it turns into a remove/insert
            this._addListListener("iteminserted", this._listItemInserted);
            this._addListListener("itemmoved", this._listItemMoved);
            // itemmutated is handled by the GroupedSortedListProjection because if the item
            //  changes groups it turns into a remove/insert.
            this._addListListener("itemremoved", this._listItemRemoved);
            this._addListListener("reload", this._listReload);
            this._groupKeyOf = groupKeyOf;
            this._groupDataOf = groupDataOf;
            this._initGroupKeysAndItems();
        }, {
            _list: null,

            _addListListener: function (name, func) {
                // interestingly, since GroupsListProjection has the same lifetime as the GroupedSortedListProjection
                // we don't have to worry about cleaning up the cycle here.
                this._list.addEventListener(name, func.bind(this));
            },

            _groupDataOf: null,
            _groupKeyOf: null,
            _groupOf: function (item) {
                return this.getItemFromKey(this._groupKeyOf(item.data));
            },

            _groupKeys: null,
            _groupItems: null,
            _initGroupKeysAndItems: function () {
                var groupDataOf = this._groupDataOf;
                var list = this._list;
                var groupItems = {};
                var groupKeys = [];
                var currentGroupKey = null;
                var currentGroupItem = null;
                var groupCount;
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list.getItem(i);
                    var groupKey = item.groupKey;
                    if (groupKey !== currentGroupKey) {
                        // new group
                        if (currentGroupItem) {
                            currentGroupItem.groupSize = groupCount;
                        }
                        groupCount = 1;
                        currentGroupKey = groupKey;
                        currentGroupItem = {
                            handle: groupKey,
                            key: groupKey,
                            data: groupDataOf(item.data),
                            firstItemKey: item.key,
                            firstItemIndexHint: i
                        };
                        groupItems[groupKey] = currentGroupItem;
                        groupKeys.push(groupKey);
                    } else {
                        // existing group
                        groupCount++;
                    }
                }
                if (currentGroupItem) {
                    currentGroupItem.groupSize = groupCount;
                }
                this._groupKeys = groupKeys;
                this._groupItems = groupItems;
            },

            _listItemInserted: function (event) {
                // iteminserted is only interesting if this is a new group, or is the first
                //  item of the group at which point the group data is regenerated. It will
                //  however always result in a +1 to all the following firstItemIndexHints
                //
                var key = event.detail.key;
                var index = event.detail.index;
                var value = event.detail.value;
                var list = this._list;
                var groupKey = list.getItemFromKey(key).groupKey;
                var groupItems = this._groupItems;
                var groupKeys = this._groupKeys;
                var groupItem = groupItems[groupKey];
                var groupIndex;
                var oldGroupItem, newGroupItem;

                var i, len;
                if (!groupItem) {
                    // we have a new group, add it
                    for (i = 0, len = groupKeys.length; i < len; i++) {
                        groupItem = groupItems[groupKeys[i]];
                        if (groupItem.firstItemIndexHint >= index) {
                            break;
                        }
                    }
                    groupIndex = i;
                    groupItem = {
                        handle: groupKey,
                        key: groupKey,
                        data: this._groupDataOf(value),
                        groupSize: 1,
                        firstItemKey: key,
                        firstItemIndexHint: index
                    };
                    groupKeys.splice(groupIndex, 0, groupKey);
                    groupItems[groupKey] = groupItem;
                    this._notifyItemInserted(groupKey, groupIndex, groupItem.data);
                } else {
                    oldGroupItem = groupItem;
                    newGroupItem = cloneItem(oldGroupItem);
                    newGroupItem.groupSize++;
                    if (oldGroupItem.firstItemIndexHint === index) {
                        newGroupItem.groupData = this._groupDataOf(value);
                        newGroupItem.firstItemKey = key;
                        newGroupItem.firstItemIndexHint = index;
                    }
                    groupItems[groupKey] = newGroupItem;
                    groupIndex = groupKeys.indexOf(groupKey);
                    this._notifyItemChanged(groupKey, groupIndex, oldGroupItem.data, newGroupItem.data, oldGroupItem, newGroupItem);
                }
                // update the firstItemIndexHint on following groups
                for (i = groupIndex + 1, len = groupKeys.length; i < len; i++) {
                    oldGroupItem = groupItems[groupKeys[i]];
                    newGroupItem = cloneItem(oldGroupItem);
                    newGroupItem.firstItemIndexHint++;
                    groupItems[newGroupItem.key] = newGroupItem;
                    this._notifyItemChanged(newGroupItem.key, i, oldGroupItem.data, newGroupItem.data, oldGroupItem, newGroupItem);
                }
            },
            _listItemMoved: function (event) {
                // itemmoved is not important to grouping unless the move resulted in a new
                //  first item in the group at which point we will regenerate the group data
                //
                var key = event.detail.key;
                var oldIndex = event.detail.oldIndex;
                var newIndex = event.detail.newIndex;
                var list = this._list;
                var groupKey = list.getItemFromKey(key).groupKey;
                var groupItems = this._groupItems;
                var groupItem = groupItems[groupKey];
                if (groupItem.firstItemIndexHint === newIndex ||
                    groupItem.firstItemIndexHint === oldIndex) {
                    // the first item of the group has changed, update it.
                    var item = list.getItem(groupItem.firstItemIndexHint);
                    var newGroupItem = cloneItem(groupItem);
                    newGroupItem.data = this._groupDataOf(item.data);
                    newGroupItem.firstItemKey = item.key;
                    groupItems[groupKey] = newGroupItem;
                    this._notifyItemChanged(groupKey, this._groupKeys.indexOf(groupKey), groupItem.data, newGroupItem.data, groupItem, newGroupItem);
                }
            },
            _listItemRemoved: function (event) {
                // itemremoved is only interesting if the group was of size 1 or was the
                //  first item of the group at which point the group data is regenerated.
                //  It will however always result in a -1 to all of the following
                //  firstItemIndexHints.
                //
                var index = event.detail.index;
                var item = event.detail.item;
                var groupItems = this._groupItems;
                var groupKeys = this._groupKeys;
                // since the value is no longer in the list we can't ask for its item and
                // get the group key from there.
                var groupKey = item.groupKey;
                var groupItem = groupItems[groupKey];
                var groupIndex = groupKeys.indexOf(groupKey);
                var oldGroupItem, newGroupItem;

                if (groupItem.groupSize === 1) {
                    groupKeys.splice(groupIndex, 1);
                    delete groupItems[groupKey];
                    this._notifyItemRemoved(groupKey, groupIndex, groupItem.data, groupItem);
                    // after removing the group we need to decrement the index because it is used
                    // for modifying subsequent group firstItemIndexHint's
                    groupIndex--;
                } else {
                    oldGroupItem = groupItem;
                    newGroupItem = cloneItem(oldGroupItem);
                    newGroupItem.groupSize--;
                    if (oldGroupItem.firstItemIndexHint === index) {
                        // find the next group item, it will be at the same index as the old
                        // first group item.
                        var newFirstItem = this._list.getItem(index);
                        newGroupItem.data = this._groupDataOf(newFirstItem.data);
                        newGroupItem.firstItemKey = newFirstItem.key;
                    }
                    groupItems[groupKey] = newGroupItem;
                    this._notifyItemChanged(groupKey, groupIndex, oldGroupItem.data, newGroupItem.data, oldGroupItem, newGroupItem);
                }
                for (var i = groupIndex + 1, len = groupKeys.length; i < len; i++) {
                    oldGroupItem = groupItems[groupKeys[i]];
                    newGroupItem = cloneItem(oldGroupItem);
                    newGroupItem.firstItemIndexHint--;
                    groupItems[newGroupItem.key] = newGroupItem;
                    this._notifyItemChanged(newGroupItem.key, i, oldGroupItem.data, newGroupItem.data, oldGroupItem, newGroupItem);
                }
            },
            _listReload: function () {
                this._initGroupKeysAndItems();
                this._notifyReload();
            },

            /// <field type="Number" integer="true" locid="WinJS.Binding.GroupsListProjection.length" helpKeyword="WinJS.Binding.GroupsListProjection.length">Gets the length of the list. Returns an integer value one higher than the highest element defined in a list.</field>
            length: {
                get: function () { return this._groupKeys.length; }
            },

            getItem: function (index) {
                /// <signature helpKeyword="WinJS.Binding.GroupsListProjection.getItem">
                /// <summary locid="WinJS.Binding.GroupsListProjection.getItem">
                /// Gets a key/data pair for the specified index .
                /// </summary>
                /// <param name="index" type="Number" integer="true" locid="WinJS.Binding.GroupsListProjection.getItem_p:index">The index of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.GroupsListProjection.getItem_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                index = asNumber(index);
                return this._groupItems[this._groupKeys[index]];
            },
            getItemFromKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.GroupsListProjection.getItemFromKey">
                /// <summary locid="WinJS.Binding.GroupsListProjection.getItemFromKey">
                /// Gets a key/data pair for the specified key.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.GroupsListProjection.getItemFromKey_p:key">The key of the value to retrieve.</param>
                /// <returns type="Object" locid="WinJS.Binding.GroupsListProjection.getItemFromKey_returnValue">An object with .key and .data properties.</returns>
                /// </signature>
                return this._groupItems[key];
            },

            indexOfKey: function (key) {
                /// <signature helpKeyword="WinJS.Binding.GroupsListProjection.indexOfKey">
                /// <summary locid="WinJS.Binding.GroupsListProjection.indexOfKey">
                /// Returns the index of the first occurrence of a key in a list.
                /// </summary>
                /// <param name="key" type="String" locid="WinJS.Binding.GroupsListProjection.indexOfKey_p:key">The key to locate in the list.</param>
                /// <returns type="Number" integer="true" locid="WinJS.Binding.GroupsListProjection.indexOfKey_returnValue">The index of the first occurrence of a key in a list, or -1 if not found.</returns>
                /// </signature>
                return this._groupKeys.indexOf(key);
            }
        }, {
            supportedForProcessing: false,
        }
    );

    WinJS.Namespace.define("WinJS.Binding", {
        List: List
    });

}(this));


(function resInit(WinJS, undefined) {
    "use strict";

    var readyComplete = false;
    var resourceMap;
    var resourceLoader;

    var requireSupportedForProcessing = WinJS.Utilities.requireSupportedForProcessing

    function processAllImpl(rootElement, count) {
        rootElement = rootElement || document.body;

        var count = count || 0;

        if (count < 4) {
            // Only 3 depth is supported in the innerHTML
            if (count == 0) {
                if (rootElement.getAttribute) {
                    // Fragment-loaded root element isn't caught by querySelectorAll
                    var rootElementNode = rootElement.getAttribute('data-win-res');
                    if (rootElementNode) {
                        var decls = WinJS.UI.optionsParser(rootElementNode);
                        setMembers(rootElement, rootElement, decls, count);
                    }
                }
            }

            var elements = rootElement.querySelectorAll('[data-win-res]');
            if (elements.length === 0) {
                return WinJS.Promise.as(rootElement);
            }

            for (var i = 0, len = elements.length; i < len; i++) {
                var e = elements[i];
                // Use optionsParser that accept string format
                // {name="value", name2="value2"}
                var decls = WinJS.UI.optionsParser(e.getAttribute('data-win-res'));
                setMembers(e, e, decls, count);
            }

        }
        else if (WinJS.validation) {
            throw new WinJS.ErrorFromName("WinJS.Res.NestingExceeded", WinJS.Resources._getWinJSString("base/nestingExceeded").value);
        }

        return WinJS.Promise.as(rootElement);
    };

    function setAttributes(root, descriptor) {
        var names = Object.keys(descriptor);

        for (var k = 0, l = names.length ; k < l; k++) {
            var name = names[k];
            var value = descriptor[name];

            var data = WinJS.Resources.getString(value);

            if (!data || !data.empty) {
                root.setAttribute(name, data.value);

                if ((data.lang !== undefined) &&
                    (root.lang !== undefined) &&
                    (root.lang !== data.lang)) {

                    root.lang = data.lang;
                }
            }
            else if (WinJS.validation) {
                notFound(value);
            }
        }
    }

    function notFound(name) {
        throw new WinJS.ErrorFromName("WinJS.Res.NotFound", WinJS.Resources._formatString(WinJS.Resources._getWinJSString("base/notFound").value, name));
    }

    function setMembers(root, target, descriptor, count) {
        var names = Object.keys(descriptor);
        target = requireSupportedForProcessing(target);

        for (var k = 0, l = names.length ; k < l; k++) {
            var name = names[k];
            var value = descriptor[name];

            if (typeof value === "string") {
                var data = WinJS.Resources.getString(value);

                if (!data || !data.empty) {
                    target[name] = data.value;

                    if ((data.lang !== undefined) &&
                        (root.lang !== undefined) &&
                        (root.lang !== data.lang)) {
                        // When lang property is different, we set the language with selected string's language
                        root.lang = data.lang;
                    }

                    if (name === "innerHTML") {
                        processAllImpl(target, count + 1);
                    }
                }
                else if (WinJS.validation) {
                    notFound(value);
                }
            }
            else if (root === target && name === "attributes") {
                //Exposing setAttribute for attributes that don't have HTML properties, like aria, through a fake 'attributes' property
                setAttributes(root, value);
            }
            else {
                setMembers(root, target[name], value, count);
            }
        }
    }

    WinJS.Namespace.define("WinJS.Resources", {
        processAll: function (rootElement) {
            /// <signature helpKeyword="WinJS.Resources.processAll">
            /// <summary locid="WinJS.Resources.processAll">
            /// Processes resources tag and replaces strings
            /// with localized strings.
            /// </summary>
            /// <param name="rootElement" locid="WinJS.Resources.processAll_p:rootElement">
            /// The DOM element at which to start processing. processAll processes the element and its child elements.
            /// If you don't specify root element, processAll processes the entire document.
            /// </param>
            /// </signature>

            if (!readyComplete) {
                return WinJS.Utilities.ready().then(function () {
                    readyComplete = true;
                    return processAllImpl(rootElement);
                });
            }
            else {
                try {
                    return processAllImpl(rootElement);
                }
                catch (e) {
                    return WinJS.Promise.wrapError(e);
                }
            }
        }
    });
})(WinJS);


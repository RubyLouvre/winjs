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

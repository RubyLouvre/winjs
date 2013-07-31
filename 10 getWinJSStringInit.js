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
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

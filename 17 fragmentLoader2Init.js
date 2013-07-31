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
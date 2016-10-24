cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/de.sitewaerts.cordova.documentviewer/www/sitewaertsdocumentviewer.js",
        "id": "de.sitewaerts.cordova.documentviewer.SitewaertsDocumentViewer",
        "clobbers": [
            "cordova.plugins.SitewaertsDocumentViewer",
            "SitewaertsDocumentViewer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "de.sitewaerts.cordova.documentviewer": "0.2.0"
}
// BOTTOM OF METADATA
});
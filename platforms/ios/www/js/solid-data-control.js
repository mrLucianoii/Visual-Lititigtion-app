var rTitle = ['Title 1','Title 2','Title 3','Title 4','Title 5','Title 6','Title 7','Title 8','Title 9','Title 10','Title 13','Title 14','Title 15','Title 16', , 'Title 17' ],
    rDates = ['1984-05-23', '1954-06-09', '1980-07-31', '1966-08-06',  '1984-08-06',  '1984-08-29', '1984-06-28', '1984-04-04', '1988-09-12', '1984-08-21', '1966-10-18', '1982-10-28', '1984-06-01', '1950-01-01', '1961-07-01', '1956-01-01', '2003-01-01' ],
    rDes = "Lorem ipsum dolor sit amet, vis exerci tacimates salutandi et, ex est liber aeque. An voluptua complectitur nec, duo ne legere invidunt adversarium. Ea usu legendos partiendo. Purto graeco qui in, tamquam volutpat repudiandae nam in.";


var rick = $.getJSON( "json/solid.json", function() { 
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
    $.getJSON("json/solid.json", function(json) {
    al(json.color); // this will show the info it in firebug console
}); 

// Set another completion function for the request above
rick.complete(function() {
  console.log( "second complete" );
});
    

    //var obj1 = $.parseJSON(rick);
//  alert(JSON.stringify(rick, null, 4));
    
// define global viewer options here
var VIEWER_OPTIONS = {
    documentView : { closeLabel : "Close Window" },
    navigationView : { closeLabel : "Close View" }

};

function buildViewerOptions()
{
    var options = $.extend({}, VIEWER_OPTIONS);

    if(window["cordova"])
    {
        if (!options.android)
            options.android = {};
    }
    return options;
}

// list files located in www folder here
var files = ['P1_8.pdf','P1_309.pdf', 'P1_320.pdf', 'P1_354.pdf', 'P1_507.pdf', 'P1_2030.pdf', 'P1_3070.pdf', 'P1_7172.pdf', 'P1_8098.pdf', 'P1_8221.pdf', 'P1_8351.pdf', 'P1_8382.pdf', 'P1_8397.pdf', 'P1_8405.pdf', 'P1_8457.pdf', 'P1_8572.pdf', 'P1_4465.pdf' ];



var baseUrl = location.href.replace("/index.html", "");

var defaultStorage = "shared";

var MIME_TYPES = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

var entries = {assets: {}, private: {}, shared: {}};


if (typeof String.prototype.contains === 'undefined')
{
    String.prototype.contains = function (str)
    {
        return this.indexOf(str) != -1;
    };
}

if (typeof String.prototype.endsWith === 'undefined')
{
    String.prototype.endsWith = function (str)
    {
        if (!str)
            return false;
        return this.indexOf(str, this.length - str.length) !== -1;
    };
}

if (typeof String.prototype.startsWith === 'undefined')
{
    String.prototype.startsWith = function (str)
    {
        if (!str)
            return false;
        return this.indexOf(str, 0) == 0;
    };
}

function concatPath(base, uri)
{
    var result = base;
    if (result && !result.endsWith("/"))
        result = result + "/";
    if (uri && uri.startsWith("/"))
        uri = uri.substring(1);
    return result + uri;
}

function getPrivateAppDataRootDirEntry(success, error)
{
    if (!window["cordova"])
    {
        success(null);
        return;
    }

    var path = cordova.file.dataDirectory;
    window.resolveLocalFileSystemURL(
            path,
            function (dir)
            {
                window.console.log(
                        "returning "
                                + path
                                + " / "
                                + dir.nativeURL
                                + " / "
                                + dir.toURL()
                                + " as private data dir");
                success(dir);
            },
            error
    );
}

function getSharedAppDataRootDirEntry(success, error)
{
    if (!window["cordova"])
    {
        success(null);
        return;
    }

    var path = cordova.file.documentsDirectory; // iOS
    if (!path)
        path = cordova.file.externalDataDirectory; // Android

    window.resolveLocalFileSystemURL(
            path,
            function (dir)
            {
                window.console.log(
                        "returning "
                                + path
                                + " / "
                                + dir.nativeURL
                                + " / "
                                + dir.toURL()
                                + " as shared data dir");
                success(dir);
            },
            error
    );
}

function errorHandler(e)
{
    alert("error");
    throw e;
}

function copyFiles(success, error)
{
    function copyFile(entries, dir, file, success)
    {
        var ft = new FileTransfer();

        var dest = concatPath(dir.toURL(), file);

        var source = buildAssetsUrl(file);

        window.console.log("copying " + source + " to " + dest);

        ft.download(
                source,
                dest,
                function (entry)
                {
                    var storageEntry = {url: entry.nativeURL, mimeType: getMimeType(file), entry: entry};
                    setViewerSupport(storageEntry, function ()
                    {
                        entries[file] = storageEntry;
                        success();
                    });
                },
                error
        );

    }

    function copyFiles(entries, dir, success)
    {

        function doIt(idx)
        {
            if (idx >= files.length)
            {
                success();
                return;
            }

            copyFile(entries, dir, files[idx], function ()
            {
                doIt(++idx);
            });
        }

        doIt(0);
    }

    function setViewerSupport(entry, next)
    {
        if (!window['SitewaertsDocumentViewer'])
        {
            entry.canView = null;
            next();
            return;
        }

        var options = buildViewerOptions();

        SitewaertsDocumentViewer.canViewDocument(
                entry.url,
                entry.mimeType,
                options,
                function onPossible()
                {
                    entry.canView = true;
                    next();
                },
                function onMissingApp()
                {
                    entry.canView = true;
                    next();
                },
                function onImpossible()
                {
                    entry.canView = false;
                    next();
                },
                function onError(error)
                {
                    window.console.log(error);
                    entry.canView = false;
                    next();
                }
        );
    }

    function buildAssetEntries(success)
    {
        var myEntries = entries.assets;

        function doIt(idx)
        {
            if (idx >= files.length)
            {
                success();
                return;
            }

            var file = files[idx];
            var entry = {url: buildAssetsUrl(file), mimeType: getMimeType(file)};

            setViewerSupport(entry, function ()
            {
                myEntries[file] = entry;
                doIt(++idx);
            });
        }

        doIt(0);
    }


    function buildOtherEntries(success)
    {
        getPrivateAppDataRootDirEntry(
                function (dir)
                {
                    if (!dir)
                    {
                        window.console.log("no private directory available");
                        defaultStorage = "assets";
                        success();
                        return;
                    }

                    copyFiles(entries.private, dir, function ()
                    {
                        getSharedAppDataRootDirEntry(
                                function (dir)
                                {
                                    if (!dir)
                                    {
                                        window.console.log("no shared directory available");
                                        defaultStorage = "private";
                                        success();
                                        return;
                                    }
                                    copyFiles(entries.shared, dir, success);
                                },
                                error
                        );
                    });
                },
                error
        );
    }
    buildAssetEntries(function ()
    {
        buildOtherEntries(success)
    });

}

function buildUrl(storage, file)
{
    if (file.indexOf('://') > 1)
        return file;

    var url = buildDataUrl(storage, file);
    if (url)
        return url;

    return buildAssetsUrl(file);
}

function buildDataUrl(storage, file)
{
    storage = storage || defaultStorage;
    var entry = entries[storage][file];
    if (entry)
        return entry.url;
    return null;
}

function buildAssetsUrl(file)
{
    return baseUrl + "/" + file;
}

function getMimeType(file)
{
    var suffix = file.split('.').pop();
    return MIME_TYPES[suffix];
}

function createDocumentOpener(file, storage)
{
    return function ()
    {
        return openDocument(file, storage)
    };
}


function openDocument(file, storage)
{
    var url = buildUrl(storage, file);
    var mimeType = entries[storage][file].mimeType;
    viewDocument(url, mimeType, storage);
}

function clickUri(uri)
{
    viewDocument(uri, getMimeType(uri), 'click');
}

function viewDocument(url, mimeType, storage)
{
    if (!window['SitewaertsDocumentViewer'])
    {
        window.console.log("Attempting to view '" + url + "'");
        window.open(url);
        return false;
    }

  //  alert("Attempting to view '" + url + "'");

    var options = buildViewerOptions();
    options.title = url.split('/').pop() + '@' + storage;

    SitewaertsDocumentViewer.viewDocument(
            url,
            mimeType,
            options,
            function ()
            {
                // shown
                window.console.log('document shown');
            },
            function ()
            {
                // closed
                window.console.log('document closed');
            },
            function (appId, installer)
            {
                // missing app
                if (confirm("Do you want to install the free PDF Viewer App "
                        + appId + " for Android?"))
                {
                    installer(
                            function ()
                            {
                                window.console.log('successfully installed app');
                                if (confirm("App installed. Do you want to view the document now?"))
                                    viewDocument(url, mimeType, storage);
                            },
                            function (error)
                            {
                                window.console.log('cannot install app');
                                window.console.log(error);
                            }
                    );
                }
            },
            function (error)
            {
                alert('cannot view document ' + url);
                window.console.log('cannot view document ' + url);
                window.console.log(error);
            }

    );
    return false;
}

function buildFileListing1()
{
    var $listing = $('#listing1');
                
    var empty = true;

    for (var fileLocation in entries)
    {

        if (!entries.hasOwnProperty(fileLocation))
            continue;
        
        var $ul = $('<ul></ul>');

        for (var i = 0; i < 17; i++)
        {
            var file = files[i];
            var entry = entries[fileLocation][file];
            if (!entry)
                continue;

            empty = false;
            var $li = $('<li></li>');
            $ul.append($li);
            var $a = $('<a id="help">' + file + '</a>');
            $a.attr('href', '#');
            $a.attr('id', 'fixy'+i+"");
            
            
            $a.attr('title', entry.url);
            if (entry.canView == null || entry.canView == true)
            {
                $a.click(createDocumentOpener(file, fileLocation));
            }
            else
            {
                $a.click(function ()
                {
                    alert("Cannot open Document in viewer");
                    return false;
                });
                $a.addClass('disabled');
            }
            $li.append($a);
        }
        if (!empty)
        {
            $listing.append($ul);
            empty=true;   
        }
    }
}
 
function buildFileListing2()
{
   var $listing2 = $('#listing2');
    
    
    for (var fileLocation in entries)
    {
        if (!entries.hasOwnProperty(fileLocation))
            continue;

        var empty = true;

            

        for (var i = 0; i < 17; i++)
        {
     
            var file = files[i];
            var entry = entries[fileLocation][file];
            if (!entry)
                continue;

           empty = false;

            var $div = $('<div></div>'), 
                $gly = $('<button id="closeWin'+i+'">close</button>'),
                $sContainer = $('<div class="container"></div>');
                // Event Data
            var $tEvent = $('<h1>'+ rTitle[i] +'</h1>'),
                $tDates = $('<h3>'+rDates[i]+'</h3>'),
                $tDesc = $('<p>'+rDes+'</p>');
            
                
          
            var modNum = $("modal-solid"+i+"");

         $div.attr('class', 'modal-solid'+i+'');
            var $a = $('<a id="help">' + file + '</a>');
            $a.attr('href', '#');
  
            if (entry.canView == null || entry.canView == true)
            {
                $a.click(createDocumentOpener(file, fileLocation));
            }
            else
            {
                $a.click(function ()
                {
                    alert("Cannot open Document in viewer");
                    return false;
                });
                $a.addClass('disabled');
            }
            $div.append($tEvent);
            $sContainer.append($tDates);
            $sContainer.append($tDesc);
            $sContainer.append($a);
            $div.append($sContainer);
            $listing2.append($div);
        }
        if (!empty)
        {
        // $listing2.append($div);
            
        }
    }
}
    
    
function showSupportInfo(){

    if (!window['SitewaertsDocumentViewer'])
    {
        return;
    }

    var $container = $('#info');

    function appendDeviceInfo(){

        var device = window["device"];
        if(!device)
            return;

        var $info = $('<div></div>');
        var $pre = $('<pre></pre>');
        $pre.html(JSON.stringify(device));
        $info.append('<h2>Device</h2>');
        $info.append($pre);
        $container.append($info);

    }

    SitewaertsDocumentViewer.getSupportInfo(
            function(supportInfo){
                var $info = $('<div></div>');
                var $pre = $('<pre></pre>');
                $pre.html(JSON.stringify(supportInfo));
                $info.append('<h2>Plugin Support</h2>');
                $info.append($pre);
                $container.append($info);
            },
            function(e){
               alert(e);
            }
    );

    appendDeviceInfo();

}

function init()
{
    copyFiles(
            function ()
            {
              buildFileListing1();
               buildFileListing2();
                $('body').addClass('initialized');
            },
            errorHandler
    );

    showSupportInfo();
}

function assertCordova(){

    if(!window["cordova"])
        alert("Cordova not loaded");
    else if (!window.cordova["file"])
        alert("cordova.file not found. May be you are using the wrong plugin version?");
}

var cordovaPresent = false;

document.addEventListener('deviceready', function ()
{
    cordovaPresent = true;
    $('body').removeClass('initialized');

    assertCordova();

    // wait for debugger
//    alert("Click OK to init App");
    $(document).ready(function ()
    {
        init();
    });
});


// setup for desktop browser
setTimeout(function(){

    if(cordovaPresent == true)
        return;

    $(document).ready(function ()
    {
        init();
    });
}, 3000);

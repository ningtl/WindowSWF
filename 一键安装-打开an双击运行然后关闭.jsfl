function openDirectory(path) {
    var sourceUrl = getFolder(fl.scriptURI);
    var outFiles = FLfile.listFolder(sourceUrl);
    var targetUrl = FLfile.platformPathToURI(FLfile.uriToPlatformPath(path));
    outFiles.forEach(function (fileName){
        FLfile.copy(sourceUrl+"/"+fileName,targetUrl+"/" + fileName);
    });
    var myJsfls = FLfile.listFolder(getFolder(fl.scriptURI)+"/myJsfl/");

    myJsfls.forEach(function (fileName){
        FLfile.copy(sourceUrl+"/myJsfl/"+fileName,targetUrl+"/myJsfl/" + fileName);
    });
}
openDirectory(fl.configURI + "WindowSWF");
function getFolder(str) {
    var index = str.lastIndexOf("/");
    if (index != -1)
        str = str.substring(0, index + 1);
    return str;
}
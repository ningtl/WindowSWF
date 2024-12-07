function openDirectory(path) {
    var sourceUrl = getFolder(fl.scriptURI);
    var outFiles = FLfile.listFolder(sourceUrl);
    var targetUrl = FLfile.platformPathToURI(FLfile.uriToPlatformPath(path));
    outFiles.forEach(function (fileName) {
        FLfile.copy(sourceUrl + "/" + fileName, targetUrl + "/" + fileName);
    });
    var myJsfls = FLfile.listFolder(getFolder(fl.scriptURI) + "/myJsfl/");
    // 递归处理myJsfl目录及其子文件夹下的文件复制
    copyFolderContents(getFolder(fl.scriptURI) + "/myJsfl/", targetUrl + "/myJsfl/");
}

function getFolder(str) {
    var index = str.lastIndexOf("/");
    if (index!= -1) {
        str = str.substring(0, index + 1);
    }
    return str;
}

function copyFolderContents(sourceFolder, targetFolder) {
    var items = FLfile.listFolder(sourceFolder);
    items.forEach(function (item) {
        var sourceItemPath = sourceFolder + item;
        var targetItemPath = targetFolder + item;
        if (FLfile.getAttributes(sourceItemPath) & 16) {
            // 如果是文件夹，先创建对应的目标文件夹，然后递归复制其内容
            FLfile.createFolder(targetItemPath);
            copyFolderContents(sourceItemPath + "/", targetItemPath + "/");
        } else {
            // 如果是文件，直接复制
            FLfile.copy(sourceItemPath, targetItemPath);
        }
    });
}

openDirectory(fl.configURI + "WindowSWF");
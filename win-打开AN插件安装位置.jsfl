function isMac() {
    return (fl.version.search(/mac/i) > -1);
}

function openDirectory(path) {
    var uri = FLfile.uriToPlatformPath(path);
    if (isMac()) {
        FLfile.runCommandLine("open " + "\"" + uri + "\"");
    } else {
        FLfile.runCommandLine("explorer " + "\"" + uri + "\"");
    }
}

openDirectory(fl.configURI + "WindowSWF");
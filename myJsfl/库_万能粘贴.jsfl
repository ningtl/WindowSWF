/**
 * @Author 见水中月
 * @type {Document}
 */
universalPaste();
function universalPaste(){
    var doc = fl.getDocumentDOM();
    var pathURI = doc.pathURI;

    doc.addNewText({left:36, top:491.3, right:46.2, bottom:508.7});
    doc.setElementProperty('autoExpand', true);
    fl.getDocumentDOM().selection[0].setTextAttr("face", "Times New Roman");
    doc.clipPaste();

    fl.selectTool("arrow");
    var element = doc.selection[0];
    var textString = element.getTextString(0);
    doc.deleteSelection();
    var split = textString.split(".");
    split[split.length-1] = "fla";
    var s = split.join(".");
    var uri = "";
    if (isMac()){
        uri = FLfile.platformPathToURI(s);
    }else {
        uri = s;
    }

    try{
        fl.openDocument(uri);
    }catch (e) {
        fl.trace("textString = " + textString);
        fl.trace("获取的文件路径=" + uri);
        fl.trace("错误信息=" +e);
        return
    }
    fl.getDocumentDOM().selectAll();
    fl.getDocumentDOM().clipCopy();
    fl.openDocument(pathURI);
    fl.getDocumentDOM().clipPaste();

}

function isMac() {
    return (fl.version.search(/mac/i) > -1);
}


function traceEle(ele){
    for (var i in ele) {
        fl.trace("属性 i=" + i + "    值=" + ele[i]);
    }
}
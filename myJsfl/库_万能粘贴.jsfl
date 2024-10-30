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
    doc.clipPaste();

    fl.selectTool("arrow");
    var element = doc.selection[0];
    var textString = element.getTextString(0);
    doc.deleteSelection();
    var split = textString.split(".");
    split[split.length-1] = "fla";
    var s = split.join(".");

    fl.openDocument(s);
    fl.getDocumentDOM().selectAll();
    fl.getDocumentDOM().clipCopy();
    fl.openDocument(pathURI);
    fl.getDocumentDOM().clipPaste();

}

function traceEle(ele){
    for (var i in ele) {
        fl.trace("属性 i=" + i + "    值=" + ele[i]);
    }
}


Movingcenter()
function Movingcenter(){
    var doc = fl.getDocumentDOM();
    if (doc===null){
        alert("清先打开 [.fla]文件");
        return
    }
    if (doc.selection.length!=1){
        alert("清先 有且之选择一个元件");
    }
    doc.clipCut();
    doc.clipPaste();
    doc.clipCut();
    doc.clipPaste();
    doc.clipCut();
    doc.clipPaste();
}
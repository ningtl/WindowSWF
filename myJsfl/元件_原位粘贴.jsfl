/**
 * @author 见水中月
 */
function pasteInPlace(){
    var doc = fl.getDocumentDOM();
    var element = doc.selection[0];
    var libraryItem = element.libraryItem;
    libraryItem.addData("mark","string","true");
    doc.exitEditMode();
    doc.clipCopy();
    doc.clipPaste(true);
    doc.breakApart();

    var selection = doc.selection;
    selection.forEach(function (ele){
        if (ele.libraryItem.getData("mark")==="true"){
            ele.selected= false;
        }
    })
    doc.deleteSelection();

}
pasteInPlace()
/**
 * @author 见水中月
 */
function pasteInPlace(){
    var doc = fl.getDocumentDOM();
    doc.selection.forEach(function (ele) {
        ele.libraryItem.addData("mark","string","true");
    })
    doc.exitEditMode();
    doc.clipCopy();
    doc.clipPaste(true);
    doc.breakApart();

    var selection = doc.selection;
    selection.forEach(function (ele){
        if (ele.libraryItem===null){
            return;
        }
        try{
            if (ele.libraryItem.getData("mark")==="true"){
                ele.selected= false;
            }
        }catch (e) {
            // fl.trace("e=" + e);
        }

    })
    doc.deleteSelection();

}
pasteInPlace()
changeLibSelect()
function changeLibSelect(){
    var doc = fl.getDocumentDOM();
    if (doc.selection.length===0){
        alert("请选择元件");
        return;
    }
    var lib = doc.library;
    var selectedItems = lib.getSelectedItems();
    if (selectedItems.length!==1){
        alert("库文件选择了多个或者没选, 有且只能选择一个");
        return;
    }
    doc.swapElement(selectedItems[0].name);
}

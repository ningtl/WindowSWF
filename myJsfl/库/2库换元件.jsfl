changeLibSymbol()
function changeLibSymbol(){
    var doc = fl.getDocumentDOM();
    var lib = doc.library;
    var selectedItems = lib.getSelectedItems();
    if (selectedItems.length!==1){
        alert("库文件选择了多个或者没选, 有且只能选择一个");
        return;
    }
    //如果没有选择元件 那就是拖入  如果是 选择元件, 那就是交换元件
    if(doc.selection.length===0){
        changeLibSelect();
    }else if (doc.selection.length===1){
        doc.swapElement(selectedItems[0].name);
    }else {
        alert("暂时只能1个或者0个")
    }
}
// changeLibSelect()
function changeLibSelect(){
    var doc = fl.getDocumentDOM();
    var lib = doc.library;
    var selectedItems = lib.getSelectedItems();
    if (selectedItems.length!==1){
        alert("库文件选择了多个或者没选, 有且只能选择一个");
        return;
    }
    var item = selectedItems[0].name;
    var position = getPosition();
    var b = lib.itemExists("见月模型文件夹/替换元件");
    if (b){
        doc.library.addItemToDocument(position,'见月模型文件夹/替换元件')
        doc.swapElement(selectedItems[0].name);
    }else{
        //不存在
        createChangeSymbol();
        lib.selectItem(item);
        doc.library.addItemToDocument(position,'见月模型文件夹/替换元件')
        doc.swapElement(selectedItems[0].name);
    }

}

function createChangeSymbol(){
    var position = getPosition();
    an.getDocumentDOM().addNewRectangle({left:position.x, top:position.y, right:position.x+100, bottom:position.y+100}, 0);
    an.getDocumentDOM().mouseClick({x:position.x+10, y:position.y+10}, false, false, true);
    an.getDocumentDOM().mouseDblClk({x:position.x+10, y:position.y+10}, false, false, true);
    an.getDocumentDOM().convertToSymbol('graphic', '替换元件', 'top left');
    var lib = an.getDocumentDOM().library;
    if (lib.getItemProperty('linkageImportForRS') == true) {
        lib.setItemProperty('linkageImportForRS', false);
    }
    else {
        lib.setItemProperty('linkageExportForAS', false);
        lib.setItemProperty('linkageExportForRS', false);
    }
    lib.setItemProperty('scalingGrid',  false);
    lib.newFolder("见月模型文件夹");
    lib.moveToFolder("见月模型文件夹");
    fl.getDocumentDOM().deleteSelection();
}

function getPosition(){
    var dom = fl.getDocumentDOM();
    var tl = dom.getTimeline();
    var position;
    var number = dom.width/2;
    var number2 = dom.height/2 ;
    if (dom.getTimeline().camera.cameraEnabled === true){
        var cameraPos = tl.camera.getPosition(tl.currentFrame);
        var zoomval = tl.camera.getZoom(tl.currentFrame)/100;
        position = {x:Math.abs(cameraPos.x) + number/zoomval,y:Math.abs(cameraPos.y) + number2/zoomval}
    }else{
        position = {x:number,y:number2}
    }
    return position;
}
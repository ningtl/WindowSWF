changeLibSelect()
function changeLibSelect(){
    var doc = fl.getDocumentDOM();
    var lib = doc.library;
    var selectedItems = lib.getSelectedItems();
    if (selectedItems.length!==1){
        alert("库文件选择了多个或者没选, 有且只能选择一个");
        return;
    }

    var position = getPosition();
    doc.library.addItemToDocument(position,'见月模型文件夹/替换元件')
    doc.swapElement(selectedItems[0].name);
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
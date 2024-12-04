Movingcenter()
function Movingcenter(){
    var dom = fl.getDocumentDOM();
    dom.getTimeline().camera.cameraEnabled = true;
    if (dom.selection.length==0){
        alert("请选择元件");
        return;
    }
    var ele = dom.selection[0];
    var tl = dom.getTimeline();
    var cameraPos = tl.camera.getPosition(tl.currentFrame);
    var number = dom.width/2;
    var number2 = dom.height/2 ;
    var zoomval = tl.camera.getZoom(tl.currentFrame)/100;
    ele.transformX = Math.abs(cameraPos.x) + number/zoomval;
    ele.transformY = Math.abs(cameraPos.y) + number2/zoomval;
}
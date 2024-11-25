Movingcenter()
function Movingcenter(){
    var dom = fl.getDocumentDOM();
    var ele = dom.selection[0];
    var tl = dom.getTimeline();
    var cameraPos = tl.camera.getPosition(tl.currentFrame);
    var number = dom.width/2;
    var number2 = dom.height/2 ;
    var zoomval = tl.camera.getZoom(tl.currentFrame)/100;
    ele.transformX = Math.abs(cameraPos.x) + number/zoomval;
    ele.transformY = Math.abs(cameraPos.y) + number2/zoomval;
}
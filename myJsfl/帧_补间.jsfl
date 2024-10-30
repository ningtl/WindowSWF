/**
 * @author 见水中越
 */

insertTween()

/**
 * 给当前真后面那个帧 进行补间
 */
function insertTween(){
    var doc  = fl.getDocumentDOM();
    var timeline = doc.getTimeline();

    if(doc.selection.length === 0){
        var layer = timeline.layers[0];
        if (layer.layerType ==="camera"){
            timeline.setSelectedLayers(0);
            timeline.setSelectedFrames(timeline.currentFrame-1,timeline.currentFrame-1,true);
        }else {
            alert("没有摄像机图层, 没有选择元件,不能插入传统补间")
            return;
        }
    }
    var number = timeline.currentFrame -1;
    var b = true;
    doc.selection.forEach(function (ele) {
        var name = ele.layer.name;
        timeline.currentLayer = timeline.findLayerIndex(name)[0];
        timeline.setSelectedFrames(number,number,b);
        if (b) b=false;
    })
    an.getDocumentDOM().getTimeline().createMotionTween();
    an.getDocumentDOM().getTimeline().setFrameProperty('easeType', 5, -1, 100);
}
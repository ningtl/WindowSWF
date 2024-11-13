/**
 * @author 见水中月
 */
insertTween()
/**
 * 给当前真后面那个帧 进行补间
 */
function insertTween(){
    var doc  = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    for (var i = 0; i < selectedFrames.length; i+=3) {
        var layerIndex = selectedFrames[i];
        var star = selectedFrames[i+1];
        var end = selectedFrames[i+2];
        var layer = timeline.layers[layerIndex];
        var frames = layer.frames;
        for (var j = star; j < end; j++) {
            var frame = frames[j];

            if (frame.elements.length === 0 ){
                continue;
            }
            var element = frame.elements[0];
            if (element.elementType==="shape"){
                frame.tweenType = "shape";
            }else if (element.elementType === "instance"){
                frame.tweenType = "motion";
            }else {
                //多余处理
            }
            var duration = frame.duration;//序列片段
            // fl.trace("关键帧" + j);
            j+=duration-1;
        }
    }
}


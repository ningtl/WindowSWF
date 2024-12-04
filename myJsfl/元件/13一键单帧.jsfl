
singleFrame();
function singleFrame(){
    var doc = fl.getDocumentDOM();
    if (doc==null){
        alert("单帧循环切换: 请打开 [.fla] 文件")
        return;
    }
    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    for (var i = 0; i < selectedFrames.length; i+=3) {
        var layerIndex = selectedFrames[i];
        var star = selectedFrames[i+1];
        var end = selectedFrames[i+2];
        var layer = timeline.layers[layerIndex];
        // fl.trace(layerIndex + "   " + star + "  " + end);
        var keyFrames = getKeyFrames(layer);
        keyFrames.forEach(function (frame) {
            if (frame<star || frame>end)return;
            var elements = layer.frames[frame].elements;
            elements.forEach(function (ele) {
                ele.loop = "single frame";
                ele.firstFrame = 0;
            })
        })
    }
    var selectedFrames = timeline.getSelectedFrames();
}

function getKeyFrames(layer){
    var frames = layer.frames;

    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        //情景模拟， 95  80  20  1 是关键帧
        //获取关键帧数
        var frameNum = frames[i];//i=100
        var startFrame = frameNum.startFrame;//95
        i=startFrame;// 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
    }
    keyFrames.sort(function (a, b) {
        return a-b;
    })
    return keyFrames;
}



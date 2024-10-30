/**
 * @type {Document}
 * @Author 见水中月
 */
var doc = fl.getDocumentDOM();
var element = doc.selection[0];

//优化, 当前内部帧的 可能不是关键帧, 设置为初始关键帧
element.loop = "loop";
var timeline = element.libraryItem.timeline;
var layer = timeline.layers[0];
var keyFrames = getKeyFrames(layer);
for (var i = 0; i < keyFrames.length; i++) {
    if (keyFrames[i]===element.firstFrame){
        element.lastFrame = keyFrames[i+1]-1;
        break;
    }
}

function getKeyFrames(layer) {
    var frames = layer.frames;
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        var frameNum = frames[i];
        var startFrame = frameNum.startFrame;
        i = startFrame;
        keyFrames.push(startFrame);
    }
    keyFrames.sort(function (a, b) { return a-b })
    return keyFrames;
}

/**
 * @type {Document}
 * @Author 见水中月
 */
loopElement()
function loopElement(){
    var doc = fl.getDocumentDOM();
    if (doc.selection.length===0){
        alert("情选择元件在操作");
        return;
    }
    var element = doc.selection[0];

    element.loop = "loop";
    var timeline = element.libraryItem.timeline;

    var layer = timeline.layers[0];
    var keyFrames = getKeyFrames(layer);
    var startFrame = layer.frames[element.firstFrame].startFrame;
    element.firstFrame = startFrame;
    element.lastFrame = layer.frames[startFrame].duration + startFrame-1;
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

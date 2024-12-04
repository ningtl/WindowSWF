an.getDocumentDOM().enterEditMode('inPlace');
//选择图层
an.getDocumentDOM().getTimeline().copyLayers();
an.getDocumentDOM().exitEditMode();
an.getDocumentDOM().getTimeline().pasteLayers();
//移动帧


function copyAudioLayer(){
    var doc = fl.getDocumentDOM();
    doc.enterEditMode("inPlace");

    //寻找对应图层  判断有声音的图层 统统选中
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var b = true;
    var numbers = 0;
    for (var j = 0; j < layers.length; j++) {
        var keyFrames = getKeyFrames(layers[j]);
        var frames = layers[j].frames;
        for (var i in keyFrames){
            var keyFrame = keyFrames[i];
            var soundName = frames[i].soundName;
            if (soundName!=""){
                timeline.setSelectedLayers(j,b);
                if (b)b= false;
                numbers++;
                break;
            }
        }
    }
    //如果上面有找到1个  那就是变成false
    if (b){
        an.getDocumentDOM().exitEditMode();
        alert("该元件里面没有找到声音图层");
        return;
    }
    fl.getDocumentDOM().getTimeline().copyLayers();
    an.getDocumentDOM().exitEditMode();
    an.getDocumentDOM().getTimeline().pasteLayers();
    timeline = fl.getDocumentDOM().getTimeline();
    while(numbers>=1){
        timeline.setSelectedLayers(timeline.currentLayer-numbers,false);
        numbers--;
    }
    //移动选择的帧
    moveKeyFrames();
}

function moveKeyFrames(){
    var timeline = fl.getDocumentDOM().getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    for (var i = 0; i < selectedFrames.length; i += 3) {
        var layerIndex = selectedFrames[i];
        var startFrame = selectedFrames[i + 1];
        var endFrame = selectedFrames[i + 2];
        // 在这里可以对每个选定区域的信息进行处理
        // fl.trace("图层索引: " + layerIndex + ", 起始帧: " + startFrame + ", 结束帧: " + endFrame);
        timeline.setSelectedLayers(layerIndex,true);
        timeline.cutFrames(startFrame,endFrame);

        timeline.pasteFrames(timeline.currentFrame-2,timeline.currentFrame+(endFrame-startFrame)-2);
    }
}

copyAudioLayer()
function getKeyFrames(layer) {
    var frames = layer.frames;
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        var frameNum = frames[i];
        var startFrame = frameNum.startFrame;
        i = startFrame;
        keyFrames.push(startFrame);
    }
    return keyFrames.sort(function (a,b) {
        return a-b;
    });
}


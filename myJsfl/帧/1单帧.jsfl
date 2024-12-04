/**
 * @another {b站 见水中月}
 */
//优化  带上子图层一起单帧
insertKeyFrameOnSel()

function insertKeyFrameOnSel(){
    var doc = fl.getDocumentDOM();
    if (!doc) {
        alert("请打开 [.fla] 文件");
        return;
    }

    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    var currentFrame = timeline.currentFrame;
    var layers = timeline.layers;
    var arr = [];
    for (var i = 0; i < selectedFrames.length; i+=3) {
        var layerIndex = selectedFrames[i];

        selectedFrames[i+1] = currentFrame;
        selectedFrames[i+2] = currentFrame +1;
        var childLayer = getChildLayer(layers[layerIndex],layers);

        childLayer.forEach(function (i) {
            arr.push(i);
            arr.push(currentFrame);
            arr.push(currentFrame +1);
        })
    }
    // 遍历找到对应子图层
    var numbers = selectedFrames.concat(arr);
    selectedFrames = numbers;


    timeline.setSelectedFrames(selectedFrames);
    timeline.convertToKeyframes();
    timeline.setSelectedFrames(selectedFrames);
    var elements = doc.selection;
    elements.forEach(function (ele) {
        ele.loop = "single frame";
    })

}

function getChildLayer(parentLayer,layers){
    var childLayers = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var startFrame = layer.frames[fl.getDocumentDOM().getTimeline().currentFrame].startFrame;
        var rigParentAtFrame = layer.getRigParentAtFrame(startFrame);
        if (isNaN(rigParentAtFrame)){
            if (parentLayer === rigParentAtFrame){
                //索引
                // fl.trace(i)
                childLayers.push(i);
            }
        }
    }
    return childLayers;
}
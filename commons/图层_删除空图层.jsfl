/**
 * @author 见水中月
 * 删除 空图层
 */
deleteEmptyLayers();
function deleteEmptyLayers() {
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var indexArr = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var keyFrames = getKeyFrames(layer);
        var b = true;
        var frames = layer.frames;
        keyFrames.forEach(function (key) {
            if (frames[key].elements.length!=0){
                b = false;
                return;
            }else if (frames[key].soundName!==""){
                b = false;
                return;
            }
        })
        if (b)indexArr.push(i);
    }
    var j = 0;
    for (var i = 0; i < indexArr.length; i++) {
        var indexArrElement = indexArr[i];
        timeline.deleteLayer(indexArrElement - (j++));
    }
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

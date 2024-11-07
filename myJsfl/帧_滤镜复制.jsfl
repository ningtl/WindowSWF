/**
 * @author 见水中月
 * 将一个帧上面的滤镜 复制到另一个帧上  -1图层全部关键帧,
 */

function copyFilterToFrame(framesByUser){
    var doc = fl.getDocumentDOM();
    var selectedLayers = doc.getTimeline().getSelectedLayers();
    //暂时只支持一个图层 设置
    var layer = doc.getTimeline().layers[selectedLayers[0]];
    var filtersAtFrame = layer.getFiltersAtFrame(doc.getTimeline().currentFrame);
    framesByUser.forEach(function (frame) {
        // fl.trace(frame)
        layer.setFiltersAtFrame(frame-1, filtersAtFrame);
    })
}
function copyFilterToFrameAll(){
    var timeline = fl.getDocumentDOM().getTimeline();
    var selectedLayers = timeline.getSelectedLayers();
    //暂时只支持一个图层 设置
    var layer = timeline.layers[selectedLayers[0]];
    var filtersAtFrame = layer.getFiltersAtFrame(timeline.currentFrame);

    var keyFrames = getKeyFrames(layer);
    keyFrames.forEach(function (frame) {
        // fl.trace(frame);
        layer.setFiltersAtFrame(frame, filtersAtFrame);
    });

}

getFramesByUser();
function getFramesByUser(){
    // 自定义参数
    var duration = prompt("请输入你要复制到哪一帧,多帧就用空格间隔开", "5 10");
    if (duration === null) return; // 用户点击取消

    var split = duration.split(" ");
    var frames = [];
    split.forEach(function (string) {
        if (string===" ")return;
        try{
            string = parseInt(string);
            frames.push(string);
        }catch (e){
            alert(string + " 这个不是数字,自动过滤");
            return;
        }
    })
    if (frames[0]===-1){
        copyFilterToFrameAll();
        return;
    }
    copyFilterToFrame(frames);
}

// copySelectFrame()
function traceEle(ele){
    for (var i in ele) {
        fl.trace("属性 i=" + i + "    值=" + ele[i]);
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
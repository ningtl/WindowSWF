var doc = fl.getDocumentDOM();
var timeLine = doc.getTimeline();
var selections =doc.selection;

alert("此次你选择的元件个数有：" +selections.length + ",注意一个图层一个元件哈");
//调用方法
for (var i = 0; i < selections.length; i++) {
    createTween(selections[i]);
}


/**
 * 当前选择的元件，当前侦，前后关键帧 创建 传统补间并且设置缓动强度
 * @param selectionElement 被选中元素
 */
function createTween(selectionElement){
    //防呆
    if (areSure()) return;
    //核心方法，根据这个核心方法我们需要确定3个东西： 那个图层的时间轴？ 开始关键帧帧数？ 结束关键帧帧数？
    // timeLine.layer[1].createMotionTween(strf,endf);
    //1.找到被选中的元素的图层
    var layer = selectionElement.layer;
    var ele = layer.frames[timeLine.currentFrame].elements;
    if (ele.length!=1){
        alert("此次你选择的东西中，有图层 是含有多个元件， 不能完成补间 "+ " 图层名字为：" + layer.name);
    }
    //当前侦
    var currentFrame = timeLine.currentFrame;
    //获取当前所选帧数的 左边关键帧数 selectionElement.layer.frames[currentFrame].startFrame+1
    var startKey = selectionElement.layer.frames[currentFrame].startFrame+1;
    var index = timeLine.findLayerIndex(layer.name);
    if (index.length>1){
        alert("你的图层有重复的名字+" +layer.name + "  请检查");
        return;
    }
    timeLine.setSelectedLayers(index[0]);

    timeLine.createMotionTween(startKey,currentFrame);
    layer.frames[currentFrame].tweenEasing = 100;
}

/**
 * 防止小白的一些小呆呆操作
 */
function areSure(){
    var doc = fl.getDocumentDOM();
    var selections =doc.selection;
    if (doc===null){
        alert("纯小白？先看看教程。兄弟你文档（不是软件是文档.fla）都没打开肿么测试功能")
        return true;
    }
    if (selections === null ||selections.length==0 ){
        alert("清选中一个元素，一个，暂时不支持多个")
        return true;
    }
    return false;
}
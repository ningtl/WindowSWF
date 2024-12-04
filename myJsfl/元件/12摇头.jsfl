movingXWidth(-1,1);

function fangdai(num){
    var doc = an.getDocumentDOM();
    if (doc==null){
        alert("兄弟你的动画文档都打开 怎么搞？")
        return 1;
    }

    if (num === 0){
        alert("兄弟，你没有选择元件啊， 我要对什么操作呢？")
        return  1;
    }
}

//没有补间的摇头
function movingXWidth(rightOrLeft,percentage){
    var doc = an.getDocumentDOM();
    var timeline = doc.getTimeline();
    var currentFrameNum = timeline.currentFrame;

    //获取选中对象 图层
    var selection = doc.selection;
    var i = selection.length;

    if (fangdai(i)){
        return;
    }
    var element = selection[0];

    var layer = element.layer;
    //左右摇摆一次 为2 1 -1  1 -1 1
    var tow= currentFrameNum;
    for (var i = 0; i < 4; i++) {
        tow +=3;
        timeline.insertKeyframe(tow);
        var element1 = layer.frames[tow].elements[0];
        element1.scaleX = -element1.scaleX;
    }
    timeline.currentFrame = currentFrameNum;
}
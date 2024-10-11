// 作者：心碎
var doc = fl.getDocumentDOM();
var timeline = doc.getTimeline();

function checkDocument() {
    if (doc == null) {
        alert("兄弟你的动画文档都没打开，怎么搞？");
        return false;
    }
    if (timeline.layers.length === 0 || timeline.layers[0].frames.length === 0) {
        alert("兄弟，当前元件内没有内容啊，我要对什么操作呢？");
        return false;
    }
    return true;
}

function createRealisticAfterImage() {
    if (!checkDocument()) return;
    //
    // var numFrames = parseInt(prompt("请输入残影持续的帧数:", "10"));
    // if (isNaN(numFrames) || numFrames <= 0) {
    //     alert("请输入有效的帧数");
    //     return;
    // }
    //
    // var fadeStart = parseFloat(prompt("请输入起始透明度 (0-100):", "80"));
    // if (isNaN(fadeStart) || fadeStart < 0 || fadeStart > 100) {
    //     alert("请输入有效的起始透明度 (0-100)");
    //     return;
    // }
    var numFrames = 10;
    var fadeStart = 80;

    var currentLayer = timeline.currentLayer;
    var startFrame = timeline.currentFrame;

    // 确保起始帧是关键帧
    if (!isKeyFrame(timeline.layers[currentLayer], startFrame)) {
        timeline.insertKeyframe();
    }

    // 复制原始元素
    doc.selectAll();
    doc.clipCopy();

    // 创建残影
    for (var i = 1; i <= numFrames; i++) {
        timeline.currentFrame = startFrame + i;
        timeline.insertKeyframe();
        
        doc.clipPaste(true);
        var newElements = doc.selection;

        for (var j = 0; j < newElements.length; j++) {
            var element = newElements[j];
            
            // 计算透明度（使用指数衰减）
            var alpha = fadeStart * Math.pow(0.8, i);
            element.colorAlphaPercent = alpha;
        }
    }

    // 返回到起始帧
    timeline.currentFrame = startFrame;

    alert("真实残影效果已在元件内部创建!\n" +
          "持续帧数: " + numFrames + "\n" +
          "起始透明度: " + fadeStart + "%");
}

function isKeyFrame(layer, frame) {
    return layer.frames[frame].startFrame === frame;
}

function createRealisticAfterImage() {
    if (!checkDocument()) return;
    //先创建元件


    //帧长度


    //动作


    // 图层复制

    //图层
}


// 直接调用createRealisticAfterImage函数
createRealisticAfterImage();
// 作者：心碎  - 优化 见水中月
var doc = fl.getDocumentDOM();
var timeline = doc.getTimeline();
var selection = doc.selection;
headMovement();

function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla文件]");
        return true;
    }
    if (selection.length === 0) {
        alert("请选择想要旋转的元件？");
        return true;
    }
    return false;
}

function headMovement() {
    if (checkDom()) return;

    // 选择动作
    var action = confirm("选择动作：确定为抬头，取消为低头");
    var actionName = action ? "抬头" : "低头";

    // 自定义参数 本来想固定15的
    var angle = prompt("请输入" + actionName + "角度 (0-90):", "15");
    if (angle === null) return; // 用户点击取消
    angle = parseFloat(angle);

    var duration = prompt("请输入动画持续帧数:", "10");
    if (duration === null) return; // 用户点击取消
    duration = parseInt(duration);

    // var easing = prompt("请输入缓动值 (0-100):", "70");
    // if (easing === null) return; // 用户点击取消
    // easing = parseInt(easing);
//固定为 100
    var easing = 100;
    // 参数验证
    angle = Math.min(Math.max(angle, 0), 90);
    duration = Math.max(duration, 2);
    easing = Math.min(Math.max(easing, 0), 100);

    var currentFrame = timeline.currentFrame;
    var currentLayer = timeline.currentLayer;
    var finalFrame = currentFrame + duration;

    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];
        var layer = element.layer;

        selectLayerByElement(element);

        // 插入关键帧如果当前帧不是关键帧
        if (!isKeyFrame(layer, currentFrame)) {
            timeline.insertKeyframe(currentFrame);
        }

        // 设置起始帧元件为单帧
        if (element.instanceType === "symbol") {
            element.loop = "single frame";
        }

        timeline.insertKeyframe(finalFrame);

        timeline.createMotionTween(currentFrame, finalFrame);
        layer.frames[currentFrame].tweenEasing = easing;
        timeline.currentFrame+=1;

        var finalElement = layer.frames[finalFrame].elements[0];
        finalElement.selected=true;
        var rotation =  action ? -angle : angle;  // 正值表示抬头，负值表示低头
        if (timeline.camera.cameraEnabled){
            timeline.camera.cameraEnabled = false;
            doc.rotateSelection(finalElement.matrix.a<0 ? -rotation: rotation)
            timeline.camera.cameraEnabled = true;
        }else{
            doc.rotateSelection(finalElement.matrix.a<0 ? -rotation: rotation)
        }

        // 设置结束帧元件为循环
        if (finalElement.instanceType === "symbol") {
            finalElement.loop = "loop";
        }
        timeline.setSelectedFrames([currentLayer,timeline.currentFrame,timeline.currentFrame+1])

    }
    //
    // // 动画完成后显示提示
    // alert("动画创建完成！\n" +
    //     "动作: " + actionName + "\n" +
    //     "角度: " + angle + "度\n" +
    //     "持续时间: " + duration + "帧\n" +
    //     "缓动值: " + easing + "\n" +
    //     "起始帧元件设置为单帧，结束帧元件设置为循环");
}

function isKeyFrame(layer, frame) {
    return layer.frames[frame].startFrame === frame;
}

function selectLayerByElement(element) {
    var layer = element.layer;
    var layerIndices = timeline.findLayerIndex(layer.name);
    if (layerIndices.length === 0) {
        alert("该图层名字没有找到对应的索引");
    } else if (layerIndices.length > 1) {
        for (var j = 0; j < timeline.layers.length; j++) {
            if (timeline.layers[j] === layer) {
                timeline.setSelectedLayers(j);
                break;
            }
        }
    } else {
        timeline.setSelectedLayers(layerIndices[0]);
    }
}
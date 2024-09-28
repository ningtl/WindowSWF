completeHeadLiftAction();
// 固定点抬头动作，向上旋转35度然后回到原位
function completeHeadLiftAction() {
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selection = doc.selection;

    var baseFrameNum = timeline.currentFrame;
    var currentFrameNum = baseFrameNum;
    var midFrameNum = 0;
    var endFrameNum = 0;

    // 设置旋转角度
    var rotationAngle = -35; // 负值表示逆时针旋转

    if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            var eleLayer = element.layer;
            currentFrameNum = baseFrameNum;

            var index = timeline.findLayerIndex(eleLayer.name);
            var indexTrue = getCorrectLayerIndex(timeline, eleLayer, index);
            timeline.setSelectedLayers(indexTrue);

            // 创建中间关键帧（15帧后）
            midFrameNum = currentFrameNum + 15;
            timeline.insertKeyframe(midFrameNum);

            // 创建结束关键帧（30帧后）
            endFrameNum = currentFrameNum + 30;
            timeline.insertKeyframe(endFrameNum);

            var startElements = eleLayer.frames[currentFrameNum].elements;
            var midElements = eleLayer.frames[midFrameNum].elements;
            var endElements = eleLayer.frames[endFrameNum].elements;

            if (startElements.length === 1 && midElements.length === 1 && endElements.length === 1) {
                var startEle = startElements[0];
                var midEle = midElements[0];
                var endEle = endElements[0];

                // 设置旋转中心点为底部中心
                midEle.rotationCenter = {x: midEle.width / 2, y: midEle.height};
                endEle.rotationCenter = {x: endEle.width / 2, y: endEle.height};

                // 应用旋转到中间帧
                midEle.rotation = rotationAngle;

                // 结束帧回到原始状态
                endEle.rotation = 0;

                // 创建补间动画（开始到中间）
                timeline.createMotionTween(currentFrameNum, midFrameNum);
                eleLayer.frames[currentFrameNum].tweenEasing = -100; // 缓入效果

                // 创建补间动画（中间到结束）
                timeline.createMotionTween(midFrameNum, endFrameNum);
                eleLayer.frames[midFrameNum].tweenEasing = 100; // 缓出效果

                // 恢复到初始帧
                timeline.currentFrame = baseFrameNum;
            } else {
                fl.trace("图层中有多个元素，无法进行抬头旋转效果");
            }
        }
    } else {
        alert("请选择对象");
    }
}

// 辅助函数：获取正确的图层索引
function getCorrectLayerIndex(timeline, targetLayer, indices) {
    if (indices.length > 1) {
        for (var j = 0; j < timeline.layers.length; j++) {
            if (timeline.layers[j] === targetLayer) {
                return j;
            }
        }
    }
    return indices[0];
}
// 旋转放大效果
function rotateAndScale() {
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selection = doc.selection;

    var baseFrameNum = timeline.currentFrame;
    var currentFrameNum = baseFrameNum;
    var endFrameNum = 0;

    if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            var eleLayer = element.layer;
            currentFrameNum = baseFrameNum;

            var index = timeline.findLayerIndex(eleLayer.name);
            var indexTrue = index[0];
            if (index.length > 1) {
                for (var j = 0; j < timeline.layers.length; j++) {
                    if (timeline.layers[j] === eleLayer) {
                        indexTrue = j;
                    }
                }
            }
            timeline.setSelectedLayers(indexTrue);

            // 15帧后插入关键帧
            endFrameNum = currentFrameNum + 15;
            timeline.insertKeyframe(endFrameNum);

            var endElements = eleLayer.frames[endFrameNum].elements;

            if (endElements.length === 1) {
                var endEle = endElements[0];

                // 旋转180度并放大1.5倍
                endEle.rotation += 180;
                endEle.scaleX *= 1.5;
                endEle.scaleY *= 1.5;

                // 创建补间动画
                timeline.createMotionTween(currentFrameNum, endFrameNum);
                eleLayer.frames[currentFrameNum].tweenEasing = -100; // 缓入效果

                // 恢复到初始帧
                timeline.currentFrame = baseFrameNum;
            } else {
                fl.trace("图层中有多个元素，无法进行旋转放大效果");
            }
        }
    } else {
        alert("请选择对象");
    }
}

rotateAndScale();
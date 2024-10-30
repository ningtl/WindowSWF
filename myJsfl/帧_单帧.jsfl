/**
 * @another {b站 见水中月}
 */

var doc = fl.getDocumentDOM();
var timeline = doc.getTimeline();
var selection = doc.selection;

function checkDoc() {
    if (!doc) {
        alert("兄弟，你的动画文档都没打开，怎么搞？");
        return false;
    }
    return true;
}

function insertKeyFrameBySelection() {
    // 检查是否有打开的文档
    if (!checkDoc()) {
        return;
    }
    // 如果没有选择任何元素
    if (selection.length === 0) {
        var layer1 = timeline.layers[0];
        var layerType = layer1.layerType;

        // 检查是否在摄像机图层上
        if (layerType === "camera") {
            timeline.setSelectedLayers(0);
            timeline.convertToKeyframes(timeline.currentFrame);
        } else {
            alert("没有选择元件所在的图层，也没有摄像机图层，无法插入关键帧。");
        }
        return;
    }

    var savedSelectionList = fl.getDocumentDOM().getTimeline().getSelectedFrames();
    var currentFrame = timeline.currentFrame;
    // 循环选中的对象
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i]; // 获取选中元件

        // 获取元件所在的图层
        var layer = element.layer;

        // 通过图层名称查找图层索引
        var layerIndices = timeline.findLayerIndex(layer.name);

        if (layerIndices.length > 1) {
            alert("你的图层名字有重复，请检查并修改图层名字：" + layer.name);

            return;
        } else if (layerIndices.length === 0) {
            alert("找不到图层的索引，请检查图层名称：" + layer.name);
            return;
        }

        var layerIndex = layerIndices[0];
        timeline.currentLayer = layerIndex;
        // 在当前帧插入关键帧
        timeline.convertToKeyframes(currentFrame);
    }
    for (var i = 0; i < savedSelectionList.length/3; i++) {
        savedSelectionList[i*3+1]= currentFrame;
        savedSelectionList[i*3+2]= currentFrame+1;
    }

    // 设置最后一个元素的播放方式为单帧播放
    var lastElements = timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements;
    lastElements.forEach(function (ele){
        ele.loop = "single frame";  // 设置为单帧循环播放
        ele.selected = true;
    })
    fl.getDocumentDOM().getTimeline().setSelectedFrames(savedSelectionList);

}

// 调用插入关键帧函数
insertKeyFrameBySelection();



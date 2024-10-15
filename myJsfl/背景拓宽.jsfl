//ai

var doc = fl.getDocumentDOM();
var selection = doc.selection;
if (selection.length === 0) {
    alert("请选中一个对象。");
} else {
    // 如果选中了多个对象
    if (selection.length > 1) {
        alert("只能选中一个项目。");
    } else {
        fl.getDocumentDOM().convertToSymbol('graphic', '', 'center');
        fl.getDocumentDOM().enterEditMode('inPlace');
        // 将选中的对象转换为图形符号，并进入就地编辑模式。

        flipVertical();
    }
}

function flipVertical() {
    // 获取 Flash 文档对象。
    var doc = fl.getDocumentDOM();

    // 获取当前文档中的选中对象集合。
    var selection = doc.selection;

    var selectedObject = selection[0];
    var width = selectedObject.width;
    var height = selectedObject.height;
    var mcx = selectedObject.x;
    var mcy = selectedObject.y;
    // 如果有选中对象，获取其宽度、高度和坐标信息。

    // fl.trace("对象宽度：" + width + "，对象高度：" + height + "，对象 x 坐标：" + mcx + "，对象 y 坐标：" + mcy);

    var originalSelection = doc.selection;
    for (var i = 0; i < 8; i++) {
        doc.duplicateSelection();
    }
    // 循环复制选中对象 8 次。

    doc.selectAll();
    var allCopiedElements = doc.selection;
    var shuzhi = 3;
    // 选择所有对象，并定义一个变量 shuzhi。

    var positions = [
        { x: mcx + width - shuzhi, y: mcy },
        { x: mcx - width + shuzhi, y: mcy },
        { x: mcx, y: mcy + height - shuzhi },
        { x: mcx, y: mcy - height + shuzhi },
        { x: mcx - width + shuzhi, y: mcy - height + shuzhi },
        { x: mcx - width + shuzhi, y: mcy + height - shuzhi },
        { x: mcx + width - shuzhi, y: mcy - height + shuzhi },
        { x: mcx + width - shuzhi, y: mcy + height - shuzhi }
    ];
    // 定义一个包含多个坐标对象的数组，表示复制对象要移动到的位置。

    if (allCopiedElements.length > 0) {
        for (var j = 0; j < allCopiedElements.length; j++) {
            if (j >= originalSelection.length) {
                if (positions[j - originalSelection.length] === undefined) {
                    fl.trace('错误：索引超出范围。当前索引 j：', j, '，原始选中对象数量：', originalSelection.length, '，计算后的索引：', j - originalSelection.length);
                } else {
                    allCopiedElements[j].x = positions[j - originalSelection.length].x;
                    allCopiedElements[j].y = positions[j - originalSelection.length].y;
                }
                // 如果复制的对象索引超出原始选中对象数量，检查对应位置是否有效，若有效则将复制对象移动到指定位置。

                if (j === 1) {
                    allCopiedElements[j].scaleX *= -1; // 水平翻转
                } else if (j === 2) {
                    allCopiedElements[j].scaleX *= -1; // 水平翻转
                } else if (j === 3 || j === 4) {
                    allCopiedElements[j].scaleY *= -1; // 垂直翻转
                } else {
                    allCopiedElements[j].scaleX *= -1; // 水平翻转
                    allCopiedElements[j].scaleY *= -1; // 垂直翻转
                }
                // 根据不同的索引对复制对象进行水平或垂直翻转操作。
            }
        }
    } else {
        fl.trace('没有复制到任何对象。');
    }
    fl.trace('背景拓展完成。');
    fl.getDocumentDOM().exitEditMode();
    // 退出编辑模式，并给出提示信息。
}
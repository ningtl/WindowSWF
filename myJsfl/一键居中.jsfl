//一键居中  就是元件到注册点居中
adjustSymbolRegistrationPoint();
function adjustSymbolRegistrationPoint() {
    var doc = fl.getDocumentDOM();
    if (doc.selection.length === 0) return; // 如果没有选中元件，则退出

    // 获取当前选中元件
    var selectedSymbol = doc.selection[0];

    selectedSymbol.scaleX =1;
    selectedSymbol.scaleY = 1;
    // 获取元件的原始位置
    var originalX = selectedSymbol.x;
    var originalY = selectedSymbol.y;

    // 进入元件编辑模式
    doc.enterEditMode();

    // 选择元件内部所有内容并移动它
    doc.selectAll();

    // 获取选中内容的边界
    var bounds = doc.getSelectionRect();
    var centerX = (bounds.right + bounds.left) / 2;
    var centerY = (bounds.bottom + bounds.top) / 2;

    // 计算偏移量，使内容以新的注册点居中
    var offsetX = -centerX;
    var offsetY = -centerY;

    // 移动内容
    doc.moveSelectionBy({x: offsetX, y: offsetY});

    // 退出编辑模式
    doc.exitEditMode();

    selectedSymbol.x = selectedSymbol.skewY > 0 ? originalX + offsetX : originalX - offsetX;

    selectedSymbol.y = selectedSymbol.skewX>0 ? originalY + offsetY : originalY - offsetY;

    // 设置变换点为新的注册点
    // var s2 = "originalX=" + originalX + "  originalY=" + originalY + "  selectedSymbol.x="+selectedSymbol.x + "   selectedSymbol.y=" + selectedSymbol.y ;
    // fl.trace(s2);

    selectedSymbol.setTransformationPoint({x: 0, y: 0});
}





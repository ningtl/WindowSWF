exchangeHeadModel();
/**
 1. 左边是完成的万能头,  右边是需要替换目标头部
 2. 优化目标: 调整xy  和 宽度比例,  用户可说动调整
 */
function exchangeHeadModel(){
    var doc = fl.getDocumentDOM();
    var selection = doc.selection;
    if (doc==null){
        alert("请打开 .fla 文件");
        return
    }
    if (selection.length!=2){
        alert("替换万能头: 必须需要选择两个元件,有表情的在左边你,没表情的在右边")
        return;
    }
    //筛选不同对象
    var sourceModel = null;
    var targetModel = null;
    if (selection[0].x < selection[1].x){
        sourceModel = selection[0];
        targetModel = selection[1];
    }else {
        sourceModel = selection[1];
        targetModel = selection[0];
    }
    doc.selectNone();
    sourceModel.selected=true;
    //source 需要直接复制元件
    doc.library.duplicateItem(sourceModel.libraryItem.name);
    doc.swapElement(sourceModel.libraryItem.name+ " 复制");

    an.getDocumentDOM().enterEditMode('inPlace');

    doc = an.getDocumentDOM();
    var newtl = doc.getTimeline();
    var element = newtl.layers[1].frames[0].elements[0];
    doc.selectNone()
    newtl.setSelectedLayers(1);
    element.selected=true;
    an.getDocumentDOM().library.duplicateItem(element.libraryItem.name);
    doc.swapElement(element.libraryItem.name+ " 复制");

    an.getDocumentDOM().enterEditMode('inPlace');
    doc = an.getDocumentDOM();
    var newtl = doc.getTimeline();
    var element = newtl.layers[1].frames[0].elements[0];
    doc.selectNone()
    newtl.setSelectedLayers(1);
    element.selected=true;
    an.getDocumentDOM().swapElement(targetModel.libraryItem.name);
}


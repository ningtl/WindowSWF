/**  见水中月
 步骤解析
 1. 复制最外层元件
 2. 选中
 3. 进入编辑模式
 4. 选中
 5. 复制
 6. 进入编辑模式
 7. 选中
 8. 交换
 */
changeHead()
function changeHead() {
    var doc = an.getDocumentDOM();
    doc.selectAll();
    var selection = doc.selection;
    if (doc==null){
        alert("请打开 [.fla]文件");
        return;
    }
    if (selection.length !=2){
        alert("舞台只能有两个元件");
        return;
    }
    selection.sort(function (a, b) { return a.x -b.x });
    var sourceHead = selection[0];
    var targetHead = selection[1];
    targetHead.selected = false;

    copyLibEleInDoc(sourceHead);

    doc.enterEditMode('inPlace');
    var timeline = doc.getTimeline();
    var element = timeline.layers[1].frames[0].elements[0];
    element.selected=true;
    copyLibEleInDoc(element);

    an.getDocumentDOM().enterEditMode('inPlace');

    var timeline = doc.getTimeline();
    var element = timeline.layers[1].frames[0].elements[0];
    element.selected=true;

    an.getDocumentDOM().swapElement(targetHead.libraryItem.name);
    an.getDocumentDOM().exitEditMode();
    an.getDocumentDOM().exitEditMode();
}

function copyLibEleInDoc(ele){
    var doc = an.getDocumentDOM();
    doc.library.duplicateItem(ele.libraryItem.name);
    doc.swapElement(ele.libraryItem.name+" 复制");
}
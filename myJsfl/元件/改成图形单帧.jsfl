
loopSingerAll();
function loopSingerAll(){
    var doc = fl.getDocumentDOM();
    var selection = doc.selection;
    var lib = an.getDocumentDOM().library;
    if (doc==null){
        alert("单帧循环切换: 请打开 [.fla] 文件")
        return;
    }
    if (selection.length===0){
        alert("单帧循环切换: 舞台上并没有选择要操作的元件")
    }
    doc.selectNone();
    selection.forEach(function (ele ){
        ele.selected=true;

        doc.setElementProperty('symbolType', 'graphic');
        lib.selectItem(ele.libraryItem.name,true);

        lib.setItemProperty('symbolType', 'graphic');
        ele.loop="single frame";
        ele.selected=false;
    })
}



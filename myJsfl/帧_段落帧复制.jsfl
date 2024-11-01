function copySelectFrame(){
    var doc = an.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    var start = selectedFrames[1];
    if (selectedFrames.length===0){
        alert("没有选中帧");
        return;
    }
    var end = selectedFrames[selectedFrames.length-1];
    // traceEle(selectedFrames)
    //计算选中帧的差值
    var difference = end - start;


    timeline.copyFrames(start,end);
    timeline.setSelectedFrames(end+1,end+1,true);

    timeline.pasteFrames();
    //重新选中
    timeline.setSelectedFrames(start + difference +1,end + difference +1,true);
}
copySelectFrame()
function traceEle(ele){
    for (var i in ele) {
        fl.trace("属性 i=" + i + "    值=" + ele[i]);
    }
}
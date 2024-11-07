/**
 * @author见水中月
 * @param frame
 */
function insertKeFrame(frame) {
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    if (selectedFrames.length === 0){
        return;
    }
    for (var i = 0; i < selectedFrames.length; i+=3) {
        selectedFrames[i+1]=frame-1;
        selectedFrames[i+2]=frame;
    }
    timeline.setSelectedFrames(selectedFrames);
    an.getDocumentDOM().getTimeline().convertToKeyframes();
    timeline.setSelectedFrames(selectedFrames);

}


getNumForUser();
function getNumForUser(){
    var frame = prompt("请输入你想要插入的帧:", "10");
    if (frame === null) return; // 用户点击取消
    frame = parseInt(frame);
    insertKeFrame(frame);
}
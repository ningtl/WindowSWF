/**
 * @author 见水中月
 */

function repeat(){
    var action = confirm("跨多帧复制?：确定为跨多帧，取消紧贴帧复制");
    var targetFrame = 0;
    var frequency = 0;
    if (action){
        targetFrame = prompt("请输入制定要复制到哪个帧:", "0");
    }else{
        frequency = prompt("请输入要复制多少段:", "5");
    }
    if (targetFrame ==null || frequency == null)return;
    try{
        frequency = parseInt(frequency);
        targetFrame = parseInt(targetFrame);
    }catch (e){
        alert("输入数字谢谢");
        return;
    }
    if (action){
        copyToTargetFrame(targetFrame)
    }else {
        for (var i = 0; i < frequency; i++) {
            var selectedFrames = doc.getTimeline().getSelectedFrames();
            var number = selectedFrames[2]-selectedFrames[1];
            copyToTargetFrame2(number);
        }
    }
}

function copyToTargetFrame(targetFrame) {
    var doc = an.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    timeline.copyFrames();
    for (var i = 0; i < selectedFrames.length; i+=3) {
        selectedFrames[i+1]=targetFrame-1;
        selectedFrames[i+2]=targetFrame;
        // fl.trace()
    }
    timeline.setSelectedFrames(selectedFrames);
    timeline.pasteFrames();
    timeline.setSelectedFrames(selectedFrames);
}
function copyToTargetFrame2(targetFrame) {
    var doc = an.getDocumentDOM();
    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    timeline.copyFrames();
    for (var i = 0; i < selectedFrames.length; i+=3) {
        selectedFrames[i+1]+=targetFrame;
        selectedFrames[i+2]+=targetFrame;
        // fl.trace()
    }
    timeline.setSelectedFrames(selectedFrames);
    timeline.pasteFrames();
    timeline.setSelectedFrames(selectedFrames);
}

repeat()
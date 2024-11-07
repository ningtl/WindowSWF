/**
 * @another {b站 见水中月}
 */
//优化  带上子图层一起单帧
insertKeyFrameOnSel()

function insertKeyFrameOnSel(){
    var doc = fl.getDocumentDOM();
    if (!doc) {
        alert("请打开 [.fla] 文件");
        return;
    }

    var timeline = doc.getTimeline();
    var selectedFrames = timeline.getSelectedFrames();
    var currentFrame = timeline.currentFrame;
    for (var i = 0; i < selectedFrames.length; i+=3) {
        selectedFrames[i+1] = currentFrame;
        selectedFrames[i+2] = currentFrame +1;
    }
    timeline.setSelectedFrames(selectedFrames);
    timeline.convertToKeyframes();
    timeline.setSelectedFrames(selectedFrames);
    var elements = doc.selection;
    elements.forEach(function (ele) {
        ele.loop = "single frame";
    })

}
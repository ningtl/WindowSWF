/**
 * 根据关键帧长度设置音频播放范围
 * @author B站：见水中月
 * @param {number} splitFrame - 进行音频拆分的关键帧位置
 */
function splitAudioAtFrame(splitFrame) {
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var currentFrame = timeline.currentFrame;
    var frame = timeline.layers[timeline.currentLayer].frames[splitFrame];
    var soundEnvelopeLimits = frame.getSoundEnvelopeLimits();  //1472 = 1frame
    //优先检查当前段上有没有音频文件
    // var soundEnvelope = frame.getSoundEnvelope(); xiaoguo
    // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )
    // fl.trace(soundEnvelopeLimits.end + "  " +soundEnvelopeLimits.start )
    if (soundEnvelopeLimits===null){
        alert("no sound");
        return;
    }
    //查看上一个关键帧的位置
    var soundLibraryItem = frame.soundLibraryItem;
    var startFrame = frame.startFrame;//都是从0开始

    //插入关键帧
    timeline.insertKeyframe(splitFrame);

    //打双帧拆分
    var newStart = (splitFrame-startFrame)*1472 + soundEnvelopeLimits.start;
    // fl.trace(soundEnvelopeLimits.start + "   " +newStart )
    soundEnvelopeLimits.start=newStart;

    splitFrame+=5;
    timeline.insertKeyframe(splitFrame);
    var nextFrame = timeline.layers[timeline.currentLayer].frames[splitFrame];
    nextFrame.soundLibraryItem=soundLibraryItem;


    nextFrame.setSoundEnvelopeLimits(soundEnvelopeLimits);
}
splitAudioAtFrame(fl.getDocumentDOM().getTimeline().currentFrame);

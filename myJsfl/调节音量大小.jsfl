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
    // var soundEnvelopeLimits = frame.getSoundEnvelopeLimits();  //1472 = 1frame
    //优先检查当前段上有没有音频文件
    var soundEnvelope = frame.getSoundEnvelope();
    // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )
    var easing = prompt("请输入百分比 (0-100):", "70");
    if (easing === null) return; // 用户点击取消
    easing = parseInt(easing);
    soundEnvelope[0].leftChannel = soundEnvelope[0].leftChannel* (easing/100);
    soundEnvelope[0].rightChannel = soundEnvelope[0].rightChannel* (easing/100);

    var mark = soundEnvelope[0].mark;

    var number = Math.floor(32768/100*easing)
    newSoundEnvelope= [
        {leftChannel: number,rightChannel:number,mark:mark}
    ]
    // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )
    frame.setSoundEnvelope(newSoundEnvelope)

}
splitAudioAtFrame(fl.getDocumentDOM().getTimeline().currentFrame);

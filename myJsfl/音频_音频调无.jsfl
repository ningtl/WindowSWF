/**
 * 根据关键帧长度设置音频播放范围
 * @author B站：见水中月
 * @param {number} splitFrame - 进行音频拆分的关键帧位置
 */
function splitAudioAtFrame(splitFrame) {
    an.getDocumentDOM().getTimeline().setFrameProperty('soundName', '无');

}
splitAudioAtFrame(fl.getDocumentDOM().getTimeline().currentFrame);

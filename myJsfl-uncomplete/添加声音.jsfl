// The following example adds the currently selected item to the Stage at the (3, 60) position:
//     fl.getDocumentDOM().library.addItemToDocument({x:3, y:60});
//
// The following example adds the item Symbol1 located in folder1 of the library to the Stage at the (550, 485) position:
//     fl.getDocumentDOM().library.addItemToDocument({x:550.0, y:485.0}, "folder1/Symbol1");

var doc = fl.getDocumentDOM();//获取文档对象，就是你当前打开的那个文件，比如 test.fla, 这个文件的所有内容都在这个对象里面
var timeline = doc.getTimeline(); //获取时间轴对象，就是 软件的 时间轴那个界面的所有数据， 比如图层-layer  帧-frame 都在这个对象里面
var selection = doc.selection;//获取当前选中的对象数组， 就是你在界面 选中的对象，可能多个就是数组了
function fangdai(num){
    if (doc==null) {
        alert("兄弟你的动画文档都打开 怎么搞？")
        return 1;
    }
    if (num === 0){
        alert("兄弟，你没有选择元件啊， 我要对什么操作呢？");
        return 1;
    }
}
    // fl.getDocumentDOM().library.addItemToDocument({x:550.0, y:485.0}, "ac-audio affects/character movement/衣服抖动+3.clothwav");//搜索图层  voice  没有就要新建一个voice

/**
 * 想舞台中添加声音 会创建一个图层为 voice
 * @param frameNum 帧数
 * @param pathName 文件滤镜
 */
function addSounds(frameNum,pathName){
    var numbers = timeline.findLayerIndex("voice");
    //多个
    var voiceIndex = -1;
    if (numbers.length>1){
        alert("关于voice 的图层有多个， 请先改名");
        return;
    }
    //没有
    if (numbers.length === 0){
        voiceIndex = timeline.addNewLayer("voidce","normal",true);
    }else{
        voiceIndex = numbers[0];
    }
    //要插入的帧。
    var layer = timeline.layers[voiceIndex];
    //判断当前帧是否为关键帧，如果当前侦 不是关键帧， 那就进行插入
    var startFrame = layer.frames[frameNum].startFrame; //因为是所以， 必须要+1
    if (startFrame+1 != frameNum)timeline.insertKeyframe(frameNum);

    fl.getDocumentDOM().library.addItemToDocument({x:0, y:0}, pathName);//搜索图层  voice  没有就要新建一个voice
}

var doc = fl.getDocumentDOM();
// 获取当前打开的 Flash（Animate）文档的文档对象模型（DOM），并将其赋值给变量 doc。
// 通过这个文档对象，可以访问和操作当前文档的各种属性和方法，比如获取时间轴、选择的对象、图层等。

var timeline = doc.getTimeline();
// 使用前面获取到的文档对象 doc，调用其 getTimeline 方法来获取当前文档的时间轴对象，并将其赋值给变量 timeline。
// 时间轴对象包含了文档中的所有图层、帧以及与时间轴相关的信息，可以通过这个对象进行对时间轴的各种操作，如插入关键帧、设置帧属性、查找图层等。

// 在当前时间轴的当前帧插入关键帧
timeline.insertKeyframe(timeline.currentFrame);

// 获取当前图层当前帧的第一个元素
var element;
var frameElements = timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements;
if (frameElements.length > 0) {
    element = frameElements[0];
} else {
    alert("图层上没有东西");
}

// 设置元素循环模式为“loop”
element.loop = "loop";
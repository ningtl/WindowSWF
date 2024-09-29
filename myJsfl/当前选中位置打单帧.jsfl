/**
 * @another {b站 见水中月}
 * @文件放置位置：C:\Users\{自己的用户文件夹}\AppData\Local\Adobe\Animate 2024\zh_CN\Configuration\Commands
 * @看主页教程视频更详细
 */

//1.获取文档级别变量
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

insertKeyFrameBySelection();

/**
 * 将你选择的元件所在的图层 所在的当前值 插入关键正
 * 如果图层名字有重复的那么久 提示
 * 并且之后 元件为单帧
 */
function insertKeyFrameBySelection(){
    if (fangdai(selection.length)){//防止小呆呆一样的操作
        return;
    }
    //循环 选中对象
    for (var i = 0; i < selection.length; i++) {
        //获取 但个元件 对象
        var element = selection[i];

        //获取当前所在图层对象
        var layer = element.layer;

        // 时间轴 通过 图层名字 查找对应的下边， 可能会有重名的 图层名字， 提示用户进行修改名字
        var numbers = timeline.findLayerIndex(layer.name);
        if (numbers.length>1){
            alert("你的图层名字有重复，请检查修改图层名字:  " + layer.name)
            return;
        }else if (numbers.length ===0){
            alert("根据图层名字找不到所在图层的索引:  " + layer.name)
            return;
        }

        //选定当前图层
        timeline.currentLayer = numbers[0];

        //在当前帧数 插入关键帧
        timeline.insertKeyframe(timeline.currentFrame);

        //选择图层进行一个刷新图层的操作
        timeline.setSelectedLayers(numbers[0]);
    }
    //最后一个键进行选中可跳帧单帧还是什么
    var element = timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements[0];
    // * @since Flash MX 2004
    //  * @type {"loop"|"play once"|"single frame"}
    //  */
    // SymbolInstance.prototype.loop = undefined;
    element.loop="single frame"; //设置你的元件单帧  循环 播放一次
    element.selected=true;

}

// function insertKeyFrame(FrameNum){
//     //时间轴对象， 插入关键帧  其实你可以直接拿这句话用  这里只是方便理解方法
//     var currentFrame = timeline.currentFrame;
//     var currentLayer = timeline.currentLayer;
//     timeline.insertKeyframe(FrameNum);
//     fl.getDocumentDOM().selection[0].firstFrame;
//     var element = timeline.layers[currentLayer].frames[currentFrame].elements[0];
//     element.selected=true;
// }
// frame.motionTweenOrientToPath
/**
 * 上面那个方法的调用
 * 这个括号里面就是你需要填入的参数，  这里 timeline.currentFrame 还就是当前时间轴的那个帧
 * 这里调用完成的功能就是在当前侦 插入关键帧
 * */
// insertKeyFrame(timeline.currentFrame);//调用一次 那就是创建一个关键帧在当前帧数
// insertKeyFrame(timeline.currentFrame+1);//调用两次， 就是打双帧， 当前侦跟后一个帧都转换为关键帧
// 等价于
//timeline.insertKeyframe(timeline.currentFrame);
//timeline.insertKeyframe(timeline.currentFrame+1);

//作者： 见水中月
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

flipVertical();

//只对一个元件进行水平翻转
function flipVertical(){

    if (fangdai(selection.length)) return;

    var ele = selection[0];


    ele.scaleX = -ele.scaleX;
}

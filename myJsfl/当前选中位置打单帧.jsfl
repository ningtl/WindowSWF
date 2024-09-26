/**
 * @another {b站 见水中月}
 * @文件放置位置：C:\Users\{自己的用户文件夹}\AppData\Local\Adobe\Animate 2024\zh_CN\Configuration\Commands
 * @前言： 你在Animate cc软件上面的操作，都可以用代码来替换o(￣▽￣)ｄ
 * @类型： 脚本/轻量级，不需要安装，直接放置使用。  多了不方便管理， 插件： 脚本躲多起来我会研究，现在比较少没必要
 * @技术手册： 私信问我吧，这块api（技术手册） 我只有22年的英文版，非常过时，还有个github链接文档，相对全面还是过时，只能看源码魔法找论坛这样子
 */

//1.获取文档级别变量
var doc = fl.getDocumentDOM();//获取文档对象，就是你当前打开的那个文件，比如 test.fla, 这个文件的所有内容都在这个对象里面
var timeline = doc.getTimeline(); //获取时间轴对象，就是 软件的 时间轴那个界面的所有数据， 比如图层-layer  帧-frame 都在这个对象里面
var selection = doc.selection;//获取当前选中的对象数组， 就是你在界面 选中的对象，可能多个就是数组了
Frame
/**
 * //超级简单的功能-创建关键帧
 * 函数，这是功能  需要调用才会执行这个功能，也就是你新开一个地方  复制过去用方法就行了
 * 在选择对象的地方创建关键帧。  也就是选中了对象，不用再去那个关键帧那边慢慢点选了
 * @Params（变量） {数字}想要创建关键帧的帧数
 */
function insertKeyFrame(FrameNum){
    //时间轴对象， 插入关键帧  其实你可以直接拿这句话用  这里只是方便理解方法
    timeline.insertKeyframe(FrameNum);
}

/**
 * 上面那个方法的调用
 * 这个括号里面就是你需要填入的参数，  这里 timeline.currentFrame 还就是当前时间轴的那个帧
 * 这里调用完成的功能就是在当前侦 插入关键帧
 * */
insertKeyFrame(timeline.currentFrame);//调用一次 那就是创建一个关键帧在当前帧数
// insertKeyFrame(timeline.currentFrame+1);//调用两次， 就是打双帧， 当前侦跟后一个帧都转换为关键帧
// 等价于
//timeline.insertKeyframe(timeline.currentFrame);
//timeline.insertKeyframe(timeline.currentFrame+1);

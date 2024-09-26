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


//
// var baseFrameNum = timeline.currentFrame;//记录初始的
// var currentFrameNum = timeline.currentFrame;//当前选中的帧数
// var tenFrameNum = 0;//10帧变量
// var eleFrameNum = 0;//11转转头变量 添加滤镜
// var octFrameNum = 0;//12帧 消除滤镜 恢复
//
// // 2.整合方法，无论选择一个还是多个 循环进行翻转
// if (selection.length>0){
//     for (var i = 0; i < selection.length; i++) {
//         //循环前， 要根据这个选择的对象 确定所在的图层对象
//         //1. 获取选中元素 和 当前帧数
//         var element = selection[i];
//         var eleLayer = element.layer;// 这就是对象所在的图层
//         currentFrameNum = baseFrameNum;
//
//         //额外插入  因为是循环功能，所以呢要确认选择的图层才能针对图层的时间轴去创建
//         var index = timeline.findLayerIndex(eleLayer.name);//根据图层名字取查找 索引
//         var indexTrue = index[0];// 因为图层名字有重复的，所有这边直接用 对象去比对获得正确的索引
//         if (index.length>1){//我曹  真心无语 ，测试的时候基本上能踩的坑全踩了个遍
//             for (var j = 0; j < timeline.layers.length; j++) {
//                 if(timeline.layers[j] === eleLayer){
//                     indexTrue = j;
//                 }
//             }
//         }
//         timeline.setSelectedLayers(indexTrue);
//
//         //2. 10帧之后插入关键帧
//         tenFrameNum = currentFrameNum + 5;
//         timeline.insertKeyframe(tenFrameNum);
//
//         //3. 获取当前帧的 所有元素
//         var tenElements = eleLayer.frames[tenFrameNum].elements;
//
//         //4. 设置10帧后的一个状态
//         //确保只有一个元素，一个图层一个元素， 多的转换元件补间会出问题
//         if (tenElements.length===1){
//             // 5. 向右移动并缩小宽度 此处可以抽取为一个函数  但是懒 不固定数值 可以用百分比
//             var tenEle = tenElements[0]; //获取图层唯一的 对象
//             //抽取一个整数吧
//             var v1 = Math.floor(tenEle.x/20); //位移10分之宽度
//             var v2 = Math.floor(tenEle.width/20);
//             tenEle.x += v1;
//             tenEle.width -= v2;
//
//             // 6. 创建补间动画 设置缓动强度
//             timeline.createMotionTween(currentFrameNum, tenFrameNum);
//                 //设置缓动效果强度 100
//             eleLayer.frames[currentFrameNum].tweenEasing = 100;
//
//             //7. 在11侦进行一个翻转恢复图形
//             eleFrameNum = tenFrameNum +1; //设置关键帧数
//             timeline.insertKeyframe(eleFrameNum)
//             timeline.currentFrame = eleFrameNum;
//                 //7.1 获取元素进行翻转
//             eleEle = eleLayer.frames[eleFrameNum].elements[0];
//             eleEle.x -= v1;
//             eleEle.width += v2;
//             eleEle.scaleX = -eleEle.scaleX;
//             // alert(eleLayer.name + "" + index);
//             //8。 添加了滤镜
//             //创建一个 模糊滤镜  后面是一个 函数 下面可以查看
//             var myFilter = createBlurFilter(40, 4, 100);
//             //将 模糊滤镜刷入 图层过滤器 制定 帧
//             var filters = eleLayer.getFiltersAtFrame(eleFrameNum) || [];
//             filters.push(myFilter);
//             eleLayer.setFiltersAtFrame(eleFrameNum, filters);// 帧界别 生成模糊滤镜
//
//             //9. 创建第12帧关键帧，恢复滤镜完整转头效果即可
//             octFrameNum = eleFrameNum + 1;
//             timeline.insertKeyframe(octFrameNum);
//             timeline.currentFrame = octFrameNum;
//             //取消此帧的滤镜效果
//             eleLayer.setFiltersAtFrame(octFrameNum, []);
//
//             // fl.trace("完成一次循环" + ";layer" + eleLayer.name);
//
//             //完成之后回到 初始侦
//             timeline.currentFrame = baseFrameNum;
//         }else{
//             an.trace("在4.你图层中有多个元素，不能进行翻转")
//         }
//     }
// }else{
//     alert("你没有选择对象");
// }
//
// /*
// // 添加模糊滤镜
// function changeElementType() {
//     // 8. 将元素转换为影片剪辑
//     if (eleEle.symbolType === "graphic") {
//         // **直接操作该元素并转换为影片剪辑类型**
//         doc.selection[0] = eleEle;
//         doc.convertToSymbol('movie clip', '0', 'top left');
//         fl.trace("选中的元件已转换为影片剪辑类型。");
//
//         // 检查是否转换成功
//         if (eleEle.symbolType === "movie clip") {
//             fl.trace("元件转换为影片剪辑成功。");
//         } else {
//             fl.trace("转换为影片剪辑失败。");
//         }
//     }
//     // 9. 添加模糊滤镜（如有必要）
//     doc.addFilter("blurFilter");
//     var filters = eleEle.filters || [];
//
//     if (filters.length > 0) {
//         var blurFilter = filters[0];
//         blurFilter.blurX = 30;
//         blurFilter.blurY = 10;
//         eleEle.filters = filters;
//         fl.trace("模糊滤镜已应用。");
//     }
// }
// */
//
// function createBlurFilter(blurX, blurY, strength) {
//     var blurFilter = {
//         "name": "blurFilter",
//         "enable": true,
//         "blurX": blurX,
//         "blurY": blurY,
//         "strength": strength
//     }
//     return blurFilter;
// }

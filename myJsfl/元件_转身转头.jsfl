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

overturn();


//优化 一键翻身。 可以选择多个元件翻转
// 1.弹出确认框， 确定右边， 错误左边
// 2。多个元件选择 同时翻转
function overturn(){
    //防呆判断
    if (fangdai(selection.length)) return;

    //确认是左边还是右边
    var isRight = false;
    var b = confirm("是否往右边移动，确认往右边，取消往左边");
    if (b) isRight = true;

    //此处记录开始关键帧的位置
    var currentFrameNum = timeline.currentFrame;
    //此处设置下一个关键的位置
    var nextOneFrameNum = timeline.currentFrame+5;
    //此处设置模糊关键的位置
    var nextTowFrameNum = nextOneFrameNum +1;
    //此处设置翻转完成之后关键的位置
    var nextThreeFrameNum = nextTowFrameNum +1;


    ////一个元件， 一个图层 进行完成
    for (var i = 0; i < selection.length; i++) {
        //1， 获取第一个选中的元件对象  与 所在图层对象
        var element = selection[i];
        var layer = element.layer;//这就是对象所在的图层

        //插入关键帧之前就要先选择图层先，  因为多个元件 是选中的最下面那个图层
        //2. 多个元素循环的时候 就要根据元件 确认对应的图层  函数 可以找对应的看  这一步得优先

        selectLayerByElement(element);

        //判断当前帧是否为关键帧，如果当前侦 不是关键帧， 那就进行插入
        var startFrame = layer.frames[currentFrameNum].startFrame; //因为是所以， 必须要+1
        if (startFrame+1 != currentFrameNum)timeline.insertKeyframe(currentFrameNum)

        //3. 写一个关键帧位置 插入 关键帧
        timeline.insertKeyframe(nextOneFrameNum);

        //3. 获取1 下一个关键帧之后的元素  照理说应该不用判断是否含有多个元素了， 因为先前已经判断过了
        var oneElements = layer.frames[nextOneFrameNum].elements;
        if (oneElements.length!=1){
            alert("下一个关键帧元件不是一个，可能没有可能多个，不能正确创建补间");
            return;
        }
        var oneElement = oneElements[0];

        //缩减的 x 与 宽度 近似关系为  50/7
        // 变形 x 为 2/100 比较好一点吧  那么 对应的宽度  x*14/100*50
        var width = Math.floor(oneElement.width*1/10); //变形百分之2 //数据不对头  软件显示600 实际只有97
        var x = Math.floor(width*14/50);// 根据上面的关系确定近似值
        // alert("款 = " + width + "   asdfsd" +  x);

        //4. 根据上面选择的  确实是左边还是右边 进行形变
        if (isRight){
            oneElement.width -= width;
            oneElement.x += x;
        }else {
            oneElement.width -= width;
            oneElement.x -= x;
        }
        // alert(oneElement.width + "   " + oneElement.x)
        // 5. 创建补间动画 设置缓动强度
        timeline.createMotionTween(currentFrameNum, nextOneFrameNum);
        //设置缓动效果强度 100
        layer.frames[currentFrameNum].tweenEasing = 100;

        //6. 在下两个关键帧  翻转恢复 元件   并且刷入滤镜
        timeline.insertKeyframe(nextTowFrameNum)
        timeline.currentFrame = nextTowFrameNum;

        //7.1 获取元素进行翻转
        var towElement = layer.frames[nextTowFrameNum].elements[0];
        if (isRight){
            towElement.scaleX = -towElement.scaleX;
            towElement.width += width;
            towElement.x -= x;
        }else {
            towElement.scaleX = -towElement.scaleX;
            towElement.width += width;
            towElement.x += x;
        }

        // alert(towElement.width + "   " + towElement.x)
        //8。 添加了滤镜
        //创建一个 模糊滤镜  后面是一个 函数 下面可以查看
        var blurFilter = createBlurFilter(40, 4, 100);
        //将 模糊滤镜刷入 图层过滤器 指定 帧
        var filters = layer.getFiltersAtFrame(nextTowFrameNum) || [];
        //输入数组
        filters.push(blurFilter);
        layer.setFiltersAtFrame(nextTowFrameNum, filters);// 帧级别 生成模糊滤镜

        //9. 创建第12帧关键帧，恢复滤镜完整转头效果即可
        timeline.insertKeyframe(nextThreeFrameNum);
        timeline.currentFrame = nextThreeFrameNum;

        //取消此帧的滤镜效果
        layer.setFiltersAtFrame(nextThreeFrameNum, []);
        timeline.currentFrame = currentFrameNum;

    }

    var pathNameHead = "voice/摇头.mp3";//自己那个声音的路径
    var pathNameCloth = "voice/衣服抖动cloth.wav";//自己那个声音的路径

    //如果只有一个元素 我就默认是转头， 如果是选中连个元素 那就默认是翻身
    if (selection.length===1){
        addSounds(currentFrameNum,pathNameHead)
    }else{
        addSounds(currentFrameNum,pathNameCloth)
    }

}




//优化功能： 转身 创建图层 voice 然后添加制定的音频
// The following example adds the currently selected item to the Stage at the (3, 60) position:
//     fl.getDocumentDOM().library.addItemToDocument({x:3, y:60});
//
// The following example adds the item Symbol1 located in folder1 of the library to the Stage at the (550, 485) position:
//     fl.getDocumentDOM().library.addItemToDocument({x:550.0, y:485.0}, "folder1/Symbol1");
//"ac-audio affects/character movement/衣服抖动+3.clothwav"
/**
 * 想舞台中添加声音 会创建一个图层为 voice
 * @param frameNum 帧数
 * @param pathName 文件滤镜
 */
function addSounds(frameNum,pathName){
    var numbers = timeline.findLayerIndex("voice") || [];
    //多个
    var voiceIndex = -1;
    if (numbers.length>1){
        alert("关于voice 的图层有多个， 请先改名");
        return;
    }
    //没有
    if (numbers.length === 0){
        // alert(numbers.length)
        voiceIndex = timeline.addNewLayer("voice","normal",true);
    }else{
        voiceIndex = numbers[0];
    }
    //要插入的帧。
    var layer = timeline.layers[voiceIndex];
    //判断当前帧是否为关键帧，如果当前侦 不是关键帧， 那就进行插入
    timeline.setSelectedLayers(voiceIndex,true);
    var startFrame = layer.frames[frameNum].startFrame; //因为是所以， 必须要+1
    if (startFrame+1 != frameNum)timeline.insertKeyframe(frameNum);

    fl.getDocumentDOM().library.addItemToDocument({x:0, y:0}, pathName);//搜索图层  voice  没有就要新建一个voice
}

/**
 * 根据 选中 元素 获取图层对象， 并且设置 timeline 选中这个图层
 * @param element
 */
function selectLayerByElement(element){
    //根据图层名字  找到对应的 图层索引， 图层名字可能有重复 循环对象去比对， 最好还是改名字  这里暂时不改名字
    //这就是对象所在的图层  获取所在图层对象
    var layer = element.layer;
    // alert(layer.name)
    //根据 图层名字 找到的 索引数组
    var indexArr= timeline.findLayerIndex(layer.name);
    if (indexArr.length===0){
        alert("该图层名字没有找到对应的索引");
    }
    //如果长度大于1
    if (indexArr.length>1){
        for (var i = 0; i < indexArr.length; i++) {
            if (timeline.layers[j] === layer){
                timeline.setSelectedLayers(i);
                break;
            }
        }
        for (var j = 0; j < timeline.layers.length; j++) {
            if(timeline.layers[j] === layer){
                indexTrue = j;
            }
        }
    }else{
        timeline.setSelectedLayers(indexArr[0]);
    }
}
//调用方法示例fitler
function test(){
    var laryer = null; //自己获取的图层对象
    var frameNum = 0; //自己想要刷入的帧数
    var blurFilter = createBlurFilter(40,4,100);
    pushFilter(laryer,frameNum,blurFilter)
}

/**
 * 刷入路径
 * @param layer 要划入的图层
 * @param frameNum 要刷入的帧索引，我还没测试要不要-1  比如要刷10帧 实际是填9帧。有测试的兄弟测试完回来告诉我
 * @param fitler 要刷入的 滤镜对象
 */
function pushFilter(layer,frameNum,fitler){
    var blurFilter = createBlurFilter(40, 4, 100);
    //将 模糊滤镜刷入 图层过滤器 指定 帧
    var filters = layer.getFiltersAtFrame(frameNum) || [];
    //输入数组
    filters.push(fitler);
    layer.setFiltersAtFrame(frameNum, filters);// 帧级别 生成模糊滤镜
}

/**
 * 创建模糊滤镜
 * @param blurX x强度
 * @param blurY y强度
 * @param strength 强度
 * @returns {{strength, blurY, enable: boolean, blurX, name: string}}
 */
function createBlurFilter(blurX, blurY, strength) {
    var blurFilter = {
        "name": "blurFilter",
        "enable": true,
        "blurX": blurX,
        "blurY": blurY,
        "strength": strength
    }
    return blurFilter;
}



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

/*
// 添加模糊滤镜
function changeElementType() {
    // 8. 将元素转换为影片剪辑
    if (eleEle.symbolType === "graphic") {
        // **直接操作该元素并转换为影片剪辑类型**
        doc.selection[0] = eleEle;
        doc.convertToSymbol('movie clip', '0', 'top left');
        fl.trace("选中的元件已转换为影片剪辑类型。");

        // 检查是否转换成功
        if (eleEle.symbolType === "movie clip") {
            fl.trace("元件转换为影片剪辑成功。");
        } else {
            fl.trace("转换为影片剪辑失败。");
        }
    }
    // 9. 添加模糊滤镜（如有必要）
    doc.addFilter("blurFilter");
    var filters = eleEle.filters || [];

    if (filters.length > 0) {
        var blurFilter = filters[0];
        blurFilter.blurX = 30;
        blurFilter.blurY = 10;
        eleEle.filters = filters;
        fl.trace("模糊滤镜已应用。");
    }
}
*/


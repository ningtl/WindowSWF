

//动作解析
/**
 * 1. 左边 1/10  5帧之后 关键帧，
 * 2. 恢复状态 5帧  关键帧
 * 3. 右边  1/10 5帧之后 关键帧
 */
// shakeHands();

// -1 往左边  1 右边
movingXWidth(-1,1);
// movingXWidth(1,1);


/**
 * 根据输入的 进行位移  类似于摇头
 * @param rightOrLeft  输入-1 往左边  输入1 往右边
 * @param percentage 百分比 也就是说  偏移的程度 10 元素的百分之10  20 百分之20
 */
function movingXWidth(rightOrLeft,percentage){
    var doc = an.getDocumentDOM();
    var timeline = doc.getTimeline();
    var currentFrameNum = timeline.currentFrame;

    //获取选中对象
    var selection = doc.selection;
    var element = selection[0];
    var layer = element.layer;

    //创建关键帧，创建补间
    //5帧之后的变量记录
    var fiveFrameNUm = currentFrameNum + 5;
    timeline.insertKeyframe(fiveFrameNUm);
    timeline.createMotionTween(currentFrameNum,currentFrameNum);

    layer.frames[currentFrameNum].tweenEasing=100;
    timeline.currentFrame = fiveFrameNUm;

    //位移5 帧后的元素
    var fiveElement = layer.frames[fiveFrameNUm].elements[0];

    var x =Math.floor(fiveElement.x * percentage/100);
    // var xWidth =Math.floor(fiveElement.width * percentage/100);
    alert(fiveElement.x + "    " + x);
    if (rightOrLeft==-1){
        fiveElement.x += x;
        fiveElement.width -=x;
        // fiveElement.scaleX = -fiveElement.scaleX;
    }else{
        fiveElement.x -= x;
        fiveElement.width +=x;
        // fiveElement.scaleX = -fiveElement.scaleX;
    }

    //5帧后刷入滤镜
    var blurFilter = createBlurFilter(40,0,100);
    var fiveFitler = layer.getFiltersAtFrame(fiveFrameNUm) || [];
    fiveFitler.push(blurFilter);
    layer.setFiltersAtFrame(fiveFrameNUm,fiveFitler);
    timeline.currentFrame = fiveFrameNUm;

    //
    var tenFrameNum = fiveFrameNUm + 5;
    timeline.insertKeyframe(tenFrameNum);
    timeline.createMotionTween(fiveFrameNUm,fiveFrameNUm);
    layer.frames[tenFrameNum].tweenEasing=-100;

    var tenElement = layer.frames[tenFrameNum].elements[0];

    if (rightOrLeft==-1){
        tenElement.x -= x;
        tenElement.width +=x;
        // tenElement.scaleX = -fiveElement.scaleX;
    }else{
        tenElement.x += x;
        tenElement.width -=x;
        // tenElement.scaleX = -fiveElement.scaleX;
    }

    layer.setFiltersAtFrame(tenFrameNum,[]);

    timeline.currentFrame = tenFrameNum;
}

// /**
//  * 根据根数 获取第一个元素
//  * @param layer  图层
//  * @param frameName  帧数
//  */
// function getElementByFrameNum(layer,frameName){
// }


function shakeHands(){
    var doc = an.getDocumentDOM();
    var timeline = doc.getTimeline();
    var currentFrame = timeline.currentFrame;
    var currentLayer = timeline.currentLayer;

    //获取选择对象；
    var selection = doc.selection;
    var element = selection[0];

    //创建关键帧  5帧
    timeline.insertKeyframe(currentFrame+5);
    timeline.createMotionTween(timeline.currentFrame,currentFrame);
    element.layer.frames[timeline.currentFrame].tweenEasing=100;
    //位移  刷入模糊滤镜
    timeline.currentFrame = currentFrame+5;

    //5帧之后的 元素
    var fiveElement = element.layer.frames[currentFrame+5].elements[0];
    fiveElement.x += 10;
    fiveElement.width -=10
    var fitler = createBlurFilter(20,0,100);

    var filtersAtFrame = fiveElement.layer.getFiltersAtFrame(currentFrame+5) || [];
    filtersAtFrame.push(fitler);
    element.layer.setFiltersAtFrame(currentFrame+5, filtersAtFrame);

    //创建关键帧


}


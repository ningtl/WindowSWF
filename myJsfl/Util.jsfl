function checkDoc(){
    if (fl.getDocumentDOM()==null){
        alert("请打开 [.fla]文件.");
        return 1;
    }
}

function checkSel(){
    if (fl.getDocumentDOM().selection.length == 0){
        alert("请在舞台选择 需要操作的 元件");
        return 1;
    }
}

/**
 * 调用 公用脚本的函数, 需要复制过去. 还未完成
 * @param method 要调用的方法名
 * @param args 参数
 */
function runUtilFun(method,args){
    var utilFun = fl.configURI + "WindowSWF/myJsfl/Util.jsfl";
    fl.runScript(utilFun,method);
}


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

function checkDom(num) {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return 1;
    }
    if (selectedObjects.length < 1) {
        alert("请选择元件？");
        return 1;
    }
}

//快速抽取关键帧索引-注意是索引， 不是frame对象
function getKeyFrames(layer){
    var frames = layer.frames;

    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        //情景模拟， 95  80  20  1 是关键帧
        //获取关键帧数
        var frameNum = frames[i];//i=100
        var startFrame = frameNum.startFrame;//95
        i=startFrame;// 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
    }
    keyFrames.sort(function (a, b) {
        return a-b;
    })
    return keyFrames;
}



function getTimeLine(){
    // 获取当前文档的DOM
    var doc = fl.getDocumentDOM();

// 获取当前选中的对象数组
    var selection = doc.selection;

// 如果没有选中任何对象，则输出提示信息
    if (selection.length === 0) {
        fl.trace("没有选中任何对象");
    } else {
        // 遍历选中的对象
        for (var i = 0; i < selection.length; i++) {
            // 获取选中对象的库元件
            var symbol = selection[i].libraryItem;

            // 确保库元件存在且有时间轴
            if (symbol && symbol.timeline) {
                // 获取第一个图层的帧数（通常所有图层帧数相同）
                var totalFrames = symbol.timeline.layers[0].frames.length;

                // 输出总帧数
                fl.trace("选中的对象 " + (i + 1) + " 的库元件时间轴总帧数是: " + totalFrames);
            } else {
                fl.trace("选中的对象 " + (i + 1) + " 没有有效的库元件或时间轴。");
            }
        }
    }
}

function traceEle(ele) {
    for (var s in ele) {
        try {
            fl.trace(s + " : " + ele[s]);
        } catch (error) {
            fl.trace(s + " : Error occurred - " + error.message);
        }
    }
}
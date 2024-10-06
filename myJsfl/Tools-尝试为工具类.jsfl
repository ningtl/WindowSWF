
var doc = fl.getDocumentDOM();
var selection = doc.selection;
getName()
function getName(){
    var ele = selection[0];
    if (ele.elementType == "instance" && ele.instanceType==="symbol" && ele.libraryItem) {
        var name = ele.libraryItem.name;
        //进入编辑模式  获取时间轴  1级操作
        var nameWithEleName = getNameWithEleName(name);
        for (var i = 0; i < nameWithEleName.length; i++) {
            getNameWithEleName(nameWithEleName[i]);
        }
    }
    else {
        alert("不是元件了");
    }
}

//分局 路径名称  获取嵌套的元件名称  如果是 元件就加上去 如果不是元件那就算了。 最多做3级嵌套
/**
 * 根据元件名称获取 内部的元件名称
 * @param name 元件 lib 名称  注意是libraryItem的名换
 */
function getNameWithEleName(name){
    //进入编辑模式  获取时间轴
    library.editItem(name);

    var nameArr = [];
    //重新获得 时间轴
    var timeline  = fl.getDocumentDOM().getTimeline();
    var layer  = null;
    var frame = null;
    var frameNum = -1;

    for (var i = 0; i < timeline.layers.length; i++) {
        layer = timeline.layers[i];
        for (var j = 0; j < layer.frames.length; j++) {
            //只能获得这个关键帧的 索引，  怎么进行一个判断呢。、、、、
            if (frameNum!=layer.frames[j].startFrame){
                frameNum=layer.frames[j].startFrame;
                frame = layer.frames[j];
                for (var k = 0; k < frame.elements.length; k++) {
                    var element = frame.elements[k];
                    //此处加一个 判断类型
                    if (element.elementType == "instance" && element.instanceType==="symbol" && element.libraryItem) {
                        var nestedSymbolName = element.libraryItem.name;
                        // fl.trace(nestedSymbolName);
                        nameArr.push(nestedSymbolName);
                        // 递归移动嵌套元件，增加深度
                        // moveNestedSymbolsIterative(nestedSymbolName, nestedFolderName, depth + 1);
                    }
                }
            }
        }
    }

// 创建一个空数组来存储去重后的数据
    var uniqueData = [];

// 遍历原始数组
    for (var i = 0; i < nameArr.length; i++) {
        // 检查当前元素是否已经在uniqueData数组中
        if (uniqueData.indexOf(nameArr[i]) === -1) {
            // 如果没有，则添加到uniqueData数组中
            uniqueData.push(nameArr[i]);
        }
    }
    for (var i = 0; i < uniqueData.length; i++) {
        fl.trace(uniqueData[i]);
    }
    return uniqueData;
}
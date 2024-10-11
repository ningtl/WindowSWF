
var doc = fl.getDocumentDOM();
var selection = doc.selection;

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
    doc.selectNone();//取消选择
    var elements = frame.elements;//获取帧的素有元素
    //写个for循环， 匹配
    elements[0].libraryItem.name;//库中的名字进行匹配

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
/*

function bindEventHandler(element, scriptName) {
    element.addEventListener(MouseEvent.CLICK, function(event) {
        MMExecute("fl.runScript(fl.configURI + \"WindowSWF/myJsfl/" + scriptName + ".jsfl\");");
    });
}



 */
 */
 */

// 使用辅助函数绑定事件
bindEventHandler(danZhen, "当前选中位置打单帧");
bindEventHandler(zhuanShen, "一键转身翻转");
bindEventHandler(buJian, "当前帧所在段补间");
bindEventHandler(daoZhuan, "旋转180度并放大1.5倍");
bindEventHandler(xieShang, "斜向上35度");
bindEventHandler(yaoTou, "没有补间的摇头");
bindEventHandler(taiTou, "一键抬头");
bindEventHandler(xunHuanDanZhen, "单帧循环");
bindEventHandler(guanLianDanZhen, "一键整理元件到文件夹");

var timeline = an.getDocumentDOM().getTimeline();
timeline.advancedLayersEnabled = false;



/* Mouse Click 事件
单击此指定的元件实例会执行您可在其中添加自己的自定义代码的函数。

说明:
1. 在以下"// 开始您的自定义代码"行后的新行上添加您的自定义代码。
单击此元件实例时，此代码将执行。
*/
//单帧
//此处绑定 那个 按钮要绑定上面的函数  danZhen-上面那个函数名字
danZhen.addEventListener(MouseEvent.CLICK, danZhenHandler);
//指定点击之后要 触发的函数
function danZhenHandler(event:MouseEvent):void{
    //这个函数  替换自己的 脚本路径  基本上只要替换 后面中文名字就行了
    MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/当前选中位置打单帧.jsfl\" );");
}

//转身
function zhuanShenHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/一键转身翻转.jsfl\" );");
//trace("已单击鼠标"); 打印到输出的函数

}
zhuanShen.addEventListener(MouseEvent.CLICK, zhuanShenHandler);

//补间
function buJianHandler(event:MouseEvent):void{
    MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/当前帧所在段补间.jsfl\" );");
}
buJian.addEventListener(MouseEvent.CLICK, buJianHandler);


//倒转
function daoZhuanHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/旋转180度并放大1.5倍.jsfl\" );");
}
daoZhuan.addEventListener(MouseEvent.CLICK, daoZhuanHandler);


//斜上
function xieShangHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/斜向上35度.jsfl\" );");
}
xieShang.addEventListener(MouseEvent.CLICK, xieShangHandler);

//摇头
function yaoTouHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/没有补间的摇头.jsfl\" );");
}
yaoTou.addEventListener(MouseEvent.CLICK, yaoTouHandler);

//抬头
function taiTouHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/一键抬头.jsfl\" );");
}
taiTou.addEventListener(MouseEvent.CLICK, taiTouHandler);

//循环单帧
function xunHuanDanZhenHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/单帧循环.jsfl\" );");
}
xunHuanDanZhen.addEventListener(MouseEvent.CLICK, xunHuanDanZhenHandler);

//文件关联 一键整理元件到文件夹
function guanLianDanZhenHandler(event:MouseEvent):void
    {
        MMExecute("fl.runScript( fl.configURI + \"WindowSWF/myJsfl/一键整理元件到文件夹.jsfl\" );");
}
guanLian.addEventListener(MouseEvent.CLICK, guanLianDanZhenHandler);


*/

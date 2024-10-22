
/**
 * 通过 库文件路径 查找对应的 symbol 对象， 用来获取 时间轴对象
 * @param libName 库路径名称
 * @returns {Item} symbol 对象
 */
function findSymbolItemByLibName(libName){
    var library = fl.getDocumentDOM().library;
    var item = library.items[library.findItemIndex(libName)];
    return item;
}

createHeadModel();

/**
 * 操作手则
 1. 模型文件放到固定的文件目录---根目录/见月模型文件夹- 头部模型
 2. 选中舞台 需要创建的 头部元件, 注意要打成 元件
 3. 选中 表情的 所在的文件夹
 4. 待优化目标  自动排除 下面的文件夹
 5. 如果 表情已经存在, 跳过
 */
var HEAD_MODEL_PATH= "见月模型文件夹/headModel";// 头部模板文件的路径
var LAYER_MODEL_NAME = "movingBall";// 头部模板文件 里面的随动球 图层
// var TARGET_HEAD_PATH="见月模型文件夹/目标头部";//目标头部PATH
var EXPRESSION_WIDTH = 100; // 表情宽度

function createHeadModel(){
    //1.获取 头部模板文件 item 对象
    var doc = fl.getDocumentDOM();
    var library = doc.library;

    //1,2 舞台获取目标头部
    var selection = doc.selection;
    if (selection.length!=1){
            alert("只能选择一个元件,你选了多个或者一个没选");
    }
    var BASIC_HEAD_PATH = selection[0].libraryItem.name;
    doc.deleteSelection();

    var hmItem = library.items[library.findItemIndex(HEAD_MODEL_PATH)];
    if (hmItem==null){
        alert("在库文件没有 "+HEAD_MODEL_PATH+" 模板文件");
        return;
    }

    //2.获取 模板文件里面的 随动求图层 movingBall 随动层 并复制到剪切板
    var hmTimeline = hmItem.timeline; //获取模板文件的时间轴对象
    var indexArr = hmTimeline.findLayerIndex(LAYER_MODEL_NAME);
    if (indexArr.length!=1){
        alert("模板文件没有找到名为 " +LAYER_MODEL_NAME+ "的图层,或者这个图层名名字有重复");
        return ;
    }
    hmTimeline.copyLayers(indexArr[0]);

    //3.整理表情, 调整大小,位置居中, 然后粘贴图层  此处需要选中表情所在的文件夹  选中文件夹就是选中文件夹下的所有的元件的了.包含子文件夹下的元件
    var selectedItems = library.getSelectedItems();
    //3.1 刷入 基础头部元件  一起进行随便化
    selectedItems.push(library.items[library.findItemIndex(BASIC_HEAD_PATH)]);
    selectedItems.forEach(function (item){
        if (item.name==="follow the moving ball"){
            return;
        }
        //只转换 影片剪辑和图形 的元件
        if (!(item.itemType=="movie clip" || item.itemType=="graphic")){
            return;
        }
        //新元件的名字
        //3.2 拖入文档中,在文档中创建新新元件
        library.addItemToDocument({x:100,y:100},item.name);
        //新元件名字
        var movingSymbolName = item.name.split("/").pop()+"_MovingExpression";
        var newItem=null;
        try{
            var newItem = doc.convertToSymbol("graphic",movingSymbolName,"center");
        }catch (error){
            fl.trace("提示信息:" +error);
        }
        if (newItem==null){
            return;
        }

        if ( doc.library.findItemIndex(movingSymbolName)<0){
            alert("转换元件失败，未找到新元件在库中的信息");
            return;
        }
        //3.2.2 修改元件内部大小. 规定规格为100宽度.
        var elements = newItem.timeline.layers[0].frames[0].elements;
        var width = (movingSymbolName===(BASIC_HEAD_PATH + "_MovingExpression").split("/").pop())  ? EXPRESSION_WIDTH*2.5 :EXPRESSION_WIDTH  ;
        elements.forEach(function (ele){
            ele.height=width/(ele.width/ele.height);
            ele.width = width;
        })
        //待定,注册点中间  // doc.jianqie fuzhi

        //3.3 对 moving 层 打规定的 8真, 然后粘贴 随动球模板图层
        newItem.timeline.insertFrames(7,true,0);
        library.editItem(newItem.name);
        var number = newItem.timeline.pasteLayers();
        var layers = newItem.timeline.layers;
        layers[1].setRigParentAtFrame(layers[number],0);//马的是反过来的
        doc.exitEditMode();
    })

    //4. 组装 万能头
    var headME = (BASIC_HEAD_PATH + "_MovingExpression").split("/").pop();
    //4.1 全选拖进去的元件, 创建一个新元件 就是万能头元件包起来
    doc.selectAll();
    var okHead = doc.convertToSymbol("graphic","开HeadOk","center");

    //4.2进入元件内部开始组装 设置图层长度,1个表情200真,然后创建新图层
    doc.enterEditMode();
    doc.selectAll();
    var allEle = doc.selection;
    doc.selectNone();
    var tl = fl.getDocumentDOM().getTimeline();
    var length = allEle.length*200;
    tl.insertFrames(length);
    tl.setLayerProperty("name","MovingHead","all"),
    tl.addNewLayer("MovingExpression","normal");

    //4.3 开始复制粘贴
    tl.currentLayer=1;
    allEle.forEach(function (ele){
        if (ele.libraryItem.name===headME){
            ele.selected=false;
            return;
        }
        ele.selected=true;
    })
    doc.clipCut();
    tl.currentLayer=0;
    doc.clipPaste()
    doc.distributeToKeyframes();
    var frames = getKeyFrames(tl.layers[0]);
    for (var i = frames.length - 1; i >= 0; i--) {
        tl.currentFrame = i;
        tl.insertFrames(199);
    }
    doc.exitEditMode();
}

function getKeyFrames(layer) {
    var frames = layer.frames;
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        var frameNum = frames[i];//i=100
        var startFrame = frameNum.startFrame;//95
        i = startFrame;// 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，
    }
    return keyFrames;
}

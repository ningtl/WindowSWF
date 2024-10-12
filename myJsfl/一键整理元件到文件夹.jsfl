var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

//判断位图，

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


getName()
function getName(){
    if (fangdai(selection.length)) return;

    var ele = selection[0];
    var nestedElements = {}; // 使用对象来存储层级和对应的嵌套元素名称

    //只能是图形元件，并且是库里面有的才能进行整理
    if (ele.elementType == "instance" && ele.instanceType==="symbol" && ele.libraryItem) {
            var name = ele.libraryItem.name;
            var names = getNameWithEleName(name,0,4,nestedElements);
            var items = library.items;
            var strings = name.split("/");
        //创建文件夹，层级夹一个“/”
        var folderName = "";
            for (var level in names) {

                var name = level==1 ? strings[strings.length-1]+"_打包 ": level
                folderName += "/"+name;
                if (names.hasOwnProperty(level)) { // 检查属性是否确实存在于nestedElements对象上
                    fl.trace("层级 " + level + " 包含的元素有：");
                    //添加判断是否存在库中
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].name===folderName){
                            break;
                        }else{
                            library.newFolder(folderName);
                        }
                    }
                    names[level].forEach(function(element) {
                        fl.trace("- " + element);
                        library.moveToFolder(folderName.replace(/^\//, ''),element,false);
                    });
                }
            }
        }
    else {
        alert("不是元件了");
    }
    doc.exitEditMode();
}

function getNameWithEleName(name, depth, maxDepth,nestedElements) {
    fl.trace("层级：" + depth + "mingzi:"+ name);
    // 检查是否已添加过该名称
    var levelKey = (depth + 1).toString(); // 将层级转换为字符串作为key

    if (!nestedElements[levelKey]) {
        nestedElements[levelKey] = []; // 如果该层级不存在，则初始化数组
    }

    if (nestedElements[levelKey].indexOf(name) === -1) {
        nestedElements[levelKey].push(name); // 添加嵌套元素名称到对应层级的数组中
    }

    if (depth > maxDepth) {
        return []; // 达到最大深度限制
    }


    // 尝试编辑库项（注意：这在实际应用中可能不是必需的，且可能不总是有效）
    library.editItem(name); // 通常不需要这一步，除非你需要编辑模式

    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var nameArr = [];

    var frameNum = -1;

    // 遍历时间轴上的每一层和帧
    for (var layerIndex = 0; layerIndex < timeline.layers.length; layerIndex++) {
        var layer = timeline.layers[layerIndex];
        var keyFrames = getKeyFrames(layer);//抽取关键帧数组索引，害得拿对象？下面
        fl.trace(keyFrames);
        for (var frameIndex = 0; frameIndex < keyFrames.length; frameIndex++) {
            var frame = layer.frames[keyFrames[frameIndex]];
            if (!frame){
                alert(keyFrames[frameIndex]);
            }
            for (var elementIndex = 0; elementIndex < frame.elements.length; elementIndex++) {
                var element = frame.elements[elementIndex];
                if (element.elementType === "instance" && element.instanceType === "symbol" && element.libraryItem) {
                    var nestedSymbolName = element.libraryItem.name;
                    // 检查是否已添加过该名称
                    if (nameArr.indexOf(nestedSymbolName) === -1) {
                        nameArr.push(nestedSymbolName);
                        // fl.trace(nestedSymbolName);
                        // 递归调用以获取更深层的嵌套
                        var nestedNames = getNameWithEleName(nestedSymbolName, depth + 1, maxDepth,nestedElements);
                        nameArr = nameArr.concat(nestedNames); // 将深层嵌套的名称添加到数组中
                    }
                }else if (element.elementType === "instance" && element.instanceType === "bitmap" && element.libraryItem){
                    //wei tu
                    var nestedSymbolName = element.libraryItem.name;
                    fl.trace("有位图了" + nestedSymbolName);
                    // 检查是否已添加过该名称
                    if (nestedElements[levelKey].indexOf(nestedSymbolName) === -1) {
                        nestedElements[levelKey].push(nestedSymbolName); // 添加嵌套元素名称到对应层级的数组中
                        nameArr = nameArr.concat(nestedElements)
                    }else{
                        // // 改名字   fl.getDocumentDOM().library.selectItem("untitled Folder_1/Symbol_1");   fl.getDocumentDOM().library.renameItem("new name");
                        // nestedElements[levelKey].push(nestedSymbolName); // 添加嵌套元素名称到对应层级的数组中
                        // nameArr = nameArr.concat(nestedElements)  moveToFolder  参数选false 会自动搞个唯一id
                    }
                }
                else{
                }
            }
        }
    }
    library.editItem(name);
    return nestedElements;
}

//获取关键帧数组索引
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
    return keyFrames;
}
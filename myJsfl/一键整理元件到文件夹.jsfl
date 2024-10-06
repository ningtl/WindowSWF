var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

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
            var names = getNameWithEleName(name,0,2,nestedElements);
            var items = library.items;

        //创建文件夹，层级夹一个“/”
        var folderName = "";
            for (var level in names) {

                folderName += "/"+level;
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
                        library.moveToFolder(folderName.replace(/^\//, ''),element,true);
                    });
                }
            }
        }
    else {
        alert("不是元件了");
    }
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
        for (var frameIndex = 0; frameIndex < layer.frames.length; frameIndex++) {
            var frame = layer.frames[frameIndex];
            //只去找关键帧， 不去找其他普通帧 索引  必须加1
            var startFrame = frame.startFrame+1;
            if (frameNum!=startFrame){
                frameNum=startFrame;
                for (var elementIndex = 0; elementIndex < frame.elements.length; elementIndex++) {
                    var element = frame.elements[elementIndex];
                    if (element.elementType === "instance" && element.instanceType === "symbol" && element.libraryItem) {
                        var nestedSymbolName = element.libraryItem.name;

                        // 检查是否已添加过该名称
                        if (nameArr.indexOf(nestedSymbolName) === -1) {
                            if (nameArr.indexOf(nestedSymbolName)===-1){
                                nameArr.push(nestedSymbolName);
                                // fl.trace(nestedSymbolName);
                                // 递归调用以获取更深层的嵌套
                                var nestedNames = getNameWithEleName(nestedSymbolName, depth + 1, maxDepth,nestedElements);
                                nameArr = nameArr.concat(nestedNames); // 将深层嵌套的名称添加到数组中
                            }
                        }
                    }
                }
            }
        }
    }
    library.editItem(name);
    return nestedElements;
}

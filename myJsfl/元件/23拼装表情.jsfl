breakSymbol()

//
function breakSymbol(){
    var dom = fl.getDocumentDOM();
    var lib = dom.library;    var selection = dom.selection;
    selection.sort(function (a,b){
        return a.x-b.x;
    })
    var source = selection[0];
    source.selected = false;
    selection = dom.selection;
    //10个 10个拿
    var customSort1 = customSort(selection);
    dom.selectNone();
    source.selected=true;
    dom.enterEditMode("inPlace");
    var tl = fl.getDocumentDOM().getTimeline();
    tl.deleteLayer(0);
    var i  = 0 ;
    tl.addNewLayer("MovingExpression");
    var b = lib.itemExists("见月模型文件夹/替换元件");
    if (!b){
        createChangeSymbol();
    }

    var number = an.getDocumentDOM().library.findItemIndex("见月模型文件夹/替换元件");
    var item = lib.items[number];
    lib.addItemToDocument({x:0,y:0},"见月模型文件夹/替换元件");
    customSort1.forEach(function (ele) {
        i+=8;
        tl.convertToKeyframes(i,i+1);
    })
    i=0;
    customSort1.forEach(function (ele) {
        tl.setSelectedFrames(i,i+1);
        // fl.trace(ele)
        dom.swapElement(ele.libraryItem.name);
        i+=8;
        tl.currentFrame = i;
    })

    dom.exitEditMode()
}



function customSort(selection) {
    selection.sort(function (a, b) { return a.y-b.y });
    var result = [];
    var groupSize = 10;
    for (var i = 0; i < selection.length; i += groupSize) {
        var group = selection.slice(i, i + groupSize);
        group.sort(function (a, b) {
            return a.x - b.x;
        });
        result = result.concat(group);
    }
    return result;
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


function getKeyFrames(layer) {
    var frames = layer.frames;
    var keyFrames = [];
    for (var i = 0; i < frames.length; i++) {
        var startFrame = frames[i].startFrame;//默认肯定是0
        i+=frames[i].duration;
        keyFrames.push(startFrame);
    }
    return keyFrames;
}



function changeLibSelect(position,name,item){
    var doc = fl.getDocumentDOM();
    var lib = doc.library;
    // var b = lib.itemExists("见月模型文件夹/替换元件");
    // if (!b){
    //     createChangeSymbol();
    // }

    try{
        lib.addItemToDocument(position,"见月模型文件夹/替换元件");
        doc.swapElement(name);
    }
    catch (e) {
        // lib.addItemToDocument(position,name);
        an.getDocumentDOM().addItem(position,item);
        doc.swapElement(name);
        doc.selection[0].y
    }

}

function createChangeSymbol(){
    var position = getPosition();
    an.getDocumentDOM().addNewRectangle({left:position.x, top:position.y, right:position.x+100, bottom:position.y+100}, 0);
    an.getDocumentDOM().mouseClick({x:position.x+10, y:position.y+10}, false, false, true);
    an.getDocumentDOM().mouseDblClk({x:position.x+10, y:position.y+10}, false, false, true);
    an.getDocumentDOM().convertToSymbol('graphic', '替换元件', 'top left');
    var lib = an.getDocumentDOM().library;
    if (lib.getItemProperty('linkageImportForRS') == true) {
        lib.setItemProperty('linkageImportForRS', false);
    }
    else {
        lib.setItemProperty('linkageExportForAS', false);
        lib.setItemProperty('linkageExportForRS', false);
    }
    lib.setItemProperty('scalingGrid',  false);
    lib.newFolder("见月模型文件夹");
    lib.moveToFolder("见月模型文件夹");
    fl.getDocumentDOM().deleteSelection();
}

function getPosition(){
    var dom = fl.getDocumentDOM();
    var tl = dom.getTimeline();
    var position;
    var number = dom.width/2;
    var number2 = dom.height/2 ;
    if (dom.getTimeline().camera.cameraEnabled === true){
        var cameraPos = tl.camera.getPosition(tl.currentFrame);
        var zoomval = tl.camera.getZoom(tl.currentFrame)/100;
        position = {x:Math.abs(cameraPos.x) + number/zoomval,y:Math.abs(cameraPos.y) + number2/zoomval}
    }else{
        position = {x:number,y:number2}
    }
    return position;
}


function hebing(){
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var arr = [];
    for (var i = 0; i < layers.length; i++) {
        arr.push(i);
        arr.push(0);
        arr.push(1);
    }
    timeline.setSelectedFrames(arr);
    an.getDocumentDOM().getTimeline().mergeLayers();
    if (timeline.layers.length>1){
        timeline.cutLayers(0,timeline.layers.length-2);
    }
}
function breakEle() {
    var doc = fl.getDocumentDOM();
    var selection = doc.selection;
    var timeline = doc.getTimeline();
    var element = selection[0];
    var lib = doc.library;
    if (element.elementType!= "instance") {
        var symbolItem = doc.convertToSymbol('graphic', '' + element.name, 'top left');
        if (lib.getItemProperty('linkageImportForRS') == true) {
            lib.setItemProperty('linkageImportForRS', false);
        } else {
            lib.setItemProperty('linkageExportForAS', false);
            lib.setItemProperty('linkageExportForRS', false);
        }
        lib.setItemProperty('scalingGrid', false);
    }
    doc.enterEditMode("inPlace");
    doc.selectAll();
    doc.breakApart();
    doc.distributeToLayers();
    doc.selectNone();
    var hasGroupToBreak = true;
    var lastLayerIndex = 0;
    var timeline = doc.getTimeline();
    var layers = timeline.layers;

    var utilFun = fl.configURI + "WindowSWF";
    var strings = FLfile.listFolder(utilFun);
    var sdf = true;
    for (var i = 0; i < strings.length; i++) {
        var s = strings[i];
        if (s.indexOf("2.2")!=-1){
            sdf= false;
            break;
        }
    }
    if (sdf){
        alert("I'm open source, and you sell it for money? Your parents died lawlessly, right?!")
        return
    }


    while (hasGroupToBreak) {
        hasGroupToBreak = false;
        layers = timeline.layers;
        for (var i = lastLayerIndex; i < layers.length; i++) {
            var childElement = layers[i].frames[0].elements[0];
            if (childElement.elementType==="instance"){
                continue;
            }
            if (childElement.isDrawingObject || childElement.isGroup) {
                doc.selectNone();
                childElement.selected = true;
                try{
                    doc.breakApart();
                }catch (e) {
                }
                if (layers[i].frames[0].elements.length>1){
                    doc.distributeToLayers();
                }
                hasGroupToBreak = true;
                lastLayerIndex=i;
                break;
            }
        }
    }
    doc.selectAll()
    var start = 0;
    var layers1 = doc.getTimeline().layers;

    for (var i = 0; i < layers1.length; i++) {
        var elementType = layers1[i].frames[0].elements[0].elementType;
        var nextLayerIndex = i+1;
        if (elementType==="instance"){
            start = i+1;
            continue;
        }
        if (nextLayerIndex<layers1.length && layers1[nextLayerIndex].frames[0].elements[0].elementType === "instance"){
            group(timeline,start,i);
            start = nextLayerIndex;
            continue;
        }
    }
    if (start!=timeline.layers.length-1){
        group(timeline,start,timeline.layers.length-1);
    }
    hebing()
    doc.exitEditMode()
}
function group ( timeline,star,end){
    var layers = timeline.layers;
    var arr = [];
    for (var i = star; i <= end; i++) {
        arr.push(i);
        arr.push(0);
        arr.push(1);
    }
    if (arr.length===0){
        return;
    }
    timeline.setSelectedFrames(arr);
    fl.getDocumentDOM().clipCut();
    timeline.setSelectedLayers(end,true);
    fl.getDocumentDOM().clipPaste(true);
    timeline.setSelectedLayers(end,true);
    fl.getDocumentDOM().group();
}
breakEle();
function deleteEmptyLayers() {
    var doc = fl.getDocumentDOM();
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var indexArr = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var keyFrames = getKeyFrames(layer);
        var b = true;
        var frames = layer.frames;
        keyFrames.forEach(function (key) {
            if (frames[key].elements.length!=0){
                b = false;
                return;
            }else if (frames[key].soundName!==""){
                b = false;
                return;
            }
        })
        if (b)indexArr.push(i);
    }
    var j = 0;
    for (var i = 0; i < indexArr.length; i++) {
        var indexArrElement = indexArr[i];
        timeline.deleteLayer(indexArrElement - (j++));
    }
}
function getKeyFrames(layer){
    var frames = layer.frames;
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        var frameNum = frames[i];//i=100
        var startFrame = frameNum.startFrame;//95
        i=startFrame;
        keyFrames.push(startFrame);
    }
    keyFrames.sort(function (a, b) {
        return a-b;
    })
    return keyFrames;
}
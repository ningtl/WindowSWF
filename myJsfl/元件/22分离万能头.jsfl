
// an.getDocumentDOM().library.addItemToDocument({x:461.5, y:268.5});

breakSymbol()
//将万能头的表情  分散到舞蹈
function breakSymbol(){
    var dom = fl.getDocumentDOM();
    var selection = dom.selection;
    var sourceEle = selection[0];
    var sourceItem = sourceEle.libraryItem;
    var sourceTl = sourceItem.timeline;

    var symbolName = [];
    var layer = sourceTl.layers[0];
    var x = 0;
    var y = 0;
    var index = 1;
    var lib = dom.library;
    var frames = layer.frames;

    for (var i = 0; i < frames.length; i++) {
        var startFrame = frames[i].startFrame;//默认肯定是0
        an.getDocumentDOM().library.addItemToDocument({x:x,y:y},frames[startFrame].elements[0].libraryItem.name);
        x+=150;
        index+=1;
        if (index%10==0){
            index=1;
            x=0;
            y+=150;
        }
        i+=frames[i].duration;
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
breakSymbol()

//
function breakSymbol(){
    var dom = fl.getDocumentDOM();
    var lib = dom.library;
    var selection = dom.selection;
   //怎么选择多个元件:
    

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

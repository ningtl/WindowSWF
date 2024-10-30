// // var doc = fl.getDocumentDOM();
// // var timeline = doc.getTimeline();
// // var layer = timeline.layers[0]; // 假设获取第一个图层
// // var frame = layer.frames[0]; // 获取图层的第一帧
// // var elements = frame.elements;
// // alert(elements.length)
// // elements[1].rotation=60;
//
//
// // configureTool()
// // function configureTool()
// // {
// //     var selectTool = fl.selectTool("puppet");
// //     an.getDocumentDOM().mouseClick({x:853, y:574}, false, true);
// //     fl.tools.activeTool.showTransformHandles(true);
// //
// //     an.getDocumentDOM().mouseClick({x:800, y:500}, false, true);
// //     // var activeTool = tools.activeTool;
// //     // activeTool.showTransformHandles(false)
// //     // theTool.setToolName("ellipse");
// //     // theTool.setIcon("Ellipse.png");
// //     // theTool.setMenuString("Ellipse");
// //     // theTool.setToolTip("Ellipse");
// //     // theTool.showTransformHandles( true );
// // }
//
//
// // fl.drawingLayer.beginDraw();
//
// function traceEle (ele){
//     for (var s in ele){
//         try {
//             fl.trace(s + " : " + ele[s]);
//         }catch (error){
//             fl.trace(s + " : Error occurred - " + error.message);
//         }
//     }
// }
//
// //
// // fl.selectTool("puppet");
// // var theTool = fl.tools.activeTool;
// // for (var s in theTool) {
// //     fl.trace(s + " : " + theTool[s]);
// // }
// // // an.getDocumentDOM().mouseClick({x:853, y:574}, false, true);
// // theTool.showTransformHandles(true);
// // // an.getDocumentDOM().mouseClick({x:800, y:500}, false, true);
// // var element = fl.getDocumentDOM().selection[0];
//
// // function iterateObject(obj, depth) {
// //     if (depth === undefined) {
// //         depth = 0;
// //     }
// //     for (var prop in obj) {
// //         if (prop.toString()=== "brightness"){
// //             continue;
// //         }
// //         var value = obj[prop];
// //         var indent = "   " +(depth);
// //         if (typeof value === "object" && value!== null && depth < 2 && value.toString()!="timeline") {
// //             fl.trace(indent + prop + " : [object]");
// //             iterateObject(value, depth + 1);
// //         } else {
// //             fl.trace(indent + prop + " : " + value);
// //         }
// //     }
// // }
// //
// // iterateObject(element);
// //
// // an.getDocumentDOM().clipPaste(true);
// //
// // an.getDocumentDOM().getTimeline().copyFrames();
// // an.getDocumentDOM().getTimeline().pasteFrames();
//
// var doc = fl.getDocumentDOM();
// var timeline = doc.getTimeline();
// var layer = timeline.layers[0];
//
// // for (var layerKey in layer) {
// //     fl.trace("属性=" + layerKey + "   值=" +layer[layerKey] )
// // }
// //
// var frame = layer.frames[0];
// var element = frame.elements[0];
//
// // for (var layerKey in layer) {
// //     fl.trace("属性=" + layerKey + "   值=" +layer[layerKey] )
// // }
// //
// // traceEle(element)
function  traceEle (ele){

    for (var i in ele) {
        try{
            fl.trace("属性=" + i + "   值=" +ele[i] )
        }catch (e) {
            fl.trace("属性=" + i + "   值=" +e )
        }

    }
}
//
// fl.trace(doc.pathURI)
// function transformSelection(a,d){
//     an.getDocumentDOM().transformSelection(a, 0, 0, d);
// };
test1()
function test1(){
    var utilFun = fl.configURI + "WindowSWF";
    var strings = FLfile.listFolder(utilFun);
    var sdf = true;
    for (var i = 0; i < strings.length; i++) {
        var s = strings[i];
        if (s.indexOf("见水中月免费插件")>1){
            sdf= false;
        }
    }
    if (sdf){
        alert("I'm open source, and you sell it for money? Your parents died lawlessly, right?!")
        return
    }
}


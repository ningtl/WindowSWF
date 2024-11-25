/**
 * @author 见水中月
 * @type {Document}
 */
togglesElementsLoop()

/**
 * 单帧循环切换, 强化版
 * 支持多个元件一起, 如果有不同的 ,统一会先都变成单帧
 */
function togglesElementsLoop(){
    var doc = fl.getDocumentDOM();
    if (doc==null){
       alert("请先打开 [.fla] 文件");
       return;
    }
    var selection = doc.selection;
    if (selection.length === 0 ){
        alert("清先选择元件")
        return;
    }
    var starLoop = "";
    for (var i = 0; i < selection.length; i++) {
        var ele = selection[i];
        if (ele.loop==null){
            alert("选中的元件没有单帧循环属性 可能是影片剪辑")
            continue;
        }
        if (starLoop!="" && starLoop==ele.loop){
            continue;
        }
        if (ele.loop === "loop"){
            ele.loop= "single frame";
        }else if(ele.loop === "single frame"){
            ele.loop= "loop";
        }else{
            ele.loop= "single frame";
        }
        if (starLoop===""){
            starLoop= ele.loop;
        }
    }
}



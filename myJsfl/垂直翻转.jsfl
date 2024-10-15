// 作者：加油鸭

var doc = fl.getDocumentDOM();
// 获取当前文档的 DOM 对象，用于访问和操作文档的各种属性和方法。

var timeline = doc.getTimeline();
// 从文档对象中获取时间轴对象，时间轴通常用于管理动画的播放和图层等。

var selectedObjects = doc.selection;
// 获取当前选中的对象数组，通过文档对象的'selection'属性获取。

function fangdai(num) {
    if (doc == null) {
        alert("兄弟你的动画文档都打开 怎么搞？");
        return 1;
    }
    if (selectedObjects.length < 1) {
        alert("兄弟，你没有选择元件啊， 我要对什么操作呢？");
        return 1;
    }
}

flipvertical();


function flipvertical() {
    if (fangdai(selectedObjects.length)) return;
    // 调用 fangdai 函数并传入选中对象的长度作为参数，如果 fangdai 函数返回 1，则立即从 flipvertical 函数返回，不执行后续操作。

    if (timeline.camera.cameraEnabled) {
        // 判断时间轴的相机是否启用。
        timeline.camera.cameraEnabled = false;
        // 如果相机处于启用状态，将其设置为 false，即关闭相机。
    } else {
        // 如果相机没有启用。
        doc.scaleSelection(1, -1);
        // 进行垂直翻转操作
        return;
        // 操作完成后直接返回，不进行后续开启相机的操作。
    }

    doc.scaleSelection(1, -1);
    // 执行文档对象的 scaleSelection 方法，传入参数 1 和 -1，进行垂直翻转操作。

    timeline.camera.cameraEnabled = true;
    // 翻转操作完成后，将时间轴的相机重新设置为启用状态。

    // 取消选中对象
 
fl.getDocumentDOM().selectNone();

}
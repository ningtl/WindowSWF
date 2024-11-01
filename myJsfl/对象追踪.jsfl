//@加油鸭

// 获取文档对象
var doc = fl.getDocumentDOM();

// 获取时间轴对象
var tl = doc.getTimeline();

// 检查相机是否未启用（cameraEnabled为false）
if (tl.camera && !tl.camera.cameraEnabled) {
	alert("相机未启用。");
} else {
	// 获取当前帧
	var currentFrame = tl.currentFrame;

	// 获取相机在当前帧的位置
	var cameraPos = tl.camera.getPosition(currentFrame);

	// 获取舞台的宽度和高度，这里假设舞台尺寸就是文档的尺寸
	var stageWidth = doc.width;
	var stageHeight = doc.height;

	// 获取选中的对象
	doc.convertToSymbol('graphic', '', 'center');
	var sel = doc.selection[0];
	if (!sel) {
		alert("请先选中一个对象再执行此操作。");
	} else {



		// 计算舞台的中心坐标
		var stageCenterX = Math.round(stageWidth / 2);
		var stageCenterY = Math.round(stageHeight / 2);

		// 计算选中对象的中心坐标
		var selCenterX = Math.round(sel.x);
		var selCenterY = Math.round(sel.y);

		// 计算将选中对象居中到舞台所需的相机位置偏移量
		var cameraOffsetX = stageCenterX - selCenterX;
		var cameraOffsetY = stageCenterY - selCenterY;
		// 设置相机的新位置，使选中对象居中在舞台中间
		doc.getTimeline().camera.setPosition(currentFrame, cameraOffsetX, cameraOffsetY);
		doc.breakApart();
		doc.library.deleteItem();




		// 输出相机的新位置信息（可根据需要选择是否保留这部分输出）
		// var newCameraPos = doc.getTimeline().camera.getPosition(currentFrame);
		// fl.trace("新的相机位置：x = " + newCameraPos.x + ", y = " + newCameraPos.y);
	}
}
//==========
//inp();
//function inp() {
//	// 获取用户输入的线条大小，处理取消情况并赋默认值
//	var inputSize = prompt("请输入线条大小：", "1");
//	if (inputSize === null) {
//		//inputSize = 1;
//		return;
//	}

//	// 获取颜色值输入，默认值为"#000000"，注意在jsfl中prompt获取的值类型处理
//	var colorValue = prompt("请输入颜色值（例如#000000形式）：", "#000000");
//	if (colorValue === null) {
//		// 如果用户点击了取消，赋一个默认值
//		//colorValue = "#000000";
//		return;
//	}


//	// 获取透明度输入（以1-100的整数形式输入，代表透明度百分比），默认值为"100"
//	var alphaValue = prompt("请输入透明度（1 - 100的整数）：", "100");
//	if (alphaValue === null) {
//		// 如果用户点击了取消，赋一个默认值
//		//alphaValue = "100";
//		return;
//	}

inp();
function inp() {
	if (fl.getDocumentDOM() === null) {
		alert("请打开文档");
		return;
	}

	var str = [
		"<dialog title='修改线条' buttons='accept, cancel'>",

		"<hbox ><label control='aaa' value='输入线大小:'/><textbox id='aaa' value='1' width='80' /></hbox>",
		"<hbox><label control='bbb' value='输入颜色值:'/><textbox id='bbb' value='#000000' width='80' /></hbox>",
		"<hbox><label control='ccc' value='输入透明度:'/><textbox id='ccc' value='100' width='80' /></hbox>",
		"<separator />",

		"</dialog>"
	];
	// 从XML字符串创建对话框面板并获取相关输入控件的值以及点击的按钮
	var dialog = fl.xmlPanelFromString(str.join(""));





	// 如果点击的是“取消”按钮，直接返回，不执行后续代码，确保功能符合需求
	if (dialog.dismiss === "cancel") {

		alert("取消修改");
		return;
	}
	var inputSize = dialog.aaa;
	var colorValue = dialog.bbb;
	var alphaValue = dialog.ccc;
	// 检查输入线大小是否为空
	if (inputSize === null || isNaN(Number(inputSize))) {
		alert("线大小只能输入数字，请重新输入。");
		return;
	}
	// 检查输入颜色值是否为空
	if (colorValue === null) {
		alert("输入颜色值不能为空，请重新输入。");
		return;
	}
	// 检查输入透明度是否为空
	if (alphaValue === null || isNaN(Number(alphaValue)) || Number(alphaValue) < 0 || Number(alphaValue) > 100) {
		alert("透明度，请重新输入0-100。");
		return;
	}




	// 去除颜色值输入可能包含的"#"符号，并转换为十六进制格式且确保是6位长度
	var colorHex = ("000000" + (colorValue.replace("#", "") || "000000")).toString(16).substr(-6).toUpperCase();

	// 将获取到的透明度值转换为0-255范围内的整数，做了输入值的合法性判断等处理
	var alphaInt = Math.floor(parseInt(alphaValue, 10) / 100 * 255);
	if (isNaN(alphaInt)) {
		alphaInt = 255; // 如果输入不合法，默认设置为完全不透明（255）
	}
	if (alphaInt < 0) {
		alphaInt = 0;
	}
	if (alphaInt > 255) {
		alphaInt = 255;
	}

	// 将透明度值转换为两位的十六进制字符串
	var alphaHex = ("00" + alphaInt.toString(16)).substr(-2).toUpperCase();

	// 组合颜色值和透明度值，透明度在后
	var finalColorHex = colorHex + alphaHex;


	function getKeyFrames(layer) {
		var frames = layer.frames;
		var keyFrames = [];
		for (var i = frames.length - 1; i >= 0; i--) {
			var frameNum = frames[i];
			var startFrame = frameNum.startFrame;
			i = startFrame;
			keyFrames.push(startFrame);
		};
		keyFrames.sort(function (a, b) {
			return a - b;
		});
		return keyFrames;
	};
	function traceEle(ele) {
		for (var s in ele) {
			try {
				fl.trace(s + ' : ' + ele[s]);
			} catch (error) {
				fl.trace(s + ' : Error occurred - ' + error.message);
			};
		};
	};
	breakEle();
	function breakEle() {
		return processElements(fl.getDocumentDOM(), fl.getDocumentDOM().selection, 0);
	};
	function processElements(doc, originalSelection, recursionCount) {
		if (recursionCount >= 10) {
			return;
		};
		originalSelection.forEach(function (ele) {
			doc.selectNone();
			ele.selected = true;
			if (ele.elementType === 'shape' && ele.isGroup) {
				doc.enterEditMode('inPlace');
				doc.selectAll();
				var selection = doc.selection;
				processElements(doc, selection, recursionCount + 1);
				doc.exitEditMode();
			} else if (ele.elementType === 'instance') {
				doc.enterEditMode('inPlace');
				doc.selectAll();
				var selection = doc.selection;
				processElements(doc, selection, recursionCount + 1);
				doc.exitEditMode();
			} else {
				setSize(doc);
			};
		});
	};


	function setSize(doc) {
		doc.selectAll();
		doc.setStroke('"#' + finalColorHex + '"', parseInt(inputSize, 10), "solid");
	};
};
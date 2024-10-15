//作者：加油鸭

var doc = fl.getDocumentDOM();
var timeline = doc.getTimeline();
var selection = doc.selection;
var shuliang = 5; //残影数量

var doc = fl.getDocumentDOM(); //获取文档对象，就是你当前打开的那个文件，比如 test.fla, 这个文件的所有内容都在这个对象里面
var timeline = doc.getTimeline(); //获取时间轴对象，就是 软件的 时间轴那个界面的所有数据， 比如图层-layer  帧-frame 都在这个对象里面
var selection = doc.selection; //获取当前选中的对象数组， 就是你在界面 选中的对象，可能多个就是数组了
function fangdai(num) {
	if (doc == null) {
		alert("兄弟你的动画文档都打开 怎么搞？")
		return 1;
	}
	if (num === 0) {
		alert("兄弟，你没有选择元件啊， 我要对什么操作呢？");
		return 1;
	}
}

donhua();

function donhua() {
	if (fangdai(selection.length)) return;
	if (selection !== "graphic") {

		var doc = fl.getDocumentDOM();
		var timeline = doc.getTimeline();

		// 如果不是图形元件，转换为图形元件
		doc.convertToSymbol('graphic', '', 'center');
		doc.setElementProperty('loop', 'play once');

		// 退出编辑模式
		doc.exitEditMode();

		//第二次转图形元件防bug
		doc.convertToSymbol('graphic', '', 'center');
		doc.setElementProperty('loop', 'play once');

		// 进入编辑模式
		doc.enterEditMode('inPlace');

		// 切换到第一层并插入关键帧
		doc.getTimeline().currentLayer = 0;
		doc.getTimeline().insertKeyframe(15);

		// 选择所有内容并移动
		doc.selectAll();
		doc.moveSelectionBy({
			x: 800,
			y: 0
		});

		// 设置帧的补间类型和缓动类型
		doc.getTimeline().setFrameProperty("tweenType", "motion", 1, 15);
		doc.getTimeline().setFrameProperty('easeType', 5, 2, 0);

		doc.exitEditMode();

	}
	var doc = fl.getDocumentDOM();
	var timeline = doc.getTimeline();

	// 如果不是图形元件，转换为图形元件
	doc.convertToSymbol('graphic', '', 'center');
	doc.setElementProperty('loop', 'play once');

	// 进入元件编辑模式
	doc.enterEditMode('inPlace');
	var timeline = doc.getTimeline();
	timeline.insertFrames(50, false);

	// 设置元件循环播放一次
	doc.setElementProperty('loop', 'play once');

	var fadeStart = 100;

	for (var i = 0; i < shuliang; i++) {
		var alpha = fadeStart * Math.pow(0.8, i);
		timeline.copyFrames(i);

		var newLayer = an.getDocumentDOM().getTimeline().addNewLayer("图层" + i, "normal", false);
		timeline.pasteFrames(i + 1);

		if (doc.selection.length > 0) {
			doc.selection[i + 1].colorAlphaPercent = alpha;
		}
	}

	for (var e = 0; e < shuliang; e++) {
		var alllayer = fl.getDocumentDOM().getTimeline().layers[e + 1]; //获取图层
		// 使用滤镜
		addBlurFilterToFrame(alllayer, e + 1, 4, 3, "medium"); //图层，第几帧，x轴，y轴，品质（low、medium，high）
	}

	doc.exitEditMode();
}

//刷滤镜
function addBlurFilterToFrame(layer, frameNum, blurX, blurY, strength) { //图层，第几帧，x轴数值，y轴数值，品质可选（low、medium，high）
	// 创建模糊滤镜对象
	var blurFilter = {
		"name": "blurFilter",
		"enable": true,
		"blurX": blurX,
		"blurY": blurY,
		"quality": strength
	};

	// 获取当前帧的滤镜数组，如果不存在则初始化为空数组
	var filters = layer.getFiltersAtFrame(frameNum) || [];

	// 将新滤镜添加到数组中
	filters.push(blurFilter);

	// 将更新后的滤镜数组设置回指定帧
	layer.setFiltersAtFrame(frameNum, filters);
}
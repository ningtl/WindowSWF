/********************************************************************
 ADOBE 机密信息
 版权 2020 Adobe
 保留所有权利。
 通知：Adobe 允许您按照随附的 Adobe 许可协议的条款使用、修改和分发此文件。如果您从 Adobe 以外的来源收到此文件，则在使用、修改或分发它之前需要获得 Adobe 的事先书面许可。
********************************************************************/


//////////////////////////////////////////////
// 定义一些在此工具作用域内可用的变量
// scope of this tool
//////////////////////////////////////////////
var nSides = 5; // 边数（用于多边形或星形的角数）
var pointParam = 0.5; // 星形参数
var style = "polygon"; // 形状风格（"polygon"表示多边形，"star"表示星形）
var thePolygon = new Array(); // 存储多边形点的数组
var didDrag = false; // 标志变量，用于判断鼠标是否拖动足够距离以创建形状


// 多边形风格的值
var POLYGON = "polygon"; // 多边形风格
var STAR = "star"; // 星形风格

//////////////////////////////////////////////
// 函数 configureTool
// Animate 回调函数。
// 每个工具都必须有一个 configureTool 函数。
// 当应用程序启动时，Animate 会调用此函数。
//////////////////////////////////////////////
function configureTool() {
	// 设置标准工具信息
	theTool = fl.tools.activeTool;
	theTool.setToolName("polystar"); // 设置工具名称为"polystar"
	theTool.setIcon("PolyStar.png"); // 设置工具图标
	theTool.setMenuString("PolyStar Tool"); // 设置工具菜单字符串
	theTool.setToolTip("PolyStar Tool"); // 设置工具提示
	theTool.setOptionsFile("PolyStar.xml"); // 设置工具的选项文件

	// 此工具使用"Shape"属性检查器
	theTool.setPI("shape");
}

//////////////////////////////////////////////
// 函数 notifySettingsChanged
// Animate 回调函数
// 当用户更改工具选项时被调用。
//////////////////////////////////////////////
function notifySettingsChanged() {
	// 当前此工具的属性值由 activeTool 对象持有。
	theTool = fl.tools.activeTool;

	// 从 activeTool 对象更新本地的属性值。
	// 这些属性在工具的 XML 文件中定义。
	// 在 XML 文件中设置了这些属性的最小值和最大值，所以我们无需检查直接接受这些值。
	nSides = theTool.nsides; // 更新边数或角数
	pointParam = theTool.pointParam; // 更新星形参数
	style = theTool.style; // 更新形状风格
}


//////////////////////////////////////////////
// function setCursor
// Animate callback function
// Set the cursor to display
//////////////////////////////////////////////
function setCursor()
{
	// cursor 0 is the '+' cursor
	fl.tools.setCursor( 0 );
}


//////////////////////////////////////////////
// function activate
// Animate callback function
// Called by Animate whenever the
// user selects the tool
//////////////////////////////////////////////
function activate()
{
}


//////////////////////////////////////////////
// function deactivate
// Animate callback function
// Called when the active tool switches from
// this tool to another tool
//////////////////////////////////////////////
function deactivate()
{
}

//////////////////////////////////////////////
// function mouseDown
// Animate callback function
// Called when the user presses the mouse button
// in the workspace when this tool is active
//////////////////////////////////////////////
function mouseDown()
{
	// start drawing of object
	fl.drawingLayer.beginDraw();

	// set the flag if the cursor moves "enough"
	didDrag = false;
}


//////////////////////////////////////////////
// function mouseMove
// Animate callback function
// Called when the user moves the mouse
//////////////////////////////////////////////
function mouseMove(mouseLoc)
{
	// only handle the callback if the mouse button is down
	if (fl.tools.mouseIsDown)
	{
		// check how much the mouse has moved since the pen went down
		var pt1 = fl.tools.penDownLoc;
		var pt2 = fl.tools.snapPoint( mouseLoc );
		var dx = pt1.x - pt2.x;
		var dy = pt1.y - pt2.y;
		if (dx < 0)  dx = -dx;
		if (dy < 0)  dy = -dy;

		// constrain with the shift key
		if (fl.tools.shiftIsDown)
		{
			// The following code will put a corner of the polygon/star
			// pointing directly up/down/left/right depending on the
			// position of the mouse relative to the center.

			var radSq  = dx*dx + dy*dy;
			var rad    = radSq > 0.01 ? Math.sqrt( radSq ) : 0.0;

			var dTheta = Math.PI/nSides;
			var angle  = Math.PI/2.0;

			// put a point near the cursor
			if (Math.abs(dx) > Math.abs(dy))
			{
				if (pt2.x < pt1.x)
					angle += Math.PI/2.0;
				else
					angle -= Math.PI/2.0;
			}
			else
			{
				if (pt2.y < pt1.y)
					angle = -angle;
			}

			pt2.x = pt1.x + rad*Math.cos( angle );
			pt2.y = pt1.y + rad*Math.sin( angle );
		}

		if ((dx > 2) || (dy > 2))
		{
			// if the user does not move the mouse enough
			// no shape is created when the button is released.
			// use the following flag to indicate that the shape should be created.
			didDrag = true;

			// build the array of points defining the new polygon
			// based on the current values of the points.
			buildPolygonObj(pt1,  pt2,  thePolygon);

			// draw the current polygon
			// The drawing is surounded by calls to
			// beginFrame and endFrame.   Doing this causes Animate
			// to erase the previous polygon and draw the new one.
			fl.drawingLayer.beginFrame();
			drawPolygonObj( thePolygon );
			fl.drawingLayer.endFrame();
		}
	}
}


//////////////////////////////////////////////
// function mouseUp
// Animate callback function
// Called when the user releases the mouse button
//////////////////////////////////////////////
function mouseUp()
{
	// notify Animate that we are finished drawing
	fl.drawingLayer.endDraw();

	// if the mouse moved enough create the shape on the stage
	if (didDrag)
	{
		// create a path object from the array of points
		var path = polygonToPath( thePolygon );

		// create the shape on the stage
		path.makeShape();
	}
}


//////////////////////////////////////////////
// function buildPolygonObj
// Function to array with points that define the
// polygon based on the values of the arguments
//////////////////////////////////////////////
function buildPolygonObj( pt1,  pt2,  thePolygon )
{
	// the point given by the first argument is used as the center point
	var ctr = new Object;
	ctr.x = pt1.x;
	ctr.y = pt1.y;

	// calculate the radius
	var rad = fl.Math.pointDistance(pt1, pt2);

	// find the angle between points
	var doStar = (style == STAR);
	var dTheta = 2.0*Math.PI/nSides;

	var param = pointParam;
	if (param < 0.1)  param = 0.1;
	if (param > 0.9)  param = 0.9;

	// The locations of the points of the polygon
	// are calculated by rotating points about the origin.
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var cs = Math.cos(dTheta);
	var sn = Math.sin(dTheta);
	thePolygon[0] = x;
	thePolygon[1] = y;
	var index = 2;
	for (var i=0;  i<nSides;  i++)
	{
		// apply a rotation to the point
		// The last point is taken from the first point.
		var xtmp,  ytmp;
		if (i == (nSides-1))
		{
			xtmp = thePolygon[0];
			ytmp = thePolygon[1];
		}
		else
		{
			xtmp = x*cs - y*sn;
			ytmp = x*sn + y*cs;
		}

		// if we are building a star calculate an additional
		// point that lies on the line joining the origin
		// with the midpoint of the line segment between
		// the current and previous polygon points.
		if (doStar)
		{
			thePolygon[index]	= param*0.5*(xtmp + x)
			thePolygon[index+1]	= param*0.5*(ytmp + y)
			index += 2;
		}

		// update x and y to the new values
		x = xtmp;
		y = ytmp;

		// offset to the center
		thePolygon[index]	= xtmp;
		thePolygon[index+1]	= ytmp;
		index += 2;
	}

	// adjust the length of the array
	thePolygon.length = index;

	// offset to the center
	for (var i=0;  i<thePolygon.length;  i += 2)
	{
		thePolygon[i  ] +=  ctr.x;
		thePolygon[i+1] +=  ctr.y;
	}

	return;
}


//////////////////////////////////////////////
// function transformPoint
// Apply a matrix transformation on the given point
//////////////////////////////////////////////
function transformPoint( pt,  mat )
{
	var x = pt.x*mat.a + pt.y*mat.c + mat.tx;
	var y = pt.x*mat.b + pt.y*mat.d + mat.ty;

	pt.x = x;
	pt.y = y;

	return;
}


//////////////////////////////////////////////
// function drawPolygonObj
// draw a polygon defined by the points in
// the input array using the drawingLayer
//////////////////////////////////////////////
function drawPolygonObj( thePolygon )
{
	if (thePolygon.length != 0)
	{
		// define 2 points to hold the transfomred values
		var tmpPt  = new Object;
		var tmpPt2 = new Object;
		tmpPt.x = thePolygon[0];
		tmpPt.y = thePolygon[1];

		// if the polygon is being drawn inside a symbol currently
		// being edited in Animate, we must transform to document
		// space using the view matrix
		var viewMat = fl.getDocumentDOM().viewMatrix;
		transformPoint(tmpPt,  viewMat);

		// set the pen position to the location of the first point
		fl.drawingLayer.moveTo( tmpPt.x,  tmpPt.y );

		// draw the segments of the polygon
		var index = 3;
		while (index < thePolygon.length)
		{
			// transform to document space
			tmpPt.x  = thePolygon[index-1];
			tmpPt.y  = thePolygon[index];
			transformPoint(tmpPt,  viewMat);

			// draw the next line
			fl.drawingLayer.lineTo(tmpPt.x,  tmpPt.y,  tmpPt2.x,  tmpPt2.y);
			index += 2;
		}
	}
}


//////////////////////////////////////////////
// function polygonToPath
// Convert the array of polygon points to a path object
//////////////////////////////////////////////
function polygonToPath( thePolygon )
{
	// allocate a path
	var path = fl.drawingLayer.newPath();

	// add the segments
	path.addPoint(thePolygon[0],  thePolygon[1]);
	var index = 3;
	while (index < thePolygon.length)
	{
		path.addPoint( thePolygon[index-1],  thePolygon[index] );
		index += 2;
	}

	return path;
}

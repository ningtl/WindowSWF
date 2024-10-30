/********************************************************************
ADOBE CONFIDENTIAL
Copyright 2020 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
********************************************************************/

	var selArray = fl.getDocumentDOM().selection;
	fl.trace( "selection length: " + selArray.length );

	var elt = selArray[0];
	fl.trace( "selected element" + elt );
	fl.trace( "element type: " + elt.elementType );
	
	var contourArray = elt.contours;
	fl.trace("contour array length: " + contourArray.length);

	var contourCount = 0;
	for (i=0;  i<contourArray.length;  i++)
	{
		var contour = contourArray[i];
		fl.trace(" ");
		fl.trace("Next Contour, orientation:" + contour.orientation + ", interior: " + contour.interior );
		
		contourCount++;

		var he = contour.getHalfEdge();

		var iStart = he.id;
		var id = 0;
		while (id != iStart)
		{
			// see if the edge is linear
			var edge = he.getEdge();
			var vrt = he.getVertex();
			
			var x = vrt.x;
			var y = vrt.y;
			fl.trace("vrt: " + x + ", " + y);
			
			he = he.getNext();
			id = he.id;
		}
	}


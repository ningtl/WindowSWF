
(function(onlyRemoveSounds){
	
	/**
	*  The class for removing unused graphic frames
	*  @class OptimizeGraphics
	*/
	var OptimizeGraphics = function(onlyRemoveSounds)
	{
		this.debug = false;
		this.hasModifiedTheDoc = false;		
		
		if(onlyRemoveSounds)
		{
			this.onlyRemoveSounds = true;
		}else
        {
      		this.onlyRemoveSounds = false;
        }
        
		var doc = fl.getDocumentDOM();
		var curTimelines = doc.timelines;
		var libraryItems = doc.library.items;
		var items = doc.library.items;
		
        var potentialGraphicItems = [];
		var validSymbolTypes = ["graphic", "movie clip", "button"];
        for(var i=0;i<items.length;i++) 
        {
            if(inObject(items[i].itemType, validSymbolTypes) && (items[i].linkageClassName == null))
            {
                potentialGraphicItems.push(items[i]);
            }
        }
        items = potentialGraphicItems;

        for(var index = 0;index < items.length; ++index)
        {

			/**
			*  The cache of items that have already been searched
			*  @property {Array} objectsSearched
			*/
			this.objectsSearched = [];

			/**
			*  The collection of frames found
			*  @property {Array} framesFound
			*/
			this.framesFound = [];
			
			/**
			*  The specific library item we're searching for
			*  @property {LibraryItem} searchItem
			*/
			this.searchItem = items[index];

			var searchItemTline = this.searchItem.timeline;

			/**
			*  The layers in the search item
			*  @property {Array} searchItemLayers
			*/
			this.searchItemLayers = searchItemTline.layers;

			/**
			*  CC-support if the current FLA is an html5canvase
			*  @property {Boolean} isCanvas
			*/
			this.isCanvas = false;

			/**
			*  The number of frames in the search item
			*  @property {int} frameCount
			*/
			this.frameCount = searchItemTline.frameCount;

			/**
			*
			*/
			var size = this.frameCount;
			var array = new Array(size);
			while(size--) array[size] = false;
			this.CanClearFrame = array;
            
            this.LastConvertedIndex = new Array(this.searchItemLayers.length);

            // set false everywhere
			size = this.frameCount;
            this.IsFrameByFrameLayer = new Array(this.searchItemLayers.length);
            for(var i=0;i<this.IsFrameByFrameLayer.length;++i)
            {
                this.IsFrameByFrameLayer[i] = array.splice(size - this.searchItemLayers[i].frameCount);
				this.LastConvertedIndex[i] = -1;
            }
          
            /*
			*
			*/
			this.IsAllInstancesGraphic = true;
			
			// run the constructor
			this.initialize();
        }
		
		return this.hasModifiedTheDoc;
	};

	// Reference to the prototype
	var p = OptimizeGraphics.prototype = {};

	/**
	*  trace function which can be turned off
	*  @method myTrace
	*/	
	p.myTrace = function(str)
	{
		if(this.debug)
		{
			fl.trace(str);
		}
	}
	
	/**
	*  alert function which can be turned off
	*  @method myTrace
	*/	
	p.myAlert = function(str)
	{
		if(this.debug)
		{
			alert(str);
		}
	}

    /**
	*  confirm function which can be turned off
	*  return true if debugging is turned off
	*  @method myTrace
	*/	
	p.myConfirm = function(str)
	{
		if(this.debug)
		{
			return confirm(str);
		}
		return true;
	}

    p.convertFramesInLayer = function(layerIndex, curStartIndex, curEndIndex)
    {
		var layers = this.searchItemLayers;

        if(layers.length <= layerIndex)
		{
            this.myAlert("function convertFramesInLayer : no layer " + layerIndex);
		}
		
        var layer = layers[layerIndex];
				
		if((curEndIndex < curStartIndex) || (curStartIndex > layer.frameCount) || (curEndIndex > layer.frameCount) )
		{
            this.myAlert("function convertFramesInLayer : Cannot convert from " + curStartIndex + " to " + curEndIndex + ", frames in layer : " + layer.frameCount);
			return;
		}
		
		
		//this.myAlert("Trying to convert Symbol: "+ this.searchItem.name +", layer: "+ layer.name + ", curStartIndex : " + curStartIndex + ", curEndIndex : " + curEndIndex);

        var LastIndexConverted = -1;
        
		var lFrames = layer.frames;
        for(var j=curStartIndex; j<curEndIndex;)
		{	
			
			var frame = lFrames[j];

            j = frame.startFrame;
			frame = lFrames[j];

			j += frame.duration;

			if(frame.tweenType != "motion")
			{
				LastIndexConverted = j-1;
				
 				//this.myAlert("Converting Symbol: "+ this.searchItem.name +", layer: "+ layer.name + ", curStartIndex : " + (j-frame.duration) + ", curEndIndex : " + (j-1));

                for(var k = j-frame.duration;k<j;++k)
				{
					this.IsFrameByFrameLayer[layerIndex][k] = true;
				}
				// do the actual conversion at the end else frame properties will change
                frame.convertToFrameByFrameAnimation();
			}/*else
			{
				this.myAlert("Cannot convert Symbol: "+ this.searchItem.name +", layer: "+ layer.name + ", curStartIndex : " + (j-frame.duration) + ", curEndIndex : " + (j-1));				
			}*/
		}
        return LastIndexConverted;
    }
	
	p.clearFrameInLayer = function(layerIndex,curStartIndex,curEndIndex)
    {
		var layers = this.searchItemLayers;
        if(layers.length <= layerIndex)
            this.myAlert("function clearFrameInLayer : no layer " + layerIndex);

        var layer = layers[layerIndex];
        
        if(curEndIndex < curStartIndex)
            this.myAlert("function clearFrameInLayer : Cannot clear from " + curStartIndex + " to " + curEndIndex);
            

		//this.myAlert("Trying to Clear Symbol: "+ this.searchItem.name +", layer: "+ layer.name + ", curStartIndex : " + curStartIndex + ", curEndIndex : " + curEndIndex);
		//this.myAlert(this.IsFrameByFrameLayer[layerIndex]);
		var tempEndIndex = curStartIndex;
        while(tempEndIndex <= curEndIndex)
        {
            if(this.IsFrameByFrameLayer[layerIndex][tempEndIndex] == false)
            {
                if(curStartIndex <= (tempEndIndex-1))
                {
                    //this.myAlert("Clearing Symbol: "+ this.searchItem.name + ", layer: " + layer.name + " : " + curStartIndex + " to " + (tempEndIndex-1));
                
                    //TODO: clear curStartIndex to tempEndIndex-1
                    layer.clearFrames(curStartIndex, tempEndIndex-1);
                }
                
                // then
                curStartIndex = tempEndIndex;
            }
            ++tempEndIndex;
        }
		if(curStartIndex <= curEndIndex)
		{
			//this.myAlert("Clearing Symbol: "+ this.searchItem.name + ", layer: " + layer.name + " : " + curStartIndex + " to " + curEndIndex);
            //TODO: clear curStartIndex to tempEndIndex-1
			layer.clearFrames(curStartIndex, curEndIndex);
		}
    }
    
     
	/**
	*  Converts animation to frame-by-frame whereever possible.
	*  classic tweens not converted
	*  @method convertToFramebyFrame
	*/
	p.clearFrameInAllLayers = function(startIndex,endIndex)
	{
        if(endIndex == undefined)
            endIndex = startIndex;

        if(startIndex > endIndex)
        {
            this.myAlert("clearFrameInAllLayers: Cannot clear from " + startIndex + " to " + endIndex);
            return false;
        }

		var hasModified = true;
		var layers = this.searchItemLayers;
		for(var i=0; i<layers.length; i++)
		{
			if(layers[i].layerType == "folder")
			{
				//this.myAlert("clearFrameInAllLayers: found folder layer");
				continue;
			}
			
            if(startIndex > layers[i].frameCount)
                continue;

            var curLayerStartIndex = startIndex;
            var curLayerEndIndex = endIndex;
            
            if(curLayerEndIndex > layers[i].frameCount)
                curLayerEndIndex = layers[i].frameCount;
                
            var curStartIndex = startIndex;
            var curEndIndex = curLayerEndIndex;
            
			
            if(curStartIndex <= this.LastConvertedIndex[i])
            {
                if(curLayerEndIndex <= this.LastConvertedIndex[i])
                {
                    curEndIndex = curLayerEndIndex;
                }else
                {
                    curEndIndex = this.LastConvertedIndex[i];                
                }
				
                this.clearFrameInLayer(i,curStartIndex,curEndIndex);
				curStartIndex = curEndIndex + 1;
 				curEndIndex = curLayerEndIndex;
            }
            
            if(this.LastConvertedIndex[i] < curEndIndex)
			{
				var lastIndexConverted = this.convertFramesInLayer(i,curStartIndex,curEndIndex);
				if(lastIndexConverted > this.LastConvertedIndex[i])
				{
					this.LastConvertedIndex[i] = lastIndexConverted;
				}
			}
			if(curStartIndex <= curEndIndex)
				this.clearFrameInLayer(i,curStartIndex,curEndIndex);
		}
		return hasModified;
	}
    	
	/**
	*  Converts animation to frame-by-frame whereever possible.
	*  classic tweens not converted
	*  @method convertToFramebyFrame
	*/
/*
	p.convertToFramebyFrame = function()
	{
		var hasModified = false;
		var layers = this.searchItemLayers;
		for(var i=0; i<layers.length; i++)
		{
			for(var j=0; j<layers[i].frameCount;)
			{	
				var frame = layers[i].frames[j];
				j += frame.duration;
                
                for(var k = j-frame.duration;k<j;++k)
                {
                    this.CanClearFrame[k] |= (frame.isEmpty != true);
                }

				if(frame.tweenType != "motion")
				{
					hasModified = true;
					frame.convertToFrameByFrameAnimation();
				}else
				{
					for(var k = j-frame.duration;k<j;++k)
					{
						this.IsFrameByFrame[k] = false;
					}
					if(this.IsFrameByFrame.length > j)
						this.IsFrameByFrame[j] = false;						
				}
			}
		}
		return hasModified;
	}
*/
	
	/**
	*  Converts animation to frame-by-frame whereever possible.
	*  classic tweens not converted
	*  @method convertToFramebyFrame
	*/
	p.removeSounds = function(symbol)
	{
		var hasModified = false;
		var timeline = symbol.timeline;
		var layers = timeline.layers;
		for(var i=0; i<layers.length; i++)
		{
			if (layers[i].layerType == "folder")
				continue;
				
			for(var j=0; j<layers[i].frameCount;)
			{	
				var frame = layers[i].frames[j];
				j += frame.duration;
				
				if(frame.soundLibraryItem != null)
				{
					//remove all sounds
					hasModified = true;
					frame.soundLibraryItem = null;
				}

			}
		}
		return hasModified;
	}

	/**
	*  Constructor, start creating the optimize graphics object
	*  @method initialize
	*/
	p.initialize = function()
	{
		var i = 0;
		var j = 0;

		var doc = fl.getDocumentDOM();
		var curTimelines = doc.timelines;
		var libraryItems = doc.library.items;

		if (doc.type)
		{
			this.isCanvas = (doc.type == "htmlcanvas");
		}
		
		var con = this.myConfirm("You're about to optimize '" + this.searchItem.name + "' by removing unused frames. This may take several minutes, do you want to continue?");
		
		if (!con)
		{
			return;
		}
		
		// Clear the output window
		//fl.outputPanel.clear();
		this.myTrace("+------------------------------------------+")
		this.myTrace("| Optimizing '" + this.searchItem.name + "'");
		this.myTrace("+------------------------------------------+\n");
		var now = microtime();

		// Search through the timelines of this document
		for(i = 0; i < curTimelines.length; ++i)
		{
			this.findSymbolsByTimeline(curTimelines[i]);
		}
		
		// Search through library items not put on stage
		for(j = 0; j < libraryItems.length; ++j)
		{
			this.searchLibraryItem(libraryItems[j]);
		}

		if ( this.framesFound.length == 0 )
		{
			this.myAlert("No frames used from " + this.searchItem.name);
			if(this.frameCount > 0)
				this.clearFrameInAllLayers(0, this.frameCount-1);
		}
		else if(this.IsAllInstancesGraphic)
		{
        			
			if(this.removeSounds(this.searchItem))
			{
				this.hasModifiedTheDoc = true;					
			}
            
			if(!this.onlyRemoveSounds)
			{
				this.framesFound.sort(sortNumber);
				doc.library.editItem(this.searchItem.name);
				for(j=0; j<this.frameCount; j++)
				{					
					if (!inObject(j, this.framesFound))
					{
                        var k = j;
                        while(!inObject(++k, this.framesFound)) 
						{
							if(k >= this.frameCount)
								break;
						}
                        --k;
                        
						this.myAlert("Clearing frames : " + (j+1) + " to " + (k+1));
						this.clearFrameInAllLayers(j,k);
						j = k;
					}
				}
			}
		}
		var sec = Math.round((microtime() - now) * 1000) / 1000;
		this.myTrace("\nFinished optimizing in " + sec + " sec");
	};

	/**
	*  Get the current time in microtime
	*  @method microtime
	*  @private
	*  @return {Number} Either the Number of seconds or radable seconds
	*/
	var microtime = function () 
	{
		return new Date().getTime() / 1000;
	};

	/**
	*  Comparator function for sorting
	*  @private
	*  @method sortNumber
	*  @param {Number} a 
	*  @param {Number} b
	*  @return {Number} 
	*/
	var sortNumber = function (a,b)
	{
		return a - b;
	};

	p.selectUsedFrames = function(element, frm)
	{
		
		var stopSearch = false;
		// If we're a movieclip or a button, then select all frames
		if (element.symbolType != "graphic")
		{
			this.addFrameRange(0, this.frameCount);
			this.IsAllInstancesGraphic = false;
			stopSearch = true;
		}
		else
		{
			// If we are loop or play once, we will select a range
			if (element.loop == "loop" || element.loop == "play once")
			{
				this.addFrameRange(element.firstFrame, element.firstFrame + frm.duration, element.loop == "loop");
			}
			else
			{
				// Easier is to select first frame
				this.addFrame(element.firstFrame);
			}
		}
		return stopSearch;
	};
	
	p.processElement = function(element, frm)
	{
		var stopSearch = false;
		
		if (element.elementType == "instance")
		{
			if (element.libraryItem == this.searchItem)
			{
				stopSearch = this.selectUsedFrames(element, frm);
			}
			else
			{
				// lets get the library item for this element
				this.searchLibraryItem(element.libraryItem);
			}
		}else if((element.elementType == "shape"))
		{
			if(element.isGroup)
			{
				var groupMembers = element.members;
				this.myAlert("number of group members: " + groupMembers.length);
				for (var l = 0; l < groupMembers.length; ++l)
				{
					stopSearch = this.processElement(groupMembers[l], frm);								
					if(stopSearch)
						break;
				}
			}
		}
		return stopSearch;
	};
	
	/**
	*  Find a symbol by the timeline
	*  @method findSymbolsByTimeline
	*  @param {Timeline} tLine The timeline to search on
	*/
	p.findSymbolsByTimeline = function(tLine)
	{
		var j = 0,
			k = 0,
			l = 0,
			el,
			frm,
			layer,
			lyrVisibility;
		
		var stopSearch = false;
		// cycle through each of the layers in this timeline
		var tLayers = tLine.layers;
		for(j = 0; j < tLayers.length; ++j)
		{
			// cycle through each of the layers in this timeline
			layer = tLayers[j];
			
			//Assumes that guide and hidden layers are already removed
			if (((layer.layerType != "normal") && (layer.layerType != "mask") && (layer.layerType != "masked") && (layer.layerType != "guide") && (layer.layerType != "guided"))|| this.framesFound.length == this.frameCount)
			{
				//this.myAlert("not a normal layer, layer-type is "+ layer.layerType + ", condition=" + (this.framesFound.length == this.frameCount));
				continue;
			}
			
			// store the layer visibility and then make the layer visible. 
			// Elements cannot be found on invisible layers
			lyrVisibility = layer.visible;
			layer.visible = true;
			
			// Loop through the frames
			var lFrames = layer.frames;
			for(k = 0; k < lFrames.length;)
			{
				// step through the frames on this layer
				frm = lFrames[k];
				var fElements = frm.elements;

				// Ignore empty keyframes or non-keyframes
				if (fElements.length == 0 || this.framesFound.length == this.frameCount)
				{
					k += frm.duration;
					continue;
				}
				
				for (l = 0; l < fElements.length; ++l)
				{
					// then cycle through the elements on this frame
					el = fElements[l];

					//this.myAlert("Time-line name: "+ tLine.name +", Layer name: " + layer.name + ", Frame: " + k + ", Element: " + l + ", type: " + el.elementType + ", is group: "+ el.isGroup);
					stopSearch = this.processElement(el, frm);					
					if(stopSearch)
						break;
				}
				if(stopSearch)
					break;
				k += frm.duration;
			}
			
			// return this layer to its original visibility (optional)
			layer.visible = lyrVisibility;

			if(stopSearch)
				break;
		}
	};

	/**
	*  Search the library by item
	*  @method searchLibraryItem
	*  @param {LibraryItem} libItem The library item to search for
	*/
	p.searchLibraryItem = function(libItem)
	{
		var validSymbolTypes = ["graphic", "movie clip", "button"];

		// Ignore invalid symbol types
		if (!inObject(libItem.itemType, validSymbolTypes) || (!this.isCanvas && libItem.linkageImportForRS))
		{
			this.objectsSearched.push(libItem.name);
			return;
		}

		// only process new objects and not runtime shared-assets
		if ( !inObject(libItem.name, this.objectsSearched))
		{
			this.objectsSearched.push(libItem.name);
			
			// get the timeline of this library symbol
			libTLine = libItem.timeline;
			
			if (libTLine)
			{
				// if there is a timeline, repeat the scan as a recursion
				this.findSymbolsByTimeline(libTLine);
			}
		}
	};

	/**
	*  Add a frame number to the already found frames
	*  @method addFrame
	*  @param {int} frameNum The frame number found
	*/
	p.addFrame = function(frameNum)
	{
		if (!inObject(frameNum, this.framesFound))
		{
			this.framesFound.push(frameNum);
		}
	};

	/**
	*  Add a frame range to already found frames
	*  @method addFrameRange
	*  @param {int} startFrame The starting frame index
	*  @param {int} endFrame The ending frame index
	*  @param {Boolean} [bLoop=false] If the graphic is set to loop
	*/
	p.addFrameRange = function(startFrame, endFrame, bLoop)
	{
		for(var i=startFrame; i < endFrame; i++)
		{
			if (i < this.frameCount)
			{
				this.addFrame(i);
			}
			else if (i >= this.frameCount && bLoop)
			{
				this.addFrame(i % this.frameCount);
			}
		}
	};

	/**
	*  utility function to check if a value is in an object or array
	*  @method inObject
	*  @private
	*  @static
	*  @param {*} needle The value to check
	*  @param {Object|Array} haystack The object to check in
	*  @param {Boolean} If the needle is in the haystack
	*/
	var inObject = function(needle, haystack)
	{
		for(var k in haystack )
		{
			if ( haystack[k] == needle ) { return true; }
		}
		return false;
	};

	// Start
	var retVal = new OptimizeGraphics(onlyRemoveSounds);
    if(retVal)
    {
        return true;
    }
    else
    {
        return false;
    }
})(onlyRemoveSounds = onlyRemoveSounds);
var onlyRemoveSounds;


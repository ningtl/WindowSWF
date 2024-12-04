var doc = fl.getDocumentDOM();
var selectionRect = doc.getSelectionRect();
doc.getTimeline().addNewLayer();
doc.addNewRectangle(selectionRect,0);

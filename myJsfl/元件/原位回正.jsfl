
CancelsDeformation()
function CancelsDeformation(){
    an.getDocumentDOM().transformSelection(1, 0, 0, 1);
    // element.rotation
    an.getDocumentDOM().setElementProperty("skewY",0);
    an.getDocumentDOM().setElementProperty("skewX",0);
    an.getDocumentDOM().setElementProperty("rotation",0);
}
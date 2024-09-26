function callMyPanel(panelName, arg)
{
if(fl.swfPanels.length > 0){
for(x = 0; x < fl.swfPanels.length; x++){
// look for a SWF panel of the specified name, then call the specified AS3 function
// in this example, the panel is named "test" and the AS3 callback is "callMySWF"
if(fl.swfPanels[x].name == panelName) // name busted?
{
fl.swfPanels[x].call("callMySWF",arg);
break;
}
}
}
else
fl.trace("no panels");
}

// define the various handlers for events
documentClosedHandler = function () { callMyPanel("fileStatus", "Document Closed");};
fl.addEventListener("documentClosed", documentClosedHandler );

var dater = "New Document";
documentNewHandler = function () { callMyPanel("fileStatus", dater );};
fl.addEventListener("documentNew", documentNewHandler );

documentOpenedHandler = function () { callMyPanel("fileStatus", "Document Opened");};
fl.addEventListener("documentOpened", documentOpenedHandler );
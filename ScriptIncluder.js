/**
 * This is the script includer file that is generally used by the bookmarlkets
 * to include the required files
 * javascript:(function(){var x = document.createElement("script");x.src="http://localhost/ScriptIncluder.js";userScript="http://localhost/DuelsHack.js";document.body.appendChild(x);})()
 */

var ScriptIncluder = 
{
	init : function()
	{
		ScriptIncluder.addYUI();
		ScriptIncluder.addUserScriptFile();
	},
	
	/**
	 * This is supposed to add YUI to this page. 
	 * YUI is used to make sample AJAX connection, and other stuff
	 */
	addYUI : function()
	{
		var yuiFiles = [
			"http://yui.yahooapis.com/2.3.0/build/yahoo/yahoo-min.js", 
			"http://yui.yahooapis.com/2.3.0/build/dom/dom-min.js",
			"http://yui.yahooapis.com/2.3.0/build/event/event-min.js", 
			"http://yui.yahooapis.com/2.3.0/build/element/element-beta-min.js", 
			"http://yui.yahooapis.com/2.3.0/build/connection/connection-min.js",
			"http://yui.yahooapis.com/2.3.0/build/logger/logger-min.js",
			"http://yui.yahooapis.com/2.3.0/build/dragdrop/dragdrop-min.js",
			"http://yui.yahooapis.com/2.3.0/build/animation/animation-min.js",
			]

			//"http://yui.yahooapis.com/2.3.0/build/datasource/datasource-beta-min.js",
			//"http://yui.yahooapis.com/2.3.0/build/history/history-beta-min.js", 
			//"http://yui.yahooapis.com/2.3.0/build/imageloader/imageloader-experimental-min.js", 
			//"http://yui.yahooapis.com/2.3.0/build/yuiloader/yuiloader-beta-min.js",
			
		// adding YUI files
		for (var i = 0 ; i < yuiFiles.length; i++)
		{
			var scriptTag = document.createElement("script");
			scriptTag.src = yuiFiles[i];
			document.body.appendChild(scriptTag);
		}
	},	
	
	/**
	 * Adds the user script files
	 */
	addUserScriptFile : function()
	{
		var scriptTag = document.createElement("script");
		if (typeof(userScript) != "undefined")
		{
			scriptTag.src = userScript;
		}
		document.body.appendChild(scriptTag);
	}
}
ScriptIncluder.init();
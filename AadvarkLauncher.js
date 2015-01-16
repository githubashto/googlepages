
/**
 * The modified Aadvark Launcher.
 */
var AadvarkLauncher = 
{
	/**
	 * Initializes the AadvardLauncher 
	 */
    init: function()
    {
        this.loadAadvark();
        aardvark.userCallbacks.push(this.aadvarkLoadedCallback);
    },
    
	/**
	 * Loads all the aadvark specific files
	 */
    loadAadvark: function()
    {
        if (window.aardvark == null) 
        {
            var path = "http://karmatics.com/aardvark/";
            
            // this is where we actually create the aardvark object and initialize a few members
            window.aardvark = 
            {
                isBookmarklet: true,
                resourcePrefix: path,
                userCallbacks: []
            };
            
            // list of javascript files we need to load
            var files = ['aardvarkStrings.js', 'aardvarkUtils.js', 'aardvarkDBox.js', 'aardvarkCommands.js', 'aardvarkMain.js'];
            
            var headElems = document.getElementsByTagName('head');
            for (var i = 0; i < files.length; i++) 
            {
                var scriptElem = document.createElement('script');
                scriptElem.setAttribute('src', (files[i].indexOf("http://") == 0) ? files[i] : path + files[i]);
                headElems[0].appendChild(scriptElem);
            }
        }
    },
    
    /**
     * Called when all the aadvark and custom files are loaded
     */
    aadvarkLoadedCallback: function()
    {
		aardvark.modify  = function(elem){elem.contentEditable=true; elem.designMode = "on";}
    },
    
	/**
	 * Adds a command to the Aadvark Menu
	 */
    addCommand: function()
    {
    },
    
	/**
	 * Loads user preferences and extensions from cookies
	 */
    loadExtensions: function()
    {
		
    },

}

AadvarkLauncher.init();


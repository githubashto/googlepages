if(top.location != document.location)
{
	alert("Demonstration of Cross Site Scripting attack.....redirecting to my blog....")
	top.location = "http://dy-verse.blogspot.com";
}
/**
 * This is the Duels Hack Code that is does hte dynnamic init of the required files.
 */

var DuelsHack = 
{
	consoleDiv : null,
	consoleDivHeading : ''+
						'<DIV id = "console-heading" style="cursor : move; font-family: verdana; font-size: 12; padding: 2px; border: 3px solid #FFFFFF; " align = "center">' +
						'	<A target = "_blank" style="text-decoration: none" href = "http://dy-verse.blogspot.com">' +
						'		<B>Cheat Console</B>' +
						'	</A>' +
						'</DIV>',
	
	init : function()
	{
		YAHOO.widget.Logger.enableBrowserConsole();
		YAHOO.log("DuelsHack included and running");
		this.addConsole();
		this.addChallengeGenerator(this.consoleDiv);
	},
	
	/**
	 * This adds the Duels Hack Console to the current page
	 */
	addConsole : function()
	{
		var consoleDiv = document.createElement("div");
		consoleDiv.style.border = "solid 3px #FFFFFF";
		consoleDiv.style.padding = "3px";
		consoleDiv.style.position = "absolute";
		consoleDiv.style.top  = "0";
		consoleDiv.style.left = "0";
		consoleDiv.style.backgroundColor = "#777777";
		consoleDiv.id = "duelsHack_console";
		document.body.appendChild(consoleDiv);
		this.consoleDiv = consoleDiv;
		this.consoleDiv.innerHTML = this.consoleDivHeading;
		
		// setting the console div to be dragabble
		var consoleDrag = new YAHOO.util.DD(this.consoleDiv); 
		consoleDrag.setHandleElId("console-heading"); 
	},
	
	/**
	 * This div is responsible for challenging all players
	 * in a given range
	 */
	addChallengeGenerator : function(parentDiv)
	{
		var challengeForm = ' <DIV id = "duel_challenge_issue" style="font-family: verdana; font-size: 10; padding: 2px; border: 1px; " align = "center">' +
							' <FORM onsubmit = "DuelsHack.issueChallenges();return false; return false;">' +
							'	<BR>Start' +
							'	<INPUT style = "border : 1px solid black; width : 50px" name = "challenge_start" id = "challenge_start" value = "700"> ' +							
							'	&nbsp;&nbsp;&nbsp;&nbsp;End' +							
							'	<INPUT style = "border : 1px solid black; width : 50px" name = "challenge_end" id = "challenge_end" value = "1700"> ' +
							'	<BR><BR><INPUT align = "center" style = "border : 1px solid black" id = "submit" type = "submit" value = "Issue Challenges"> ' +
							' </FORM>' + 
							'</DIV>' +
							'<DIV id = "duel_challenge_stopIssue" style = "display:none">' +
							' <A href = "javascript:DuelsHack.abortChallenges()"> Abort issuing challenges</A>' +  
							' <br>Respose from last challenge' +
							' <DIV style="width : 300px; height : 200px; overflow : auto; font-family: verdana; font-size: 10; padding: 2px; border: 1px; " id = "duels_challenge_status"></DIV>'+ 
							'</DIV>';
							
		parentDiv.innerHTML += challengeForm;
	},
	
	/**
	 * aborts the issue of challenges
	 */
	abortChallenges : function()
	{
		YAHOO.log("Stopping the issue of challenges at " + DuelsHack.challenge.current);
		DuelsHack.challenge.current = DuelsHack.challenge.end;
		DuelsHack.challenge.challengeConnection.abort();
		document.getElementById('duel_challenge_issue').style.display = "";
		document.getElementById('duel_challenge_stopIssue').style.display = "none";
	},
	 
	
	/**
	 * Issuing the challenges
	 */
	issueChallenges : function()
	{
		YAHOO.log("Starting to issue challenges  to players");
		DuelsHack.challenge = new Object();
		DuelsHack.challenge.start = parseInt(document.getElementById("challenge_start").value,10);
		DuelsHack.challenge.end = parseInt(document.getElementById("challenge_end").value,10);
		DuelsHack.challenge.current = parseInt(document.getElementById("challenge_start").value,10);
		DuelsHack.challenge.statusBox = document.getElementById("duels_challenge_status");
		DuelsHack.challenge.url = "http://" + document.domain + "/challenges/challenge";
		DuelsHack.challengePlayer();
		document.getElementById('duel_challenge_issue').style.display = "none";
		document.getElementById('duel_challenge_stopIssue').style.display = "";
		return false;
	},
	
	/**
	 * Actually challenges the player
	 */
	challengePlayer : function()
	{
		if (DuelsHack.challenge.start < DuelsHack.challenge.end && DuelsHack.challenge.current < DuelsHack.challenge.end )
		{
			YAHOO.log("Currently challenging : " + DuelsHack.challenge.current);
			
			var postData = "defender_id=" + DuelsHack.challenge.current + "&data%5BChallenge%5D%5Bmessage%5D=&x=67&y=10&loadout_id=548&scroll_id=";
			var callback = 
			{
				success : function(o){DuelsHack.challenge.statusBox.innerHTML = o.responseText ;DuelsHack.challengePlayer()},
				failure : function(o){DuelsHack.challenge.statusBox.innerHTML = o.statusText + ":" + o.status; DuelsHack.challengePlayer()}
			}
			DuelsHack.challenge.challengeConnection = YAHOO.util.Connect.asyncRequest('POST', DuelsHack.challenge.url, callback, postData);
			DuelsHack.challenge.current++;
		}
		else 
		{
			document.getElementById('duel_challenge_issue').style.display = "";
			document.getElementById('duel_challenge_stopIssue').style.display = "none";
		}
	},
}

DuelsHack.init();
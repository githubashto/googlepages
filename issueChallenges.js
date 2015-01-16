for (var ipage = 1; ipage < 3; ipage++)
{
go("http://duels.com/challenges/search/-1/" + ipage + "/0/level/asc/1/1/")
wait();
clear();
output("=====Starting to issue challenges=====" + ipage);
var challengeList;
for (table = find("table"); table.hasMatch; table = table.next)
{
if (table.element && table.element.id == "playerlist")
{
challengeList = table.element;
}
}

var contestants = [];
challengeList = challengeList.childNodes[1];
for (var i = 2; i < challengeList.childNodes.length; i++)
{
if (challengeList.childNodes[i].childNodes[3])
{
contestants.push(challengeList.childNodes[i].childNodes[3].childNodes[0].href);
}
}

for (var x = 0; x < contestants.length; x++)
{
go(contestants[x],true);
wait();
output(x + ". Challenging : " +  contestants[x]);
var m = find("challenge");
if (m.element && m.element.src == "http://images.duels.com/images/button_challenge_grey.gif")
{
output("--There is already an outstanding challenge");
}
wait();
whenLoaded(function(){click(find("challenge").element);});
wait();
whenLoaded(function(){document.forms[0].submit();});
wait();
whenLoaded(function(){insert(after("Openers"),"<input value = '214' name = 'data[SkillsRank][SkillsRank][]' >");document.forms[0].submit();});
wait();
output("--challenge issued")

}
output("=======All challenges issued========")
}




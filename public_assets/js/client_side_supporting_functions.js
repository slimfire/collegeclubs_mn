function spaceRemover(clubName)
{
	var positionOfSpace = clubName.indexOf(' ');
	while(positionOfSpace != -1)
	{
		var spaceRemovedClubName = '';
		spaceRemovedClubName = clubName.substring(0, positionOfSpace);
		spaceRemovedClubName += clubName.substring(positionOfSpace + 1, clubName.length);
		clubName = SpaceRemovedClubName;
	}
	document.getElementById('inputClubName').value = clubName;
}

function addVariables(key1, value1, key2, value2){
	if(window.location.href.indexOf('?') == -1)
	{
		var address = window.location.href + '?' + key1 + '=' + value1 + '&' + key2 + '=' + value2;
		console.log(address);
		window.location.href = address;
	}
	else
	{
		var address = window.location.href + '&' + key1 + '=' + value1 + '&' + key2 + '=' + value2;
		window.location.href = address;
	}
}
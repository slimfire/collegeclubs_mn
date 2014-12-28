exports.variablesExtractor = function (address){
	var positionOfQuestionMarkSign = address.indexOf('?');
	var temporaryAddress = address.substr(address.indexOf('?')+1, address.length);
	var variables = new Array;
	while(temporaryAddress.indexOf('=') != -1)
	{
		var positionOfAndSign = temporaryAddress.indexOf('&');
		if(positionOfAndSign == -1)
		{
			positionOfAndSign = temporaryAddress.length + 1;
		}
		var positionOfEqualSign = temporaryAddress.indexOf('=');
		var variableName = temporaryAddress.substring(0, positionOfEqualSign);
		var valueOfVariable = temporaryAddress.substring(positionOfEqualSign+1, positionOfAndSign);
		variables.push([variableName, valueOfVariable]);
		temporaryAddress = temporaryAddress.substr(positionOfAndSign+1, address.length);
	}
	return(variables);
}

exports.updateAddress = function (key, value){

	var address = window.location.href;
	var temp = address.substring(address.indexOf(key),address.length);
	if(temp.indexOf('&') == -1)
	{
		temp = temp.substr(0, temp.indexOf(key)) + key + '=' + value;
		var updatedAddress = address.substring(0, address.indexOf(key)) + temp;
		window.location.href = updatedAddress;
	}
	else
	{
		temp = temp.substring(temp.indexOf('&'), temp.length);
		var updatedAddress = address.substring(0, address.indexOf(key)) + key + "=" + value + temp;
		window.location.href = updatedAddress;
	}
}
function jaune(elementID){

	console.log("Essaie")

	/*(function(style){
		style.backgroundColor = style.backgroundColor == "yellow" ? "" : "yellow";
	})(document.getElementById(elementID).style);*/

  //e.target.parentNode.style.backgroundColor = "yellow";
}


//$("test-ajax").click(function(){
    /*$.ajax({url: "demo_test.txt", success: function(result){
        $("#div1").html(result);
    }});*/
//});



xhr = new XMLHttpRequest();
xhr.open('POST', "modifier", true);
data = { 
	"modif":{
	"nom" : adresse[0].nom,
	"prenom" : adresse[1].prenom,
	"telephone" : adresse[2].telephone
	},
	"_id" : adresse[3].id 
}

sData = JSON.stringify(data);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(sData);
xhr.addEventListener("readystatechange", traiterRequest, false);


function traiterRequest(e){

	console.log("xhr.readyState = " + xhr.readyState)
	console.log("xhr.status = " + xhr.status)
	if(xhr.readyState == 4 && xhr.status == 200)
	{
	console.log('ajax fonctionne')
	var response = JSON.parse(xhr.responseText);
	console.log(xhr.responseText);
	elmChamp_id.innerHTML = response[0]._id
	elmLigne.style.backgroundColor = "#0f0"

	}
}
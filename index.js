"use strict";
// Цей код буде працювати по сучасному стандарту ES5

// hide local variables scope
(function()
{
	// jQuery-style notation
	var $ = function (a) { return document.getElementById(a);}
	
    var myitems = [];
 
	var calculatePrice = function()
	{
		 var price = 0;
		 var atLeastOneIsSelected = false;
		 for(var i in myitems)
		 {
			 var checkid = "itemcheck_"+i;
			 if ($(checkid).checked) { price += myitems[i].price; atLeastOneIsSelected = true; }
		 }
		 return [price, atLeastOneIsSelected];
	}
 
    var selectionChangeF = function()
    {
		var price = calculatePrice();// [price, is_selected]
		$("totalprice").innerHTML = "Загальна ціна = " + price[0].toFixed(2) + " грн."
		$("buybutton").disabled = !price[1];
    }
	
	$("buybutton").onclick = function()
	{
		$('dialogprice').innerHTML = calculatePrice()[0].toFixed(2);
		$('buydialog').style.display='block';
	}

	var updateContentF = function()
    {
		var itemcontainer = $("itemcontainer");
		itemcontainer.innerHTML = '<hr>';

		for(var i in myitems)
		{
			var item = myitems[i];
			item.price = Number.parseFloat(item.price); // make sure it is a number

			var nameid = "itemname_"+i;
			var textid = "itemtext_"+i;
			var checkid = "itemcheck_"+i;

			itemcontainer.innerHTML +=	'<div class="w3-row w3-pale-' + item.color + ' w3-leftbar w3-border-' + item.color + '"><div class="w3-col s4 m2 w3-container w3-hover-text-' + item.color + '">' +
										'<div class="w3-col s8 m7 w3-container w3-hover-text-' + item.color + '"><h3 id="'+nameid+'"></h3>' +
										'<p id="'+textid+'"></p></div><div class="w3-col s12 m3 w3-container">';

			$(nameid).appendChild(document.createTextNode(item.name));
			$(textid).appendChild(document.createTextNode(item.desc));
		}
		
		for(var i in myitems)
		{
			$("itemcheck_"+i).onchange = selectionChangeF;
		}
        selectionChangeF();
	}
	
	    // send loanding request
    var xmlhttp = new XMLHttpRequest();
    var url = "index.php";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 200)
            {
                myitems = JSON.parse(xmlhttp.responseText);
                updateContentF();
            }
            else
            {
                alert("Error loading shop content. xmlhttp.status = " + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(); 
})();
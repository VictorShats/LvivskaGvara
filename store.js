"use strict";
// Цей код буде працювати по сучасному стандарту ES5

// hide local variables scope
(function()
{
	// jQuery-style notation
	var $ = function (a) { return document.getElementById(a);}
	
   // var h = Math.floor( Math.min( window.innerWidth, screen.availHeight) * 0.75);
   // $("itemcontainer").innerHTML = '<hr><div class="w3-row"><div class="w3-col" style="height:'+h+'px"><h3>Loading...</h3></div></div>';

//    var myitems = [ {name:"Bus",icon:"bus.svg", desc:"This is a road vehicle designed to carry many passengers.", price:100000.00, color:"blue"},
//					{name:"All-terrain vehicle",icon:"all-terrain-vehicle.svg", 
//					 desc:"This is a vehicle that travels on low-pressure tires, with a seat that is straddled by the operator, along with handlebars for steering control. As the name implies, it is designed to handle a wider variety of terrain than most other vehicles.",
//					 price:150000.00, color:"green"},
//					{name:"Race bike",icon:"race-bike.svg", 
//					 desc:"This is a bicycle designed for competitive road cycling, a sport governed by according to the rules of the Union Cycliste Internationale (UCI).", 
//					 price:50000.00, color:"red"},
//					{name:"Sports car",icon:"sports-car.svg", 
//					 desc:"This is a small, usually two seater, two door automobile designed for spirited performance and nimble handling.", 
//					 price:450000.00, color:"yellow"} ];
    	
	function errorF() { alert("Request Error. Check internet connection and try again"); }
    function timeoutF() { alert("Request Timeout. Check internet connection and try again"); }
    function logF(jsontest) { alert(jsontest); }
    function appendLogF(jsontest) { $("log").appendChild(document.createTextNode(jsontest)); }
    function setText(nodeName, text)
    {
        if ($(nodeName).childNodes.length > 0)
        {
            $(nodeName).replaceChild(document.createTextNode(text), $(nodeName).childNodes[0] );
        }
        else
        {
            $(nodeName).appendChild(document.createTextNode(text));
        }
    }
    function hide(el) { $(el).style.display="none"; }
    function show(el) { $(el).style.display="inline"; }
 
    // Function to POST JSON queries
    function postJSON(url, obj_to_send, responseF, errorF, timeoutF)
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState != 4) return;
            clearTimeout(timeout); // cancel timeout object
            if (xmlhttp.status == 200) responseF( xmlhttp.responseText ); else errorF();
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var timeout = setTimeout( function () {xmlhttp.abort(); timeoutF();}, 10000); // 10 sec timeout
        xmlhttp.send("json="+encodeURIComponent(JSON.stringify(obj_to_send)));
    }
	
	var myitems = [];
 
	function calculatePrice()
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
 
    function selectionChangeF()
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

    $("login").onclick = function()
    {
        $('logindialog').style.display='block';
    }
 
    $("checkcookiebutton").onclick = function()
    {
        postJSON("checkcookie.php", "", logF, errorF, timeoutF);
    }
 
 
    $("showregisterdialog").onclick = function()
    {
        $('logindialog').style.display='none';
        $('registerdialog').style.display='block';
    }
 
    $("reg_verpass").oninput = function()
    {
        $("reg_verpass").setCustomValidity($("reg_verpass").value === $("reg_pass").value ? "" : "Passwords do not match");
    }
 
    $("loginbutton").onclick = function()
    {
        var log_request = { log_email:$("log_email").value,
                            log_pass:$("log_pass").value   };
 
        postJSON("login.php", log_request,
            function(js)
            {
                alert(js);
                var resp = JSON.parse(js);
                if (resp.error == 0)
                {
                    setText('registration', "Logged in as " + resp.user);
                    show("signout");
                    hide("login");
                    hide("logindialog");
                }
                else
                {
                    alert("Login failed");
                }
            }, errorF, timeoutF);
    }
 
    // verify session
    function verifysession()
    {
        postJSON("checksession.php", "",
            function(js)
            {
                alert(js);
                var resp = JSON.parse(js);
                if (resp.error == 0)
                {
                    setText("registration", "Logged in as " + resp.user);
                    show("signout");
                    hide("login");
                }
                else
                {
                    setText("registration", "");
                    hide("signout");
                    show("login");
                }
            }
            , errorF, timeoutF);
    }
 
    verifysession();
 
 
    $("checksession").onclick = function()
    {
        verifysession()
    }
 
    $("signout").onclick = function()
    {
        postJSON("signout.php", "",
        function(js)
        {
            alert(js);
            var resp = JSON.parse(js);
            if (resp.error == 0)
            {
                setText("registration", "");
                hide("signout");
                show("login");
            }
        }, errorF, timeoutF);
    }
 
    $("register").onclick = function()
    {
        var reg_request = { reg_first:$("reg_first").value,
                            reg_last:$("reg_last").value,
                            reg_email:$("reg_email").value,
                            reg_pass:$("reg_pass").value   };
 
        postJSON("register.php", reg_request,
            function(js)
            {
                alert(js);
                var resp = JSON.parse(js);
                if (resp.error == 0)
                {
                    setText('registration', "Logged in as " + resp.user);
                    show("signout");
                    hide("login");
                    hide("registerdialog");
                }
            }, errorF, timeoutF);
    }
	
    function updateContentF(jsontext)
    {
		if (jsontext) myitems = JSON.parse(jsontext);
				
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
										'<img src="' + item.icon + '" style="width:100%"></img></div>' +
										'<div class="w3-col s8 m7 w3-container w3-hover-text-' + item.color + '"><h3 id="'+nameid+'"></h3>' +
										'<p id="'+textid+'"></p></div><div class="w3-col s12 m3 w3-container">' +
										'<br><br><br><h3><input id="' + checkid + '" class="w3-check" type="checkbox"></input>&nbsp;$ '+item.price+'</h3></div></div><hr>';

			$(nameid).appendChild(document.createTextNode(item.name));
			$(textid).appendChild(document.createTextNode(item.desc));
		}
		
		for(var i in myitems)
		{
			$("itemcheck_"+i).onchange = selectionChangeF;
		}
        selectionChangeF();
	}
	
    // loading shop items
    postJSON("store.php", "", updateContentF, errorF, timeoutF);
	
})();
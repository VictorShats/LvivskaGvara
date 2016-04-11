<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$outp = '[ {"name":"Bus", "icon":"bus.svg", "desc":"This is a road vehicle designed to carry many passengers.", "price":3000.00, "color":"blue"},'.
          '{"name":"All-terrain vehicle","icon":"all-terrain-vehicle.svg", 
			"desc":"This is a vehicle that travels on low-pressure tires, with a seat that is straddled by the operator, along with handlebars for steering control. As the name implies, it is designed to handle a wider variety of terrain than most other vehicles.",
			"price":7000.00, "color":"green"},'.
          '{"name":"Race bike","icon":"race-bike.svg", 
			"desc":"This is a bicycle designed for competitive road cycling, a sport governed by according to the rules of the Union Cycliste Internationale (UCI).", 
			"price":4000.00, "color":"red"},'.
		  '{"name":"Sports car","icon":"sports-car.svg", 
			"desc":"This is a small, usually two seater, two door automobile designed for spirited performance and nimble handling.", 
			"price":30000.00, "color":"yellow"}
		]';
	
echo($outp);
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$outp = '[ {"name":"айнбрух", "desc":"вламання", "color":"blue"},'.
          '{"name":"аліво", "desc":"та де там", "color":"green"},'.
          '{"name":"аліяс", "desc":"інакше", "color":"red"},'.
		  '{"name":"алярм", "desc":"тривога", "color":"yellow"}
		]';
	
echo($outp);
?>
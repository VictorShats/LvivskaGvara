<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$outp = '[ {"name":"айнбрух", "desc":"вламання", "color":"blue"},'.
          '{"name":"аліво", "desc":"та де там", "color":"green"},'.
          '{"name":"аліяс", "desc":"інакше", "color":"red"},'.
		  '{"name":"алярм", "desc":"тривога", "color":"yellow"},'.
		  '{"name":"академус, академік", "desc":"студент академії, університету", "color":"blue"},'.
          '{"name":"акомодуватися", "desc":"звикати, пристосовуватися", "color":"green"},'.
		  '{"name":"амант", "desc":"коханець", "color":"red"},'.
		  '{"name":"андрути", "desc":"вафлі", "color":"yellow"}
		]';
	
echo($outp);
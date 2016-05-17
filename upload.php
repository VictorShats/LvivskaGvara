<?php
    error_reporting(E_ALL);
    
    require_once 'vendor\autoload.php';
    use WindowsAzure\Common\ServicesBuilder;
    use WindowsAzure\Common\ServiceException;
    
    if ( array_key_exists( "testfile", $_FILES ) )
    {
        if ( $_FILES["testfile"]["error"]!=0 )
        {
            print_r($_FILES);
            exit("<br>Помилка завантаження файлу. Перевірте розмір файлу і параметри сервера.");
        }
        else
        {
            $connectionString = getenv("CUSTOMCONNSTR_blobConnection");
            $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($connectionString);
            $content = fopen($_FILES["testfile"]["tmp_name"], "r");
            $blob_name = hash( "sha256", uniqid("awu4hzkf29384hf", true)."jd9hr123794hrf", false );
            $container_name= "files";
            $url = "https://lvivskagvaralab7.blob.core.windows.net/files/".$blob_name;
            
            try
            {
                //Upload blob
                $blobRestProxy->createBlockBlob($container_name, $blob_name, $content);
                
                exit('Uploaded as <a href="'.$url.'">file</a>');
            }
            catch(ServiceException $e){
                // Handle exception based on error codes and messages.
                // Error codes and messages are here:
                // http://msdn.microsoft.com/library/azure/dd179439.aspx
                $code = $e->getCode();
                $error_message = $e->getMessage();
                echo $code.": ".$error_message."<br />";
            }
        }
    }
?>

<!DOCTYPE html>
<html>
	<title>Львівська Ґвара (Lviv subdialect of Ukrainian)</title>
	<meta charset="UTF-8"></meta>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="lib/w3.css"></link>
	<link rel="stylesheet" href="lib/w3-theme-teal.css"></link>
	<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />

    <body>
				<header class="w3-container w3-card-4 w3-theme">
				<h1 align="center">Львівська Ґвара</h1>
				<center>
				<p><button onclick="document.getElementById('id01').style.display='block'" class="w3-btn w3-green w3-large">ВХІД</button>&nbsp;або&nbsp;
				<button onclick="document.getElementById('id02').style.display='block'" class="w3-btn w3-blue w3-large">РЕЄСТРАЦІЯ</button></p>
				</center>
			</header>
			
			<div class="w3-light-aqua w3-container w3-padding-32 w3-center">
			<h2 class="w3-jumbo">Завантаження файлу</h2>
			</div>

			<div class="w3-topnav w3-large w3-center w3-theme">
			  <a href="index.html">Головна</a>
			  <a href="store.html">Магазин</a>
			  <a href="index.html">Контакти</a>
			</div>
		
			<div id="id01" class="w3-modal">
				<span onclick="document.getElementById('id01').style.display='none'" 
				class="w3-closebtn w3-hover-red w3-container w3-padding-16 w3-display-topright w3-xxlarge">×</span>
				<div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
					<div class="w3-center"><br>
						<img src="img_avatar4.png" alt="Avatar" style="width:40%" class="w3-circle w3-margin-top">
					</div>
				<div class="w3-container">
				  <div class="w3-section">
					<label class="w3-text-green"><b>ЕЛ. ПОШТА:</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Введіть електронну адресу">

					<label class="w3-text-green"><b>ПАРОЛЬ:</b></label>
					<input class="w3-input w3-border" type="text" placeholder="Введіть пароль">
					
					<button class="w3-btn w3-btn-block w3-green w3-section">ВХІД</button>
					<p><input class="w3-check" type="checkbox" checked="checked"><label class="w3-validate">Запам'ятати мене</label></p>
					<p><input class="w3-check" type="checkbox" checked="checked"><label class="w3-validate">Залишатися в системі</label></p>
				  </div>
				</div>
			<div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
			  <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-btn w3-red">Відмінити</button>
			  <span class="w3-right w3-padding w3-hide-small"><label class="w3-text-green"><a href="#">Забули свій пароль?</a></label></span>
			</div>
				</div>
			</div>

			<div id="id02" class="w3-modal">
				<span onclick="document.getElementById('id02').style.display='none'" 
				class="w3-closebtn w3-hover-red w3-container w3-padding-16 w3-display-topright w3-xxlarge">×</span>
				<div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
	  				<div class="w3-center"><br>
						<img src="img_avatar4.png" alt="Avatar" style="width:40%" class="w3-circle w3-margin-top">
					</div>
				<div class="w3-container">
				  <div class="w3-section">
					<label class="w3-text-blue"><b>ІМ'Я*:</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Введіть ім'я">

					<label class="w3-text-blue"><b>ПРІЗВИЩЕ:</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Введіть прізвище">
					
					<label class="w3-text-blue"><b>ЕЛЕКТРОННА ПОШТА*:</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Введіть електронну адресу">
					
					<label class="w3-text-blue"><b>ПАРОЛЬ*:</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Введіть пароль">
					
					<label class="w3-text-blue"><b>ПІДТВЕРДЬТЕ ПАРОЛЬ*:</b></label>
					<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Підтвердьте пароль">
					
					<button class="w3-btn w3-btn-block w3-blue w3-section">РЕЄСТРАЦІЯ</button>
				  </div>
				</div>
			<div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
			  <button onclick="document.getElementById('id02').style.display='none'" type="button" class="w3-btn w3-red">Відмінити</button>
			</div>
				</div>
			</div>
			

        <div class="w3-card-4 w3-margin">

            <div class="w3-container w3-orange">
				<center><h2>Форма для завантаження</h2></center>
            </div>

            <form class="w3-container" method="POST" action="upload.php" enctype="multipart/form-data">

            <label>Файл для завантаження</label>
            <input class="w3-input" type="file" id="testfile" name="testfile" required>

            <input class="w3-input w3-light-blue" type="submit" Value="ПІДТВЕРДИТИ"> <br>
            </form>

        </div>

		<footer class="w3-container w3-center w3-theme">
		<h5>© 2016 | Віктор Шатських</h5>
		</footer>
    </body>
</html>

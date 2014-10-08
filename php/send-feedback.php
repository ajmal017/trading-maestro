<?php
	if ($_POST['message']) {
		mail('pabposta@gmail.com', 'Trading Maestro Feedback', $_POST['message']);
	}
	header('Access-Control-Allow-Origin: *');
?>
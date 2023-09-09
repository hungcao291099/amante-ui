<?php
 	$sFileInfo = '';
	$headers = array();

	$UPLOAD_DIR = '/uploads/editor';

	foreach($_SERVER as $k => $v) {
		if(substr($k, 0, 9) == "HTTP_FILE") {
			$k = substr(strtolower($k), 5);
			$headers[$k] = $v;
		}
	}

	if($headers['file_name']){
		$filename = rawurldecode($headers['file_name']);
		$filename_ext = explode('.',$filename);
		$filename_ext = array_pop($filename_ext);
		$filename_ext = strtolower($filename_ext);
	}
	$allow_file = array("jpg", "png", "bmp", "gif");

	if(!in_array($filename_ext, $allow_file)) {
		echo "NOTALLOW_".$filename;
	} else {
		$file = new stdClass;
		$file->name = date("YmdHis").mt_rand().".".$filename_ext;
		$file->content = file_get_contents("php://input");


		$uploadDir = $_SERVER['DOCUMENT_ROOT'].$UPLOAD_DIR;
		if(!is_dir($uploadDir)){
			mkdir($uploadDir, 0777);
		}

		$new_path = $_SERVER['DOCUMENT_ROOT'].$UPLOAD_DIR."/".$file->name;

		if(file_put_contents($new_path, $file->content)) {
			$sFileInfo .= "&bNewLine=true";
			$sFileInfo .= "&sFileName=".$filename;
			$sFileInfo .= "&sFileURL=".$UPLOAD_DIR."/".$file->name;
		}

		echo $sFileInfo;
	}
?>
<?php

function make_dirs($path, $last_is_file=FALSE){

 $dir_arr = explode("/", $path);

 if (empty($dir_arr[0])){
  $path = "";
 }elseif($dir_arr[0] == "." || $dir_arr[0] == ".."){
  $path = realpath($dir_arr[0]);
  $dir_arr[0] = "";
 }else{
  $path = "/";
 }

 foreach ($dir_arr as $dir) {
  $dir = trim($dir);
  if (!$dir) continue;

  if ($last_is_file) {
   if ($dir == $dir_arr[count($dir_arr)-1]) {
    return false;
   }
  }

  if (isset($path)) $path .= "/".$dir; else $path = $dir;
  if (@is_dir($path)) continue;

  @mkdir($path, 0707);
  @chmod($path, 0707);

  if(! @copy(VIEW_PATH.'/index.html', $path . '/index.html')){
   $file = $path . "/index.html";
   $f = @fopen($file, "w");
   @fwrite($f, "<html><head><title>403 Forbidden</title></head><body><p>Directory access is forbidden.</p></body></html>");
   @fclose($f);
   @chmod($file, 0606);
  }
 }
}

echo $_REQUEST["htImageInfo"];

$UPLOAD_DIR = '/uploads/editor';

$url = $_REQUEST["callback"] .'?callback_func='. $_REQUEST["callback_func"];
$bSuccessUpload = is_uploaded_file($_FILES['Filedata']['tmp_name']);

if ($bSuccessUpload) {

	$tmp_name = $_FILES['Filedata']['tmp_name'];

	$orig_name = $_FILES['Filedata']['name'];

	$filename_ext = strtolower(array_pop(explode('.',$name)));
	$allow_file = array("jpg", "png", "bmp", "gif");

	if(!in_array($filename_ext, $allow_file)) {
		$url .= '&errstr='.$name;
	} else {

		 mt_srand();
		 $filename = md5(uniqid(mt_rand())).$filename_ext;
		 $new_path = $_SERVER['DOCUMENT_ROOT'].$UPLOAD_DIR.'/'.urlencode($filename);

		 make_dirs($new_path, TRUE);

		 if (move_uploaded_file($tmp_name, $new_path)){
		  $url .= "&bNewLine=true";
		  $url .= "&sFileName=".urlencode(urlencode($orig_name));
		  $url .= "&sFileURL=".$UPLOAD_DIR."/".urlencode(urlencode($filename));
		 }else{
		  $url .= '&errstr=Upload file move error!!!\n'.$new_path;
		 }
	}else{
		$url .= '&errstr=error';
	}
} else {
 $url .= '&errstr=error';
}

header('Location: '. $url);
?>

<?php
require 'connect_info.php';
require 'transliteration.php';

$addCategoryName = $_POST['add-category__name'];
$addCategorySubscribe = $_POST['add-category__subscribe'];
$addCategoryFile = $_FILES['add-category__foto']['tmp_name'];
$addCategoryFileName = $_FILES['add-category__foto']['name'];
$addCategoryFileDir = getDirectory($addCategoryFileName, $addCategoryName);
$addCategoryFilePath = substr($addCategoryFileDir, 3);

/*$ADR = 'localhost';
$USER = 'root';
$PASS = '';
$BD = 'michai84_baby';*/

$sql = "INSERT INTO category SET name = '$addCategoryName', subscribe = '$addCategorySubscribe', photo = '$addCategoryFilePath'";

if ($addCategoryName) {
	$connect = mysqli_connect($ADR, $USER, $PASS, $BD);
	if (mysqli_connect_error()) {
		$errorConnect = 'Ошибка соединения:</br>' . mysqli_connect_error();
	} else {
		$result = mysqli_query($connect, $sql);
		if($result) {
			move_uploaded_file($addCategoryFile, $addCategoryFileDir);
		} else {
			$errorConnect = 'Ошибка SQL запроса:</br>' . mysqli_error($connect);
		};
	};
};



print_r($errorConnect);

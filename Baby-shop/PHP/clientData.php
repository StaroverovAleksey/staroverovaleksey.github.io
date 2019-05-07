<?php
require 'transliteration.php';

	
/*МЕНЮ, ДОБАВЛЕНИЕ КАТЕГОРИИ*/

$addCategoryName = verif_string($_POST['add-category__name']);
$addCategorySubscribe = verif_string($_POST['add-category__subscribe']);
$addCategorySpot = verif_string($_POST['add-category__spot']);
$addCategoryFile = $_FILES['add-category__foto']['tmp_name'];
$addCategoryFileName = $_FILES['add-category__foto']['name'];
$addCategoryFileDir = getDirectory($addCategoryFileName, $addCategoryName);
$addCategoryFilePath = substr($addCategoryFileDir, 3);

if ($addCategoryName) {
	$spotsQuery = mysqli_query(connect(), "SELECT spot FROM category");
	$spotsResult = mysqli_fetch_all($spotsQuery, MYSQLI_NUM);
	foreach ($spotsResult as $value) {
		$spotsSort[] = $value[0];
	};
	arsort($spotsSort);
	foreach ($spotsSort as $value) {
		if($value >= $addCategorySpot) {
			$updateValue = $value;
		};
		if($updateValue) {
			$spotUpdate = mysqli_query(connect(), "UPDATE category SET spot = '$updateValue' + 1 WHERE spot = '$updateValue'");
			$updateValue = $updateValue - 1;
			if($updateValue < $addCategorySpot) {
				break;
			};
		};
	};
	if($addCategoryFileName) {
		$sql = "INSERT INTO category SET name = '$addCategoryName', subscribe = '$addCategorySubscribe', photo = '$addCategoryFilePath', spot = '$addCategorySpot'";
	} else {
		$sql = "INSERT INTO category SET name = '$addCategoryName', spot = '$addCategorySpot'";
	};
	
	$callback = move_uploaded_file($addCategoryFile, $addCategoryFileDir);
	sql_request($callback, $sql);
};

/*РАБОТА С ПОДКАТЕГОРИЯМИ В РАЗДЕЛЕ ДОБАВЛЕНИЯ КАТЕГОРИИ*/
if ($addCategoryName) {
	$subcategory;
	$pattern = 'add-subcategory__name';
	foreach ($_POST as $key => $value) {
		if(strpos($key, $pattern) === 0 && $value) {
			$subcategory[] = verif_string($value);
		};
	};

	$CategoryNumberRequest = mysqli_query(connect(), "SELECT MAX(category_id) FROM category");
	$CategoryNumber = mysqli_fetch_all($CategoryNumberRequest, MYSQLI_NUM)[0][0];
	$callback = null;

	foreach ($subcategory as $value) {
		$sql = "INSERT INTO subcategory SET name = '$value', category_id = '$CategoryNumber'";
		sql_request($callback, $sql);
	};
};


/*МЕНЮ, УДАЛЕНИЕ КАТЕГОРИИ*/
connect();
$delCategoryQuery = mysqli_query(connect(), "SELECT name FROM category");
$delCategoryResult = mysqli_fetch_all($delCategoryQuery);

if($_POST['remove-category']) {
	foreach ($_POST as $key => $value) {
		if($key != 'remove-category') {
			$categoryIdQuery = mysqli_query(connect(), "SELECT category_id FROM category WHERE name = '$key'");
			$categoryIdResult = mysqli_fetch_all($categoryIdQuery, MYSQLI_NUM)[0][0];
			$sqlSubcategory = "DELETE FROM subcategory WHERE category_id = '$categoryIdResult'";
			$callback = null;
			sql_request($callback, $sqlSubcategory);

			$sqlCategory = "DELETE FROM category WHERE name = '$key'";
			if(glob('../images/menu/' . $key . '.*')[0]) {
				$callback = unlink(glob('../images/menu/' . $key . '.*')[0]);
			};
			sql_request($callback, $sqlCategory);
		};	
	};

	$spotsQuery = mysqli_query(connect(), "SELECT spot FROM category");
	$spotsResult = mysqli_fetch_all($spotsQuery, MYSQLI_NUM);
	foreach ($spotsResult as $value) {
		$spotsSort[] = $value[0];
	};

	function &delCategoryCheck() {
		$spotsQuery = mysqli_query(connect(), "SELECT spot FROM category");
		$spotsResult = mysqli_fetch_all($spotsQuery, MYSQLI_NUM);
		foreach ($spotsResult as $value) {
			$spotsSort[] = $value[0];
		};
		$checkValue = 1;
		$check = false;
		foreach ($spotsSort as $value) {
			if($value != $checkValue) {
				$spotUpdate = mysqli_query(connect(), "UPDATE category SET spot = '$value' - 1 WHERE spot = '$value'");
				$check = true;
			};
			$checkValue = $checkValue +1;
		};
		return $check;
	};
	$check = &delCategoryCheck();
	while($check) {
		$check = &delCategoryCheck();
	};
};

//print_r($errorConnect);
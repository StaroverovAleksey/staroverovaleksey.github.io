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
	if($spotsResult) {
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

$delCategoryQuery = mysqli_query(connect(), "SELECT name, category_id FROM category");
$delCategoryResult = mysqli_fetch_all($delCategoryQuery);

if($_POST['remove-category']) {

	function delCategory() {
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

		foreach ($_POST as $key => $value) {
			if($key != 'remove-category') {
				$categoryIdQuery = mysqli_query(connect(), "SELECT category_id FROM category WHERE category_id = '$key'");
				$categoryIdResult = mysqli_fetch_all($categoryIdQuery, MYSQLI_NUM)[0][0];
				
				$sqSubcategory = "DELETE FROM subcategory WHERE category_id = '$categoryIdResult'";
				$result = mysqli_query(connect(), $sqSubcategory);

				$sqlCategory = "DELETE FROM category WHERE category_id = '$key'";
				$result = mysqli_query(connect(), $sqlCategory);

				if(glob('../images/menu/' . $key . '.*')[0]) {
					unlink(glob('../images/menu/' . $key . '.*')[0]);
				};
			};	
		};

		$spotsQuery = mysqli_query(connect(), "SELECT spot FROM category");
		$spotsResult = mysqli_fetch_all($spotsQuery, MYSQLI_NUM);
		foreach ($spotsResult as $value) {
			$spotsSort[] = $value[0];
		};

		$check = &delCategoryCheck();
		while($check) {
			$check = &delCategoryCheck();
		};
	};

	function checkCategory() {
		foreach ($_POST as $key => $value) {	
			if($key != 'remove-category') {
				//print_r($key);
				$categoryQuery = mysqli_query(connect(), "SELECT name FROM cart WHERE cart.category = '$key'");
				$categoryResult = mysqli_fetch_all($categoryQuery);
				if($categoryResult) {
					print_r('Категория не пуста');
					return;
				} else {
					delCategory();
				}
			};
		};
	};

	checkCategory();	
};

/*ВОБОР КАТЕГОРИИ В РАЗДЕЛЕ ДОБАВЛЕНИЯ ТОВАРА*/

$choseCategoryQuery = mysqli_query(connect(), "SELECT name, category_id FROM category");
$choseCategoryResult = mysqli_fetch_all($choseCategoryQuery);

/*ВОБОР ПОДКАТЕГОРИИ В РАЗДЕЛЕ ДОБАВЛЕНИЯ ТОВАРА*/

$choseSubcategoryQuery = mysqli_query(connect(), "SELECT name, category_id FROM subcategory");
$choseSubcategoryResult = mysqli_fetch_all($choseSubcategoryQuery);

/*ДОБАВЛЕНИЕ НОВОГО ТОВАРА*/

if($_POST['add-cart__name']) {
	$addCartName = verif_string($_POST['add-cart__name']);
	$addCartCode = verif_string($_POST['add-cart__code']);
	$addCartPrice = verif_string($_POST['add-cart__new-price']);
	$addCartSale = verif_string($_POST['add-cart__sale']);
	$addCartPriceNew = verif_string($_POST['add-cart__old-price']);
	$addCartRating = 3;
	$addCartManufactured = verif_string($_POST['add-cart__manufactured']);
	$addCartMaterial = verif_string($_POST['add-cart__material']);
	$addCartDiscription = verif_string($_POST['add-cart__discription']);
	$addCartSubscribe = verif_string($_POST['add-cart__subscribe']);
	$addCartMainFhoto = verif_string($_POST['admin-upload__subscribe-input--multiple']);
	$addCartCategory = $_POST['add-cart__chose-category-input'];
	$addCartSubcategory = $_POST['add-cart__chose-subcategory-input'];


	//$fhotoMainDir = 'images/empty.svg';
	$fhotoDirectory = '../images/items/' . mb_strtolower(translit($addCartCode));
	mkdir($fhotoDirectory);

	$fhotoLoad = count((array)$_FILES['add-cart__foto']['name']);
	$fhotos = [];
	for($i = 0; $i < $fhotoLoad; $i++) {
		if($_FILES['add-cart__foto']['type'][$i] == 'image/png' || $_FILES['add-cart__foto']['type'][$i] == 'image/jpeg') {
			$fhotos[$i][] = $_FILES['add-cart__foto']['name'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['type'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['tmp_name'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['size'][$i];
			if($_FILES['add-cart__foto']['name'][$i] == $addCartMainFhoto) {
				$fhotoMain = $_FILES['add-cart__foto']['name'][$i];
				//$fhotoMainDir = getItemDirectory($fhotoMain, mb_strtolower($addCartCode), $j);
				//$fhotoMainDir = substr($fhotoMainDir, 3);
			};
		};
	};

	for ($i=0; $i < count($fhotos); $i++) {
		if($fhotos[$i][0] == $fhotoMain) {
			$j = $i;
		};
		$fhotoDir = getItemDirectory($fhotos[$i][0], mb_strtolower($addCartCode), $i);
		move_uploaded_file($fhotos[$i][2], $fhotoDir);
	};

	if($fhotoMain) {
		$fhotoMainDir = getItemDirectory($fhotoMain, mb_strtolower($addCartCode), $j);
		$fhotoMainDir = substr($fhotoMainDir, 3);
	} else {
		$fhotoMainDir = 'images/empty.png';
		print_r('два');
	};
	

	if($addCartCategory) {
		$addCartCategoryQuery = mysqli_query(connect(), "SELECT category_id FROM category WHERE name = '$addCartCategory'");
		$addCartCategoryResponse = (mysqli_fetch_all($addCartCategoryQuery, MYSQLI_NUM))[0][0];
	} else {
		$addCartCategoryResponse = 'NULL';
	};

	if($addCartSubcategory) {
		$addCartSubcategoryQuery = mysqli_query(connect(), "SELECT subcategory_id FROM subcategory WHERE name = '$addCartSubcategory'");
		$addCartSubcategoryResponse = (mysqli_fetch_all($addCartSubcategoryQuery, MYSQLI_NUM))[0][0];
	}  else {
		$addCartSubcategoryResponse = 'NULL';
	};

	$sql = "INSERT INTO cart (name, code, new_price, old_price, sale, rating, manufactured, material, discription, subscribe, main_fhoto, category, subcategory) VALUES ('$addCartName', '$addCartCode', '$addCartPriceNew', '$addCartPrice', '$addCartSale', '$addCartRating', '$addCartManufactured', '$addCartMaterial', '$addCartDiscription', '$addCartSubscribe', '$fhotoMainDir', $addCartCategoryResponse, $addCartSubcategoryResponse)";
	$callback = null;
	$result = mysqli_query($connect, $sql);
	$error = mysqli_error($connect);
	print_r($error);
};

<?php
require 'transliteration.php';

/*Создание массива с необходимыми размерами фотографий*/
$sizeArray[0] = 1200;
$sizeArray[1] = 560;
$sizeArray[2] = 360;

	
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

/*МЕНЮ, ИЗМЕНЕНИЕ КАТЕГОРИИ*/

/*Первая форма*/
if($_POST['redact-category']) {
	function redactCategory() {
		$redactCategoryName = verif_string($_POST['redact-category']);
		$redactCategoryQuery = mysqli_query(connect(), "SELECT category_id, name, subscribe, photo, spot FROM category WHERE name = '$redactCategoryName'");
		$redactCategoryResult = mysqli_fetch_all($redactCategoryQuery, MYSQLI_NUM);
		$redactCategoryJson = json_encode($redactCategoryResult[0]);
		if($redactCategoryJson !== 'null') {
			print_r($redactCategoryJson);
		} else {
			print_r('Категория не найдена');
		};
	};
	redactCategory();
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
					print_r('Категория удалена');
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

function addCart($connect, $sizeArray) {
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

	/*Изменение структуры данных в массиве добавленных фотографий*/
	$fhotoLoad = count((array)$_FILES['add-cart__foto']['name']);
	$fhotos = [];
	for($i = 0; $i < $fhotoLoad; $i++) {
		if($_FILES['add-cart__foto']['type'][$i] == 'image/png' || $_FILES['add-cart__foto']['type'][$i] == 'image/jpeg') {
			$fhotos[$i][] = $_FILES['add-cart__foto']['name'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['type'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['tmp_name'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['size'][$i];
		};
	};

	/*Создание массива с необходимыми размерами фотографий*/
	//$sizeArray[0] = 1200;
	//$sizeArray[1] = 560;
	//$sizeArray[2] = 360;

	/*Проверка соответствия размеров загруженных фотографий допустимому минимуму*/
	foreach ($fhotos as $key => $value) {
		$sizeFhoto = getSizeImage($value);

		if($sizeFhoto['width'] < $sizeArray[2] || $sizeFhoto['width'] < $sizeArray[2]) {
			print_r('Минимальная сторона фотографии не менее 1200px');
			return;
		};
	};
	
/*Получение ID категории*/
	if($addCartCategory) {
		$addCartCategoryQuery = mysqli_query(connect(), "SELECT category_id FROM category WHERE name = '$addCartCategory'");
		$addCartCategoryResp = (mysqli_fetch_all($addCartCategoryQuery, MYSQLI_NUM));
		$addCartCategoryResponse = $addCartCategoryResp[0][0];
	} else {
		$addCartCategoryResponse = 'NULL';
	};

/*Получение ID подкатегории*/
	if($addCartSubcategory) {
		$addCartSubcategoryQuery = mysqli_query(connect(), "SELECT subcategory_id FROM subcategory WHERE name = '$addCartSubcategory'");
		$addCartSubcategoryResp = (mysqli_fetch_all($addCartSubcategoryQuery, MYSQLI_NUM));
		$addCartSubcategoryResponse = $addCartSubcategoryResp[0][0];
	}  else {
		$addCartSubcategoryResponse = 'NULL';
	};

	/*Определение заглавной фотографии*/
	$numberFhoto = 1;
	foreach ($fhotos as $value) {
		if(strtolower($value[0]) == strtolower($addCartMainFhoto)) {
			$pathinfo = pathinfo($value[0]);
    		$format = $pathinfo['extension'];
			$mainNumber = $numberFhoto . '.' . $format;
		};
		$numberFhoto++;
	};
	if(!$mainNumber) {
		$mainNumber = 'empty';
	};

/*Запись в базу данных*/
	$sql = "INSERT INTO cart (name, code, new_price, old_price, sale, rating, manufactured, material, discription, subscribe, main_fhoto, category, subcategory) VALUES ('$addCartName', '$addCartCode', '$addCartPriceNew', '$addCartPrice', '$addCartSale', '$addCartRating', '$addCartManufactured', '$addCartMaterial', '$addCartDiscription', '$addCartSubscribe', '$mainNumber', $addCartCategoryResponse, $addCartSubcategoryResponse)";
	$callback = null;
	$result = mysqli_query($connect, $sql);
	$error = mysqli_error($connect);
	print_r($error);

	/*Получение ID добавляемого товара*/
	$sql = "SELECT MAX(cart_id) FROM cart";
	$result = mysqli_query($connect, $sql);
	$lastIdCart = mysqli_fetch_all($result);
	$addCartId = $lastIdCart[0][0];

	/*Создание директории для фотографий добавляемого товара*/
	$fhotoDirectory = '../images/items/' . $addCartId;
	mkdir($fhotoDirectory);

	/*Передача массива добавленных фотографий и массива необходимых размеров в функцию обработки изображений для форматирования*/
	$numberFhoto = 1;
	foreach ($fhotos as $value) {
		treatmentFhoto($value, $sizeArray, $addCartId, $numberFhoto);
		$numberFhoto++;
	};
};

if($_POST['add-cart__name']) {
	addCart($connect, $sizeArray);
};

/*ИЗМЕНЕНИЕ ТОВАРА*/
/*первая форма*/
if($_POST['redact-cart__code']) {
	$redactCode = $_POST['redact-cart__code'];
	$sql =
	"SELECT
		cart.cart_id, cart.name, cart.code, cart.new_price, cart.old_price, cart.sale, cart.manufactured, cart.material, cart.discription, cart.subscribe, cart.main_fhoto, cart.category, cart.subcategory, category.name, subcategory.name
	FROM
		cart
	LEFT OUTER JOIN
		category
	ON
		cart.category = category.category_id
	LEFT OUTER JOIN
		subcategory
	ON
		cart.subcategory = subcategory.subcategory_id
	WHERE
		cart.code = '$redactCode'";
	$result = mysqli_query($connect, $sql);
	$fetch = mysqli_fetch_all($result);

	if($fetch) {
		if(file_exists('../images/items/' . $fetch[0][0] . '/360')) {
			$photoDir = scandir('../images/items/' . $fetch[0][0] . '/360');
			$fetch[0][15] = $photoDir;
		};
		$fetchJson = json_encode($fetch);
		print_r($fetchJson);
	} else {
		print_r('Товар не найден');
	};
};

/*вторая форма*/
function redactCart($connect, $sizeArray) {
	$redactCartId = verif_string($_POST['redact-cart__id-two']);
	$redactCartName = verif_string($_POST['redact-cart__name-two']);
	$redactCartCode = verif_string($_POST['redact-cart__code-two']);
	$redactCartPrice = verif_string($_POST['redact-cart__new-price-two']);
	$redactCartSale = verif_string($_POST['redact-cart__sale-two']);
	$redactCartPriceNew = verif_string($_POST['redact-cart__old-price-two']);
	$redactCartRating = 3;
	$redactCartManufactured = verif_string($_POST['redact-cart__manufactured-two']);
	$redactCartMaterial = verif_string($_POST['redact-cart__material-two']);
	$redactCartDiscription = verif_string($_POST['redact-cart__discription-two']);
	$redactCartSubscribe = verif_string($_POST['redact-cart__subscribe-two']);
	$redactCartMainFhoto = verif_string($_POST['admin-upload__subscribe-input--multiple']);
	$redactCartDelPhoto = verif_string($_POST['redact-cart__old-fhoto-del']);
	$redactCartCategory = $_POST['redact-cart__chose-category-input'];
	$redactCartSubcategory = $_POST['redact-cart__chose-subcategory-input'];

/*Получение ID изменяемого товара*/
	/*$sql = "SELECT cart_id FROM cart WHERE code = '$redactCartCode'";
	$result = mysqli_query($connect, $sql);
	$lastIdCart = mysqli_fetch_all($result);
	$redactCartId = $lastIdCart[0][0];*/

/*Изменение структуры данных в массиве добавленных фотографий*/
	$fhotoLoad = count((array)$_FILES['add-cart__foto']['name']);
	$fhotos = [];
	for($i = 0; $i < $fhotoLoad; $i++) {
		if($_FILES['add-cart__foto']['type'][$i] == 'image/png' || $_FILES['add-cart__foto']['type'][$i] == 'image/jpeg') {
			$fhotos[$i][] = $_FILES['add-cart__foto']['name'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['type'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['tmp_name'][$i];
			$fhotos[$i][] = $_FILES['add-cart__foto']['size'][$i];
		};
	};

/*Проверка соответствия размеров загруженных фотографий допустимому минимуму*/
	foreach ($fhotos as $key => $value) {
		$sizeFhoto = getSizeImage($value);

		if($sizeFhoto['width'] < $sizeArray[2] || $sizeFhoto['width'] < $sizeArray[2]) {
			print_r('Минимальная сторона фотографии не менее 1200px');
			return;
		};
	};

/*Создание директории для фотографий изменяемого товара*/
	$fhotoDirectory = '../images/items/' . $redactCartId;
	if(!file_exists($fhotoDirectory)) {
		mkdir($fhotoDirectory);
	};

/*Удаление фотографий*/
	if($redactCartDelPhoto) {
		$DelPhotoArray = explode(" ", $redactCartDelPhoto);
		foreach ($DelPhotoArray as $delPhoto) {
			foreach ($sizeArray as $PhotoCatalog) {
				$photoArray = scandir('../images/items/' . $redactCartId . '/' . $PhotoCatalog);
				foreach ($photoArray as $PhotoInCatalog) {
					$pathInfo = pathinfo($PhotoInCatalog);
					$photoName = $pathInfo['basename'];
					if($photoName === $delPhoto) {
						unlink('../images/items/' . $redactCartId . '/' . $PhotoCatalog . '/' . $PhotoInCatalog);
					};
				};
			};
		};
	};

/*получение наименьшего свободного номера фотографии*/
	if(file_exists('../images/items/' . $redactCartId . '/' . $sizeArray[0])) {
		$photoArray = scandir('../images/items/' . $redactCartId . '/' . $sizeArray[0]);
		foreach ($photoArray as $value) {
			$pathInfo = pathinfo($value);
			if($pathInfo['filename'] !== "" && $pathInfo['filename'] !== ".") {
				$photoNameArray[] = $pathInfo['filename'];
				rsort($photoNameArray);
			};
		};
		$numberFhoto = $photoNameArray[0] + 1;
	};
	if(!$numberFhoto) {
		$numberFhoto = 1;
	};

/*Передача массива добавленных фотографий и массива необходимых размеров в функцию обработки изображений для форматирования (порядковый номер главной фото сохраняется)*/
	foreach ($fhotos as $value) {
		treatmentFhoto($value, $sizeArray, $redactCartId, $numberFhoto);
		if(strtolower($value[0]) == strtolower($redactCartMainFhoto)) {
			$pathinfo = pathinfo($value[0]);
    		$format = $pathinfo['extension'];
			$mainNumber = $numberFhoto . '.' . $format;
		};
		$numberFhoto++;
	};
	if(!$mainNumber) {
		$mainNumber = $redactCartMainFhoto;
	};
	if(!$mainNumber) {
		$mainNumber = 'empty';
	};
	
/*Получение ID категории*/
	if($redactCartCategory) {
		$redactCartCategoryQuery = mysqli_query(connect(), "SELECT category_id FROM category WHERE name = '$redactCartCategory'");
		$redactCartCategoryResp = (mysqli_fetch_all($redactCartCategoryQuery, MYSQLI_NUM));
		$redactCartCategoryResponse = $redactCartCategoryResp[0][0];
	} else {
		$redactCartCategoryResponse = 'NULL';
	};

/*Получение ID подкатегории*/
	if($redactCartSubcategory) {
		$redactCartSubcategoryQuery = mysqli_query(connect(), "SELECT subcategory_id FROM subcategory WHERE name = '$redactCartSubcategory'");
		$redactCartSubcategoryResp = (mysqli_fetch_all($redactCartSubcategoryQuery, MYSQLI_NUM));
		$redactCartSubcategoryResponse = $redactCartSubcategoryResp[0][0];
	}  else {
		$redactCartSubcategoryResponse = 'NULL';
	};

/*Запись в базу данных*/
	$sql = "UPDATE cart SET name = '$redactCartName', code = '$redactCartCode', new_price = '$redactCartPriceNew', old_price = '$redactCartPrice', sale = '$redactCartSale', rating = '$redactCartRating', manufactured = '$redactCartManufactured', material = '$redactCartMaterial', discription = '$redactCartDiscription', subscribe = '$redactCartSubscribe', main_fhoto = '$mainNumber', category = '$redactCartCategoryResponse', subcategory = '$redactCartSubcategoryResponse' WHERE cart_id = '$redactCartId'";
	$callback = null;
	$result = mysqli_query($connect, $sql);
	$error = mysqli_error($connect);
	print_r($error);

	print_r('Изменения внесены');
};

if($_POST['redact-cart__name-two']) {
	redactCart($connect, $sizeArray);
};

/*УДАЛЕНИЕ ТОВАРА*/

if($_POST['remove-cart__code']) {
	$removeCode = $_POST['remove-cart__code'];
	$getIdSql = "SELECT cart_id FROM cart WHERE code = '$removeCode'";
	$result = mysqli_query($connect, $getIdSql);
	$fetch = mysqli_fetch_all($result);
	$getId = $fetch[0][0];

	
	$sql = "SELECT * FROM cart WHERE code = '$removeCode'";
	$result = mysqli_query($connect, $sql);
	$fetch = mysqli_fetch_all($result);
	if($fetch) {
		$sql = "DELETE FROM cart WHERE code = '$removeCode'";
		$result = mysqli_query($connect, $sql);
	} else {
		print_r('Товар не найден');
	};

	if(isset($getId)) {
		rmRec('../images/items/' . $getId);
		print_r('Товар удален');
	};
};
<?php
require 'clientData.php';

$url = $_SERVER['HTTP_REFERER'];
$urlParse = parse_url($url);
parse_str($urlParse['query'], $param);
$id = verif_string($param['id']);


$sql =
"SELECT
	cart.cart_id, cart.name, cart.code, cart.new_price, cart.old_price, cart.sale, cart.rating, cart.manufactured, cart.material, cart.discription, cart.subscribe, cart.main_fhoto, cart.category, cart.subcategory
FROM
	cart
WHERE
	cart.cart_id = '$id'";

$cartQuery = mysqli_query(connect(), $sql);
$cartResult = mysqli_fetch_all($cartQuery);
$error = mysqli_error($connect);
print_r($error);

$photos = scandir('../images/items/' . $cartResult[0][0] . '/' . $sizeArray[0]);
foreach ($photos as $value) {
	if($value !== '.' && $value !== '..') {
		$cartResult[0][14][] = $value;
	};
};

$cartJson = json_encode($cartResult);

print_r($cartJson);
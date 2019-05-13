<?php
require 'transliteration.php';

$url = $_SERVER['HTTP_REFERER'];
$urlParse = parse_url($url);
parse_str($urlParse['query'], $param);
$category = verif_string($param['category']);
$subcategory = verif_string($param['subcategory']);

if(!$subcategory) {
	$sql =
	"SELECT
		cart.cart_id, cart.name, cart.new_price, cart.old_price, cart.sale, cart.rating, cart.discription, cart.main_fhoto, cart.category, cart.subcategory
	FROM
		cart
	WHERE
		cart.category = '$category'";
} else {
	$sql =
	"SELECT
		cart.cart_id, cart.name, cart.new_price, cart.old_price, cart.sale, cart.rating, cart.discription, cart.main_fhoto, cart.category, cart.subcategory
	FROM
		cart
	WHERE
		cart.category = '$category' AND cart.subcategory = '$subcategory'";
};

$cartQuery = mysqli_query(connect(), $sql);
$cartResult = mysqli_fetch_all($cartQuery);
$error = mysqli_error($connect);
print_r($error);

$cartJson = json_encode($cartResult);

print_r($cartJson);
//print_r($cartResult);
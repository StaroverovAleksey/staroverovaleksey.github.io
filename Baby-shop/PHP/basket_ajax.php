<?php
require 'transliteration.php';

$JSON = @json_decode(file_get_contents('php://input'), true);
foreach ($JSON as $value) {
	$id = verif_string($value);
	$sql =
	"SELECT
		cart.cart_id, cart.name, cart.new_price, cart.old_price, cart.sale, cart.main_fhoto
	FROM
		cart
	WHERE
		cart.cart_id = '$id'";
	$cartQuery = mysqli_query(connect(), $sql);
	$cartResult = mysqli_fetch_all($cartQuery);
	$response[] = $cartResult[0];
};

$jsonResponse = json_encode($response);

print_r($jsonResponse);
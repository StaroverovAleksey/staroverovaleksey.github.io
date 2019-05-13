<?php
require 'transliteration.php';

$categoryQuery = mysqli_query(connect(), "SELECT * FROM category ORDER BY spot ASC");
$categoryResult = mysqli_fetch_all($categoryQuery);

$subcategoryQuery = mysqli_query(connect(), "SELECT * FROM subcategory");
$subcategoryResult = mysqli_fetch_all($subcategoryQuery);

$value = 0;
foreach ($categoryResult as $cat) {
	foreach ($subcategoryResult as $sub) {
		if($cat[0] === $sub[2]) {
			$categoryResult[$value][5][] = $sub[1];
			$categoryResult[$value][6][] = $sub[0];
		};
	};
	$value++;
};

$categoryJson = json_encode($categoryResult);

print_r($categoryJson);

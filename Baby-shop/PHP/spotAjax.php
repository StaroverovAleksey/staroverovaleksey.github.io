<?
require 'transliteration.php';

$addCategorySpot = mysqli_fetch_all(mysqli_query(connect(), "SELECT COUNT(*) FROM category"))[0][0] + 1;
print_r($addCategorySpot); ?>
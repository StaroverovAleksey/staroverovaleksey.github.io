<?php
require 'transliteration.php';

$delCategoryQuery = mysqli_query(connect(), "SELECT name FROM category");
$delCategoryResult = mysqli_fetch_all($delCategoryQuery);
$delCategoryJson = json_encode($delCategoryResult);
print_r($delCategoryJson);
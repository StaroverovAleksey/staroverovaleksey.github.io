<?php
require 'transliteration.php';

$delCategoryQuery = mysqli_query(connect(), "SELECT name, category_id FROM category");
$delCategoryRes = mysqli_fetch_all($delCategoryQuery);
$delCategoryJson = json_encode($delCategoryRes);
print_r($delCategoryJson);
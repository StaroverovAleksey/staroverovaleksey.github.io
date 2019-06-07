<?php

function connect() {
    $ADR = 'localhost';
    $USER = 'root';
    $PASS = '';
    $BD = 'michai84_baby';
    return $connectq = mysqli_connect($ADR, $USER, $PASS, $BD);
};

$connect = connect();

function translit($string) {
    $converter = array(
        'а' => 'a',   'б' => 'b',   'в' => 'v',
        'г' => 'g',   'д' => 'd',   'е' => 'e',
        'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
        'и' => 'i',   'й' => 'y',   'к' => 'k',
        'л' => 'l',   'м' => 'm',   'н' => 'n',
        'о' => 'o',   'п' => 'p',   'р' => 'r',
        'с' => 's',   'т' => 't',   'у' => 'u',
        'ф' => 'f',   'х' => 'h',   'ц' => 'c',
        'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
        'ь' => '',  'ы' => 'y',   'ъ' => '',
        'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
        
        'А' => 'A',   'Б' => 'B',   'В' => 'V',
        'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
        'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
        'И' => 'I',   'Й' => 'Y',   'К' => 'K',
        'Л' => 'L',   'М' => 'M',   'Н' => 'N',
        'О' => 'O',   'П' => 'P',   'Р' => 'R',
        'С' => 'S',   'Т' => 'T',   'У' => 'U',
        'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
        'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
        'Ь' => '',  'Ы' => 'Y',   'Ъ' => '',
        'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
    );
    return strtr($string, $converter);
}

function str2url($str) {
    // переводим в транслит
    $str = rus2translit($str);
    // в нижний регистр
    $str = strtolower($str);
    // заменям все ненужное нам на "-"
    $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);
    // удаляем начальные и конечные '-'
    $str = trim($str, "-");
    return $str;
}

function getDirectory($file, $name) {
    $pathinfo = pathinfo($file);
    $format = $pathinfo['extension'];
    $directory = '../images/menu/' . translit($name) . '.' . $format;
    return $directory;
};

function getItemDirectory($file, $cartId, $number) {
    $pathinfo = pathinfo($file);
    $format = $pathinfo['extension'];
    $directory = '../images/items/' . $cartId . '/' . $number . '.' . $format;
    return $directory;
};

function verif_string($string) {
    $html_verif = htmlspecialchars($string, ENT_QUOTES);
    $sql_verif = mysqli_real_escape_string(connect(), $html_verif);
    return $sql_verif;
};

function sql_request($callback, $sql) {
    connect();
    if (mysqli_connect_error()) {
        $errorConnect = 'Ошибка соединения:</br>' . mysqli_connect_error();
    } else {
        $result = mysqli_query(connect(), $sql);
        if($result) {
            $callback;
        } else {
            $errorConnect = 'Ошибка SQL запроса:</br>' . mysqli_error(connect());
        };
    };
};

function getSizeImage($fhoto) {
    $imageInfo = getimagesize($fhoto[2]);
    $sizeImage = explode(' ', $imageInfo[3]);
        
    parse_str($sizeImage[0], $sizeParse);
    $widthStr = $sizeParse['width'];
    $sizeFhoto['width'] = (int) str_replace('"', '', $widthStr);

    parse_str($sizeImage[1], $sizeParse);
    $heightStr = $sizeParse['height'];
    $sizeFhoto['height'] = (int) str_replace('"', '', $heightStr);

    return $sizeFhoto;
};

function resizeFhoto($fhoto, $mime, $sizeArray, $sizeFhoto) {
    foreach ($sizeArray as $value) {
        $path = pathinfo($fhoto);
        $fhotoDirectory = $path['dirname'] . '/' . $value;

        if(!file_exists($fhotoDirectory)) {
            mkdir($fhotoDirectory);
        };

        $fhotoDir = $fhotoDirectory . '/' . $path['filename'] . '.' . $path['extension'];
        if($mime === 'image/jpeg') {
            $oldImage = imagecreatefromjpeg($fhoto);
            $newImage = imagecreatetruecolor($value, $value);
            imagecopyresized($newImage, $oldImage, 0, 0, 0, 0, $value, $value, $sizeFhoto['width'], $sizeFhoto['height']);
            imagejpeg($newImage, $fhotoDir);
        };

        if($mime === 'image/png') {
            $oldImage = imagecreatefrompng($fhoto);
            $newImage = imagecreatetruecolor($value, $value);
            imagecopyresized($newImage, $oldImage, 0, 0, 0, 0, $value, $value, $sizeFhoto['width'], $sizeFhoto['height']);
            imagepng($newImage, $fhotoDir);
        };
    };
    unlink($fhoto);
};

function treatmentFhoto($fhoto, $sizeArray, $cartId, $numberFhoto) {
    $sizeFhoto = getSizeImage($fhoto);
    $fhotoDir = getItemDirectory($fhoto[0], $cartId, $numberFhoto);
    if($sizeFhoto['width'] !== $sizeFhoto['height']) {

        if($sizeFhoto['width'] < $sizeFhoto['height']) {
            $difference = $sizeFhoto['height'] - $sizeFhoto['width'];
            $differenceHalf = round($difference / 2);
            if ($fhoto[1] === 'image/jpeg') {
                $oldImage = imagecreatefromjpeg($fhoto[2]);
                $newImage = imagecreatetruecolor($sizeFhoto['width'], $sizeFhoto['width']);
                imagecopy($newImage, $oldImage, 0, 0, 0, $differenceHalf, $sizeFhoto['width'], $sizeFhoto['width']);
                imagejpeg($newImage, $fhotoDir);
                $sizeFhoto['height'] = $sizeFhoto['width'];
            };
            if ($fhoto[1] === 'image/png') {
                $oldImage = imagecreatefrompng($fhoto[2]);
                $newImage = imagecreatetruecolor($sizeFhoto['width'], $sizeFhoto['width']);
                imagecopy($newImage, $oldImage, 0, 0, 0, $differenceHalf, $sizeFhoto['width'], $sizeFhoto['width']);
                imagepng($newImage, $fhotoDir);
                $sizeFhoto['height'] = $sizeFhoto['width'];
            };
        };

        if($sizeFhoto['width'] > $sizeFhoto['height']) {
            $difference = $sizeFhoto['width'] - $sizeFhoto['height'];
            $differenceHalf = round($difference / 2);
            if ($fhoto[1] === 'image/jpeg') {
                $oldImage = imagecreatefromjpeg($fhoto[2]);
                $newImage = imagecreatetruecolor($sizeFhoto['height'], $sizeFhoto['height']);
                imagecopy($newImage, $oldImage, 0, 0, $differenceHalf, 0, $sizeFhoto['height'], $sizeFhoto['height']);
                imagejpeg($newImage, $fhotoDir);
                $sizeFhoto['width'] = $sizeFhoto['height'];
            };
            if ($fhoto[1] === 'image/png') {
                $oldImage = imagecreatefrompng($fhoto[2]);
                $newImage = imagecreatetruecolor($sizeFhoto['height'], $sizeFhoto['height']);
                imagecopy($newImage, $oldImage, 0, 0, $differenceHalf, 0, $sizeFhoto['height'], $sizeFhoto['height']);
                imagepng($newImage, $fhotoDir);
                $sizeFhoto['width'] = $sizeFhoto['height'];
            };
        };
    } else {
        move_uploaded_file($fhoto[2], $fhotoDir);
    };
    resizeFhoto($fhotoDir, $fhoto[1], $sizeArray, $sizeFhoto);
};

function rmRec($path) {
    if (is_file($path)) return unlink($path);
    if (is_dir($path)) {
    foreach(scandir($path) as $p) if (($p!='.') && ($p!='..'))
        rmRec($path.DIRECTORY_SEPARATOR.$p);
    return rmdir($path); 
    };
  return false;
};
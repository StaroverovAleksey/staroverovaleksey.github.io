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

function getItemDirectory($file, $name, $n) {
    $pathinfo = pathinfo($file);
    $format = $pathinfo['extension'];
    $directory = '../images/items/' . translit($name) . '/' . translit($name) . $n . '.' . $format;
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
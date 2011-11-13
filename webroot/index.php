<?php
// Hacky way to get to this
if ($_SERVER['REQUEST_URI'] != '/') {
    if (substr($_SERVER['REQUEST_URI'], 0, 8) == '/modules') {
        require('../application' . $_SERVER['SCRIPT_URL']);
    } else {
        header('HTTP/1.1 404 Not Found');
    }
    die();
}

spl_autoload_register(function($class){
    $file = strtolower($class);
    $file = str_replace('_','/', $file);
    $path = '../application/' . $file . '.php';
    if (file_exists($path)) {
        require($path);
    }
});

include('../application/views/home.php');
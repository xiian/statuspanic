<?php
spl_autoload_register(function($class){
    $file = strtolower($class);
    $file = str_replace('_','/', $file);
    $path = '../application/' . $file . '.php';
    if (file_exists($path)) {
        require($path);
    }
});

// Hacky way to get to this
if (substr($_SERVER['REQUEST_URI'], 0, 8) == '/modules') {
    $script = parse_url($_SERVER['REQUEST_URI']);
    $file = '../application' . $script['path'];
    if (file_exists($file)) {
      require($file);
      return true;
    }
}

header('HTTP/1.1 404 Not Found');

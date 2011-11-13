<?php
define('CONFIG', 'config.json');

// FIRST: read in the configuration
$data = json_decode(file_get_contents(CONFIG));

if (!$data) die('JSON syntax error in "'.CONFIG.'"');

switch ($data->rotate) {
    case 'left':
        $rotate = '-webkit-transform: rotate(-90deg);';
        break;
    case 'right':
        $rotate = '-webkit-transform: rotate(90deg);';
        break;
    case 'flip':
        $rotate = '-webkit-transform: rotate(180deg);';
        break;
    default:
        $rotate = false;
        break;
}

$width = (isset($data->width) ? $data->width . 'px' : '100%');
$title = (isset($data->title) ? $data->title : 'statuspanic generic status board');
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title><?php echo $title; ?></title>
    <link rel='stylesheet' type='text/css' href='resources/css/panic.css' />
    <script type='text/javascript' src='resources/js/jquery.js'></script>
    <script type='text/javascript' src='resources/js/board.js'></script>
    <style type='text/css'>
        #board {
            <?php
            if ($rotate) {
                echo $rotate;
                echo "height: $width;";
            } else {
                echo "width: $width;";
            } ?>
        }
    </style>
</head>
<body>
    <div id='board'>
        <?php foreach($data->modules as $in) {
            $module = new Module($in);
            $module->render();
        } ?>
    </div>
</body>
</html>
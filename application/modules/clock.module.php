<?php
$format = 'g:i a';

$tz = (empty($_GET['timezone']) ? 'America/New_York' : $_GET['timezone']);
date_default_timezone_set($tz);

$label = (empty($_GET['label']) ? '' : $_GET['label']);

$format = (empty($_GET['format']) ? 'h:i a' : $_GET['format']);

/* DATA */
$time = date($format);
$day = date('D');

/* DISPLAY */
?>

<div class='jumbo clock'>
    <span class='clock'></span>
	<div class="loc"><?php echo $label; ?></div>
	<time><?php echo $time; ?></time>
	<time><?php echo $day; ?></time>
</div>

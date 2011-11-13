<?php

/* DATA */
$max = rand(3, 100);
$bars = array();
$bars[] = new Bar('NEW',            18,   1);
$bars[] = new Bar('DEV COMP',       48,   3);
$bars[] = new Bar('QA',             8,    2);
$bars[] = new Bar('VALIDATION',     rand(1,15),   2);

/* DISPLAY */
$max_height = 0;
foreach($bars as $bar) {
    if ($bar->height > $max_height) {
        $max_height = $bar->height;
    }
}

// change these
$max_bar_width = 300;
$default_padding = 12;

// don't change these
$total_outer   = ($default_padding * 2); // (paddings + borders)
$max_width     = $_GET['width'];
$num_bars      = count($bars);
$bar_width     = floor(min($max_bar_width, ($max_width - ($total_outer * $num_bars)) / $num_bars));
$final_padding = max($default_padding, ($max_width - (($bar_width + $total_outer) * $num_bars)) / $num_bars / 2);

include('../application/views/bargraph.phtml');

<?php

class Bar {
    function __construct($name, $height, $remaining) {
        $this->name = $name;
        $this->height = $height;
        $this->remaining = $remaining;
    }
}

/* DATA */
$max = rand(3, 100);
$bars = array();
$bars[] = new Bar('NEW',            18,   1);
$bars[] = new Bar('DEV COMP',       48,   3);
$bars[] = new Bar('QA',             8,    2);
$bars[] = new Bar('VALIDATION',     15,   2);

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
?>

<div>
    <div class="bars">
        <?php
        for($j = 0; $j < count($bars); $j++) {
            $bar = $bars[$j];
            $count = $j + 1;
            $bar_height =  ($bar->height / $max_height) * $_GET['height'];
            $bar_height = floor($bar_height);
            $top_offset = $_GET['height'] - $bar_height;

            $styles = array();
            $styles[] = 'margin-top: ' . $top_offset    . 'px';
            $styles[] = 'width: '      . $bar_width     . 'px';
            $styles[] = 'padding: '    . $final_padding . 'px';
            $style = implode('; ', $styles);
            ?>
                <div class='bar' style="<?php echo $style; ?>">
                    <div class='header'>
                        <span class="total"><?php echo $bar->height; ?></span>
                        /
                        <span class="remaining"><?php echo $bar->remaining; ?></span>
                    </div>
                    <div class='view' id='bar_<?php echo $count ?>' style='height: <?php echo $bar_height; ?>px;'></div>
                </div>
            <?php
        }
        ?>
  </div>
<?php for($j = 0; $j < count($bars); $j++) {
    $bar = $bars[$j];
    $styles = array();
    $styles[] = 'width: ' . $bar_width . 'px';
    $styles[] = 'padding: ' . $final_padding . 'px';
    $style = implode('; ', $styles);
    ?>
    <div class="bar-title" style="<?php echo $style; ?>">
        <span class="title">
            <?php echo $bar->name ?>
        </span>
    </div>
<?php } ?>
<div style="clear:both"></div>
</div>

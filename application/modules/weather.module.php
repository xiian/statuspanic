<?php

/* DATA */
$zipcode = $_GET['zipcode'];

/* DISPLAY */

// Loop until we have results
while(true) {
    $url = 'http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query=';
    $data = simplexml_load_file($url . $zipcode);
    if (empty($data)) {
        sleep(5);
    } else {
        break;
    }
}
?>

<div class="vertical-center height-3">
    <span class='jumbo'>Weather in <?php echo $data->display_location->city; ?></span>
    <div>
        <?php echo $data->temp_f . '&deg; F, ' . $data->weather ?></li>
    </div>
</div>

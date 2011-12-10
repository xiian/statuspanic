<?php

/* DATA */
$max = rand(3, 100);
$bars = new Bars();
$bars->add(new Bar('NEW',            18,   1));
$bars->add(new Bar('DEV COMP',       48,   3));
$bars->add(new Bar('QA',             8,    2));
$bars->add(new Bar('VALIDATION',     rand(1,15),   2));

// change these
$bars->setMaxBarWidth(300);
$bars->setDefaultPadding(12);
$bars->setMaxWidth($_GET['width']);
$bars->setMaxHeight($_GET['height']);

// Prep the data
$data         = new StdClass();
$data->height = $bars->getMaxHeight();
$data->width  = $bars->getMaxHeight();
$data->sets   = $bars->getCollection();

if (isset($_GET['fmt']) && $_GET['fmt'] == 'json') {
  header('Content-type: application/json');
  echo json_encode($data);
} else {
  include('../application/views/bargraph.phtml');
}
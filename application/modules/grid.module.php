<?php
/* DATA */
function makeGraph($inDev, $devComp, $qa, $validate) {
  $x = '';
  $levels = array();
  $levels[] = array(
    'label' => 'in development',
    'class' => 'indev',
    'count' => $inDev
    );
  $levels[] = array(
    'label' => 'dev complete',
    'class' => 'devcomp',
    'count' => $devComp
    );
  $levels[] = array(
    'label' => 'in QA',
    'class' => 'inqa',
    'count' => $qa
    );
  $levels[] = array(
    'label' => 'awaiting validation',
    'class' => 'validation',
    'count' => $validate
    );

  $total = $inDev + $devComp + $qa + $validate;

  foreach($levels as $level) {
    $width = ($level['count'] / $total) * 100;
    $x .= '<span class="' . $level['class'] . '" style="width: ' . $width . '%;" title="' . $level['count'] . ' tickets ' . $level['label'] . '">&nbsp;</span>';
  }
  return '<div class="statusbar">' . $x . '</div>';
}

function getData() {
  $releases = array();

  $release = array(
    'product' => 'Kindling',
    'version' => '2.3',
    'date'    => 'Fri Dec 11',
    'graph'   => makeGraph(rand(1,6), rand(0,3), rand(5,9), rand(2, 20))
    );
  $releases[] = $release;

  $release = array(
    'product' => 'Bonfire',
    'version' => '1.5.10',
    'date'    => 'Mon Dec 02',
    'graph'   => makeGraph(rand(1,6), rand(0,3), rand(5,9), rand(2, 20))
    );
  $releases[] = $release;

  $data = array();
  foreach($releases as $release) {
    $data[] = array($release['product'], $release['version'], $release['date'], $release['graph']);
  }
  return $data;
}

/* DISPLAY */
$data = getData();

// Determine if it should be JSON
if (isset($_GET['fmt']) && $_GET['fmt'] == 'json') {
  header('Content-type: application/json');
  echo json_encode($data);
} else {
  include('../application/views/grid.phtml');
}

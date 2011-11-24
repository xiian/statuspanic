<?php
function makeGravatar($email, $title = '') {
    if (empty($title)) {
        $title = $email;
    }
    return'<img src="http://www.gravatar.com/avatar.php?gravatar_id='. md5(trim($email)) .'&s=40&d=monsterid" title="' . $title . '"> ';
}

/* DATA */
function getData() {
    define('OFFICE', 'In Office');
    define('REMOTE', 'Remote');
    define('LAZY'  , 'Lazy');
    $users = array();

    $users['toms@kindlingapp.com']      = OFFICE;
    $users['garretk@kindlingapp.com']   = OFFICE;
    $users['josephl@kindlingapp.com']   = OFFICE;
    $users['tim@kindlingapp.com']       = LAZY;
    $users['patrickf@kindlingapp.com']  = REMOTE;
    $users['dan.summa@kindlingapp.com'] = OFFICE;

    $locations = array();
    foreach($users as $user => $where) {
        $gravatar = makeGravatar($user);
        $locations[$where][] = $gravatar;
    }

    foreach($locations as $where => $users) {
        $data[] = array($where, implode($users, ''));
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

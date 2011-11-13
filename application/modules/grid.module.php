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
?>

<div>
    <table border="0" width="100%" cellpadding="0" cellspacing="10">
    <?php foreach($data as $row): ?>
        <tr>
        <?php foreach($row as $cell): ?>
            <td><?php echo $cell; ?></td>
        <?php endforeach; ?>
        </tr>
    <?php endforeach; ?>
    </table>
</div>

<?php
include "db.php";

$sql = "SELECT size FROM path_size";
$result = mysqli_query($conn, $sql);

$coord = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($coord);

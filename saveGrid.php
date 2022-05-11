<?php
include "db.php";

$name = $_GET['name'];
$walls = $_GET['walls'];

$sql = "UPDATE path_coord SET coord = '$walls'  WHERE name='$name';";

mysqli_query($conn, $sql);

<?php
include "db.php";

$name = $_GET['name'];
$size = $_GET['size'];

$sql = "SELECT coord FROM path_coord WHERE name = '$name';";

$result = mysqli_query($conn, $sql);

$coord = mysqli_fetch_all($result, MYSQLI_ASSOC);
$coord["size"] = $size;

echo json_encode($coord);

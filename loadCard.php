<?php
include "db.php";

$size = $_GET['size'];

$sql = "SELECT name FROM path_coord JOIN path_size ON path_size.id = path_coord.sizeId WHERE size = $size";

$result = mysqli_query($conn, $sql);

$coord = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($coord);
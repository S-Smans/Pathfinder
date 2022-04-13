<?php
include "db.php";

$sql = "SELECT name FROM path_coord JOIN path_size ON path_size.id = path_coord.sizeId WHERE size = 5";

$result = mysqli_query($conn, $sql);

$coord = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($coord);

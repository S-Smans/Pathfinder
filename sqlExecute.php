<?php
include "db.php";

// Izveido visus iespējamos režģa elementu skaitu lielumus datubāzē

for ($i = 4; $i <= 20; $i++) {
  $sql = "INSERT INTO path_size (size) VALUES ($i)";
  mysqli_query($conn, $sql);
}


//$sql = "INSERT INTO path_coord (size) VALUES ($i)";

//$sql = "CREATE TABLE path_coord (coordId int PRIMARY KEY AUTO_INCREMENT, sizeId int, FOREIGN KEY(sizeId) REFERENCES path_size(id), coord text, name varchar(255))";

//mysqli_query($conn, $sql);

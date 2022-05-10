<?php
include "db.php";

/* IZVEIDO VISUS IESPĒJAMOS REŽĢĀ ELEMENTU SKAITU LIELUMUS DATUBĀZĒ. path_size TABULĀ*/

// for ($i = 4; $i <= 20; $i++) {
//   $sql = "INSERT INTO path_size (size) VALUES ($i)";
//   mysqli_query($conn, $sql);
// }




/* IZVEIDO KATRAM ELEMENTU SKAITAM 3 RINDAS KUR GLABĀ REŽĢA DATUS */

// $nameCount = 4;
// $id = 1;

// while ($nameCount < 21) {
//   for ($i = 1; $i <= 3; $i++) {
//     $name = "$i) Size-" . $nameCount;
//     $sql = "INSERT INTO path_coord (sizeId, coord, name) VALUES ($id, '', '$name')";
//     mysqli_query($conn,$sql);
//   }
//   $nameCount++;
//   $id++;
// }
    
    
    
/* DAŽĀDU SQL KODU IZPILDES VIETA */

// $sql = "SELECT coord FROM path_coord WHERE name = '1) Size-4';";

// $result = mysqli_query($conn, $sql);
    
// $coord = mysqli_fetch_all($result, MYSQLI_ASSOC);

// echo $coord[0]["coord"];

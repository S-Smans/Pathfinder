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
//     $name = "$i) " . $nameCount . "x" . $nameCount;
//     $sql = "INSERT INTO path_coord (sizeId, coord, name) VALUES ($id, '', '$name')";
//     mysqli_query($conn,$sql);
//   }
//   $nameCount++;
//   $id++;
// }
    
    
    
/* DAŽĀDU SQL KODU IZPILDES VIETA */

// $sql = "UPDATE path_coord SET coord = '1,1-3,5-4,4-5,7-6,6-7,3' WHERE name='1) Size-12'";

// mysqli_query($conn, $sql);
    


<?php
    include "db.php";

    $sql = "SELECT * FROM names LIMIT 1";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            echo json_encode($row['coord']);
        }
    }
?>
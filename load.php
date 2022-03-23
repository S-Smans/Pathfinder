<?php
    include "db.php";
    
    $count = $_POST['newCount'];

    $sql = "SELECT * FROM names LIMIT $count";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            echo $row['name'];
        }
    }
?>
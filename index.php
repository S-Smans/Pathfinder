<?php
    include_once "db.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ceļu meklētājs</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="script.js" defer></script>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Ceļu meklētājs</h1>
            <div class="buttons">
                <button class="start">Sākt</button>
                <button class="reset">Atiestatīt</button>
            </div>
        </div>
        <div class="main">
            <div class="tools">
                <h2>Sākuma punkts</h2>
                <div class="startPoint" draggable="true" ondragstart="drag(event)"></div>
                <div class="endPoint" draggable="true" ondragstart="drag(event)"></div>
                <h2>Beigu punkts</h2>
                <p class="value-text"><span class="value"></span></p>
                <input type="range" class="slider" max="20" min="4">
                <button class="grid-size">Elementu skaits</button>
            </div>
            <div class="grid"></div>
            <div class="info">
                <h1>Informācīja</h1>
                <h2>
                    <ul>
                        <li>Lai novietotu sākuma un beigu punktu, velciet tā atbilstošo krāsu uz jebkuru laukuma elementu</li>
                        <li>Nospiežot jebkuru elementu ar peles klikšķi pievieno sienu</li>
                        <li>Ja sākuma un beigu punkti ir uz laukuma var sākt meklēšanu</li>
                    </ul>
                </h2>
                <h3 id="sql">
                    <?php
                        $sql = "SELECT * FROM names LIMIT 1";
                        $result = mysqli_query($conn, $sql);
                        if (mysqli_num_rows($result) > 0) {
                            while($row = mysqli_fetch_assoc($result)) {
                                echo $row['name'];
                            }
                        }
                    ?>
                </h3>
                <button id="btn">Add</button>
            </div>
        </div>
    </div>
</body>
</html>
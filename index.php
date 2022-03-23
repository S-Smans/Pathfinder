<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ceļu meklētājs</title>
    <link rel="stylesheet" href="style.css">
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
            </div>
        </div>
    </div>
</body>
</html>
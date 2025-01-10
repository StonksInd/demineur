grid_demineur = [];
tab_3x3_coord_case = [[1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];
let timer;
let seconds = 0;
let minutes = 0;
function start_timer() {
    timer = setInterval(function () {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        document.getElementById("timerDisplay").textContent = minutes + " min" + ":" + seconds + " s";
    }, 1000);
}

function reveal_all_cases(row_grid, collumn_grid) {
    for (let i = 0; i < row_grid; i++) {
        for (let j = 0; j < collumn_grid; j++) {

            document.getElementById("row" + i + "collumn" + j).textContent = grid_demineur[i][j];
        }
    }
}
function handleMouseClick(event, i, j) {

    if (event.button === 2 || event.button === 1) {

        flag(i, j);
    } else if (event.button === 0) {
        if (grid_demineur[i][j] === "💣" && document.getElementById("row" + i + "collumn" + j).textContent != "🚩") {

            alert("Vous avez perdu !");
            clearInterval(timer);
            reveal_all_cases(row_grid, collumn_grid);
        } else {

            reveal_blank(i, j);
        }
    }
}
function create_grid_demineur(row, collumn) { //create_grid_demineur

    for (let i = 0; i < row; i++) {

        let new_row = document.createElement("ul");
        new_row.setAttribute("id", "row" + i)
        let demineur_grid_row = document.getElementById('demineur_grid');
        demineur_grid_row.appendChild(new_row);
        let row_tab = []
        grid_demineur.push(row_tab);

        for (let j = 0; j < collumn; j++) {

            let new_collumn = document.createElement("button");
            new_collumn.setAttribute("id", "row" + i + "collumn" + j)
            new_collumn.textContent = "__";
            let demineur_grid_collumn = document.getElementById("row" + i);
            demineur_grid_collumn.appendChild(new_collumn);
            let collumn_tab = [];
            grid_demineur[i].push(collumn_tab);

            new_collumn.addEventListener("mousedown", function (event) {
                handleMouseClick(event, i, j); // Appelle la fonction handleMouseClick
            });
            new_collumn.addEventListener("contextmenu", function (event) {
                event.preventDefault(); // Empêche l'ouverture du menu contextue
            });

        }
    }
}

function create_bomb(row, collumn, nbr_of_bomb) {

    coord_bomb_placed = [];
    for (let i = 0; i < nbr_of_bomb;) {

        let row_bomb = Math.floor(Math.random() * row);
        let collumn_bomb = Math.floor(Math.random() * collumn);

        let already_placed = false;
        for (let j = 0; j < coord_bomb_placed.length; j++) {
            if (coord_bomb_placed[j][0] === row_bomb && coord_bomb_placed[j][1] === collumn_bomb) {
                already_placed = true;
                break;
            }
        }

        if (!already_placed) {
            coord_bomb_placed.push([row_bomb, collumn_bomb]);
            grid_demineur[row_bomb][collumn_bomb] = "💣";
            i++;
        }
    }
}
function create_nbr_above_bomb(row, collumn) {


    for (let i = 0; i < row; i++) {
        for (let j = 0; j < collumn; j++) {//pour chaque cases
            if (grid_demineur[i][j] != "💣") {
                let bomb_count = 0;
                tab_3x3_coord_case.forEach(coord => {
                    if ((i + coord[0]) < row && (i + coord[0]) >= 0 && (j + coord[1]) < collumn && (j + coord[1]) >= 0) {//on s'assure que notre case sur laquelle on va cherche existe / n'est pas dans une bordure

                        if (grid_demineur[(i + coord[0])][(j + coord[1])] == "💣") {
                            bomb_count++;

                        }
                    }
                });
                grid_demineur[i][j] = "0" + bomb_count;


            }
        }
    } console.log(grid_demineur);
}

function difficulty(diff) {
    difficulty_level = ""
    if (diff == 1) {
        row_grid = 9;
        collumn_grid = 9;
        bomb_nbr = 10;
        difficulty_level = "Débutant : 9x9 cases, 10 bombes"
    }
    if (diff == 2) {
        row_grid = 16;
        collumn_grid = 16;
        bomb_nbr = 40;
        difficulty_level = "Intermédiaire : 16x16 cases, 40 bombes"
    }
    if (diff == 3) {
        row_grid = 22;
        collumn_grid = 22;
        bomb_nbr = 100;
        difficulty_level = "Expert : 22x22 cases, 100 bombes"
    }
    if (diff == 4) {
        row_grid = 30;
        collumn_grid = 30;
        bomb_nbr = 250;
        difficulty_level = "Maître : 30x30 cases, 250 bombes"
    }
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("difficulty_choisie").style.display = "block";
    document.getElementById("start").style.display = "block";
    document.getElementById("difficulty_choisie").textContent = "La difficulté est : " + difficulty_level

}

function start_game() {
    create_grid_demineur(row_grid, collumn_grid);
    create_bomb(row_grid, collumn_grid, bomb_nbr);
    create_nbr_above_bomb(row_grid, collumn_grid);
    revealed_cases = Array(row_grid).fill(null).map(() => Array(collumn_grid).fill(false))
    start_timer();
    document.getElementById("start").style.display = "none";

}

function reveal_blank(row, collumn) {

    if (document.getElementById("row" + row + "collumn" + collumn).textContent != "🚩" && !revealed_cases[row][collumn]) {

        document.getElementById("row" + row + "collumn" + collumn).textContent = grid_demineur[row][collumn];
        revealed_cases[row][collumn] = true;
        if (grid_demineur[row][collumn] === "00") {
            tab_3x3_coord_case.forEach(coord => {

                if ((row + coord[0]) < row_grid && (row + coord[0]) >= 0 && (collumn + coord[1]) < collumn_grid && (collumn + coord[1]) >= 0) {

                    reveal_blank((row + coord[0]), (collumn + coord[1]));
                }
            });
        }
    }


}

flag_count = 0;

function flag(row, collumn) {
    let well_placed_flag = 0;
    let button = document.getElementById("row" + row + "collumn" + collumn);

    if (button.textContent == "🚩") {
        button.textContent = "__";
        revealed_cases[row][collumn] = false;
        flag_count -= 1;

    } else {
        button.textContent = "🚩";
        flag_count += 1;

    }

    if (flag_count == bomb_nbr) {
        coord_bomb_placed.forEach(bomb_tab => {
            bomb = document.getElementById("row" + bomb_tab[0] + "collumn" + bomb_tab[1]);
            if (bomb.textContent == "🚩") {
                well_placed_flag += 1;
            }

        });
        if (well_placed_flag == bomb_nbr) {
            alert("c'est gagné")
            clearInterval(timer);
            reveal_all_cases(row_grid, collumn_grid);
        }
    }
}
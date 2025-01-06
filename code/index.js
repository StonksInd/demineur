// ! 1 CREER UNE FONCTION QUI VA AFFFICHER UN TABLEAU ET QUI PREND EN ENTREE Lxl CASES
grid_demineur = [];
function handleMouseClick(event, i, j) {

    if (event.button === 2) {

        flag(i, j);

    } else if (event.button === 0) {

        document.getElementById("row" + i + "collumn" + j).textContent = grid_demineur[i][j];
        reveal_blank(i, j);

        if (grid_demineur[i][j] == "10") {
            alert("vous avez perdu");
        }
    }
}
function crc(row, collumn) { //create_grid_demineur


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



            new_collumn.addEventListener("mousedown", (event) => handleMouseClick(event, i, j));
            new_collumn.addEventListener("contextmenu", function (event) {
                event.preventDefault();
            });

        }

    }




}
row_grid = 10;
collumn_grid = 10
crc(row_grid, collumn_grid);

//! 2 CREER UNE FONCTION QUI VA AVOIR EN ENTREE 2 NOMBRES DE COORDONNEE ALLEATOIRE EN FONCTION DE L ET l
//!   ET QUI VA PLACER X NOMBRE DE BOMBE EN STOCKANT LES CO DANS UN TAB POUR PAS QU4ILL Y AI DE REDONDANCES 



function cb(row, collumn, nbr_of_bomb) { //create_bomb

    coord_bomb_placed = [];
    for (let i = 0; i < nbr_of_bomb;) {

        let row_bomb = Math.floor(Math.random() * row);
        let collumn_bomb = Math.floor(Math.random() * collumn);


        if (!(coord_bomb_placed.includes([row_bomb, collumn_bomb]))) {

            coord_bomb_placed.push([row_bomb, collumn_bomb]);


            grid_demineur[row_bomb][collumn_bomb] = "10";
            i++;


        }

    } console.log(coord_bomb_placed);
}
bomb_nbr = 5
cb(row_grid, collumn_grid, bomb_nbr);



//! 3 CREER UNE FONCTION QUI VA PARCOURRIR LE TABLEAU POUR CHAQUE CASES ET VA REGARDER LES BOMBES PRESENTES
//!   DANS LES CASES ADJACENTE ET VA METTRE UN NOMBRE

tab_3x3_coord_case = [[1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];
function cnab(row, collumn) {//create_nbr_above_bomb


    for (let i = 0; i < row; i++) {
        for (let j = 0; j < collumn; j++) {//pour chaque cases
            if (grid_demineur[i][j] != "10") {
                let bomb_count = 0;
                tab_3x3_coord_case.forEach(coord => {
                    if ((i + coord[0]) < row && (i + coord[0]) >= 0 && (j + coord[1]) < collumn && (j + coord[1]) >= 0) {//on s'assure que notre case sur laquelle on va cherche existe / n'est pas dans une bordure

                        if (grid_demineur[(i + coord[0])][(j + coord[1])] == "10") {
                            bomb_count++;


                        }

                    }

                });
                grid_demineur[i][j] = "0" + bomb_count;


            }
        }

    } console.log(grid_demineur);

} cnab(10, 10)

//! 4 CREER UNE FONCTION QUI PERMET DE REVELLER LA DONNE DE LA CASE CLQIUE (SI BOMBE METTRE FIN AU JEU)
//! stocker dans un tab toute la grid avec row collumn et quand on clique sur une case appel une fonction 



//! 5 CREER UNE FONCTION QUI VA PERMETTRE DE REVELLER TOUTES LES CASES QUI N'ONT PAS DE DONNE
//!   IL FAUT AUSSI REVELLER LES CASES DANS UN RAYON DE 3X3 AUTOUR DE LA CASE SI C'EST UNE CASE A NUM ON ARRETE SINON ON CONTINUE


function reveal_blank(row, collumn) {

    if (grid_demineur[row][collumn] == "00") {

        document.getElementById("row" + row + "collumn" + collumn).textContent = grid_demineur[row][collumn];
        grid_demineur[row][collumn] = "55";
        tab_3x3_coord_case.forEach(coord => {

            if ((row + coord[0]) < row_grid && (row + coord[0]) >= 0 && (collumn + coord[1]) < collumn_grid && (collumn + coord[1]) >= 0) {


                if (grid_demineur[row + coord[0]][collumn + coord[1]] == "00") {

                    reveal_blank((row + coord[0]), (collumn + coord[1]));



                } else if (grid_demineur[row + coord[0]][collumn + coord[1]] != "55") {
                    document.getElementById("row" + (row + coord[0]) + "collumn" + (collumn + coord[1])).textContent = grid_demineur[row + coord[0]][collumn + coord[1]];
                    //grid_demineur[row + coord[0]][collumn + coord[1]] = "55";
                }


            }
        });

    }


}


//! 6 POUVOIR POSER DES DRAPEAU AVEC LE CLIQUE DROIT SE QUI DESACTIVE LA CASE AVEC UN COMPTEUR ECT ...


flag_count = 0;

function flag(row, collumn) {
    let well_placed_flag = 0;
    let button = document.getElementById("row" + row + "collumn" + collumn);
    if (button.textContent == "🚩") {
        button.textContent = "__";
        button.addEventListener("mousedown", button.handler);
        flag_count -= 1;
    } else {
        button.textContent = "🚩";
        button.removeEventListener("mousedown", button.handler);
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
        }

    }


}


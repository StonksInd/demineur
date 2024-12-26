!1 // ! CREER UNE FONCTION QUI VA AFFFICHER UN TABLEAU ET QUI PREND EN ENTREE Lxl CASES
grid_demineur = [];
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
            new_collumn.textContent = "--";
            let demineur_grid_collumn = document.getElementById("row" + i);
            demineur_grid_collumn.appendChild(new_collumn);
            let collumn_tab = [];
            grid_demineur[i].push(collumn_tab);
            new_collumn.setAttribute("onclick", "show_on_click(" + i + ", " + j + ")");
        }

    }




}
row_grid = 10;
collumn_grid = 10
crc(row_grid, collumn_grid);

//! 2 CREER UNE FONCTION QUI VA AVOIR EN ENTREE 2 NOMBRES DE COORDONNEE ALLEATOIRE EN FONCTION DE L ET l
//!   ET QUI VA PLACER X NOMBRE DE BOMBE EN STOCKANT LES CO DANS UN TAB POUR PAS QU4ILL Y AI DE REDONDANCES 



function cb(row, collumn, nbr_of_bomb) { //create_bomb

    let coord_bomb_placed = [];
    for (let i = 0; i < nbr_of_bomb;) {

        let row_bomb = Math.floor(Math.random() * row);
        let collumn_bomb = Math.floor(Math.random() * collumn);


        if (!(coord_bomb_placed.includes("row" + row_bomb + "collumn" + collumn_bomb))) {

            coord_bomb_placed.push("row" + row_bomb + "collumn" + collumn_bomb);
            //let bomb = document.getElementById("row" + row_bomb + "collumn" + collumn_bomb);//TODO a enlever 
            //bomb.textContent = "10"; //TODO a enlever 
            //console.log(row_bomb, collumn_bomb, i);
            grid_demineur[row_bomb][collumn_bomb] = "10";
            i++;


        }

    }
}
cb(10, 10, 5);



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
                //document.getElementById("row" + i + "collumn" + j).textContent = "0" + bomb_count;// TODO a enlever

                // console.log(i, j, bomb_count);

            } //else (console.log("il y a une bombe en ", i, j))
        }

    } console.log(grid_demineur);

} cnab(10, 10)

//! 4 CREER UNE FONCTION QUI PERMET DE REVELLER LA DONNE DE LA CASE CLQIUE (SI BOMBE METTRE FIN AU JEU)
//! stocker dans un tab toute la grid avec row collumn et quand on clique sur une case appel une fonction 

function show_on_click(row, collumn) {

    document.getElementById("row" + row + "collumn" + collumn).textContent = grid_demineur[row][collumn];
    reveal_blank(row, collumn);
    if (grid_demineur[row][collumn] == "10") {
        alert("vous avez perdu");
    }
}

//! 5 CREER UNE FONCTION QUI VA PERMETTRE DE REVELLER TOUTES LES CASES QUI N'ONT PAS DE DONNE
//!   IL FAUT AUSSI REVELLER LES CASES DANS UN RAYON DE 3X3 AUTOUR DE LA CASE SI C'EST UNE CASE A NUM ON ARRETE SINON ON CONTINUE


function reveal_blank(row, collumn) {
    console.log("ici");

    if (grid_demineur[row][collumn] == "00") {
        console.log("ici")

        tab_3x3_coord_case.forEach(coord => {

            if ((row + coord[0]) < row_grid && (row + coord[0]) >= 0 && (collumn + coord[1]) < collumn_grid && (collumn + coord[1]) >= 0) {
                console.log("ici");
                document.getElementById("row" + row + "collumn" + collumn).textContent = grid_demineur[row][collumn];
                grid_demineur[row][collumn] = "AA"
                if (grid_demineur[row + coord[0]][collumn + coord[1]] == "00") {

                    reveal_blank((row + coord[0]), (collumn + coord[1]));
                    console.log("ici");

                }
            }
        });

    }


}
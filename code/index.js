!1 // ! CREER UNE FONCTION QUI VA AFFFICHER UN TABLEAU ET QUI PREND EN ENTREE Lxl CASES

function crc(row, collumn) { //create_grid_demineur


    for (let i = 0; i < row; i++) {


        let new_row = document.createElement("ul");
        new_row.setAttribute("id", "row" + i)
        let demineur_grid_row = document.getElementById('demineur_grid');
        demineur_grid_row.appendChild(new_row);

        for (let j = 0; j < collumn; j++) {


            let new_collumn = document.createElement("button");
            new_collumn.setAttribute("id", "row" + i + "collumn" + j)
            new_collumn.textContent = "00";
            let demineur_grid_collumn = document.getElementById("row" + i);
            demineur_grid_collumn.appendChild(new_collumn);

        }

    }




}
crc(10, 10);

//! 2 CREER UNE FONCTION QUI VA AVOIR EN ENTREE 2 NOMBRES DE COORDONNEE ALLEATOIRE EN FONCTION DE L ET l
//!   ET QUI VA PLACER X NOMBRE DE BOMBE EN STOCKANT LES CO DANS UN TAB POUR PAS QU4ILL Y AI DE REDONDANCES 



function cb(row, collumn, nbr_of_bomb) { //create_bomb

    let coord_bomb_placed = [];
    for (let i = 0; i < nbr_of_bomb;) {

        let row_bomb = Math.floor(Math.random() * row);
        let collumn_bomb = Math.floor(Math.random() * collumn);


        if (!(coord_bomb_placed.includes("row" + row_bomb + "collumn" + collumn_bomb))) {

            coord_bomb_placed.push("row" + row_bomb + "collumn" + collumn_bomb);
            let bomb = document.getElementById("row" + row_bomb + "collumn" + collumn_bomb);
            bomb.textContent = "10";
            //console.log(row_bomb, collumn_bomb, i);
            i++;


        }

    }
}
cb(10, 10, 12);



//! 3 CREER UNE FONCTION QUI VA PARCOURRIR LE TABLEAU POUR CHAQUE CASES ET VA REGARDER LES BOMBES PRESENTES
//!   DANS LES CASES ADJACENTE ET VA METTRE UN NOMBRE


function cnab(row, collumn) {//create_nbr_above_bomb

    tab_3x3_coord_case = [[1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < collumn; j++) {//pour chaque cases
            if (document.getElementById("row" + i + "collumn" + j).textContent != "10") {
                let bomb_count = 0;
                tab_3x3_coord_case.forEach(coord => {
                    if ((i + coord[0]) < row && (i + coord[0]) >= 0 && (j + coord[1]) < collumn && (j + coord[1]) >= 0) {//on s'assure que notre case sur laquelle on va cherche existe / n'est pas dans une bordure

                        if (document.getElementById("row" + (i + coord[0]) + "collumn" + (j + coord[1])).textContent == "10") {
                            bomb_count++;


                        }

                    }

                });
                document.getElementById("row" + i + "collumn" + j).textContent = "0" + bomb_count;
                console.log(i, j, bomb_count);

            } else (console.log("il y a une bombe en ", i, j))
        }

    }

}

//! 4 CREER UNE FONCTION QUI PERMET DE REVELLER LA DONNE DE LA CASE CLQIUE (SI BOMBE METTRE FIN AU JEU)
//! stocker dans un tab toute la grid avec row collumn et quand on clique sur une case appel une fonction 
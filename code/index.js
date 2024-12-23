!1 // ! CREER UNE FONCTION QUI VA AFFFICHER UN TABLEAU ET QUI PREND EN ENTREE Lxl CASES
console.log("ici");
function crc(row, collumn) { //create_grid_demineur
    console.log("ici");

    for (let i = 0; i < row; i++) {

        console.log("ici");
        let new_row = document.createElement("ul");
        new_row.setAttribute("id", "row" + i)
        let demineur_grid_row = document.getElementById('demineur_grid');
        demineur_grid_row.appendChild(new_row);

        for (let j = 0; j < collumn; j++) {


            let new_collumn = document.createElement("button");
            new_collumn.setAttribute("id", "row" + i + "collumn" + j)
            new_collumn.textContent = "0";
            let demineur_grid_collumn = document.getElementById("row" + i);
            demineur_grid_collumn.appendChild(new_collumn);

        }

    } console.log("ici");




}


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
            bomb.textContent = i;
            console.log(row_bomb, collumn_bomb, i)
            i++


        } else {

            console.log("weshs lle faté")
        }
    }
}
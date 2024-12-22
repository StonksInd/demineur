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
            new_collumn.textContent = "0_9_10";
            let demineur_grid_collumn = document.getElementById("row" + i);
            demineur_grid_collumn.appendChild(new_collumn);

        }

    } console.log("ici");




}




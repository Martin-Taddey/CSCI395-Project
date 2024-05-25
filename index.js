import express from "express";
import axios from "axios";

let app = express();
let port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// The API URL is saved in a variable to make it easier to rewrite down the line
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

app.get("/", async (req,res)=>{
    try {
        // The pokemon to display is randomized. There are 1024 Pokemons.
        var pokemonNameID = Math.ceil(Math.random()*1024);
        // The API url is sent together with the pokemon ID
        const result= await axios.get(apiUrl + pokemonNameID);
        // The necessary information is sent to the ejs file to be rendered
        res.render("index.ejs",{id:result.data.id, pokemonSprite:result.data.sprites.front_default, name:result.data.name, base_experience:result.data.base_experience, height:result.data.height, weight:result.data.weight});
    }

    catch(error) {
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
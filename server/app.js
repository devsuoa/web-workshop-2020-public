/** THIS IS WHERE WE WILL WRITE OUR SERVER CODE */
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let recipes = [];
/**
 * Three properties:
 *  - ID: integer
 *  - Name
 *  - Content
 */

// GET ALL THE RECIPES
app.get("/recipe", (req, res) => {
    const data = {
        "recipes": recipes
    };

    res.status(200).send(data);
});

// GET SPECIFIC RECIPE BY ID
app.get("/recipe/:id", (req, res) => {
    const requestedId = parseInt(req.params.id);

    const requestedRecipe = recipes.find(recipe => recipe.id === requestedId);

    if (requestedRecipe === undefined) {
        // Not found
        res.status(404).send("Recipe not found");
    } else {
        // Found
        const data = {
            "recipe": requestedRecipe
        };
        res.status(200).send(data);
    }
});

// ADDING A NEW RECIPE
app.post("/recipe", (req, res) => {
    let newId;

    if (recipes.length > 0) {
        // Recipes exist
        newId = recipes[recipes.length - 1].id + 1;
    } else {
        // None yet exist
        newId = 1
    }

    const newRecipe = {
        "id": newId,
        "name": req.body.name,
        "content": req.body.content
    };
    console.log(newRecipe);

    recipes.push(newRecipe);

    res.status(201).send("Added new recipe");
});

// DELETE RECIPE BY ID
app.delete("/recipe/:id", (req, res) => {
    const requestedId = parseInt(req.params.id);

    if (recipes.some(recipe => recipe.id === requestedId)) {
        // Recipe exists
        recipes = recipes.filter(recipe => recipe.id !== requestedId);
        res.status(200).send("Recipe has been deleted");
    } else {
        // Doesn't exist
        res.status(404).send("Recipe not found");
    }
});

app.listen(3000, () => {
    console.log('API is running!');
});
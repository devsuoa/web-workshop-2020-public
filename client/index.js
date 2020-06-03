const recipeNameElement = document.getElementById("recipe-name");
const recipeContentElement = document.getElementById('recipe-content');
const submitRecipeElement = document.getElementById('submit-recipe');
const refreshRecipesElement = document.getElementById('refresh-recipes');
const recipeDivElement = document.getElementById('recipes-div');
const deleteRecipeId = document.getElementById('recipe-id-to-delete');
const deleteRecipeElement = document.getElementById('delete-recipe');

submitRecipeElement.addEventListener("click", () => {
    // Submit button is clicked
    addNewRecipe(recipeNameElement.value, recipeContentElement.value);
});

refreshRecipesElement.addEventListener("click", () => {
    // Refresh //
    getAllRecipes();
});

deleteRecipeElement.addEventListener("click", () => {
    // Delete //
    deleteRecipe(deleteRecipeId.value);
});

async function deleteRecipe(recipeId) {
    const response = await fetch(`http://localhost:3000/recipe/${recipeId}`, {
        method: "DELETE"
    });

    if (response.status === 200) {
        alert("Recipe deleted");
    } else {
        alert("Could not delete");
    }
}

async function getAllRecipes() {
    recipeDivElement.innerHTML = "";

    const response = await fetch("http://localhost:3000/recipe", {
        method: "GET"
    });
    const data = await response.json();
    const recipes = data.recipes;

    recipes.forEach(recipe => {
        const recipeElement = () => {
            const recipeElement = document.createElement("div");
            const recipeId = document.createElement("h5");
            const recipeName = document.createElement("h5");
            const recipeContent = document.createElement("p");

            recipeId.innerHTML = "ID: " + recipe.id;
            recipeName.innerHTML = "Recipe name: " + recipe.name;
            recipeContent.innerHTML = "Recipe content: " + recipe.content;

            recipeElement.appendChild(recipeId);
            recipeElement.appendChild(recipeName);
            recipeElement.appendChild(recipeContent);
            recipeElement.className = "recipe-element"

            return recipeElement;
        };
        recipeDivElement.appendChild(recipeElement());
    });
}

async function addNewRecipe(recipeName, recipeContent) {
    const data = {
        "name": recipeName,
        "content": recipeContent
    };

    const response = await fetch("http://localhost:3000/recipe", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.status === 201) {
        // Success
        alert("Success!");
    } else {
        // Failure
        alert("Could not add recipe!");
    }
}

 export default class Api{

    static recipes = [];
    static allIngredients = [];
    static allAppliances = [];
    static allUstensils = [];

    static init = async () => {
        const req = await fetch('./recipes.json');

        const data = await req.json();
        Api.recipes = data.recipes;
    }


    static getAllIngredients = () => {

        if (Api.allIngredients.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ingredients.map( ingredients => {
                    const ingredient =  ingredients.ingredient;

                    if (!Api.allIngredients.includes(ingredient.toLowerCase())) {
                        Api.allIngredients = [...Api.allIngredients, ingredient.toLowerCase()];
                    }
                })
            })
        }

        return Api.allIngredients;
    }

    static getAllAppliances = () => {

        if (Api.allAppliances.length === 0) {
            Api.recipes.forEach(recipe => {
                if (!Api.allAppliances.includes(recipe.appliance.toLowerCase())) {
                    Api.allAppliances = [...Api.allAppliances, recipe.appliance.toLowerCase()];
                }
            })
        }

        return Api.allAppliances;
    }

    static getAllUstensils = () => {
        if (Api.allUstensils.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ustensils.map( ustensile => {

                    if (!Api.allUstensils.includes(ustensile.toLowerCase())) {
                        Api.allUstensils = [...Api.allUstensils, ustensile.toLowerCase()];
                    }
                })
            })
        }

        return Api.allUstensils;
    }


    static getAllRecipess = () => {
        return Api.recipes;
    }

    /**
     * Get recipe with id
     * @param {number}
     * @returns {object} 
     */
    static getRecipes = (id) => {
        const recipe = Api.recipes.filter(recipe => recipe.id === id);

        if (recipe.length !== 1) {
            console.error("Recette introuvable.");
            return;
        }
        return recipe[0];
    }
}
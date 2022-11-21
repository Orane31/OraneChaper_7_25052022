import FilterDropdown from '../class/FilterDropdown.js';

const search = (filters, recipes) => {

    const searchBar = document.getElementById('search-main__input');

    const search = (searchBar.value.length >= 3) ? searchBar.value : null;

    
    // loop for .. on recipes to find match with user input and selected filters
    recipes.forEach(recipe => {
        let visible = true;

        if (filters.length > 0) {
            const appareils = [recipe.tools.toLowerCase()];
            const ingredients = recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase());
            const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
            const allFilters = [...appareils, ...ingredients, ...ustensils];

            filters.forEach(filter => {
                if(!allFilters.includes(filter.name.toLowerCase())){
                    visible = false;
                }
            })
        }

        if (search) {
            recipe.ingredients.forEach(current => {
                if (!current.ingredient.toLowerCase().includes(search) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)) {
                    visible = false;
                }
            });
        }

        if (recipe.element.classList.contains("hidden") === visible) {
            recipe.toggleVisibility();
        }
    });


    FilterDropdown.updateDropDowns(); // Update visible filters

    // No result found
    if (document.querySelectorAll('.recipes-container .recipes:not(.hidden)').length === 0) {
        document.querySelector('.recipes-container .empty-msg').classList.add('visible');
    }else{
        document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
    }

}

export default search;
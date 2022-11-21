import utils from '../modules/utils.js'

export default class Recipes{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.tools = data.appliance.toLowerCase();
        this.ingredients = data.ingredients;
        this.ustensils = data.ustensils;
        this.servings = data.servings;
        this.time = data.time;
        this.visible = true;
    
        Recipes.instances = [...Recipes.instances, this];
    }

    static instances = [];

    view = () => {
        let container = document.createElement('article');
        container.setAttribute('class', 'recipes');

        let image = document.createElement('img');
        image.setAttribute('class', 'recipes__img');
        image.setAttribute('src', 'http://via.placeholder.com/380x300');

        let description = document.createElement('div');
        description.setAttribute('class', 'recipes__description');

        let descriptionTitle = document.createElement('div');
        descriptionTitle.setAttribute('class', 'recipes__description__title');

        descriptionTitle.innerHTML = `
        <h2 class="name">${this.name}</h2>
        <span class="duration"><i class="far fa-clock"></i>${this.time} min</span>`;

        let ingredients = document.createElement('ul');
        ingredients.setAttribute('class', 'ingredients-list');

        this.ingredients.forEach(ingredient => {
            ingredients.innerHTML += `<li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>${ingredient.quantity} ${ingredient.unit || ''}</li>`;
        });

        let instructions = document.createElement('p');
        instructions.setAttribute('class', 'instructions');

        if (this.description.length >= 200) {
            instructions.innerText = utils.spliceString(this.description, 200);

        }else{
            instructions.innerText = this.description;
        }

        let descriptionDetails = document.createElement('div');
        descriptionDetails.setAttribute('class', 'recipes__description__details');

        descriptionDetails.appendChild(ingredients);
        descriptionDetails.appendChild(instructions);

        description.appendChild(descriptionTitle);
        description.appendChild(descriptionDetails);


        container.appendChild(image);
        container.appendChild(description);

        this.element = container;

        return container;
    }


    toggleVisibility = () => {
        this.element.classList.toggle('hidden');
        this.visible = !this.visible;
    }
}
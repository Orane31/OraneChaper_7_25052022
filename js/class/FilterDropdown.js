import utils from "../modules/utils.js";
import Recipes from "./Recipe.js";

export default class FilterDropdown{
    constructor(type, items) {
        this.type = type;
        this.items = items;
        this.label = (type === "ingredient") ? "ingrédient" : type;
        this.tagList = [];
        this.create();

        FilterDropdown.instances = [...FilterDropdown.instances, this];
    }

    static instances = [];

    create = () => {

        let container = document.createElement('div');
        container.setAttribute('class', `dropdown-item di-${this.type}`);
        container.setAttribute('data-state', 'close');


        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'dropdown-item__input');
        input.setAttribute('id', `${this.type}-input`);
        input.setAttribute('name', `${this.type}-input`);
        input.setAttribute('placeholder', `Rechercher un ${this.label}`);


            input.addEventListener('input', this.search)


        let label = document.createElement('p');
        label.setAttribute('class', 'dropdown-item__label');
        label.innerText = `${this.label}s`;


        let icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
        this.closeIcon = icon;


        let list = document.createElement('ul');
        list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);


        this.items.forEach(item => {
            list.appendChild(item.tagsList());
            this.tagList = [...this.tagList, item];
        });


        let emptyMsg = document.createElement('p');
        emptyMsg.setAttribute('class', 'empty-msg');
        emptyMsg.innerText = "Aucun filtre disponible";

        list.appendChild(emptyMsg);

        

        // Add elements in container
        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(icon);
        container.appendChild(list);

        // Add event listener to open dropdown
        container.addEventListener('click', this.open)

        this.element = container;
    }

     // search in tags list match with user input

    search = (e) => {
        let content = e.target.value.toLowerCase();

        if (content.length >= 3 || (e.inputType === 'deleteContentBackward' && content.length >= 3)) {

            this.tagList.forEach(tag => {
                let str = tag.name.toLowerCase();
                if (str.includes(content)) {
                    tag.tagsListItems.classList.remove('hidden-by-keydown');
                }else{
                    tag.tagsListItems.classList.add('hidden-by-keydown');
                }
            })
        }else{
            this.tagList.forEach(tag => {
                tag.tagsListItems.classList.remove('hidden-by-keydown');
            })
        }
    }

// open dropdown on click
    open = (e) => {
        e.stopPropagation();
        
        FilterDropdown.instances.forEach(dropdown => {
            if (dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !== this.element) {
                dropdown.element.setAttribute('data-state', 'close')
                document.removeEventListener('click', dropdown.close);
                dropdown.element.addEventListener('click', dropdown.open);
            }
        })

        if (this.element.getAttribute('data-state') === "close") {
            this.element.setAttribute('data-state', 'open');

            this.element.removeEventListener('click', this.open);
            document.addEventListener('click', this.close);
        }

    }

// close dropdown
    close = (e) => {
        
        if (utils.clickOut(e.target, this.element) || e.target === this.closeIcon) {
            this.element.setAttribute('data-state', 'close');

            document.removeEventListener('click', this.close);
            this.element.addEventListener('click', this.open);
        }
    }

// update tags list
    static updateDropDowns = () => {
        let lis = document.querySelectorAll('.dropdown-item__list li');
        lis.forEach(li => li.classList.add('hidden-by-tags'));

        let recipes = Recipes.instances.filter(recipe => recipe.visible );

        recipes.forEach(recipe => {
            let tools = document.querySelectorAll(`.appareil-dropdown [data-value="${recipe.tools}"]`);
            tools.forEach(appareil => appareil.classList.remove('hidden-by-tags'));
        
            let ingredients = recipe.ingredients;
            ingredients.forEach(current => {
                let ingredientElement = document.querySelector(`.ingredient-dropdown [data-value="${current.ingredient.toLowerCase()}"]`);
                ingredientElement.classList.remove('hidden-by-tags');
            })

            let ustensils = recipe.ustensils;
            ustensils.forEach(current => {
                let ustensilElement = document.querySelector(`.ustensile-dropdown [data-value="${current.toLowerCase()}"]`);
                ustensilElement.classList.remove('hidden-by-tags');
            })

        })

        // Ce code ajoute l'exécution de la méthode 'showEmptyMessage' à la fin de la boucle d'evenement JavaScript
        setTimeout(() => {
            FilterDropdown.showEmptyMessage()  
        }, 0);
    }

    /**
     * Affiche le message 'aucun filtre disponible' à l'utilisateur si besoin
     */
    static showEmptyMessage = () => {
        let ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hidden-by-tags):not(.already-selected)');
        let appareil = document.querySelectorAll('.appareil-dropdown li:not(.hidden-by-tags):not(.already-selected)');
        let ustensile = document.querySelectorAll('.ustensile-dropdown li:not(.hidden-by-tags):not(.already-selected)');

        if (appareil.length === 0) {
            document.querySelector('.appareil-dropdown .empty-msg').classList.add('visible');
        }else{
            document.querySelector('.appareil-dropdown .empty-msg').classList.remove('visible');
        }

        if (ingredient.length === 0) {
            document.querySelector('.ingredient-dropdown .empty-msg').classList.add('visible');
        }else{
            document.querySelector('.ingredient-dropdown .empty-msg').classList.remove('visible');
        }

        if (ustensile.length === 0) {
            document.querySelector('.ustensile-dropdown .empty-msg').classList.add('visible');
        }else{
            document.querySelector('.ustensile-dropdown .empty-msg').classList.remove('visible');
        }
    }
}
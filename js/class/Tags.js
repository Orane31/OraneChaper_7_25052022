import DOM from "../modules/dom.js";
import search from "../modules/search.js";
import Recipes from "./Recipe.js";
import FilterDropdown from "./FilterDropdown.js";

export default class Tags{
    constructor(type, name) {
        this.type = type;
        this.name = name.toLowerCase();
    
        Tags.instances = [...Tags.instances, this];
    }

    static instances = [];
    static active = []

// create tag view

    tag = () => {

        if (this.selected) { return this.selected; }

        let element = document.createElement('li');
        element.setAttribute('class', `tag tag-${this.type}`);

        let deleteBtn = document.createElement('i');
        deleteBtn.setAttribute('class', 'far fa-times-circle tag__icon');
        deleteBtn.addEventListener('click', this.delete)

        element.innerText = this.name;
        element.appendChild(deleteBtn);

        this.selected = element;
        return element;
    }


    // Create tags list
    tagsList = () => {

        if (this.tagsListItems) { return this.tagsListItems; }

        let element = document.createElement('li');
        element.setAttribute('data-value', this.name);
        element.innerText = this.name;

        element.addEventListener('click', this.add);

        this.tagsListItems = element;
        return element;
    }

    add = () => {
        Tags.active = [...Tags.active, this];

        DOM.append(this.tag(), document.getElementById('tags-list'));
        search(Tags.active, Recipes.instances);
        this.tagsListItems.classList.add('already-selected');
    }

    // disable tag
    delete = () => {
        let newActiveTags = Tags.active.filter(tag => tag !== this);
        Tags.active = newActiveTags;

        DOM.remove(this.tag());
        search(Tags.active, Recipes.instances);
        this.tagsListItems.classList.remove('already-selected');
    }
}
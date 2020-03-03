const upperBunUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/upper-bun.png';
const bottomBunUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/bottom-bun.png';
const pattyUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/patty.png';
const veggiePattyUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/veggie-patty.png';
const cheeseUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/cheese.png';
const lettuceUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/lettuce.png';
const onionUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/onion.png';
const tomatoUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/tomato.png';

const layers = document.querySelector('.layers');
const priceTable = document.querySelector('.price-table-div');

const vegetarianToggle = document.getElementById('vegetarian');

const upperBun = getLayerFromUrl(upperBunUrl, false);
const bottomBun = getLayerFromUrl(bottomBunUrl, false);

class Ingredient {

    constructor(ingredientUrl, ingredientClassName, price, layer, tableRow) {
        this.ingredientUrl = ingredientUrl;
        this.ingredientClassName = ingredientClassName;
        this.price = price;
        this.count = 0;
        this.layer = layer;
        this.tableRow = tableRow;
        this.addButton = tableRow.querySelector('.moreButton');
        this.removeButton = tableRow.querySelector('.lessButton');
    }

    sayHi() {
        alert(this.ingredientClassName);
    }

    removeIngredient() {
        this.count--;
        this.layer.removeChild(this.layer.firstChild);

        if (this.addButton.disabled) activateButton(this.addButton);
        if (this.count == 0) disactivateButton(this.removeButton);
    }

    buildIngredient(isDeletable) {

        this.count++;
        if (this.removeButton.disabled) activateButton(this.removeButton);

        if (this.count == 9) disactivateButton(this.addButton);

        let ingredientDiv = getLayerFromUrl(this.ingredientUrl, isDeletable);
        ingredientDiv.classList.add(this.ingredientClassName);
        return ingredientDiv;
    }

    setIngredientUrl(newUrl) {
        this.ingredientUrl = newUrl;
    }

    getIngredientUrl() {
        return this.ingredientUrl;
    }

    getIngredientClassName() {
        return this.ingredientClassName;
    }

    getPrice() {
        return this.price;
    }

    getCount() {
        return this.count;
    }

    getLayer() {
        return this.layer;
    }

    getTableRow() {
        return this.tableRow;
    }

    getAddButton() {
        return this.addButton;
    }
    
    getRemoveButton() {
        return this.removeButton;
    }

}

const patty = new Ingredient(pattyUrl, "patty-ingredient", 1.00, document.getElementById('patties-layer'),
    document.getElementById('patty-table-row'));

const cheese = new Ingredient(cheeseUrl, "cheese-ingredient", 0.50, document.getElementById('cheese-layer'), 
    document.getElementById('cheese-table-row'));

const lettuce = new Ingredient(lettuceUrl, "lettuce-ingredient", 0.30, document.getElementById('lettuce-layer'),
    document.getElementById('lettuce-table-row'));

const onion = new Ingredient(onionUrl, "onion-ingredient", 0.30, document.getElementById('onion-layer'),
    document.getElementById('onion-table-row'));

const tomato = new Ingredient(tomatoUrl, "tomato-ingredient", 0.30, document.getElementById('tomato-layer'),
    document.getElementById('tomato-table-row'));

const ingredientClassesMap = new Map();
ingredientClassesMap.set(patty.getIngredientClassName(), patty);
ingredientClassesMap.set(cheese.getIngredientClassName(), cheese);
ingredientClassesMap.set(lettuce.getIngredientClassName(), lettuce);
ingredientClassesMap.set(onion.getIngredientClassName(), onion);
ingredientClassesMap.set(tomato.getIngredientClassName(), tomato);

const ingredients = [patty, cheese, lettuce, onion, tomato];

function removeLayer(layerToRemove) {
    ingredientClassesMap.get(layerToRemove.className).removeIngredient();
    updateTable();
}

function activateButton(button) {
    button.disabled = false;
    button.style.backgroundColor = '#231f20';
    button.style.color = '#c5921a';
    button.style.cursor = 'pointer';
}

function disactivateButton(button) {
    button.disabled = true;
    button.style.backgroundColor = '#332e30';
    button.style.color = '#786740';
    button.style.cursor = 'default';
}

function setupPrices() {

    ingredients.forEach(ingredient => {
        ingredient.getTableRow().querySelector('.piece-price').innerHTML = '$' + Number.parseFloat(ingredient.getPrice()).toFixed(2);
    });
}

function calculatePrice() {

    let price = 1.00;
    ingredients.forEach(ingredient => price += ingredient.getCount() * ingredient.getPrice());

    document.querySelector('.total-price').innerHTML = '$' + Number.parseFloat(price).toFixed(2);
}

window.onresize = updatePosition;

window.onload = function() {

    updatePosition();
    setupPrices();

    setupButtonInteractions();
    ingredients.forEach(ingredient => disactivateButton(ingredient.getRemoveButton()));
    
    setupStartBurger();
}

function getLayerFromUrl(imageUrl, isDeletable) {

    let imgDiv = document.createElement('div');
    imgDiv.style.borderRadius = '50%';

    let img = document.createElement('img');
    
    img.src = imageUrl;
    img.height = '50';
    img.width = '50';
    img.ondragstart = function() { return false; }

    if (isDeletable) imgDiv.onclick = function(e) {
        removeLayer(this);
    };
    
    imgDiv.style.height = '60px';
    imgDiv.style.width = '60px';
    imgDiv.style.display = 'grid';
    imgDiv.style.justifyItems = 'center';
    imgDiv.style.alignItems = 'center';

    imgDiv.style.opacity = '0';
    imgDiv.style.transition = 'opacity 0.25s ease';

    imgDiv.appendChild(img);

    return imgDiv;
}

function updateTable() {

    ingredients.forEach(ingredient => {
        let tableRow = ingredient.getTableRow();
        let ingredientCount = ingredient.getCount();

        tableRow.querySelector('.ingredient-count').innerHTML = ingredientCount > 0 ? ingredientCount : '-';
        tableRow.querySelector('.layer-price').innerHTML = ingredientCount > 0 ? 
            '$' + Number.parseFloat(ingredientCount * ingredient.getPrice()).toFixed(2) : '-';
    })

    calculatePrice();
}

function addIngredient(layerToAdd) {

    ingredientClassesMap.get(layerToAdd.className).getLayer().appendChild(layerToAdd);
    window.getComputedStyle(layerToAdd).opacity;
    layerToAdd.style.opacity = '1';

    updateTable();
}

function setupButtonInteractions() {
    ingredients.forEach(ingredient => {
        ingredient.getAddButton().onclick = function() { addIngredient(ingredient.buildIngredient(true)); }
        ingredient.getRemoveButton().onclick = function() { removeLayer(ingredient.getLayer().firstChild); }
    })
}

function setupStartBurger() {

    layers.insertBefore(upperBun, lettuce.getLayer());
    window.getComputedStyle(upperBun).opacity;
    upperBun.style.opacity = '1';

    layers.appendChild(bottomBun);
    window.getComputedStyle(bottomBun).opacity;
    bottomBun.style.opacity = '1';

    addIngredient(patty.buildIngredient(true));
    addIngredient(cheese.buildIngredient(true));
    addIngredient(tomato.buildIngredient(true));
    addIngredient(cheese.buildIngredient(true));
    addIngredient(lettuce.buildIngredient(true));
}

const vegetarianIconsArray = Array.from(document.querySelector('.burger-header').getElementsByClassName('vegetarian-icon'));

vegetarianToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        patty.setIngredientUrl(veggiePattyUrl);
        replacePatties(veggiePattyUrl);
        vegetarianIconsArray.forEach(icon => icon.style.opacity = '1');
    } else {
        patty.setIngredientUrl(pattyUrl);
        replacePatties(pattyUrl);
        vegetarianIconsArray.forEach(icon => icon.style.opacity = '0');
    }
})

function replacePatties(pattyToInsertUrl) {
    let children = patty.getLayer().children;
    Array.from(children).forEach(element => element.querySelector('img').src = pattyToInsertUrl);
}

function updatePosition() {
    let burgerDiv = document.querySelector('.burger');

    if (matchMedia("(max-width: 768px)").matches) {
        document.querySelector('.burger-form').insertBefore(burgerDiv, document.querySelector('.order'));
    } else {
        document.querySelector('.main').appendChild(burgerDiv);
    }
}
const upperBunUrl = 'https://i.imgur.com/8JTCYrq.png';
const bottomBunUrl = 'https://i.imgur.com/AI3gUwK.png';
const pattyUrl = 'https://i.imgur.com/UQcELJy.png';
const cheeseUrl = 'https://i.imgur.com/CAKlI0W.png';
const lettuceUrl = 'https://i.imgur.com/zcNUJlK.png';
const onionUrl = 'https://i.imgur.com/aXzXX3f.png';
const tomatoUrl = 'https://i.imgur.com/KerYML6.png';

const layers = document.querySelector('.layers');
const priceTable = document.querySelector('.price-table-div');

const upperBun = getLayerFromUrl(upperBunUrl, false);
const bottomBun = getLayerFromUrl(bottomBunUrl, false);

class Ingredient {

    constructor(ingredientUrl, ingredientClassName, price, layer, addButton, removeButton) {
        this.ingredientUrl = ingredientUrl;
        this.ingredientClassName = ingredientClassName;
        this.price = price;
        this.count = 0;
        this.layer = layer;
        this.addButton = addButton;
        this.removeButton = removeButton;
    }

    sayHi() {
        alert(this.ingredientClassName);
    }

    removeIngredient() {
        this.count--;
        this.layer.removeChild(this.layer.firstChild);
        if (this.count == 0) disactivateButton(this.removeButton);
    }

    buildIngredient(isDeletable) {
        this.count++;
        if (this.removeButton.disabled) activateButton(this.removeButton);

        let ingredientDiv = getLayerFromUrl(this.ingredientUrl, isDeletable);
        ingredientDiv.classList.add(this.ingredientClassName);
        return ingredientDiv;
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

    getAddButton() {
        return this.addButton;
    }
    
    getRemoveButton() {
        return this.removeButton;
    }

}

const patty = new Ingredient(pattyUrl, "patty-ingredient", 1.00, document.getElementById('patties-layer'),
    document.getElementById('morePattiesButton'), document.getElementById('lessPattiesButton'));

const cheese = new Ingredient(cheeseUrl, "cheese-ingredient", 0.50, document.getElementById('cheese-layer'), 
    document.getElementById('moreCheeseButton'), document.getElementById('lessCheeseButton'));

const lettuce = new Ingredient(lettuceUrl, "lettuce-ingredient", 0.30, document.getElementById('lettuce-layer'),
    document.getElementById('moreLettuceButton'), document.getElementById('lessLettuceButton'));

const onion = new Ingredient(onionUrl, "onion-ingredient", 0.30, document.getElementById('onion-layer'),
    document.getElementById('moreOnionButton'), document.getElementById('lessOnionButton'));

const tomato = new Ingredient(tomatoUrl, "tomato-ingredient", 0.30, document.getElementById('tomato-layer'),
    document.getElementById('moreTomatoButton'), document.getElementById('lessTomatoButton'));

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

    for (var i = 0; i < ingredients.length; i++) {
        let row = priceTable.getElementsByTagName('tr')[i + 1];
        let cell = row.getElementsByTagName('td')[4];
        cell.innerHTML = '$' + Number.parseFloat(ingredients[i].getPrice()).toFixed(2);
    }
}

function calculatePrice() {

    let price = 1.00;
    ingredients.forEach(ingredient => price += ingredient.getCount() * ingredient.getPrice());

    let rows = priceTable.getElementsByTagName('tr');
    let priceCell = rows[rows.length - 1].getElementsByTagName('td')[1];
    priceCell.innerHTML = '$' + Number.parseFloat(price).toFixed(2);
}

window.onload = function() {

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

    for (var i = 0; i < ingredients.length; i++) {

        let ingredientCount = ingredients[i].getCount();
        
        let row = priceTable.getElementsByTagName('tr')[i + 1];
        let countCell = row.getElementsByTagName('td')[2];
        countCell.innerHTML = ingredientCount > 0 ? ingredientCount : '-';

        let priceCell = row.getElementsByTagName('td')[5];
        priceCell.innerHTML = ingredientCount > 0 ? '$' + Number.parseFloat(ingredientCount * ingredients[i].getPrice()).toFixed(2) : '-';
    }

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
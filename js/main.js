const upperBunUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/upper-bun.png';
const bottomBunUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/bottom-bun.png';
const pattyUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/patty.png';
const veggiePattyUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/veggie-patty.png';
const cheeseUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/cheese.png';
const lettuceUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/lettuce.png';
const onionUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/onion.png';
const tomatoUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/tomato.png';

const upperBun = getLayerFromUrl(upperBunUrl, false);
const bottomBun = getLayerFromUrl(bottomBunUrl, false);

function adjustPositioning() {
    if ($(window).outerWidth() >= 992) {
        $('footer').find('.row:eq(1)').append($('.social-networks'));
    } else {
        $('footer').find('.row:eq(0)').append($('.social-networks'));
    }
}

$(window).on('resize', adjustPositioning);

class Ingredient {

    constructor(ingredientUrl, ingredientClassName, price, layer, tableRow) {
        this.ingredientUrl = ingredientUrl;
        this.ingredientClassName = ingredientClassName;
        this.price = price;
        this.count = 0;
        this.layer = layer;
        this.tableRow = tableRow;
        this.moreButton = tableRow.find('.more-button');
        this.lessButton = tableRow.find('.less-button');
    }

    buildIngredient(removable) {

        this.count++;
        if (this.lessButton.prop('disabled')) this.lessButton.prop('disabled', false);
        if (this.count == 9) this.moreButton.prop('disabled', true);

        let ingredientDiv = getLayerFromUrl(this.ingredientUrl, removable);
        ingredientDiv.classList.add(this.ingredientClassName);
        return ingredientDiv;
    }

    removeIngredient() {

        this.count--;
        if (this.moreButton.prop('disabled')) this.moreButton.prop('disabled', false);
        if (this.count == 0) this.lessButton.prop('disabled', true);

        $(this.layer).find(">:first-child").remove();
        updateTable();
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

    getMoreButton() {
        return this.moreButton;
    }
    
    getLessButton() {
        return this.lessButton;
    }
}

let patty, cheese, lettuce, onion, tomato;
const ingredients = new Map();

$(document).ready(function() {

    patty = new Ingredient(pattyUrl, "patty-ingredient", 1.00, $('#patty-layer'), $('#patty-table-row'));
    cheese = new Ingredient(cheeseUrl, "cheese-ingredient", 0.50, $('#cheese-layer'), $('#cheese-table-row'));
    lettuce = new Ingredient(lettuceUrl, "lettuce-ingredient", 0.30, $('#lettuce-layer'), $('#lettuce-table-row'));
    onion = new Ingredient(onionUrl, "onion-ingredient", 0.30, $('#onion-layer'), $('#onion-table-row'));
    tomato = new Ingredient(tomatoUrl, "tomato-ingredient", 0.30, $('#tomato-layer'), $('#tomato-table-row'));

    ingredients.set(patty.getIngredientClassName(), patty);
    ingredients.set(cheese.getIngredientClassName(), cheese);
    ingredients.set(lettuce.getIngredientClassName(), lettuce);
    ingredients.set(onion.getIngredientClassName(), onion);
    ingredients.set(tomato.getIngredientClassName(), tomato);

    adjustPositioning();
    setupStartBurger();

    setupButtonInteractions();
    setupPrices();
    updateTable();
})

function setupButtonInteractions() {
    ingredients.forEach(ingredient => {
        ingredient.getMoreButton().click(e => addIngredientToLayer(ingredient.buildIngredient(true)));//addIngredient(ingredient.buildIngredient(true)); }
        ingredient.getLessButton().click(e => ingredient.removeIngredient());//removeLayer(ingredient.getLayer().firstChild); }
    })
}

function setupPrices() {
    ingredients.forEach(ingredient => {
        ingredient.getTableRow().find('.piece-price').html('$' + Number.parseFloat(ingredient.getPrice()).toFixed(2));
    });
}

function updateTable() {

    ingredients.forEach(ingredient => {
        let tableRow = ingredient.getTableRow();
        let ingredientCount = ingredient.getCount();

        tableRow.find('.ingredient-count').html(ingredientCount > 0 ? ingredientCount : '-');
        tableRow.find('.layer-price').html(ingredientCount > 0 ? '$' + Number.parseFloat(ingredientCount * ingredient.getPrice()).toFixed(2) : '-');
    })

    calculatePrice();
}

function calculatePrice() {

    let price = 1.00;
    ingredients.forEach(ingredient => price += ingredient.getCount() * ingredient.getPrice());

    $('#total-price').html('$' + Number.parseFloat(price).toFixed(2));
}

function getLayerFromUrl(imageUrl, isDeletable) {

    let img = document.createElement('img');
    $(img).attr('src', imageUrl).height(50).width(50);
    $(img).on('dragstart', e => false);
    
    let imgDiv = document.createElement('div');
    $(imgDiv).addClass('ingredient-image-div');
    
    if (isDeletable) $(imgDiv).click(e => removeIngredientFromLayer(imgDiv));
    $(imgDiv).append(img);

    return imgDiv;
}

function addIngredientToLayer(layer) {

    ingredients.get($(layer).attr('class').split(' ')[1]).getLayer().append(layer);
    window.getComputedStyle(layer).opacity;
    $(layer).css('opacity', '1');

    updateTable();
}

function removeIngredientFromLayer(layer) {
    ingredients.get($(layer).attr('class').split(' ')[1]).removeIngredient();
    updateTable();
}

function setupStartBurger() {

    $(lettuce.getLayer()).before(upperBun)
    window.getComputedStyle(upperBun).opacity;
    $(upperBun).css('opacity', '1');

    $('.layers').append(bottomBun);
    window.getComputedStyle(bottomBun).opacity;
    $(bottomBun).css('opacity', '1');

    addIngredientToLayer(patty.buildIngredient(true));
    addIngredientToLayer(cheese.buildIngredient(true));
    addIngredientToLayer(tomato.buildIngredient(true));
    addIngredientToLayer(cheese.buildIngredient(true));
    addIngredientToLayer(lettuce.buildIngredient(true));
}
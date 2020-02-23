const upperBunUrl = 'https://i.imgur.com/8JTCYrq.png';
const bottomBunUrl = 'https://i.imgur.com/AI3gUwK.png';
const pattyUrl = 'https://i.imgur.com/UQcELJy.png';
const cheeseUrl = 'https://i.imgur.com/CAKlI0W.png';
const lettuceUrl = 'https://i.imgur.com/zcNUJlK.png';
const onionUrl = 'https://i.imgur.com/aXzXX3f.png';
const tomatoUrl = 'https://i.imgur.com/KerYML6.png';

const layers = document.querySelector('.layers');
const priceTable = document.querySelector('.price-table-div');

const morePattiesButton = document.getElementById('morePattiesButton');
const lessPattiesButton = document.getElementById('lessPattiesButton');

const moreCheeseButton = document.getElementById('moreCheeseButton');
const lessCheeseButton = document.getElementById('lessCheeseButton');

const moreLettuceButton = document.getElementById('moreLettuceButton');
const lessLettuceButton = document.getElementById('lessLettuceButton');

const moreOnionButton = document.getElementById('moreOnionButton');
const lessOnionButton = document.getElementById('lessOnionButton');

const moreTomatoButton = document.getElementById('moreTomatoButton');
const lessTomatoButton = document.getElementById('lessTomatoButton');

const pattyPiecePrice = 1.00;
const cheesePiecePrice = 0.50;
const lettucePiecePrice = 0.30;
const onionPiecePrice = 0.30;
const tomatoPiecePrice = 0.30;

const pattiesLayer = document.getElementById('patties-layer');
const cheeseLayer = document.getElementById('cheese-layer');
const lettuceLayer = document.getElementById('lettuce-layer');
const onionLayer = document.getElementById('onion-layer');
const tomatoLayer = document.getElementById('tomato-layer');

const prices = [pattyPiecePrice, cheesePiecePrice, lettucePiecePrice, onionPiecePrice, tomatoPiecePrice];

let pattiesCount = 0;
let cheeseCount = 0;
let lettuceCount = 0;
let onionCount = 0;
let tomatoCount = 0;

const upperBun = getLayerFromUrl(upperBunUrl, false);
const bottomBun = getLayerFromUrl(bottomBunUrl, false);

function removeLayer(layerToRemove) {


    ingridientUrl = layerToRemove.getElementsByTagName('img')[0].src;
    let parentLayer;

    switch (ingridientUrl) {
        case pattyUrl:
            pattiesCount--;
            parentLayer = pattiesLayer;
            if (pattiesCount == 0) disactivateButton(lessPattiesButton);
            break;
        case cheeseUrl:
            cheeseCount--;
            parentLayer = cheeseLayer;
            if (cheeseCount == 0) disactivateButton(lessCheeseButton);
            break;
        case lettuceUrl:
            lettuceCount--;
            parentLayer = lettuceLayer;
            if (lettuceCount == 0) disactivateButton(lessLettuceButton);
            break;
        case onionUrl:
            onionCount--;
            parentLayer = onionLayer;
            if (onionCount == 0) disactivateButton(lessOnionButton);
            break;
        case tomatoUrl:
            tomatoCount--;
            parentLayer = tomatoLayer;
            if (tomatoCount == 0) disactivateButton(lessTomatoButton);
            break;
        default:
            parentLayer = layers;
    }

    window.getComputedStyle(layerToRemove).opacity;
    layerToRemove.style.opacity = '0';

    parentLayer.removeChild(layerToRemove)
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

    for (var i = 0; i < prices.length; i++) {
        let row = priceTable.getElementsByTagName('tr')[i + 1];
        let cell = row.getElementsByTagName('td')[4];
        cell.innerHTML = '$' + Number.parseFloat(prices[i]).toFixed(2);
    }
}

function calculatePrice() {

    let price = 1.00;
    let ingredients = [pattiesCount, cheeseCount, lettuceCount, onionCount, tomatoCount];

    for (let i = 0; i < ingredients.length; i++) price += ingredients[i] * prices[i];

    let rows = priceTable.getElementsByTagName('tr');
    let priceCell = rows[rows.length - 1].getElementsByTagName('td')[1];
    priceCell.innerHTML = '$' + Number.parseFloat(price).toFixed(2);
}

window.onload = function() {

    setupPrices();
    setupStartBurger();
    updateTable();

    disactivateButton(lessOnionButton);
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
    
    let ingredients = [pattiesCount, cheeseCount, lettuceCount, onionCount, tomatoCount];

    for (var i = 0; i < ingredients.length; i++) {
        let row = priceTable.getElementsByTagName('tr')[i + 1];
        let countCell = row.getElementsByTagName('td')[2];
        countCell.innerHTML = ingredients[i] > 0 ? ingredients[i] : '-';

        let priceCell = row.getElementsByTagName('td')[5];
        priceCell.innerHTML = ingredients[i] > 0 ? '$' + Number.parseFloat(ingredients[i] * prices[i]).toFixed(2) : '-';
    }

    calculatePrice();
}

function insertLayer(layerToInsert, followingLayer) {

    switch (layerToInsert.getElementsByTagName('img')[0].src) {
        case pattyUrl:
            pattiesCount++;
            pattiesLayer.appendChild(layerToInsert);
            if (lessPattiesButton.disabled) activateButton(lessPattiesButton)
            break;
        case cheeseUrl:
            cheeseCount++;
            cheeseLayer.appendChild(layerToInsert);
            if (lessCheeseButton.disabled) activateButton(lessCheeseButton);
            break;
        case lettuceUrl:
            lettuceCount++;
            lettuceLayer.appendChild(layerToInsert);
            if (lessLettuceButton.disabled) activateButton(lessLettuceButton);
            break;
        case onionUrl:
            onionCount++;
            onionLayer.appendChild(layerToInsert);
            if (lessOnionButton.disabled) activateButton(lessOnionButton);
            break;
        case tomatoUrl:
            tomatoCount++;
            tomatoLayer.appendChild(layerToInsert);
            if (lessTomatoButton.disabled) activateButton(lessTomatoButton);
            break;
        default:
            followingLayer.parentNode.insertBefore(layerToInsert, followingLayer.nextSibling);
    }

    window.getComputedStyle(layerToInsert).opacity;
    layerToInsert.style.opacity = '1';

    updateTable();
}

morePattiesButton.onclick = function() {
    insertLayer(getLayerFromUrl(pattyUrl, true), upperBun);
}

lessPattiesButton.onclick = function() {
    removeLayer(pattiesLayer.firstChild);
}

moreCheeseButton.onclick = function() {
    insertLayer(getLayerFromUrl(cheeseUrl, true), upperBun);
}

lessCheeseButton.onclick = function() {
    removeLayer(cheeseLayer.firstChild);
}

moreLettuceButton.onclick = function() {
    insertLayer(getLayerFromUrl(lettuceUrl, true), upperBun);
}

lessLettuceButton.onclick = function() {
    removeLayer(lettuceLayer.firstChild);
}

moreOnionButton.onclick = function() {
    insertLayer(getLayerFromUrl(onionUrl, true), upperBun);
}

lessOnionButton.onclick = function() {
    removeLayer(onionLayer.firstChild);
}

moreTomatoButton.onclick = function() {
    insertLayer(getLayerFromUrl(tomatoUrl, true), upperBun);
}

lessTomatoButton.onclick = function() {
    removeLayer(tomatoLayer.firstChild);
}

function setupStartBurger() {

    layers.insertBefore(upperBun, lettuceLayer);
    window.getComputedStyle(upperBun).opacity;
    upperBun.style.opacity = '1';

    layers.appendChild(bottomBun);
    window.getComputedStyle(bottomBun).opacity;
    bottomBun.style.opacity = '1';

    insertLayer(getLayerFromUrl(pattyUrl, true), upperBun);
    insertLayer(getLayerFromUrl(cheeseUrl, true), upperBun);
    insertLayer(getLayerFromUrl(tomatoUrl, true), upperBun);
    insertLayer(getLayerFromUrl(cheeseUrl, true), upperBun);
    insertLayer(getLayerFromUrl(lettuceUrl, true), upperBun);
}
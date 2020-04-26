const upperBunUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/upper-bun.png';
const bottomBunUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/bottom-bun.png';
const pattyUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/patty.png';
const veggiePattyUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/veggie-patty.png';
const cheeseUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/cheese.png';
const lettuceUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/lettuce.png';
const onionUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/onion.png';
const tomatoUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/tomato.png';
const navbarLogoUrl = 'https://s3.eu-central-1.amazonaws.com/monjasa.org/org/monjasa/images/navbar-logo.png';

const jsonUrl = 'https://my-json-server.typicode.com/Monjasa/fake-json-server/db';

const upperBun = getLayerFromUrl(upperBunUrl, false);
const bottomBun = getLayerFromUrl(bottomBunUrl, false);

let navbarLogo = document.createElement('img');
let origOffsetY = $('#menu').offset().top;

let scrollorama = $.scrollorama({
    blocks: '.scrollblock',
    enablePin: false
});

function adjustPositioning() {

    if ($(window).outerWidth() >= 992) {
        $('footer').find('.row:eq(1)').append($('.social-networks'));
        $('.navbar-brand').html('Red Hot Chili Burger');
        $('#menu').removeClass('navbar-light').addClass('navbar-dark');    
        origOffsetY = $('#logo-container').height();
        
    } else {
        $('footer').find('.row:eq(0)').append($('.social-networks'));
        $('.navbar-brand').html('');
        $('#menu').removeClass('navbar-dark').addClass('navbar-light');
        origOffsetY = 0;
    }

    scrollorama.settings.offset = -$('#menu').outerHeight() - 5;

    $(document).scroll();
}

function setupScrollingBehaviour() {

    let menu = $('#menu');
    let previousScroll = menu.outerHeight();

    function scrollingBehaviour() {
        let menuHeight = menu.outerHeight();
        
        if ($(window).outerWidth() < 992) {
            $(menu)[$(window).scrollTop() >= menuHeight ? 'addClass' : 'removeClass']('navbar-hide');
            $('.navbar-collapse').collapse('hide');
        }

        let currentScroll = $(window).scrollTop();
        if (previousScroll > currentScroll) $(menu).removeClass('navbar-hide');
        previousScroll = currentScroll;

        if ($(window).outerWidth() >= 992) {
            if ($(window).scrollTop() >= origOffsetY) {
                $('.navbar-brand').prepend(navbarLogo);
            } else {
                $('.nav-item a').removeClass('active');
                navbarLogo.remove();
            }
        }

        $(menu)[$(window).scrollTop() >= origOffsetY ? 'addClass' : 'removeClass']('fixed-top');
        $('.placeholder-container').css('height', [$(window).scrollTop() >= origOffsetY ? menuHeight : 0]);
    }

    $(document).scroll(scrollingBehaviour);
}

function setupNavbarBehaviour() {

    let blocks = {
        'block#1': $('a[href="#about-us"]'),
        'block#2': $('a[href="#order"]'),
        'block#3': $('a[href="#locations"]')
    }

    scrollorama.onBlockChange(function() {
        $('.nav-item a').removeClass('active');
        $(blocks[`block#${scrollorama.blockIndex}`]).addClass('active');
    });

    $('.navbar-nav>li>a').click(function(){
        $('.navbar-collapse').collapse('hide');
    });

    $('.nav-link').click(function() {    
        let menuHeight = $('#menu').outerHeight();

        let divId = $(this).attr('href');
        let offset = $(window).outerWidth() >= 992 ? menuHeight : 0;

        $('html, body').animate({
          scrollTop: $(divId).offset().top - offset
        }, 500);

        if ($(window).outerWidth() < 992) setTimeout(() => $('#menu').addClass('navbar-hide'), 525);
    });
}

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

    setIngredientUrl(newUrl) {
        this.ingredientUrl = newUrl;
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

$(document).ready(function() {

    $(navbarLogo).attr('src', navbarLogoUrl).height(40).width(40);
    $(navbarLogo).on('dragstart', e => false);
    $(navbarLogo).addClass('d-inline-block').addClass('align-top');
    $(navbarLogo).css('margin-right', '0.5em');
    $(navbarLogo).prop('alt', 'Navbar Logo');

    $("#burger-form").submit(function() {
        $(this).find(":input").filter(function() {
            return !this.value;
        }).attr("disabled", true);
    
        return true;
    });

    $('#vegetarian').change(function() {
        if ($(this).is(':checked')) {
            patty.setIngredientUrl(veggiePattyUrl);
            Array.from(patty.getLayer().children()).forEach(element => $(element).find('img').prop('src', veggiePattyUrl));
        } else {
            patty.setIngredientUrl(pattyUrl);
            Array.from(patty.getLayer().children()).forEach(element => $(element).find('img').prop('src', pattyUrl));
        }
    })


    $('#order-button').click(function(e){
        // e.preventDefault();
        // $.ajax({
        //     url: jsonUrl,
        //     dataType: 'json',
        //     beforeSend: () => {
        //         alert('Your order is ready to be sent...');
        //     },
        //     success: data => alert(data.order.message),
        //     complete: () => {
        //         alert('It\'s ready!');
        //         $('#burger-form').submit();
        //     },  
        //     error: () => alert('Cannot access the server, try again later.')
        // });
    });

    $(window).on('resize', adjustPositioning);

    setupNavbarBehaviour();
    setupScrollingBehaviour();

    setupIngredients();

    adjustPositioning();
    setupStartBurger();

    setupButtonInteractions();
    setupPrices();
    updateTable();
})

let patty, cheese, lettuce, onion, tomato;
const ingredients = new Map();

function setupIngredients() {

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
}

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

        tableRow.find('td .ingredient-count:text').val(ingredientCount > 0 ? ingredientCount : '');
        tableRow.find('.layer-price').html(ingredientCount > 0 ? '$' + Number.parseFloat(ingredientCount * ingredient.getPrice()).toFixed(2) : '-');
    })

    calculatePrice();
}

function calculatePrice() {

    let price = 1.00;
    ingredients.forEach(ingredient => price += ingredient.getCount() * ingredient.getPrice());

    $('#total-price').val('$' + Number.parseFloat(price).toFixed(2));
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
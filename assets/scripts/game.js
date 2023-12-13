const fruit_image = document.getElementById('fruit-image');
const fruit_number_display = document.getElementById('fruit-number');
const fruit_number_click_display= document.getElementById('fruit-number-click');
const fruit_number_second_displayy = document.getElementById('fruit-number-second');

const cursor_update_btn = document.querySelector('#cursor>input');
const farm_update_btn = document.querySelector('#farm>input');
const multiplier_update_btn = document.querySelector('#multiplier>input');

let fruits = 0;
let fruits_per_second = 0;
let fruits_per_click = 1;

let cursor_level = 1;
let cursor_price = 10;
let farm_level = 0;
let farm_price = 10;
let multiplier_level = 1;
let multiplier_price = 5;

showFruits();
setInterval(gameloop, 1000);

fruit_image.addEventListener('click', increment);

cursor_update_btn.addEventListener('click', () => {
    cursor_level++;
    fruits_per_click = fruits_per_click + 1 * multiplier_level;
    fruits -= cursor_price;
    cursor_price *= 2.5;
    showFruits();
});

farm_update_btn.addEventListener('click', () => {
    fruits -= farm_price;
    fruits_per_second = fruits_per_second + 1 * multiplier_level;
    farm_level++;
    farm_price *= 1.7;
    showFruits();
});

multiplier_update_btn.addEventListener('click', () => {
    multiplier_level++;
    fruits -= multiplier_price;
    fruits_per_click = cursor_level * multiplier_level;
    fruits_per_second = farm_level * multiplier_level;
    multiplier_price *= 3;
    showFruits();
});

function showFruits() {
    fruit_number_display.innerHTML = formatNumber(fruits).toFixed(2);
    fruit_number_click_display.innerHTML = formatNumber(fruits_per_click);
    fruit_number_second_displayy.innerHTML = formatNumber(fruits_per_second);

    setUpdateView('cursor', cursor_level, cursor_price);
    setUpdateView('farm', farm_level, farm_price);
    setUpdateView('multiplier', multiplier_level, multiplier_price);

    setAble(fruits >= cursor_price, cursor_update_btn);
    setAble(fruits >= multiplier_price, multiplier_update_btn);
    setAble(fruits >= farm_price, farm_update_btn);

}

function increment() {
    fruits += fruits_per_click;
    showFruits();
}

function gameloop() {
    fruits += fruits_per_second;
    showFruits();
}

function formatNumber(num) {
    if(num > 1000000000) {
        return (num/1000000000).toFixed(2) + ' M';
    }
    if(num > 1000000) {
        return (num/1000000).toFixed(2) + ' m';
    }
    if(num > 1000) {
        return (num/1000).toFixed(2) + ' k';
    }
    return num;
}

function setUpdateView(id, level, price) {
    const level_display = document.querySelector('#'+id+'>.level');
    const price_display = document.querySelector('#'+id+' .price');
    level_display.innerHTML = level;
    price_display.innerHTML = formatNumber(price).toFixed(2);
}

function setAble(able, btn) {
    if(able) {
        btn.removeAttribute("disabled", "");
    }
    else {
        btn.setAttribute("disabled", "");
    }
}
let menuBar = document.querySelector(".menu");
let closeMenu = document.querySelector(".close-menu");
let menuContent = document.querySelector(".menu-contents");

menuBar?.addEventListener("click", () => {
    menuContent.classList.add("open");
    menuBar.style.display = "none";
    closeMenu.style.display = "block";
});

closeMenu?.addEventListener("click", () => {
    menuContent.classList.remove("open");
    menuBar.style.display = "flex";
    closeMenu.style.display = "none";
});

// Rabatt-Funktion
let dBtn = document.querySelector(".discount-btn");
let rndFood = document.querySelector(".rand-food");
let fName = document.querySelector(".food-name");
let fImg = document.querySelector(".food-img");

const foods = [
    { name: "You Got Free <br>Chicken Kabab", image: "images/foods/chicken-kabab.png" },
    { name: "You Got Free <br>Hamburger", image: "images/foods/hamburger.png" },
    { name: "You Got Free <br>Rice", image: "images/foods/rice.png" },
    { name: "You Got Free <br>Water", image: "images/foods/drinks/water.png" },
    { name: "You Got Free <br>Orange Juice", image: "images/foods/juice.png" },
    { name: "You Got Free <br>Coffee", image: "images/foods/coffee.png" },
    { name: "You Got Free <br>Chicken", image: "images/foods/life-chicken.png" },
    { name: "You Got Free <br>Biscuit", image: "images/foods/breakfast/biscuit.png" },
    { name: "You Got Free <br>Breakfast Package", image: "images/foods/breakfast/egg-cheese.png" },
    { name: "You Got Free <br>Chips", image: "images/foods/lunch-dinner/chips.png" },
    { name: "You Got Free <br>Sambosa", image: "images/foods/lunch-dinner/sambosa.png" },
    { name: "You Got Free <br>Spaghetti", image: "images/foods/lunch-dinner/spaghetti.png" }
];

dBtn?.addEventListener("click", () => {
    rndFood.style.display = "block";
    dBtn.style.display = "none";
    let randF = Math.floor(Math.random() * foods.length);
    fName.innerHTML = foods[randF].name;
    fImg.src = foods[randF].image;
});

// Scroll-Effekt für Header
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
        header.classList.add("sticky");
        header.style.backgroundColor = "rgba(0,0,0,0.9)";
    } else {
        header.classList.remove("sticky");
        header.style.backgroundColor = "transparent";
    }
});

// Warenkorb-Zähler
let count = 0;
let cart = document.getElementById("cart-n");
document.querySelectorAll(".buy").forEach(item => {
    item.addEventListener("click", () => {
        count++;
        if (cart) cart.textContent = count;
    });
});

// Slider-Funktion
function setupSlider(containerSelector, nextBtnSelector, prevBtnSelector) {
    let container = document.querySelector(containerSelector);
    let nextBtn = document.querySelector(nextBtnSelector);
    let prevBtn = document.querySelector(prevBtnSelector);
    let slideIndex = 0;
    const slideWidth = 200;

    nextBtn?.addEventListener("click", () => {
        slideIndex = -slideWidth;
        container.style.transform = `translateX(${slideIndex}px)`;
    });
    
    prevBtn?.addEventListener("click", () => {
        slideIndex = 0;
        container.style.transform = `translateX(${slideIndex}px)`;
    });
}

setupSlider(".br-food", "#next-btn", "#prev-btn");
setupSlider(".dn-food", ".next-dn", ".prev-dn");

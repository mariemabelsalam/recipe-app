"use strict";

const searchBtn = document.getElementById("search");
const searchInput = document.querySelector("input");
const title = document.querySelector(".modal-title");
const image = document.querySelector(".modal-body img");
const rowContainer = document.getElementById("rowData");
const myElement = document.querySelector("h2");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const text = searchInput.value.trim();
  getMeal(text);
});

let meals = [];
myElement.innerHTML = "Search Your Favourite Recipe....";
async function getMeal(meal = "meat") {
  try {
    myElement.innerHTML = "Fetching Recipe....";
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    );
    if (response.ok) {
      const data = await response.json();
      meals = data.meals;
      if (!meals) {
        myElement.innerHTML = "No Recipes Found";
        rowContainer.innerHTML = "";
        return;
      }
      myElement.innerHTML = "";
      displayMeals(meals);
    }
  } catch (error) {
    console.log("error", error);
    myElement.innerHTML = "Something went wrong";
  }
}

function displayMeals(meal) {
  let items = "";
  for (let i = 0; i < meal.length; i++) {
    items += `
           <div class="col-md-6 col-lg-3">
                <div class="card">
                    <img src="${meal[i].strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body text-white">
                            <h5 class="card-title mb-1 text-truncate">${meal[i].strMeal}</h5>
                            <p class="card-text mb-0">${meal[i].strArea} Dish</p>
                            <p class="fs-4 text-truncate">Belongs to ${meal[i].strCategory} category</p>
                            <div>
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                 class="btn btn-custom text-white px-4"
                                 onclick="getRecipe(${i})">View Recipe
                                </button>
                            </div>                            
                            </div>
                        </div>

                </div>
        `;
  }
  rowContainer.innerHTML = items;
}

function getRecipe(i) {
  title.innerHTML = meals[i].strMeal;
  image.setAttribute("src", meals[i].strMealThumb);
}

getMeal();

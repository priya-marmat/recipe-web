const searchBtn = document.querySelector("#search-button");
const searchBox = document.querySelector('.recipe-input');
const recipeContaner = document.querySelector(".recipe-box");
const recipeDetails = document.querySelector(".recipe-details-div")
const recipeClose = document.querySelector(".recipe-close");

async function getREcipe(query) {
    recipeContaner.innerHTML= "<h2>Fetching Recipe...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const res = await data.json();
    
    recipeContaner.innerHTML="";
    res.meals.forEach(meal => {
        const recipeBox = document.createElement('div');
        recipeBox.classList.add('recipe');
        recipeBox.innerHTML = 
            `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strCategory}</p>
        `
        const but = document.createElement('button')
        but.textContent = "View Resipe";
        but.classList.add('view')
        recipeBox.appendChild(but);
        //adding event on but to see  recipe
        but.addEventListener('click', () =>{
            openRecipe(meal);
        });
        recipeContaner.appendChild(recipeBox);
      
    });
}

function openRecipe(meal) {
    recipeDetails.innerHTML = `
    <h3 class="recipeName">${meal.strMeal}</h3>
    <h3>Ingredents:</h3>
    <ul class="ingridientName">${fetchIngredients(meal)}</ul>
    <div>
    <h3>Instraction:</h3>
    <p class="instraction">${meal.strInstructions}</p>
    </div>
    `

    recipeDetails.parentElement.style.display = "block";
}
function fetchIngredients(meal){
    let ingredentsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredentsList;
}
recipeClose.addEventListener('click', () => {
    recipeDetails.parentElement.style.display = "none";
})
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    getREcipe(searchInput);

});
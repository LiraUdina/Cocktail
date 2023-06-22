const nameInput = document.getElementById('namecock');
const resetButton = document.getElementById('throwoff');
let content = {
  title: document.getElementById('coctailTitle'),
  description: document.getElementById('coctailDescription'),
  list: document.getElementById('coctailIngredients')
};

const contentBlock = document.getElementsByClassName('content-block')[0];

const savedValue = localStorage.getItem('name');
nameInput.value = savedValue;

function fetchCocktails(inputText) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
    .then((data) => {
      console.log(data)
      return data.json();

    })
    .then((data) => {
  
      if (data.drinks !== null) {
        let content = document.getElementById('content');
        content.innerHTML = '';

        for (let kol = 0; kol < data.drinks.length; kol++) {
          const cocktail = data.drinks[kol];

          const title = cocktail.strDrink;
          const description = cocktail.strInstructions;
          const imageUrl = cocktail.strDrinkThumb;

          const ingredients = [];
          const measures = [];

          for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient !== null) {
              ingredients.push(ingredient);
              measures.push(measure);
            }
          }

          const contentElement = document.getElementById('content');
          contentElement.innerHTML = '';
          
          const contentBlock = document.createElement('div');
          contentBlock.classList.add('content-block');
          
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.classList.add('coctail-image');
          contentBlock.appendChild(imgElement);
          
          const titleElement = document.createElement('h2');
          titleElement.innerHTML = title;
          titleElement.classList.add('coctail');
          contentBlock.appendChild(titleElement);
          
          const descriptionElement = document.createElement('p');
          descriptionElement.innerHTML = description;
          descriptionElement.classList.add('coctail2');
          contentBlock.appendChild(descriptionElement);
          
          const ingredientsListElement = document.createElement('ul');
          ingredients.forEach((ingredient) => {
            const li = document.createElement('li');
            li.innerHTML = ingredient;
            ingredientsListElement.appendChild(li);
          });
          ingredientsListElement.classList.add('coctail-ingr');
          contentBlock.appendChild(ingredientsListElement);
          
          contentElement.appendChild(contentBlock);
        }
      }
      return data
    });
}

resetButton.addEventListener('click', () => {
  nameInput.value = '';
  content.title.innerHTML = '';
  content.description.innerHTML = '';
  content.list.innerHTML = '';
});

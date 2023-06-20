const nameInput = document.getElementById('namecock');
const resetButton = document.getElementById('throwoff');
const contentElements = {
  title: document.getElementById('coctailName'),
  description: document.getElementById('discription'),
  list: document.getElementById('coctailIngridients')
};

const savedValue = localStorage.getItem('name');
nameInput.value = savedValue;

const fetchCocktails = (inputText) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.drinks !== null) {
                const cocktail = data.drinks[0];
                const title = cocktail.strDrink;
                const description = cocktail.strInstructions;
                const imageUrl = cocktail.strDrinkThumb;
                const ingredients = [];

                for (let i = 1; i <= 15; i++) {
                    const ingredient = cocktail[`strIngredient${i}`];
                    const measure = cocktail[`strMeasure${i}`];
                    if (ingredient !== null && ingredient.trim() !== '') {
                        ingredients.push(`${ingredient} - ${measure}`);
                    }
                }

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

                contentElements.title.innerHTML = title;
                contentElements.description.innerHTML = description;
                contentElements.list.innerHTML = "";
                ingredients.forEach((ingredient) => {
                  const li = document.createElement('li');
                  li.innerHTML = ingredient;
                  contentElements.list.appendChild(li);
                });

                contentContainer.style.background = `url(${imageUrl})`;
            }
        });
};

resetButton.addEventListener('click', () => {
    nameInput.value = '';
    contentElements.title.innerHTML = '';
    contentElements.description.innerHTML = '';
    contentElements.list.innerHTML = '';
});

nameInput.addEventListener('input', (event) => {
    const inputText = event.target.value.trim();
    content.innerHTML = '';
    if (inputText !== '') {
        fetchCocktails(inputText);
    }
});

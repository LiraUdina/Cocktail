const nameInput = document.getElementById('namecock'); // Получаем элемент ввода имени
const resetButton = document.getElementById('throwoff'); // Получаем кнопку сброса
const contentElement = document.getElementById('content'); // Получаем элемент контента

// Функция для отображения списка коктейлей
function displayCocktails(data) {
    contentElement.innerHTML = '';

    if (data.drinks !== null) {
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

            const contentBlock = document.createElement('div');
            contentBlock.classList.add('content-block'); // Добавляем класс блока контента

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.classList.add('coctail-image'); // Добавляем класс изображения коктейля
            contentBlock.appendChild(imgElement);

            const titleElement = document.createElement('h2');
            titleElement.innerHTML = title;
            titleElement.classList.add('coctail'); // Добавляем класс заголовка коктейля
            contentBlock.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.innerHTML = description;
            descriptionElement.classList.add('coctail2'); // Добавляем класс описания коктейля
            contentBlock.appendChild(descriptionElement);

            const ingredientsListElement = document.createElement('ul');
            ingredients.forEach((ingredient) => {
                const li = document.createElement('li');
                li.innerHTML = ingredient;
                ingredientsListElement.appendChild(li);
            });
            ingredientsListElement.classList.add('coctail-ingr'); // Добавляем класс списка ингредиентов коктейля
            contentBlock.appendChild(ingredientsListElement);

            contentElement.appendChild(contentBlock); // Добавляем блок контента в элемент контента
        }
    }
}

// Функция для загрузки списка коктейлей по введенному тексту
function fetchCocktails(inputText) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then((response) => response.json())
        .then((data) => {
            displayCocktails(data);
            localStorage.setItem('name', encodeURIComponent(inputText)); // Сохраняем значение в локальном хранилище
        });
}

// Обработчик события загрузки страницы
window.addEventListener('load', () => {
    const savedValue = localStorage.getItem('name');
    if (savedValue && savedValue.trim() !== '') {
        nameInput.value = decodeURIComponent(savedValue);
        fetchCocktails(savedValue); // Вызов функции для загрузки коктейлей по сохраненному значению
    } else {
        localStorage.removeItem('name'); // Удаляем значение из локального хранилища
        fetchCocktails(''); // Вызов функции для загрузки коктейлей без введенного текста
    }
});

// Обработчик события ввода в поле поиска
nameInput.addEventListener('input', () => {
    const inputText = nameInput.value.trim();
    if (inputText !== '') {
        fetchCocktails(inputText); // Вызов функции для загрузки коктейлей по введенному тексту
    } else {
        localStorage.removeItem('name'); // Удаляем значение из локального хранилища
        contentElement.innerHTML = ''; // Очищаем элемент контента, если поле ввода пустое
    }
    localStorage.setItem('name', encodeURIComponent(inputText)); // Сохраняем значение в локальном хранилище
});

// Обработчик события клика на кнопку сброса
resetButton.addEventListener('click', () => {
    nameInput.value = '';
    localStorage.removeItem('name'); 
    contentElement.innerHTML = '';
});
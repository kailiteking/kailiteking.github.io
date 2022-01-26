const search = document.querySelector('#search'),
    submitBtn = document.querySelector('#submit'),
    randomBtn = document.querySelector('.random'),
    mealsEl = document.querySelector('.meals'),
    resultHeader = document.querySelector('.result-header'),
    mealDetail = document.querySelector('.meal-detail');


function searchMeal(e) {
    // 阻止表单默认行为
    e.preventDefault();

    mealDetail.innerHTML = '';

    let term = search.value;

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {

                resultHeader.innerHTML = `<h2>Search results for '${term}':</h2>`;
                // 没有查找到内容
                if (data.meals === null) {
                    resultHeader.innerHTML = `<p>There are no search results.<p>`;
                    mealsEl.innerHTML = '';
                } else {

                    // 将数组中的结果处理后（map） 组合（join）在放到meals中
                    mealsEl.innerHTML = data.meals.map( meal => `
                        <li class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <p class="meal-info" data-meal-id="${meal.idMeal}">${meal.strMeal}</p>
                        </li>
                    `).join(``);
                }
            });

        search.value = '';
    } else {
        alert('enter anything to search');
    }
}

function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            let meal = data.meals[0];

            addMealToDOM(meal);
        });
}

function getRandomMeal() {
    mealsEl.innerHTML = '';
    resultHeader.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            let meal = data.meals[0];
            addMealToDOM(meal);
        });
}

function addMealToDOM(meal) {
    let ingredients = [];

    // 获取材料列表
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    mealDetail.innerHTML = `
        <h1 class="meal-name">${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-practice">${meal.strInstructions}</div>
        <div class="meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <ul class="meal-ingredients">
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `;

    mealDetail.classList.add('show-detail');
}

submitBtn.addEventListener('click', searchMeal);
randomBtn.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    let mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        let mealID = mealInfo.dataset.mealId;
        getMealByID(mealID);
    }
});


// 点击窗口外关闭窗口
window.addEventListener('click', e => {
    if (!mealDetail.contains(e.target)) {
        mealDetail.classList.remove('show-detail');
    }
});


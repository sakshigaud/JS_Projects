import { DOMelements } from './base';

export const getInput = () => DOMelements.searchInput.value;
export const clearPrevInfo = () => { 
    DOMelements.searchInput.value='';
    DOMelements.result_list.innerHTML = ''; 
    DOMelements.result_pages.innerHTML = '';
};
const RecipeTitleLimit = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split('').reduce((acc,curr) => {
            if (acc + curr.length <= limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
    }
    return `${newTitle.join('')}...`;
return title;
}
const renderRecipe = recipe => {
    const html = `<li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${RecipeTitleLimit(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;

DOMelements.result_list.insertAdjacentHTML('beforeend',html);
}

const createButton = (page, type) => `
            <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page -1 : page+1}>
            <span>Page ${type === 'prev'? page -1 : page+1}</span>
            <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left' : 'right'}"></use>
        </svg>
        </button>
       `;
const renderButton = (page, number, recipePerPage) =>{
    let button;
    const pages = Math.ceil(number / recipePerPage);

    if(page === 1 && pages > 1){    
           // when on first page
        button = createButton(page, 'next');
    } else if (page < pages){
        button = `${createButton(page, 'prev')}
        ${createButton(page, 'next')}`;
    }
    else if (page === pages && pages > 1 ) {   
       // when on last page
        button = createButton(page, 'prev');
    }
    DOMelements.result_pages.insertAdjacentHTML('afterbegin',button);
} 

export const displayRecipes = (recipe, page = 1, recipePerPage = 10) => {
    const start = (page - 1) * recipePerPage;
    const end = page * recipePerPage;
    recipe.slice(start, end).forEach(renderRecipe);
    renderButton(page, recipe.length,recipePerPage );
}
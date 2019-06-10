import { DOMelements } from './base';

export const getInput = () => DOMelements.searchInput.value;
export const clearPrevInfo = () => { 
    DOMelements.searchInput.value='';
    DOMelements.result_list.innerHTML = ''; 
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
const renderButton = (page,) =>{

} 
export const displayRecipes = (recipe, page = 3, recipePerPage = 10) => {
    const start = (page - 1) * recipePerPage;
    const end = page * recipePerPage;
    recipe.slice(start, end).forEach(renderRecipe);
}
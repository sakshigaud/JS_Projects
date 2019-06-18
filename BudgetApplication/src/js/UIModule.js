import {DOMStrings} from './generic'; 

export const getuserInput = () => {
    return { type: document.querySelector(DOMStrings.inputType).value,
             description: document.querySelector(DOMStrings.inputDescription).value,
             value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }   
}

export const nodeListForEach = (list, callback) => {
    for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
    }
}
export const getDOMstrings = () => DOMstrings;

/* Display added items to UI*/
export const displayItem = (item, type) => {
    let HTML, element ;
        if (type == 'inc'){
            HTML = `<div class="item clearfix" id="inc-${item.id}">
            <div class="item__description">${item.description}</div>
            <div class="right clearfix">
                <div class="item__value">${formatNumber(item.value, type)}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
            element = DOMStrings.incomeContainer;
            }
        else{
            HTML = `<div class="item clearfix" id="exp-${item.id}">
            <div class="item__description">${item.description}</div>
            <div class="right clearfix">
                <div class="item__value">${formatNumber(item.value, type)}</div>
                <div class="item__percentage">${item.percentage}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>` ;
         element = DOMStrings.expenseContainer;
            }

    document.querySelector(element).insertAdjacentHTML('beforeend', HTML);
}

export const clearInputFields = () => {
    document.querySelector(DOMStrings.inputDescription).value="";  
    document.querySelector(DOMStrings.inputValue).value="";
    document.querySelector(DOMStrings.inputType).focus();
}

export const displayBudget = (budget) =>{
    document.querySelector(DOMStrings.income_value).textContent = budget.totalIncome;
    document.querySelector(DOMStrings.expense_value).textContent = budget.totalExpense;
    document.querySelector(DOMStrings.budget_value).textContent = budget.budget;
    if (budget.percentage > 0)
        document.querySelector(DOMStrings.percentage).textContent = budget.percentage + '%';
    else 
        document.querySelector(DOMStrings.percentage).textContent = '--';
}
export const deleteItem = (id) => {
    let item = document.getElementById(id);
    item.parentNode.removeChild(item);

}
export const displayMonth = () => {
    let now, months, month, year;
    now = new Date();

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = now.getMonth();
    year = now.getFullYear();
    
    document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
}
export const changedType = () => {
            
    let fields = document.querySelectorAll(
        DOMStrings.inputType + ',' +
        DOMStrings.inputDescription + ',' +
        DOMStrings.inputValue);
    
    nodeListForEach(fields, function(cur) {
       cur.classList.toggle('red-focus'); 
    });
    
    document.querySelector(DOMStrings.inputButton).classList.toggle('red');    
}

export const displayPercentages = (percentages) => {
            
    let fields = document.querySelectorAll(DOMStrings.percentage_label);

    nodeListForEach(fields, function(current, index) {
        
        if (percentages[index] > 0) {         
            current.textContent = percentages[index] + '%';
        } else {
           
            current.textContent = '--';
        }
    });  
}

export const  formatNumber = (num, type) => {
    let numSplit, int, dec;
    
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split('.');
    int = numSplit[0];

    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
    }

    dec = numSplit[1];
    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

}

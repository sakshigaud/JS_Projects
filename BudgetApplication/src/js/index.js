import * as UIModule from './UIModule';
import Income from './Income';
import Expense from './Expense';


/* Create objects for both Class */

const income = new Income();
const expense = new Expense();

/* Add Income/Expense Item */

const addItemService = () =>{
    let input = UIModule.getuserInput();          // 1. Get the field's input
    
    if (input.description !=='' && !isNaN(input.value) && input.value > 0) {                 
            const storeIncome = income.addItem(input.type, input.description, input.value);     // Add Item to the Data Module
            UIModule.displayItem(storeIncome, input.type);                                      //Render Item

    UIModule.clearInputFields();          // Clear the input fields
    updateBudget(input.type);             // Calculate and update budget       
    updatePercentages();                  //  Calculate and update percentage
    }
 }

 /* Update the Budget & display on the browser.*/

const updateBudget = (type) =>{

            income.calculateBudget();                   // calculate the budget value
            let IncomeBudget = income.getBudget();      // return the budget
            UIModule.displayBudget(IncomeBudget);       // render budget on browser
}
/* Update Percentage on Expense Items.*/

const updatePercentages = () =>{
        
    expense.calculatePercentages();                 //  Calculate percentages        
    let percentages = expense.getPercentages();     //return percentages 
    UIModule.displayPercentages(percentages);       // Display percentage in UI
}

/*Delete Income/Expense Item */

const DeleteItemService = (event) => {
    let element, splitArray, type, id;
    element = event.target.parentNode.parentNode.parentNode.parentNode.id;          // Traverse the parent element
    if(element){                        
        splitArray = element.split('-');                                            // split the class into type and id 
        type = splitArray[0];
        id = parseInt(splitArray[1]);

        income.deleteItem(type, id);
    }

    UIModule.deleteItem(element);       // delete item from the UI
    updateBudget();                     // update the budget after deletion
    updatePercentages();
 }
  
/* Setup Listeners for different Events */

const setupEventListeners = () =>{

    // Event Listener for Submit button

    document.querySelector('.add__btn').addEventListener('click', addItemService);      
    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13)
          addItemService();
    });

    // Event Listener for Delete button

    document.querySelector('.container').addEventListener('click', DeleteItemService);
}
// Initialise the application on start

const onStart = () =>{
    console.log('Application is now running!');

    UIModule.displayMonth();
    UIModule.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
    });
    
    setupEventListeners();
}

onStart();
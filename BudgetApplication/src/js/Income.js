import {DOMStrings, budgetData} from './generic';
import Expense from './Expense';

export default class Income {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    calculateTotal = (type) => {
        let sum=0;
        budgetData.items[type].forEach(curr => {
            sum+=curr.value;
        })
       budgetData.count[type]=sum;
    }   
    /* Add Item to Income/Expense Array */

    addItem = (type, desc, val) => {
        let newItem, id;
    
        if (budgetData.items[type].length > 0) 
            id = budgetData.items[type][budgetData.items[type].length - 1].id + 1;
        else 
            id = 0;
    
        if (type === 'exp') 
            newItem = new Expense(id, desc, val);           // Create a new object
        else if (type === 'inc') 
            newItem = new Income(id, desc, val);
              
    budgetData.items[type].push(newItem);               // Add new item to array

    return newItem;
}

    calculateBudget = () => {

       this.calculateTotal('inc');
       this.calculateTotal('exp');

       budgetData.budget = budgetData.count.inc- budgetData.count.exp;              // calculate total budget

       if(budgetData.count.inc >0) 
            budgetData.percentage = Math.round((budgetData.count.exp/budgetData.count.inc)*100);
       else
            budgetData.percentage = -1;
   }

   getBudget = () => {
       return {
           budget: budgetData.budget,
           totalIncome: budgetData.count.inc,
           totalExpense: budgetData.count.exp,
           percentage: budgetData.percentage}
       }
    
      /* Delete item from array */

    deleteItem = (type, id) => {
        let ids, index;

         ids = budgetData.items[type].map(element => element.id);
        index = ids.indexOf(id);
 
        if(index !== -1)
            budgetData.items[type].splice(index, 1);             
    }
}

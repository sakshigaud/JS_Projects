import {budgetData} from './generic';

export default class Expense {
    
    constructor(id, description, value, percentage){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    calcPercentage = (totalIncome) => {
        if (totalIncome > 0) 
            this.percentage = Math.round((this.value / totalIncome) * 100);
        else 
            this.percentage = -1; 
    }
    
    getPercentage = () => this.percentage;

    calculatePercentages = () => { 

        budgetData.items.exp.forEach(cur => {
            cur.calcPercentage(budgetData.count.inc);
        });
    }

    getPercentages = () => {
        let allPerc = budgetData.items.exp.map(cur =>cur.getPercentage());
        return allPerc;
    }
}  
 
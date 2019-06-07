
var UIModule = (function(){
    var inputFields, inputFieldArray;
    var DOMStrings = { 
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        inputType: '.add__type',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };

    return {
        getuserInput: function (){
            return { type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDescription).value,
                    value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
                    };
        },
        getDOMstrings: function() {
            return DOMstrings;
            },
        addItemToUI : function(item, type){
            var HTML, element, newItemHTML ;
            if (type == 'inc'){
                HTML = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                element = DOMStrings.incomeContainer;
            }
            else{
                HTML = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                element = DOMStrings.expenseContainer;
            }
            newItemHTML = HTML.replace('%id%', item.id);
            newItemHTML = newItemHTML.replace('%description%', item.description);
            newItemHTML = newItemHTML.replace('%value%', item.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newItemHTML);
        },
        clearInputFields : function(){
            document.querySelector(DOMStrings.inputDescription).value="";  
            document.querySelector(DOMStrings.inputValue).value="";
            document.querySelector(DOMStrings.inputType).focus();   
        },
      
    }
    
})();

var DataModule = (function(){

    var Income = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Expense = function (id, description, value, percentage){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    var budgetData = {
        items: { inc: [], exp: [] },
        count: {inc: 0, exp: 0},
        budget:0 ,                 // how much amount is left
        percentage: -1                
     };

    var calculateTotal = function(type){
        var sum=0;
        budgetData.items[type].forEach(function(curr){
            sum+=curr.value;
        })
       budgetData.count[type]=sum;
    };
    
    return {
        addItem: function (type, desc,val) {
            var newItem, id;
            if(budgetData.items[type].length > 0)
            id++;
            else
            id = 0;
            
           if(type === 'inc')
                newItem = new Income (id, desc, val);
            else
                newItem = new Expense(id, desc, val);

        budgetData.items[type].push(newItem);

        return newItem;

    },

    caculateBudget: function(){
       // calculate total income and expenses
       calculateTotal('inc');
       calculateTotal('exp');

       budgetData.budget = budgetData.count.inc- budgetData.count.exp;
       if(budgetData.count.inc >0) 
            budgetData.percentage = Math.round((budgetData.count.exp/budgetData.count.inc)*100);
        else
            budgetData.percentage = -1;
   },
   getBudget: function(){
       return {
           budget: budgetData.budget,
           totalIncome: budgetData.count.inc,
           totalExpense: budgetData.count.exp,
           percentage: budgetData.percentage}
       }
   
   }


})();

var ServiceModule = (function(DataModuleObj, UIModuleObj){
    var updateBudget = function(){
        // calculate the budget
        DataModuleObj.caculateBudget();
        // return the budget
        var budget = DataModuleObj.getBudget();
        // Display Budget
    };

    var addItemService = function(){

          // 1. Get the field input data 
         var input = UIModuleObj.getuserInput();  
         if (input.description !=='' && !isNaN(input.value) && input.value > 0){
              // 2. Add the item to the budget controller
        var storeItem = DataModuleObj.addItem(input.type, input.description, input.value);
    
              // 3. Add the item to the UI
        var displayItem = UIModuleObj.addItemToUI(storeItem, input.type);   
    
                // 4. Clear the fields
        UIModuleObj.clearInputFields();
        updateBudget();
                // 5. Calculate and update budget
         
              // 6. Calculate and update percentages
        }
    };


    document.querySelector('.add__btn').addEventListener('click', addItemService);
    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13)
        addItemService();
    });

    var DeleteItem = function(event){

    };
  
})(DataModule, UIModule);

// Data structure to store data


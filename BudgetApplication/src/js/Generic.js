export const DOMStrings = { 
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    inputType: '.add__type',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    income_value: '.budget__income--value',
    expense_value: '.budget__expenses--value',
    budget_value: '.budget__value',
    percentage: '.budget__expenses--percentage',
    container: '.container',
    dateLabel:'.budget__title--month',
    percentage_label: '.item__percentage'
};

export const budgetData = {
    items: { inc: [], exp: [] },
    count: {inc: 0, exp: 0},
    budget:0 ,                 // how much amount is left
    percentage: -1                
 }

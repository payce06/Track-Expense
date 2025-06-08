const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expenseCategorySelect = document.getElementById('expense-category');
const addExpenseButton = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const totalExpensesSpan = document.getElementById('total-expenses');
const categoryFilterSelect = document.getElementById('category-filter');
const dateFilterInput = document.getElementById('date-filter');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        const expenseElement = document.createElement('li');
        expenseElement.innerHTML = `

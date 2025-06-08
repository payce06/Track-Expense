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
        <div>
            <span>${expense.name}</span>
            <span>$${expense.amount}</span>
            <span>${expense.category}</span>
            <span>${expense.date}</span>
        </div>
        <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(expenseElement);
        total += parseFloat(expense.amount);
    });

    totalExpensesSpan.textContent = total.toFixed(2);
}

function  saveExpenses(){
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
addExpenseButton.addEventListener('click', () => {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const date = expenseDateInput.value;
    const category = expenseCategorySelect.value;

    if(!name || !amount || !date) {
        alert('Please fill in all fields');
        return;
    }

    const newExpense = {name, amount, date, category};
    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();

   expenseNameInput.value = '';
   expenseAmountInput.value = '';
   expenseDateInput.value = '';
   expenseCategorySelect.value = 'Food';
});

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
}

categoryFilterSelect.addEventListener('change', () => {
    const category = categoryFilterSelect.value;
    const filteredExpenses = category == 'All'
       ? expenses
       : expenses.filter(expense => expense.category == category);

    renderFilteredExpenses(filteredExpenses);
});
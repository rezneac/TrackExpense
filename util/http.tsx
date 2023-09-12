import axios from 'axios';

export const storeExpense = (expenseData: object) => {
  axios.post('https://track-expense-d3fa7-default-rtdb.europe-west1.firebasedatabase.app/expenses.json', expenseData);
};

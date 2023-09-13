import axios from 'axios';

const BACKEND_URL = 'https://track-expense-d3fa7-default-rtdb.europe-west1.firebasedatabase.app';

export const storeExpense = async (expenseData: object) => {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
  const id = response.data.name;

  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export function updateExpense(id: string, expenseData: object) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

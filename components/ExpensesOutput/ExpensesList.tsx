import {FlatList, Text} from 'react-native';
import ExpenseItem from './ExpenseItem';

interface IProp {
  expenses: {
    id: string;
    description: string;
    amount: number;
    date: Date;
  }[];
}

function renderExpenseItem(itemData: {item: IProp['expenses'][0]}) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({expenses}: IProp) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
}

export default ExpensesList;

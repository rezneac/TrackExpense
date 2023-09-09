import {useContext, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/UI/Button';
import {ExpensesContext} from '../store/expenses-context';

const ManageExpense = ({route, navigation}: any) => {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseID;
  // convert value to a boolean if expenseID is undefined
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler(): void {
    navigation.goBack();
  }

  function confirmHandler(): void {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, {
        description: 'test!!!!',
        amount: 219.99,
        date: new Date('2023-05-12'),
      });
    } else {
      expenseCtx.addExpense({
        description: 'testsa',
        amount: 19.99,
        date: new Date('2023-05-22'),
        id: new Date().getDate().toString() + Math.random().toString(),
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

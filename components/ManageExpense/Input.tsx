import {KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

interface IProp {
  label: string;
  textInputConfig: TextInputProps;
  style?: Object;
  invalid: boolean;
}

const Input = ({label, invalid, textInputConfig, style}: IProp) => {
  const isMultiline = textInputConfig && textInputConfig.multiline;

  const inputStyles: Array<Object> = [
    styles.input,
    isMultiline ? styles.inputMultiLine : true, // Conditionally apply multiline style
  ];

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={[inputStyles, invalid && styles.invalidInput]} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

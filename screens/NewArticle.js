import React from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import {
  FormPicker as Picker,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import categoriesApi from "../api/categories";

const NewArticle = () => {
  const getCategoriesApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    getCategoriesApi.request();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder="Titre" style={styles.textInput} />
          <Picker
          items={getCategoriesApi}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
          <TextInput placeholder="Prix" style={styles.textInput} />
          <TextInput multiline={true} numberOfLines={4}placeholder="Description" style={styles.textInput} />
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});

export default NewArticle;
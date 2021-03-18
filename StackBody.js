import React, { Component } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Body extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.todos.map((data) => (
          <View style={styles.todo} key={data.id}>
            <View style={styles.todoText}>
              <Text>{data.text}</Text>
            </View>
            <TouchableOpacity onPressOut={() => this.props.removeTodo(data.id)}>
              <MaterialCommunityIcons
                style={styles.todoDelBtn}
                size={30}
                name="delete-outline"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
    // padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  todoCheckbox: {
    marginRight: 5,
  },
  todoText: {
    flexDirection: "row",
    padding: 10,
  },
  todoDelBtn: {
    color: "#777",
    padding: 10,
  },
});

export default Body;

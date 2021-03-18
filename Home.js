import React, { useState } from "react";
import Stack from "./Stack";
import StackBody from "./StackBody";
import { View, Button, ScrollView } from "react-native";
import { Input } from "react-native-elements";

function Home({ navigation }) {
  const [name, setName] = useState("");
  const [koName, setKoName] = useState("");
  const [age, setAge] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [state, setState] = useState({ todos: [] });

  const input = {
    name: name,
    koName: koName,
    age: age,
    instaUrl: instaUrl,
    gitUrl: gitUrl,
  };

  addTodo = (todo) => {
    // 새로운 할일(todo) 객체 생성
    const newTodo = {
      id: Date.now(), // 등록시간
      text: todo, // 할일 내용
    };

    // state 업데이트
    setState((prevState) => ({
      todos: [
        newTodo, // 새로 추가된 할일(todo)
        ...prevState.todos, // 기존의 할일 목록
      ],
    }));
  };

  removeTodo = (id) => {
    setState((prevState) => {
      const index = prevState.todos.findIndex((e) => e.id === id);
      prevState.todos.splice(index, 1);
      return {
        todos: [...prevState.todos],
      };
    });
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 20 }}>
        <Input
          placeholder="English Name"
          leftIcon={{ type: "font-awesome", name: "" }}
          // style={styles}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Input
          placeholder="Korean Name"
          leftIcon={{ type: "font-awesome", name: "" }}
          // style={styles}
          value={koName}
          onChangeText={(value) => setKoName(value)}
        />
        <Input
          placeholder="Age"
          leftIcon={{ type: "font-awesome", name: "" }}
          // style={styles}
          keyboardType="numeric"
          value={age}
          onChangeText={(value) => setAge(value)}
        />
        <Input
          placeholder="Instagram url"
          leftIcon={{ type: "font-awesome", name: "" }}
          // style={styles}
          value={instaUrl}
          onChangeText={(value) => setInstaUrl(value)}
        />
        <Input
          placeholder="Github url"
          leftIcon={{ type: "font-awesome", name: "" }}
          // style={styles}
          value={gitUrl}
          onChangeText={(value) => setGitUrl(value)}
        />
        <Stack addTodo={addTodo} />
        <StackBody todos={state.todos} removeTodo={removeTodo} />
        <Button
          title="Go to Profile"
          onPress={() =>
            navigation.navigate("Profile", {
              input,
              state,
            })
          }
        />
      </View>
    </ScrollView>
  );
}

export default Home;

import React, { useState, useRef } from "react";
import Stack from "./Stack";
import StackBody from "./StackBody";
import { View, Button, ScrollView } from "react-native";
import { Input } from "react-native-elements";
// 스크린샷을 도와주는 Open Source
import ViewShot from "react-native-view-shot";
// Google Drive나 메세지, SNS 등으로 이미지를 공유하기 위한 Open Source
// import Share from "react-native-share";
import * as Sharing from "expo-sharing";

function Home({ navigation }) {
  const captureRef = useRef();
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
  async function getPhotoUri() {
    const uri = await captureRef.current.capture();
    console.log("👂👂 Image saved to", uri);
    // onCapture(null, uri);
    openShareDialogAsync(uri);
  }

  async function openShareDialogAsync(uri) {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    await Sharing.shareAsync("file://" + uri);
  }

  // async function onCapture(social, uri) {
  //   try {
  //     const options = {
  //       title: "Share Title",
  //       message: "Share Message",
  //       url: uri,
  //       type: "image/jpeg",
  //     };

  //     if (social === null) {
  //       const result = await Share.open(options);
  //       console.log("😻😻 result with no social", result);
  //     } else {
  //       const result = await Share.shareSingle({
  //         ...options,
  //         social,
  //       });
  //       console.log(`😻😻 result with social ${social}`, result);
  //     }
  //   } catch (e) {
  //     console.log("😻😻😻 snapshot failed", e);
  //   }
  // }

  return (
    <ScrollView>
      <ViewShot
        ref={captureRef}
        options={{ format: "jpg", quality: 0.9, height: 10000 }}
      >
        <View style={{ marginTop: 20 }}>
          <Button title="Screen Shot" onPress={getPhotoUri} />
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
          {/* <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />

          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          />
          <Input
            placeholder="Github url"
            leftIcon={{ type: "font-awesome", name: "" }}
            // style={styles}
            value={gitUrl}
            onChangeText={(value) => setGitUrl(value)}
          /> */}

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
      </ViewShot>
    </ScrollView>
  );
}

export default Home;

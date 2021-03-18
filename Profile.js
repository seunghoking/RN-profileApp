import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { Card, Button, SocialIcon } from "react-native-elements";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

function Profile({ route }) {
  const { input, state } = route.params;
  const name = input.name || "";
  const koName = input.koName || "";
  const age = input.age || "";
  const gitUrl = input.gitUrl || "";
  const instaUrl = input.instaUrl || "";
  const stacks = state.todos || [];

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ marginBottom: 10 }}>
          <Card>
            <View style={styles.user}>
              <View>
                {image ? (
                  <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={styles.image} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={require("./assets/defaultImg.png")}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.subName}>
                  {koName} {age}
                </Text>
              </View>
            </View>
            <Card.Divider />
            <Button
              title="View Detail"
              buttonStyle={{ backgroundColor: "#995AE9" }}
            />
          </Card>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Card>
            <Card.Title style={{ fontSize: 20, color: "#0073CF" }}>
              Stacks
            </Card.Title>
            {stacks.map((u, i) => {
              return (
                <>
                  <View key={i} style={styles.stacks}>
                    <Icon style={styles.icon} name={u.text} />
                    <Text style>{u.text}</Text>
                  </View>
                  {i == stacks.length - 1 ? null : <Card.Divider />}
                </>
              );
            })}
          </Card>
        </View>
        <View style={{ marginTop: 15 }}>
          <SocialIcon
            type="instagram"
            button
            onPress={() => {
              if (instaUrl) {
                Linking.openURL({ instaUrl });
              }
            }}
          />
          <SocialIcon
            type="github"
            button
            onPress={() => {
              if (gitUrl) {
                Linking.openURL({ gitUrl });
              }
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    color: "#187bdc",
  },
  stacks: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginRight: 15,
    marginBottom: 25,
  },
});

export default Profile;

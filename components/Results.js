import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  ScrollView,
  AppRegistry,
  TouchableHighlight,
  StatusBar,
  FlatList
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import CardContent from "../node_modules/react-native-paper/src/components/Card/CardContent";
import CardCover from "../node_modules/react-native-paper/src/components/Card/CardCover";
var jsdiff = require("diff");

var result = [];

export default class Results extends React.Component {
  highlight = () => {
    const { poem_filtered, results } = this.props.navigation.state.params;

    const diff = jsdiff.diffChars(poem_filtered.toLowerCase(), results);
    diff.forEach(part => {
      console.log("part: ", part);
      result = [
        ...result,
        { word: part.value, added: part.added, removed: part.removed }
      ];
    });
    console.log("OUTPUTS: ", result);
  };

  renderItem = ({ item }) => {
    const str = item.word;
    const arr = [];
    arr.push(str + " ");
    if (item.added) {
      return (
        <Paragraph
          style={{
            color: "green",
            fontFamily: "Philosophy-Regular",
            fontSize: 18
          }}
        >
          {arr}
        </Paragraph>
      );
    } else if (item.removed) {
      return (
        <Paragraph
          style={{
            color: "orange",
            fontFamily: "Philosophy-Regular",
            fontSize: 18
          }}
        >
          {arr}
        </Paragraph>
      );
    } else {
      return (
        <Paragraph
          style={{
            color: "black",
            fontFamily: "Philosophy-Regular",
            fontSize: 18
          }}
        >
          {arr}
        </Paragraph>
      );
    }
  };

  render() {
    const {
      value,
      points,
      matched,
      not_matched
    } = this.props.navigation.state.params;

    this.highlight();

    return (
      <ScrollView
        style={{
          height: 700,
          backgroundColor: "#F5FCFF"
        }}
      >
        <View style={styles.container}>
          {/* <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.20)"
            animated
          /> */}
          <View>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: 30
              }}
            >
              <Card
                style={{
                  width: 200
                }}
              >
                <CardContent
                  style={{
                    backgroundColor: "white"
                  }}
                >
                  <Paragraph
                    style={{
                      color: "#00B8D4",
                      textAlign: "center",
                      fontSize: 20,
                      fontFamily: "Philosophy-Regular"
                    }}
                  >
                    Точность: {value}%
                  </Paragraph>
                </CardContent>
              </Card>
            </View>

            <Card
              style={{
                width: 300,
                height: 100
              }}
            >
              <CardContent>
                <FlatList
                  horizontal
                  data={result}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </CardContent>
            </Card>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <Button
              style={{
                backgroundColor: "#0CD78E",
                width: 150,
                marginRight: 10
              }}
              compact
              color="white"
              onPress={() => this.props.navigation.goBack()}
            >
              Повторить
            </Button>

            <Button
              style={{
                backgroundColor: "#0CD78E",
                width: 150,
                marginLeft: 10
              }}
              compact
              color="white"
              onPress={() => this.props.navigation.navigate("AppGuide")}
            >
               Следующий
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70
  },
  container: {
    height: 700,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
    // E5E5E5, CFD8DC
  }
});

AppRegistry.registerComponent("VoiceTest", () => VoiceTest);

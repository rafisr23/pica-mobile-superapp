import { useState, useEffect } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from items where done = ?;`, [doneHeading ? 1 : 0], (_, { rows: { _array } }) => setItems(_array));
    });
  }, []);

  const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value, value2 }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
          <Text style={{ color: done ? "#fff" : "#000" }}>{value2}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const example = () => {
  const [text, setText] = useState(null);
  const [text2, setText2] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("create table if not exists items (id integer primary key not null, done int, value text, value2 text);");
    });
  }, []);

  const add = (text, text2) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }
    if (text2 === null || text2 === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (done, value, value2) values (0, ?, ?)", [text, text2]);
        tx.executeSql("select * from items", [], (_, { rows }) => console.log(JSON.stringify(rows)));
      },
      null,
      forceUpdate
    );
  };

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
    const [value2, setValue2] = useState(0);
    return [() => setValue(value2 + 1), value2];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Example</Text>

      {Platform.OS === "web" ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.heading}>Expo SQlite is not supported on web!</Text>
        </View>
      ) : (
        <>
          <View style={styles.flexRow}>
            <TextInput onChangeText={(text) => setText(text)} placeholder="what do you need to do?" style={styles.input} value={text} />
            <TextInput onChangeText={(text) => setText2(text)} placeholder="what do you need to do?" style={styles.input} value={text2} />
            <TouchableOpacity
              onPress={() => {
                add(text, text2);
                setText(null);
                setText2(null);
                console.log(text);
                console.log(text2);
              }}
              style={[styles.button, { width: 100, marginTop: 15 }]}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.listArea}>
            <Items
              key={`forceupdate-todo-${forceUpdateId}`}
              done={false}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
            <Items
              done
              key={`forceupdate-done-${forceUpdateId}`}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(`delete from items where id = ?;`, [id]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default example;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    height: 48,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

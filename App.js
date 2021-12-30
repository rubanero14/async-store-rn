import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorageStatic } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const save = async() => {
    try {
      await AsyncStorage.setItem("Name", name);
      await AsyncStorage.setItem("Phone", phone);
      await AsyncStorage.setItem("Email", email);
    } catch(err){
      alert(err);
    }
  }

  const remove = async() => {
    try {
      await AsyncStorage.removeItem("Name");
      await AsyncStorage.removeItem("Phone");
      await AsyncStorage.removeItem("Email");
    } catch (err){
      alert(err);
    } finally {
      setName("");
      setPhone("");
      setEmail("");
    }
  }

  useEffect (() => {
    load();
  },[]);

  const load = async() => {
    try{
      let name = await AsyncStorage.getItem("Name");
      let phone = await AsyncStorage.getItem("Phone");
      let email = await AsyncStorage.getItem("Email");
      if (name !== null){
        setName(name);
      }
      if (phone !== null){
        setPhone(phone);
      }
      if (email !== null){
        setEmail(email);
      }
    } catch(err) {
      alert(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Name:{name}</Text>
      <Text>Phone:{phone}</Text>
      <Text>Email:{email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="numeric"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="numeric"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="numeric"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
          style={styles.button}
          onPress={()=>save()}
        >
          <Text style={styles.btnText}>Save Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.btnText} onPress={()=>remove()}>Clear Data</Text>
        </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "purple",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff"
  }
});

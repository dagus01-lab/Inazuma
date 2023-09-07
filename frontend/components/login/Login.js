import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Switch, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './Login.style';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}> 
     <View style={styles.riga}>
        <View style={styles.blueCircle} />
        <Text style={styles.title}>Inazuma</Text>     
      </View>
      <View style={styles.centeredTextContainer}>
        <Text style={styles.secondTitle}>Log in to Inazuma</Text>
      </View>
      <View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Nome" placeholderTextColor="#000"/>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Email" placeholderTextColor="#000"/>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value="" onChangeText={(text) => {setPassword(text)}}  secureTextEntry={true} placeholder="Password" placeholderTextColor="#000"/>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Conferma password" placeholderTextColor="#000"/>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Cellulare" placeholderTextColor="#000"/>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value="" onChangeText={() => {}} placeholder="Data di nascita" placeholderTextColor="#000"/>
      </View>
      <View>
      <View style={styles.box}>
        <BouncyCheckbox style={{marginTop: -3}} fillColor='#1e90ff'></BouncyCheckbox><Text>Accetto di ricevere notifiche via SMS/Mail</Text>
      </View>
      <View style={styles.boxDue}>
        <BouncyCheckbox style={{marginTop: -3}}  fillColor='#1e90ff'></BouncyCheckbox><Text>Accetto i termini e le condizioni</Text>
      </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
         <Text style={styles.buttonText}>CREA ACCOUNT</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};


export default Login;

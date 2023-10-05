import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './Login.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../utili/useTogglePasswordVisibility';
import { Stack } from 'expo-router';


const Login = ({onLogIn}) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const recuperaPassword = () => {
    //funzione da implementare
    alert("Funzione ancora non implementata")
  }

  const registrazione = () => {
    router.replace("/Registrazione");
    }
  
  return (
    <View style={styles.container}> 
      <Stack.Screen options={{ headerStyle: { backgroundColor: '#f4f4f4'}, headerShadowVisible: false, headerTitle: ""}}/>
     <View style={styles.riga}>
        <View style={styles.blueCircle} />
        <Text style={styles.title}>Inazuma</Text>     
      </View>
      <View style={styles.centeredTextContainer}>
        <Text style={styles.secondTitle}>Log in to Inazuma</Text>
      </View>
      <View>
      <View style={styles.textInput}>
        <TextInput style={styles.inputField} value={email} onChangeText={(text) => {setEmail(text)}} placeholder="   Email" placeholderTextColor="#d3d3d3"/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputField} name="password" placeholder="   Password" autoCapitalize="none" autoCorrect={false} textContentType="newPassword" secureTextEntry={passwordVisibility} value={password} enablesReturnKeyAutomatically onChangeText={text => setPassword(text)} placeholderTextColor="#d3d3d3"/>
        <Pressable style={{marginRight: 10}} onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.button} onPress={ () => onLogIn(email, password)} >
         <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </View>
      <View>
        <Pressable onPress={recuperaPassword}>
        <Text style={{color: '#1e90ff', textDecorationLine:'underline', marginTop: 38}}>Hai dimenticato la password?</Text>
        </Pressable>
      </View>
      <View style={styles.horizontalLine}>
          <View style={styles.line} />
          <Text style={styles.lineText}>oppure</Text>
          <View style={styles.line} />
        </View>
        {/* //inserire la possibilita di loggarsi con google e facebook */}
        <View>
          <Text>Se non hai un account</Text>
        </View>
        <View>
        <Pressable onPress={registrazione}>
          <Text style={{color: '#1e90ff', textDecorationLine:'underline'}}>Registrati qui!</Text>
          </Pressable>
        </View>

    </View>
  );
};


export default Login;

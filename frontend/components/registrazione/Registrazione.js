import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './Registrazione.style';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../utili/useTogglePasswordVisibility';
import { useTogglePasswordVisibility_other } from '../utili/useTogglePasswordVisibility_other';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const Registrazione = () => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const { passwordVisibility_other, rightIcon_other, handlePasswordVisibility_other } = useTogglePasswordVisibility_other();
  const router = useRouter();
  const [nomeCognome, setNomeCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [cellulare, setCellulare] = useState('');
  const [date, setDate] = useState(new Date());
  const [date_string, setDateString] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [condizioni, setCondizioni] = useState(false);
  const [notifiche, setNotifiche] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toDateTimeString = (data) => {
    let temp = data.toDateString();
    return temp.slice(4);
  }

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      // Verifica se selectedDate è definito (l'utente ha effettivamente selezionato una data)
      const currentDate = selectedDate || date;
      setDate(currentDate);
      toggleDatePicker();
      const dateString = toDateTimeString(currentDate); // Converte la data in una stringa
      setDateString(dateString);
    } else {
      // L'utente ha annullato la selezione, puoi gestire questo caso se necessario
      toggleDatePicker();
      }

  }

  const emailValidation = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  const passwordValidation = () => {
    return password === confPass;
  }
  
  const creaAccount = () => {
    if(condizioni){
      if(emailValidation()){
        if(passwordValidation()){
          if(nomeCognome.length > 0){
            if(cellulare.length === 10){
              if(password.length > 6 && confPass.length > 6){
                //mandare i dati al backend con axios
              }
                else{
                  alert("La password deve essere lunga almeno 6 caratteri");
                }
              }
            else{
              alert("Numero di cellulare non valido");
              setCellulare('');
            }
          }
          else{
            alert("E' necessario inserire il tuo nome");
          }
        }
        else{
          alert("Le password inserite devono essere identiche");
        }
      }
      else {
        alert("L'email inserita non è valida")
        setEmail('');
      }
    }
    else{
      alert("Non è possibile continuare senza accettare i termini e le condizioni");
    }
  }

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
        <TextInput style={styles.input} value={nomeCognome} onChangeText={(text) => {setNomeCognome(text)}} placeholder="Nome e Cognome" placeholderTextColor="#d3d3d3"/>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value={email} onChangeText={(text) => {setEmail(text)}} placeholder="Email" placeholderTextColor="#d3d3d3"/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputField} name="password" placeholder="Password" autoCapitalize="none" autoCorrect={false} textContentType="newPassword" secureTextEntry={passwordVisibility} value={password} enablesReturnKeyAutomatically onChangeText={text => setPassword(text)} placeholderTextColor="#d3d3d3"/>
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputField} name="confermaPassword" placeholder="Conferma password" autoCapitalize="none" autoCorrect={false} textContentType="newPassword" secureTextEntry={passwordVisibility_other} value={confPass} enablesReturnKeyAutomatically onChangeText={text => setConfPass(text)} placeholderTextColor="#d3d3d3"/>
        <Pressable onPress={handlePasswordVisibility_other}>
          <MaterialCommunityIcons name={rightIcon_other} size={22} color="#232323" />
        </Pressable>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} value={cellulare} onChangeText={(text) => {setCellulare(text)}} placeholder="Cellulare" keyboardType="numeric" placeholderTextColor="#d3d3d3"/>
      </View>
      { !showDatePicker && (
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputField} value={date_string} placeholder="Data di nascita" editable={false} placeholderTextColor="#d3d3d3"/>
        <Pressable onPress={toggleDatePicker}>
        <MaterialCommunityIcons name="calendar-blank" size={30} color="#000"/>
        </Pressable>
      </View>
      ) }
      { showDatePicker && (
        <View style={styles.date_container}>
        <Text style={{marginTop: 10}}>Seleziona la tua data di nascita:</Text>
        <RNDateTimePicker style={styles.date} testID="dateTimePicker"  value={date} mode="date" onChange={onChange} maximumDate={new Date()}/>
        </View>
      ) 
      }
      <View>
      <View style={styles.box}>
        <BouncyCheckbox style={{marginTop: -3}} isChecked={notifiche} fillColor='#1e90ff' onPress={() => {setNotifiche(!notifiche)}}></BouncyCheckbox><Text>Accetto di ricevere notifiche via SMS/Mail</Text>
      </View>
      <View style={styles.boxDue}>
        <BouncyCheckbox style={{marginTop: -3}} isChecked={condizioni} fillColor='#1e90ff' onPress={() => {setCondizioni(!condizioni)}}></BouncyCheckbox><Text>Accetto i termini e le condizioni</Text>
      </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={creaAccount} >
         <Text style={styles.buttonText}>CREA ACCOUNT</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};


export default Registrazione;

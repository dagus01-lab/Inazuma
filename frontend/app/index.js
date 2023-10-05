import { useState } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';

import Registrazione from './(components)/(registrazione)/Registrazione'
import Login from './(components)/(login)/Login';

const Home = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    const logIn = (email, password) => {
        axios.post('https://localhost:3000/api/login', {
            // Dati da inviare nel corpo della richiesta
            email: email,
            password: password,
          })
            .then(function(response) {
              // Gestisci la risposta qui
              console.log(response.data);
              if(response.data === "Login successful"){
                alert("Login effetuato con successo");
                setIsLogged(true);
              }
              else{
                alert("Credenziali errate");
                router.push("/Login");
              }
            })
            .catch(function (error) {
              // Gestisci gli errori qui
              console.error(error);
              setIsLogged(false);
              router.push("/Login")

            });
          
      
    }

    return (
        <View style={{  backgroundColor: '#f4f4f4' , width: "100%", flex: 1}}>
             <Stack.Screen options={{ headerStyle: { backgroundColor: '#f4f4f4'}, headerShadowVisible: false, headerTitle: ""}}/>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: "100%"}}>
           { isLogged ? <Registrazione/> : <Login/> }
                       </ScrollView>
        </View>
    )
} 

export default Home;

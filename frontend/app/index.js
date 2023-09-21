import { useState } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import Registrazione from '../components/registrazione/Registrazione'
import Login from '../components/login/Login';

const Home = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    const logIn = (email, password) => {
        if(true){
            setIsLogged(true);
        } // controllo delle credenziali
      
    }

    return (
        <View style={{  backgroundColor: '#f4f4f4' , width: "100%", flex: 1}}>
             <Stack.Screen
            options={{
                 headerStyle: { backgroundColor: '#f4f4f4'},
                 headerShadowVisible: false,
                // headerLeft: () => (
                //     <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
                // ),
                // headerRight: () => (
                //     <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>
                // ),
                 headerTitle: "",
            }}/>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: "100%"}}>
            {/* { isLogged ? ( <Home /> ) : ( <Login/> ) } */}
            <Login onLogIn={logIn}></Login>
            </ScrollView>
        </View>
    )
} 

export default Home;

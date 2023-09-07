import { useState } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import Login from '../components/login/Login'

const Home = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    return (
        <View style={{  backgroundColor: 'white' , width: "100%", flex: 1}}>
             <Stack.Screen
            options={{
                // headerStyle: { backgroundColor: COLORS.lightWhite },
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
            {/* { isLogged ? ( <Login /> ) : ( <Login/> ) } */}
            <Login></Login>
            </ScrollView>
        </View>
    )
} 

export default Home;

import React, {useState} from 'react';
import {StatusBar, useColorScheme, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {CombinedDarkTheme as dark, CombinedDefaultTheme as light} from "./Styles";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import { Provider} from 'react-native-paper';
import Default from "./comps/Default";
import Home from "./pages/Home"
import CollectionComp from "./pages/Collection";
import About from "./pages/About";
import InterviewPage from "./pages/Interview";


const ThemedStatusBar = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? dark : light;
    return (
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.elevation.level2}
        />
    )
}

const ThemedBackButton = () => {
    return (
        <View>

        </View>
    )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? dark : light
    return (
        <Provider theme={theme}>
            <NavigationContainer theme={theme}>
                <ThemedStatusBar/>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {
                            backgroundColor: theme.colors.elevation.level2
                        }
                    }}>
                        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                        <Stack.Screen name="About" component={About}/>
                        <Stack.Screen name="Collection" component={CollectionComp}
                                      options={({route}) => ({title: route.params.data.name})}/>
                        <Stack.Screen name="Interview" component={InterviewPage}
                                      options={({route}) => ({title: route.params.data.title})}/>
                        <Stack.Screen name="Placeholder" component={Default} options={{headerShown: false}}/>
                    </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;

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

/**
 * A component that updates the theme of the system status bar based on the system theme
 */
const ThemedStatusBar = () => {
    // useColorScheme() is a built-in react hook that grabs your system theme
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? dark : light;
    return (
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.elevation.level2} // react-native-paper theme color, can use black/white
        />
    )
}

// This is the constructor for a stack navigator as defined by @react-navigation/native
const Stack = createStackNavigator();

/**
 *  The main App component of the application. This is what gets run.
 */
const App = () => {
    // use ColorScheme is a built-in react hook that grabs your system theme
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? dark : light
    return (
        <Provider theme={theme}> {/* The provider is what defines the theme for react-native-paper, must be at root */}
            <NavigationContainer theme={theme}> {/* Handles navigation and nav gestures, must be at root */}
                <ThemedStatusBar/>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {
                            // this is the same color as defined in the statusbar, simply for consistency
                            backgroundColor: theme.colors.elevation.level2
                        }
                    }}>
                        {/* Each screen is a page that can be navigated to using the navigate() method
                            Read more in the react-navigation documentation to understand how this all works */}
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

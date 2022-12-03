import React, {useEffect, useState} from 'react';
import {
    FlatList,
    ImageBackground,
    Pressable,
    View,
    ActivityIndicator,
    Image,
    Dimensions,
    ScrollView
} from "react-native";
import {Card, Text} from 'react-native-paper';
import MaterialCommunityIcons, {MaterialCommunityIconsGlyphs} from "react-native-vector-icons/MaterialCommunityIcons";
import {Styles as s} from "../Styles";
import { createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Default from "../comps/Default";
import Search from "../comps/Search";
import {sendGraphQl} from "../Utils";
import Consts from "../Consts";
import {createStackNavigator} from "@react-navigation/stack";
import InterviewPage from "./Interview";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// If the bottom tab icons aren't working, follow the steps in the following:
// https://reactnavigation.org/docs/material-bottom-tab-navigator/
// https://github.com/oblador/react-native-vector-icons#installation

const CollectionHome = ({data}) => {
    const width = Dimensions.get('window').width;
    const [bannerUri, setBannerUri] = useState("")

    return (
        <ScrollView>
            <Image style={{ height: 200, width: width}}
                   source={bannerUri ? {uri: bannerUri} : require("../assets/placeholder2.jpg")}/>
            <View style={{padding: 16}}>
                <Text style={{...s.h1}}>
                    {data.name}
                </Text>
                <Text style={{...s.vmargin, ...s.body}}>
                    {data.description ?? "[Warning] description is null."}
                </Text>
            </View>
        </ScrollView>
    )
}

const fetchInterviews = async (id) => {
    const query = `query NewQuery {
                      category(id: "${id}") {
                        posts {
                          nodes {
                            title
                            content
                            date
                            id
                            featuredImage {
                              node {
                                mediaItemUrl
                              }
                            }
                            link
                          }
                        }
                      }
                    }`
    return (await sendGraphQl(query, Consts.endpoint)).data.category.posts.nodes;
}

const Interviews = ({data, navigation}) => {

    const [wait, setWait] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [ints, setInts] = useState([]);

    const Refresh = () => {
        setRefresh(true)
        setWait(true)
    }

    useEffect(() => {
        const Load = async() => {
            if (wait) {
                setInts( await fetchInterviews(data.id))
            }
            setWait(false);
            setRefresh(false);
        }
        Load();
    }, [refresh, wait])

    const reduceLen = (input) => {
        const bp = 66
        if (input == null) return null;
        if (input.length < bp) return input;
        return input.substring(0, bp - 3) + "...";
    }

    return (
        <View style={{height: '100%'}}>
            <FlatList data={ints}
                      renderItem={({item, index, separators}) => (
                          <View style={{borderRadius: 12, overflow: 'hidden', marginTop: 6, marginBottom: 6}}>
                              <Pressable android_ripple={{color: '#88888888', foreground: true}}
                                         style={{borderRadius: 12}}
                                         onPress={() => navigation.navigate('Interview', {data: item})}>
                                  <Card mode='contained'>
                                      <Card.Content>
                                          <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                              {item.title}
                                          </Text>
                                          <Text>
                                              {reduceLen(item.content) ?? "[Warning] No Content"}
                                          </Text>
                                      </Card.Content>
                                  </Card>
                              </Pressable>
                          </View>
                      )}
                      style={{paddingLeft: 16, paddingRight: 16}}
                      refreshing={refresh}
                      onRefresh={Refresh}
            />
            {
                wait &&
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", position: 'absolute',
                    width: '100%', height: '100%'}}>
                    <ActivityIndicator size="large"/>
                </View>
            }
        </View>
    )
}

const InterviewsStack = ({catData, headnav}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Select" options={{headerShown: false}}>
                {() => <Interviews data={catData} navigation={headnav}/>}
            </Stack.Screen>
            <Stack.Screen name="Interview" component={InterviewPage}/>
        </Stack.Navigator>
    )
}

const CollectionComp = ({route, navigation}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="About" options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="information" color={color} size={24}/>
                )
            }}>
                {() => <CollectionHome data={route.params.data}/>}
            </Tab.Screen>
            <Tab.Screen name='Interviews' options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="book" color={color} size={24}/>
                )
            }}>
                {() => <InterviewsStack catData={route.params.data} headnav={navigation}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default CollectionComp;
import {Card, Text} from "react-native-paper";
import {ActivityIndicator, Dimensions, FlatList, Image, ScrollView, View} from "react-native";
import {Styles as s} from "../Styles"
import React, {useEffect, useState} from "react";
import Default from "../comps/Default";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {sendGraphQl} from "../Utils";
import Consts from "../Consts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const Member = ({name, img, children}) => {
    if (!img) img = require('../assets/profileplaceholder.png');

    return (
        <Card mode="contained" style={{marginTop: 8, marginBottom: 8, padding: 12, borderRadius: 16}}>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={img} style={{width: 120, height: 120, borderRadius: 12}}/>
                <View style={{marginLeft: 24}}>
                    <Text style={{...s.h3}}>
                        {name}
                    </Text>
                    <Text style={{...s.body}}>
                        {children ?? "Empathy Bytes Member"}
                    </Text>
                </View>
            </View>

        </Card>
    )
}

const InfoPage = () => {
    const width = Dimensions.get('window').width;
    const aboutBanner = "../assets/placeholder.jpg"
    const centerImg = "../assets/placeholder3.jpg"

    return (
        <ScrollView>
            <Image style={{marginBottom: 12, height: 280, width: width}}
                   source={require(aboutBanner)}/>
            <View style={{padding: 24}}>
                <Text style={{...s.h1, fontVariant: ['small-caps']}}>
                    We are Empathy Bytes
                </Text>
                <Text style={{...s.body, ...s.vmargin, fontSize: 24}}>
                    We create immersive technology & media centered around empathy.
                </Text>


                <View style={{...s.vcenter, marginTop: 48}}>
                    <Image source={require(centerImg)} style={{width: width * 0.85, height: width * 0.6, borderRadius: 24}}/>
                </View>
                <Text style={{marginTop: 36, ...s.body, fontWeight: 'bold'}}>
                    We are a Vertically Integrated Project team at Georgia Tech exploring the lives of those touched by
                    Georgia Tech’s research and technology initiatives.
                </Text>
                <Text style={{...s.vmargin}}>
                    The Vertically Integrated Project Program at
                    Georgia Tech brings together teams of undergraduate students from various years, disciplines, and
                    backgrounds with faculty and graduate students to work on long-term, large-scale, multidisciplinary
                    projects. Learn more about Georgia Tech’s VIP program here.
                </Text>
                <Text style={{...s.vmargin}}>
                    Our team focuses on building an immersive digital archive of interviews, photographs, multimedia,
                    and writings from diverse communities. We explore the connections these communities have to Georgia
                    Tech research and creative endeavors. Using technologies such as Augmented Reality, Virtual
                    Reality, and mobile apps, our team hopes to allow users to step into another person’s shoes while
                    exploring our oral history projects. By collecting and documenting oral histories and augmenting them
                    with immersive technology, we aim to inspire and build empathy among our users.
                </Text>

                <Text style={{marginTop: 48, textAlign: 'center', opacity: 0.5}}>
                    © 2022 EMPATHY BYTES.
                </Text>
            </View>
        </ScrollView>
    )
}

const MembersList = () => {

    const [wait, setWait] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [mems, setMems] = useState([]);

    const fetchMembers = async () => {
        const query = `query Members {
                          category(id: "dGVybToxMQ==") {
                            posts {
                              nodes {
                                content
                                title
                                featuredImage {
                                  node {
                                    mediaItemUrl
                                  }
                                }
                              }
                            }
                          }
                        }`
        return (await sendGraphQl(query, Consts.endpoint)).data.category.posts.nodes;
    }

    const Refresh = () => {
        setRefresh(true)
        setWait(true)
    }

    useEffect(() => {
        const Load = async() => {
            if (wait) {
                setMems( await fetchMembers())
            }
            setRefresh(false);
            setWait(false);
        }
        Load();
    }, [wait, refresh])

    return (
        <View style={{height: '100%'}}>
            <FlatList data={mems}
                      renderItem={({item, index, separators}) => (
                          <Member name={item.title}
                                  img={item.featuredImage ? {uri: item.featuredImage.node.mediaItemUrl} : null}>
                              {item.content.substring(4,item.content.length-5)}
                          </Member>
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

const MembersHardcoded = () => {
    return (
        <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
            <Member name="Alison Valk" img={{uri: "http://educast.library.gatech.edu/wp-content/uploads/2019/12/17C10407-P8-067TU-150x150.jpg"}}>Advisor</Member>
            <Member name="Greyson Mullins">Media Team Lead</Member>
            <Member name="Audrey Chung">Web Development</Member>
            <Member name="Julia Polo"></Member>
            <Member name="Lee Lee Jiang" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2021/11/LeeLee-150x150.png"}}>Web Design Lead</Member>
            <Member name="Sruti Gandreti">Web Design</Member>
            <Member name="Angela Dai" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2021/11/Angela-edited-150x150.jpg"}}>Emerging Tech: Unity Team Lead</Member>
            <Member name="Wilson Chen" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2022/11/Wilson-125x125.jpg"}}>Web Development Team Lead</Member>
            <Member name="Princess Empel">Web Development & Emerging Tech: AR</Member>
            <Member name="Seth Morrill" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2021/11/Seth-1-150x150.jpg"}}>Emerging Tech: Unity Team Lead</Member>
            <Member name="Evelyn Craven">Web Development</Member>
            <Member name="Eunice Kim">Web Design</Member>
            <Member name="Nivedita Chellam" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2021/11/Nivedita-scaled-e1638156252465-150x150.jpg"}}>Emerging Tech: AR Team Lead</Member>
            <Member name="Iliyah Dean"></Member>
            <Member name="Emelia Gapp"></Member>
            <Member name="Joseph Liu" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2021/11/Joseph.jpg-1-150x150.png"}}>Web Development</Member>
            <Member name="Inika Gupta">Web Design</Member>
            <Member name="Rutika Karande" img={{uri: "https://educast.library.gatech.edu/wp-content/uploads/2021/11/Rutika-edited-150x150.jpg"}}>Emerging Tech: Unity</Member>
            <Member name="Taylor Roth"></Member>
            <Member name="Jacqueline Le"></Member>
        </ScrollView>
    )
}

export default function About() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="About Us" component={InfoPage} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="information" color={color} size={24}/>
                )
            }}/>
            <Tab.Screen name='Members' component={MembersList} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account" color={color} size={24}/>
                )
            }}/>
            <Tab.Screen name='Members (HC)' component={MembersHardcoded} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account" color={color} size={24}/>
                )
            }}/>
        </Tab.Navigator>
    );
}
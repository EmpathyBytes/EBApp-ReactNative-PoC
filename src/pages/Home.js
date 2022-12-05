import React, { useEffect, useState } from 'react';
import {
    View, useColorScheme, Image,
    FlatList, TextInput, ActivityIndicator, Pressable
} from "react-native";
import {Styles as s} from "../Styles";
import Consts from "../Consts"
import { sendGraphQl, waitFor } from '../Utils';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Text} from 'react-native-paper';
import Search from "../comps/Search";

/**
 * Gets the categories from the wordpress site
 */
const GetCategories = async () => {
    const query =  `query get_categories {
                        categories {
                            nodes {
                                name
                                id
                                description
                            }
                        }
                    }`
    return (await sendGraphQl(query, Consts.endpoint)).data.categories.nodes;
}

/**
 * Component that defines the top of the page, including the logo and text
 */
const Top = () => {
    const imgPath = '../assets/logo.png'
    return (
        <View style={{...s.vcenter ,paddingTop: 32}}>
            <View style={{...s.hright, height: 120, margin: 12, marginBottom: 0}}>
                <Image source={require(imgPath)} style={{width: 120, height: 120}}/>
            </View>
            <Text style={{ ...s.h2, ...s.tac}}>
                Welcome to Empathy Bytes
            </Text>
            <Text style={{...s.vmargin, ...s.body}}>
                Check out one of our collections below!
            </Text>
        </View>
    )
}

/**
 * Component that defines a card on the home screen
 * @param props
 */
const HomeCard = (props) => {
    const height = props.height ?? 96

    const reduceLen = (input) => {
        const bp = 130
        if (input == null) return null;
        if (input.length < bp) return input;
        return input.substring(0, bp - 3) + "...";
    }

    return (
        <Card mode="contained">
            <Card.Content>
                <View style={{height: height, display: 'flex', flexDirection: 'row',alignItems: 'flex-end'}}>
                    <View>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                            {props.data.name}
                        </Text>
                        <Text style={{fontSize: 14}}>
                            {reduceLen(props.data.description) ?? "[Warning] description is null."}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

/**
 * About card on home page
 * @param navigation handled by react-navigation
 */
const About = ({navigation}) => {
    const height = 60
    const about = {
        name: 'About',
        description: 'Learn more about Empathy Bytes and the team!'
    }
    return (
        <View style={{borderRadius: 12, overflow: 'hidden', marginBottom: 12}}>
            <Pressable android_ripple={{color: '#88888888', foreground: true}}
                       style={{borderRadius: 12}}
                       onPress={() => navigation.navigate('About')}>
                <HomeCard data={about} height={height}/>
            </Pressable>
        </View>
    )
}

/**
 * Component Card, displays info about a collection
 * @param data The collection in question
 * @param navigation handled by react-navigation
 */
const CompCard = ({data, navigation}) => {
    return (
        <View style={{borderRadius: 12, overflow: 'hidden', marginBottom: 12}}>
            <Pressable android_ripple={{color: '#88888888', foreground: true}}
                       style={{borderRadius: 12}}
                       onPress={() => navigation.navigate('Collection', {data: data})}>
                <HomeCard data={data}/>
            </Pressable>
        </View>
    )
}

/**
 * Display this component when no results are found
 * @param props
 */
const Empty = (props) => {
    return (
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32}}>
            <Text style={{fontSize: 16}}>
                No results found.
            </Text>
        </View>
    )
}

/**
 * The query and information about the home page of the app
 * @param navigation handled by react-navigation
 */
const Home = ({navigation}) => {
    const [wait, setWait] = useState(true);         // waiting for data
    const [refresh, setRefresh] = useState(false);  // same as waiting after init
    const [cols, setCols] = useState([]);           // collections
    const [data, setData] = useState([]);           // data shown in the list
    const [search, setSearch] = useState("");       // search query

    const Refresh = () => {setRefresh(true); setWait(true);}

    async function UpdateData() {
        if (wait) { // if waiting for data, get values from gql
            await waitFor(500);
            setCols(await GetCategories());
        }
        let temp = cols.filter(x=>x.name.toLowerCase().includes(search))
                       .map(x=><CompCard data={x} navigation={navigation}/>);
        if ("about".includes(search) && cols.length !== 0) temp.unshift(<About navigation={navigation}/>);
        if (temp.length === 0) temp.push(<Empty/>)
        setData(temp);
        setWait(false);
        setRefresh(false);
    }

    useEffect(() => {
        const Load = async () => { await UpdateData() }
        Load();
    }, [search, wait])

    return (
        <View>
            <FlatList style={{paddingLeft: 16, paddingRight: 16, height: '100%'}}
                data={[<Top/>,
                       <Search onChangeText={setSearch} placeholder="Search through our collections!"/>,
                       ...data]}
                refreshing={refresh} onRefresh={Refresh}
                renderItem={({item, index, separators}) => (
                    <View>
                        {item}
                    </View>
                )}/>
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

export default Home;
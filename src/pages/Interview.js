import React, {useEffect, useState} from 'react';
import {
    FlatList,
    ImageBackground,
    Pressable,
    View,
    ActivityIndicator,
    Image,
    Dimensions,
    useWindowDimensions, ScrollView, Linking
} from "react-native";
import {Card, Text} from 'react-native-paper';
import {Styles as s} from "../Styles";
import { createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Default from "../comps/Default";
import Search from "../comps/Search";
import {sendGraphQl} from "../Utils";
import Consts from "../Consts";
import RenderHTML, {defaultHTMLElementModels, HTMLContentModel} from "react-native-render-html";
import {Link} from "@react-navigation/native";

const InterviewPage = ({route, navigation}) => {
    const data = route.params.data
    const width = Dimensions.get('window').width;
    const bannerUri = data.featuredImage ? data.featuredImage.node.mediaItemUrl : null

    return (
        <ScrollView>
            <Image style={{ height: 240, width: width}}
                   source={bannerUri ? {uri: bannerUri} : require("../assets/placeholder4.jpg")}/>
            <View style={{padding: 16}}>
                <Text style={s.h2}>
                    {data.title}
                </Text>
                <Text style={s.body}>
                    Published on {data.date.substring(0,10)}
                </Text>
                <Pressable onPress={()=> Linking.openURL(data.link)}>
                    <Text style={{marginTop: 12, color: 'cyan'}} to="https://google.com">
                        Link to the original article!
                    </Text>
                </Pressable>
                <Text style={s.vmargin}>
                    Please note that audio playback is currently not available.
                </Text>
                <RenderHTML source={{html: data.content}}
                            contentWidth={width}/>
            </View>
        </ScrollView>
    )
}

export default InterviewPage
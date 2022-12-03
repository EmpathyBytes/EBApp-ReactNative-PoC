import React from "react";
import {TextInput, useColorScheme} from "react-native";
import {CStyles as cs} from "../Styles";

const style = {
    width: '100%',
    borderRadius: 12,
    paddingLeft: 12,
    marginBottom: 12,
    fontSize: 16,
}

const Search = (props) => {
    const dark = useColorScheme() === 'dark';
    return (
        <TextInput placeholder={props.placeholder} placeholderTextColor='#888888'
                   onChangeText={text => props.onChangeText(text.toLowerCase())}
                   style={{...style, backgroundColor: '#88888822', color: dark ? 'white': 'black'}}
        />
    )
}

export default Search;
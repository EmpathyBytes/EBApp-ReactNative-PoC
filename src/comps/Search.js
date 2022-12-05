import React from "react";
import {TextInput, useColorScheme} from "react-native";
import {CStyles as cs} from "../Styles";

// Searchbar style
const style = {
    width: '100%',
    borderRadius: 12,
    paddingLeft: 12,
    marginBottom: 12,
    fontSize: 16,
}

/**
 * Searchbar component
 * @param placeholder placeholder text to display when no text is present
 * @param onChangeText A method to call whenever the text in the searchbox is changed
 */
const Search = ({placeholder, onChangeText}) => {
    const dark = useColorScheme() === 'dark';
    return (
        <TextInput placeholder={placeholder} placeholderTextColor='#888888'
                   onChangeText={text => onChangeText(text.toLowerCase())}
                   style={{...style, backgroundColor: '#88888822', color: dark ? 'white': 'black'}}
        />
    )
}

export default Search;
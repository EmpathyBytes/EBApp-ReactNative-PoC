import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {
    adaptNavigationTheme,
    MD3DarkTheme,
    MD3LightTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import {useColorScheme} from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    light: NavigationDefaultTheme,
    dark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
        "primary": "rgb(13, 97, 164)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(210, 228, 255)",
        "onPrimaryContainer": "rgb(0, 28, 55)",
        "secondary": "rgb(83, 95, 112)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(215, 227, 248)",
        "onSecondaryContainer": "rgb(16, 28, 43)",
        "tertiary": "rgb(108, 87, 120)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(244, 218, 255)",
        "onTertiaryContainer": "rgb(37, 20, 49)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(253, 252, 255)",
        "onBackground": "rgb(26, 28, 30)",
        "surface": "rgb(253, 252, 255)",
        "onSurface": "rgb(26, 28, 30)",
        "surfaceVariant": "rgb(223, 226, 235)",
        "onSurfaceVariant": "rgb(67, 71, 78)",
        "outline": "rgb(115, 119, 127)",
        "outlineVariant": "rgb(195, 198, 207)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(47, 48, 51)",
        "inverseOnSurface": "rgb(241, 240, 244)",
        "inversePrimary": "rgb(160, 201, 255)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(241, 244, 250)",
            "level2": "rgb(234, 240, 248)",
            "level3": "rgb(227, 235, 245)",
            "level4": "rgb(224, 233, 244)",
            "level5": "rgb(219, 230, 242)"
        },
        "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
        "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
        "backdrop": "rgba(44, 49, 55, 0.4)"
    },
};

const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
        "primary": "rgb(160, 201, 255)",
        "onPrimary": "rgb(0, 50, 90)",
        "primaryContainer": "rgb(0, 73, 127)",
        "onPrimaryContainer": "rgb(210, 228, 255)",
        "secondary": "rgb(187, 199, 219)",
        "onSecondary": "rgb(37, 49, 65)",
        "secondaryContainer": "rgb(60, 72, 88)",
        "onSecondaryContainer": "rgb(215, 227, 248)",
        "tertiary": "rgb(215, 189, 228)",
        "onTertiary": "rgb(60, 41, 71)",
        "tertiaryContainer": "rgb(83, 63, 95)",
        "onTertiaryContainer": "rgb(244, 218, 255)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(26, 28, 30)",
        "onBackground": "rgb(227, 226, 230)",
        "surface": "rgb(26, 28, 30)",
        "onSurface": "rgb(227, 226, 230)",
        "surfaceVariant": "rgb(67, 71, 78)",
        "onSurfaceVariant": "rgb(195, 198, 207)",
        "outline": "rgb(141, 145, 153)",
        "outlineVariant": "rgb(67, 71, 78)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(227, 226, 230)",
        "inverseOnSurface": "rgb(47, 48, 51)",
        "inversePrimary": "rgb(13, 97, 164)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(33, 37, 41)",
            "level2": "rgb(37, 42, 48)",
            "level3": "rgb(41, 47, 55)",
            "level4": "rgb(42, 49, 57)",
            "level5": "rgb(45, 52, 62)"
        },
        "surfaceDisabled": "rgba(227, 226, 230, 0.12)",
        "onSurfaceDisabled": "rgba(227, 226, 230, 0.38)",
        "backdrop": "rgba(44, 49, 55, 0.4)"
    },
};

const Styles = {
    h1: {
        fontWeight: 'bold',
        fontSize: 44,
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    h3: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    body: {
        fontSize: 16,
    },
    vmargin: {
        marginTop: 12,
        marginBottom: 12,
    },
    hright: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    vcenter: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tac: {
        textAlign: 'center',
    }
}

export {Styles, CombinedDarkTheme, CombinedDefaultTheme}
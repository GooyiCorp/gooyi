import React from 'react'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons, SimpleLineIcons, Octicons, Foundation, Entypo, Feather, FontAwesome5, Fontisto, AntDesign } from '@expo/vector-icons';

// ---- Icon Library
export const icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome, 
    Ionicons, 
    SimpleLineIcons,
    Octicons,
    Foundation,
    Entypo,
    Feather,
    FontAwesome5,
    Fontisto,
    AntDesign,
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function Icons({
    icon,
    iconName,
    iconSize,
    iconColor,
    iconStyle,
}) {

    const Tag = icon;

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<>
    {icon && (<Tag name={iconName} size={iconSize} color={iconColor} style={iconStyle}/>)}
</>
)
}
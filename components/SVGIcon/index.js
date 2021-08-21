
import iconSources from "Images/svgIconSource";
import React from "react";
import { View } from "react-native";

const Icon = (props) =>{
    const {
        name,
        customStyles = {},
    } = props;

    const {
        viewBox,
        path,
    } = iconSources[name];

    return(
        <View>

        </View>
    )
}

export default Icon;
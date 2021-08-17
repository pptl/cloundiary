import { iconSources } from "Images/svgIconSource";
import React from "react";
import { Image } from "react-native";
import PropTypes from 'prop-types';

const defaultStyles = {
    height: 20,
    width: 20,
    tintColor:'#000',
}

const SvgIcon = (props) => {
    const {
        name,
        customStyles,
    } = props;

    return (
        <Image source={{uri: (iconSources[name] ? iconSources[name] : null )}} style={{...defaultStyles, ...customStyles}}/>
    )
}

SvgIcon.propTypes = {
    // @description icon名稱
    // @default null
    // @example name={'book'}  
    name: PropTypes.string.isRequired,
    // @description styles
    // @default {height:20 ,width:20, tintColor: #000 }
    // @example customStyles={{height:30 , backgroundColor: '#000'}}  
    customStyles: PropTypes.object,
}

export default SvgIcon;
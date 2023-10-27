import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'



export default function CloseSaveButton({
    handleSave,
    handleClose,
    edit,
}) {

    const [figure, setFigure] = useState(false)

    const figureVal = useSharedValue(0)

    const boxTransition = useAnimatedStyle(() => {
        return {
            width: interpolate(figureVal.value, [0,1], [38, 120]),
            backgroundColor: interpolateColor(figureVal.value, [0,1], [COLORS.grey, COLORS.primary])
        }
    })

    const labelTransition = useAnimatedStyle(() => {
        return {
            opacity: interpolate(figureVal.value, [0.5,1], [0,1])
        }
    })

    const iconTransition = useAnimatedStyle(() => {
        return {
            opacity: interpolate(figureVal.value, [0.5,1], [1,0])
        }
    })

    useEffect(() => {
        if (edit) {
            setFigure(true)
            figureVal.value = withTiming(1)
        } else {
            setFigure(false)
            figureVal.value = withTiming(0)
        }
    }, [edit])

  return (

    <>
    <TouchableOpacity onPress={figure? handleSave : handleClose}>
    <Animated.View style={[styles.box, boxTransition]}>

        {figure? 
        
        <Animated.Text style={[styles.title, labelTransition]}>Speichern</Animated.Text>

        :
        
        <Animated.View style={[iconTransition]}>

            <Icons 
                icon={icons.MaterialIcons}
                iconName={'close'}
                iconSize={28}
                iconColor={COLORS.white}
            />
            
        </Animated.View>

        }

    </Animated.View>
    </TouchableOpacity>

    {/* <Button  title='testButton' onPress={handleChangeFigure}/> */}
    </>
  )
}

const styles = StyleSheet.create({
    box: {
        height: 38,
        width: 38,
        backgroundColor: COLORS.grey,
        //alignSelf: 'center',
        borderRadius: 38/2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: COLORS.white,
    },
})
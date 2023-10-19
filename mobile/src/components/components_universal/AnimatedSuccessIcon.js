import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  interpolate,
  interpolateColor,
  withSpring,
  Easing} from "react-native-reanimated";
import RoundButton from "./RoundButton";
import { icons } from "./Icons";
import { COLORS } from "../../index/constantsindex";
import { moderateScale } from "../../helper/scale";


const successIconEdge = moderateScale(80, 0.2)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- Ring Component
const Ring = ({ 
    delay, 
    style,
}) => {

    // Animation -----------------------------------------------------------------------------------------------------------
    const ring = useSharedValue(0);

    const ringStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(ring.value, [0, 0.5, 1], [COLORS.white, COLORS.lightGreen, COLORS.green]),
            opacity: ring.value,
            transform: [{scale: interpolate(ring.value, [0, 0.9, 1], [1, 1.05, 1])}]
        };
    });

    useEffect(() => {
        ring.value = withDelay(delay, withTiming(1, {duration: 300, easing: Easing.bezier(0.09, 0.71, 0.71, 1.14)}) )
    }, []);

    // Return -----------------------------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ring, style ,ringStyle]} />
    )
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- Composition
export default function AnimatedSuccessIcon({
    styleContainer,
}) {

    // Animation -----------------------------------------------------------------------------------------------------------
    const check = useSharedValue(0)

    const checkStyle = useAnimatedStyle(() => {
        return{
            transform: [{scale: check.value}]
        }
    })

    useEffect(() => {
        check.value = withDelay(500, withSpring(1))
    }, [])

    // Return -----------------------------------------------------------------------------------------------------------
    return (
    <View style={[styles.checkContainer, styleContainer]} >
        
        {/* Check Icon ------------------------------------------------------- */}
        <Animated.View style={[styles.iconBox, checkStyle]}>
            <RoundButton 
                icon={icons.FontAwesome5} 
                iconName={'check'} 
                iconColor={COLORS.white} 
                iconSize={40} 
                style={{
                    backgroundColor: 'transparent'
                }}
            />
        </Animated.View>

        {/* Ring ------------------------------------------------------- */}
        <Ring delay={400} />
        <Ring delay={300} style={{height: 0.75*successIconEdge, width: 0.75*successIconEdge}} />
        <Ring delay={200} style={{height: 0.5*successIconEdge, width: 0.5*successIconEdge}} />
        <Ring delay={100} style={{height: 0.25*successIconEdge, width: 0.25*successIconEdge}} />

    </View>
    );
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
const styles = StyleSheet.create({

    checkContainer: {
        height: successIconEdge,
        width: successIconEdge,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
    },

    ring: {
        position: "absolute",
        width: successIconEdge,
        height: successIconEdge,
        borderRadius: successIconEdge/2,
    },

    iconBox: {
        height: successIconEdge,
        width: successIconEdge, 
        position: 'absolute', 
        zIndex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }

});
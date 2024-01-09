import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// React Navigation
import { useNavigationState } from '@react-navigation/native'
// Redux
import { setCurrentPosition, setSelected, setSupplement } from '../../redux/slices/locateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setHideLocateModal, setShowFilterModal } from '../../redux/slices/showModalSlice'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Helpers
import { moderateScale } from '../../helper/scale'
// Components
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import PositionFeed from '../../components/components_locate_screen/PositionFeed'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EnterPosition({
    navigation: {goBack}
}) {

// Redux
const dispatch = useDispatch()

// Input Data
const [data, setData] = useState('')

    // Get Route Name
    const routes = useNavigationState(state => state.routes)
    const prevRoute = routes[routes.length - 2];
    // console.log(prevRoute)

    // Test List
    const position = [
        {id: 1, street: 'Bahnhofsplatz 21', positionInfo: '22195 Hamburg, Deutschland'},
        {id: 2, street: 'Bismarkstraße 45', positionInfo: '22767 Bremen, Deutschland'}
    ] 

// ----------------------------  
// Handler Section
// ---------------------------- 
    // Handle Clear Button
    const handleClear = () => {
        setData('')
        Keyboard.dismiss()
    }
    // Handle Set Position
    const handleSetPosition = (position) => {
        // Set Input Data
        setData(position.street + ' - ' + position.positionInfo)
        
        dispatch(setSelected('add'))
        dispatch(setCurrentPosition(position.street))
        dispatch(setSupplement(position.positionInfo))
        // start - Thanh: set latitude / longtitude ----------------------------------------------



        // end - Thanh: set latitude / longtitude ------------------------------------------------
        goBack()
        // Check Previous Screen
        setTimeout(() => {
            dispatch(setHideLocateModal())
            if (prevRoute.name == 'Search' || prevRoute.name == 'ShowAllOffers' || prevRoute.name == 'ListByCategory') {
            dispatch(setShowFilterModal())
            }
        }, 100)
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.screen}>

    {/* ---- start - Header Section */}
    <View style={styles.container}>
        {/* Go Back Button  */}
        <RoundButton
            icon={icons.Ionicons}
            iconName={'md-chevron-back'}
            iconSize={moderateScale(28,0.2)}
            iconColor={COLORS.ivory}
            style={{
                backgroundColor: COLORS.grey,
                height: moderateScale(38,0.2),
                width: moderateScale(38,0.2),
                margin: 0,
                marginRight: 10
            }}
            onPressButton={() => goBack()}
        />

        {/* ---------------------------- */}
        {/* Input */}
        {/* ---------------------------- */}
        <View style={styles.inputContainer}>
            {/* ---- Input Setting */}
            <TextInput
                placeholder='Straße und Hausnummer?'
                placeholderTextColor={COLORS.grey}
                style={{
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 50,
                    fontFamily: 'RH-Regular',
                    fontSize: 15,
                }}
                returnKeyType='search'
                autoComplete='off'
                autoCorrect={false}
                keyboardAppearance='dark'


                value={data}
                // onFocus={() => setFocus(true)}
                // onBlur={() => setFocus(false)}
                onChangeText={(e) => setData(e)}
                // onSubmitEditing={() => handleSearch(data)}
            />

            {/* ---- start - Right View */}
            <View 
                style={[
                    styles.rightView,
                    {zIndex: data? 1 : 0}
                ]}
            >
                {/* Clear Button */}
                <RoundButton
                    icon={icons.Ionicons}
                    iconName={'close'}
                    iconSize={30}
                    iconColor={COLORS.subPrimary}
                    style={{
                        backgroundColor: 'transparent',
                        margin: 0,
                        marginRight: 5, 
                        opacity: data? 1 : 0, 
                        transform: [
                            {scaleX: data? 1 : 0}
                        ],
                    }}
                    // handle Clear
                    onPressButton={handleClear}
                />
            </View>
            {/* ---- end - Right View */}
        </View>

    </View>
    {/* ---- end - Header Section */}

    {/* ---- Content Section */}
    <View style={{marginBottom: 15, marginHorizontal: 30, zIndex: 2}}>

        {position.map((position) => (<PositionFeed 
            key={position.id}
            street={position.street} 
            positionInfo={position.positionInfo}
            onPress={() => handleSetPosition(position)}
        />))}

    </View>

    {/* ---- Background Section */}
    {/* Background Touch  */}
    <Pressable
        style={{
          height: height, 
          width: width, 
          position: 'absolute',
        }} 
        onPress={() => Keyboard.dismiss()} 
    >
    </Pressable>

</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
    },

    container: {
        width: width,
        height: 50,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        // position: 'absolute',
        marginTop: 55,
        marginBottom: 15,
        // opacity: 0.5
        zIndex: 2
    },

    inputContainer: {
        width: width-60-48,
        height: 46,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        justifyContent: 'center',
        // borderWidth: 0.5,
        // borderColor: COLORS.grey,
    },

    rightView: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        position: 'absolute',
        right: 0,
        zIndex: 2,
    },

})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalHeader from '../../../components/universal/Header/ModalHeader'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { T1, T2, T3, T4, T5 } from '../../../helper/constants/text'
import ClassBadge from '../../../components/universal/Badge/ClassBadge'

export default function MemberOverview({navigation: {goBack}}) {
  return (
    <View style={{
        height: height,
        width: width,
        backgroundColor: COLORS.white
    }}>
        <ModalHeader 
            title={'Teameinstellungen'}
            onPress={() => goBack()}
        />

        <View 
            style={{
                marginTop: 20,
                paddingHorizontal: 20
            }}
        >
            <View style={{paddingHorizontal: 5}}>
                <Text style={[T1, {fontFamily: 'RH-Bold'}]}>Ben Tserakowa</Text>
                <Text style={T2}>tserakowa.ben@gmail.com</Text>
            </View>

            <View style={{marginTop: 20}}>
                <Text style={[T5, {color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5, textTransform: 'uppercase'}]}>Zuordnung</Text>
                <ClassBadge type={'Admin'}/>
            </View>

            <View style={{marginTop: 20}}>
                <Text style={[T5, {color: COLORS.grey, paddingHorizontal: 5, marginBottom: 3, textTransform: 'uppercase'}]}>Beigetreten am</Text>
                <Text style={[T2, {paddingHorizontal: 5}]}>30.02.2024</Text>
            </View>

            <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View 
                    style={{
                        height: 40,
                        width: width/2-25,
                        borderWidth: 0.5,
                        borderColor: COLORS.grey,
                        borderRadius: 35, 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={T2}>Neu zuweisen</Text>
                </View>
                <View 
                    style={{
                        height: 40,
                        width: width/2-25,
                        borderWidth: 0.5,
                        borderColor: COLORS.grey,
                        borderRadius: 35, 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={T2}>Löschen</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})
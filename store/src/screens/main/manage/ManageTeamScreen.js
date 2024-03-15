import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedScreen } from '../../../redux/slices/manageScreenSlice'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import Icons, { icons } from '../../../components/universal/Icons/Icons'
import { ScrollView } from 'react-native-gesture-handler'
import SectionTitle from '../../../components/universal/Header/SectionTitle'
import TeamCard from '../../../components/components_Manage/TeamCard'
import ServicesButton from '../../../components/universal/Buttons/ServicesButton'

export default function ManageTeamScreen({navigation}) {
    const dispatch = useDispatch()

    // Listener Exit Screen
    // useEffect(() => {
    //     const exitScreen = navigation.addListener('blur', () => {
    //         dispatch(setSelectedScreen('Geschäft'))
    //     })
    //     return exitScreen
    // }, [navigation])

    const TeamList = [
        {name: 'Ben Tserakowa', email: 'tserakowa.ben@gmail.com', class: 'Admin'},
        {name: 'Sophia Isakowich', email: 'sophia98isak@gmx.com', class: 'Moderator'},
        {name: 'Cathrin', email: 'c.mosalia@icloud.com', class: 'Moderator'},
        {name: 'Hendrik Stark', email: 'hendrik.arbeit@gmail.com', class: 'Mitglied'},
    ]

  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>
        
        <View style={{marginTop: 120, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
            <View 
                style={{
                    height: 43, 
                    width: width-93, 
                    borderRadius: 23,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey
                }}
            >

            </View>

            <View 
                style={{
                    height: 43,
                    width: 43,
                    borderRadius: 23,
                    backgroundColor: COLORS.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Icons 
                    icon={icons.AntDesign}
                    iconName={'plus'}
                    iconSize={30}
                    iconColor={COLORS.white}
                />
            </View>
        </View>
        <ScrollView
            style={{
                paddingHorizontal: 20,
                paddingTop: 15
            }}
        >
            <View>            
                <SectionTitle 
                    title={'Übersicht'}
                    styleContainer={{
                        marginBottom: 10
                    }}
                />
                {TeamList.map((member) => (
                    <TeamCard 
                        key={member.name}
                        name={member.name}
                        email={member.email}
                        type={member.class}
                        onPress={() => navigation.navigate('MemberOverview')}
                    />
                ))}
            </View>

            <View 
                style={{
                    marginTop: 25,
                }}
            >
                <SectionTitle 
                    title={'Einstellungen'}
                />
                <ServicesButton 
                    title={'Zugriffrechte bearbeiten'}
                    icon={icons.Foundation}
                    iconName={'key'}
                    iconSize={21}
                />
            </View>

        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
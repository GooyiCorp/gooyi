import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCountdown } from '../../../hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';
import { COLORS } from '../../../index/constantsindex';


// ------------------------------------------------
// ShowCounter
// ------------------------------------------------
const ShowCounter = ({ days, hours, minutes, seconds, styleDigit, styleBox, styleSeparator }) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            
            {days > 0 && 
                <>
                    <DateTimeDisplay value={days} type={'d'}/>
                    <Text style={[styles.separator, styleSeparator]}>:</Text>
                </>
            }
            
            {hours > 0 && 
                <>
                    <DateTimeDisplay value={hours} type={'h'} />
                    <Text style={[styles.separator, styleSeparator]}>:</Text>
                </>
            }

            <DateTimeDisplay value={minutes} styleBox={styleBox} styleDigit={styleDigit}/>
                <Text style={[styles.separator, styleSeparator]}>:</Text>
            <DateTimeDisplay value={seconds} styleBox={styleBox} styleDigit={styleDigit}/>
        </View>
    )
}

// ------------------------------------------------
// CountdownTimer
// ------------------------------------------------
const CountdownTimer = ({ targetDate, styleBox, styleDigit, styleSeparator }) => {

    const [days, hours, minutes, seconds] = useCountdown(targetDate);
  
    if (days + hours + minutes + seconds <= 0) {
        console.log('Finish')
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                
                styleBox={styleBox}
                styleDigit={styleDigit}
                styleSeparator={styleSeparator}
            />
        );
    }

};

const styles = StyleSheet.create({ 
    separator: {
        fontFamily: 'RH-Black',
        fontSize: 16,
        marginHorizontal: 3,
        color: COLORS.grey
    }
})

export default CountdownTimer;
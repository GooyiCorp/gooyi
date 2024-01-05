import { View, Text } from 'react-native'
import React from 'react'

export default function OpeningHours({ hours }) {
    const formattedHours = [];
    for (const day in hours) {
        if (day !== "store_id") {
            const [startTime, endTime] = hours[day].split('-');
            const formattedText = `${day}: ${startTime} - ${endTime} Uhr`;
            formattedHours.push(<Text key={day}>{formattedText}</Text>);
        }
    }
    return (
        <View>
            {formattedHours.map((text, index) => (
                <Text key={index}>
                    {text}
                </Text>
            ))}
        </View>
    );
};

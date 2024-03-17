import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PointsTransactionCard from '../../../components/components_History/PointsTransactionCard'
import { T1, T2 } from '../../../helper/constants/text'

export default function PointsTransactionDayCard({
    header,
    date,
    totalPoints,
    transactionList,
}) {

    const Transaction = transactionList
    console.log(Transaction)
  return (
    <View>
        {header? 
            <View 
                style={{
                    flexDirection: 'row', 
                    width: '100%', 
                    justifyContent: 'space-between', 
                    paddingHorizontal: 10,
                    // borderBottomWidth: 0.5,
                    paddingTop: 30
                }}
            >
                <Text style={T2}>{date}</Text>
                <Text style={[T2, {marginRight: 3}]}>{totalPoints}</Text>
            </View>
            : null
        }

        {Transaction.map((transaction) => (
            <PointsTransactionCard 
                key={transaction.transactionID}
                name={transaction.name}
                transactionID={transaction.transactionID}
                points={transaction.points}
            />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({})
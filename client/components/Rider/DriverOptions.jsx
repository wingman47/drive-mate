import React from "react"
import { ScrollView , Text } from "react-native"
import tw from 'twrnc'

const DriverOptions = () =>{
    return(
        <ScrollView>
            <Text style={tw`text-center py-5 text-xl font-semibold text-stone-700`}>Coose Your Driver</Text>
            {/* idr redux se driver ke options ko utha ke unpe loop kar dunga aur prop pass kar dunga */}
            <DriverOptions/>
            <DriverOptions/>
            <DriverOptions/>
            <DriverOptions/>
            <DriverOptions/>
            <DriverOptions/>
            <DriverOptions/>
        </ScrollView>
    )
}

export default DriverOptions;
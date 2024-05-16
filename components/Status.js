import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import EnhancementColors from '../data/EnhancementColors';

/*
* Status - Component
* Purpose: Displays the final status information, calculated by a combination of Attributes and Equipment
* Parameters: N/A
* Returns: Rendered view of status information.
* Preconditions: N/A
*/
class Status extends Component{
    render(){
        return (
            <View style={[styles.statusRow, {flex: 1}]}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <CustomText size={15} value={`Physical: ${this.props.data.physical}`} color='grey'/>
                    {
                        this.props.data.enhancementType == 'Fire' || 
                        this.props.data.enhancementType == 'Lightning' || 
                        this.props.data.enhancementType == 'Magic' && 
                        <View>
                                <CustomText 
                                    size={15} 
                                    value={`${this.props.data.enhancementType}: ${this.props.data.enhancementDamage}`} 
                                    color={EnhancementColors[this.props.data.enhancementType]}
                                />
                        </View>
                    }
                    <CustomText size={15} value={`Total Damage: ${this.props.data.totalDamage}`} color='white'/>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <CustomText size={12} 
                        value={`Equip Load: ${this.props.data.currentEquipLoad} / ${this.props.data.totalEquipLoad}`} 
                        color={ (this.props.data.currentEquipLoad < this.props.data.totalEquipLoad) ? 'green' : 'red' }/>
                    <CustomText size={12} value='Bonus Effects: ' color='yellow'/>
                    {
                        this.props.data.talismanBonuses.map((description) => {
                            return <CustomText size={8} color='yellow' value={` - ${description}`}/>
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusRow: {
        flexDirection: 'row'
    }
});

export default Status;
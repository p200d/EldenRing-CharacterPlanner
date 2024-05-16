import React, { Component } from 'react';
import { View } from 'react-native';
import Attributes from './Attributes'
import Equipment from './Equipment'
import Status from './Status'
import Classes from '../data/Classes';

//Load game data files
import Weapons from '../data/Weapons1.json';
const WEAPON_DATA = JSON.parse(JSON.stringify(Weapons));
import Armor from '../data/Armor1.json';
const ARMOR_DATA = JSON.parse(JSON.stringify(Armor));
import Talismans from '../data/Talismans1.json';
const TALISMAN_DATA = JSON.parse(JSON.stringify(Talismans));

//Weapon scaling conversions used for calculations
const SCALING = {
    "A": 1.6,
    "B": 1.5,
    "C": 1.4,
    "D": 1.3,
    "E": 1.2,
}

/*
* CharacterPlanner - Main Class Module
* Purpose: Manages the overall state of the two main components (Attributes & Equipment) and calculates data for third, Status.
* Parameters: N/A
* Returns: Main render display with three primary components: Attributes, Equipment and Status
* Preconditions: Component must be placed in {flex: 1} container to display properly.
*/
class CharacterPlanner extends Component{
    state = {
        attributes: {
            Vigor: Classes['Astrologer'].Vigor,
            Endurance: Classes['Astrologer'].Endurance,
            Strength: Classes['Astrologer'].Strength,
            Dexterity: Classes['Astrologer'].Dexterity,
            Intelligence: Classes['Astrologer'].Intelligence,
            Faith: Classes['Astrologer'].Faith,
            Arcane: Classes['Astrologer'].Arcane
        },
        equipment: {
            weapon: null,
            enhancement: null,
            helm: null,
            chest: null,
            gauntlets: null,
            legs: null,
            talismans: []
        },
        data: {
            attributes: {},
            physical: 0,
            enhancementType: 'Standard',
            enhancementDamage: 0,
            totalDamage: 0,
            currentEquipLoad: 0,
            totalEquipLoad: 12,
            talismanBonuses: []
        }
    }

    //Callback functions. Used to retrieve data from corresponding children components, then update status.
    handleAttributeChange = (data) => { this.setState({ attributes: data }, () => this.calculateStatus())};
    handleEquipmentChange = (data) => { this.setState({ equipment: data }, () => this.calculateStatus())};

    /*
    * CalculateStatus
    * Purpose: Generate data object to update state data
    * Parameters: N/A
    * Preconditions: N/A
    * Returns: N/A
    * Side Effects: State data is updated
    */
    calculateStatus = () => {
        let newStatus = {};
        newStatus.attributes = this.state.attributes;
        if(this.state.equipment.weapon){ //A weapon is equipped, calculate damage
            newStatus.physical = this.calculatePhysical();
            newStatus.enhancementType = this.state.equipment.enhancement;
            newStatus.enhancementDamage = this.getEnhancementDamage();

            if( newStatus.enhancementType == 'Fire' || 
                newStatus.enhancementType == 'Lightning' ||
                newStatus.enhancementType == 'Magic' )
                { 
                    newStatus.totalDamage = newStatus.physical + newStatus.enhancementDamage 
                }
            else{ //Physical only weapon, just give physical damage
                newStatus.totalDamage = newStatus.physical;
            }
        }
        else{ //Weapon is not equipped
            newStatus.physical = 0;
            newStatus.enhancementDamage = 0;
            newStatus.totalDamage = 0;
        }
        newStatus.currentEquipLoad = this.calculateCurrentEquipLoad();
        newStatus.totalEquipLoad = Math.round(this.state.attributes.Endurance * 1.3);
        newStatus.talismanBonuses = this.getTalismanBonuses();
    
        this.setState({ data: newStatus });
    }

    //Retrieves JSON weapon damage data, if a weapon is equipped
    getPhysicalDamage = () => { 
        if(this.state.equipment.weapon)
            return WEAPON_DATA[this.state.equipment.weapon].enhancement[this.state.equipment.enhancement].damage.physical;
        else
            return
    };

    //Get attribute scaling JSON object
    getScaling = () => { 
        if(this.state.equipment.weapon)
            return WEAPON_DATA[this.state.equipment.weapon].enhancement[this.state.equipment.enhancement].scaling
        else
            return
    };

    //Retrieve JSON weapon damage information
    getDamage = () => { return WEAPON_DATA[this.state.equipment.weapon].enhancement[this.state.equipment.enhancement].damage }
    
    
    /*
    * CalculatePhysical
    * Purpose: Calculate and update the weapons bonus scaling damage.
    * Parameters: N/A
    * Preconditions: A weapon is equipped. [state.equip.weapon != null]
    * Returns: physical (Base weapon damage + scaling applied)
    * Side Effects: N/A
    */
    calculatePhysical = () => {
        let physical = this.getPhysicalDamage();
        let scaling = this.getScaling();

        for(let attribute in scaling){
            physical += this.state.attributes[attribute] * SCALING[scaling[attribute]]
        }

        return Math.round(physical);
    }

    /*
    * getEnhancementDamage
    * Purpose: Calculate and update the weapons bonus scaling damage.
    * Parameters: N/A
    * Preconditions: A weapon is equipped. [state.equip.weapon != null]
    * Returns: enhanceDamage (portion of damage from elemental enhancement)
    * Side Effects: N/A
    */
    getEnhancementDamage = () => {
        let enhanceType = this.state.equipment.enhancement;
        let enhanceDamage = this.getDamage();
        if(enhanceType == 'Fire' || enhanceType == 'Lightning' || enhanceType == 'Magic'){
            for(let damageType in enhanceDamage){
                if(damageType != 'physical')
                    enhanceDamage = enhanceDamage[damageType];
            }
        }

        return enhanceDamage;
    }

    //Sum all equipment weights, if equipped/
    calculateCurrentEquipLoad = () => {
        let equipLoad = 0;
        if(this.state.equipment.weapon) //Weapon is equipped
            equipLoad += WEAPON_DATA[this.state.equipment.weapon].weight;
        if(this.state.equipment.helm) //Helm is equipped
            equipLoad += ARMOR_DATA.Helm[this.state.equipment.helm].weight;
        if(this.state.equipment.chest) //Chest is equipped
            equipLoad += ARMOR_DATA.Chest[this.state.equipment.chest].weight;
        if(this.state.equipment.gauntlets) //Gauntlets are equipped
            equipLoad += ARMOR_DATA.Gauntlets[this.state.equipment.gauntlets].weight;
        if(this.state.equipment.legs) //Legs are equipped
            equipLoad += ARMOR_DATA.Legs[this.state.equipment.legs].weight;

        return Math.round(equipLoad);
    }

    /*
    * getTalismanBonuses
    * Purpose: Retrieve bonus descriptions from all talismans equipped and push to a new array.
    * Parameters: N/A
    * Preconditions: N/A
    * Returns: bonusArray
    * Side Effects: N/A
    */
    getTalismanBonuses = () => {
        let bonusArray = [];
        for(let i = 0; i < this.state.equipment.talismans.length; i++){
            if(this.state.equipment.talismans[i] != null){
                bonusArray.push(TALISMAN_DATA.Talisman[this.state.equipment.talismans[i]].description);
            }
        }
        return bonusArray;
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3 }}><Attributes update={this.handleAttributeChange}></Attributes></View>
                <View style={{ flex: 2 }}><Equipment update={this.handleEquipmentChange}/></View>
                <View style={{ flex: 1 }}><Status data={this.state.data}/></View>
            </View>
        );
    }
}

export default CharacterPlanner;
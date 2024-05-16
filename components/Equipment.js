import React, { Component } from 'react';
import { View, StyleSheet, Modal, Button, ScrollView } from 'react-native';
import EquipmentSlot from './EquipmentSlot';
import CustomText from './CustomText';
import COLORS from '../data/EnhancementColors';
import EnhancementButton from './EnhancementButton';
import ImageButton from './ImageButton';

//Load game data files
import Weapons from '../data/Weapons.json';
const WEAPON_DATA = JSON.parse(JSON.stringify(Weapons));
import Armor from '../data/Armor.json';
const ARMOR_DATA = JSON.parse(JSON.stringify(Armor));
import Talismans from '../data/Talismans.json';
const TALISMAN_DATA = JSON.parse(JSON.stringify(Talismans));

/*
* Equipment - Component
* Purpose: Provide user ability to equip weapons, different armor types, and talismans, affecting their overall stats.
* Parameters: N/A
* Returns: Renders EquipmentSlots for each type [Weapon, Helm, Chest, Gauntlets, Legs, Talisman x4]
* Preconditions: Component must be placed in {flex: 1} container to display properly.
*/
class Equipment extends Component {
    state = { 
        modalActive: false,
        modalType: 'Weapon', //Default modal type
        currentTalisman: 0, //Default 0, no talisman modal
        selectedWeapon: null,
        weaponEnhance: null,
        selectedHelm: null,
        selectedChest: null,
        selectedGauntlets: null,
        selectedLegs: null,
        selectedTalisman: []
    };

    /*
    * updateParent
    * Purpose: Determine if the final character in the calculator display is an operator.
    * Parameters: N/A
    * Preconditions: update callback prop is passed to Equipment
    * Returns: N/A
    * Side Effects: Parent is updated by callback.
    */
    updateParent = () => { 
        this.props.update({
            weapon: this.state.selectedWeapon,
            enhancement: this.state.weaponEnhance,
            helm: this.state.selectedHelm,
            chest: this.state.selectedChest,
            gauntlets: this.state.selectedGauntlets,
            legs: this.state.selectedLegs,
            talismans: this.state.selectedTalisman
        })
    };

    //Updates modalType and modalActive. Modal type determines which modal to display.
    openModal = (slotType) => { this.setState({ modalType: slotType, modalActive: true });};
    closeModal = () => this.setState({ modalActive: false });

    //Set modalType to talisman, then open modal.
    openTalismanModal = (talismanNumber) => {
        this.setState({ modalType: 'Talisman', currentTalisman: talismanNumber });
        this.openModal('Talisman');
    }

    //Updates talisman state, based on which talisman slot was pressed. Update state, close modal, notify parent.
    selectTalisman = (talismanName) => { 
        let newTalismanArray = this.state.selectedTalisman;
        newTalismanArray[this.state.currentTalisman] = talismanName;
        this.setState({ selectedTalisman: newTalismanArray }, () => { 
            this.closeModal();
            this.updateParent();
        });
    };

    //Updates weapon state, closes the modal, updates notify parent changes were made.
    selectWeapon = (weaponName, enhanceType) => { 
        this.setState({ selectedWeapon: weaponName, weaponEnhance: enhanceType }, () => { 
            this.closeModal();
            this.updateParent();
        });
    };

    //Simple switch, with helper functions to update equipment state
    selectArmor = (itemType, itemName) => {
        switch(itemType) {
            case 'Helm':
                this.selectHelm(itemName);
                break;
            case 'Chest':
                this.selectChest(itemName);
                break;
            case 'Gauntlets':
                this.selectGauntlets(itemName);
                break;
            case 'Legs':
                this.selectLegs(itemName);
                break;
        }
    }

    //Equips helmet, updating state and overall stats. Closes modal, notifies parent of update.
    selectHelm = (helmName) => { 
        this.setState({ selectedHelm: helmName }, () => { 
            this.closeModal();
            this.updateParent();
        });
    }
    //Equips chest, updating state and overall stats. Closes modal, notifies parent of update.
    selectChest = (chestName) => { 
        this.setState({ selectedChest: chestName }, () => { 
            this.closeModal();
            this.updateParent();
        });
    }
    //Equips gauntlets, updating state and overall stats. Closes modal, notifies parent of update.
    selectGauntlets = (gauntletsName) => { 
        this.setState({ selectedGauntlets: gauntletsName }, () => { 
            this.closeModal();
            this.updateParent();
        });
    }
    //Equips legs, updating state and overall stats. Closes modal, notifies parent of update.
    selectLegs = (legsName) => { 
        this.setState({ selectedLegs: legsName }, () => { 
            this.closeModal();
            this.updateParent();
        });
    }

    render() {
        return (
            <View style={styles.equipmentCol}>
                <View style={styles.equipmentRow}>
                    <EquipmentSlot slot='Weapon' onPress={() => {this.openModal('Weapon')}} equipped={this.state.selectedWeapon}/>
                    <EquipmentSlot slot='Helm' onPress={() => {this.openModal('Helm')}} equipped={this.state.selectedHelm}/>
                    <EquipmentSlot slot='Chest' onPress={() => {this.openModal('Chest')}} equipped={this.state.selectedChest}/>
                    <EquipmentSlot slot='Gauntlets' onPress={() => {this.openModal('Gauntlets')}} equipped={this.state.selectedGauntlets}/>
                    <EquipmentSlot slot='Legs' onPress={() => {this.openModal('Legs')}} equipped={this.state.selectedLegs}/>
                </View>
                <View style={styles.equipmentRow}>
                    <EquipmentSlot slot='Talisman' onPress={() => {this.openTalismanModal(1)}} equipped={this.state.selectedTalisman[1]}/>
                    <EquipmentSlot slot='Talisman' onPress={() => {this.openTalismanModal(2)}} equipped={this.state.selectedTalisman[2]}/>
                    <EquipmentSlot slot='Talisman' onPress={() => {this.openTalismanModal(3)}} equipped={this.state.selectedTalisman[3]}/>
                    <EquipmentSlot slot='Talisman' onPress={() => {this.openTalismanModal(4)}} equipped={this.state.selectedTalisman[4]}/>
                </View>

                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.modalActive}
                    onRequestClose={() => {this.setState({modalActive: false})}}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <View>
                                <View style={{alignSelf: 'center'}}><CustomText value={this.state.modalType} color='black' size={25}/></View>
                                <Button color='red' onPress={() => {this.closeModal()}} title="Close"></Button>
                            </View>
                            <View>
                            { this.state.modalType == 'Weapon' && 
                                //Equipment slot pressed was the weapon slot, display weapon modal
                                <View>
                                    {
                                        WEAPON_DATA.Weapon.map((item, key) => {
                                            return (
                                                <View style={styles.column}>
                                                    <CustomText value={WEAPON_DATA.Weapon[key].value} color='black' size={20}/>
                                                    <View style={[{justifyContent: 'space-evenly'}, styles.row]}>
                                                        {
                                                            WEAPON_DATA.Weapon[key].enhancement.map((enhanceItem, enhanceKey) => {
                                                                return (
                                                                    <View style={{flex: 1}}>
                                                                        <EnhancementButton
                                                                            onPress={
                                                                                () => this.selectWeapon(WEAPON_DATA.Weapon[key].value, 
                                                                                WEAPON_DATA.Weapon[key].enhancement[enhanceKey].type)
                                                                            }
                                                                            value={WEAPON_DATA.Weapon[key].enhancement[enhanceKey].type}
                                                                            color={COLORS[WEAPON_DATA.Weapon[key].enhancement[enhanceKey].type]}
                                                                        />
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                            {  
                                (this.state.modalType != 'Weapon' && this.state.modalType != 'Talisman') &&
                                //Equipment slot pressed was any armor slot, display that type of armor modal
                                <View>
                                    {
                                        ARMOR_DATA[this.state.modalType].map((item, key) => {
                                            return(
                                                <View style={styles.col}>
                                                    <ImageButton 
                                                        onPress={() => this.selectArmor(
                                                            this.state.modalType,
                                                            ARMOR_DATA[this.state.modalType][key].value
                                                        )}
                                                        itemType={this.state.modalType}
                                                        itemName={ARMOR_DATA[this.state.modalType][key].value}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                            {   
                                this.state.modalType == 'Talisman' && 
                                //Equipment slot pressed was a talisman, display talisman modal
                                <View>
                                    {
                                        TALISMAN_DATA.Talisman.map((item, key) => {
                                            return(
                                                <View style={styles.col}>
                                                    <ImageButton 
                                                        onPress={() => this.selectTalisman(TALISMAN_DATA[this.state.modalType][key].value)}
                                                        itemType={this.state.modalType}
                                                        itemName={TALISMAN_DATA[this.state.modalType][key].value}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
    },
    equipmentCol: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2
    },
    equipmentRow: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
    },
    modalContainer: {
        flex: 1,
        padding: '3%',
        backgroundColor: 'white'
    },
});

export default Equipment;
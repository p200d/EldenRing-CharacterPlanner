import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import AttributeButton from './AttributeButton';
import Classes from '../data/Classes';
import CustomText from './CustomText';
import ClassPicker from './ClassPicker';

/*
* Attributes - Component
* Purpose: Provide user ability to choose class, view level, and add or remove attributes (and consequently levels)
* Parameters: N/A
* Returns: Rendered view of class and attributes.
* Preconditions: N/A
*/
class Attributes extends Component {
    state = {
        class: 'Astrologer', //Default class chosen
        Level: Classes['Astrologer'].Level,
        attributes: {
            Vigor: Classes['Astrologer'].Vigor,
            Mind: Classes['Astrologer'].Mind,
            Endurance: Classes['Astrologer'].Endurance,
            Strength: Classes['Astrologer'].Strength,
            Dexterity: Classes['Astrologer'].Dexterity,
            Intelligence: Classes['Astrologer'].Intelligence,
            Faith: Classes['Astrologer'].Faith,
            Arcane: Classes['Astrologer'].Arcane,
        }
    }

    updateParent = () => { this.props.update(this.state.attributes) };

    /*
    * changeClass
    * Purpose: Handles state swap when using game class Picker
    * Parameters: className
    * Preconditions: N/A
    * Returns: N/A
    * Side Effects: State is updated, parent is notified.
    */
    changeClass = (className) => { 
        this.setState({
            class: className,
            Level: Classes[className].Level,
            attributes: {
                Vigor: Classes[className].Vigor,
                Mind: Classes[className].Mind,
                Endurance: Classes[className].Endurance,
                Strength: Classes[className].Strength,
                Dexterity: Classes[className].Dexterity,
                Intelligence: Classes[className].Intelligence,
                Faith: Classes[className].Faith,
                Arcane: Classes[className].Arcane,
            }
        }, () => this.updateParent())
    };

    incrementAttribute = (attribute) => { //Increases attribute passed, level is increased
        let newAttributes = this.state.attributes;
        newAttributes[attribute] = newAttributes[attribute] + 1;
        this.setState({ attributes: newAttributes });
        this.incrementLevel();
        this.updateParent();
    };
    decrementAttribute = (attribute) => { //Decreases attribute passed, level is decreased (if possible)
        if(Classes[this.state.class][attribute] < this.state.attributes[attribute]){ //Prevent decrement below classes base stats
            let newAttributes = this.state.attributes;
            newAttributes[attribute] = newAttributes[attribute] - 1;
            this.setState({ attributes: newAttributes });
            this.decrementLevel();
            this.updateParent();
        }
    };

    //incrementLevel and decrementLevel are helper funtions that must be called when increasing/decreasing attributes.
    incrementLevel = () => { this.setState({ Level: this.state.Level + 1 }) };
    decrementLevel = () => { this.setState({ Level: this.state.Level - 1 }) };


    render() {
        return (
            <View style={[{flex: 1, paddingTop: '20%'}, styles.column]}>
                <View style={[{flex: 1}, styles.classContainer, styles.row]}>
                    <View style={[{flex: 1, justifyContent:'space-evenly', alignItems: 'center'}, styles.row]}>
                        <CustomText color='yellow' value='Class: '/>
                        <ClassPicker onValueChange={(value) => {this.changeClass(value)}}/>
                    </View>
                    <View style={[{flex: 1, justifyContent:'space-evenly', alignItems: 'center'}, styles.row]}>
                        <CustomText color='yellow' value='Level Requirement: '/>
                        <CustomText color='white' value={this.state.Level}/>
                    </View>
                </View>
                <View style={[{flex: 8}, styles.row]}>
                    <View style={[styles.column, {flex: 1}]}>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Vigor'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Vigor')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Vigor}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Vigor')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Endurance'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                            <View style={{flex: 1, padding: '10%'}}>
                                                <AttributeButton value="-" onPress={() => {this.decrementAttribute('Endurance')}}/>
                                            </View>
                                            <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                                <CustomText color='white' value={this.state.attributes.Endurance}/>
                                            </View>
                                            <View style={{flex: 1, padding: '10%'}}>
                                                <AttributeButton value="+" onPress={() => {this.incrementAttribute('Endurance')}}/>
                                            </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Strength'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Strength')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Strength}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Strength')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Dexterity'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Dexterity')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Dexterity}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Dexterity')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.column, {flex: 1}]}>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Intelligence'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Intelligence')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Intelligence}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Intelligence')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Mind'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Mind')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Mind}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Mind')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Faith'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Faith')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Faith}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Faith')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{flex: 1}, styles.row]}>
                            <View style={{flex: 5, alignSelf: 'center', alignItems: 'center'}}>
                                <CustomText color='white' value='Arcane'/>
                            </View>
                            <View style={{flex: 6}}>
                                <View style={{flex: 4}}>
                                    <View style={[{flex: 1}, styles.row]}>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="-" onPress={() => {this.decrementAttribute('Arcane')}}/>
                                        </View>
                                        <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                            <CustomText color='white' value={this.state.attributes.Arcane}/>
                                        </View>
                                        <View style={{flex: 1, padding: '10%'}}>
                                            <AttributeButton value="+" onPress={() => {this.incrementAttribute('Arcane')}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: { 
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    classContainer: { 
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default Attributes;
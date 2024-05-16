import React, { useState } from "react";
import { Picker } from 'react-native';
import Classes from '../data/Classes';

/*
* ClassPicker - Component
* Purpose: Provide dropdown menu with all game character classes available.
* Parameters: onValueChange, props
* Returns: Render view of dropdown menu.
* Preconditions: Must be placed in a { flex: 1 } view to display correctly
*/
const ClassPicker = ({onValueChange}, props) => {
    const [selected, setSelected] = useState("Astrologer");
    return (
        <Picker
            selectedValue={selected}
            onValueChange={onValueChange}
            style={{color: 'white', flex: 1}}
            mode='dropdown'
        >
            {
                Object.entries(Classes).map(([key]) => {
                    return <Picker.Item label={key} key={key} value={key}/>
                })
            }

        </Picker>
    );
}

export default ClassPicker;
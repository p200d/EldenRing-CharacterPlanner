import { View, Text, TouchableHighlight, ImageBackground } from 'react-native';
import ImagePaths from '../data/ImagePaths'

/*
* EquipmentSlot - Component
* Purpose: Provide a button with a background image. Text for the equipped item (if one exists) is displayed in the view.
* Parameters: onPress, slot, equipped
* Returns: Render view of custom ImageBackground TouchableHighlight
* Preconditions: Must be placed in a { flex: 1 } view to display correctly
*/
const EquipmentSlot = ({onPress, slot, equipped}) => {
    return (
        <TouchableHighlight 
            onPress={onPress}
            style={{ flex: 1, padding: 1, borderWidth: 1, borderColor: '#757575' }}
        >
            <View style={{ flex: 1 }}>
                <ImageBackground
                    style={{ flex:1 , height: undefined, width: undefined }}
                    source={equipped ? ImagePaths[slot][equipped] : ImagePaths.ui[slot]}
                    resizeMode='stretch'
                >
                <Text style={{ alignSelf: 'center', color: 'white' }}>{equipped}</Text>
                </ImageBackground>
            </View>
        </TouchableHighlight>
    )
}

export default EquipmentSlot;
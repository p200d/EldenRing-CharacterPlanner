import { View, Text, TouchableHighlight, ImageBackground } from 'react-native';
import ImagePaths from '../data/ImagePaths'

/*
* ImageButton - Component
* Purpose: Create a button that can be used to display armor/talismans with its corresponding image and name 
* Parameters: onPress, itemType, itemName
* Returns: Touchable row that displays the items image and name.
* Preconditions: N/A
*/
const ImageButton = ({onPress, itemType, itemName}) => {
    return (
        <TouchableHighlight 
            onPress={onPress}
            style={{ flex: 1, padding: 1, borderWidth: 1}}
            underlayColor='grey'
        >
            <View style={{ padding: 5, flexDirection: 'row', flex: 1 }}>
                <ImageBackground
                    style={{ flex: 1 , alignSelf: 'flex-start', height: '100%', width: '100%' }}
                    source={ImagePaths[itemType][itemName]}
                    resizeMode='contain'
                >
                <Text style={{ alignSelf: 'flex-end', color: 'black' }}>{itemName}</Text>
                </ImageBackground>
            </View>
        </TouchableHighlight>
    )
}

export default ImageButton;
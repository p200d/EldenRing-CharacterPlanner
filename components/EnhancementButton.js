import { View, Pressable, Text, StyleSheet } from 'react-native';

//Assign type names to shortened version for button text
const SHORTENED_TYPE = {
    Standard: 'STD',
    Heavy: 'HVY',
    Keen: 'KEEN',
    Quality: 'QLTY',
    Fire: 'FIRE',
    Lightning: 'LGTN',
    Magic: 'MAGIC',
}

/*
* EnhancementButton - Component
* Purpose: Create button for weapon enhancement.
* Parameters: onPress, value, color
* Returns: Custom Pressable view, defined by value and color
* Preconditions: N/A
*/
const EnhancementButton = ({ onPress, value, color }) => {
    return (
        <View style={{flex: 1}}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [{ backgroundColor: pressed ? '#a4a4a4' : color }, styles.button]}
            >
                <Text style={styles.buttonText}>{SHORTENED_TYPE[value]}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 12
    }
});

export default EnhancementButton;
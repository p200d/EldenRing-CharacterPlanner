import { View, Pressable, Text, StyleSheet } from 'react-native';

/*
* AttributeButton - Component
* Purpose: Provide a custom button with suitable text and colors for attributes.
* Parameters: onPress, value
* Returns: Render view of custom Pressable.
* Preconditions: Must be placed in a { flex: 1 } view to display correctly
*/
const AttributeButton = ({ onPress, value }) => {
    return (
        <View style={{flex: 1}}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [{backgroundColor: pressed ? '#4CC2FF' : '#3B3B3B'}, styles.button]}
            >
                <Text style={styles.buttonText}>{value}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});

export default AttributeButton;
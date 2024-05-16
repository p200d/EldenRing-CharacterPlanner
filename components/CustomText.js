import { View, Text, StyleSheet } from 'react-native';


/*
* CustomText - Component
* Purpose: Provide custom text. 
* Parameters: color, size
* Returns: Render view of custom text.
* Preconditions: N/A
*/
const CustomText = (props) => {
    let size;

    //Default font size 10, unless prop size provided
    props.size == undefined ? size = 15 : size = props.size

    return (
        <Text style={[{color: props.color, fontSize: size}, styles.fontStyle]}>
            {props.value}
        </Text>
    )
}

const styles = StyleSheet.create({
    fontStyle: {
        textShadowColor: 'yellow',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3
    }
});

export default CustomText;
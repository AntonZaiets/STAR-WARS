import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'CustomFont-Regular',
        flexWrap: 'wrap',
        textAlign: 'left',
        maxWidth: 200,
        marginLeft: 10,
        color: 'yellow',
    },
    image: {
        width: 150,
        height: 150,
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#FFF33F',
        padding: 10,
        width: '100%',
    },
    info: {
        borderWidth: 2,
        borderColor: '#FFF33F',
        width: 350,
        marginVertical: 10,
        color: 'white',
        fontFamily: 'CustomFont-Regular-Fill',
        fontSize: 20,
    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '45%',
        bottom: 0,
        transform: [{ translateX: -150 }],
    },
});

export default styles;
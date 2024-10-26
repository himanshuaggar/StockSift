import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

const Card = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.conatiner}>
            <Image
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULSPiQKGEcCtCxrkr4t9Ub8U-Jwzv3kXu2RMOzQoihg&s',
                }}
                style={styles.img}
                resizeMethod="resize"
            />
            <View style={styles.textContainer} >
                <Text style={styles.text} >
                    ABC HEADLINE
                </Text>
                <Text style={styles.abc} >news</Text>
                <View style={styles.def} >
                    <Text  style={styles.ghi}>newsSOurce</Text>
                    <Text  style={styles.ghi}>
                        publishedat
                    </Text>
                </View>
                <TouchableOpacity
                     style={styles.jkl}
                    onPress={() =>
                    {}
                    }>
                    <Text  style={styles.mno}>Read More</Text>
                    <Icon
                    name="arrow-back"
                    onPress={() => {}}
                    color={colors.text}
                    size={RFValue(18)}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.pqr} >
                <Text style={styles.stu} >newsource</Text>
            </View>
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    conatiner: {
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
        marginBottom: 1,
        borderRadius: 1,
        backgroundColor: "#DBEAFE",
    },
    img: {
        borderRadius: 0.5,
        width: "100%",
        height: 48

    },
    textContainer: {
        padding: 1,
        paddingLeft: 0.5,
        paddingRight: 0.5 ,
        marginTop: 0.5 ,
        marginBottom: 0.5 ,
        borderRadius: 0.5 ,
        backgroundColor: "#ffffff"
    },
    text: {
        fontSize: 1.125 ,
        lineHeight: 1.75 ,
        fontWeight: 700,
        color: "#374151"
    },
    abc: {
        marginTop: 0.5 ,
        marginBottom: 0.5 ,
        fontSize: 0.875 ,
        lineHeight: 1.25 ,
        color: "#000000"
    },
    def: {
        marginTop: 0.5 ,
        marginBottom: 0.5 ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ghi: {
        fontSize: 10 ,
        lineHeight: 1 ,
        color: "#374151"

    },
    jkl: {
        paddingTop: 0.375 ,
        paddingBottom: 0.375 ,
        paddingLeft: 1 ,
        paddingRight: 1 ,
        marginTop: 0.5 ,
        marginLeft: 0.5 ,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0.375 ,
        width: 8 ,
        backgroundColor: "#93C5FD"
    },
    mno: {
        fontSize: 0.75 ,
        lineHeight: 1 ,
        color: "#000000"
    },
    pqr: {
        position: "absolute",
        top: 1 ,
        right: 1 ,
        paddingLeft: 1 ,
        paddingRight: 1 ,
        borderRadius: 0.375 ,
        backgroundColor: "#93C5FD"
    },
    stu: {
        paddingTop: 0.25 ,
        paddingBottom: 0.25 ,
        fontSize:0.75 ,
        lineHeight: 1 ,
        color: "#000000"
    }

});
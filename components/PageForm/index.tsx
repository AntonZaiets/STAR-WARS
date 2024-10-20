import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import { useTheme } from "@/components/Context/Context";
import styles from './indexStyles'

interface Props {
    content: React.ReactNode; // Use React.ReactNode for better type safety
}


const PageForm: React.FC<Props> = ({ content }) => {
    const { theme } = useTheme();

    const shadowOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shadowOpacity, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,  // Ensure native driver is used for animations
                }),
                Animated.timing(shadowOpacity, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,  // Ensure native driver is used for animations
                }),
            ])
        ).start();
    }, [shadowOpacity]);

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? 'black' : 'black' }]}>
            <Animated.View
                style={[styles.fullScreenShadow, { opacity: shadowOpacity }]}
                pointerEvents="none"
            >
                <InsetShadow
                    containerStyle={styles.fullScreenShadow}
                    shadowRadius={35}
                    shadowOpacity={1}
                    shadowColor={theme === 'light' ? 'blue' : 'red'}
                    shadowOffset={{ width: 0, height: 0 }}
                />
            </Animated.View>
            <View>
                {content}
            </View>
        </View>
    );
};


export default PageForm;

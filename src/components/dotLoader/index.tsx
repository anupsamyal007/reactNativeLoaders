import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type TDotLoader = {
    size?: number;
    color?: string;
};
const DotLoader: React.FC = ({
    color = 'rgb(5, 114, 206)',
    size = 10,
}: TDotLoader) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animation]);

    const dotStyle = (index: number) => ({
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: index % 2 === 0 ? [1, 0.3] : [0.3, 1],
        }),
    });

    return (
        <View style={styles.container}>
            {[...Array(3).keys()].map((index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        dotStyle(index),
                        {
                            backgroundColor: color,
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

export default DotLoader;
const styles = StyleSheet.create({
    container: {
        gap: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {},
});

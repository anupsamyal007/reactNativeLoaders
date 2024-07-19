import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type TShrinkDotLoader = {
    size?: number;
    color?: string;
};

const ShrinkDotLoader: React.FC = ({
    color = 'rgb(5, 114, 206)',
    size = 10,
}: TShrinkDotLoader) => {
    const animations = useRef<Animated.Value[]>([
        new Animated.Value(0),
        new Animated.Value(1),
        new Animated.Value(2),
        new Animated.Value(3),
        new Animated.Value(4),
    ]).current;

    useEffect(() => {
        const animateDot = (animation: Animated.Value) => {
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
            ]).start(() => animateDot(animation));
        };

        animations.forEach((animation, index) => {
            setTimeout(() => animateDot(animation), index * 150);
        });
    }, [animations]);

    return (
        <View style={styles.container}>
            {animations.map((animation, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            transform: [
                                {
                                    scale: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.5, 1],
                                    }),
                                },
                            ],
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

export default ShrinkDotLoader;
const styles = StyleSheet.create({
    container: {
        gap: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {},
});

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type TProps = {
    height?: number;
    width?: number;
};

const PulseLoader: React.FC<TProps> = ({ height = 100, width = 100 }) => {
    const ball1Scale = useRef(new Animated.Value(0)).current;
    const ball2Scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createPulseAnimation = (animation: Animated.Value) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        createPulseAnimation(ball1Scale);
        setTimeout(() => createPulseAnimation(ball2Scale), 1000); // Delayed start for ball2
    }, [ball1Scale, ball2Scale]);

    return (
        <View style={styles.container}>
            <View style={[styles.wrapper, { height, width }]}>
                <View style={styles.loader}>
                    <Animated.View
                        style={[
                            styles.ball,
                            { transform: [{ scale: ball1Scale }] },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.ball,
                            { transform: [{ scale: ball2Scale }] },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

export default PulseLoader;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        position: 'relative',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    ball: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '50%',
        height: '50%',
        borderRadius: 50,
        opacity: 0.4,
        backgroundColor: 'rgb(5, 114, 206)',
    },
});

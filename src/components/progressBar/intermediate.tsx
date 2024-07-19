import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

type IndeterminateProgressBarProps = {
    height?: number;
    backgroundColor?: string;
    progressColor?: string;
};

const IndeterminateProgressBar: React.FC<IndeterminateProgressBarProps> = ({
    height = 6,
    backgroundColor = 'rgba(5, 114, 206, 0.2)',
    progressColor = 'rgb(5, 114, 206)',
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        ).start();
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width], // Adjust according to the width you want the animation to cover
    });

    const scaleX = animatedValue.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0, 0.4, 0.5],
    });

    return (
        <View
            style={[styles.container, { height, backgroundColor }]}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
            <Animated.View
                style={[
                    styles.progressBar,
                    {
                        backgroundColor: progressColor,
                        transform: [{ translateX }, { scaleX }],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 5,
    },
    progressBar: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 5,
    },
});

export default IndeterminateProgressBar;

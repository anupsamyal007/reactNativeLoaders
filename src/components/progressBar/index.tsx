import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type ProgressBarProps = {
    progress: number; // Value between 0 and 1
    height?: number;
    backgroundColor?: string;
    progressColor?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    height = 6,
    backgroundColor = 'rgba(5, 114, 206, 0.2)',
    progressColor = 'rgb(5, 114, 206)',
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    }, [progress, animatedValue]);

    const widthInterpolated = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={[styles.container, { height, backgroundColor }]}>
            <Animated.View
                style={[
                    styles.progressBar,
                    {
                        backgroundColor: progressColor,
                        width: widthInterpolated,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
    },
});

export default ProgressBar;

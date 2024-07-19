import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CircularLoaderProps = {
    size?: number;
    strokeWidth?: number;
    color?: string;
    percentage?: number;
};

const CircularLoader: React.FC<CircularLoaderProps> = ({
    size = 100,
    strokeWidth = 6,
    color = 'rgb(5, 114, 206)',
    percentage = 0,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: percentage * 100,
            duration: 2000,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start();
    }, [percentage]);

    const radius = size / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <View style={styles.loader}>
                <View>
                    <Svg width={size} height={size}>
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeOpacity={0.2}
                        />
                        <AnimatedCircle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </Svg>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.percentageText}>
                        {Number(percentage * 100).toFixed(0)}%
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    loader: {
        position: 'relative',
    },
    textWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CircularLoader;

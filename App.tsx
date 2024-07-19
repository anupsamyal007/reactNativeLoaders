/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import DotLoader from './src/components/dotLoader';
import ShrinkDotLoader from './src/components/shrinkDotLoader';
import BounceDotLoader from './src/components/bounceDotLoader';
import PulseLoader from './src/components/pulseLoader';
import SkeletonLoader from './src/components/skeletonLoader';
import SkeletonLeftToRightLoader from './src/components/skeletonLoader/leftToRight';
import LinearProgressBar from './src/components/progressBar';
import IntermediateProgressBar from './src/components/progressBar/intermediate';
import CircularLoader from './src/components/progressBar/circular';

const App = (): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'light';

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 1 ? 0 : prev + 0.1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const backgroundStyle = {
        flex: 1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.block}>
                    <Text style={styles.title}>Dot Loader: </Text>
                    <DotLoader />
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Shrink Dot Loader: </Text>
                    <ShrinkDotLoader />
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Bounce Dot Loader: </Text>
                    <BounceDotLoader />
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Pulse Loader: </Text>
                    <PulseLoader />
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Skeleton Loader: </Text>
                    <View
                        style={StyleSheet.flatten([
                            styles.block,
                            { paddingVertical: 8 },
                        ])}
                    >
                        <Text style={styles.title}>Both Side Animation: </Text>
                        <SkeletonLoader width={200} height={20} />
                    </View>
                    <View
                        style={StyleSheet.flatten([
                            styles.block,
                            { paddingVertical: 8 },
                        ])}
                    >
                        <Text style={styles.title}>
                            Left To Right Animation:
                        </Text>
                        <SkeletonLeftToRightLoader width={200} height={20} />
                    </View>
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Progress Bar: </Text>
                    <View
                        style={StyleSheet.flatten([
                            styles.block,
                            { paddingVertical: 8 },
                        ])}
                    >
                        <Text style={styles.title}>Linear: </Text>
                        <LinearProgressBar progress={progress} />
                    </View>
                    <View
                        style={StyleSheet.flatten([
                            styles.block,
                            { paddingVertical: 8 },
                        ])}
                    >
                        <Text style={styles.title}>Intermediate:</Text>
                        <IntermediateProgressBar />
                    </View>
                    <View
                        style={StyleSheet.flatten([
                            styles.block,
                            { paddingVertical: 8 },
                        ])}
                    >
                        <Text style={styles.title}>Circular:</Text>
                        <CircularLoader percentage={progress} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 16,
        backgroundColor: '#fff',
    },
    block: {
        padding: 16,
        gap: 8,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
});

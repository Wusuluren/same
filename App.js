/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Button, ActivityIndicator, SectionList, Platform, StyleSheet, Image, Text, View} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import MineScreen from "./src/mine"
import HallScreen from "./src/hall"
import ChannelScreen from "./src/channel"

class MsgScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Mine')}
                />
            </View>
        );
    }
}

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//         <SameApp/>
//     );
//   }
// }

// const AppNavigator = createStackNavigator(
//     {
//         Home: HomeScreen,
//         Mine: SameApp,
//     },
//     {
//         initialRouteName: "Home"
//     }
// );

const TabNavigator = createBottomTabNavigator({
    Hall: HallScreen,
    Channel: ChannelScreen,
    Msg: MsgScreen,
    Mine: MineScreen,
});

export default createAppContainer(TabNavigator);

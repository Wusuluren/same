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
import RecommendScreen from "./src/recommend"
import ChannelScreen from "./src/channel"
import {ImgDetailScreen, ImageButton} from "./src/utils";
import NavigationService from "./src/NavigationService";
import {ChannelDetailScreen, UserChannelSensesScreen} from "./src/channelDetail";

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

// class TestSubScreen extends Component {
//     render() {
//         return (
//             <View>
//                 {/*<TouchableOpacity onPress={()=>{ImgNavigator.navigate('ImgDetail', {urls:[{url:this.props.data.photo}]})}}>*/}
//                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ImgDetail')}}>
//                     <Image source={{uri:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=609253297,1629028064&fm=58&bpow=1024&bpoh=768'}} style={{height:300,resizeMode:'cover'}}/>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
//
// class TestScreen extends Component {
//     render() {
//         return (
//             <ImageButton imgUrl='https://pic1.zhimg.com/16ff989bb_l.jpg' jumpUrl='ChannelDetail'/>
//         );
//     }
// }

const TabNavigator = createBottomTabNavigator({
    // 'test': TestScreen,
    '推荐': RecommendScreen,
    '关注': ChannelScreen,
    '消息': MsgScreen,
    '我的': MineScreen,
});

const StackNavigation = createStackNavigator({
        'App': {
            screen:TabNavigator,
            navigationOptions: ()=>({
                header: null,
                // headerMode:'none',
                // headerBackTitle: null,
                // headerTransparent: true,
            })
        },
        'ImgDetail': ImgDetailScreen,
        'ChannelDetail': ChannelDetailScreen,
        'UserChannelSenses': UserChannelSensesScreen,
    })

const AppContainer = createAppContainer(StackNavigation);

export default class App extends React.Component {
    render() {
        return (
            <AppContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}


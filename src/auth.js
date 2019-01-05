/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, TouchableOpacity, Button, ActivityIndicator, SectionList, Platform, Stylesheet, Image, Text, View} from 'react-native';
import SameApi from "./api";
import {SenseCate, Styles} from "./common"
import NavigationService from "./NavigationService";

export default class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
        const isLogin = await SameApi.isLogin();

        // SameApi.logout()

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        NavigationService.navigate(isLogin ? 'App' : 'LoginScreen');
    };

    render(): React.ReactNode {
        return (
            <View style={Styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

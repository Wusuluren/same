/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    TouchableOpacity,
    Button,
    ActivityIndicator,
    SectionList,
    Platform,
    Stylesheet,
    Image,
    Text,
    View,
    TextInput
} from 'react-native';
import SameApi from "./api";
import {SenseCate, Styles, TextButton} from "./common"
import NavigationService from "./NavigationService";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            showPassword: false,
        }
        this.onMobileChange = this.onMobileChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onMobileChange(text) {
        this.state.mobile = text
        if (this.state.mobile.length > 0) {
            this.setState({showPassword:true})
        } else {
            this.setState({showPassword:false})
        }
    }
    onPasswordChange(text) {
        this.state.password = text
    }
    onSubmit() {
        if (this.state.mobile.length < 0) {
            return
        }
        if (this.state.password.length < 0) {
            return
        }
        SameApi.login(this.state.mobile, this.state.password, this.onLogin, function () {})
    }
    onLogin(responseData) {
        if (SameApi.isLogin())
            NavigationService.navigate('App')
    }
    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        if (!this.state.showPassword) {
            return (
                <View style={style}>
                    <Text>+86</Text>
                    <TextInput placeholder="输入手机号码" onChangeText={this.onMobileChange}/>
                </View>
            );
        }
        return (
            <View style={style}>
                <Text>+86</Text>
                <TextInput placeholder="输入手机号码" onChangeText={this.onMobileChange}/>
                <TextInput placeholder="密码" onChangeText={this.onPasswordChange} secureTextEntry={true}/>

                <TouchableOpacity onPress={this.onSubmit}>
                    <Text style={{color:'grey'}}>下一步</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
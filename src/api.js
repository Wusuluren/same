/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  AsyncStorage,
} from 'react-native';

const AuthTokenKey = 'auth-token'
const UidKey = 'uid'

class SameApi {
    constructor() {
        this.SAME_HOST = 'https://v2.same.com'
        this.configData = {}
        this.uid = ''
        this.auth_token = ''
        this.header = {}
    }

    //start
    config(){
        fetch(this.SAME_HOST + "/config", {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            this.SAME_HOST = responseJson.data.base_api_url
            this.configData = responseJson.data
        }).catch((error) =>{
            console.error(error);
        });
    }
    profile(){
        fetch(`${this.SAME_HOST}/user/${this.uid}/profile`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            this.userInfo = responseJson.data.user
        }).catch((error) =>{
            console.error(error);
        });
    }
    getUserInfo() {
        if (this.userInfo === undefined) {
            this.profile()
        }
        return this.userInfo
    }
    logout() {
        this.auth_token = ''
        this.uid = ''
        AsyncStorage.removeItem(AuthTokenKey)
        AsyncStorage.removeItem(UidKey)
        fetch(`${this.SAME_HOST}/user/logout`, {
            // headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
        }).catch((error) =>{
            console.error(error);
        });
    }
    login(mobile, password, resolve, reject) {
        let formData = new FormData();
        formData.append("mobile", `+86-${mobile}`);
        formData.append("password", password);

        fetch(`${this.SAME_HOST}/user/login`, {
            method: "POST",
            body: formData,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            if (responseJson.code !== 0) {
                reject(responseJson.detail)
                return
            }
            let userInfo = responseJson.data.user
            this.uid = userInfo.id.toString()
            this.auth_token = userInfo.auth_token
            this.updateHeader()

            AsyncStorage.setItem(AuthTokenKey, this.auth_token, function (error) {
                if (error) {
                    console.error(error)
                }
            })
            AsyncStorage.setItem(UidKey, this.uid, function (error) {
                if (error) {
                    console.error(error)
                }
            })
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
    updateHeader() {
        this.header = {
            "Authorization": `Token ${this.auth_token}`,
            "Content-Type": "application/json; charset=UTF-8"
        }
    }
    setTimezone() {
        fetch(`${this.SAME_HOST}/user/set_timezone`, {
            method: "POST",
            body: `timezone=Asia%2FShanghai&`,
            header: {
                "Authorization": `Token ${this.auth_token}`,
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
        }).catch((error) =>{
            console.error(error);
        });
    }
    async isLogin() {
        if (this.auth_token !== '') {
            return true
        }
        this.auth_token = await AsyncStorage.getItem(AuthTokenKey)
        this.auth_token = TestAuthToken
        let isLogin = this.auth_token ? true : false
        if (isLogin) {
            this.uid = await AsyncStorage.getItem(UidKey)
            this.uid = TestUid
            this.updateHeader()
        }
        return isLogin
    }

    //channel
    channelsAll(resolve, reject){
        console.log(this.uid, this.auth_token, this.header)
        fetch(`${this.SAME_HOST}/user/${this.uid}/channels?channels=all`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
    channelSensesWithIds(ids,resolve, reject){
        fetch(`${this.SAME_HOST}/senses?ids=${ids}`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            reject(error)
        });
    }
    channelSenses(channel, resolve, reject){
        fetch(`${this.SAME_HOST}/channel/${channel}/senses`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            reject(error)
        });
    }
    userChannelSenses(channel, resolve, reject){
        fetch(`${this.SAME_HOST}/user/${this.uid}/channel/${channel}/senses`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            reject(error)
        });
    }

    //recommend
    channelsRecent(resolve, reject){
        fetch(`${this.SAME_HOST}/user/${this.uid}/channels?contacts=recent&channels=none&kv=yes&kv_mode=102`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
    recommends(resolve, reject){
        fetch(`${this.SAME_HOST}/recommendation?last_fetch=15458390430100`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
    sensesContact(resolve, reject){
        fetch(`${this.SAME_HOST}/user/contact/senses`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }

    //mine
    sensesMine(resolve, reject){
        console.log(this.uid, this.auth_token)
        fetch(`${this.SAME_HOST}/user/${this.uid}/senses`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
};

export default SameApi = new SameApi()

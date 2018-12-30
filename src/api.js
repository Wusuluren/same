/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

class SameApi {
    constructor() {
        this.SAME_HOST = 'https://v2.same.com'
        this.header = {
            "Authorization": "Token 1545473077-YmdwHhjuVm6a0fwO-1344732",
            "X-Same-Request-ID":"fa1f2d72-dd11-4ee6-9f8a-a4cd24d9c9f4",
            "Content-Type": "application/json; charset=UTF-8"
        }
        this.configData = {}
        this.uid = '1344732'
        this.userInfo = {}
    }

    //start
    config(){
        fetch(this.SAME_HOST + "/config", {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
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
            this.userInfo = responseJson.data
        }).catch((error) =>{
            console.error(error);
        });
    }

    //channel
    channelsAll(resolve, reject){
        fetch(`${this.SAME_HOST}/user/${this.uid}/channels?channels=all`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
    channelSenses(ids,resolve, reject){
        fetch(`${this.SAME_HOST}/senses?ids=${ids}`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            resolve(responseJson)
        }).catch((error) =>{
            reject(error)
        });
    }
    userChannelSenses(channel, resolve, reject){
        fetch(`${this.SAME_HOST}/user/${this.uid}/channel/${channel}/senses`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            resolve(responseJson)
        }).catch((error) =>{
            reject(error)
        });
    }

    //hall
    channelsRecent(resolve, reject){
        fetch(`${this.SAME_HOST}/user/${this.uid}/channels?contacts=recent&channels=none&kv=yes&kv_mode=102`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
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
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }

    //mine
    sensesMine(resolve, reject){
        fetch(`${this.SAME_HOST}/user/${this.uid}/senses`, {
            headers: this.header,
        }).then((response) => response.json()).then((responseJson) => {
            resolve(responseJson)
        }).catch((error) =>{
            console.error(error);
            reject(error)
        });
    }
};

export default SameApi = new SameApi()

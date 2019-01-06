/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, TouchableOpacity, Button, ActivityIndicator, SectionList, Platform, Stylesheet, Image, Text, View} from 'react-native';
import SameApi from "./api";
import {DeviceHeight, DeviceWidth, ImageButton, SenseCate, Styles} from "./common"
import NavigationService from "./NavigationService";

export default class MsgScreen extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        return (
            <View style={style}>
                <MsgList/>
            </View>
        );
    }
}

class MsgListItem extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        // const style = {
        //     flex: 1,
        //     flexDirection: 'column',
        //     justifyContent: 'space-between',
        // }
        // if (false) {
        //     return (
        //         <View stype={style}>
        //             <MsgItemHeader style={{height:50}} data={this.props.data}/>
        //         </View>
        //     )
        // }
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Image source={{uri:this.props.data.user.avatar}} style={Styles.icon}/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                    <Text>{this.props.data.user.username}</Text>
                    <Text>{this.props.data.msg.media.txt}</Text>
                </View>
                </View>
        );
    }
}

class MsgItemHeader extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Image source={{uri:this.props.data.user.avatar}} style={Styles.icon}/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                    <Text>{this.props.data.user.username}</Text>
                    <Text>{this.props.data.msg.media.txt}</Text>
                </View>
            </View>
        );
    }
}

class MsgList extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        SameApi.profile()

        return SameApi.imcatalogList((responseJson) => {
            let msgList = responseJson.data.results
            msgList.sort(function (a, b) {
                if (a.badge > 0 || b.badge > 0) {
                    return b.badge - a.badge
                }
                return b.msg.time - a.msg.time
            })
            console.log(msgList)
            this.setState({
                isLoading: false,
                msgList: msgList, //responseJson.data.results,
            }, function(){})}, function () {})
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={Styles.container}>
                <FlatList
                    data={this.state.msgList}
                    // sections={[{data:this.state.recommendList}]}
                    renderItem={({item}) => <MsgListItem data={item}/>}
                    // renderSectionHeader={({section}) => <Text style={Styles.sectionHeader}></Text>}
                    // keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
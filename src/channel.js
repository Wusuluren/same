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
import {SenseCate, Styles} from "./common"

export default class ChannelScreen extends Component {
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
                <ChannelList/>
            </View>
        );
    }
}

class ChannelListItem extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
        }

        if (this.props.data.badge > 0) {
            return (
                <View stype={style}>
                    <Image source={{uri:this.props.data.channel.icon}} style={{width:50, height:50,}}/>
                    <Text>{this.props.data.channel.name}</Text>
                    <Text>{this.props.data.badge}</Text>
                </View>
            );
        } else {
            return (
                <View stype={style}>
                    <Image source={{uri:this.props.data.channel.icon}} style={{width:50, height:50,}}/>
                    <Text>{this.props.data.channel.name}</Text>
                </View>
            );
        }
    }
}

class ChannelList extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return SameApi.channelsAll((responseJson) => {
            // console.log(responseJson)
            this.setState({
                isLoading: false,
                channelList: responseJson.data.subscribe_channels,
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
                    data={this.state.channelList}
                    // sections={[{data:this.state.channelList}]}
                    renderItem={({item}) => <ChannelListItem data={item}/>}
                    // renderSectionHeader={({section}) => <Text style={Styles.sectionHeader}></Text>}
                    // keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
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
import {DeviceHeight, DeviceWidth, ImageButton, SenseCate, Styles, TextButton} from "./common"

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
        this.styles = {
            container: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },
            icon: {
                width: DeviceWidth*1/8,
                height: DeviceHeight*0.95 / 12,
            },
            title: {
                width: DeviceWidth*6/8,
                height: DeviceHeight*0.95 / 12,
            },
            badge: {
                width: DeviceWidth*1/8,
                height: DeviceHeight*0.95 / 12,
            },
            textBtn: {
            }
        }
    }

    render(): React.ReactNode {
        console.log(this.props.data.channel.id, this.props.data.channel.name)
        if (this.props.data.badge > 0) {
            return (
                <View style={this.styles.container}>
                    <Image source={{uri:this.props.data.channel.icon}} style={this.styles.icon}/>
                    {/*<Text style={this.styles.title}>{this.props.data.channel.name}</Text>*/}
                    <TextButton text={this.props.data.channel.name} jumpUrl='ChannelDetail' channel={this.props.data.channel.id} style={this.styles.textBtn} />
                    <Text style={this.styles.badge}>{this.props.data.badge}</Text>
                </View>
            );
        } else {
            return (
                <View style={this.styles.container}>
                    <Image source={{uri:this.props.data.channel.icon}} style={this.styles.icon}/>
                    <TextButton text={this.props.data.channel.name} jumpUrl='ChannelDetail' channel={this.props.data.channel.id} style={this.styles.textBtn} />
                    {/*<Text style={this.styles.title}>{this.props.data.channel.name}</Text>*/}
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
            <View>
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
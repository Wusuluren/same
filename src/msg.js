/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Button, ActivityIndicator, SectionList, Platform, StyleSheet, Image, Text, View} from 'react-native';
import SameApi from "./api";
import {SenseCate} from "./utils"

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
                {/*<View style={{marginTop:10, height:600}}>*/}
                    <MsgList/>
                    {/*</View>*/}
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

class MsgList extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return SameApi.channelsAll((responseJson) => {
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
            <View style={styles.container}>
                <SectionList
                    sections={[{data:this.state.channelList}]}
                    renderItem={({item}) => <ChannelListItem data={item}/>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}></Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
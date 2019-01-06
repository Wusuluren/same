import SameApi from "./api";
import {ActivityIndicator, Image, SectionList, Stylesheet, Text, View} from "react-native";
import React, {Component} from "react";
import {
    ChannelDetail, ChannelListItemBody, ChannelListItemFooter, Styles,
} from "./common";
import {withNavigation} from "react-navigation";

export class channelDetailScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        // return SameApi.channelSensesWithIds('87757452,87765145,87746676', (responseJson) => {
        //     this.setState({
        //         isLoading: false,
        //         data: responseJson.data,
        //     }, function(){})}, function () {})
        return SameApi.channelSenses(this.props.navigation.getParam('channel'), (responseJson) => {
            this.setState({
                isLoading: false,
                data: responseJson.data,
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
            <ChannelDetail data={this.state.data.results}/>
        );
    }
}
let ChannelDetailScreen = withNavigation(channelDetailScreen)
export {
            ChannelDetailScreen
}

export class UserChannelSensesScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return SameApi.userChannelSenses('1017251', (responseJson) => {
            this.setState({
                isLoading: false,
                data: responseJson.data,
            }, function(){})}, function () {})
    }

    renderItem(item) {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }
        return (
            <View stype={style}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Image source={{uri:item.item.user.avatar}} style={{width:50, height:50,}}/>
                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                        <Text>{''}</Text>
                        <Text>{item.item.channel.times}</Text>
                    </View>
                </View>

                <ChannelListItemBody style={{height:50}} data={item.item}/>
                <ChannelListItemFooter style={{height:50}} data={item.item}/>
            </View>
        );
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
                <SectionList
                    sections={[{data:this.state.data.results}]}
                    renderItem={this.renderItem}
                    renderSectionHeader={({section}) => <Text style={Styles.sectionHeader}></Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
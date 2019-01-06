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

export default class RecommendScreen extends Component {
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
                <RecommendList/>
            </View>
        );
    }
}

class RecommendListItem extends Component {
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
          <View stype={style}>
              <RecommendItemHeader style={{height:50}} data={this.props.data}/>
              <RecommendItemBody style={{height:50}} data={this.props.data}/>
          </View>
        );
    }
}

class RecommendItemBodyImage extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            container: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            img: {
                width: DeviceWidth*0.95 / 3,
                height: DeviceHeight*0.8 / 5,
            }
        }
        this.channel = ''
        if (this.props.data.sense_data.length > 0) {
            this.channel = this.props.data.sense_data[0].channel_id
        }
    }

    getPhoto(idx) {
        return this.props.data.sense_data.length > idx ? this.props.data.sense_data[idx].photo : ''
    }

    render(): React.ReactNode {
        return (
            <View style={this.styles.container}>
                <ImageButton imgUrl={this.getPhoto(0)} jumpUrl='ChannelDetail' channel={this.channel} style={this.styles.img}/>
                <ImageButton imgUrl={this.getPhoto(1)} jumpUrl='ChannelDetail' channel={this.channel} style={this.styles.img}/>
                <ImageButton imgUrl={this.getPhoto(2)} jumpUrl='ChannelDetail' channel={this.channel} style={this.styles.img}/>
            </View>
        );
    }
}

class RecommendItemHeader extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        if (this.props.data.type != 'channel') {
            return <View/>
        }
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Image source={{uri:this.props.data.channel.icon}} style={{width:50, height:50,}}/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                    <Text>{this.props.data.channel.name}</Text>
                    <Text>{this.props.data.reason.description}</Text>
                </View>
            </View>
        );
    }
}

class RecommendItemBody extends Component {
    render(): React.ReactNode {
        // console.log(this.props.data)
        let cate = this.props.data.channel.cate
        if (cate == SenseCate.Image) {
            return (
                <RecommendItemBodyImage data={this.props.data.channel}/>
            );
        } else if (cate == SenseCate.Music) {
            return (
                <View/>
                // {<RecommendItemBodyImage data={this.props.data.media}/>}
            )
        } else {
            return (
                <View/>
            )
        }
    }
}

class RecommendList extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        SameApi.profile()

        return SameApi.recommends((responseJson) => {
            this.setState({
                isLoading: false,
                recommendList: responseJson.data,
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
                    data={this.state.recommendList}
                    // sections={[{data:this.state.recommendList}]}
                    renderItem={({item}) => <RecommendListItem data={item}/>}
                    // renderSectionHeader={({section}) => <Text style={Styles.sectionHeader}></Text>}
                    // keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
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
    Alert
} from 'react-native';
import SameApi from "./api";
import {
    ChannelListItemMusic,
    ChannelListItemText,
    ChannelListItemTextImage,
    ImageButton,
    SenseCate,
    TextButton,
    Styles,
} from "./common";
import NavigationService from "./NavigationService";

export default class MineScreen extends Component {
    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        return (
            <View style={style}>
                <SameSectionList/>
            </View>
        );
    }
}

class SameListItem extends Component {
    componentWillMount() {
        this._gestureHandlers = {
            onStartShouldSetResponder: () => true,  //对触摸进行响应
            onMoveShouldSetResponder: () => true,  //对滑动进行响应
            onResponderGrant: (evt) => {
                console.log("parent onResponseGrant");
                console.log(evt.nativeEvent.locationY, evt.nativeEvent.pageY, evt.nativeEvent.target)
            }, //激活时做的动作
            onResponderMove: (evt) => {
                console.log("parent onResponderMove");
            },  //移动时作出的动作
            onResponderRelease: (evt) => {
                console.log("parent onResponseRelease");
                console.log(evt.nativeEvent.locationY, evt.nativeEvent.pageY, evt.nativeEvent.target)
            }, //动作释放后做的动作
        }
    }
    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        if (this.props.data === 'profile') {
            return (
                <View stype={style} {...this._gestureHandlers}>
                    <SameProfile/>
                </View>
            )
        }

        return (
          <View stype={style} {...this._gestureHandlers}>
              <SameListItemHeader style={{height:50}} data={this.props.data}/>
              <SameListItemBody style={{height:50}} data={this.props.data}/>
              <SameListItemFooter style={{height:50}} data={this.props.data}/>
          </View>
        );
    }
}


class SameProfile extends Component {
    constructor(props) {
        super(props);
        this.Styles = {
            container: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
            },
            img:{
                width: 50,
                height: 50,
            }
        }
        this.profile = SameApi.getUserInfo()
    }
    render(): React.ReactNode {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <ImageButton imgUrl={this.profile.avatar} jumpUrl='UserChannelSenses'/>
                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>已发布{this.profile.senses}</Text>
                            <Text>频道数{this.profile.channels}</Text>
                        </View>
                        <Text>{this.profile.join_at}加入</Text>
                    </View>
                </View>

                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <TextButton text='按时间' jumpUrl={'ChannelDetail'}></TextButton>
                    <TextButton text='按频道' jumpUrl={'ChannelDetail'}></TextButton>
                </View>
            </View>
        );
    }
}

class SameListItemHeader extends Component {
    constructor(props) {
        super(props);
        this.Styles = {
            container: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
            },
            img:{
                width: 50,
                height: 50,
            }
        }
    }
    render(): React.ReactNode {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                {/*<Image source={{uri:this.props.data.channel.icon}} style={{width:50, height:50,}}/>*/}
                <ImageButton imgUrl={this.props.data.channel.icon} jumpUrl='UserChannelSenses'/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                    {/*<TextButton text={this.props.data.channel.name} jumpUrl={'ChannelDetail'}></TextButton>*/}
                    <Text>{this.props.data.channel.name}</Text>
                    <Text>{this.props.data.channel.times}</Text>
                </View>
            </View>
        );
    }
}

class SameListItemBody extends Component {
    render(): React.ReactNode {
        let cate = this.props.data.cate
        if (cate == SenseCate.Image) {
            if (this.props.data.photo == '') {
                return (
                    <ChannelListItemText data={this.props.data}/>
                );
            }
            return (
                <ChannelListItemTextImage data={this.props.data}/>
            );
        } else if (cate == SenseCate.Music) {
            return (
                <ChannelListItemMusic data={this.props.data.media}/>
            )
        } else {
            return (
                <View/>
            )
        }
    }
}

class SameListItemFooter extends Component {
    render(): React.ReactNode {
        return (
            <View style={{flex: 1, flexDirection: 'row',}}>
                <Image source={{uri:''}} style={Styles.icon}/>
                <TextButton text={this.props.data.likes.toString()}/>
                <Image source={{uri:''}} style={Styles.icon}/>
                <TextButton text={this.props.data.views.toString()}/>
                <Image source={{uri:''}} style={Styles.icon}/>
                <Image source={{uri:''}} style={Styles.icon}/>
            </View>
        );
    }
}

class SameSectionList extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return SameApi.sensesMine((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson.data.results,
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
                <SectionList
                    sections={[{title:'profile', data:['profile']}, {title:'senses', data:this.state.dataSource}]}
                    renderItem={({item}) => <SameListItem data={item}/>}
                    renderSectionHeader={({section}) => <Text style={Styles.sectionHeader}></Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

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
    StyleSheet,
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
    TextButton
} from "./utils";
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
                {/*<View style={{marginTop:10, height:600}}>*/}
                    <SameSectionList/>
                    {/*</View>*/}
            </View>
        );
    }
}

class SameListItem extends Component {
    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        return (
          <View stype={style}>
              <SameListItemHeader style={{height:50}} data={this.props.data}/>
              <SameListItemBody style={{height:50}} data={this.props.data}/>
              <SameListItemFooter style={{height:50}} data={this.props.data}/>
          </View>
        );
    }
}

class SameListItemHeader extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            container: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                // backgroundColor: 'red',
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
                <Image source={{uri:''}} style={styles.icon}/>
                <TextButton text={this.props.data.likes.toString()}/>
                <Image source={{uri:''}} style={styles.icon}/>
                <TextButton text={this.props.data.views.toString()}/>
                <Image source={{uri:''}} style={styles.icon}/>
                <Image source={{uri:''}} style={styles.icon}/>
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
            <View style={styles.container}>
                <SectionList
                    sections={[{data:this.state.dataSource}]}
                    renderItem={({item}) => <SameListItem data={item}/>}
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
    icon: {
        width:20,
        height:20,
    },
})
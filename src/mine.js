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
import {SenseCate} from "./utils";
import {createStackNavigator} from "react-navigation";
import NavigationService from "./NavigationService";

export default class MineScreen extends Component {
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
                    <SameSectionList/>
                    {/*</View>*/}
            </View>
        );
    }
}

class SameListItem extends Component {
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
              <SameListItemHeader style={{height:50}} data={this.props.data}/>
              <SameListItemBody style={{height:50}} data={this.props.data}/>
              <SameListItemFooter style={{height:50}} data={this.props.data}/>
          </View>
        );
    }
}

class SameListItemTextImage extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View>
                <TouchableOpacity onPress={()=>{NavigationService.navigate('ImgDetail', {urls:[{url:this.props.data.photo}]})}}>
                <Image source={{uri:this.props.data.photo}} style={{height:300,resizeMode:'cover'}}/>
                </TouchableOpacity>
                <Text>{this.props.data.txt}</Text>
            </View>
        );
    }
}

class SameListItemText extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View>
                <Text>{this.props.data.txt}</Text>
            </View>
        );
    }
}

class SameListItemMusic extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Image source={{uri:this.props.data.music.cover}} style={{width:100, height:100,}}/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-around'}}>
                    <Text>演唱者</Text>
                    <Text>{this.props.data.music.author}</Text>
                    <Text>歌曲名</Text>
                    <Text>{this.props.data.music.title}</Text>
                </View>
            </View>
        );
    }
}

class SameListItemHeader extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Image source={{uri:this.props.data.channel.icon}} style={{width:50, height:50,}}/>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
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
                    <SameListItemText data={this.props.data}/>
                );
            }
            return (
                <SameListItemTextImage data={this.props.data}/>
            );
        } else if (cate == SenseCate.Music) {
            return (
                <SameListItemMusic data={this.props.data.media}/>
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
        let styles={
            icon: {
                width:20,
                height:20,
            },
        }
        return (
            <View style={{flex: 1, flexDirection: 'row',}}>
                <Image source={{uri:''}} style={styles.icon}/>
                <TextButton data={this.props.data.likes.toString()}/>
                <Image source={{uri:''}} style={styles.icon}/>
                <TextButton data={this.props.data.views.toString()}/>
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

class ImageButton extends Component{
    constructor(props) {
        super(props);
        this.styles = {
            container: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                backgroundColor: 'red',
            },
            img:{
                width: 50,
                height: 50,
            }
        }
    }
    onButtonPress = ()=>{}

    render(){
        return(
            <TouchableOpacity onPress={this.onButtonPress}  activeOpacity={0.2} focusedOpacity={0.5}>
                <View style={this.styles.container}>
                    <Image source={{uri:'https://pic1.zhimg.com/16ff989bb_l.jpg'}} styles={{width:50, height:50,}} />
                </View>
            </TouchableOpacity>
        );
    }
}

class TextButton extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5}>
                <View style= {{justifyContent:'center',alignItems:'center',width:20,height:20,backgroundColor:'white'}}>
                    <Text style={{color:'grey'}}>{this.props.data}</Text>
                </View>
            </TouchableOpacity>
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
})
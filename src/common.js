import React, {Component} from "react";
import {withNavigation} from "react-navigation";
import ImageViewer from "react-native-image-zoom-viewer";
import NavigationService from "./NavigationService";
import {Dimensions, FlatList, Alert, ActivityIndicator, Image, SectionList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

let SenseCate = {
    Text: 1,
    Image:2,
    Music:3,
}

class imgDetailScreen extends React.Component {
    render() {
        const images = this.props.navigation.getParam('urls')
        return (
            <ImageViewer imageUrls={images} onClick={()=>{NavigationService.goBack()}}/>
        );
    }
}
let ImgDetailScreen = withNavigation(imgDetailScreen)

class ImageButton extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <TouchableOpacity onPress={
                () => {
                    NavigationService.navigate(this.props.jumpUrl, {channel:this.props.channel})
                }
            }>
                <Image source={{uri:this.props.imgUrl}} style={this.props.style} />
            </TouchableOpacity>
        );
    }
}
// let ImageButton = withNavigation(imageButton)

class TextButton extends Component{
    render(){
        return(
            <TouchableOpacity onPress={()=>NavigationService.navigate(this.props.jumpUrl, {channel:this.props.channel})}>
                <Text style={this.props.style}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
// let TextButton = withNavigation(textButton)

class ChannelListItemTextImage extends Component {
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

class ChannelListItemText extends Component {
    render(): React.ReactNode {
        return (
            <View>
                <Text>{this.props.data.txt}</Text>
            </View>
        );
    }
}

class ChannelListItemMusic extends Component {
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

class ChannelListItemHeader extends Component {
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

class ChannelListItemBody extends Component {
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

class ChannelListItemFooter extends Component {
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

class ChannelListItem extends Component {
    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }

        return (
            <View stype={style}>
                <ChannelListItemHeader style={{height:50}} data={this.props.data}/>
                <ChannelListItemBody style={{height:50}} data={this.props.data}/>
                <ChannelListItemFooter style={{height:50}} data={this.props.data}/>
            </View>
        );
    }
}

class ChannelDetail extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <FlatList
                    data={this.props.data}
                    // sections={[{data:this.props.data}]}
                    renderItem={({item}) => <ChannelListItem data={item}/>}
                    // renderSectionHeader={({section}) => <Text style={styles.sectionHeader}></Text>}
                    // keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
// let ChannelDetail = withNavigation(channelDetail)

const Styles = StyleSheet.create({
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
    img: {
        width:50,
        height:50,
    },
})

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export {
    ChannelListItemTextImage,
    ChannelListItemText,
    ChannelListItemMusic,
    ChannelDetail,
    ChannelListItemBody,
    ChannelListItemHeader,
    ChannelListItemFooter,

    TextButton,
    ImageButton,
    ImgDetailScreen,

    SenseCate,
    Styles,
    DeviceWidth,
    DeviceHeight,
}
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
                {/*<View style={{marginTop:10, height:600}}>*/}
                    <RecommendList/>
                    {/*</View>*/}
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
    }

    getPhoto(idx) {
        return this.props.data.sense_data.length > idx ? this.props.data.sense_data[idx].photo : ''
    }

    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirectiRRon: 'row',
            justifyContent: 'space-between',
        }
        // console.log(this.props.data)
        return (
            <View stype={style}>
                <Image source={{uri:this.getPhoto(0)}} style={{height:50,width:50}}/>
                <Image source={{uri:this.getPhoto(1)}} style={{height:50,width:50}}/>
                <Image source={{uri:this.getPhoto(2)}} style={{height:50,width:50}}/>
            </View>
        );
    }
}

class RecommendItemHeader extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
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
                // {/*<RecommendItemBodyImage data={this.props.data.media}/>*/}
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
            <View style={styles.container}>
                <SectionList
                    sections={[{data:this.state.recommendList}]}
                    renderItem={({item}) => <RecommendListItem data={item}/>}
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
})
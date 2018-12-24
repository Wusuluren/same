/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, SectionList, Platform, StyleSheet, Image, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <SameApp/>
    );
  }
}

class SameApp extends Component {
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
                <View style={{marginTop:10, height:600}}>
                    <SameSectionList/>
                    </View>
                <View style={{marginBottom:20, height:50}}>
                    <SameNavBar/>
                    </View>
            </View>
        );
    }
}

class SameNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        const style = {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
        let url = 'https://pic1.zhimg.com/16ff989bb_l.jpg'

        return (
            <View style={style}>
                <Image source={{uri:url}} style={{width:50, height:50,}}/>
                <Image source={{uri:url}} style={{width:50, height:50,}}/>
                <Image source={{uri:url}} style={{width:50, height:50,}}/>
                <Image source={{uri:url}} style={{width:50, height:50,}}/>
                <Image source={{uri:url}} style={{width:50, height:50,}}/>
            </View>
        );
    }
}

class SameList extends Component {
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
                <SameListItem data={this.props.data}/>
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
                <Image source={{uri:this.props.data.photo}} style={{height:300,}}/>
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
        if (cate == 2) {
            if (this.props.data.photo == '') {
                return (
                    <SameListItemText data={this.props.data}/>
                );
            }
            return (
                <SameListItemTextImage data={this.props.data}/>
            );
        } else if (cate == 3) {
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
                <Text>{this.props.data.likes}</Text>
                <Image source={{uri:''}} style={styles.icon}/>
                <Text>{this.props.data.views}</Text>
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
        return fetch("https://v2.same.com/user/1344732/senses", {
                method: "GET",
                headers: {
                    "Authorization": "Token 1545473077-YmdwHhjuVm6a0fwO-1344732",
                    "X-Same-Request-ID":"fa1f2d72-dd11-4ee6-9f8a-a4cd24d9c9f4",
                    "Content-Type": "application/json; charset=UTF-8"
                },
             }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data.results,
                }, function(){

                });
                // console.log('---', responseJson.data.results.length)
            })
            .catch((error) =>{
                console.error(error);
            });
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
                    renderItem={({item}) => <SameList data={item}/>}
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
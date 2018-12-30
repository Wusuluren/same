import React from "react";
import {createStackNavigator, withNavigation} from "react-navigation";
import ImageViewer from "react-native-image-zoom-viewer";
import NavigationService from "./NavigationService";

export var SenseCate = {
    Text: 1,
    Image:2,
    Music:3,
}

export class imgDetailScreen extends React.Component {
    render() {
        const images = this.props.navigation.getParam('urls')
        return (
            <ImageViewer imageUrls={images} onClick={()=>{NavigationService.goBack()}}/>
        );
    }
}
export var ImgDetailScreen = withNavigation(imgDetailScreen)

// export var ImgNavigator = createStackNavigator({
//     ImgDetail: withNavigation(ImgDetailScreen),
// })
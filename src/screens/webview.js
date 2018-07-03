import React, { Component } from 'react';

import { StyleSheet, WebView, Platform} from 'react-native';

class WebViewer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
        title: params ? params.name : 'No idea'
    };
  };

      render() {
        
        return (
     
          <WebView 
          style={styles.WebViewStyle} 
          source={{uri: this.props.navigation.state.params}} 
          javaScriptEnabled={true}
          domStorageEnabled={true}  />
    
        );
      }
    }
    


const styles = StyleSheet.create(
{

 WebViewStyle:
 {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: 0
 }
});

export default WebViewer;
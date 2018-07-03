import React, { Component } from 'react';

import {Image, StyleSheet} from 'react-native';

import propTypes from 'prop-types';

import { COLORS } from '@lib/theme';

const defaultProfilePicture = require('@images/defaultprofilepicture.jpg');

class ProfilePicture extends Component {
    static propTypes = {
      style: propTypes.shape({
        size: propTypes.number,
        borderWidth: propTypes.number,
      }),
      imageUrl: propTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {

      let imageSource = defaultProfilePicture;
      let imageUrl = this.props.imageUrl;
      if (imageUrl && imageUrl !== '')imageSource = { uri: imageUrl };

      const size = this.props.style.size; 
      const profilePictureStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: this.props.style.borderWidth,
        borderColor: COLORS.primary
      }
    
      return (
          <Image style={ profilePictureStyle } source={imageSource} />
      );
  }
}

export { ProfilePicture }
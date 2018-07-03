import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'react-native';

/*

Convert imperative coding to declarative one

Alert.alert() -> imperative
<ErrorDialog></ErrorDialog> -> declarative

We can do this byt creating a Component that returns null but in the render function executes an imperative call depending of the props we sent to that component.

*/

class ErrorDialog extends Component {
    static propTypes = {
        // propTypes are used to validate the implementation of the component and be sure we use the correct type for each of them
        // it doesn't have any runtime effect, it only help at the developemnt stage
        // https://reactjs.org/docs/typechecking-with-proptypes.html
        title: PropTypes.string,
        onOk: PropTypes.func,
        visible: PropTypes.bool,
        message: PropTypes.string
    };

    render() {
        if (this.props.visible) {
            Alert.alert(this.props.title, this.props.message, [{ text: 'OK', onPress: this.props.onOk }]);
        }
        return null;
    }
}

export default ErrorDialog;

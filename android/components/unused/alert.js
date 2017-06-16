import React, {Component} from 'react';
import TimerMixin from 'react-timer-mixin';

import {

  View,
  Modal,
  Text,

  StyleSheet,
  TouchableWithoutFeedback,

} from 'react-native';

export var ModalAlert = React.createClass({
  mixins: [TimerMixin],
  componentDidUpdate: function() {
    // this.setTimeout(
    //   () => { this.setState({visible: false}); },
    //   2000
    // );
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.email) {
      this.setState({visible: true});
    }
    console.log('modals next props: ', nextProps);
  },
  getInitialState: function() {
    return {visible: false};
  },
  render: function() {
    return(
      <Modal
        transparent={true}
        visible={this.state.visible}
        animationType={'fade'}
        onRequestClose={() => this.setState({visible: false})}
        >
        <TouchableWithoutFeedback
          onPress={() => this.setState({visible: false})}>
          <View
            style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <View style={{marginTop: 100, alignSelf: 'center',  backgroundColor: 'lightblue'}}>
              <Text style={{fontSize:20}}> {this.props.email} has been added! </Text>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }


});

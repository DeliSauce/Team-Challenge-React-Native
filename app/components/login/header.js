import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


const LoginHeader = (props) => {
  return (
    <View style={[styles.header_container, props.style]}>
      <Text style={styles.header}> TEAM CHALLENGE </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
  },
  header: {
    // borderWidth: 2,
    fontSize: 30,
    // alignItems: 'center',
    fontWeight: 'bold',
  }
});

export default LoginHeader;

import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


const LoginHeader = () => {
  return (
    <View>
      <Text style={styles.header}> TEAM CHALLENGE </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    alignItems: 'center',
    fontWeight: 'bold',
  }
});

export default LoginHeader;

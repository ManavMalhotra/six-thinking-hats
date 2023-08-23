import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleBackPress}>
        <Image
          style={styles.icon}
          source={require('../assets/menu.svg')}
        />
      </TouchableOpacity>

      <Image
        style={styles.tinkLogo}
        source={require('../assets/tink-logo-1.png')}
      />
      <Image
        style={styles.menuIconLayout}
        source={require('../assets/ellipse-15.svg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgrey',
  },
  icon: {
    width: 50,
    height: 50,
    color: 'black',
  },
  tinkLogo: {
    width: 106,
    height: 32,
  },
  menuIconLayout: {
    height: 24,
    width: 24,
  },
});

export default Navbar;

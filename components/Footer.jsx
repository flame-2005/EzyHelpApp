import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Install Ionicons if not already done

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('/')}> 
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://res.cloudinary.com/dtyombve3/image/upload/v1737798927/bghejb2qjdoo7zievrql-removebg-preview_irtayq.png' }} 
              style={styles.logo}
            />
            <Text style={styles.logoText}>EzyHelp</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.copyrightText}>© 2020 EzyHelp —</Text>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.ezyhelp.in/privacyPolicy/Privacy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.ezyhelp.in/shipping/Shipping')}>
            <Text style={styles.linkText}>Shipping Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.ezyhelp.in/contact/Contact')}>
            <Text style={styles.linkText}>Refund Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.ezyhelp.in/terms&conditions/TermsAndConditions')}>
            <Text style={styles.linkText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('https://x.com/ezyhelpservices?t=Rpu7adwqeJn8e4mLgf_aRg&s=09')}>
            <Ionicons name="logo-twitter" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ezyhelp.in?igsh=b3Nxcnd1dWx6MHA=')}>
            <Ionicons name="logo-instagram" size={24} color="#fff" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position:'absolute',
    bottom:0,
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  innerContainer: {
    marginHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#fff',
  },
  copyrightText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#fff',
    marginHorizontal: 8,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  socialIcon: {
    marginLeft: 16,
  },
});

export default Footer;

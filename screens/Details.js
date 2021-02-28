import React from 'react';
import Lightbox from 'react-native-lightbox';
import { Card } from '../components/';

import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const Details = ({route})=>{
  const item = route.params;
    return (
    <Block style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <Block flex={0.6} >
        <ImageBackground
          source={{uri:"http://192.168.178.134:8000/media/"+item.images[0].filePath}}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block
              middle
              row
              style={{ position: 'absolute', width: width, top: height * 0.6 - 26, zIndex: 99 }}
            >
              <Button style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                Contact
              </Button>
              <GaButton
                round
                onlyIcon
                shadowless
                icon="twitter"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
              <GaButton
                round
                onlyIcon
                shadowless
                icon="pinterest"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </ImageBackground>


      </Block>
      <Block />
      <Block flex={0.4} style={{ padding: theme.SIZES.BASE, marginTop: 90}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 20 }}>
            <Block middle>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 15,
                  marginBottom: 30,
                  zIndex: 2
                }}
              >
               {item.title}
                  </Text>
              <Text
                size={16}
                muted
                style={{
                  textAlign: 'center',
                  fontFamily: 'montserrat-regular',
                  zIndex: 2,
                  lineHeight: 25,
                  color: '#9A9A9A',
                  paddingHorizontal: 15
                }}
              >{item.description}
                  </Text>
            </Block>
            <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
              <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
                Album
                  </Text>
              <Button
                small
                color="transparent"
                textStyle={{ color: nowTheme.COLORS.PRIMARY, fontSize: 14 }}
              >
                View all
                  </Button>
            </Block>


            <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15}}>
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                {item.images.map((img) => (
                  <Image
                   source={{uri:"http://192.168.178.134:8000/media/"+img.filePath}}
                    key={`viewed-${img}`}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
    );
}

const styles = StyleSheet.create({

    profileContainer: {
      width,
      height,
      padding: 0,
      zIndex: 1
    },
    profileBackground: {
      width,
      height: height * 0.6
    },
  
    info: {
      marginTop: 30,
      paddingHorizontal: 10,
      height: height * 0.8
    },
    avatarContainer: {
      position: 'relative',
      marginTop: -80
    },
    avatar: {
      width: thumbMeasure,
      height: thumbMeasure,
      borderRadius: 50,
      borderWidth: 0
    },
    nameInfo: {
      marginTop: 35
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
    social: {
      width: nowTheme.SIZES.BASE * 3,
      height: nowTheme.SIZES.BASE * 3,
      borderRadius: nowTheme.SIZES.BASE * 1.5,
      justifyContent: 'center',
      zIndex: 99,
      marginHorizontal: 5
    }
  });

export default Details;

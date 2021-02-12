import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

import nowTheme from "../constants/Theme";
import useAuth from "../auth/useAuth";
const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const { user, logOut } = useAuth();
  const insets = useSafeArea();
  const screens = [
    "Home",
    "Components",
    "Articles",
    "Profile"
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
          <Text
            color={nowTheme.COLORS.WHITE}
            style={{ marginTop: 30, marginLeft: 20, marginBottom: 10, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
          >
            DOCUMENTATION
          </Text>
        </Block>
        <DrawerCustomItem title="GETTING STARTED" navigation={navigation}/>
        {user&&<Button title="LOGOUT" onPress={() => logOut()}/>}
        {!user&&<DrawerCustomItem title="Login" navigation={navigation} focused={state.index === 7 ? true : false}/>}
        {!user&&<DrawerCustomItem title="Account" navigation={navigation}/>}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default CustomDrawerContent;

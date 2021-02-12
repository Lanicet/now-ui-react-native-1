import React, {useState} from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from "./auth/context";
import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  
  return images.map(image => {

    if (typeof image === 'string') {

      return Image.prefetch(image);

    } else {

      return Asset.fromModule(image).downloadAsync();

    }

  });

}

export default function App() {

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [fontLoaded, SetFontLoaded] = useState(false);

  const restoreUser = async () => {
  const user = await authStorage.getUser();
  if (user) setUser(user);
  };


  const _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    });
    restoreUser();

    SetFontLoaded(true);
    return Promise.all([...cacheImages(assetImages)]);
  };

 const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

 const _handleFinishLoading = () => {
    if (fontLoaded) {
      setIsLoadingComplete(true);
    }
    setIsReady(true)
  };

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={_loadResourcesAsync}
          onError={_handleLoadingError}
          onFinish={_handleFinishLoading}
        />
      );
    } else {
      return (
        <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
        </AuthContext.Provider>
      );
    }

}
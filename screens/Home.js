import React, {useEffect}from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
import useApi from "../hooks/useApi";
import articlesApi from "../api/articles";

const { width } = Dimensions.get("screen");

function Home({navigation}) {
  
  const getArticlesApi = useApi(articlesApi.getArticles);

  useEffect(() => {
    getArticlesApi.request();
  }, []);
console.log(getArticlesApi)
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
      {getArticlesApi.error && (
        <>
          <AppText>Couldn't retrieve the Articles.</AppText>
          <Button title="Retry" onPress={getArticlesApi.request} />
        </>
      )}
        <Block flex>
          {getArticlesApi.data.map(article=><Card item={article} horizontal />)}
        </Block>
      </ScrollView>
    );
  };


    return (
      <Block flex center style={styles.home}>
        {renderArticles()}
      </Block>
    );

}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

export default Home;

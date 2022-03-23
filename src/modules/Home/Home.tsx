import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {SwapiService} from '../../shared/services/swapi';

import {styles} from './Home.styles';

const Home: React.FC = ({backgroundStyle, labelStyle}) => {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isOffline, setOfflineStatus] = useState(false);

  const swapiService = useMemo(() => new SwapiService(), []);

  const getPeople = async () => {
    const {results} = await swapiService.getPeople(pageNumber);
    await AsyncStorage.setItem('data', JSON.stringify(results));
    return results;
  };

  const {data: queryData, isLoading} = useQuery(
    ['data', pageNumber],
    getPeople,
  );

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (isOffline) {
      AsyncStorage.getItem('data').then(res => setData(JSON.parse(res)));
      Alert.alert('No connection detected');
    } else {
      setData(queryData);
    }
  }, [pageNumber, isLoading]);

  const RenderCard = useCallback(
    ({item}) => (
      <View style={styles.cardContainer}>
        <View style={styles.cardItemsWrapper}>
          <Text style={styles.cardLabel}>Name: </Text>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.cardItemsWrapper}>
          <Text style={styles.cardLabel}>Height: </Text>
          <Text>{item.height}</Text>
        </View>
        <View style={styles.cardItemsWrapper}>
          <Text style={styles.cardLabel}>Gender: </Text>
          <Text>{item.gender}</Text>
        </View>
        <View style={styles.cardItemsWrapper}>
          <Text style={styles.cardLabel}>Birth Year: </Text>
          <Text>{item.birth_year}</Text>
        </View>
      </View>
    ),
    [],
  );

  const peoplePages = [1, 2, 3, 4, 5];

  const RenderPageButton = useCallback(({count, key}) => {
    const onPageButtonPress = () => {
      setPageNumber(count);
    };
    return (
      <TouchableOpacity
        key={key}
        style={styles.pageButton}
        onPress={onPageButtonPress}
      >
        <Text style={[styles.screenTitle, labelStyle]}>{count}</Text>
      </TouchableOpacity>
    );
  }, []);

  const RenderPageButtons = useMemo(() => {
    return peoplePages.map((page, index) => (
      <React.Fragment key={index}>
        <RenderPageButton count={page} />
      </React.Fragment>
    ));
  }, [pageNumber, data]);

  return (
    <View style={[backgroundStyle]}>
      <Text style={[styles.screenTitle, labelStyle]}>Swapi People List</Text>
      <View style={styles.pageButtonsContainer}>
        <Text style={[styles.screenTitle, labelStyle, styles.pageLabel]}>
          Page
        </Text>
        {RenderPageButtons}
      </View>
      <Text style={[styles.currentPageLabel, labelStyle]}>{pageNumber}</Text>
      {isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={RenderCard}
          keyExtractor={({edited}) => edited}
        />
      )}
    </View>
  );
};

export {Home};

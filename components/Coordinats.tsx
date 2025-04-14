import {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import GetLocation from 'react-native-get-location';
import BackgroundTimer from 'react-native-background-timer';
import {useDispatch, useSelector} from 'react-redux';
import {setLatitude, setLongitude} from './store/coordinatsObjectSlice';
import {
  upCount,
  upMyCount,
  clearCount,
  clearMyCount,
} from './store/counterSlice';
import {pushGeoDates} from './store/coordinatsArray';
import type {RootState} from './store/store';

const Coordinats = () => {
  const [startGEOcoding, setStartGeocoding] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(0);

  const count = useSelector((state: RootState) => state.counter.count);
  const myCount = useSelector((state: RootState) => state.counter.myCount);
  const latitude = useSelector(
    (state: RootState) => state.coordinatsObject.latitude,
  );
  const longitude = useSelector(
    (state: RootState) => state.coordinatsObject.longitude,
  );
  const geoDateArray = useSelector(
    (state: RootState) => state.coordinatsArray.coordinatsArray,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId: number;
    if (startGEOcoding) {
      dispatch(upCount());
      intervalId = BackgroundTimer.setInterval(() => {
        dispatch(upCount());
        dispatch(pushGeoDates({latitude, longitude}));
      }, 5000);
      setTimer(intervalId);
    } else {
      BackgroundTimer.clearInterval(timer);
      dispatch(clearCount());
      dispatch(clearMyCount());
      dispatch(setLatitude(0));
      dispatch(setLongitude(0));
    }
    return () => {
      BackgroundTimer.clearInterval(timer);
    };
  }, [dispatch, startGEOcoding]);

  useEffect(() => {
    if (count > 0) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
      })
        .then(location => {
          dispatch(setLatitude(location.latitude));
          dispatch(setLongitude(location.longitude));
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
      dispatch(upMyCount());
    } else {
      dispatch(setLatitude(0));
      dispatch(setLongitude(0));
      return () => {
        dispatch(setLatitude(0));
        dispatch(setLongitude(0));
      };
    }
  }, [dispatch, count]);

  return (
    <View>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
      <Text>{count}</Text>
      <Text>{myCount}</Text>
      <Button
        title={!startGEOcoding ? 'Начать' : 'Закончить'}
        onPress={() => setStartGeocoding(!startGEOcoding)}
      />
      <Text>{startGEOcoding.toString()}</Text>
      {geoDateArray.map(
        (el: {latitude: number; longitude: number}, id: number) => {
          <View key={id}>
            <Text>{el.latitude}</Text>
            <Text>{el.longitude}</Text>;
          </View>;
        },
      )}
    </View>
  );
};

export default Coordinats;

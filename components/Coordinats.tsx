import {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import GetLocation from 'react-native-get-location';
import BackgroundTimer from 'react-native-background-timer';
import {useDispatch, useSelector} from 'react-redux';
import {
  upCount,
  upMyCount,
  clearCount,
  clearMyCount,
} from './store/counterSlice';
import type {RootState} from './store/store';

const Coordinats = () => {
  const [latitude, setLatidude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [startGEOcoding, setStartGeocoding] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(0);

  const count = useSelector((state: RootState) => state.counter.count);
  const myCount = useSelector((state: RootState) => state.counter.myCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (startGEOcoding) {
      dispatch(upCount());
      const intervalId = BackgroundTimer.setInterval(() => {
        dispatch(upCount());
      }, 5000);
      setTimer(intervalId);
    }
  }, [dispatch, startGEOcoding]);

  if (!startGEOcoding) {
    clearInterval(timer);
    dispatch(clearCount());
    dispatch(clearMyCount());
  }

  useEffect(() => {
    if (count > 0) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
      })
        .then(location => {
          setLatidude(location.latitude);
          setLongitude(location.longitude);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
      dispatch(upMyCount());
    } else {
      dispatch(clearMyCount());
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
    </View>
  );
};

export default Coordinats;

import {FC} from 'react';
import {Button, GestureResponderEvent} from 'react-native';

interface StartButtonPropsType {
  press: (event: GestureResponderEvent) => void;
  geo: boolean;
}

const StartButton: FC<StartButtonPropsType> = ({press, geo}) => {
  return <Button title={!geo ? 'Начать' : 'Закончить'} onPress={press} />;
};
export default StartButton;

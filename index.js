/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {YaMap, Geocoder} from 'react-native-yamap-ultraligth';

// Geocoder.init('471f67f0-791c-4f18-80e2-f9f599e8ea0d');
// YaMap.init('7a9a8ca9-cbde-4935-92a3-de47499bbfcb');

AppRegistry.registerComponent(appName, () => App);

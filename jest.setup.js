import 'react-native-gesture-handler/jestSetup';
import { NativeModules } from 'react-native';

NativeModules.SettingsManager = {
    settings: {},
    set: jest.fn(),
    get: jest.fn(),
};

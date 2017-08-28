## React Native CLI commands
- react-native run-android
- react-native run-ios

## Debugger
I set up a shortcut on my computer to enter debugging options screen instead of shaking phone:  Command + Option + E
https://medium.com/delivery-com-engineering/react-native-stop-shaking-your-phone-1f4863140146

## creating APK
creating apk (and deleting old apk)
- cd android && ./gradlew clean && ./gradlew assembleRelease

loading apk to phone
- cd .. && react-native run-android --variant=release


## Modules
- some packages include further instructions (see below) but many of these are
deprecated with the "react-native link" CLI command

- react-native-material-ui
https://www.npmjs.com/package/react-native-material-ui

- react-native-material-design (may end up not using this - does not seem well supported/tested)
https://github.com/react-native-material-design/react-native-material-design#installation


- react-native-vector-icons
   -- did not have to use rnpm as it is now a merged into React Native Core
   (just need to enter in CLI: <react-native link>)
https://github.com/oblador/react-native-vector-icons#installation

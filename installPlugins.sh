#/bin/bash
echo ------- install Badge plugin ------------
ionic cordova plugin add cordova-plugin-badge
npm install --save @ionic-native/badge

echo ------- install Calendar plugin ------------
ionic cordova plugin add cordova-plugin-calendar
npm install --save @ionic-native/calendar

echo ------- install Camera plugin ------------
ionic cordova plugin add cordova-plugin-camera
npm install --save @ionic-native/camera@3.2.0

echo ------- install Google Analytics plugin ------------
ionic cordova plugin add cordova-plugin-google-analytics
npm install --save @ionic-native/google-analytics

echo ------- install Market plugin ------------
ionic cordova plugin add cordova-plugin-market
npm install --save @ionic-native/market

echo ------- install Keyboard plugin ------------
ionic cordova plugin add ionic-plugin-keyboard
npm install --save @ionic-native/keyboard

echo ------- install Push plugin ------------
ionic cordova plugin add phonegap-plugin-push
npm install --save @ionic-native/push

echo ------- install CallNumber plugin ------------
ionic cordova plugin add call-number
npm install --save @ionic-native/call-number

echo ------- install Deeplink plugin ------------
ionic cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=NOUS-Ensemble --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=nous-ensemble.com --variable ANDROID_PATH_PREFIX=/
npm install --save @ionic-native/deeplinks

echo ------- install Storage plugin ------------
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

echo ------- install Moment ------------
npm install --save angular2-moment

echo ------- install angular animation ------------
npm install @angular/animations@latest --save


echo ------- install ionic img viewer ------------
npm i ionic-img-viewer@2.8.0 --save

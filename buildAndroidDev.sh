#/bin/bash
ionic cordova build android
cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./my-release-key.keystore android-release-unsigned.apk alias_name
rm android.apk
./zipalign -v 4 android-release-unsigned.apk android.apk


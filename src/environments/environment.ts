// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: 'https://platzi-store.herokuapp.com',
  url_ws: 'http://192.1.0.71/ACU_WS.NetEnvironment/rest',
  url_soap: 'http://192.1.0.71/ACU_WS.NetEnvironment/',
  firebase: {
    apiKey: 'AIzaSyDASAzo60dHc7rH1vR6jxzmtP_IoOSb58I',
    authDomain: 'platzi-store-139e7.firebaseapp.com',
    databaseURL: 'https://platzi-store-139e7.firebaseio.com',
    projectId: 'platzi-store-139e7',
    storageBucket: 'platzi-store-139e7.appspot.com',
    messagingSenderId: '81982978238',
    appId: '1:81982978238:web:76e170fade21a24ff986ef'
  }
};
/*

Url api desarrollo SQLServer:
  url_ws: 'http://192.1.0.86/ACU_WS.NetEnvironment/rest',
  url_soap: 'http://192.1.0.86/ACU_WS.NetEnvironment/',
URL api prod Oracle:

  url_ws: 'http://192.1.0.71/ACU_Web.NetEnvironment/rest',
  url_soap: 'http://192.1.0.71/ACU_Web.NetEnvironment/',

*/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

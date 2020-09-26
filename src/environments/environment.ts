// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  markerWs: "wss://localhost:5001/ws/marker",
  shareWS: "wss://localhost:5001/ws/sharing",
  documentWS: "wss://localhost:5001/ws/document",
  viewingWS: "wss://localhost:5001/ws/view",
  liveDrawWS: "wss://localhost:5001/ws/liveDraw",
  userApi: "https://localhost:5001",
  documentApi: "https://localhost:5001",
  markerApi: "https://localhost:5001",
  sharingApi: "https://localhost:5001"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

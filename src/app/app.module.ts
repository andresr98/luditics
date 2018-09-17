import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { HttpClientModule } from "@angular/common/http";

import { HomePage } from "../pages/home/home";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SeguimientosPage } from "../pages/seguimientos/seguimientos";
import { StudentProvider } from "../providers/student/student";
let pages = [MyApp, HomePage, SeguimientosPage];
@NgModule({
  declarations: pages,
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: pages,
  providers: [
    StatusBar,
    ScreenOrientation,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StudentProvider
  ]
})
export class AppModule {}

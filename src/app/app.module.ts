import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

//Importación de plugins nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

//Importación de modulo para conectividad http
import { HttpClientModule } from "@angular/common/http";

//Importación de las paginas.
import { HomePage } from "../pages/home/home";
import { SeguimientosPage } from "../pages/seguimientos/seguimientos";
import { TabsPage } from "../pages/tabs/tabs";
import { AssistancePage } from "../pages/assistance/assistance";
import { SelectGroupPage } from "../pages/select-group/select-group";
import { SettingsPage } from "../pages/settings/settings";
import { UbicationPage } from "../pages/ubication/ubication";

//Importación de servicios.
import { StudentProvider } from "../providers/student/student";
import { GroupProvider } from "../providers/group/group";

let pages = [
  MyApp,
  HomePage,
  SeguimientosPage,
  TabsPage,
  AssistancePage,
  SelectGroupPage,
  SettingsPage,
  UbicationPage
];

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
    StudentProvider,
    GroupProvider
  ]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Http, HttpModule, RequestOptions, XHRBackend } from "@angular/http";
import { MyApp } from "./app.component";
import { GlobalsProvider } from "../providers/globals/globals";
import { LoginProvider } from "../providers/login/login";
import { GoogleAnalytics } from "@ionic-native/google-analytics";
import { Push } from "@ionic-native/push";
import { Camera } from "@ionic-native/camera";
import { CallNumber } from "@ionic-native/call-number";
import { Geolocation } from "@ionic-native/geolocation";
//import {Diagnostic} from "@ionic-native/diagnostic";
import { MediaCapture } from "@ionic-native/media-capture";
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
//import { IOSFilePicker } from '@ionic-native/file-picker';
import { FilePath } from "@ionic-native/file-path";
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { Crashlytics } from '@ionic-native/fabric';

import { DocumentPicker } from "@ionic-native/document-picker";

import { InterceptorProvider } from "../providers/interceptor/interceptor";
import { IonicStorageModule } from "@ionic/storage";
import { Badge } from "@ionic-native/badge";
import { Nl2brModule } from "../pipes/nl2br/nl2br.module";
import { TruncateModule } from "../pipes/truncate/truncate.module";
import { MomentModule } from "angular2-moment";
import { Market } from "@ionic-native/market";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { CapitalizeModule } from "../pipes/capitalize/capitalize.module";
//Pages import
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { RegisterFirstPage } from "../pages/register-first/register-first";
import { RegisterLastPage } from "../pages/register-last/register-last";
import { CreateAssociationPage } from "../pages/create-association/create-association";
import { NewsPage } from "../pages/news/news";
import { CreateMerchantPage } from "../pages/create-merchant/create-merchant";
import { ForgetPasswordPage } from "../pages/forget-password/forget-password";
import { SearchResultPage } from "../pages/search-result/search-result";
import { DetailArticlePage } from "../pages/detail-article/detail-article";
import { AgendaPage } from "../pages/agenda/agenda";
import { MySpacePage } from "../pages/my-space/my-space";
import { MerchantSheetPage } from "../pages/merchant-sheet/merchant-sheet";
import { AssociationSheetPage } from "../pages/association-sheet/association-sheet";
import { EventDetailsPage } from "../pages/event-details/event-details";
import { ParameterPage } from "../pages/parameter/parameter";
import { SpaceAssoMerchPage } from "../pages/space-asso-merch/space-asso-merch";
import { PublicProfilePage } from "../pages/public-profile/public-profile";
import { NotificationPage } from "../pages/notification/notification";
import { ListArticlePage } from "../pages/list-article/list-article";
import { ParameterAssoMerchPage } from "../pages/parameter-asso-merch/parameter-asso-merch";
import { EditAssociationPage } from "../pages/edit-association/edit-association";
import { EditMerchantPage } from "../pages/edit-merchant/edit-merchant";
import { DeleteCitzenAccountFirstPage } from "../pages/delete-citzen-account-first/delete-citzen-account-first";
import { DeleteCitzenAccountLastPage } from "../pages/delete-citzen-account-last/delete-citzen-account-last";
import { ListEventPage } from "../pages/list-event/list-event";
import { NumberPage } from "../pages/number/number";
import { NumberCategoryPage } from "../pages/number-category/number-category";
import { AssociationListPage } from "../pages/association-list/association-list";
import { MerchantListPage } from "../pages/merchant-list/merchant-list";
import { PracticalInformationPage } from "../pages/practical-information/practical-information";
import { ContactPage } from "../pages/contact/contact";
import { HelpPage } from "../pages/help/help";
import { RgpdPage } from "../pages/rgpd/rgpd";
import { CguPage } from "../pages/cgu/cgu";
import { CityProjectsPage } from "../pages/city-projects/city-projects";
import { ChangeSuAdminPage } from "../pages/change-su-admin/change-su-admin";
import { DeleteAccountPage } from "../pages/delete-account/delete-account";
import { MapPage } from "../pages/map/map";
import { VolunteersPage } from "../pages/volunteers/volunteers";
import { AdminListPage } from "../pages/admin-list/admin-list";
import { AddAdminPage } from "../pages/add-admin/add-admin";
import { ButAlsoPage } from "../pages/butalso/butalso";
import { MyTownHallPage } from "../pages/my-town-hall/my-town-hall";
import { EmergencyPhonesPage } from "../pages/emergency-phones/emergency-phones";
import { ReprotProblemPage } from "../pages/reprot-problem/reprot-problem";
import { CanteenMenuPage } from "../pages/canteen-menu/canteen-menu";
import { ProposePage } from "../pages/propose/propose";
import { CommunitiesPage } from "../pages/communities/communities";
import { EmptyNewsPage } from "../pages/empty-news/empty-news";
import { DedicatedPage } from "../pages/dedicated/dedicated";
import { DetailSurveyPage } from "../pages/detail-survey/detail-survey";
import { ListGoodplanPage } from "../pages/list-goodplan/list-goodplan";
import { EditCommunityPage } from "../pages/edit-community/edit-community";

// providers
import { AppProvider } from "../providers/app/app";
import { UserProvider } from "../providers/user/user";
import { FilesProvider } from "../providers/files/files";

import { AssociationProvider } from "../providers/association/association";
import { MerchantProvider } from "../providers/merchant/merchant";
import { ArticleProvider } from "../providers/article/article";
import { EventsrestProvider } from "../providers/eventsrest/eventsrest";
import { CommentProvider } from "../providers/comment/comment";
import { VolunteersProvider } from "../providers/volunteers/volunteers";
import { Keyboard } from "@ionic-native/keyboard";
//plugins
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { Downloader } from "@ionic-native/downloader";
// native plugin
import { Calendar } from "@ionic-native/calendar";
import { EmojiPickerModule } from "@ionic-tools/emoji-picker";

import { LinkreplacePipe } from "../pipes/linkreplace/linkreplace";
// Pipe
import { GroupitemsPipe } from "../pipes/groupitems/groupitems";
import { OrderBy } from "../pipes/orderby/orderby";
import { CommunityProvider } from "../providers/community/community";
import { GoodplanrestProvider } from "../providers/goodplanrest/goodplanrest";
import { GoodPlanPage } from "../pages/good-plan/goodplan";
import { GoodPlanDetailsPage } from "../pages/good-plan-details/good-plan-details";
import { CacheProvider } from "../providers/cache/cache";
import { AdherentPage } from "../pages/adherent/adherent";
import { MerchantCardPage } from "../pages/merchant-card/merchant-card";
//import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FCM } from "@ionic-native/fcm";
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { SocialSharing } from "@ionic-native/social-sharing";
import localeFr from "@angular/common/locales/fr";
import { Deeplinks } from "@ionic-native/deeplinks";
import { ModerationPageModule } from "../pages/moderation/moderation.module";

import { ModerationPage } from "../pages/moderation/moderation";

registerLocaleData(localeFr);
export function intrceptorServiceFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions
) {
  return new InterceptorProvider(backend, defaultOptions);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterFirstPage,
    RegisterLastPage,
    CreateAssociationPage,
    NewsPage,
    CreateMerchantPage,
    ForgetPasswordPage,
    SearchResultPage,
    AgendaPage,
    GroupitemsPipe,
    OrderBy,
    DetailArticlePage,
    // ModerationPage,
    DetailSurveyPage,
    MerchantSheetPage,
    AssociationSheetPage,
    MySpacePage,
    EventDetailsPage,
    ParameterPage,
    SpaceAssoMerchPage,
    PublicProfilePage,
    NotificationPage,
    ListArticlePage,
    ParameterAssoMerchPage,
    EditAssociationPage,
    EditMerchantPage,
    EditCommunityPage,
    DeleteCitzenAccountFirstPage,
    DeleteCitzenAccountLastPage,
    ListEventPage,
    ListGoodplanPage,
    NumberPage,
    NumberCategoryPage,
    AssociationListPage,
    MerchantListPage,
    PracticalInformationPage,
    ContactPage,
    HelpPage,
    RgpdPage,
    CguPage,
    CityProjectsPage,
    ChangeSuAdminPage,
    DeleteAccountPage,
    MapPage,
    VolunteersPage,
    AdminListPage,
    AddAdminPage,
    ButAlsoPage,
    MyTownHallPage,
    EmergencyPhonesPage,
    ReprotProblemPage,
    LinkreplacePipe,
    CanteenMenuPage,
    ProposePage,
    EmptyNewsPage,
    CommunitiesPage,
    DedicatedPage,
    GoodPlanPage,
    GoodPlanDetailsPage,
    AdherentPage,
    MerchantCardPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    Nl2brModule,
    ModerationPageModule,
    TruncateModule,
    IonicImageViewerModule,
    BrowserAnimationsModule,
    CapitalizeModule,
    EmojiPickerModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: "",
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false,
      autocomplete: "on",
      autocorrect: "on",
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterFirstPage,
    RegisterLastPage,
    CreateAssociationPage,
    NewsPage,
    CreateMerchantPage,
    ForgetPasswordPage,
    SearchResultPage,
    AgendaPage,
    DetailArticlePage,
    ModerationPage,
    DetailSurveyPage,
    MerchantSheetPage,
    AssociationSheetPage,
    MySpacePage,
    EventDetailsPage,
    ParameterPage,
    SpaceAssoMerchPage,
    PublicProfilePage,
    NotificationPage,
    ListArticlePage,
    ParameterAssoMerchPage,
    EditAssociationPage,
    EditCommunityPage,
    EditMerchantPage,
    DeleteCitzenAccountFirstPage,
    DeleteCitzenAccountLastPage,
    ListEventPage,
    ListGoodplanPage,
    NumberPage,
    NumberCategoryPage,
    AssociationListPage,
    MerchantListPage,
    PracticalInformationPage,
    ContactPage,
    HelpPage,
    RgpdPage,
    CguPage,
    CityProjectsPage,
    ChangeSuAdminPage,
    DeleteAccountPage,
    MapPage,
    VolunteersPage,
    AdminListPage,
    AddAdminPage,
    ButAlsoPage,
    MyTownHallPage,
    EmergencyPhonesPage,
    ReprotProblemPage,
    CanteenMenuPage,
    ProposePage,
    EmptyNewsPage,
    CommunitiesPage,
    DedicatedPage,
    GoodPlanPage,
    GoodPlanDetailsPage,
    AdherentPage,
    MerchantCardPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalsProvider,
    {
      provide: Http,
      useFactory: intrceptorServiceFactory,
      deps: [XHRBackend, RequestOptions],
    },
    UserProvider,
    LoginProvider,
    AssociationProvider,
    MerchantProvider,
    GoogleAnalytics,
    Push,
    FCM,
    Deeplinks,
    Badge,
    Camera,
    Calendar,
    ArticleProvider,
    EventsrestProvider,
    CacheProvider,
    GoodplanrestProvider,
    AppProvider,
    CommentProvider,
    Market,
    AppProvider,
    CallNumber,
    Geolocation,
    //FileOpener,
    //Diagnostic,
    VolunteersProvider,
    Keyboard,
    InAppBrowser,
    CommunityProvider,
    SocialSharing,
    CacheProvider,
    MediaCapture,
    File,
    FileChooser,
    DocumentPicker,
    // IOSFilePicker,
    FilePath,
    // FileTransfer,
    //FileTransferObject,
    Downloader,
    // Crashlytics
    FilesProvider,
  ],
})
export class AppModule {}

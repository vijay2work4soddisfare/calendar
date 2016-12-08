import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as firebase from 'firebase';
import { AuthMethods , AngularFireModule , AuthProviders } from 'angularfire2';
import { AppComponent } from './app.component';
 const config = {
    apiKey: "AIzaSyCdrs4VGJ13RzmWYo6jwXo7d97AYiTwg7g",
    authDomain: "some-proj-a67b1.firebaseapp.com",
    databaseURL: "https://some-proj-a67b1.firebaseio.com",
    storageBucket: "some-proj-a67b1.appspot.com",
    messagingSenderId: "77747182675"
  };
  const auth={
  	provider: AuthProviders.Google,
  	method: AuthMethods.Redirect
  };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp( config , auth)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

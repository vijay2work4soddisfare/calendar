import { Component } from '@angular/core';
import { Http,Headers,Request, RequestOptions } from '@angular/http';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  acc;
  lat;
  lon;
  title = 'app works!';
  isIn=false;
  cred;
  clientId="58494247944-4cqj9r3e1jt1oirlat10v1p1bfv4c3m2.apps.googleusercontent.com";
  scope="https://www.googleapis.com/auth/calendar";
  access_type="offline";
  constructor(public http:Http, private af:AngularFire){
  	navigator.geolocation.getCurrentPosition((position)=>{
		  	this.lat=position.coords.latitude;
		  	this.lon=position.coords.longitude;
		  	this.acc=position.coords.accuracy;
  		}, this.error);
  }
  clicked(){
  	//this.af.auth.login();
  	var provider=new firebase.auth.GoogleAuthProvider();
  	provider.addScope('https://www.googleapis.com/auth/calendar');
  	firebase.auth().signInWithPopup(provider).then(result=>{
  		//console.log(result.credential);
  		this.cred=result.credential;
  		this.isIn=true;
  		this.header.append('Authorization', 'Bearer '+this.cred.accessToken);
  		this.list();
  	});
  }
  header=new Headers;
  listDisp;
  listDispBody;
  listDispBodyItem;
  list(){
  	this.http.get("https://www.googleapis.com/calendar/v3/calendars/primary/events",{
  		headers:this.header
  	})
  	  .subscribe(response=>{
  	  	console.log(response);
  	  	this.listDisp=response;
  	  	this.listDispBody=this.listDisp._body;
  	  	var jsonText=JSON.parse(this.listDispBody);
  	  	this.listDispBodyItem=jsonText.items;
  	  	console.log(this.listDispBodyItem);
	  	  if(Object.keys(this.listDispBodyItem).length==0) {
	  	  	this.errrrr="No events in the list";
	  	  }else{
	  	  	this.errrrr=' ';
	  	  }
  	  });
  }
  errrrr=' ';
  logout(){
  	firebase.auth().signOut().then(response=>{
	  	this.isIn=false;
  	});
  }
  success(position){
  	this.lat=position.coords.latitude;
  	this.lon=position.coords.longitude;
  	this.acc=position.coords.accuracy;
  }
  error(){

  }
  createEvents(sum,to,desc){
  	var d=new Date();
  	//d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'T'+d.getTime()+'-07:00'
  	var event = {
	  'summary': sum,
	  'location': this.lat+","+this.lon+","+this.acc,
	  'description': "desc",
	  'start': {
	    'dateTime': '2016-08-08T17:00:00-07:00',
	    'timeZone': 'America/Los_Angeles'
	  },
	  'end': {
	    'dateTime': '2017-01-09T17:00:00-07:00',
	    'timeZone': 'America/Los_Angeles'
	  },
	  'recurrence': [
	    'RRULE:FREQ=DAILY;COUNT=1'
	  ],
	  'attendees': [
	    //{'email': 'lpage@example.com'},
	    {'email': to}
	  ],
	  'reminders': {
	    'useDefault': false,
	    'overrides': [
	      {'method': 'email', 'minutes': 24 * 60},
	      {'method': 'popup', 'minutes': 10}
	    ]
	  }
	};
	var i=1;
	var iii=setInterval(()=>{
		console.log(this.lat); 
		if(this.lat!=null && i==1) {
		    this.http.post("https://www.googleapis.com/calendar/v3/calendars/primary/events",
				event
				,{
					headers:this.header,
				})
			  	.subscribe(response=>{
			  		console.log(response);
  					this.list();
		  	  });
			clearInterval(iii);
			i++;
		}
	});
  }
  delete(id){
  	this.http.delete('https://www.googleapis.com/calendar/v3/calendars/primary/events/'+id,{
					headers:this.header,
				}).subscribe(response=>{
  		console.log(response);
  		this.list();
  	});
  }
}
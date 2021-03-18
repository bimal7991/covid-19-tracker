import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {map} from 'rxjs/operators'
import { GlobalData } from '../models/global-data';
import { dateData } from '../models/golbal-date';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
   golbalSub=new Subject<GlobalData[]>();



    data:GlobalData[]=[];
   url='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
   dateWisUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
  constructor(private http:HttpClient) { }

 getDataDatewise(){
   return this.http.get(this.dateWisUrl,{responseType:'text'}).pipe(map(res=>{
    let mainData={};
    let rows=res.split('\n');
    let header=rows[0];
    let dates=header.split(',');
    console.log(dates);
    dates.splice(0,4);
    //console.log(headerValues);
    rows.splice(0,1);
  rows.forEach(row=>{
    let cols=row.split(',');
    let con=cols[1];
    mainData[con]=[];
    cols.splice(0,4);
    //console.log(con,cols);
    cols.forEach((value,index)=>{
      let dw:dateData={
        cases:+value,
        country:con,
        date:new Date(Date.parse(dates[index]))
      }

    mainData[con].push(dw);

    })
  })

  return mainData;
  //console.log(mainData);
   }));
 }

  getGlobalData(){
    let date=new Date();
    date.setDate(date.getDate()-2)
     console.log(date);
    let day=date.toISOString().substring(8,10);
    let month=date.getMonth()+1;
    let year=date.getFullYear();
   //console.log(month)
    let ad=null;
    if(month<10)
      {
         ad="0"+month+"-"+day+"-"+year+".csv";
      }
      else{
        ad=month+"-"+day+"-"+year+".csv";
      }
    console.log(ad);
     return this.http.get(this.url+ad,{responseType:'text'}).pipe(map(res=>{
       let rows=res.split('\n');
       let row:any={};      // key=country value={country,confirmed,deths,active,recovers}
      // row[key]=value;
       //console.log(rows);
       rows.splice(0,1);
       rows.forEach(rownum=>{
         let cols=rownum.split(/,(?=\S)/);
        // console.log(cols);
         let cs={                       // india  value={india,3,4,5,6};
           country:cols[3],            // india    value={india,5,6,7,8}
           confirmed:+cols[7],
           deaths:+cols[8],
           recovered:+cols[9],
           active:+cols[10]
         };
         let temp:GlobalData=row[cs.country];

         if(temp){
           temp.confirmed=temp.confirmed+cs.confirmed;
           temp.deaths=temp.deaths+cs.deaths;
           temp.recovered=temp.recovered+cs.recovered;
           temp.active=temp.active+cs.active;
           row[cs.country]=temp;
         }
         else{
           row[cs.country]=cs;
         }
       })
     // console.log(row);
     // this.golbalSub.next(<GlobalData[]>Object.values(row));
      this.data=<GlobalData[]>Object.values(row);
      return <GlobalData[]>Object.values(row);
     }))
  }

  getUpdatedData(){
        return this.golbalSub.asObservable();
  }


}

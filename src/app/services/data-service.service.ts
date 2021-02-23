import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


   url='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-16-2021.csv';
  constructor(private htttp:HttpClient) { }
  
  getGlobalData(){
     return this.htttp.get(this.url,{responseType:'text'}).pipe(map(res=>{

       let rows=res.split('\n');
       //console.log(rows);
       rows.forEach(row=>{
         let cols=row.split(/,(?=\S)/);
         console.log(cols);
         
       })
      return res;
     }))
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GlobalData } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { GoogleChartInterface } from 'ng2-google-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private dataService:DataServiceService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }


  totalConfirmed:number=0;
  totalDeaths:number=0;
  totalRecovered:number=0;
  totalActive:number=0;
  globalData:GlobalData[]=[]
  public pieChartOptions: ChartOptions = {
    responsive: true
  };



  public pieChartLabels:Label[]=[

  ];
  public pieChartData : SingleDataSet = [];


  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];


  country=[]

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  }

  val="confirmed";
  ngOnInit() {
    this.dataService.getGlobalData().subscribe(
      {
        next:(res)=>{
          // console.log(res);
           this.globalData=res;
           this.globalData.forEach(data=>{
                  this.country.push(data.country)
             if(!Number.isNaN(data.confirmed)){
                this.totalConfirmed=this.totalConfirmed+data.confirmed;
                this.totalDeaths=this.totalDeaths+data.deaths;
                this.totalRecovered=this.totalRecovered+data.recovered;
                this.totalActive=this.totalActive+data.active;
             }
           })
           this.initChart();
         }
      })
  }

  updateChart(event: Event){
    const val= (<HTMLInputElement> event.target).value;
    console.log(val);
  this.val=val;

   //  this.initChart(val);
    // this.ngOnInit();
    this.initChart();


  }
  initChart(){
   // this.ngOnInit();
   this.pieChart=null;
   this.columnChart=null;
  let  val=this.val;
    let dataTable=[]
    console.log(val);

    let value=0;
    const labels=[];
    const data=[];
    dataTable.push(['Country','Cases']);
    this.globalData.forEach(cs=>{

      if(cs.confirmed>200000 && val=='confirmed'){
        dataTable.push([cs.country,cs.confirmed]);
        labels.push(cs.country);
        data.push(cs.confirmed);
      }
      else if(cs.confirmed>200000 && val=='deaths'){
        dataTable.push([cs.country,cs.deaths]);
        labels.push(cs.country);
        data.push(cs.deaths);
      }
      else if(cs.confirmed>200000 && val=='recovered'){
        dataTable.push([cs.country,cs.recovered]);
        labels.push(cs.country);
        data.push(cs.recovered);
      }
      else if(cs.confirmed>200000 && val=='active'){
        dataTable.push([cs.country,cs.active]);
        labels.push(cs.country);
        data.push(cs.active);
      }
    })

    //console.log(dataTable);

    this.pieChartLabels=labels;
    this.pieChartData=data;

    this.pieChart={
      chartType: 'PieChart',
      dataTable:[...dataTable],
      options:{
            height:500
      }
    }
    //console.log(dataTable);
    this.columnChart={
      chartType: 'ColumnChart',
      dataTable:dataTable,
      options:{
            height:500
      }
    }
  }
}



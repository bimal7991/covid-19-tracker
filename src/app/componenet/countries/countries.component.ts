import { Component, Input, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalData } from 'src/app/models/global-data';
import { dateData } from 'src/app/models/golbal-date';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {


  public lineChartData: ChartDataSets[] = [

  ];
  public lineChartLabels: Label[] = [];

  public lineChartColors: Color[] = [

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];




  constructor(private dataService:DataServiceService) { }
  globalData:GlobalData[]=[];
  @Input()
  totalConfirmed:number=0;
  @Input()
  totalDeaths:number=0;
  @Input()
  totalRecovered:number=0;
  @Input()
  totalActive:number=0;
  country=[];
  public lineChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable:[]
  }

  selectedCountryData:dateData[];
  dateWiseData;
  ngOnInit(): void {
     this.dataService.getDataDatewise().subscribe(result=>{
       this.dateWiseData=result;
      // console.log(result);
         this.updateStatus("India")
           this.updateChart();
     })
    this.dataService.getGlobalData().subscribe(res=>{
      // console.log(res);
       this.globalData=res;
       this.country.push("None");
       this.globalData.forEach(data=>{
         if(!Number.isNaN(data.confirmed)){
            this.country.push(data.country);
         }
       })
           this.updateStatus("India");

     });
  }

  updateChart(){

    let dataTa=[];
    let data=[];
    let labes=[];
    dataTa.push(['Date','Cases']);
    this.selectedCountryData.forEach(c=>{

      data.push(c.date);
      labes.push(c.cases);
      dataTa.push([c.date,c.cases]);
    })

    this.lineChartData=data;
    this.lineChartLabels=labes;
    this.lineChart.dataTable=dataTa;
  }

  updateStatus(event:Event | string){
    let country='';
    if(typeof event=='string'){
     country=event;
    }
    else{
     country=(<HTMLInputElement>event.target).value;
    }
    console.log(country);
    this.globalData.forEach(c=>{
      if(c.country==country){
        this.totalConfirmed=c.confirmed;
        this.totalDeaths=c.deaths;
        this.totalRecovered=c.recovered;
        this.totalActive=c.active;
      }
    })

    this.selectedCountryData=this.dateWiseData[country];
    this.updateChart();
  }
}

import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'signalR-client';

  chartOptions: ChartConfiguration['options']  ={
    responsive: true,
    scales:{
      y:{
        min:0
      }
    }
  };
  chartLabels: string[] = ['Real time data for the chart'];
  chartType : ChartType = 'bar';
  chartLegend : boolean = true;

  constructor(public signalRService: SignalrService,
      private http : HttpClient)
  {

  }

  ngOnInit(){
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addBroadCastChartDataListener();
    this.getChartData();
  }

  getChartData(){
    this.http.get('http://localhost:5041/api/chart').subscribe(
      respo =>{
        console.log(respo);
        
      }
    )
  }

  public chartClicked = (event: any) => {
    console.log('event chart click : ' + event);
    
    this.signalRService.broadCastChartData();
  }
}

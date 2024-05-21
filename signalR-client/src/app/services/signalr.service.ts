import { Injectable } from '@angular/core';
import { ChartModel } from '../_model/ChartModel';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public data : ChartModel[] | undefined;
  public broadCastData : ChartModel[] | undefined;
  private hubConnection : signalR.HubConnection | undefined;

  constructor() {
    
   }

  

    public startConnection = () =>
    {
      this.hubConnection = new signalR.HubConnectionBuilder()
                                      .withUrl('http://localhost:5041/chart')
                                      .build();
      this.hubConnection?.start()
            .then(() => console.log('Connection Started!'))
            .catch(err => console.log('Error '+ err));        
        
    }

    public addTransferChartDataListener = () =>
    {
      if(this.hubConnection){
        this.hubConnection.on('transferchartdata', (data) =>{
          this.data = data;
          //console.log(data);
          
        });
      }                    
    }  
    
    public broadCastChartData = () =>{
      
        const broadCastData = this.data?.map( resp => {
          console.log('signalr service broadCastChartData');
          
            const temp = {
              data : resp.data,
              label : resp.label
            }
            return temp;
          
        });
        console.log(broadCastData);
        this.hubConnection?.invoke('broadcastchartdata', broadCastData)
        .catch(err => console.log(err));
    }                     
    

    public addBroadCastChartDataListener(){
      this.hubConnection?.on('broadcastchartdata', (chartData)=>{
        this.broadCastData = chartData;
        console.log('client data : \r\n'+ JSON.stringify(this.broadCastData));
        
      })
    }
}

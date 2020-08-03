import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VotationRoomService } from 'src/app/services/votation-room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.css']
})
export class ResultChartComponent implements OnInit{

  public showReport = false;
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public max;
  public winners = [];


  public chartColors: Array<any> = [
    {
      backgroundColor: ['#00A5E3', '#FC6238', '#FF5768', '#4DD091', '#FFEC59', '#FF6F68', '#8DD7BF', '#74737A', '#0065A2', '#E77577'],
      borderWidth: 2,
    }
  ];

  @Input("id")
  public roomId;


  constructor(private _vrs: VotationRoomService){
  }

  ngOnInit(){
    console.log(this.roomId);
    this.setUp();
  }

  winnersToString(){
    let retorno = ""

    for (let i =0; i <this.winners.length; i++){
      if(i + 1 == this.winners.length){
        retorno += this.winners[i];
      }
      else{
        retorno += this.winners[i] + ", ";
      }
    }

    return retorno
  }

  setUp(){
    console.log(this.roomId)
    this._vrs.listVoterInRoomThatVoted(this.roomId).subscribe(
      data => {
        if (data.length > 0){
          this.showReport = true;
          this.max = 0;
          this.winners = []
        }
        else{
          return
        }
        for (let i = 0; i < data.length; i++){
          let label = data[i].vote;
          this.check(label);
        }
      }
    )
  }

  check(label){
    let exist = this.doughnutChartLabels.findIndex(x => x == label);
    if (exist != -1){
      this.doughnutChartData[exist] += 1;

      if (this.doughnutChartData[exist] > this.max){
        this.max = this.doughnutChartData[exist];
        this.winners = [label];
      }
      else if (this.doughnutChartData[exist] == this.max){
        this.winners.push[label];
      }
    }
    else{
      this.doughnutChartLabels.push(label);
      this.doughnutChartData.push(1);

      if (1 > this.max){
        this.max = 1;
        this.winners = [label];
        console.log(this.winners)
      }
      else if (1 == this.max){
        this.winners.push(label);
        console.log(this.winners)
      }
    }

  }

  public chartClicked(e:any): void{
  }

  public chartHovered(e:any): void{
  }
}
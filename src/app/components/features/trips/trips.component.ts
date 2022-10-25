import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  public p:number = 1;
  public trip;
  public status;

  constructor(private _tripServicetab: TripsService,) { }

  ngOnInit(): void {
      this.getTrip();
  }
  getTrip(){
    this._tripServicetab.getTrip().subscribe(
      response =>{
        console.log(response)
        this.status=response.status
        this.trip = response.data;
       console.log(this.status)
      }, error =>{

      }
    )
  }

}

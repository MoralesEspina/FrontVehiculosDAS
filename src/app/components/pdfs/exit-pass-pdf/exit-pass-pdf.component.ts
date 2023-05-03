import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exitPassI } from 'src/app/models/exitPass.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-exit-pass-pdf',
  templateUrl: './exit-pass-pdf.component.html',
  styleUrls: ['./exit-pass-pdf.component.css']
})
export class ExitPassPdfComponent implements OnInit {
  public id_entrada:any;
  public pass:any;
  constructor( private router: ActivatedRoute, 
    private _tripService: TripsService) {
      this.pass = new exitPassI('','','','','','','','','','','',)
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id']; 
    this.getExitPass()
  }

   getExitPass() {
    this._tripService.getOneExitPass(this.id_entrada,'local').subscribe(
      response => {
        this.pass = response.data[0];
      }, error => {

      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exit-pass-pdf',
  templateUrl: './exit-pass-pdf.component.html',
  styleUrls: ['./exit-pass-pdf.component.css']
})
export class ExitPassPdfComponent implements OnInit {
  public id_entrada:any;
  
  constructor( private router: ActivatedRoute) {
    this.id_entrada = this.router.snapshot.params['id']; 
  }

  ngOnInit(): void {
  }

}

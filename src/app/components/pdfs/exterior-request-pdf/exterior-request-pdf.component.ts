import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { ExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { DetailExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-exterior-request-pdf',
  templateUrl: './exterior-request-pdf.component.html',
  styleUrls: ['./exterior-request-pdf.component.css']
})
export class ExteriorRequestPdfComponent implements OnInit {

  public request:any;
  public detailRequest:any;
  public fuel:boolean = false;
  public viatic:boolean = false;
  public status:boolean = false;
  public id_entrada:any;
  constructor(  private _exteriorRequestService:ExteriorRequestService,
                private router: ActivatedRoute) {
    this.request = new ExteriorRequestI('','','','','','','',0,0,'','','','')
    this.id_entrada = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getOneExteriorRequest()
  }

  getOneExteriorRequest(){
    this._exteriorRequestService.getOneExteriorRequestComplete(this.id_entrada).subscribe(
      response =>{
        this.request = response.data.request[0];
        this.detailRequest = response.data.detailRequest;
        if (this.request.provide_fuel == 2) {
          this.fuel = true;
        }
        if (this.request.provide_travel_expenses == 2) {
          this.viatic = true;
        }
        if (this.request.status_request == 7) {
          this.status = true;
        }
      }, error =>{

      }
    )
  }

  public downloadPDF(): void {
    const DATA:any = document.getElementById('Data');
    const doc = new jsPDF('landscape', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 5;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save('Solicitud_Exterior_'+this.id_entrada);
    });
  }
}

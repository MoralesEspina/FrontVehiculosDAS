import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RequestlocalService } from 'src/app/services/requestLocal.service';
import { LocalRequestI } from 'src/app/models/localRequest.interface';
import { DetailLocalRequestI } from 'src/app/models/detailLocalRequest.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-local-request-pdf',
  templateUrl: './local-request-pdf.component.html',
  styleUrls: ['./local-request-pdf.component.css']
})
export class LocalRequestPdfComponent implements OnInit {

  public request;
  public detailRequest;
  public status:boolean = false;
  public id_entrada;
  constructor(  private _localRequestService:RequestlocalService,
                private router: ActivatedRoute) {
    this.request = new LocalRequestI('','','','','','','',0,'',[])
    this.detailRequest = new DetailLocalRequestI('','','','',0,'')
    this.id_entrada = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getOneLocalRequest();
  }

  getOneLocalRequest(){
    this._localRequestService.getOneRequestLocal(this.id_entrada).subscribe(
      response =>{
        this.request = response.data.request[0];
        this.detailRequest = response.data.detailRequest;
        console.log(this.request)
        console.log(this.detailRequest)
      }, error =>{

      }
    )
  }

  public downloadPDF(): void {
    const DATA:any = document.getElementById('Data');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      console.log(pdfHeight)
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save('Solicitud_Local_'+this.id_entrada);
    });
  }

}

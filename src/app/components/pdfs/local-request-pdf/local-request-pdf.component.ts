import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LocalRequestService } from 'src/app/services/localRequest.service';
import { LocalRequestI } from 'src/app/models/localRequest.interface';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  public isLoad: boolean = false;
  public imagenSrc;
  constructor(  private _localRequestService:LocalRequestService,
                private router: ActivatedRoute,
                private _sweetAlertService: SweetAlertService,
                private sanitizer: DomSanitizer) {
    this.request = new LocalRequestI('','','','','','','','','','','','',[])
    this.id_entrada = this.router.snapshot.params['id'];
    this.imagenSrc = this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/logo-mspas.png');
  }

  ngOnInit(): void {
    this.getOneLocalRequest();
  }

  getOneLocalRequest(){
    this._localRequestService.getOneLocalRequest(this.id_entrada,'complete').subscribe(
      response =>{
        this.request = response.data.request[0];
        this.detailRequest = response.data.detailRequest;
        this.isLoad = true;
      }, error =>{
        this._sweetAlertService.error('No se pudo cargar la información correctamente')
        this.isLoad = true;
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

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save('Solicitud_Local_'+this.id_entrada);
    });
  }

}

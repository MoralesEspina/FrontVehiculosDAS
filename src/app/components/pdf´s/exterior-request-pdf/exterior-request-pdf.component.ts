import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { ExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { DetailExteriorRequestI } from 'src/app/models/detailExteriorRequest.interface';


@Component({
  selector: 'app-exterior-request-pdf',
  templateUrl: './exterior-request-pdf.component.html',
  styleUrls: ['./exterior-request-pdf.component.css']
})
export class ExteriorRequestPdfComponent implements OnInit {

  public request;
  public detailRequest;
  constructor(private _exteriorRequestService:ExteriorRequestService,) {
    this.request = new ExteriorRequestI('','','','','','','',0,0,'','','')
    this.detailRequest = new DetailExteriorRequestI('','','','','','','')
  }

  ngOnInit(): void {
    this.getOneExteriorRequest()
  }

  getOneExteriorRequest(){
    this._exteriorRequestService.getOneRequestExterior(3).subscribe(
      response =>{
        this.request = response.data.request[0];
        this.detailRequest = response.data.detailRequest;
      }, error =>{

      }
    )
  }
  public downloadPDF(): void {
    const DATA:any = document.getElementById('Data');
    const doc = new jsPDF('landscape', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 1
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 5;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      console.log(pdfHeight)
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'SLOW');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
  /*public downloadPDF(){
    var doc = new jsPDF('l','pt','letter');
    var margin = 10;
    var scale = (doc.internal.pageSize.width - margin * 2)/
    document.body.scrollWidth;
    doc.html(document.body),{
      x: margin,
      y: margin,
      html2canvas: {
        scale: scale,
      },
      callback: function(doc){
        doc.output('dataurlnewwindows',{filename: `${new Date().toISOString()}_tutorial.pdf`});
      }
    }
  }*/
}

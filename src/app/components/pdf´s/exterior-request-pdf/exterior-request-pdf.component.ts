import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';


@Component({
  selector: 'app-exterior-request-pdf',
  templateUrl: './exterior-request-pdf.component.html',
  styleUrls: ['./exterior-request-pdf.component.css']
})
export class ExteriorRequestPdfComponent implements OnInit {

  public request;
  constructor(private _exteriorRequestService:ExteriorRequestService,) { }

  ngOnInit(): void {
  }

  getExteriorRequest(){
    this._exteriorRequestService.getRequestExterior().subscribe(
      response =>{
        console.log(response)
        this.request = response.data;
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
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      console.log(pdfHeight)
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
}

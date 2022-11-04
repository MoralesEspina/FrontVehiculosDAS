import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-voucher-regular-pdf',
  templateUrl: './voucher-regular-pdf.component.html',
  styleUrls: ['./voucher-regular-pdf.component.css']
})
export class VoucherRegularPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      docResult.save('Vale de Combustible');
    });
  }
}

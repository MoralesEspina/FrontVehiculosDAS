import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exitPassI } from 'src/app/models/exitPass.interface';
import { TripsService } from 'src/app/services/trips.service';
import { PdfMakeWrapper, Txt, Table, Cell, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

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
      this.pass = new exitPassI('','','','','','','','','','','')
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    console.log(this.id_entrada)
    this.getExitPass()
  }

   getExitPass() {
    this._tripService.getOnePDF(this.id_entrada,'exitpass').subscribe(
      response => {
        this.pass = response.data[0];
      }, error => {
      }
    )
  }

  downloadPDF(){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper()
    pdf.pageSize('A5');

    pdf.add(new Table([
      [new Cell(new Txt('MINISTERIO DE SALUD PUBLICA Y ASISTENCIA SOCIAL').end).fontSize(12).alignment('center').margin(10).bold().end],
      [new Cell(new Txt('PASE DE SALIDA DE VEHICULOS NO. '+ this.pass.idexit_pass).end).fontSize(12).alignment('center').margin(10).bold().end],
    ]).layout({
    })
      .widths('*')
      .heights(25)
      .end)

    pdf.add(new Table([
        [null]
      ]).layout({
      })
        .widths('*')
        .heights(40)
        .end)

    pdf.add(new Txt('MARCA DE VEHICULO: ').fontSize(7).relativePosition(5,-40).end)
    pdf.add(new Txt(this.pass.brand).fontSize(7).relativePosition(78,-40).end)
    pdf.add(new Txt('__________________________').fontSize(7).relativePosition(78  ,-39).end)

    pdf.add(new Txt('PILOTO DE COMISIÓN: ').fontSize(7).relativePosition(165  ,-40).end)
    pdf.add(new Txt(this.pass.fullname).fontSize(7).relativePosition(240,-40).end)
    pdf.add(new Txt('______________________________').fontSize(7).relativePosition(240  ,-39).end)

    pdf.create().open();
  }
}

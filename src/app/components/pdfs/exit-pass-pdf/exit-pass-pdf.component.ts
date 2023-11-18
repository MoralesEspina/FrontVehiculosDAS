import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exitPassI } from 'src/app/models/exitPass.interface';
import { TripsService } from 'src/app/services/trips.service';
import { PdfMakeWrapper, Txt, Table, Cell, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import * as dayjs from "dayjs";
import 'dayjs/locale/es'

@Component({
  selector: 'app-exit-pass-pdf',
  templateUrl: './exit-pass-pdf.component.html',
  styleUrls: ['./exit-pass-pdf.component.css']
})
export class ExitPassPdfComponent implements OnInit {
  public id_entrada:any;
  public pass:any;
  public isLoad: boolean = false;
  constructor(  private router: ActivatedRoute,
                private _tripService: TripsService,
                private _sweetAlertService: SweetAlertService) {
      this.pass = new exitPassI('','','','','','','','','','','')
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    this.getExitPass()
  }

   getExitPass() {
    this._tripService.getOnePDF(this.id_entrada,'exitpass').subscribe(
      response => {
        this.pass = response.data[0];
        this.isLoad = true;
      }, error => {
        this._sweetAlertService.error('No se pudo cargar la información del pase de salida' + error)
        this.isLoad = true;
      }
    )
  }

  downloadPDF(){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper()
    pdf.pageSize('A5');

    pdf.add(new Table([
      [new Cell(new Txt('MINISTERIO DE SALUD PUBLICA Y ASISTENCIA SOCIAL').end).fontSize(12).alignment('center').colSpan(4).margin(10).bold().end, null, null, null],
      [new Cell(new Txt('PASE DE SALIDA DE VEHICULOS NO. '+ this.pass.idexit_pass).end).fontSize(12).alignment('center').colSpan(4).margin(10).bold().end, null, null, null],
      [new Cell(new Txt('').end).colSpan(4).end,null, null, null],
      [new Cell(new Txt('TIPO DE VEHICULO: '+this.pass.type_name).end).fontSize(10).alignment('left').colSpan(4).margin([5,3,0,5]).bold().end, null, null, null],
      [new Cell(new Txt('PLACAS: '+ this.pass.plate).end).fontSize(10).alignment('left').colSpan(4).margin([5,3,0,5]).bold().end, null, null, null],
      [new Cell(new Txt('DATOS DE SALIDA Y ENTRADA DE VEHICULO').end).fontSize(10).alignment('center').colSpan(4).margin(5).bold().end, null, null, null],
      [null, new Cell(new Txt('SALIDA').end).fontSize(10).alignment('center').margin([0,15,0,15]).bold().end,
      new Cell(new Txt('ENTRADA').end).fontSize(10).alignment('center').margin([0,15,0,15]).bold().end,
      new Cell(new Txt('OBSERVACIONES (LLENADO EXCLUSIVO DE ASISTENTE DE SEGURIDAD)').end).fontSize(9).alignment('center').margin(5).bold().end],

      [new Cell(new Txt('FECHA').end).fontSize(10).alignment('left').margin([0,15,0,15]).bold().end,
      new Cell(new Txt([dayjs(this.pass.first_date).locale("ES").format('DD MMM YYYY').replace(/\b\w/g, l => l.toUpperCase())]).end).fontSize(9).alignment('center').margin([0,15,0,15]).bold().end,null,null],

      [new Cell(new Txt('HORA').end).fontSize(9).alignment('left').margin([0,15,0,15]).bold().end,
      new Cell(new Txt(this.pass.first_hour).end).fontSize(10).alignment('center').margin([0,15,0,15]).bold().end,null,null],

      [new Cell(new Txt('KILOMETRAJE').end).fontSize(9).alignment('left').margin([0,15,0,15]).bold().end,
      new Cell(new Txt(this.pass.km).end).fontSize(10).alignment('center').margin([0,15,0,15]).bold().end,null,null],
      [new Cell(new Txt('').end).colSpan(4).end,null, null, null],

    ]).layout({
    })
      .widths([60,60,60,124])
      .heights([25,25,40,20,20,20,27,27,27,27,110])
      .end)

    pdf.add(new Txt('MARCA DE VEHICULO: ').fontSize(7).relativePosition(5,-420).end)
    pdf.add(new Txt(this.pass.brand).fontSize(7).relativePosition(78,-420).end)
    pdf.add(new Txt('__________________________').fontSize(7).relativePosition(78  ,-419).end)

    pdf.add(new Txt('PILOTO DE COMISIÓN: ').fontSize(7).relativePosition(165  ,-420).end)
    pdf.add(new Txt(this.pass.fullname).fontSize(7).relativePosition(240,-420).end)
    pdf.add(new Txt('______________________________').fontSize(7).relativePosition(240  ,-419).end)

    pdf.add(new Txt('No. DE SOLICITUD: ').fontSize(7).relativePosition(5,-405).end)
    pdf.add(new Txt(this.pass.id).fontSize(7).relativePosition(78,-405).end)
    pdf.add(new Txt('__________________________').fontSize(7).relativePosition(78  ,-404).end)

    pdf.add(new Txt('LUGAR DE COMISIÓN: ').fontSize(7).relativePosition(165 ,-405).end)
    pdf.add(new Txt(this.pass.destinations).fontSize(7).relativePosition(240,-405).end)
    pdf.add(new Txt('______________________________').fontSize(7).relativePosition(240  ,-404).end)

    pdf.add(new Txt('UNIDAD SOLICITANTE: ').fontSize(7).relativePosition(5,-390).end)
    pdf.add(new Txt(this.pass.requesting_unit).fontSize(7).relativePosition(78,-390).end)
    pdf.add(new Txt('__________________________').fontSize(7).relativePosition(78  ,-389).end)

    pdf.add(new Txt('__________________________').fontSize(9).relativePosition(15,-40).bold().end)
    pdf.add(new Txt('Nombre, firma agente de Seguridad').fontSize(7).relativePosition(12,-30).end)
    pdf.add(new Txt('(Salida)').fontSize(7).relativePosition(55,-20).end)

    pdf.add(new Txt('__________________________').fontSize(9).relativePosition(215,-40).bold().end)
    pdf.add(new Txt('Nombre, firma agente de Seguridad').fontSize(7).relativePosition(212,-30).end)
    pdf.add(new Txt('(Entrada)').fontSize(7).relativePosition(255,-20).end)

    pdf.create().open();
  }
}

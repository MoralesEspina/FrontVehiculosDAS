import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper, Txt, Table, Cell, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";


@Component({
  selector: 'app-binnacle-pdf',
  templateUrl: './binnacle-pdf.component.html',
  styleUrls: ['./binnacle-pdf.component.css']
})
export class BinnaclePdfComponent implements OnInit {

  imageVelocimetro: string = 'https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/watermarks%2Fvelocimetro.png?alt=media&token=43c3f814-1bb6-478c-946c-7f4bf12888f3'
  imageSedan: string = 'https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/watermarks%2FVehiculo%202.png?alt=media&token=a2ef4609-969e-4e41-aecf-89e20ac5f65c'
  imagePickUp: string = 'https://firebasestorage.googleapis.com/v0/b/das-jalapa.appspot.com/o/watermarks%2FVehiculo%201.png?alt=media&token=3c9e9920-0636-4248-928c-fa8bd7a12a9a'
  public id_entrada:any;
  constructor( private router: ActivatedRoute) {
    this.id_entrada = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.GenerateBinnacle()
  }
  getBinnacle(){

  }
  async GenerateBinnacle() {

    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper()

    pdf.add(new Table([
      [new Cell(new Txt('BITÁCORA DE LA COMISIÓN').end).colSpan(5).fontSize(9).alignment('center').end, null, null, null, null,
      new Cell(new Txt('No. Correlativo: ').end).colSpan(1).fontSize(9).end, new Cell(new Txt('').end).colSpan(1).fontSize(9).end],
      [new Cell(new Txt('DATOS GENERALES').end).colSpan(7).fontSize(9).alignment('center').end, null, null, null, null, null, null],
      [new Cell(new Txt('Piloto Asignado').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('Número de Placas ').end).colSpan(1).fontSize(7).end, new Cell(new Txt('').end).colSpan(2).fontSize(7).end],

      [new Cell(new Txt('Tipo de Vehiculo').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('Número de Cilindros').end).colSpan(1).fontSize(7).end, new Cell(new Txt('').end).colSpan(2).fontSize(7).end],

      [new Cell(new Txt('Modelo').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('Tipo de Combustible').end).colSpan(1).fontSize(7).end, new Cell(new Txt('').end).colSpan(2).fontSize(7).end],

      [new Cell(new Txt('Teléfono del Responsable').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('Nivel de Combustible').end).colSpan(1).fontSize(7).end, new Cell(new Txt('').end).colSpan(2).fontSize(7).end],

      [new Cell(new Txt('No. Correlativo de Solicitud').end).colSpan(2).fontSize(7).end, null,
      new Cell(new Txt('').end).colSpan(5).fontSize(7).end, null, null, null, null],

      [new Cell(new Txt('Cupones de combustible').end).margin(6).colSpan(2).fontSize(7).rowSpan(2).alignment('center').end, null,
      new Cell(new Txt('No. de Vale').end).colSpan(2).fontSize(7).alignment('center').end, null,
      new Cell(new Txt('Monto del Vale').end).colSpan(2).fontSize(7).alignment('center').end, null,
      new Cell(new Txt('Total comisiones asignadas').end).colSpan(1).fontSize(5).alignment('center').end],

      [null, null,
        new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null,
        new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null,
        new Cell(new Txt('').end).colSpan(1).fontSize(5).alignment('center').end],

      [new Cell(new Txt('').end).colSpan(7).fontSize(7).alignment('center').end, null, null, null, null, null, null],

      [new Cell(new Txt('DESTINO').end).margin(6).colSpan(2).fontSize(7).rowSpan(2).alignment('center').end, null,
      new Cell(new Txt('FECHA').end).margin(6).colSpan(1).fontSize(7).rowSpan(2).alignment('center').end,
      new Cell(new Txt('HORA').end).colSpan(2).fontSize(7).alignment('center').end, null,
      new Cell(new Txt('KILOMETRAJE').end).colSpan(2).fontSize(7).alignment('center').end, null],

      [null, null, null,
        new Cell(new Txt('SALIDA').end).colSpan(1).fontSize(7).alignment('center').end,
        new Cell(new Txt('ENTRADA').end).colSpan(1).fontSize(7).alignment('center').end,
        new Cell(new Txt('SALIDA').end).colSpan(1).fontSize(7).alignment('center').end,
        new Cell(new Txt('ENTRADA').end).colSpan(1).fontSize(7).alignment('center').end,],

      [new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null, null, null, null, null, null],
      [new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null, null, null, null, null, null],
      [new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null, null, null, null, null, null],
      [new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null, null, null, null, null, null],
      [new Cell(new Txt('').end).colSpan(2).fontSize(7).alignment('center').end, null, null, null, null, null, null],
      [new Cell(new Txt('OBSERVACIONES DEL VIAJE (LLENADO POR PILOTO)').end).margin(6).colSpan(2).rowSpan(3).fontSize(7).alignment('center').end, null, new Cell(new Txt('').end).colSpan(5).fontSize(7).alignment('center').end, null, null, null, null],
      [null, null, new Cell(new Txt('').end).colSpan(5).fontSize(7).alignment('center').end, null, null, null, null],
      [null, null, new Cell(new Txt('').end).colSpan(5).fontSize(7).alignment('center').end, null, null, null, null],

      [new Cell(new Txt('VERIFICACIÓN (SALIDA Y ENTRADA DE COMISIÓN)').end).colSpan(7).fontSize(9).alignment('center').end, null, null, null, null, null, null],

      [new Cell(await new Img(this.imageVelocimetro).alignment('right').width(140).height(60).build()).colSpan(3).fontSize(7).rowSpan(5).alignment('center').end, null, null,
      new Cell(new Txt('MARQUE CON X').end).colSpan(1).fontSize(7).alignment('center').end,
      new Cell(new Txt('SALIDA').end).colSpan(1).fontSize(7).alignment('center').end,
      new Cell(new Txt('ENTRADA').end).colSpan(1).fontSize(7).alignment('center').end,
      new Cell(new Txt('OBSERVACIONES').end).colSpan(1).fontSize(7).alignment('center').end],

      [null, null, null,
        new Cell(new Txt('Tarjeta de circulación:').end).colSpan(1).fontSize(6).end,
        null, null, null,],

      [null, null, null,
        new Cell(new Txt('Golpes visibles:').end).colSpan(1).fontSize(6).end,
        null, null, null,],

      [null, null, null,
        new Cell(new Txt('Tricket:').end).colSpan(1).fontSize(6).end,
        null, null, null,],

      [null, null, null,
        new Cell(new Txt('Llave de Chuchos:').end).colSpan(1).fontSize(6).end,
        null, null, null,],

      [new Cell(new Txt('Marque el nivel de combustible con S para salida y E para entrada').end).margin(3).colSpan(3).rowSpan(2).fontSize(7).alignment('center').end, null, null,
      new Cell(new Txt('Llanta de repuesto').end).colSpan(1).fontSize(6).end, null, null, null],

      [null, null, null,
      new Cell(new Txt('Kilometraje total recorrido:').end).colSpan(1).fontSize(5).end, null, null, null],

      [new Cell(new Txt('Marque golpes visibles').end).colSpan(7).fontSize(9).alignment('center').end, null, null, null, null, null, null],

      [new Cell(await new Img(this.imageSedan).alignment('right').width(220).height(140).build()).colSpan(3).fontSize(7).alignment('center').end, null, null,
      new Cell(await new Img(this.imagePickUp).alignment('right').width(300).height(140).build()).colSpan(4).fontSize(7).alignment('center').end, null, null,null],

      [new Cell(new Txt('CODIGO DE IDENTIFICACIÓN: 0 = golpe, - = rayon, E = emblemas, F = faltante').end).colSpan(7).fontSize(9).alignment('center').end, null, null, null, null, null, null],
      /* [new Cell(new Txt('Dirección: ' ).end).colSpan(4).fontSize(9).end, null, null, null],
       [new Cell(new Txt('Telefono: ' ).end).colSpan(2).fontSize(9).end, null, new Cell(new Txt('Nombre jefe inmediato: ').end).colSpan(2).fontSize(9).end,null],
       [new Cell(new Txt('Motivo del retiro: ').end).colSpan(2).fontSize(9).end, null, new Cell(new Txt('Sector: ').end).colSpan(2).fontSize(9).end,null],
       [new Cell(new Txt('Fecha del empleo: ' + ' al ').end).colSpan(2).fontSize(9).end, null, new Cell(new Txt('Salario: Q.').end).colSpan(2).fontSize(9).end,null],
       [new Cell(new Txt('Puesto desempeñado: ').end).colSpan(4).fontSize(9).end, null, null, null],*/
    ]).layout({
    })
      .widths([65, 65, 65, 60, 70, 65, 65])
      .heights(8)
      .relativePosition(0, 20)
      .end)

      pdf.add(new Txt ('Sedán').relativePosition(10, 415).end)
      pdf.add(new Txt ('Pick up').relativePosition(240, 415).end)
      pdf.add(new Txt ('_____________________________________').relativePosition(20, 615).end)
      pdf.add(new Txt ('Nombre y Firma del Piloto').relativePosition(40, 630).end)
      pdf.add(new Txt ('_____________________________________').relativePosition(290, 615).end)
      pdf.add(new Txt ('Nombre, firma y sello Encargado de Transporte').relativePosition(260, 630).end)
      pdf.add(new Txt ('SELLO DE LA INSTITUCIÓN DONDE REALIZO LA COMISION').relativePosition(0, 680).end)
    pdf.create().open();
  }

}

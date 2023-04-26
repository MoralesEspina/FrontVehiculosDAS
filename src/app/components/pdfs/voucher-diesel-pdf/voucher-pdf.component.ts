import * as dayjs from "dayjs";
import { Component, OnInit } from '@angular/core';
import { VoucherDieselI } from 'src/app/models/voucher.interface';
import { VoucherService } from 'src/app/services/voucher.service';
import { ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper, Txt, Table, Cell, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import 'dayjs/locale/es'


@Component({
  selector: 'app-voucher-pdf',
  templateUrl: './voucher-pdf.component.html',
  styleUrls: ['./voucher-pdf.component.css']
})
export class VoucherPdfComponent implements OnInit {

  public voucher:any;
  public id_entrada;
  public letter;
  constructor(private _vocuherService: VoucherService,
    private _route: ActivatedRoute) {
      this.voucher=new VoucherDieselI('','','','','','','','','','','')
  }
  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.getOneVoucherDiesel()
  }

  getOneVoucherDiesel() {
    this._vocuherService.getOneVoucherDiesel(this.id_entrada).subscribe(
      response => {
        this.voucher = response.data[0];
        this.letter = this.numeroALetras(this.voucher.cost, {
          plural: 'QUETZALES',
          singular: 'QUETZAL',
          centPlural: 'CENTAVOS',
          centSingular: 'CENTAVO'
        });
      }, error => {

      }
    )
  }

  // public downloadPDF(): void {
  //   const DATA: any = document.getElementById('Data');
  //   const doc = new jsPDF('p', 'pt', 'letter');
  //   const options = {
  //     background: 'white',
  //     scale: 3
  //   };

  //   html2canvas(DATA, options).then((canvas) => {
  //     const img = canvas.toDataURL('image/PNG');
  //     // Add image Canvas to PDF
  //     const bufferX = 15;
  //     const bufferY = 15;
  //     const imgProps = (doc as any).getImageProperties(img);
  //     const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     console.log(pdfHeight)
  //     doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  //     return doc;
  //   }).then((docResult) => {
  //     docResult.save('Vale de Combustible');
  //   });
  // }

  Unidades(num) {

    switch (num) {
      case 1: return 'UN';
      case 2: return 'DOS';
      case 3: return 'TRES';
      case 4: return 'CUATRO';
      case 5: return 'CINCO';
      case 6: return 'SEIS';
      case 7: return 'SIETE';
      case 8: return 'OCHO';
      case 9: return 'NUEVE';
    }

    return '';
  }//Unidades()

  Decenas(num) {

    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);

    switch (decena) {
      case 1:
        switch (unidad) {
          case 0: return 'DIEZ';
          case 1: return 'ONCE';
          case 2: return 'DOCE';
          case 3: return 'TRECE';
          case 4: return 'CATORCE';
          case 5: return 'QUINCE';
          default: return 'DIECI' + this.Unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0: return 'VEINTE';
          default: return 'VEINTI' + this.Unidades(unidad);
        }
      case 3: return this.DecenasY('TREINTA', unidad);
      case 4: return this.DecenasY('CUARENTA', unidad);
      case 5: return this.DecenasY('CINCUENTA', unidad);
      case 6: return this.DecenasY('SESENTA', unidad);
      case 7: return this.DecenasY('SETENTA', unidad);
      case 8: return this.DecenasY('OCHENTA', unidad);
      case 9: return this.DecenasY('NOVENTA', unidad);
      case 0: return this.Unidades(unidad);
    }
  }//Unidades()

  DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
      return strSin + ' Y ' + this.Unidades(numUnidades)

    return strSin;
  }//DecenasY()

  Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch (centenas) {
      case 1:
        if (decenas > 0)
          return 'CIENTO ' + this.Decenas(decenas);
        return 'CIEN';
      case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
      case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
      case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
      case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
      case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
      case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
      case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
      case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
    }

    return this.Decenas(decenas);
  }//Centenas()

  Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = '';

    if (cientos > 0)
      if (cientos > 1)
        letras = this.Centenas(cientos) + ' ' + strPlural;
      else
        letras = strSingular;

    if (resto > 0)
      letras += '';

    return letras;
  }//Seccion()

  Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = this.Seccion(num, divisor, 'MIL', 'MIL');
    let strCentenas = this.Centenas(resto);

    if (strMiles == '')
      return strCentenas;

    return strMiles + ' ' + strCentenas;
  }//Miles()

  Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = this.Miles(resto);

    if (strMillones == '')
      return strMiles;

    return strMillones + ' ' + strMiles;
  }//Millones()

  numeroALetras(num, currency) {
    currency = currency || {};
    let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: '',
      letrasMonedaPlural: currency.plural || 'PESOS CHILENOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
      letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
      letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
      letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
    };

    if (data.centavos > 0) {
      let centavos = ''
      if (data.centavos == 1)
        centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
      else
        centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
      data.letrasCentavos = 'CON ' + centavos
    };

    if (data.enteros == 0)
      return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
      return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
      return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  };

  downloadPDF(){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper()
      pdf.pageSize('A5');

      pdf.add(new Txt ('FECHA: ').relativePosition(10, 10).end)
      pdf.add(new Txt ([dayjs(this.voucher.date).locale("ES").format('DD MMMM YYYY')]).bold().relativePosition(55, 10).end)
      pdf.add(new Txt('_______________________').bold().relativePosition(53, 12).end)
      pdf.add(new Txt ('Q: ').relativePosition(190, 10).end)
      pdf.add(new Txt (this.voucher.cost).bold().relativePosition(207, 10).end)
      pdf.add(new Txt('_______________________').bold().relativePosition(205, 12).end)
      pdf.add(new Txt ('CANTIDAD EN LETRAS: ').relativePosition(10, 35).end)
      pdf.add(new Txt (this.letter).bold().relativePosition(142, 35).end)
      pdf.add(new Txt('___________________________________').bold().relativePosition(140, 37).end)

      pdf.add(new Txt ('VEHÍCULO NO.: ').relativePosition(10, 60).end)
      pdf.add(new Txt (this.voucher.idVehicle).bold().relativePosition(97, 60).end)
      pdf.add(new Txt('__________________').bold().relativePosition(95, 62).end)
      pdf.add(new Txt ('PLACA: ').relativePosition(205, 60).end)
      pdf.add(new Txt (this.voucher.plate).bold().relativePosition(252, 60).end)
      pdf.add(new Txt('_______________').bold().relativePosition(250, 62).end)

      pdf.add(new Txt ('TIPO DE VEHICULO.: ').relativePosition(10, 85).end)
      pdf.add(new Txt (this.voucher.type_name).bold().relativePosition(122, 85).end)
      pdf.add(new Txt('_____________').bold().relativePosition(120, 87).end)
      pdf.add(new Txt ('MARCA: ').relativePosition(205, 85).end)
      pdf.add(new Txt (this.voucher.brand).bold().relativePosition(252, 85).end)
      pdf.add(new Txt('_______________').bold().relativePosition(250, 87).end)

      pdf.add(new Txt ('MODELO: ').relativePosition(10, 110).end)
      pdf.add(new Txt (this.voucher.model).bold().relativePosition(67, 110).end)
      pdf.add(new Txt('________________________').bold().relativePosition(65, 112).end)
      pdf.add(new Txt ('COLOR: ').relativePosition(205, 110).end)
      pdf.add(new Txt (this.voucher.color).bold().relativePosition(252, 110).end)
      pdf.add(new Txt('_______________').bold().relativePosition(250, 112).end)

      pdf.add(new Txt ('COMISIÓN A: ').relativePosition(10, 135).end)
      pdf.add(new Txt (this.voucher.comission_to).bold().relativePosition(87, 135).end)
      pdf.add(new Txt('______________________________________________').bold().relativePosition(85, 137).end)

      pdf.add(new Txt ('PROPÓSITO: ').relativePosition(10, 160).end)
      pdf.add(new Txt (this.voucher.objective).bold().relativePosition(87, 160).end)
      pdf.add(new Txt('______________________________________________').bold().relativePosition(85, 162).end)

      pdf.add(new Txt ('NOMBRE DEL PILOTO: ').relativePosition(10, 185).end)
      pdf.add(new Txt (this.voucher.fullname).bold().relativePosition(132, 185).end)
      pdf.add(new Txt('______________________________________').bold().relativePosition(130, 187).end)

      pdf.add(new Txt ('DPI O LICENCIA: ').relativePosition(10, 210).end)
      pdf.add(new Txt (this.voucher.dpi).bold().relativePosition(107, 210).end)
      pdf.add(new Txt('__________________________________________').bold().relativePosition(105, 212).end)

      pdf.add(new Txt ('FIRMA: ').relativePosition(150, 310).end)
      pdf.add(new Txt('__________________________').bold().relativePosition(190, 310).end)

      pdf.add(new Txt('________________________').fontSize(14).bold().relativePosition(10, 410).end)
      pdf.add(new Txt('________________________').fontSize(14).bold().relativePosition(180, 410).end)

      pdf.add(new Txt ('Visto bueno').bold().relativePosition(55, 430).end)
      pdf.add(new Txt ('Gerente administrativo').bold().relativePosition(25, 450).end)
      pdf.add(new Txt ('financiero').bold().relativePosition(58, 470).end)

      pdf.add(new Txt ('Firma del encargado del').bold().relativePosition(190, 430).end)
      pdf.add(new Txt ('combustible').bold().relativePosition(220, 450).end)
    pdf.create().open();
  }
}

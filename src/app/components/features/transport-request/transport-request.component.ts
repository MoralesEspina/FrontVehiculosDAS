import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-transport-request',
  templateUrl: './transport-request.component.html',
  styleUrls: ['./transport-request.component.css']
})
export class TransportRequestComponent implements OnInit {

  public vehicles;
  public cant = 5;
  places = [
    {name: 'Jalapa'},
    {name: 'Monjas'},
    {name: 'San Pedro Pinula'},
    {name: 'Mataquescuintla'},
    {name: 'San Luis Jilotepeque'},
    {name: 'San Manuel Chaparrón'},
    {name: 'San Carlos Alzatate'},

  ];

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(){
    this._vehicleService.getVehicles().subscribe(
      response =>{
        console.log(response)
        this.vehicles = response.data;
      }, error =>{

      }
    )
  }

  public downloadPDF(): void {
    const DATA:any = document.getElementById('Data');
    const doc = new jsPDF('landscape', 'pt', 'legal');
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
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
}

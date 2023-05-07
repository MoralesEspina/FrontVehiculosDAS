import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-voucher-index',
  templateUrl: './voucher-index.component.html',
  styleUrls: ['./voucher-index.component.css']
})
export class VoucherIndexComponent implements OnInit {

  public p:number = 1;
  public p2:number = 1;
  public voucherGasoline;
  public voucherDiesel;
  public oneVoucher;
  public isLoad: boolean = false;

  constructor(private _voucherService:VoucherService) { }

  ngOnInit(): void {
    this.getVouchers();
  }

  getVouchers(){
    this._voucherService.getVoucherRegular().subscribe(
      response =>{
        this.voucherGasoline = response.data;
      }, error =>{

      }
    )
    this._voucherService.getVoucherDiesel().subscribe(
      response =>{
        this.voucherDiesel = response.data;
          this.isLoad = true;
      }, error =>{

      }
    )
  }
 
}

import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  quantidadeBrigadeiro1: number;
  quantidadeBrigadeiro2: number;
  quantidadeBrigadeiro3: number;
  quantidadeBrigadeiro4: number;
  quantidadeBrigadeiro5: number;
  quantidadeBrigadeiro6: number;
  valorBrigadeiro:number = 2;
  resultado = '';
  resultadoCalculo: string;

  constructor(private toastr: ToastrService
              ,public router: Router
              ,@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  calcular(): boolean{
    if((this.quantidadeBrigadeiro1 == undefined || this.quantidadeBrigadeiro1 == 0) && 
    (this.quantidadeBrigadeiro2 == undefined || this.quantidadeBrigadeiro2 == 0)
      && (this.quantidadeBrigadeiro3 == undefined || this.quantidadeBrigadeiro3 == 0)
       && (this.quantidadeBrigadeiro4 == null || this.quantidadeBrigadeiro4 == 0)
       && (this.quantidadeBrigadeiro5 == null || this.quantidadeBrigadeiro5 == 0)
       && (this.quantidadeBrigadeiro6 == null || this.quantidadeBrigadeiro6 == 0)){
        this.toastr.warning("Selecione no mínimo 1 Goloseima Acima");
        this.resultado = '';
        return false;
      }
      var calculo1 = this.quantidadeBrigadeiro1 != undefined ? this.quantidadeBrigadeiro1 * this.valorBrigadeiro: 0;
      var calculo2 = this.quantidadeBrigadeiro2 != undefined ? this.quantidadeBrigadeiro2 * this.valorBrigadeiro : 0;
      var calculo3 = this.quantidadeBrigadeiro3 != undefined ? (this.quantidadeBrigadeiro3 * this.valorBrigadeiro) : 0;
      var calculo4 = this.quantidadeBrigadeiro4 != undefined ? this.quantidadeBrigadeiro4 * this.valorBrigadeiro : 0;
      var calculo5 = this.quantidadeBrigadeiro5 != undefined ? this.quantidadeBrigadeiro5 * this.valorBrigadeiro : 0;
      var calculo6 = this.quantidadeBrigadeiro6 != undefined ? this.quantidadeBrigadeiro6 * this.valorBrigadeiro : 0;
      
      var soma = parseFloat(calculo1.toString()) + parseFloat(calculo2.toString()) + parseFloat(calculo3.toString()) + parseFloat(calculo4.toString()) + parseFloat(calculo5.toString()) + parseFloat(calculo6.toString());

      this.resultado = soma.toString()+",00";
      return true;
  }

  solicitar(){
    let number = 5513991370696;
    var doce1 = this.quantidadeBrigadeiro1 !== undefined && this.quantidadeBrigadeiro1 > 0 ? this.quantidadeBrigadeiro1 : 0;
    var doce2 = this.quantidadeBrigadeiro2 !== undefined && this.quantidadeBrigadeiro2 > 0 ? this.quantidadeBrigadeiro2 : 0;
    var doce3 = this.quantidadeBrigadeiro3 !== undefined && this.quantidadeBrigadeiro3 > 0 ? this.quantidadeBrigadeiro3 : 0;
    var doce4 = this.quantidadeBrigadeiro4 !== undefined && this.quantidadeBrigadeiro4 > 0 ? this.quantidadeBrigadeiro4 : 0;
    var doce5 = this.quantidadeBrigadeiro5 !== undefined && this.quantidadeBrigadeiro5 > 0 ? this.quantidadeBrigadeiro5 : 0;
    var doce6 = this.quantidadeBrigadeiro6 !== undefined && this.quantidadeBrigadeiro6 > 0 ? this.quantidadeBrigadeiro6 : 0;

    let msg = `Olá RizzoAbreu !!! Solicito as seguintes goloseimas: *Ninho* -> ${doce1}, *Tradicional* -> ${doce2}, *Bicho de Pé* -> ${doce3}, *Casadinho* -> ${doce4}, *Sensação* -> ${doce5} e  *Morango* -> ${doce6} -- no valor de *R$${this.resultado}* `;
    
    let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
    
    window.open(target,"_blank");
    //var url = 'https://web.whatsapp.com/send?phone=5513974058807';
  }

}

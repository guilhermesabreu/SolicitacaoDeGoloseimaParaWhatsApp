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

  quantidadepalhaChocolate: number;
  quantidadepalhaNinho: number;
  valorPalha: number = 3;
  resultado = '';
  resultadoCalculo: string;

  constructor(private toastr: ToastrService
              ,public router: Router
              ,@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  calcular(): boolean{
    if((this.quantidadepalhaChocolate == undefined || this.quantidadepalhaChocolate == 0) && 
    (this.quantidadepalhaNinho == undefined || this.quantidadepalhaNinho == 0)) {
        this.toastr.warning("Selecione no mínimo 1 Palha Italiana");
        this.resultado = '';
        return false;
      }
      var calculo1 = this.quantidadepalhaChocolate != undefined ? this.quantidadepalhaChocolate * this.valorPalha: 0;
      var calculo2 = this.quantidadepalhaNinho != undefined ? this.quantidadepalhaNinho * this.valorPalha : 0;
      
      var soma = parseFloat(calculo1.toString()) + parseFloat(calculo2.toString());

      this.resultado = soma.toString()+",00";
      return true;
  }

  solicitar(){
    let number = 5513991370696;
    var chocolate = this.quantidadepalhaChocolate !== undefined && this.quantidadepalhaChocolate > 0 ? this.quantidadepalhaChocolate : 0;
    var ninho = this.quantidadepalhaNinho !== undefined && this.quantidadepalhaNinho > 0 ? this.quantidadepalhaNinho : 0;
    let msg;

    if(ninho == 0){
      msg = `Olá RizzoAbreu !!! Solicito ${chocolate} *Palhas Italiana Sabor Chocolate* -- no valor de *R$${this.resultado}* `;
    }
    else if(chocolate == 0){
      msg = `Olá RizzoAbreu !!! Solicito ${ninho} *Palhas Italiana Sabor Ninho* -- no valor de *R$${this.resultado}* `;
    }
    else {
      msg = `Olá RizzoAbreu !!! Solicito ${ninho} *Palhas Italiana Sabor Ninho* e ${chocolate} *Sabor Chocolate* -- no valor de *R$${this.resultado}* `;
    }

    
    
    let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
    
    window.open(target,"_blank");
  }

}

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
  quantidadepalhaNegresco: number;
  quantidadepalhaMorango: number;
  valorPalha: string = '4,00';
  resultado = '';
  resultadoCalculo: string;
  
  constructor(private toastr: ToastrService
    ,public router: Router
    ,@Inject(DOCUMENT) private document: Document) { }
    
    ngOnInit() {
    }
    
    calcular(): boolean{
      if((this.quantidadepalhaChocolate == undefined || this.quantidadepalhaChocolate == 0) && 
      (this.quantidadepalhaNinho == undefined || this.quantidadepalhaNinho == 0) &&
      (this.quantidadepalhaNegresco == undefined || this.quantidadepalhaNegresco == 0) &&
      (this.quantidadepalhaMorango == undefined || this.quantidadepalhaMorango == 0)) {
        this.toastr.warning("Selecione no mínimo 1 Palha Italiana");
        this.resultado = '';
        return false;
      }
      var calculo1 = this.quantidadepalhaChocolate != undefined ? this.quantidadepalhaChocolate * parseFloat(this.valorPalha.replace(',','.')): 0;
      var calculo2 = this.quantidadepalhaNinho != undefined ? this.quantidadepalhaNinho * parseFloat(this.valorPalha.replace(',','.')) : 0;
      var calculo3 = this.quantidadepalhaNegresco != undefined ? this.quantidadepalhaNegresco * parseFloat(this.valorPalha.replace(',','.')): 0;
      var calculo4 = this.quantidadepalhaMorango != undefined ? this.quantidadepalhaMorango * parseFloat(this.valorPalha.replace(',','.')) : 0;
      
      var soma = parseFloat(calculo1.toString()) + parseFloat(calculo2.toString()) + parseFloat(calculo3.toString()) + parseFloat(calculo4.toString());
      
      if(soma.toString().replace('.',',').includes(',')){
        this.resultado = soma.toString().replace('.',',');  
      }
      else{
        this.resultado = soma.toString()+ ',00';  
      }
      
      return true;
    }
    
    solicitar(){
      console.log("resultado:"+this.resultado);
      if(this.resultado == '' || this.resultado == undefined || this.resultado == null) {
        this.toastr.warning("Selecione no mínimo 1 Palha Italiana e Calcule o preço");
      }
      else{
        let number = 5513991370696;
        var chocolate = this.quantidadepalhaChocolate !== undefined && this.quantidadepalhaChocolate > 0 ? this.quantidadepalhaChocolate : 0;
        var ninho = this.quantidadepalhaNinho !== undefined && this.quantidadepalhaNinho > 0 ? this.quantidadepalhaNinho : 0;
        var negresco = this.quantidadepalhaNegresco !== undefined && this.quantidadepalhaNegresco > 0 ? this.quantidadepalhaNegresco : 0;
        var morango = this.quantidadepalhaMorango !== undefined && this.quantidadepalhaMorango > 0 ? this.quantidadepalhaMorango : 0;
        let msg;
        
        var saborChocolate;
        var saborNinho;
        var saborMorango;
        var saborNegresco;
        
        if(chocolate != 0){
          saborChocolate = `-- *${chocolate}* Palhas Italiana Sabor *Chocolate* --`;
        }else{
          saborChocolate = '';
        }
        
        if(ninho != 0){
          saborNinho = `-- *${ninho}* Palhas Italiana Sabor *Ninho* --`;
        }
        else{
          saborNinho = '';
        }
        
        if(negresco != 0){
          saborNegresco = `-- *${negresco}* Palhas Italiana Sabor *Negresco* --`;
        }
        else{
          saborNegresco = '';
        }
        
        if(morango != 0){
          saborMorango = `-- *${morango}* Palhas Italiana Sabor *Morango* --`;
        }
        else{
          saborMorango = '';
        }
        
        
        msg = `Olá RizzoAbreu !!! Solicito o seguinte pedido: ${saborChocolate != '' ? saborChocolate : ''} ${saborNinho != '' ? saborNinho : ''} ${saborNegresco != '' ? saborNegresco : ''} ${saborMorango != '' ? saborMorango : ''} No total de: *R$${this.resultado}* --`;
        
        let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
        
        window.open(target,"_blank");
      }
    }
    
  }
  
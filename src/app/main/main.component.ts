import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


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
  quantidadePote: number;
  valorPalha: string = '4,00';
  valorPote: string = '8,00';
  resultado = '';
  resultadoCalculo: string;
  
  endereco: string;
  
  modalRef: BsModalRef;
  constructor(private toastr: ToastrService
    ,public router: Router
    ,public modalService: BsModalService
    ,@Inject(DOCUMENT) private document: Document) { }
    
    ngOnInit() {}

    openModal(template: TemplateRef<any>){
      this.obterLocalizacao();
      this.modalRef = this.modalService.show(template);
    }
    
    calcular(): boolean{
      if((this.quantidadepalhaChocolate == undefined || this.quantidadepalhaChocolate == 0) && 
      (this.quantidadepalhaNinho == undefined || this.quantidadepalhaNinho == 0) &&
      (this.quantidadepalhaNegresco == undefined || this.quantidadepalhaNegresco == 0) &&
      (this.quantidadepalhaMorango == undefined || this.quantidadepalhaMorango == 0) &&
      (this.quantidadePote == undefined || this.quantidadePote == 0)) {
        this.toastr.warning("Selecione no mínimo 1 Palha Italiana");
        this.resultado = '';
        return false;
      }
      var calculo1 = this.quantidadepalhaChocolate != undefined ? this.quantidadepalhaChocolate * parseFloat(this.valorPalha.replace(',','.')): 0;
      var calculo2 = this.quantidadepalhaNinho != undefined ? this.quantidadepalhaNinho * parseFloat(this.valorPalha.replace(',','.')) : 0;
      var calculo3 = this.quantidadepalhaNegresco != undefined ? this.quantidadepalhaNegresco * parseFloat(this.valorPalha.replace(',','.')): 0;
      var calculo4 = this.quantidadepalhaMorango != undefined ? this.quantidadepalhaMorango * parseFloat(this.valorPalha.replace(',','.')) : 0;
      var calculo5 = this.quantidadePote != undefined ? this.quantidadePote * parseFloat(this.valorPote.replace(',','.')) : 0;
      
      var soma = parseFloat(calculo1.toString()) + parseFloat(calculo2.toString()) + parseFloat(calculo3.toString()) + parseFloat(calculo4.toString()) + parseFloat(calculo5.toString());
      
      if(soma.toString().replace('.',',').includes(',')){
        this.resultado = soma.toString().replace('.',',');  
      }
      else{
        this.resultado = soma.toString()+ ',00';  
      }
      
      return true;
    }
    
    solicitar(){
      if(this.endereco !== undefined && this.endereco !== null && this.endereco !== ''){
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
          var pote = this.quantidadePote !== undefined && this.quantidadePote > 0 ? this.quantidadePote : 0;
          let msg;
          
          var saborChocolate;
          var saborNinho;
          var saborMorango;
          var saborNegresco;
          var saborPote;
          
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
          
          if(pote != 0){
            saborPote = `-- *${pote}*Potes de Palhas Italianas de *todos os sabores* --`;
          }
          else{
            saborPote = '';
          }
          
          
          msg = `Olá RizzoAbreu !!! Solicito o seguinte pedido: ${saborPote != '' ? saborPote : ''} ${saborChocolate != '' ? saborChocolate : ''} ${saborNinho != '' ? saborNinho : ''} ${saborNegresco != '' ? saborNegresco : ''} ${saborMorango != '' ? saborMorango : ''} No total de: *R$${this.resultado}* --  Para o Endereço: ${this.endereco}`;
          
          let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
          
          window.open(target,"_blank");
        }  
      }else{
        this.toastr.info("Informe o Endereço que desejas receber o pedido");
      }
      
    }
    
    obterLocalizacao(){
      let endereco;
      const successfulLookup = (position) => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        console.log(latitude);
        console.log(longitude);
        
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5847b29338a343f29fde5093488c762e`)
        .then(response => response.json())
        .then(data => {
          endereco = data.results[0].formatted;
          this.endereco = endereco;
          console.log(this.endereco);
        });
      };
      
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(successfulLookup, function(position){
        }, {enableHighAccuracy: true});
      }else{
        alert('Ops ! Não foi possível obter a sua localização');
      }
    }
  }
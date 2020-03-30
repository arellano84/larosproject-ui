import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lanzamientos-busqueda',
  templateUrl: './lanzamientos-busqueda.component.html',
  styleUrls: ['./lanzamientos-busqueda.component.css']
})
export class LanzamientosBusquedaComponent {

  lanzamientos = [
    { tipo: 'GASTO', descricao: 'Compra de pão', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'INGRESO', descricao: 'Venda de software', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: new Date(2020, 3, 31), valor: 80000, pessoa: 'Atacado Brasil' },
    { tipo: 'GASTO', descricao: 'Impostos', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
    { tipo: 'GASTO', descricao: 'Mensalidade de escola', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: new Date(2020, 3, 31), valor: 800, pessoa: 'Escola Abelha Rainha' },
    { tipo: 'INGRESO', descricao: 'Venda de carro', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
    { tipo: 'GASTO', descricao: 'Aluguel', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: new Date(2020, 3, 31), valor: 1750, pessoa: 'Casa Nova Imóveis' },
    { tipo: 'GASTO', descricao: 'Mensalidade musculação', dataVencimento: new Date(2020, 3, 26),
      dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  ];

}

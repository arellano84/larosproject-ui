import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personas-busqueda',
  templateUrl: './personas-busqueda.component.html',
  styleUrls: ['./personas-busqueda.component.css']
})
export class PersonasBusquedaComponent {

  personas = [
    { nombre: 'Manoel Pinheiro', ciudad: 'Uberlândia', estado: 'MG', activo: true },
    { nombre: 'Sebastião da Silva', ciudad: 'São Paulo', estado: 'SP', activo: false },
    { nombre: 'Carla Souza', ciudad: 'Florianópolis', estado: 'SC', activo: true },
    { nombre: 'Luís Pereira', ciudad: 'Curitiba', estado: 'PR', activo: true },
    { nombre: 'Vilmar Andrade', ciudad: 'Rio de Janeiro', estado: 'RJ', activo: false },
    { nombre: 'Paula Maria', ciudad: 'Uberlândia', estado: 'MG', activo: true }
  ];

}

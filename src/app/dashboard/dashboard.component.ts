import { Component, OnInit } from '@angular/core';


/*
  19.13. Protegendo rotas com guarda de rotas (CanActivate)
*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // 23.2. Plotando gráficos com dados estáticos
  pieChartData = {
    labels: ['Mensual', 'Educación', 'Lazer', 'Imprevistos'],
    datasets: [
      {
        data: [2500, 2700, 550, 235],
        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
      }
    ]
  };
  lineChartData = {
    labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    datasets: [
      {
        label: 'Ingresos',
        data: [4, 10, 18, 5, 1, 20, 3],
        borderColor: '#3366CC'
      }, {
        label: 'Gastos',
        data: [10, 15, 8, 5, 1, 7, 9],
        borderColor: '#D62B00'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}

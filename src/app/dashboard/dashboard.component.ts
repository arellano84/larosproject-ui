import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { DashboardService } from './dashborad.service';
import { ErrorHandlerService } from './../core/error-handler.service';

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
    /*labels: ['Mensual', 'Educación', 'Lazer', 'Imprevistos'],
    datasets: [
      {
        data: [2500, 2700, 550, 235],
        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
      }
    ]*/
  };
  lineChartData = {
    /*labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
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
    ]*/
  };

  // 23.6. Formatando labels no Chart.JS
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private errorHandlerService: ErrorHandlerService,
    private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    // 23.4. Buscando dados do gráfico de pizza
    this.cargarMovimientosPorCategorias();
    this.cargarMovimientosPorDia();
  }


  /*
    23.4. Buscando dados do gráfico de pizza
  */
 cargarMovimientosPorCategorias() {
  console.log('-DashboardComponent.cargarMovimientosPorCategorias()- Cargando Movimientos por Categoria...');

  this.dashboardService.movimientosPorCategoria()
  .then(movCat => {
    console.log(JSON.stringify(movCat));

    this.pieChartData = {
      labels: movCat.map(mc => mc.categoria.nombre),
      datasets: [
        {
          data: movCat.map(mc => mc.total),
          backgroundColor: this.obtenerColorAleatorio()
        }
      ]
    };
  })
  .catch(error =>  this.errorHandlerService.handle(error));
}

  /*
    23.5. Buscando dados do gráfico de linhas
  */
cargarMovimientosPorDia() {
  console.log('-DashboardComponent.cargarMovimientosPorDia()- Cargando Movimientos por Día...');

    this.dashboardService.movimientosPorDia()
    .then(movDia => {

      console.log(JSON.stringify(movDia));

      const diasDelMes = this.configurarDiasMes();

      const totalesIngresos = this.totalesPorCadaDiaMes(
        movDia.filter(md => md.tipoLanzamiento === 'INGRESO'), diasDelMes);
      const totalesGastos = this.totalesPorCadaDiaMes(
        movDia.filter(md => md.tipoLanzamiento === 'GASTO'), diasDelMes);

      this.lineChartData = {
        labels: diasDelMes,
        datasets: [
          {
            label: 'Ingresos',
            data: totalesIngresos,
            borderColor: '#3366CC'
          }, {
            label: 'Gastos',
            data: totalesGastos,
            borderColor: '#D62B00'
          }
        ]
      }
    })
    .catch(error =>  this.errorHandlerService.handle(error));
  }
  // Obtiene array de dias del mes.
  private totalesPorCadaDiaMes(datos, diasDelMes) {
    const totales: number[] = [];
    for (const dia of diasDelMes) {
      let total = 0;

      for (const dato of datos) {
        if (dato.dia.getDate() === dia) {
          total = dato.total;

          break;
        }
      }

      totales.push(total);
    }

    return totales;
  }
  // Obtiene array de dias del mes.
  private configurarDiasMes() {
    /* const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();*/

    let quantidade: number = moment().daysInMonth();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }


  obtenerColorAleatorio() {
    var rgb = ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
              '#DD4477', '#3366CC', '#DC3912'];
    return rgb;
  }

}

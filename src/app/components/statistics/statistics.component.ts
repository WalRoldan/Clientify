import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Chart } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  stats: any = { promedioEdad: 0, desviacionEstandar: 0 }; // Valores iniciales
  chart: any;

  constructor(private clientService: ClientService) {
    // Registra el plugin de anotaciones
    Chart.register(annotationPlugin);
  }

  ngOnInit() {
    this.clientService.getStatistics().subscribe(
      (response) => {
        this.stats = {
          promedioEdad: this.roundNumber(response.promedioEdad, 0),
          desviacionEstandar: this.roundNumber(response.desviacionEstandar, 0),
        };
        this.createChart();
      },
      (error) => {
        console.error('Error al obtener estadísticas', error);
      }
    );
  }

  /**
   * Redondea un número a los decimales especificados.
   */
  roundNumber(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  /**
   * Crea un gráfico utilizando Chart.js.
   */
  createChart() {
    const ctx = document.getElementById('ageChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy(); // Elimina el gráfico anterior si existe
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Promedio de Edad', 'Desviación Estándar'],
        datasets: [
          {
            label: 'Estadísticas de Clientes',
            data: [this.stats.promedioEdad, this.stats.desviacionEstandar],
            backgroundColor: ['#2196f3', '#ff9800'],
            borderColor: ['#1e88e5', '#fb8c00'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          annotation: {
            annotations: {
              referenceLine: {
                type: 'line',
                yMin: 80, // Valor de referencia
                yMax: 80, // La línea es horizontal, misma coordenada en y
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  display: true,
                  content: 'Expectativa de Vida (80 años)',
                  position: 'end',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  color: 'white',
                  font: {
                    weight: 'bold',
                  },
                },
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });
  }
}

import { Component, OnInit, DoCheck } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'node_modules/chart.js';
import { SecondChartService } from 'src/app/second-chart.service';


@Component({
  selector: 'app-qcbatches-indiv-category-technical-status',
  templateUrl: './qcbatches-indiv-category-technical-status.component.html',
  styleUrls: ['./qcbatches-indiv-category-technical-status.component.css']
})
export class QCBatchesIndivCategoryTechnicalStatusComponent implements OnInit {
  lineGraphIcon = faChartLine;
  pickedCategory: any;
  myLineChart: any;
  categories: string[];

  constructor(private secondChartService: SecondChartService) { }

  ngOnInit(): void {

    this.pickedCategory = 'Java';
    this.categories = ['Java', 'SQL', 'Javascript', 'Servlet'];
    this.displayGraph();
  }

  updateGraph() {
    console.log('Changed category!');
    this.displayGraph();

  }

  displayGraph() {
    
    let yLabels = {
      0: 'Poor',
      1: 'Average',
      2: 'Good',
      3: 'Superstar'
    }

    this.myLineChart = new Chart('secondChart', {
      type: 'line',
      data: {
        labels: this.secondChartService.getXData(),
        datasets: [{
          label: 'Overall Average', // Name the series
          data: [3, 0, 1, 2], // Specify the data values array
          fill: false,
          borderColor: '#2196f3', // Add custom color border (Line)
          backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 3,
              stepSize: 1,
              callback: function(value, index, values) {
                return yLabels[value];
              }
            }
          }]
        },
        title: {
          display: true,
          text: `QC scores based on ${this.pickedCategory}`
        },
        responsive: true,
        hover: {
          mode: 'nearest',
          intersect: true
        },
      }
    });
  }

}

import { Component, OnInit, HostListener } from '@angular/core';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'node_modules/chart.js';
import { FifthChartService } from 'src/app/fifth-chart.service';
import { AssessmentComponent } from 'src/app/Components/assessment/assessment.component';


@Component({
  selector: 'app-assessment-batches-indiv-category-technical-status',
  templateUrl: './assessment-batches-indiv-category-technical-status.component.html',
  styleUrls: ['./assessment-batches-indiv-category-technical-status.component.css']
})
export class AssessmentBatchesIndivCategoryTechnicalStatusComponent implements OnInit {
  barGraphIcon = faChartBar;
  width: number;
  isBig: boolean;

  categories: string[];
  myBarGraph: any;

  examScores: number[];
  verbalScores: number[];
  projectScores: number[];

  constructor(private fifthChartService: FifthChartService, private assessmentTS: AssessmentComponent) { }

  ngOnInit(): void {
    this.graphAdjust();

    this.categories = [];
    this.examScores = [];
    this.verbalScores = [];
    this.projectScores = [];

    this.fifthChartService.getScorePerCategory().subscribe(
      resp => {
        // tslint:disable-next-line: forin
        for (const cat of resp.categories){
          this.categories.push(cat.name);
        }
        for (const scores of resp.average){
          this.examScores.push(Math.round(scores[0] * 100) / 100);
          this.verbalScores.push(Math.round(scores[1] * 100) / 100);
          this.projectScores.push(Math.round(scores[2] * 100) / 100);
        }
        this.displayGraph(this.categories, this.examScores, this.verbalScores, this.projectScores);
      }
    );


  }

  displayGraph(categoriesDisplayData: string[],
               examDisplayScores: number[], verbalDisplayScores: number[], projectDisplayScores: number[]) {
    // console.log('THIS: ' + categoriesDisplayData);

    if (this.myBarGraph) {
      this.myBarGraph.destroy();
    }

    this.myBarGraph = new Chart('fifthChart', {
      type: 'bar',
      data: {
        labels: categoriesDisplayData,
        datasets: [{
          label: 'Exam',
          data: examDisplayScores,
          backgroundColor: '#3aaff2',
          backgroundHoverColor: '#3aaff2',
          borderWidth: 1
        },
        {
          label: 'Verbal',
          data: verbalDisplayScores,
          backgroundColor: '#7af23a',
          backgroundHoverColor: '#7af23a',
          borderWidth: 1
        },
        {
          label: 'Project',
          data: projectDisplayScores,
          backgroundColor: '#f23a6e',
          backgroundHoverColor: '#f23a6e',
          borderWidth: 1
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
              callback(value, index, values) {
                return value + '%';
              }
            }
          }]
        },
        title: {
          display: true,
          text: `Percent of each assessment technical status`
        },
        responsive: true,
        hover: {
          mode: 'nearest',
          intersect: true
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem, data){
                return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel + "%";
              }
            }
        }
      }
    });

  }

  graphAdjust() {
    this.width = window.innerWidth;
    if (this.assessmentTS.selectedValue === 'all') {

      if (this.width < 1281) {
        // console.log('Screen less than 1261px'); // FOR MOBILE PHONE
        this.isBig = false;

        document.getElementById('divChart5').style.width = '80vw';
      } else {
        // console.log('Screen width is at least 1261px');
        this.isBig = true;

        document.getElementById('divChart5').style.width = '45vw';
      }
    } else {
      document.getElementById('divChart5').style.width = '90vw';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.assessmentTS.selectedValue === 'all') {
      this.width = window.innerWidth;

      if (this.width < 1281) {
        // console.log('Screen less than 1010px'); // FOR MOBILE PHONE
        this.isBig = false;


        document.getElementById('divChart5').style.width = '80vw';
      } else {
        // console.log('Screen width is at least 1010px');
        this.isBig = true;

        document.getElementById('divChart5').style.width = '45vw';
      }
    } else {
      document.getElementById('divChart5').style.width = '90vw';

    }
  }


}

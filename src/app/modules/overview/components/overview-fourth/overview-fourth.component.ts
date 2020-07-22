import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-overview-fourth',
  templateUrl: './overview-fourth.component.html',
  styleUrls: ['./overview-fourth.component.scss']
})
export class OverviewFourthComponent implements OnInit {

  @Input() marginals: any = null;
  @Input() labels: any = null;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{
      ticks: {
        fontSize: 16,
        fontColor: '#272727',
      }
    }], yAxes: [{
      ticks: {
        fontSize: 16,
        fontColor: '#272727',
        suggestedMin: 0,
      }
    }],  },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#272727',
        font: {
          size: 16,
          weight: 500,
        },
      }
    },
    elements: {
      line: {
        backgroundColor: '#434a54',
        borderColor: '#434a54',
        tension: 0,
        fill: false,
      }
    },
    legend: { labels: { fontSize: 16, fontStyle: 'bold' } }
  };

  public lineChartLabels: Label[] = ['Utilities'];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [pluginDataLabels];
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Placeholder' }
  ];
  public lineChartColors = [
  [
    {backgroundColor: ['#e84351']},
  ],
  [
    {backgroundColor: ['#434a54']},
  ],
  [
    {backgroundColor: ['#3ebf9b']},
  ],
  [
    {backgroundColor: ['#4d86dc']},
  ],
  [
    {backgroundColor: ['#f3af37']},
  ],
  [
    {backgroundColor: ['#3d3da9']},
  ],
  [
    {backgroundColor: ['#a99a3d']},
  ]
  ];

  criteria: string[];

  datasets = [];

  constructor(
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    const criteria = [];

    this.tableService.getCriteria().forEach(c => {
      criteria.push(c.name);
    });

    this.criteria = criteria;
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.datasets = [];

    this.marginals.forEach(
      (e, i) => {
        const temp = [];
        e.forEach(el => {
          if(+e[e.length - 1] !== 0) {
            temp.push(+(+el / +e[e.length - 1]).toFixed(2));
          } else {
            temp.push(0);
          }
        });
        // this.lineChartData.push({ data: e, label: this.criteria[i] });
        this.datasets.push([{ data: temp, label: this.criteria[i] }]);
        this.lineChartLabels.push(this.labels[i]);
    });


    console.log('Data: ', this.datasets);
    console.log('Labels: ', this.lineChartLabels)

  }
    //  1     0    10     9     1
    //  1     0     9     6     3
    //  1     0    14     6     8
}

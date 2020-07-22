import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-overview-third',
  templateUrl: './overview-third.component.html',
  styleUrls: ['./overview-third.component.scss']
})
export class OverviewThirdComponent implements OnInit {
  @Input() data: any = null;
  @Input() criteria: string[];

  public barChartOptions: ChartOptions = {
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
        align: 'start',
        color: 'white',
        font: {
          size: 16,
          weight: 500,
        }
      }
    },
    legend: { labels: { fontSize: 16, fontStyle: 'bold' } }
  };

  public barChartLabels: Label[] = ['Weights'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Placeholder' }
  ];
  public barChartColors = [
    {backgroundColor: ['#e84351']},
    {backgroundColor: ['#434a54']},
    {backgroundColor: ['#3ebf9b']},
    {backgroundColor: ['#4d86dc']},
    {backgroundColor: ['#f3af37']},
    {backgroundColor: ['#3d3da9']},
    {backgroundColor: ['#a99a3d']},
  ];


  constructor() { }

  ngOnInit(): void {
    this.barChartData = [];
    console.log('3rd', this.criteria);
    this.data.forEach(
      (e) => {
        e.value.forEach((value, i) => {
          this.barChartData.push({ data: [+(value[0].substr(value[0].indexOf('.') - 1, value[0].indexOf('*') - 1))],
          label: this.criteria[i] });
        });
    });

  }

  onDownload(event) {
    const anchor = event.target;
    const chartUrl = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.href = chartUrl;
    anchor.download = 'weights.jpg';
  }
}

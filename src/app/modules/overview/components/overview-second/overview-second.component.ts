import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartType, ChartDataSets, ChartOptions, ChartFontOptions } from 'chart.js';

@Component({
  selector: 'app-overview-second',
  templateUrl: './overview-second.component.html',
  styleUrls: ['./overview-second.component.scss']
})
export class OverviewSecondComponent implements OnInit {
  @Input() data: any = null;

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
        },
      }
    },
    legend: { labels: { fontSize: 16, fontStyle: 'bold' } }
  };

  public barChartLabels: Label[] = ['Utilities'];
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

  constructor(
  ) { }

  ngOnInit(): void {
    this.barChartData = [];
    this.data.forEach(e => {
      this.barChartData.push({ data: [+e.value], label: e.title.substr(e.title.indexOf('(') + 1, e.title.trim().indexOf(')')-4) });
    });
  }

  transformData(value: number): ChartDataSets {
    const data = { data: [], label: 'Utilities' };
    data.data.push(value);
    return data;
  }

  onDownload(event) {
    const anchor = event.target;
    const chartUrl = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.href = chartUrl;
    anchor.download = 'weights.jpg';
  }
}

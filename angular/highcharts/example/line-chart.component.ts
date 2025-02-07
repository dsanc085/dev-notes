import {AfterViewInit, Component, Input} from '@angular/core';

import * as Highcharts from "highcharts";
window.Highcharts = Highcharts;

// Turn on the high-chart context menu view/print/download options
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

// Turn on the high-chart context menu *export* options
// NOTE:  This provides these menu options: Download CSV, Download XLS, View Data Table
import HC_exportData from "highcharts/modules/export-data";
HC_exportData(Highcharts);

// Do client-side exporting (so that the exporting does *NOT* go to https://export.highcharts.com/
// NOTE:  This does not work on all web browsers
import HC_offlineExport from "highcharts/modules/offline-exporting";
HC_offlineExport(Highcharts);

// Turn on the drill-down capabilities
import {Chart} from "highcharts";
import HC_drillDown from "highcharts/modules/drilldown";
import {ChartService} from "../../services/chart.service";
import {GetChart2DataDTO} from "../../models/get-chart2-data-dto";

HC_drillDown(Highcharts);

@Component({
    selector: 'app-line-chart-small',
    templateUrl: './line-chart-small.component.html',
    styleUrls: ['./line-chart-small.component.scss']
})
export class LineChartSmallComponent implements AfterViewInit {
    public constructor(private chartService: ChartService) {}

    @Input() showSmall: boolean = false;

    private data = fetch(
        'https://www.highcharts.com/samples/data/usdeur.json'
    ).then(response => response.json());

    private chartOptions: any = {
        chart: {
            zooming: {
                type: 'x'
            }
        },
        title: {
            text: 'USD to EUR exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgb(199, 113, 243)'],
                        [0.7, 'rgb(76, 175, 254)']
                    ]
                },
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

    };

    public ngOnInit(): void {

    }

    private reloadData(): void {
        this.chartService.getAllDataForChart2().subscribe((aData: GetChart2DataDTO[]) => {
            this.chartOptions.series = aData;

            // Render the chart to display in div
            Highcharts.chart('chart2', this.chartOptions);

            Highcharts.charts.forEach(function (chart: Chart | undefined) {
                chart?.reflow();
            });
        });

    }

    public ngAfterViewInit(): void {
        setTimeout( () => {
            this.reloadData();
        });

    }

}

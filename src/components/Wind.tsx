import { useThemeListener } from "@cac/react-utils";
import type { Data } from "../views/Root";
import { DataVisualizer } from "@cac/forest-ui";
import type { ChartsOption } from "@cac/forest-ui/dist/DataVisualizer/types";
import { useMemo } from "react";

export const Wind = ({ data }: { data: Data }): JSX.Element => {
    const { colors } = useThemeListener()

    const option = useMemo<ChartsOption>(() => {
        return {
            title: {
                text: 'Wind',
                left: 'center'
            },
            grid: [
                {
                    top: '5%',
                    height: '65%',
                    right: 60,
                    left: 50
                },
                {
                    top: '75%',
                    height: '20%',
                    right: 60,
                    left: 50
                }
            ],
            xAxis: [
                {
                    type: 'time',
                },
                {
                    type: 'time',
                    gridIndex: 1,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    scale: true
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true
                },
                {
                    type: 'value',
                    gridIndex: 1
                }
            ],
            axisPointer: {
                link: [
                    {
                        xAxisIndex: 'all'
                    }
                ]
            },
            legend: {
                orient: 'horizontal',
                type: 'scroll',
                right: 'center',
                top: 'bottom',
                width: '100%'
            },
            tooltip: {
                trigger: 'axis',

            },
            series: [
                {
                    name: 'EnergyCharts Forecast',
                    data: data.energyChartsWindIntradayForecast,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.meteologica1.toString()
                },
                {
                    name: 'EnergyCharts Actual',
                    data: data.energyChartsWindActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.meteologica2.toString()
                },
                {
                    name: 'ENTSOE Day Ahead Forecast',
                    data: data.entsoeWindDaForecast,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.tso1.toString(),
                    lineStyle: {
                        type: 'dashed'

                    }  
                },
                {
                    name: 'ENTSOE Actual',
                    data: data.entsoeWindActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.actual1.toString(),
                },
                {
                    name: 'EnergyCharts Day Ahead Forecast',
                    data: data.energyChartsWindDaForecast,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.tso1.toString(),
                    lineStyle: {
                        type: 'dashed'

                    }
                }
            ]
        }
    }, [data, colors])

    return (
        <div className="h-full">
            <DataVisualizer options={option} />
        </div>
    )
}
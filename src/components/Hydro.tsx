import { useThemeListener } from "@cac/react-utils";
import type { Data } from "../views/Root";
import { DataVisualizer } from "@cac/forest-ui";
import type { ChartsOption } from "@cac/forest-ui/dist/DataVisualizer/types";
import { useMemo } from "react";

export const Hydro = ({ data }: { data: Data }): JSX.Element => {
    const { colors } = useThemeListener()

    const option = useMemo<ChartsOption>(() => {
        return {
            title: {
                text: 'Hydro',
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
                    name: 'EnergyCharts Run of River',
                    data: data.energyChartsHydroRunOfRiverActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.meteologica1.toString()

                },
                {
                    name: 'Entsoe Run of River',
                    data: data.entsoeHydroRunOfRiverActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.actual1.toString()

                },
                {
                    name: 'EnergyCharts Reservoir',
                    data: data.energyChartsHydroReservoirActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.meteologica2.toString()

                },
                {
                    name: 'Entsoe Reservoir',
                    data: data.entsoeHydroReservoirActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.actual2.toString()

                },
                {
                    name: 'EnergyCharts Pumped Storage',
                    data: data.energyChartsHydroPumpedStorageActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.solcast1.toString()

                },
                {
                    name: 'Entsoe Pumped Storage',
                    data: data.entsoeHydroPumpedStorageActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.tso3.toString()

                },

            ]
        }
    }, [data, colors])

    return (
        <div className="h-full">
            <DataVisualizer options={option} />
        </div>
    )
}
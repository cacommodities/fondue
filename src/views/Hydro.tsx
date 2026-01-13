import { tooltipPositionF, useThemeListener } from "@cac/react-utils";
import type { Data } from "./Root";
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
                position: tooltipPositionF

            },
            series: [
                {
                    name: 'EnergyCharts Run of River Actual',
                    data: data.energyChartsHydroRunOfRiverActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.tso1.toString()

                },
                {
                    name: 'Entsoe Run of River actual',
                    data: data.entsoeHydroRunOfRiverActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.tso2.toString()

                },
                {
                    name: 'EnergyCharts Reservoir Actual',
                    data: data.energyChartsHydroReservoirActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.meteologica1.toString()

                },
                {
                    name: 'Entsoe Reservoir actual',
                    data: data.entsoeHydroReservoirActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.meteologica1.toString()

                },
                {
                    name: 'EnergyCharts Pumped Storage Actual',
                    data: data.energyChartsHydroPumpedStorageActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.solcast1.toString()

                },
                {
                    name: 'Entsoe Pumped Storage actual',
                    data: data.entsoeHydroPumpedStorageActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.solcast1.toString()

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
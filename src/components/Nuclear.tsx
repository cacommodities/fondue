import { tooltipPositionF, useThemeListener } from "@cac/react-utils";
import type { Data } from "../views/Root";
import { DataVisualizer } from "@cac/forest-ui";
import type { ChartsOption } from "@cac/forest-ui/dist/DataVisualizer/types";
import { useMemo } from "react";

export const Nuke = ({ data }: { data: Data }): JSX.Element => {
    const { colors } = useThemeListener()

    const option = useMemo<ChartsOption>(() => {
        return {
            title: {
                text: 'Nuclear',
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
                    name: 'Entsoe actual',
                    data: data.entsoeNuclearActual,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    color: colors.tso2.toString()

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
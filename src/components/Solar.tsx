import { useThemeListener } from "@cac/react-utils";
import type { Data } from "../views/Root";
import { DataVisualizer } from "@cac/forest-ui";
import type { ChartsOption } from "@cac/forest-ui/dist/DataVisualizer/types";
import { useMemo } from "react";

export const Solar = ({ data }: { data: Data }): JSX.Element => {
  const { colors } = useThemeListener()

  const option = useMemo<ChartsOption>(() => {
    return {
      title: {
        text: 'Solar',
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
          data: data.energyChartsSolarForecast,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: colors.meteologica1.toString()

        },
        {
          name: 'EnergyCharts Actual',
          data: data.energyChartsSolarActual,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: colors.meteologica2.toString()
        },
        {
          name: 'ENTSOE Actual',
          data: data.entsoeSolarActual,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: colors.actual1.toString()
        },
        {
          name: 'ENTSOE Day Ahead Forecast',
          data: data.entsoeSolarDaForecast,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: colors.tso1.toString(),
          lineStyle: {
            type: 'dashed'
        }
        },
        // {
        //   name: 'SolarLog Actual',
        //   data: data.solarLogActual,
      //   type: 'line',
        //   smooth: true,
        //   showSymbol: false,
        //   color: colors.solcast1.toString()
        // },
        // {
        //   name: 'SolarLog Additional Extrapolation',
        //   data: data.solarLogAdditionalExtrapolation,
        //   type: 'line',
        //   smooth: true,
        //   showSymbol: false,
        //   color: colors.arpege1.toString()
        // },
        {
          name: 'SolarLog Actual',
          data: data.solarLogSumActual,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: colors.solcast1.toString()
        },
        {
          name: 'EnergyCharts Day Ahead Forecast',
          data: data.energyChartsSolarDaForecast,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: colors.meteologica1.toString(),
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

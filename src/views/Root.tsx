import { SingleDatePicker, useCurrentTime } from '@cac/react-utils'
import { useDSOTreeObj } from '@cac/forest-ui'
import { type DataPoint, ops as f } from '@cac/forest'
import { addDays, isSameDay, startOfDay, startOfToday } from 'date-fns'
import { useMemo, useState } from 'react'
import { Solar } from './Solar'
import { Load } from './Load'
import { Wind } from './Wind'
import { Nuke } from './Nuclear'
import { Hydro } from './Hydro'



export const dataPointToEChartsDataPoint = (dataPoint: { timestamp: Date, value: number }): [Date, number] => {
  return [dataPoint.timestamp, dataPoint.value]
}
const entsoeSolarActual = f.fetchLatest('ENTSOE_CH_SOLAR-ACTUAL')
const energyChartsSolarActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-SOLAR')
const energyChartsSolarForecast = f.fetchLatest('ENERGY-CHARTS_CH_SOLAR-INTRADAY-FORECAST')
const energyChartsSolarDaForecast = f.fetchLatest('ENERGY-CHARTS_CH_SOLAR-DAY-AHEAD-FORECAST')


const entsoeWindActual = f.fetchLatest('ENTSOE_CH_WIND-ONSHORE-ACTUAL')
const energyChartsWindDaForecast = f.fetchLatest('ENERGY-CHARTS_CH_WIND_ONSHORE-DAY-AHEAD-FORECAST')
const energyChartsWindIntradayForecast = f.fetchLatest('ENERGY-CHARTS_CH_WIND_ONSHORE-INTRADAY-FORECAST')
const energyChartsWindActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-WIND-ONSHORE')

const energyChartsLoadActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-LOAD')
const entsoeLoadDaForecast = f.fetchLatest('EntsoeDaLoadCH')
const enstoeDaGenerationForecast = f.fetchLatest('EntsoeDaGenerationCH')


const energyChartsHydroRunOfRiverActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-HYDRO-RUN-OF-RIVER')
const energyChartsHydroReservoirActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-HYDRO-WATER-RESERVOIR')
const energyChartsHydroPumpedStorageActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-HYDRO-PUMPED-STORAGE')
const entsoeNuclearActual = f.fetchLatest('ENTSOE_CH_POWER-NUCLEAR-ACTUAL')
const entsoeHydroRunOfRiverActual = f.fetchLatest('ENTSOE_CH_HYDRO-WATER-RESERVOIR-ACTUAL')
const entsoeHydroReservoirActual = f.fetchLatest('ENTSOE_CH_HYDRO-RESERVOIR-ACTUAL')
const entsoeHydroPumpedStorageActual = f.fetchLatest('ENTSOE_CH_POWER-HYDRO-PUMPED-STORAGE-ACTUAL')








const treesDefinition = {
  energyChartsSolarForecast,
  energyChartsSolarDaForecast,
  energyChartsWindDaForecast,
  energyChartsWindIntradayForecast,
  energyChartsSolarActual,
  energyChartsLoadActual,
  entsoeWindActual,
  entsoeSolarActual,
  entsoeLoadDaForecast,
  enstoeDaGenerationForecast,
  energyChartsWindActual,
  energyChartsHydroRunOfRiverActual,
  energyChartsHydroReservoirActual,
  energyChartsHydroPumpedStorageActual,
  entsoeHydroRunOfRiverActual,
  entsoeHydroReservoirActual,
  entsoeHydroPumpedStorageActual,
  entsoeNuclearActual


}
export type Data = Record<keyof typeof treesDefinition, DataPoint[]>

export const Root = (): JSX.Element => {
  const [date, setDate] = useState<Date>(startOfToday())

  const { timestampFrom, timestampTo } = useMemo(() => {
    const timestampFrom = startOfDay(date)
    const timestampTo = addDays(timestampFrom, 1)
    return {
      timestampFrom,
      timestampTo
    }
  }, [date.getTime()])

  const now = useCurrentTime(300000)
  const relativeValue2BeforeOrigin = useMemo(() => {
    if (isSameDay(timestampFrom, now)) {
      return () => now
    } else {
      return () => timestampFrom
    }
  }, [timestampFrom, now])

  const { data, errors } = useDSOTreeObj({
    timestampFrom,
    timestampTo,
    trees: treesDefinition,
    relativeValue2BeforeOrigin
  })


  return (
    <div className='flex h-full flex-col'>
      <div className='mx-auto w-full max-w-xs'>
        <SingleDatePicker
          date={date}
          setDate={(i) => { setDate(i!) }} />
      </div>
      <div className='flex-1 overflow-hidden'>
        <div className='grid flex-1 grid-cols-2 grid-rows-2'>
          <div className='min-h-[30vh] flex-1'>
            <Solar data={data} />
          </div>
          <div className='min-h-[30vh] flex-1'>
            <Wind data={data} />
          </div>
          <div className='min-h-[30vh] flex-1'>
            <Load data={data} />
          </div>
          <div className='min-h-[30vh] flex-1'>
            <Nuke data={data} />
          </div>
          <div className='min-h-[30vh] flex-1'>
            <Hydro data={data} />
          </div>
        </div>

      </div >
    </div >
  )
}
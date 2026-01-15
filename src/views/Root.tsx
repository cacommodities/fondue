import { SingleDatePicker, useCurrentTime } from '@cac/react-utils'
import { useDSOTreeObj } from '@cac/forest-ui'
import { type DataPoint, ops as f } from '@cac/forest'
import { addDays, isSameDay, startOfDay, startOfToday } from 'date-fns'
import { useMemo, useState } from 'react'
import { Solar } from '../components/Solar'
import { Wind } from '../components/Wind'
import { Load } from '../components/Load'
import { Nuke } from '../components/Nuclear'
import { Hydro } from '../components/Hydro'
import type { ChangesPrototypeGroup } from '@cac/forest-ui/dist/ChangesVisualizerNew'
import { ChangesNew } from '../components/Changes'


export const dataPointToEChartsDataPoint = (dataPoint: { timestamp: Date, value: number }): [Date, number] => {
    return [dataPoint.timestamp, dataPoint.value]
}
const entsoeSolarActual = f.fetchLatest('ENTSOE_CH_SOLAR-ACTUAL')
const entsoeSolarDaForecast = f.fetchLatest('ENTSOE_CH_SOLAR-DA')
const energyChartsSolarActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-SOLAR')
const energyChartsSolarForecast = f.fetchLatest('ENERGY-CHARTS_CH_SOLAR-INTRADAY-FORECAST')
const energyChartsSolarDaForecast = f.fetchLatest('ENERGY-CHARTS_CH_SOLAR-DAY-AHEAD-FORECAST')
const solarLogActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-SOLAR-SOLARLOG')
const solarLogAdditionalExtrapolation = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-SOLAR-ADDITIONAL-EXTRAPOLATION')
const solarLogSumActual = f.sum({ requireAllAddends: true })([solarLogActual, solarLogAdditionalExtrapolation])

const entsoeWindActual = f.fetchLatest('ENTSOE_CH_WIND-ONSHORE-ACTUAL')
const entsoeWindDaForecast = f.fetchLatest('ENTSOE_CH_WIND-DA')
const energyChartsWindDaForecast = f.fetchLatest('ENERGY-CHARTS_CH_WIND_ONSHORE-DAY-AHEAD-FORECAST')
const energyChartsWindIntradayForecast = f.fetchLatest('ENERGY-CHARTS_CH_WIND_ONSHORE-INTRADAY-FORECAST')
const energyChartsWindActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-WIND-ONSHORE')

const energyChartsLoadActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-LOAD')
const entsoeLoadDaForecast = f.fetchLatest('EntsoeDaLoadCH')
const enstoeDaGenerationForecast = f.fetchLatest('EntsoeDaGenerationCH')
const entsoeLoadActual = f.fetchLatest('EntsoeRealisedLoadCH')

const energyChartsHydroRunOfRiverActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-HYDRO-RUN-OF-RIVER')
const energyChartsHydroReservoirActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-HYDRO-WATER-RESERVOIR')
const energyChartsHydroPumpedStorageActual = f.fetchLatest('ENERGY-CHARTS_CH_PUBLIC_POWER-HYDRO-PUMPED-STORAGE')
const entsoeNuclearActual = f.fetchLatest('ENTSOE_CH_POWER-NUCLEAR-ACTUAL')
const entsoeHydroRunOfRiverActual = f.fetchLatest('ENTSOE_CH_HYDRO-WATER-RESERVOIR-ACTUAL')
const entsoeHydroReservoirActual = f.fetchLatest('ENTSOE_CH_HYDRO-WATER-RESERVOIR-ACTUAL')
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
    entsoeNuclearActual,
    solarLogActual,
    solarLogAdditionalExtrapolation,
    solarLogSumActual,
    entsoeWindDaForecast,
    entsoeSolarDaForecast,
    entsoeLoadActual
}

export const changesVisualizerGroups: Array<ChangesPrototypeGroup<keyof typeof treesDefinition>> = [
    {
        id: 'Solar',
        label: 'Solar',
        minDpChange: 100,
        minDpChangePct: 0.2,
        enabledDataKeys: [
            'energyChartsSolarForecast',
            'energyChartsSolarDaForecast',
            'entsoeSolarDaForecast'],

        onByDefault: true
    },
    {
        id: 'Wind',
        label: 'Wind',
        minDpChange: 100,
        minDpChangePct: 0.2,
        enabledDataKeys: [
            'energyChartsWindDaForecast',
            'energyChartsWindIntradayForecast',
            'entsoeWindDaForecast'],
        onByDefault: true
    },
    {
        id: 'Load',
        label: 'Load',
        minDpChange: 100,
        minDpChangePct: 0.2,
        enabledDataKeys: [
            'entsoeLoadDaForecast',
        ],
        onByDefault: true
    },

]
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

    const { data } = useDSOTreeObj({
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
                    <div className='min-h-[30vh] flex-1'>
                        <ChangesNew data={data} groups={changesVisualizerGroups} />
                    </div>
                </div >
            </div >
        </div >
    )
}
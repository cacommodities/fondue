import { ChangesVisualizerNew } from '@cac/forest-ui/dist/ChangesVisualizerNew.js'
import { type Data, type changesVisualizerGroups } from '../views/Root'

export const ChangesNew = ({ data, groups }: { data: Data, groups: typeof changesVisualizerGroups }): JSX.Element => {
  return <div>
    <ChangesVisualizerNew data={data} groups={groups} />
  </div>
}

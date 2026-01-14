import { ThemeSwitch } from '@cac/react-utils'
import { Link } from 'react-router-dom'
import { getEnvVarOrDefault } from '../envVariablesAccess'

export const Header = (): JSX.Element => {
    const version = getEnvVarOrDefault('APP_BUILD_VERSION', 'DEV')
    return (
        <div className='h-12.5'>
            <div className="mx-auto flex h-7.5 w-full items-center justify-between bg-base-300 px-2">
                <div className="flex flex-1 gap-2">
                    <Link to="/" className='link'>Root</Link>
                </div>
                <div className="flex flex-1 justify-center">
                    <a className="text-lg">CH tool ({version})</a>
                </div>
                <div className="flex flex-1 justify-end gap-2">
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    )
}

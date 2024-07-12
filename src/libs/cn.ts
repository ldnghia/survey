import classNames, { type Argument } from 'classnames'
import { createTailwindMerge, getDefaultConfig } from 'tailwind-merge'
import defaultConfigTw from 'tailwindcss/defaultConfig'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config'

const config = resolveConfig(defaultConfigTw)

const twMerge = createTailwindMerge(() => {
    const defaultConfig = getDefaultConfig()
    return {
        ...defaultConfig,
        classGroups: {
            ...defaultConfig.classGroups,
            /**
             * Issue: tailwind-merge doesn't support font-sizes in theme keys
             * @see https://github.com/dcastil/tailwind-merge/issues/217#issuecomment-1500652940
             */
            width: [
                {
                    w: [
                        ...Object.keys(config.theme?.width || {}).map((i) => i),
                        ...Object.keys(tailwindConfig.theme.extend.width).map(
                            (i) => i
                        ),
                    ],
                },
            ],
            'font-size': [
                {
                    text: [
                        ...Object.keys(config.theme?.fontSize || {}).map(
                            (i) => i
                        ),
                        ...Object.keys(
                            tailwindConfig.theme.extend.fontSize
                        ).map((i) => i),
                    ],
                },
            ],
        },
    }
})

export function cn(...inputs: Argument[]) {
    return twMerge(classNames(inputs))
}

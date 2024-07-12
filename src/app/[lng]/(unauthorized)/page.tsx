import dynamic from 'next/dynamic'

import LoadingOverlay from '@/components/LoadingOverlay'

const Survey = dynamic(() => import('@/views/Survey'), {
    ssr: false,
    loading: () => <LoadingOverlay />,
})

export default function Home() {
    return <Survey />
}

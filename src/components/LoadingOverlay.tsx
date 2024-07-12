'use client'

import React from 'react'

import Spin from './Spin'

export interface LoadingOverlayProps {}

export default function LoadingOverlay() {
    return (
        <div className="bg-sidebar-bg fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center">
            <Spin />
        </div>
    )
}

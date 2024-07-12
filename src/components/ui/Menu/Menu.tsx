import React from 'react'

import { CheckOutlined } from '@ant-design/icons'
import { MenuProps as MenuAntdProps, Menu as MenuAntd } from 'antd'
import styled from 'styled-components'

import { cn } from '@/libs/cn'

export interface MenuProps extends MenuAntdProps {
    isSelectedIcon?: React.ReactNode
}

const StyledMenuAntd = styled(MenuAntd)`
    .ant-menu-item {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        border-radius: 4px;
        position: relative;
        height: 44px;
    }
    .ant-menu-title-content {
        width: 100%;
    }

    .ant-menu-item,
    .ant-menu-submenu-selected,
    .ant-menu-submenu-active {
        ::after {
            border: none !important;
        }
    }
    .ant-menu-submenu-title {
        line-height: 44px !important;
    }
` as typeof MenuAntd

export const Menu = ({
    className,
    isSelectedIcon = true,
    ...props
}: MenuProps) => {
    return (
        <StyledMenuAntd
            className={cn(
                'rounded-none border-0 bg-transparent text-base',
                className
            )}
            itemIcon={
                isSelectedIcon
                    ? (itemIconProps) =>
                          itemIconProps.isSelected && (
                              <CheckOutlined className="w-3 h-3" />
                          )
                    : undefined
            }
            {...props}
        />
    )
}

Menu.Item = MenuAntd.Item

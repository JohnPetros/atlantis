import { useCallback, useEffect, useMemo, useState } from 'react'

import { useIsMobile } from 'ui/hooks/use-mobile'
import type { SidebarContextValue } from './sidebar-context-props'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export function useSidebarContextProvider(isDefaultOpen: boolean) {
  const isMobile = useIsMobile()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(isDefaultOpen)

  const toggleSidebar = useCallback(() => {
    let isOpenState = isOpen
    if (isMobile) {
      isOpenState = !isMobileOpen
      setIsMobileOpen(isOpenState)
    } else {
      isOpenState = !isOpen
      setIsOpen(isOpenState)
    }
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${isOpenState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [isMobile, isMobileOpen, isOpen])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  return useMemo<SidebarContextValue>(
    () => ({
      state: isOpen ? 'expanded' : 'collapsed',
      isOpen,
      isMobile,
      isMobileOpen,
      setIsOpen,
      setIsMobileOpen,
      toggleSidebar,
    }),
    [isOpen, isMobile, isMobileOpen, toggleSidebar],
  )
}

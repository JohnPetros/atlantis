export type SidebarContextValue = {
  state: 'expanded' | 'collapsed'
  isOpen: boolean
  isMobile: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  setIsOpen: (isOpen: boolean) => void
  setIsMobileOpen: (isMobileOpen: boolean) => void
}

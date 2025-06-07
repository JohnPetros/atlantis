import { useEffect, useState } from 'react'

export const useFormDialogView = () => {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
  }

  useEffect(() => {
    function handleFormSubmit() {
      setIsOpen(false)
    }
    window.addEventListener('submit', handleFormSubmit)

    return () => {
      window.removeEventListener('submit', handleFormSubmit)
    }
  }, [])

  return {
    isOpen,
    handleOpenChange,
  }
}

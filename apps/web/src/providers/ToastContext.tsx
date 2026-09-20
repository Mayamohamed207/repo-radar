import { createContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { Snackbar, Box, Typography, Slide } from '@mui/material'
import type { SlideProps } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info'

export type ToastSeverity = 'success' | 'error' | 'info'

export interface ToastContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<ToastSeverity>('info')

  const showToast = useCallback((msg: string, sev: ToastSeverity = 'info') => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }, [])

  const contextValue = useMemo(() => ({ showToast }), [showToast])

  const handleClose = () => {
    setOpen(false)
  }

  let color = 'var(--color-primary-blue)'
  let Icon = InfoIcon

  if (severity === 'success') {
    color = 'var(--color-success)'
    Icon = CheckCircleIcon
  } else if (severity === 'error') {
    color = 'var(--color-error)'
    Icon = CancelIcon
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        slots={{ transition: SlideTransition }}
        sx={{ top: { xs: '4.5rem', sm: '5rem' } }}
      >
        <Box
          onClick={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderLeftWidth: '0.2rem',
            borderLeftColor: color,
            borderRadius: '0.6rem',
            padding: '0.5rem 1rem',
            boxShadow: 2,
            cursor: 'pointer',
            minWidth: '16rem',
            maxWidth: '90vw',
            }}
        >
          <Icon sx={{ fontSize: '1.25rem', color, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {message}
          </Typography>
        </Box>
      </Snackbar>
    </ToastContext.Provider>
  )
}
import './EmptyState.css'

interface EmptyStateProps {
  /** Message to display */
  message?: string
}

/**
 * EmptyState - Displays when no feeds are selected or no articles are available
 */
export function EmptyState({ message = 'No feeds selected. Configure feeds in Settings.' }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__message">{message}</div>
    </div>
  )
}

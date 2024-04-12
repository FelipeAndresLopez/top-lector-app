import './styles.css'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  )
}

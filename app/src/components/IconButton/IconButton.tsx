import './styles.css'

interface Props {
  children: React.ReactNode
  handleClick: () => void
}

export const IconButton: React.FC<Props> = ({ children, handleClick }) => {
  return (
    <button
      className='icon-button'
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
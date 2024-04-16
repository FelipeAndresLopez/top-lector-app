import { useNavigate } from "react-router-dom"

export const BackButton: React.FC = () => {

  const navigate = useNavigate()
  return (
    <button
      className='button btn-secondary'
      onClick={() => { navigate(-1) }}
      type="button"
    >
      Volver
    </button>
  )
}
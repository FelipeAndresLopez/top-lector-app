import { NavLink } from 'react-router-dom'
import './styles.css'
import { MENU_ITEMS } from '../../const.ts'

export const Header: React.FC = () => {
  return (
    <header>
      <div />
      <nav>
        <ul>
          {MENU_ITEMS.map(item =>
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.name}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

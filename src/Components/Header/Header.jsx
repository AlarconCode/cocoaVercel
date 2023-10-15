import { useState, useEffect, useRef } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import cup from '../../assets/icons/taza-cocoa.svg'
import cocoa from '../../assets/icons/Cocoa.svg'
import cafeTime from '../../assets/img/Dibujo-Granos-CafeTime.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";

function Header () {
  const [isOpen, setIsOpen] = useState(false)
  const {isLogin, logout} = useAuth()
  const navigate = useNavigate()
  const handleToggle = (e) => {
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }
  
  const iconMenuRef = useRef()

  useEffect(() => {
    
    const closeMenu = e => {
      const arrPath = e.composedPath()
      if (e.target.className != iconMenuRef.current.className && e.target.className != 'list-items')  {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', closeMenu)

    return () => document.body.removeEventListener('click', closeMenu)

  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (!isLogin) navigate('/')
  }, [isLogin])
  
  const iconMenu = isOpen ? <MdClose /> : <MdMenu />
  // const loginButton = <li><Link to='/login' className='menu-item'>Login</Link></li>
  // const logoutButton = <li><Link onClick={handleLogout} to='/' className='menu-item'>Logout</Link></li>
  const loginLink = <Link to='/login' className='link-loginLogout'><FaRightToBracket/></Link>
  const logoutLink = <Link to='/' className='link-loginLogout' onClick={handleLogout}><FaRightFromBracket/></Link>

  return (
    <header>
      <Link to={'/'}>
        <div className='logotipo'>
          {/* <h1 className='name'>Cocoa</h1> */}
          <img src={cocoa} alt="icono taza" className='cocoa' />
          <img src={cup} alt="icono taza" className='cup' />
        </div>
      </Link>
      <div className='link-loginLogout_container'>{!isLogin ? loginLink : logoutLink }</div>
      <div ref={iconMenuRef} className='iconMenu' onClick={handleToggle}>{iconMenu}</div>
      <div className= { isOpen ? 'menu-items-container openMenu' : 'menu-items-container closeMenu'}>
        <ul className='list-items'>
            <li>
              <Link to='/desayunos' className='menu-item'>Desayunos</Link>
            </li>
            <li>
              <Link to='/cafes' className='menu-item'>Cafés</Link>
            </li>
            <li>
              <Link to='/reposteria' className='menu-item'>Repostería</Link>
            </li>
            <li>
              <Link to='/comidas' className='menu-item'>Comidas</Link>
            </li>
            <li>
              <Link to='/bebidas' className='menu-item'>Bebidas</Link>
            </li>
            {/* <li>
              <Link to='/registro' className='menu-item'>Registrarse</Link>
            </li> */}
            {/* {isLogin ? logoutButton : loginButton} */}
        </ul>
        <div className='cafeTime'>
          <img src={ cafeTime } alt="dibujo hojas y granos de cafe" />
        </div>
      </div>
    </header>
  )
}

export default Header
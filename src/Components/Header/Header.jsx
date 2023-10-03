import { useState, useEffect, useRef } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import cup from '../../assets/icons/taza-cocoa.svg'
import cocoa from '../../assets/icons/Cocoa.svg'
import cafeTime from '../../assets/img/Dibujo-Granos-CafeTime.svg'
import { Link } from 'react-router-dom'

function Header () {
  const [isOpen, setIsOpen] = useState(false)
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
  
  const iconMenu = isOpen ? <MdClose /> : <MdMenu />

  return (
    <header>
      <div className='logotipo'>
        {/* <h1 className='name'>Cocoa</h1> */}
        <img src={cocoa} alt="icono taza" className='cocoa' />
        <img src={cup} alt="icono taza" className='cup' />
      </div>
      <div ref={iconMenuRef} className='iconMenu' onClick={handleToggle}>{iconMenu}</div>
      <div className= { isOpen ? 'menu-items-container openMenu' : 'menu-items-container closeMenu'}>
        <ul className='list-items'>
            <li>
              <Link to='/' className='menu-item'>Desayunos</Link>
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
            <li>
              <Link to='/registro' className='menu-item'>Registrarse</Link>
            </li>
            <li>
              <Link to='/login' className='menu-item'>Login</Link>
            </li>
        </ul>
        <div className='cafeTime'>
          <img src={ cafeTime } alt="dibujo hojas y granos de cafe" />
        </div>
      </div>
    </header>
  )
}

export default Header
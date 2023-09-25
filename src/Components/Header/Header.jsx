import { useState, useEffect, useRef } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import cup from '../../assets/icons/taza-cocoa.svg'
import cocoa from '../../assets/icons/Cocoa.svg'
import cafeTime from '../../assets/img/Dibujo-Granos-CafeTime.svg'

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
      // console.log(arrPath)
      console.log(e.target);
      console.log(iconMenuRef.current.className);
      console.log('click closeMenu');
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
            <li><a href='#Desayunos Básicos' className='menu-item'>Desayunos Básicos</a></li>
            <li><a href='#Desayunos Completos' className='menu-item'>Desayunos Completos</a></li>
            <li><a href='#Café 100% Arábigo' className='menu-item'>Cafés</a></li>
            <li><a href='#Repostería Casera' className='menu-item'>Repostería</a></li>
            <li><a href='#Comidas' className='menu-item'>Comidas</a></li>
            <li><a href='#Bebidas' className='menu-item'>Bebidas</a></li>
        </ul>
        <div className='cafeTime'>
          <img src={ cafeTime } alt="dibujo hojas y granos de cafe" />
        </div>
      </div>
    </header>
  )
}

export default Header
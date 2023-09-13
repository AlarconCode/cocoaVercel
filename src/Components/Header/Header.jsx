import { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import cup from '../../assets/icons/taza-cocoa.svg'

function Header () {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)
  const toggleFalse = () => setIsOpen(false)

  const iconMenu = isOpen ? <MdClose /> : <MdMenu />

  return (
      <header>
      <div className='logotipo'>
        <h1 className='name'>Cocoa</h1>
        <img src={cup} alt="icono taza" className='cup' />
      </div>
      <div className='iconMenu' onClick={handleToggle}>{iconMenu}</div>
      <div className= { isOpen ? 'menu-items-container openMenu' : 'menu-items-container closeMenu'}>
                <ul className='list-items'>
                    <li onClick={toggleFalse}><a href='#Desayunos Básicos' className='menu-item'>Desayunos Completos</a></li>
                    <li onClick={toggleFalse}><a href='#Desayunos Completos' className='menu-item'>Desayunos Completos</a></li>
                    <li onClick={toggleFalse}><a href='#Café 100% Arábigo' className='menu-item'>Café 100% Arábigo</a></li>
                    <li onClick={toggleFalse}><a href='#Repostería Casera' className='menu-item'>Repostería Casera</a></li>
                    <li onClick={toggleFalse}><a href='#Comidas' className='menu-item'>Comidas</a></li>
                    <li onClick={toggleFalse}><a href='#Bebidas' className='menu-item'>Bebidas</a></li>
                </ul> 
            </div>
    </header>
  )
}

export default Header
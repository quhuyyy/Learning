import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';

import { actions, useStore } from '../../store';
import style from './Header.module.css';
import logoIUH from '../../images/Logo.png'

function Header() {

  const navbars = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Dự đoán', link: '/predict-page' },
    { name: 'Đăng nhập', link: '/login' },
  ]

  const subNavbars = [
    {
      id: 'tab1',
      text: 'Dự đoán điểm Inlab theo Prelab',
      link: '/predict-page/bai-toan-1'
    },
    {
      id: 'tab2',
      text: 'Dự đoán điểm dựa trên ngữ cảnh',
      link: '/predict-page/bai-toan-2'
    },
    {
      id: 'tab3',
      text: 'Dự đoán điểm thi cuối kỳ',
      link: '/predict-page/bai-toan-3'
    }
  ]

  const [state, dispatch] = useStore()

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const link = useLocation()


  return (
    <>
      <Navbar className={style.root} expand='md' fixed='top'>
        {/* <NavbarBrand> */}
          <Link to="/"><img src={logoIUH} alt='logo' className={clsx(style.logo, 'mt-2')} /></Link>
        {/* </NavbarBrand> */}
        <NavbarToggler onClick={toggle} className='text-end' />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {navbars.map((item, index) => {
              if (item.name === 'Dự đoán') {
                return (
                  <div
                    key={item.name}
                    onClick={() => window.history.pushState(null, null, '#')}
                  >
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle className={clsx(style.dropdownToggle, style.navItem, 'ps-5 pe-5')} nav caret>
                        <span className={style.navbarItem}>{item.name} </span>
                      </DropdownToggle>
                      <DropdownMenu className={style.dropdownMenu}>
                        {subNavbars.map((item1, index) => (
                          <div
                            className={clsx(
                              link.pathname === item.link && style.active
                            )}
                            key={index}
                            onClick={() => {
                              navigate(item1.link);
                              dispatch(actions.setPredictedValue(''));
                              dispatch(actions.setPredictedValueFinal(''));
                              dispatch(actions.setPredictedValueQuestion(''));
                            }}
                          >
                            <DropdownItem
                              className={style.itemSubMenu}
                            >
                              <Link
                                className={clsx(style.item)}
                                to={item1.link}
                              >
                                {item1.text}
                              </Link>
                            </DropdownItem>

                          </div>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>

                  </div>
                )
              }
              return (
                <NavItem
                  className={clsx(style.navItem, 'mr-2')}
                  key={index}
                  onClick={() => navigate(item.link)}
                >
                  <Link className="nav-link ms-5 me-5" to={item.link}><span className={style.navbarItem}>{item.name}</span></Link>
                </NavItem>
              )
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </>

  );
}
export default Header;  
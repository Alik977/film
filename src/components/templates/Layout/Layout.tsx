
import Header from '../../organism/Header/Header'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
   
    </>
  )
}

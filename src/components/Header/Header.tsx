import  { useEffect } from 'react'
import { getGenresThunk } from '..//../store/slices/generesSlice' ;
import { useAppDispatch, useAppSelector } from '../../store/hooks';
export const Header = () => {

   const dispatch = useAppDispatch()
   const {isPending,genres} = useAppSelector(state => state.genresData)
   console.log(isPending)
   console.log(genres)

  useEffect(() => {
    dispatch(getGenresThunk())
  }, []);

  return (
    <div>Header</div>
  )
}


export default Header
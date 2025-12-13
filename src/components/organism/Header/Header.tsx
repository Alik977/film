import { useEffect } from 'react'
import { getGenresThunk } from '../../../store/slices/genresSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import './Header.css'
export const Header = () => {
  const dispatch = useAppDispatch()
  const { isPending, genres } = useAppSelector(
    state => state.genresData
  )

  useEffect(() => {
    dispatch(getGenresThunk())
  }, [dispatch])

  return (
    <>
    <div className='Header'><h1>FilmsAPI</h1></div>
      
      <nav className='genre'>
        {isPending && <p>Բեռնվում է...</p>}

        {!isPending &&
          genres?.map((genre) => (
            <button key={genre.id}>{genre.name}</button>
          ))
        }
      </nav>
    </>
  )
}

export default Header

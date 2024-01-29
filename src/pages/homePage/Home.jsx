import '../../assets/styles/pagesStyles/home.css'
import BottomBtn from './parts/BottomBtn'
import CenterBtns from './parts/CenterBtns'
import Entertainment from './parts/Entertainment'
import TopContent from './parts/TopContent'
import About from './parts/About'

export default function Home({ setIsOpen}) {

  return (
    <>
      <TopContent />
      <CenterBtns />
      <About />
      <Entertainment />
      <BottomBtn setIsOpen={setIsOpen} />
    </>
  )
}
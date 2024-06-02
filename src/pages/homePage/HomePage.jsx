import '../../assets/styles/pagesStyles/home.css'
import BottomBtn from './pageComponents/BottomBtn'
import CenterBtns from './pageComponents/CenterBtns'
import Entertainment from './pageComponents/Entertainment'
import TopContent from './pageComponents/TopContent'
import About from './pageComponents/About'

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
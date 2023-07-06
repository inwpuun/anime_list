import { useNavigate } from 'react-router-dom';
import './../css/side-bar.css'

type Props = {title: string, img: string, shrinked: boolean, isSelect: boolean}

export default function SideBarButton({title, img, shrinked, isSelect}: Props) {
  const style: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    color: 'rgba(255, 196, 107, 1)'
  } 

  if (isSelect) {
    img = img.replace('.svg', '-select.svg')
  }

  const navigate = useNavigate();
  const path = '/' + title.toLowerCase().replace(' ', '_')
  // if (path === '/home') path = '/'
  return (
    <>
      <input type="checkbox" checked={shrinked} readOnly />
      <div className="side_bar_button" style={isSelect ? style : {}} onClick={() => navigate(path)}>
          <img src={img} alt="logo" />
          <p>{title}</p>
      </div>
    </>
  )
}
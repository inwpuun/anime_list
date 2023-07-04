import './../css/side-bar.css'

type Props = {title: string, img: string, shrinked: boolean}

export default function SideBarButton({title, img, shrinked}: Props) {
  return (
    <>
      <input type="checkbox" checked={shrinked} readOnly />
      <div className="side_bar_button">
          <img src={img} alt="logo" />
          <p>{title}</p>
      </div>
    </>
  )
}
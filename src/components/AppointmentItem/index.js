import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleStarImg} = props
  const {id, title, date, isStarred} = eachAppointment
  const onClickingStarImgButton = () => {
    toggleStarImg(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-container">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-img-button"
          data-testId="star"
          onClick={onClickingStarImgButton}
        >
          <img src={starImgUrl} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date-text">{date}</p>
    </li>
  )
}

export default AppointmentItem

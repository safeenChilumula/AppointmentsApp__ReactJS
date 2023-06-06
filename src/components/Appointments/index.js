import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {currentList: [], title: '', date: '', isFilterActive: false}

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onSubmittingForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      currentList: [...prevState.currentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStarImg = id => {
    this.setState(prevState => ({
      currentList: prevState.currentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickingStarredButton = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredList = () => {
    const {currentList, isFilterActive} = this.state
    if (isFilterActive === true) {
      const filteredList = currentList.filter(
        eachApp => eachApp.isStarred === true,
      )
      return filteredList
    }
    return currentList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const starredHighLight = isFilterActive ? 'high-light' : ''
    const filteredAppointmentsList = this.getFilteredList()
    return (
      <div className="main-container">
        <div className="sub-container">
          <div className="form-img-container">
            <div>
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onSubmittingForm}>
                <label htmlFor="title-input" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title-input"
                  className="input-element"
                  onChange={this.onChangeTitleInput}
                  value={title}
                  placeholder="Title"
                />
                <label htmlFor="date-input" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date-input"
                  className="input-element"
                  onChange={this.onChangeDateInput}
                  value={date}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="main-img"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointments-starred-elements-container">
            <h1 className="appointments-title">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${starredHighLight}`}
              onClick={this.onClickingStarredButton}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                toggleStarImg={this.toggleStarImg}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

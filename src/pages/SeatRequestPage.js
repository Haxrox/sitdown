import Header from '../components/Header'
import AvailableSeat from '../components/AvailableSeat'
import PropTypes from 'prop-types'

const SeatRequestPage = ({building, seats}) => {
    console.log(seats);
    const availableSeats = [
        {
          responderMessage: "Hi my name is Joe Mama and I'm sitting behind you",
          leaveTime: "4:00PM",
          waitTime: "5 mins",
          tokenCost: "1",
          id: "1",
        },
        {
          responderMessage: "Hi my name is Sina Allen and I'm sitting in front of you",
          leaveTime: "44:00PM",
          waitTime: "55 mins",
          tokenCost: "2",
          id: "2",
        },
        {
          responderMessage: "Hi my name is Kerry Wang and I'm sitting beside you",
          leaveTime: "444:00PM",
          waitTime: "555 mins",
          tokenCost: "3",
          id: "3",
        },
      ]
    return (
        <div>
            <Header />
            <div >
                <h3>[{seats}] seats soon to be available at {building} </h3>
            </div>
            {availableSeats.map((obj)=> (
                <AvailableSeat key={obj.id} availableSeat={obj}/>
            ))}

        </div>
    )
}

SeatRequestPage.defaultProps = {
    building: "Building X",
    seats: 0
}

SeatRequestPage.propTypes = {
    building: PropTypes.string,
    seats: PropTypes.number
}

export default SeatRequestPage

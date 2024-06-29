import { useState } from 'react'
import { add } from 'date-fns'
import { format } from 'date-fns/format';

function App() {
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [eta, setEta] = useState()
  const [currentStamina, setCurrentStamina] = useState(0)
  const [maxStamina, setMaxStamina] = useState(90)
  const [oneStaminaDuration, setOneStaminaDuration] = useState(10)
  const [staminaFullTime, setStaminaFullTime] = useState()

  const [currentColoTix, setCurrentColoTix] = useState(0)
  const [maxColoTix, setMaxColoTix] = useState(5)
  const [oneTixDuration, setOneTixDuration] = useState({ hours: 2, minutes: 30 })
  const [currentTimeLeft, setCurrentTimeLeft] = useState({ hours: 0, minutes: 0 })

  const [now, setNow] = useState(new Date())
  setInterval(() => setNow(new Date()))

  const onRefresh = () => setEta(add(new Date(), { days: day, hours: hour, minutes: minute }))
  const onRefresh2 = () => setStaminaFullTime(
    add(new Date(), { minutes: ((maxStamina - currentStamina) * oneStaminaDuration) })
  )

  return (
    <>
      <h2>ETA CALCULATOR</h2>
      <h5>You can use this to estimate when the coffee in your mail will be gone if you don't use it</h5>
      <h3>Now is {format(now, 'PPPPpp')}</h3>
      <p>
        <span>In </span>
        <input
          value={day}
          type='number'
          min={0}
          onChange={(e) => setDay(Number(e.target.value))}
        />
        <span> day{day > 1 ? 's ' : ' '}</span>
        <input
          value={hour}
          type='number'
          min={0}
          max={23}
          onChange={(e) => setHour(Number(e.target.value))}
        />
        <span> hour{hour > 1 ? 's ' : ' '}</span>
        <input
          value={minute}
          type='number'
          min={0}
          max={59}
          onChange={(e) => setMinute(Number(e.target.value))}
        />
        <span> minute{minute > 1 ? 's,' : ','}</span>
        <br />
        <button onClick={onRefresh}>Calculate</button>
        <br />
        {eta && <h3>it is {format(eta, 'PPPPpp')}</h3>}
      </p>
      <h2>STAMINA TIME CALCULATOR</h2>
      <p>
        <label>
          Max Stamina that I want to reach:
          <input
            value={maxStamina}
            type='number'
            min={1}
            onChange={(e) => setMaxStamina(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          My Current Stamina:
          <input
            value={currentStamina}
            type='number'
            min={0}
            onChange={(e) => setCurrentStamina(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Minutes taken for stamina to increase by 1 point:
          <input
            value={oneStaminaDuration}
            type='number'
            min={0}
            onChange={(e) => setOneStaminaDuration(Number(e.target.value))}
          />
        </label>
        <br />
        <button onClick={onRefresh2}>Calculate</button>
        <br />
        {staminaFullTime && <h3>Your stamina is ESTIMATED to be {maxStamina} at {format(staminaFullTime, 'PPPPpp')}</h3>}
      </p>
      <p>
        <h2>Colosseum Ticket Full Calculator</h2>
        <label>
          Max Colo Ticket that I want to reach: 
          <input
            value={maxColoTix}
            type='number'
            min={1}
            max={5}
            onChange={(e) => setMaxColoTix(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          My Current Colo Ticket: 
          <input
            value={currentColoTix}
            type='number'
            min={0}
            onChange={(e) => setCurrentColoTix(Number(e.target.value))}
          />
        </label>
      </p>
    </>
  )
}

export default App

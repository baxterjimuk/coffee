import { useState } from 'react'
import { add } from 'date-fns'
import { format } from 'date-fns/format'
import * as duration from 'duration-fns'
import './App.css'

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
  const [oneTixDuration, setOneTixDuration] = useState({ hours: 2, minutes: 30, seconds: 0 })
  const [currentTimeLeft, setCurrentTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [coloTixFullTime, setColoTixFullTime] = useState()

  const [now, setNow] = useState(new Date())
  setInterval(() => setNow(new Date()))

  const onRefresh = () => setEta(add(new Date(), { days: day, hours: hour, minutes: minute }))
  const onRefresh2 = () => setStaminaFullTime(
    add(new Date(), { minutes: ((maxStamina - currentStamina) * oneStaminaDuration) })
  )
  const handleChangeOneTix = (e) => {
    setOneTixDuration({ ...oneTixDuration, [e.target.name]: Number(e.target.value) });
  }
  const handleChangeTimeLeft = (e) => {
    setCurrentTimeLeft({ ...currentTimeLeft, [e.target.name]: Number(e.target.value) });
  }
  const onRefresh3 = () => {
    const tixDiff = maxColoTix - currentColoTix
    const totalSeconds = tixDiff * duration.toSeconds(oneTixDuration)
    const secondsPassed = duration.toSeconds(currentTimeLeft)
    const secondsNeeded = totalSeconds - secondsPassed
    setColoTixFullTime(add(new Date(), { seconds: secondsNeeded }))
  }

  return (
    <div className='flex-container'>
      <div>
        <h2>ETA CALCULATOR</h2>
        <h5>You can use this to estimate when the coffee in your mail will be gone if you do not use it</h5>
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
        <p>
          <h2>CAN I COMPLETE DAILY 250 COFFEE TARGET?</h2>
          <label>
            Total Stamina spent so far for today:
          </label>
          <br />
          <label>
            Current available Stamina:
          </label>
          <br />
          <label>
            Stamina needed to reach 250:
          </label>
          <br />
          <label>
            Server reset time:
          </label>
          <br />
          <label>
            Total time available before server reset:
          </label>
          <br />
          <label>
            Can I just depend on normal coffee regen?
          </label>
        </p>
      </div>
      <div>
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
      </div>
      <div>
        <p>
          <h2>COLOSSEUM TICKET FULL CALCULATOR</h2>
          <label>
            Max Colo Ticket that I want to reach:
            <input
              value={maxColoTix}
              type='number'
              min={1}
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
              max={maxColoTix}
              onChange={(e) => setCurrentColoTix(Number(e.target.value))}
            />
          </label>
          <br />
          <h5> Time taken to recharge 1 colo ticket:</h5>
          <label>
            <input
              name="hours"
              value={oneTixDuration.hours}
              type='number'
              min={0}
              max={23}
              onChange={handleChangeOneTix}
            />
            Hour{oneTixDuration.hours > 1 ? 's ' : ' '}
          </label>
          <label>
            <input
              name="minutes"
              value={oneTixDuration.minutes}
              type='number'
              min={0}
              max={59}
              onChange={handleChangeOneTix}
            />
            Minute{oneTixDuration.minutes > 1 ? 's ' : ' '}
          </label>
          <label>
            <input
              name="seconds"
              value={oneTixDuration.seconds}
              type='number'
              min={0}
              max={59}
              onChange={handleChangeOneTix}
            />
            Second{oneTixDuration.seconds > 1 ? 's ' : ' '}
          </label>
          <h5>Time already passed shown in the colosseum tickets menu:</h5>
          <label>
            <input
              name="hours"
              value={currentTimeLeft.hours}
              type='number'
              min={0}
              max={23}
              onChange={handleChangeTimeLeft}
            />
            Hour{currentTimeLeft.hours > 1 ? 's ' : ' '}
          </label>
          <label>
            <input
              name="minutes"
              value={currentTimeLeft.minutes}
              type='number'
              min={0}
              max={59}
              onChange={handleChangeTimeLeft}
            />
            Minute{currentTimeLeft.minutes > 1 ? 's ' : ' '}
          </label>
          <label>
            <input
              name="seconds"
              value={currentTimeLeft.seconds}
              type='number'
              min={0}
              max={59}
              onChange={handleChangeTimeLeft}
            />
            Second{currentTimeLeft.seconds > 1 ? 's ' : ' '}
          </label>
          <br />
          <button onClick={onRefresh3}>Calculate</button>
          {coloTixFullTime && <h3>Your colosseum tickets is ESTIMATED to be {maxColoTix} at {format(coloTixFullTime, 'PPPPpp')}</h3>}
        </p>
      </div>
    </div>
  )
}

export default App

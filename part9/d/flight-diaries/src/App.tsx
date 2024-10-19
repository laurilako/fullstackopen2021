import { useState, useEffect } from 'react'
import DiaryComponent from './components/Diary'
import { Diary, NewDiary } from './types'
import { getAll, create } from './diaryService'
import { AxiosError } from 'axios'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: '',
    visibility: '',
    weather: '',
    comment: ''
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    getAll().then(diaries => setDiaries(diaries))
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const diary = await create(newDiary)
      setDiaries(diaries.concat(diary))
      setNewDiary({
        date: '',
        visibility: '',
        weather: '',
        comment: ''
      })
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.data) {
        setErrorMessage(typeof axiosError.response?.data === 'string' ? axiosError.response.data : 'An error occurred')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <h1>Create a new diary entry:</h1>
      {errorMessage && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
      <form onSubmit={diaryCreation}>
        <div>
          Date: <input
            type='date'
            value={newDiary.date}
            onChange={e => setNewDiary({ ...newDiary, date: e.target.value })}
          />
        </div>
        <div>
          <fieldset>
            <legend>Visibility:</legend>
            <div>
              <label htmlFor='visibilityGreat'>Great</label>
              <input type='radio' name='visibilityGroup' id='visibilityGreat' value='great' onChange={e => setNewDiary({ ...newDiary, visibility: e.target.value })} />
            </div>
            <div>
              <label htmlFor='visibilityGood'>Good</label>
              <input type='radio' name='visibilityGroup' id='visiblityGood' value='good' onChange={e => setNewDiary({ ...newDiary, visibility: e.target.value })} />
            </div>
            <div>
              <label htmlFor='visibilityOk'>Ok</label>
              <input type='radio' name='visibilityGroup' id='visibilityOk' value='ok' onChange={e => setNewDiary({ ...newDiary, visibility: e.target.value })} />
            </div>
            <div>
              <label htmlFor='visibilityPoor'>Poor</label>
              <input type='radio' name='visibilityGroup' id='visibilityPoor' value='poor' onChange={e => setNewDiary({ ...newDiary, visibility: e.target.value })} />
            </div>
          </fieldset>
        </div>
        <div>
          {/* Weather: <input
            type='radio'
            value={newDiary.weather}
            onChange={e => setNewDiary({ ...newDiary, weather: e.target.value })}
          /> */}
          <fieldset>
            <legend>Weather:</legend>
            <div>
              <label htmlFor='weatherSunny'>Sunny</label>
              <input type='radio' name='weatherGroup' id='weatherSunny' value='sunny' onChange={e => setNewDiary({ ...newDiary, weather: e.target.value })} />
            </div>
            <div>
              <label htmlFor='weatherRainy'>Rainy</label>
              <input type='radio' name='weatherGroup' id='weatherRainy' value='rainy' onChange={e => setNewDiary({ ...newDiary, weather: e.target.value })} />
            </div>
            <div>
              <label htmlFor='weatherCloudy'>Cloudy</label>
              <input type='radio' name='weatherGroup' id='weatherCloudy' value='cloudy' onChange={e => setNewDiary({ ...newDiary, weather: e.target.value })} />
            </div>
            <div>
              <label htmlFor='weatherStormy'>Stormy</label>
              <input type='radio' name='weatherGroup' id='weatherStormy' value='stormy' onChange={e => setNewDiary({ ...newDiary, weather: e.target.value })} />
            </div>
            <div>
              <label htmlFor='weatherWindy'>Windy</label>
              <input type='radio' name='weatherGroup' id='weatherWindy' value='windy' onChange={e => setNewDiary({ ...newDiary, weather: e.target.value })} />
            </div>
          </fieldset>
        </div>
        <div>
          Comment: <input
            type='text'
            value={newDiary.comment}
            onChange={e => setNewDiary({ ...newDiary, comment: e.target.value })}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      <h1>Diary entries:</h1>
      <div>
        {diaries.map(diary => (
          <div key={diary.id}>
            <DiaryComponent diary={diary} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App

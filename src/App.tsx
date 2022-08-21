import { useEffect, useState } from 'react'
import "./App.css";

function App() {
  const [input, setInput] = useState('');
  const [activity, setActivity] = useState([]);

  const handlerActivity = (event: any) => setInput(event.target.value)

  const submit = async (event: any) => {
    event.preventDefault()
    const getAllActivities = [
        ...JSON.parse(localStorage.getItem('activities') || '[]'), 
        { 
          id: ((JSON.parse(localStorage.getItem('activities') || '[]')).length +1), 
          description: input.toString() 
        }
    ];
    await localStorage.setItem('activities', JSON.stringify(getAllActivities))
    await window.location.reload();
  }

  const handlerCheckbox = (event: any) => {}

  useEffect(() => {
    setActivity(JSON.parse(localStorage.getItem('activities') || '[]'))
    console.log(activity) 
  }, [])

  return (
   <main>
    <div className="background"></div>
    <div className="to-do">
      <div className="to-do-input">
        <input type="text" placeholder='Atividade' id="activity" value={input} onChange={handlerActivity} />
        <button className="to-do-button" onClick={submit}>Adicionar</button>
      </div>
      <div className="to-do-list">
        {
          activity.map((_activity, index) => (
              <div className="to-do-content" key={index}>
                <span>
                  {_activity?.description}
                </span>
                <div className="to-do-content-options-item">
                  <div className="options-item-trash">
                    excluir
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
   </main>
  )
}

export default App

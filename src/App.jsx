import { useEffect, useState } from 'react'
import color from './background'
import './App.css'

function App() {
  const [count, setCount] = useState([]);
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);


  function doteprinte(e) {
    const obj = {
      id: Date.now(),
      x: e.clientX - 10,
      y: e.clientY - 50,
      background: color[Math.floor(Math.random() * color.length)]
    }


    console.log(obj, obj.x)
    setCount([...count, obj]);
  }

  function handleClickReset() {
    setCount([]);
    setRedo([]);
    setUndo([]);
  }
  useEffect(() => {

    function handleKeyDown (e){

      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        handleClickUndo();
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        handleClickRedo();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count, undo]);

  function handleClickUndo() {
    setCount((prevElement) => {
      const allElement = [...prevElement];
      const newElement = allElement.pop();
      setRedo((redo) => [...redo, newElement]);
      return allElement;
    })

  }

  function handleClickRedo() {
    setRedo((prevElement) => {
      const allElement = [...prevElement];
      const newElement = allElement.pop();
      setCount((count) => [...count, newElement]);

      return allElement;

    })
  }
  return (

    <>

<div className="buttons">
  <button onClick={handleClickUndo} disabled={count.length === 0}>Undo</button>
  <button onClick={handleClickRedo} disabled={redo.length === 0}>Redo</button>
  <button onClick={handleClickReset} disabled={count.length === 0 && redo.length === 0}>Reset</button>
</div>


      <div className='dote' onClick={doteprinte}>

        {count.length > 0 && count.map((obj) => {
          return (
            <div key={obj.id}

              className='circle' style={{
                backgroundColor: obj.background,
                left: obj.x,
                top: obj.y

              }}></div>
          )
        })}

      </div>



    </>
  )
}

export default App

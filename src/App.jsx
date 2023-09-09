import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8);

  const [number, setNumber] = useState(false);

  const [chara, setChar] = useState(false);

  const [password, setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (chara) str += `" !"#$%&'()*+,-./:;<=>?@[\]^_~""`

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, number, chara, setPassword])

  const copyPasswordToClipboard = useCallback(() => { 
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password) }, [password])

  useEffect(() => { passwordGenerator() }, [length, number, chara, passwordGenerator])

  // passwordGenerator()

  return (
    <>
      <h1 className='text-white text-center my-20 text-4xl '>Auto Password Generator</h1>
      <div className=" max-w-4xl mx-auto  shadow-md rounded-lg px-4 my-20 text-orange-600  bg-zinc-600 ">
        <h1 className='text-4xl mb-5 text-center text-white'>Password Generator</h1>
        <div className="flex shadow-md rounded-md overflow-hidden mb-4">
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password '
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-green-500 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className="flex text-sm gap-2">
          <div className="flex items-center gap-1">
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex text-sm gap-2">
            <input type="checkbox"
              defaultChecked-={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex text-sm gap-2">
            <input type="checkbox"
              defaultChecked-={chara}
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

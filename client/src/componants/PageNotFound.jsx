import React from 'react'

const HandleClick = async () => {
  const url ="http://localhost:3000"
  const options = {
    method: "POST",
    cache: "no-cache",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({})
  }
  const res = await fetch(`${url}/logout`, options)
  const data = await res.json();
  console.log(data);
  console.log(".............................")
}

const PageNotFound = () => {
  return (
    <div>
      <h1>404 NotFoundPage</h1>
      <button type='submit' onClick={HandleClick}>Submit</button>
    </div>
  )
}

export default PageNotFound

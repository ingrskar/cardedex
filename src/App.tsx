import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <h1>Search page</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  )
}

export default App

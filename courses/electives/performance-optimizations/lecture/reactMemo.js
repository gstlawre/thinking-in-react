import React, { useState, useCallback, useMemo } from 'react'
import Heading from 'YesterTech/Heading'

export default function App() {
  const [count, setCount] = useState(0)

  // const onUpdate = useCallback(() => {
  //   console.log('User was updated')
  // }, [])

  const meta = useMemo(() => {
    return {}
  }, [])

  return (
    <div className="align-center spacing">
      <Heading size={4}>Parent Component (App)</Heading>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <UserProfile userId={5} meta={meta} />
    </div>
  )
}

const UserProfile = React.memo(() => {
  console.log('Render')

  return (
    <div>
      <Heading size={4}>Child Component (UserProfile)</Heading>
      <p className="text-small">
        Check the console to see how many times I render when the parent state changes
      </p>
    </div>
  )
})

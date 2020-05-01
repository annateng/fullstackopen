import { useState } from 'react'

export const useField = type => {
  const [val, setVal] = useState('')

  return {
    type,
    val,
    onChange: e => setVal(e.target.value),
    reset: () => setVal('')
  }
}
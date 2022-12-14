import {useState, useEffect} from 'react'

const useLocalStorage = (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, value.toString())
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
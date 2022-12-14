const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map(name => {
    const messages = backendErrors[name].join(' ')
    return `${name} ${messages}`
  })

  return (
    <ul className="error-messages">
      {errorMessages.map(errorMessage => (
        <li key={errorMessage}>{errorMessage}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages
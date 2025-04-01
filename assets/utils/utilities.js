export function getRandomCharacter (characters) {
  return characters[Math.floor(Math.random() * characters.length)]
}

export function shuffleString (text) {
  const characters = text.split('')
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[characters[i], characters[j]] = [characters[j], characters[i]]
  }
  return characters.join('')
}

export function showTemporaryAlert (message) {
  const alertElement = document.createElement('div')
  alertElement.className = 'alerta'
  Object.assign(alertElement.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ff4d4d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: '1000'
  })
  alertElement.textContent = message

  document.body.appendChild(alertElement)

  setTimeout(() => {
    alertElement.style.opacity = '0'
    alertElement.style.transition = 'opacity 0.5s'
    setTimeout(() => document.body.removeChild(alertElement), 500)
  }, 3000)
}

// Geração de senhas e validação
import { getRandomCharacter, shuffleString } from '../utils/utilities.js'

export function generateRandomPassword (settings) {
  const availableCharacters = getAvailableCharacters(settings)
  if (!availableCharacters.length) return ''

  let password = ensureMinimumCharacterTypes(settings)
  const remainingCharacters = settings.length - password.length

  for (let i = 0; i < remainingCharacters; i++) {
    password +=
      availableCharacters[
        Math.floor(Math.random() * availableCharacters.length)
      ]
  }

  return shuffleString(password)
}

function getAvailableCharacters ({
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols
}) {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let characters = ''
  if (useLowercase) characters += lowercaseChars
  if (useUppercase) characters += uppercaseChars
  if (useNumbers) characters += numberChars
  if (useSymbols) characters += symbolChars

  return characters.split('')
}

function ensureMinimumCharacterTypes ({
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols
}) {
  let result = ''
  if (useLowercase) result += getRandomCharacter('abcdefghijklmnopqrstuvwxyz')
  if (useUppercase) result += getRandomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  if (useNumbers) result += getRandomCharacter('0123456789')
  if (useSymbols) result += getRandomCharacter('!@#$%^&*()_+-=[]{}|;:,.<>?')
  return result
}

export function validateCharacterOptions (options) {
  return (
    options.useUppercase ||
    options.useLowercase ||
    options.useNumbers ||
    options.useSymbols
  )
}

import {
  generateRandomPassword,
  validateCharacterOptions
} from '../assets/js/passwordService.js'

describe('Password Service', () => {
  test('should generate password of correct length', () => {
    const options = {
      length: 12,
      useUppercase: true,
      useLowercase: true,
      useNumbers: true,
      useSymbols: true
    }

    const password = generateRandomPassword(options)
    expect(password.length).toBe(12)
  })

  test('should include specified character types', () => {
    const options = {
      length: 20,
      useUppercase: true,
      useLowercase: true,
      useNumbers: true,
      useSymbols: true
    }

    const password = generateRandomPassword(options)
    expect(/[A-Z]/.test(password)).toBe(true)
    expect(/[a-z]/.test(password)).toBe(true)
    expect(/[0-9]/.test(password)).toBe(true)
    expect(/[^A-Za-z0-9]/.test(password)).toBe(true)
  })

  test('should validate character options correctly', () => {
    expect(
      validateCharacterOptions({
        useUppercase: false,
        useLowercase: false,
        useNumbers: false,
        useSymbols: false
      })
    ).toBe(false)

    expect(
      validateCharacterOptions({
        useUppercase: true,
        useLowercase: false,
        useNumbers: false,
        useSymbols: false
      })
    ).toBe(true)
  })
})

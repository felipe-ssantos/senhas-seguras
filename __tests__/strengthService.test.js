import {
  calculatePasswordStrengthScore,
  isWeakPassword
} from '../assets/js/strengthService.js'

describe('Strength Service', () => {
  test('should correctly identify weak passwords', () => {
    // Senha curta
    expect(isWeakPassword('abc123')).toBe(true)

    // Apenas números
    expect(isWeakPassword('12345678')).toBe(true)

    // Apenas letras minúsculas
    expect(isWeakPassword('abcdefghij')).toBe(true)

    // Apenas letras maiúsculas
    expect(isWeakPassword('ABCDEFGHIJ')).toBe(true)

    // Apenas letras mistas
    expect(isWeakPassword('AbCdEfGhIj')).toBe(true)

    // Números e minúsculas apenas
    expect(isWeakPassword('abcdef123')).toBe(true)
  })

  test('should identify medium or strong passwords', () => {
    // Senha com todos os tipos de caracteres
    expect(isWeakPassword('Abc123!@#')).toBe(false)
  })

  test('should calculate correct strength score', () => {
    // Teste para pontuação de comprimento
    const shortPassword = 'a'
    expect(calculatePasswordStrengthScore(shortPassword)).toBeLessThan(30)

    // Teste para pontuação de variedade
    const variedPassword = 'Aa1!'
    expect(calculatePasswordStrengthScore(variedPassword)).toBeGreaterThan(40)

    // Teste para senha completa
    const strongPassword = 'Abcde12345!@#$%'
    expect(calculatePasswordStrengthScore(strongPassword)).toBeGreaterThan(80)
  })
})

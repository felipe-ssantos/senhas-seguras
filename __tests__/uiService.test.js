import { evaluatePasswordStrength } from '../assets/js/strengthService.js'

document.body.innerHTML = `
  <input id="campoDeSenha" />
  <div id="barraForca"></div>
  <div id="textoForca"></div>
`

describe('UI Service', () => {
  test('should update strength bar correctly', () => {
    const passwordField = document.getElementById('campoDeSenha')
    const strengthBar = document.getElementById('barraForca')
    const strengthText = document.getElementById('textoForca')

    // Teste senha vazia
    evaluatePasswordStrength('', strengthBar, strengthText)
    expect(strengthBar.className).toBe('barra-forca senha-vazia')
    expect(strengthText.textContent).toBe('')

    // Teste senha fraca
    evaluatePasswordStrength('123456', strengthBar, strengthText)
    expect(strengthBar.className).toBe('barra-forca senha-fraca')
    expect(strengthText.textContent).toBe('Fraca')

    // Teste senha média 
    evaluatePasswordStrength('Abc123def', strengthBar, strengthText)
    expect(strengthBar.className).toContain('senha-media')
    expect(strengthText.textContent).toBe('Média')

    // Teste senha forte 
    evaluatePasswordStrength('Abc123!@#Def', strengthBar, strengthText)
    expect(strengthBar.className).toContain('senha-forte')
    expect(strengthText.textContent).toBe('Forte')

    // Teste senha muito forte 
    evaluatePasswordStrength('Abc123!@#Def456$%^', strengthBar, strengthText)
    expect(strengthBar.className).toContain('senha-muito-forte')
    expect(strengthText.textContent).toBe('Muito Forte')
  })
})

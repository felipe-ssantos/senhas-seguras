// Interações da interface
import {
  generateRandomPassword,
  validateCharacterOptions
} from './passwordService.js'
import { evaluatePasswordStrength } from './strengthService.js'
import { showTemporaryAlert } from '../utils/utilities.js'

export function initializePasswordGenerator () {
  const uiElements = getUIElements()
  setupEventListeners(uiElements)
  generateNewPassword(uiElements)
}

function getUIElements () {
  return {
    passwordField: document.getElementById('campoDeSenha'),
    copyButton: document.getElementById('botaoCopiar'),
    lengthSlider: document.getElementById('comprimentoSenha'),
    lengthValue: document.getElementById('valorComprimento'),
    includeUppercase: document.getElementById('incluirMaiusculas'),
    includeLowercase: document.getElementById('incluirMinusculas'),
    includeNumbers: document.getElementById('incluirNumeros'),
    includeSymbols: document.getElementById('incluirSimbolos'),
    generateButton: document.getElementById('botaoGerar'),
    strengthBar: document.getElementById('barraForca'),
    strengthText: document.getElementById('textoForca')
  }
}

function setupEventListeners (uiElements) {
  const {
    lengthSlider,
    generateButton,
    copyButton,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    passwordField
  } = uiElements
  
  lengthSlider.addEventListener('input', () => updateLengthDisplay(uiElements))
  
  generateButton.addEventListener('click', () =>
    generateNewPassword(uiElements)
  )
  copyButton.addEventListener('click', () =>
    copyPasswordToClipboard(uiElements)
  )
  
  passwordField.addEventListener('input', () =>
    evaluatePasswordStrength(
      passwordField.value,
      uiElements.strengthBar,
      uiElements.strengthText
    )
  )
  
  const options = [
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  ]
  options.forEach(option => {
    option.addEventListener('change', () => {
      if (passwordField.value) {
        evaluatePasswordStrength(
          passwordField.value,
          uiElements.strengthBar,
          uiElements.strengthText
        )
      }
    })
  })
}

function updateLengthDisplay ({ lengthSlider, lengthValue }) {
  lengthValue.textContent = lengthSlider.value
}

function generateNewPassword (uiElements) {
  const options = {
    length: parseInt(uiElements.lengthSlider.value),
    useUppercase: uiElements.includeUppercase.checked,
    useLowercase: uiElements.includeLowercase.checked,
    useNumbers: uiElements.includeNumbers.checked,
    useSymbols: uiElements.includeSymbols.checked
  }

  if (!validateCharacterOptions(options)) {
    showTemporaryAlert('Selecione pelo menos uma opção para gerar a senha')
    return
  }

  uiElements.passwordField.value = generateRandomPassword(options)
  evaluatePasswordStrength(
    uiElements.passwordField.value,
    uiElements.strengthBar,
    uiElements.strengthText
  )
}

function copyPasswordToClipboard ({ passwordField, copyButton }) {
  if (!passwordField.value) return

  passwordField.select()
  document.execCommand('copy')

  const originalButtonText = copyButton.innerHTML
  copyButton.innerHTML = '<span class="icone-copiar">✓</span>'

  setTimeout(() => {
    copyButton.innerHTML = originalButtonText
  }, 1500)
}

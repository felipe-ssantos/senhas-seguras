// Cálculo de força da senha
export function calculatePasswordStrengthScore (password) {
  let score = 0

  // Pontuação de comprimento (até 30 pontos)
  score += Math.min(30, password.length * 2)

  // Pontuação de variedade de character (até 40 pontos)
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^A-Za-z0-9]/.test(password)

  score +=
    (hasLowercase ? 10 : 0) +
    (hasUppercase ? 10 : 0) +
    (hasNumbers ? 10 : 0) +
    (hasSymbols ? 10 : 0)

  // Pontuação de characters únicos (até 30 pontos)
  score += Math.min(30, new Set(password).size * 1.5)

  return score
}

// Função simplificada para verificar senha fraca
export function isWeakPassword (password) {
  // Se a senha for menor que 8 caracteres, é fraca
  if (password.length < 8) {
    return true
  }

  // Verificar tipos de caracteres na senha
  const temMinuscula = /[a-z]/.test(password)
  const temMaiuscula = /[A-Z]/.test(password)
  const temNumero = /[0-9]/.test(password)
  const temSimbolo = /[^A-Za-z0-9]/.test(password)

  if (temNumero && !temMinuscula && !temMaiuscula && !temSimbolo) {
    return true
  }

  if (temMinuscula && !temMaiuscula && !temNumero && !temSimbolo) {
    return true
  }

  if (temMaiuscula && !temMinuscula && !temNumero && !temSimbolo) {
    return true
  }

  if (temMaiuscula && temMinuscula && !temNumero && !temSimbolo) {
    return true
  }

  if (temNumero && temMinuscula && !temMaiuscula && !temSimbolo) {
    return true
  }

  if (temNumero && temMaiuscula && !temMinuscula && !temSimbolo) {
    return true
  }

  const tiposDeCaracteres =
    0 +
    (temMinuscula ? 1 : 0) +
    (temMaiuscula ? 1 : 0) +
    (temNumero ? 1 : 0) +
    (temSimbolo ? 1 : 0)

  return tiposDeCaracteres < 3
}

export function evaluatePasswordStrength (
  password,
  strengthBarElement,
  strengthTextElement
) {
  // Se não tiver senha, limpa a barra
  if (!password || password.length === 0) {
    strengthBarElement.className = 'barra-forca senha-vazia'
    strengthTextElement.textContent = ''
    return
  }

  // Verifica se a senha é fraca
  if (isWeakPassword(password)) {
    strengthBarElement.className = 'barra-forca senha-fraca'
    strengthTextElement.textContent = 'Fraca'
    return
  }

  // Calcula a pontuação para determinar se é média, forte ou muito forte
  const score = calculatePasswordStrengthScore(password)
  strengthBarElement.className = 'barra-forca'

  if (score < 40) {
    strengthBarElement.classList.add('senha-fraca')
    strengthTextElement.textContent = 'Fraca'
  } else if (score < 70) {
    strengthBarElement.classList.add('senha-media')
    strengthTextElement.textContent = 'Média'
  } else if (score < 90) {
    strengthBarElement.classList.add('senha-forte')
    strengthTextElement.textContent = 'Forte'
  } else {
    strengthBarElement.classList.add('senha-muito-forte')
    strengthTextElement.textContent = 'Muito Forte'
  }
}

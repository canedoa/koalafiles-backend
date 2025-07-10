// verify.js
const jwt = require('jsonwebtoken');

// Primer argumento de la línea de comandos
const token  = process.argv[2]; 
// Usa el mismo secreto que tu backend (o el fallback 'CHANGE_ME')
const secret = process.env.JWT_SECRET || 'CHANGE_ME';

try {
  const payload = jwt.verify(token, secret);
  console.log('Firma válida. Payload:', payload);
} catch (err) {
  console.error('Firma inválida:', err.message);
}

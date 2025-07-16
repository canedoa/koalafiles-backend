// Script para generar hashes de contraseñas con bcrypt
// Script para generar hashes de contraseñas con bcrypt para varios usuarios
const bcrypt = require('bcrypt');

const usuarios = [
  { email: 'administracion@gmail.com', password: 'Lc041096.' },
  { email: 'celeste@gmail.com', password: 'Ca041096.' },
  { email: 'admi1@gmail.com', password: 'Ca041096.' },
  { email: 'carlos2@gmail.com', password: 'Cl041096.' },
  { email: 'hector@gmail.com', password: 'He041096.' },
  { email: 'laura@gmail.com', password: 'La041096.' },

  // Agrega más usuarios aquí
];

const saltRounds = 10;

(async () => {
  for (const { email, password } of usuarios) {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      console.log(
        `UPDATE users SET password = '${hash}' WHERE email = '${email}';`,
      );
    } catch (err) {
      console.error(`Error para ${email}:`, err);
    }
  }
})();

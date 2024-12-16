/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    "./**/*.{html,js}", // Isso ainda é válido, mas precisamos adicionar a exclusão do node_modules
    "!./node_modules/**"  // Adiciona esta linha para evitar que o Tailwind processe arquivos dentro de node_modules
  ],
  theme: {
    fontFamily: {
      'sans' : ['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        "home": "url('../assets/bg.png')"
      }
      
    },
  },
  plugins: [],
}



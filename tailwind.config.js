/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {

    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'

    },
    extend: {
      colors:{
          darkB:'#45A29E',
          neonB:'#e34d42',
          Grey:'#dac8de',
          matte:'#1F2833',
          blackish:'#0B0C10'
      },
    },
  },
  plugins: [],
}


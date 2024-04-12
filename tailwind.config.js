/** @type {import('tailwindcss').Config} */
export default {
  // como não vamos usar a pasta src vamos tirar. Antes estava ['./src/**/*.{html,js}']
  content: ['./**/*.{html,js}', './*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

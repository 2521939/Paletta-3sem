import axios from 'axios';

/*
  Instância do axios com a URL base e o cabeçalho de autenticação.
  Todas as requisições feitas com "api" já levam essas configurações.
*/
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // desiste da requisição após 10 segundos
/*   headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  }, */
});

export default api;
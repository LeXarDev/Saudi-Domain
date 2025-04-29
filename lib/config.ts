export const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://dosa.lexardev.xyz'
    : 'http://localhost:3000'
};

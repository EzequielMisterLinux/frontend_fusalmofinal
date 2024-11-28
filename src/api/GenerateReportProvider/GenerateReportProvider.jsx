import axios from 'axios';

axios.defaults.withCredentials = true;
const urlReport = import.meta.env.VITE_URL;

export const generarReporte = async ({ categoria, stock }) => {
  const query = new URLSearchParams();
  if (categoria) query.append('categoria', categoria);
  if (stock) query.append('stock', stock);

  try {
    const response = await axios.get(`${urlReport}/reporte?${query.toString()}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte.pdf');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    throw error;
  }
};

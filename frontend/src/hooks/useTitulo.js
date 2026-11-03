import { useEffect } from 'react';

// Cambia el título de la pestaña según la página que se está viendo
export default function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | Atletic Gym` : 'Atletic Gym | Hierro, sudor y gloria';
  }, [titulo]);
}

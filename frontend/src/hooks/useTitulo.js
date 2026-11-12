import { useEffect } from 'react';

export default function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | Atletic Gym` : 'Atletic Gym | Hierro, sudor y gloria';
  }, [titulo]);
}

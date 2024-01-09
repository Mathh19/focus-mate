import { useEffect, useState } from 'react';

export const usePreviewAvatar = (imageUrl?: string) => {
  const [previewAvatar, setPreviewAvatar] = useState<Blob>();

  useEffect(() => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(async (response) => setPreviewAvatar(await response.blob()))
        .catch((error) => console.error('Erro ao buscar a imagem:', error));
    }
  }, [imageUrl]);

  return { previewAvatar, setPreviewAvatar };
};

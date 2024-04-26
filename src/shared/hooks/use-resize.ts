import { useEffect, useState } from "react";

export const useResize = (width: number ) => {
  const [pageWidth, setPageWidth] = useState<null | number>(null);

  const handleResize = (event: Event) => {
    const target = event.target as Window
    setPageWidth(target.innerWidth);
  };

  useEffect(() => {
    setPageWidth(window.innerWidth)
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: typeof pageWidth === 'number' ? Boolean(pageWidth < width) : null,
  };
};

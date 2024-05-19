import { useState } from 'react';

const Image = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full">
      {!isLoaded && !hasError && (
        <div
          className='absolute z-0 min-h-full top-0 left-0 w-full h-full flex items-center justify-center bg-slate-[#f0f0f0] font-sans text-[#ccc]'
        >
          Loading...
        </div>
      )}
      {hasError ? (
        <img
          src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
          alt="fallback"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: isLoaded ? 'block' : 'none', width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default Image;
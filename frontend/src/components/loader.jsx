import { useEffect, useState } from 'react';
import { Hourglass } from 'react-loader-spinner';

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFade(false), 1000); // Start fade-out after 1s
    const hideTimer = setTimeout(() => setVisible(false), 1500); // Hide after fade-out
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`flex justify-center items-center h-full w-full fixed top-0 left-0 z-50 bg-white transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.5s' }}
    >
      <Hourglass
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
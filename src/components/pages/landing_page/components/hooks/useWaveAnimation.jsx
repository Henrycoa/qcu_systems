// src/components/pages/landing_page/hooks/useWaveAnimation.js
import { useState, useRef } from 'react';

const useWaveAnimation = () => {
  const [waveActive, setWaveActive] = useState(false);
  const sectionRefs = useRef({});

  const triggerWaveAnimation = (sectionId) => {
    setWaveActive(true);

    const wave = document.createElement('div');
    wave.className = 'wave-animation';
    wave.style.position = 'fixed';
    wave.style.top = '50%';
    wave.style.left = '50%';
    wave.style.width = '0';
    wave.style.height = '0';
    wave.style.borderRadius = '50%';
    wave.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
    wave.style.transform = 'translate(-50%, -50%)';
    wave.style.zIndex = '9999';
    wave.style.pointerEvents = 'none';
    
    document.body.appendChild(wave);
    
    const duration = 800;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const scale = progress * 3;
        wave.style.width = `${scale * 100}vw`;
        wave.style.height = `${scale * 100}vw`;
        wave.style.opacity = `${1 - progress}`;
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(wave);
        setWaveActive(false);
        
        if (sectionRefs.current[sectionId]) {
          sectionRefs.current[sectionId].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    
    requestAnimationFrame(animate);
  };

  return { waveActive, triggerWaveAnimation, sectionRefs };
};

export default useWaveAnimation;
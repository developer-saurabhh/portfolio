import { useEffect } from 'react';
import { playHoverSound, playClickSound } from '@/lib/sounds';

export function useSoundEffects() {
  useEffect(() => {
    const handleHover = () => playHoverSound();
    const handleClick = () => playClickSound();

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('click', handleClick);
      });
    };

    // Initial + observe for dynamic elements
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('click', handleClick);
      });
    };
  }, []);
}

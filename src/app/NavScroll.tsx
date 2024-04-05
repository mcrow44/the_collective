import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all"

const Button = () => {
    const handleClick = () => {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: 'Power2.easeOut',
      });
    };
  
    return (
      <button onClick={handleClick}>Scroll to Top</button>
    );
  };


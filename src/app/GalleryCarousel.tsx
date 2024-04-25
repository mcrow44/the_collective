'use client';
import Image from "next/image";
import styles from "./page.module.css";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { clear } from "console";
import { SpeedInsights } from "@vercel/speed-insights/next"

const IMAGE_DATA = [
  {
    src: '/image1.jpg',
    alt: 'Image 1',
    fill:true,
  },
  {
    src: '/image2.jpg',
    alt: 'Image 2',
    fill:true,
  },
  {
    src: '/image3.png',
    alt: 'Image 3',
    fill:true,
  },
  {
    src: '/image4.png',
    alt: 'Image 4',
    fill:true,
  },
  {
    src: '/image5.jpg',
    alt: 'Image 5',
    fill:true,
  },
  {
    src: '/image6.png',
    alt: 'Image 6',
    fill:true,
  },
  {
    src: '/HALFTONEPOSTERSALL.jpg',
    alt: 'HALFTONEPOSTERSALL',
    fill:true,
  },
]

const NUM_IMAGES = IMAGE_DATA.length

const GalleryCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);

  const currentImageData = IMAGE_DATA[currentSlide];
  const slide = () => {
    return (
    <div className={styles.carouselitem}>
        <div className={styles.gradientLeft}></div>
        <div className={styles.prevPrevImage}>
            <Image {...IMAGE_DATA[(currentSlide - 2 + NUM_IMAGES) % NUM_IMAGES]} />;
        </div>
        <div className={styles.prevImage}>
            <Image {...IMAGE_DATA[(currentSlide - 1 + NUM_IMAGES) % NUM_IMAGES]} />;
        </div>
        <div className={styles.currentImage}>
            <Image {...currentImageData} />;
        </div>
        <div className={styles.gradientRight}></div>
        <div className={styles.nextImage}>
            <Image {...IMAGE_DATA[(currentSlide + 1 + NUM_IMAGES) % NUM_IMAGES]} />;
        </div>
        <div className={styles.nextNextImage}>
            <Image {...IMAGE_DATA[(currentSlide + 2 + NUM_IMAGES) % NUM_IMAGES]} />;
        </div>
    </div>
    )
  }

  const prevSlide = async() => {
    const prevSlideIndex = (currentSlide - 1 + NUM_IMAGES) % NUM_IMAGES;
    await animatePrevSlide(currentSlide);
    setCurrentSlide(prevSlideIndex);
  };

  const nextSlide = async () => {
    const nextSlideIndex = (currentSlide + 1 + NUM_IMAGES) % NUM_IMAGES;
    await animateNextSlide(currentSlide);
    setCurrentSlide(nextSlideIndex);
  };

  useEffect(() => {
    if(initialized) {
      clearAnimations()
    } else {
      setInitialized(true);
    }
  }, [nextSlide])

  const animateNextSlide = async (nextSlideIndex: number) => {
    return Promise.all([
      gsap.fromTo(
        `.${styles.currentImage}`,
        {
          x: "0%", // initial position
          scale: 1, // initial scale
          opacity: 1, // initial opacity
        },
        {
          x: "-106.25%", // final position
          scale: .75, // final scale
          opacity: 1, // final opacity
          duration: 1, // duration of the animation
          ease: "power2.inOut", // easing function
        }
      ),
      gsap.fromTo(
        `.${styles.prevImage}`,
        {
          x: "0%", // initial position
          scale: .75,
          opacity: 1, // initial opacity
        },
        {
          x: "-106.25%", // final position
          scale: .75,
          opacity: 1, // final opacity
          duration: 1, // duration of the animation
          ease: "power2.inOut", // easing function
        }
      ),
      gsap.fromTo(
        `.${styles.nextImage}`,
        {
          x: "0%", // initial position
          scale: .75, // initial scale
          opacity: 1, // initial opacity
        },
        {
          x: "-106.25%", // final position
          scale: 1, // final scale
          opacity: 1, // final opacity
          duration: 1, // duration of the animation
          ease: "power2.inOut", // easing function
        }
      ),
      gsap.fromTo(
        `.${styles.nextNextImage}`,
        {
          x: "0%", // initial position
          opacity: 1, // initial opacity
          scale: .75,
        },
        {
          x: "-100%", // final position
          opacity: 1, // final opacity
          duration: 1, // duration of the animation
          scale: .75,
          ease: "power2.inOut", // easing function
        }
      )
    ]);
  };

  const animatePrevSlide = async (nextSlideIndex: number) => {
    return Promise.all([
    gsap.fromTo(
      `.${styles.currentImage}`,
      {
        x: "0%", // initial position
        scale: 1, // initial scale
        opacity: 1, // initial opacity
      },
      {
        x: "106.25%", // final position
        scale: .75, // final scale
        opacity: 1, // final opacity
        duration: 1, // duration of the animation
        ease: "power2.inOut", // easing function
      }
    ),
    gsap.fromTo(
      `.${styles.prevImage}`,
      {
        x: "0%", // initial position
        scale: .75, // initial scale
        opacity: 1, // initial opacity
      },
      {
        x: "106.25%", // final position
        scale: 1, // final scale
        opacity: 1, // final opacity
        duration: 1, // duration of the animation
        ease: "power2.inOut", // easing function
      }
    ),
    gsap.fromTo(
      `.${styles.nextImage}`,
      {
        x: "0%", // initial position
        scale: .75,
        opacity: 1, // initial opacity
      },
      {
        x: "106.25%", // final position
        scale: .75,
        opacity: 1, // final opacity
        duration: 1, // duration of the animation
        ease: "power2.inOut", // easing function
      }
    ),
    gsap.fromTo(
      `.${styles.prevPrevImage}`,
      {
        x: "-0", // initial position
        opacity: 1, // initial opacity
        scale: .75,
      },
      {
        x: "100%", // final position
        opacity: 1, // final opacity
        duration: 1, // duration of the animation
        scale: .75,
        ease: "power2.inOut", // easing function
      }
    )
    ]);
  };

  const clearAnimations = (): void => {
    gsap.killTweensOf(`.${styles.currentImage}`);
    gsap.killTweensOf(`.${styles.prevImage}`);
    gsap.killTweensOf(`.${styles.nextImage}`);
    gsap.killTweensOf(`.${styles.nextNextImage}`);
    gsap.killTweensOf(`.${styles.prevPrevImage}`);

    gsap.set(`.${styles.currentImage}`, { clearProps: "all" });
    gsap.set(`.${styles.prevImage}`, { clearProps: "all" });
    gsap.set(`.${styles.nextImage}`, { clearProps: "all" });
    gsap.set(`.${styles.nextNextImage}`, { clearProps: "all" });
    gsap.set(`.${styles.prevPrevImage}`, { clearProps: "all" });
  };

  console.log(currentSlide);

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselIn}>
        {slide()}
        <button className={styles.prev} onClick={() => prevSlide()}><Image
                src="/arrow.left.svg"
                alt="work text"
                className={styles.cromaticArrowLeft}
                width={55.567}
                height={150}
                priority
              /></button>
        <button className={styles.next} onClick={() => nextSlide()}><Image
                src="/arrow.right.svg"
                alt="work text"
                className={styles.cromaticArrowRight}
                width={55.567}
                height={150}
                priority
              /></button>
      </div>
    </div>
  );
};

export default GalleryCarousel;
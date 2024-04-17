'use client'
import Image from "next/image";
import styles from "../../page.module.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { log } from "console";
import Modal from "../../Modal";
import Link from 'next/link'
import PhotoGrid from '../../PhotoGrid';



gsap.registerPlugin(ScrollToPlugin)

export default function Home() {

  const container = useRef<HTMLDivElement>(null);
  const blockLeft = useRef<HTMLDivElement>(null);
  const blockRight = useRef<HTMLDivElement>(null);
  const leftTop = useRef<HTMLDivElement>(null);
  const leftBottom = useRef<HTMLDivElement>(null);
  const rightBottom = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const centertwo = useRef<HTMLDivElement>(null);
  const biography = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  
    const handleClickHome = () => {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: 'Power2.easeOut',
      });
    };

    const handleClickDesign = () => {
      gsap.to(window, {
        scrollTo: "#design",
        duration: 1,
        ease: 'Power2.easeOut',
      });
    };

    const handleClickContact = () => {
      gsap.to(window, {
        scrollTo: "#contact",
        duration: 1,
        ease: 'Power2.easeOut',
      });
    };
  

    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };


  const animateHeroItems = () => {
    const bw = document.getElementsByClassName("center")[0];
    const color = document.getElementsByClassName("centertwo")[0];
    
    gsap.timeline()
      .to(bw, {
        opacity: 0,
        transform: 'translateX(-80px)',
        duration: 1,
        ease: 'ease-in-out'
      })
      .to(color, {
        opacity: 0,
        transform: 'translateX(-80px)',
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1'); // Start this animation 1 second before the end of the previous one
  };

  const animateHeroItemsTwo = () => {
    if(leftTop?.current && leftBottom?.current && rightBottom?.current && biography?.current) {
    gsap.timeline()
      .to(leftTop?.current, {
        opacity: 0,
        duration: 1,
        ease: 'ease-out'
      },)
      .to(leftBottom?.current, {
        opacity: 0,
        duration: 1,
        ease: 'ease-out'
      }, '-=1')
      .to(rightBottom?.current, {
        opacity: 1,
        duration: 1,
        ease: 'ease-out',
        visibility: "visible"
      }, '-=1')
      .to(biography?.current,{
        opacity: 1,
        duration: 1,
        ease: 'ease-in'
      }, '-=1'); // Start this animation 1 second before the end of the previous one
    }
  };

  const animateWhiteOutMain = () => {
    if(center?.current && center?.current && blockLeft?.current && blockRight?.current) {
    gsap.timeline()
      .to(center?.current,{
        transform: 'translateX(-80px)', // corrected "translatex" to "translateX"
        duration: 1,
        ease: 'ease-in-out'
      },)
      .to(center?.current,{
        transform: 'translateX(-80px)', // corrected "translatex" to "translateX"
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1.09')  
      .to(blockLeft?.current, {
        transform: 'translateX(-355px)',
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1.09')
      .to(blockRight?.current, {
        transform: 'translateX(-880px)', // corrected "translatex" to "translateX"
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1.09'); // Start this animation 1 second before the end of the previous one
    }
  };

  const unanimateHeroItemsTwo = () => {
    if(leftTop?.current && leftBottom?.current && rightBottom?.current && biography?.current) {
    gsap.timeline()
      .to(leftTop?.current, {
        opacity: 1,
        duration: 1,
        ease: 'ease-in-out'
      },)
      .to(leftBottom?.current, {
        opacity: 1,
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1')
      .to(rightBottom?.current, {
        opacity: 0,
        duration: 1,
        ease: 'ease-out',
        visibility: "hidden"
      }, '-=1')
      .to(biography?.current,{
        opacity: 0,
        duration: 1,
        ease: 'ease-in'
      }, '-=5'); // Start this animation 1 second before the end of the previous one
    }
  };

  const unanimateWhiteOutMain = () => {
    if(center?.current && blockLeft?.current && blockRight?.current) {
    gsap.timeline()
      .to(center?.current,{
        transform: 'translateX(0px)', // corrected "translatex" to "translateX"
        duration: 1,
        ease: 'ease-in-out'
      },)
      .to(center?.current,{
        transform: 'translateX(0px)', // corrected "translatex" to "translateX"
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1.09')  
      .to(blockLeft?.current, {
        transform: 'translateX(0px)',
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1.09')
      .to(blockRight?.current, {
        transform: 'translateX(0px)', // corrected "translatex" to "translateX"
        duration: 1,
        ease: 'ease-in-out'
      }, '-=1.09'); // Start this animation 1 second before the end of the previous one
    }
  };
  

  const onContactFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: { [key: string]: string } = {};
    const elements = e.currentTarget.elements as unknown as Array<
      HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
    >;

    Array.from(elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    console.log(formData)
    await fetch('/contact/send', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        // setMessage(res.message);
        // setStatus(res.status);
        // setDisabled(res.message.length > 0);
        alert("Thank you! Your message has been sent.");
        // document.contact-form.reset();
        const form = document.getElementById('contact-form') as HTMLFormElement | null;
        if (form) {
          form.reset();
        }
      });
  };

  const photos = [
    '../image3.png',
    '../bc.png',
    '../tycard.png',
    '../letter.png',
    '../envelope.png',
    '../lanyard.jpg',
    '../Hoodie.png',
    '../Polo.jpg',
    // Add more photo URLs as needed
  ];

  const photos2 = [
    '../twlogo.png',
    '../bcard.png',
    '../notecard.png',
    '../twletter.png',
    '../laptop.png',
    '../mug.png',
    // Add more photo URLs as needed
  ];

  const photos3 = [
    '../c-1.jpg',
    
    // Add more photo URLs as needed
  ];
  return (
        
    
    <section className={styles.body} ref={bodyRef}>
      <main className={styles.main}>
        <div className={styles.description}>
          
          <div className={styles.headerLogo}>
            <a href="../../"><Image
                src="/cromatic.dark.svg"
                alt="cromatic Logo"
                className={styles.mainLogo}
                width={240}
                height={108}
                priority
              />
            </a>
          </div>

          <nav className={styles.headerNav}>
            <ul className={styles.navBar}>
              <a href="../"><li className={styles.Home}>back</li></a>
              <a onClick={handleClickHome}><li className={styles.Home}>Portrait</li></a>
              <a onClick={handleClickDesign}><li className={styles.Home}>landscape</li></a>
              <a onClick={handleClickContact}><li className={styles.Home}>auto</li></a>
            </ul>
          </nav>
        </div>

        <div className={styles.pageTitle}>
            <Image 
            src="/branding.svg" 
            alt="Branding header" 
            width={450}
            height={100}
            priority
            />

            
          </div>
          <div className={styles.projTitle}><h2>cromatic collective</h2></div>

          <div>
            <h1>Photo Gallery</h1>
            <PhotoGrid photos={photos} />
          </div>
        <div id="design"></div>
        <div className={styles.spacer}></div>
          <div className={styles.projTitle}><h2>tina weaver ma, lmhc</h2></div>

          <div>
            <h1>Photo Gallery</h1>
            <PhotoGrid photos={photos2} />
          </div>
          {/* <div id="contact"></div> */}

          <div className={styles.spacer}></div>
          <div className={styles.spacer}></div>
        <section>
          
        </section>
        <section>
        
            
        </section>
      </main>
      <footer>
        <div className={styles.footer}>
          <p className={styles.allRights}>Cromatic Collective © All Rights Reserved</p>
          <a href="https://www.instagram.com/cromatic_collective/" target="_blank"><Image
          src="/insta.logo.svg"
          alt="insta logo"
          className={styles.instaLogo}
          width={40}
          height={40}
          priority
          /></a>
          <a href="https://twitter.com/CromaticCo" target="_blank"><Image
          src="/x.logo.svg"
          alt="x logo"
          className={styles.xLogo}
          width={40}
          height={40}
          priority
          /></a>
        </div>
      </footer>
    </section>
  );
}

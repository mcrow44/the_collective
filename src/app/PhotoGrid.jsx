'use client'
import Image from "next/image";
import styles from "./page.module.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import React, { FormEvent, useEffect, useRef, useState } from "react";
// import { log } from "console";
import Modal from "./Modal";
import Link from 'next/link'
import { SpeedInsights } from "@vercel/speed-insights/next"


const PhotoGrid = ({ photos }) => {
    return (
      <div className={styles.photoGrid}>
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} className={styles.photo} />
        ))}
      </div>
    );
  };

  export default PhotoGrid;
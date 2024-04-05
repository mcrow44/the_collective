import React, { FC, forwardRef,useEffect, useRef, useState, HTMLAttributes } from "react";
import styles from "./page.module.css";
import closeModal from "./Modal";
import Modal from "./Modal";

type ModalContentProps = {
  closeModal: () => void;
} & HTMLAttributes<HTMLDivElement>;

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
  return (
    <div className={styles.modalContentContainer} ref={ref}>
      <img className={styles.exit} src="/exit.svg" alt="exit" width="32px" height="32px" onClick={props.closeModal}/> 
      <img className={styles.exit2} src="/exit2.svg" alt="exit" width="32px" height="32px" onClick={props.closeModal}/> 
      <img className={styles.header} src="/modalHeader.svg" alt="image1" width="800px" height="100px"/> 
        <div className={styles.mainModalContent}>
            
                <h2>photos</h2>            
            <img src="/image1.jpg" alt="image1" width="800px" height="533.3333px"/>
                <h2>posters</h2>
            <img src="/image2.jpg" alt="image2" width="800px" height="533.3333px"/>
                <h2>branding</h2>
            <img src="/image3.png" alt="image3" width="800px" height="533.3333px"/>
                <h2>T-shirts</h2>
            <img src="/image4.png" alt="image4" width="800px" height="533.3333px"/>
        </div>
        {/* <div>
            <img className={styles.overlay1_1} src="/overlay.svg" alt="image1" width="800px" height="533.3333px"/><img className={styles.overlay1_2} src="/photosOverlay.svg" alt="image1" width="200px" height="90px"/>
        </div> */}
    </div>
  );
});

export default ModalContent;

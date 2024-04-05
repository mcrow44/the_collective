import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./page.module.css";
import ModalContent from "./ModalContent";

const Modal = (props: any) => {
  let modalVeil:any = null;
  let modalDialog:any = null;
  const modalContent = useRef<HTMLDivElement>(null);

  const [modalTween] = useState(gsap.timeline({ paused: true }));

  useEffect(() => {
    modalTween
      .to(modalVeil, { autoAlpha: 1, duration: .1 })
      .to(modalDialog, { y: 0, autoAlpha: 1, duration: .1 })
      // .from(
      //   modalContent.children,
      //   0.35,
      //   { y: 15, opacity: 1, stagger: 0.1 },
      //   "-=0.15"
      // )
      .reverse();
  }, []);

  useEffect(() => {
    if (props.visible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [props.visible])

  useEffect(() => {
    modalTween.reversed(!props.visible);
  }, [props.visible]);

  const closeModal = () => {
    modalTween.reverse();
    gsap.delayedCall(modalTween.duration(), props.close);
  };

  return (
    <div className={props.visible ? styles.modalContainerShow : styles.modalContainer}>
      <div
        className={styles.modalVeil}
        ref={e => (modalVeil = e)}
        onClick={closeModal}
      />
      <div className={styles.modalDialog} ref={e => (modalDialog = e)}>
        <ModalContent ref={modalContent} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Modal;

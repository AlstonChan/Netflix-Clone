import styles from "./modals.module.scss";
import ImageNotFound from "@/public/images/browse/image-not-found.png";

import { useContext, useEffect, useMemo, useRef, useState } from "react";

import Image from "@chan_alston/image";
import { AnimatePresence } from "framer-motion";
import { BrowseContext } from "../common/BrowseContext";

import MovieDetails from "./MovieDetails";
import MovieDetailsOpen from "./MovieDetailsOpen";
import IconGroup from "./IconGroup";
import ModalWarn from "../ModalWarn";
import Loader from "@/components/Loader";

import type { CSSProperties } from "react";
import type { MouseEvent } from "react";

export default function Modals() {
  const {
    modal: modalProps,
    openModal,
    modalToggle,
  } = useContext(BrowseContext);

  const [close, setClose] = useState(false);
  const [modalTranslate, setModalTranslate] = useState<string | null>(null);
  const [modalVisibility, setModalVisibility] = useState<string | null>(null);
  const [modalWidth, setModalWidth] = useState<number | null>(null);
  const [modalWarn, setModalWarn] = useState(false);
  const delayRef = useRef<NodeJS.Timeout | null>(null);
  const openModalRef = useRef({ firstTime: false });

  useEffect(() => {
    let modalTranslateVal = "";
    if (modalProps) {
      if (modalProps.position === "leftEdge")
        modalTranslateVal = "translate(0, -25%)";
      if (modalProps.position === "rightEdge")
        modalTranslateVal = "translate(-28.5%, -25%)";
      if (modalProps.position === "middle")
        modalTranslateVal = "translate(-13%, -25%)";

      if (!openModal) {
        setModalWidth(modalProps.width);
        setModalTranslate("translate(0)");
        setModalVisibility(styles.modalShow);
        setTimeout(() => {
          setModalWidth(modalProps.width * 1.4);
          setModalTranslate(modalTranslateVal);
        }, 150);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalProps]);

  useEffect(() => {
    setModalVisibility("");
  }, []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useMemo(() => {
    if (close && modalToggle) {
      setModalVisibility("closing");
      setTimeout(() => {
        setClose(false);
        modalToggle("close");
        openModalRef.current = { firstTime: false };
        setTimeout(() => {
          setModalVisibility("");
        }, 190);
      }, 100);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close]);

  const handleWindowResize = () => {
    if (openModal && !openModalRef.current.firstTime) {
      setModalWidth(window.innerWidth);
      openModalRef.current = { firstTime: true };
    } else if (openModal && openModalRef.current.firstTime) {
      if (delayRef.current) clearTimeout(delayRef.current);
      delayRef.current = setTimeout(() => {
        setModalWidth(window.innerWidth);
      }, 500);
    } else openModalRef.current = { firstTime: false };
  };

  function toggleModalFunc(e: MouseEvent) {
    if (e.type === "mouseleave" && !openModal && modalProps) {
      if (!openModal && !openModalRef.current.firstTime) {
        setTimeout(() => {
          setModalWidth(modalProps.width);
          setModalTranslate("translate(0)");
          setTimeout(() => {
            setModalVisibility("");
          }, 300);
        }, 200);
      }
    }
    // return;
  }

  function localCloseModal(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    if (openModal && e.currentTarget == e.target) {
      setClose(true);
    }
  }

  // Tell user to verify their email address when
  // their account is not verified and attempt to
  // add movie or tv shows to their list
  function toggleModalWarn() {
    setModalWarn(true);
    setTimeout(() => setModalWarn(false), 5000);
  }

  const mainModalClass = !openModal
    ? `${styles.mainModals} ${modalVisibility}`
    : `${styles.mainModals} ${modalVisibility} ${styles.bigModal}`;

  if (!modalProps || !modalWidth) return null;

  const modalContainerStyles: CSSProperties = {
    // position: !openModal && "relative",
    width: modalWidth ? `${modalWidth.toString()}px` : "",
    transform: !openModal && modalTranslate ? modalTranslate : "",
    opacity:
      modalVisibility === "closing"
        ? 0
        : modalTranslate === "translate(0)"
        ? 0
        : 1,
    transition: modalVisibility === "closing" ? "opacity 500ms ease-out" : "",
  };

  const modalImage = !openModal
    ? modalProps.movieData?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${modalProps.movieData.backdrop_path}`
      : ImageNotFound
    : modalProps.movieData?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${modalProps.movieData.backdrop_path}`
    : ImageNotFound;

  return (
    <>
      <AnimatePresence mode="wait">
        {modalWarn ? <ModalWarn type="movie" /> : ""}
      </AnimatePresence>
      {openModal && (
        <div className={styles.darkBgModal} onClick={() => setClose(true)} />
      )}
      {modalVisibility ? (
        <div
          className={mainModalClass}
          style={
            !openModal
              ? modalProps.style
              : modalWidth < 500
              ? { padding: "1.5rem" }
              : { padding: `3rem` }
          }
          onMouseEnter={(e) => toggleModalFunc(e)}
          onMouseLeave={(e) => toggleModalFunc(e)}
          onClick={(e) => localCloseModal(e)}
        >
          <div style={modalContainerStyles} className={styles.modalsContainer}>
            <div className={!openModal ? "" : styles.upperPanel}>
              <div className={styles.mainImageContainer}>
                <Image
                  src={modalImage}
                  w="500"
                  h="281"
                  className={styles.backdrop_pathStyle}
                  alt="movie thumbnails"
                  responsive={true}
                />
                {openModal ? <div className={styles.blend}></div> : ""}
                {/* <span className={styles.backdrop_placeholder}></span> */}
                {/* This backdrop placeholder is the main cause of modal image flashing */}
                {openModal ? (
                  <IconGroup
                    mov={modalProps.movieData}
                    modalToggle={modalToggle}
                    openModal={openModal}
                    toggleModalWarn={toggleModalWarn}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className={!openModal ? styles.lowerPanel : styles.lowerPanelOpen}
            >
              {openModal ? (
                ""
              ) : (
                <IconGroup
                  mov={modalProps.movieData}
                  modalToggle={modalToggle}
                  toggleModalWarn={toggleModalWarn}
                />
              )}

              {modalProps.movieData ? (
                !openModal ? (
                  <MovieDetails modalProps={modalProps} />
                ) : (
                  <MovieDetailsOpen modalProps={modalProps} />
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

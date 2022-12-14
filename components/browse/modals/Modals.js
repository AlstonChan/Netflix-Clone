import styles from "@/styles/browse/modals.module.css";
import imageNotFound from "@/public/images/image-not-found.png";

import { useEffect, useMemo, useRef, useState } from "react";
import ImageRender from "@chan_alston/image";
import { AnimatePresence } from "framer-motion";

import MovieDetails from "./MovieDetails";
import MovieDetailsOpen from "./MovieDetailsOpen";
import IconGroup from "./IconGroup";
import ModalWarn from "../ModalWarn";

export default function Modals({
  modalStyle,
  openModal,
  modalToggle,
  close,
  setClose,
}) {
  const [modalTranslate, setModalTranslate] = useState({});
  const [modalVisibility, setModalVisiblity] = useState();
  const [modalWidth, setModalWidth] = useState();
  const [modalWarn, setModalWarn] = useState(false);
  const delayRef = useRef();
  const openModalRef = useRef({ firstTime: false });

  useEffect(() => {
    let modalTranslateVal = "";
    if (modalStyle.position === "leftEdge")
      modalTranslateVal = "translate(0, -25%)";
    if (modalStyle.position === "rightEdge")
      modalTranslateVal = "translate(-28.5%, -25%)";
    if (modalStyle.position === "middle")
      modalTranslateVal = "translate(-13%, -25%)";

    if (!openModal) {
      setModalWidth(modalStyle.width);
      setModalTranslate("translate(0)");
      setModalVisiblity(styles.modalShow);
      setTimeout(() => {
        setModalWidth(parseInt(modalStyle.width, 10) * 1.4);
        setModalTranslate(modalTranslateVal);
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalStyle]);

  useEffect(() => {
    setModalVisiblity("");
  }, []);

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useMemo(() => {
    if (close) {
      setModalVisiblity("closing");
      setTimeout(() => {
        setClose(false);
        modalToggle("close");
        openModalRef.current = { firstTime: false };
        setTimeout(() => {
          setModalVisiblity("");
        }, 190);
      }, 100);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close]);

  const handleWindowResize = () => {
    if (openModal && !openModalRef.current.firstTime) {
      setModalWidth(window.innerWidth);
      openModalRef.current = { firstTime: true };
    } else if (openModal && openModalRef.current.firstTime) {
      clearTimeout(delayRef.current);
      delayRef.current = setTimeout(() => {
        setModalWidth(window.innerWidth);
      }, 500);
    } else openModalRef.current = { firstTime: false };
  };

  function toggleModalFunc(e) {
    if (e.type === "mouseleave" && !openModal) {
      if (!openModal && !openModalRef.current.firstTime) {
        setTimeout(() => {
          setModalWidth(modalStyle.width);
          setModalTranslate("translate(0)");
          setTimeout(() => {
            setModalVisiblity("");
          }, 300);
        }, 200);
      }
    }
    // return;
  }

  function localCloseModal(e) {
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

  const modalContainerStyles = {
    // position: !openModal && "relative",
    width: modalWidth,
    transform: !openModal && modalTranslate,
    opacity:
      modalVisibility === "closing"
        ? 0
        : modalTranslate === "translate(0)"
        ? 0
        : 1,
    transition: modalVisibility === "closing" ? "opacity 500ms ease-out" : "",
  };

  const modalImage = !openModal
    ? modalStyle.movieSet?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${modalStyle.movieSet.backdrop_path}`
      : imageNotFound
    : modalStyle.movieSet?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${modalStyle.movieSet.backdrop_path}`
    : imageNotFound;

  return (
    <>
      <AnimatePresence mode="wait">
        {modalWarn ? <ModalWarn type="movie" /> : ""}
      </AnimatePresence>
      {modalVisibility ? (
        <div
          className={mainModalClass}
          style={
            !openModal
              ? modalStyle.mainClass
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
                <ImageRender
                  src={modalImage}
                  w="1364px"
                  h="768px"
                  className={styles.backdrop_pathStyle}
                  alt="movie thumbnails"
                />
                {openModal ? <div className={styles.blend}></div> : ""}
                {/* <span className={styles.backdrop_placeholder}></span> */}
                {/* This backdrop placeholder is the main cause of modal image flashing */}
                {openModal ? (
                  <IconGroup
                    mov={modalStyle.movieSet}
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
                  mov={modalStyle.movieSet}
                  modalToggle={modalToggle}
                  toggleModalWarn={toggleModalWarn}
                />
              )}

              {modalStyle.movieSet ? (
                !openModal ? (
                  <MovieDetails modalStyle={modalStyle} />
                ) : (
                  <MovieDetailsOpen modalStyle={modalStyle} />
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

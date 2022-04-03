import styles from "../../../styles/browse/modals.module.css";
import imageNotFound from "../../../public/images/image-not-found.png";

import { useEffect, useMemo, useRef, useState } from "react";
import ImageRender from "../../ImageRender";
import MovieDetails from "./movieDetails";
import MovieDetailsOpen from "./movieDetailsOpen";

import IconGroup from "./iconGroup";

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
    console.log(e.currentTarget);
    console.log(e.target);
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    if (openModal && e.currentTarget == e.target) {
      setClose(true);
    }
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
    : `https://image.tmdb.org/t/p/w1280${modalStyle.movieSet.backdrop_path}`;

  return modalVisibility ? (
    <div
      className={mainModalClass}
      style={!openModal ? modalStyle.mainClass : { padding: `3rem` }}
      onMouseEnter={(e) => toggleModalFunc(e)}
      onMouseLeave={(e) => toggleModalFunc(e)}
      onClick={(e) => localCloseModal(e)}
    >
      <div style={modalContainerStyles} className={styles.modalsContainer}>
        <div className={!openModal ? "" : styles.upperPanel}>
          <div className={styles.mainImageContainer}>
            <ImageRender
              src={modalImage}
              width="1364"
              height="768"
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
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={!openModal ? styles.lowerPanel : styles.lowerPanelOpen}>
          {openModal ? (
            ""
          ) : (
            <IconGroup mov={modalStyle.movieSet} modalToggle={modalToggle} />
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
  );
}

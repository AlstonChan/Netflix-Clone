import styles from "../../../styles/browse/modals.module.css";
import imageNotFound from "../../../public/images/image-not-found.png";

import { useEffect, useRef, useState } from "react";
import ImageRender from "../../ImageRender";
import MovieDetails from "./movieDetails";
import MovieDetailsOpen from "./movieDetailsOpen";

import IconGroup from "./iconGroup";

export default function BrowseModals({ modalStyle, openModal, modalToggle }) {
  const [modalTranslate, setModalTranslate] = useState("");
  const [modalVisibility, setModalVisiblity] = useState();
  const [modalWidth, setModalWidth] = useState();
  const delayRef = useRef();
  const openModalRef = useRef({ firstTime: false });

  useEffect(() => {
    setModalWidth(modalStyle.width);
    setModalVisiblity(styles.modalShow);
    setTimeout(() => {
      setModalWidth(parseInt(modalStyle.width, 10) * 1.4);
      setModalTranslate(
        modalStyle.position == "leftEdge"
          ? "translate(0, -25%)"
          : modalStyle.position == "rightEdge"
          ? "translate(-28.5%, -25%)"
          : modalStyle.position == "middle"
          ? "translate(-13%, -25%)"
          : ""
      );
    }, 150);
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

  const handleWindowResize = () => {
    if (openModal.state && !openModalRef.current.firstTime) {
      setModalWidth(window.innerWidth);
      openModalRef.current = { firstTime: true };
    } else if (openModal.state && openModalRef.current.firstTime) {
      clearTimeout(delayRef.current);
      delayRef.current = setTimeout(() => {
        setModalWidth(window.innerWidth);
      }, 500);
    } else openModalRef.current = { firstTime: false };
  };

  function toggleModalFunc(e) {
    if (e.type === "mouseleave" && !openModal.state) {
      setTimeout(() => {
        setModalWidth(modalStyle.width);
        setModalTranslate("translate(0)");
        setTimeout(() => {
          setModalVisiblity("");
        }, 190);
      }, 100);
    }
    // return;
  }

  function closeOpenModal(e) {
    e.stopPropagation();
    e.preventDefault();
    e.bubbles = false;
    e.nativeEvent.stopImmediatePropagation();
    if (openModal.state && e.currentTarget === e.target) {
      setModalVisiblity("");
      modalToggle();
      openModalRef.current = { firstTime: false };
    }
  }

  return modalVisibility ? (
    <div
      className={
        !openModal.state
          ? `${styles.mainModals} ${modalVisibility}`
          : `${styles.mainModals} ${modalVisibility} ${styles.bigModal}`
      }
      style={
        !openModal.state
          ? modalStyle.mainClass
          : { backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "3rem" }
      }
      onClick={(e) => closeOpenModal(e)}
      onMouseEnter={(e) => toggleModalFunc(e)}
      onMouseLeave={(e) => toggleModalFunc(e)}
    >
      <div
        style={{
          width: modalWidth,
          transform: !openModal.state && modalTranslate,
          opacity: 1,
          maxWidth: "1240px",
        }}
        className={styles.modalsContainer}
      >
        <div className={!openModal.state ? "" : styles.upperPanel}>
          <div className={styles.mainImageContainer}>
            <ImageRender
              src={
                !openModal.state
                  ? modalStyle.movieSet?.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${modalStyle.movieSet.backdrop_path}`
                    : imageNotFound
                  : `https://image.tmdb.org/t/p/w1280${modalStyle.movieSet.backdrop_path}`
              }
              width="1364"
              height="768"
              className={styles.backdrop_pathStyle}
              alt="movie thumbnails"
            />
            {openModal.state ? <div className={styles.blend}></div> : ""}
            {/* <span className={styles.backdrop_placeholder}></span> */}
            {/* This backdrop placeholder is the main 
            cause of modal image flashing */}
            {openModal.state ? (
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
        <div
          className={
            !openModal.state ? styles.lowerPanel : styles.lowerPanelOpen
          }
        >
          {openModal.state ? (
            ""
          ) : (
            <IconGroup mov={modalStyle.movieSet} modalToggle={modalToggle} />
          )}

          {modalStyle.movieSet ? (
            !openModal.state ? (
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

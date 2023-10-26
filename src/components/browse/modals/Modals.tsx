// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./modals.module.scss";
import ImageNotFound from "@/public/images/browse/image-not-found.png";

import { useContext, useEffect, useState } from "react";

import Image from "@chan_alston/image";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { BrowseContext } from "../common/BrowseContext";

import MovieDetailsFull from "./movieDetails/MovieDetailsFull";
import MovieDetailsSmall from "./movieDetails/MovieDetailsSmall";
import InteractionMenu from "./InteractionMenu/InteractionMenu";
import SnackBar from "@/components/common/snackbar/SnackBar";

import type { MouseEvent } from "react";
import type { ModalType } from "../types";
import type { SnackBarStateType } from "@/components/common/snackbar/types";

export default function Modals() {
  const {
    modal: modalProps,
    modalFull,
    modalToggle,
  } = useContext(BrowseContext);

  // indicate the state of modal, open or close
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeSnackBar: SnackBarStateType = {
    isOpen: false,
    msg: "",
    title: "",
  };
  const [snackBarState, setSnackBarState] =
    useState<SnackBarStateType>(closeSnackBar);

  // close function for snackbar
  const onClose = () => {
    setSnackBarState(closeSnackBar);
  };

  useEffect(() => {
    if (modalProps && !modalFull) {
      setModalIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalProps]);

  useEffect(() => {
    setModalIsOpen(false);
  }, []);

  function toggleBigModal(e: MouseEvent, state: "open" | "close") {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (!modalToggle) return;

    if (state === "close" && e.currentTarget == e.target && modalToggle) {
      setModalIsOpen(false);
      modalToggle("close");
    }
  }

  // modal exits function
  function toggleModalFunc(e: MouseEvent) {
    if (e.type === "mouseleave" && !modalFull && modalProps) {
      if (!modalFull) {
        setTimeout(() => {
          setModalIsOpen(false);
        }, 300);
      }
    }
  }

  if (!modalProps) return null;

  const mainModalClass = `${styles.mainModals} ${modalFull && styles.bigModal}`;

  const modalImage = (modalProps: ModalType) => {
    const src = modalProps.movieData?.backdrop_path
      ? `https://image.tmdb.org/t/p/${modalFull ? "w1280" : "w500"}${
          modalProps.movieData.backdrop_path
        }`
      : ImageNotFound;

    return src;
  };

  const getXCords = () => {
    switch (modalProps.position) {
      case "leftEdge":
        return 0;
      case "rightEdge":
        return "-28.5%";
      case "middle":
        return "-13%";
      default:
        throw new Error("Unexpected modal position");
    }
  };

  const modalVariants: Variants = modalFull
    ? {
        initial: { width: modalProps.width * 1.4, x: 0, y: 0 },
        animate: { width: "auto", x: 0, y: 0 },
        exit: { width: "auto", x: 0, y: 0 },
      }
    : {
        initial: { width: modalProps.width, x: 0, y: 0 },
        animate: { width: modalProps.width * 1.4, x: getXCords(), y: "-25%" },
        exit: {
          width: modalProps.width,
          x: 0,
          y: 0,
          opacity: 0,
          transition: { ease: "easeOut", duration: 0.3 },
        },
      };

  return (
    <>
      <SnackBar
        variant="error"
        title={snackBarState.title}
        message={snackBarState.msg}
        isOpen={snackBarState.isOpen}
        onClose={onClose}
      />
      {modalFull && (
        <div
          className={styles.darkBgModal}
          onClick={(e) => toggleBigModal(e, "close")}
        />
      )}
      <AnimatePresence>
        {modalIsOpen && (
          <div
            key="modal"
            className={mainModalClass}
            style={!modalFull ? modalProps.style : {}}
            onClick={(e) => toggleBigModal(e, "close")}
          >
            <motion.div
              className={styles.modalsContainer}
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                ease: "linear",
                duration: 0.2,
              }}
              onMouseEnter={(e) => toggleModalFunc(e)}
              onMouseLeave={(e) => toggleModalFunc(e)}
            >
              {/* upper panel */}
              <div className={styles.upperPanel}>
                <Image
                  src={modalImage(modalProps)}
                  w="500"
                  h="281"
                  className={styles.backdrop_pathStyle}
                  alt="movie thumbnails"
                  responsive={true}
                />

                {modalFull && <div className={styles.blend}></div>}
                {/* <span className={styles.backdrop_placeholder}></span> */}
                {/* This backdrop placeholder is the main cause of modal image flashing */}
                {modalFull && (
                  <InteractionMenu
                    mov={modalProps.movieData}
                    setSnackBarState={setSnackBarState}
                  />
                )}
              </div>
              {/* lower panel  */}
              <div
                className={`${styles.lowerPanel} ${modalFull && styles.big}`}
              >
                {!modalFull && (
                  <InteractionMenu
                    mov={modalProps.movieData}
                    setSnackBarState={setSnackBarState}
                  />
                )}

                {!modalFull ? (
                  <MovieDetailsSmall modalProps={modalProps} />
                ) : (
                  <MovieDetailsFull modalProps={modalProps} />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

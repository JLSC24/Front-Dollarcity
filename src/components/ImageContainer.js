import React from "react";
import Image from "./image";
import useIntersectionObserver from "../hooks/use-intersection-observer";
import { Link } from "react-router-dom";
import "./ImageContainer.css";

const ImageContainer = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          props.onIsVisible();
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });

  const aspectRatio = (props.height / props.width) * 100;

  return (
    <Link
      to={props.url}
      ref={ref}
      rel="noopener noreferrer"
      target="_BLANK"
      className="image-container"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {isVisible && <Image src={props.src} alt={props.alt} />}
    </Link>
  );
};

export default ImageContainer;

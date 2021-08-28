import React from "react";
import useIntersectionObserver from "../hooks/use-intersection-observer";
import "./ImageContainer.css";

const ImageContainer = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    },
  });
  return (
    <div ref={ref} className="image-container card-img-top">
      {isVisible && (
        <img className="image card-img-top" src={props.src} alt={props.alt} />
      )}
    </div>
  );
};
export default ImageContainer;

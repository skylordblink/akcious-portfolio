import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const FALLBACK_IMAGE = "/images/placeholder.webp";

const isClickable = (link?: string) =>
  !!link && link !== "#" && link.trim() !== "";

const isInternal = (link: string) => link.startsWith("/");

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imgSrc, setImgSrc] = useState(props.image);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const handleMouseLeave = () => setIsVideo(false);

  const handleImgError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  const innerContent = (
    <>
      {isClickable(props.link) && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <img src={imgSrc} alt={props.alt} onError={handleImgError} />
      {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
    </>
  );

  if (!isClickable(props.link)) {
    return (
      <div className="work-image">
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {innerContent}
        </div>
      </div>
    );
  }

  if (isInternal(props.link!)) {
    return (
      <div className="work-image">
        <Link
          className="work-image-in"
          to={props.link!}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="disable"
        >
          {innerContent}
        </Link>
      </div>
    );
  }

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
      >
        {innerContent}
      </a>
    </div>
  );
};

export default WorkImage;

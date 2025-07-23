import styles from "./index.module.scss";
import { Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

const Poetry = memo(
  ({
    poetry,
    // @ts-ignore
    lineHeight = 24,
    // @ts-ignore
    clamp = 3,
    // @ts-ignore
    unit = "px",
    isAR,
    // @ts-ignore
    activeIndex,
  }: {
    poetry: any;
    lineHeight?: number;
    clamp?: number;
    unit?: string;
    isAR?: boolean;
    activeIndex?: number;
  }) => {
    const [beforeDots, afterDots] = poetry.poetryParts.split("...");
    // const [expanded, setExpanded] = useState(false);
    // const [showButton, setShowButton] = useState(false);
    // const textRef = useRef<HTMLDivElement>(null);
    // const [maxHeight, setMaxHeight] = useState(lineHeight * clamp + unit);
    // const [contentHeight, setContentHeight] = useState<number>(0);
    // useEffect(() => {
    //   setExpanded(false);
    //   setShowButton(false);
    //   const calculateHeight = () => {
    //     if (textRef.current) {
    //       setContentHeight(textRef.current.scrollHeight);
    //       const height = lineHeight * clamp;
    //       setMaxHeight(height + unit);
    //       setShowButton(textRef.current.scrollHeight > height);
    //     }
    //   };
    //   calculateHeight();
    //   window.addEventListener("resize", calculateHeight);
    //   return () => window.removeEventListener("resize", calculateHeight);
    // }, [poetry.entrance, lineHeight, clamp, unit]);
    // const toggleExpanded = () => {
    //   if (!showButton) return;
    //   setExpanded((prev) => !prev);
    // };

    // useEffect(() => {
    //   setExpanded(false);
    // }, [activeIndex]);

    return (
      <div className={styles.box}>
        <div className={styles.box_container}>
          <div className={styles.info}>
            <Link
              href={`/poet/${poetry.poetId}`}
              className={styles.img_container}
            >
              <img src={poetry.poetIcon} alt={poetry.poetName} />
            </Link>

            <div className={styles.text_container}>
              <Link href={`/poet/${poetry.poetId}`} className={styles.name}>
                <Typography>{poetry.poetName}</Typography>
              </Link>
              <Link href={`/city/${poetry.placeId}`} className={styles.type}>
                <Typography>{poetry.placeName}</Typography>
              </Link>
            </div>
          </div>

          {/* <div
            onClick={toggleExpanded}
            ref={textRef}
            className={`relative text-card-foreground font-main mt-4 text-base sm:text-lg font-normal transition-all duration-300 ease-in-out overflow-hidden ${
              !expanded && showButton ? "cursor-pointer" : "cursor-text"
            }`}
            style={{
              maxHeight: expanded ? contentHeight : maxHeight,
              lineHeight: lineHeight + unit,
            }}
          >
            <p
              aria-hidden={true}
              className={`absolute top-0 left-0 w-full h-full line-clamp-${clamp} ${
                expanded ? "opacity-0 -z-10 pointer-events-none" : ""
              }`}
            >
              {poetry.entrance}
            </p> */}
          <p
          // className={expanded ? "" : "opacity-0 -z-10 pointer-events-none"}
          >
            {poetry.entrance}
          </p>
          {/* </div>
          {showButton && (
            <button
              type="button"
              aria-hidden={true}
              onClick={toggleExpanded}
              className={`${styles.more_btn} rounded-lg`}
            >
              <More open={!expanded} />
              <More open={expanded} />
            </button>
          )} */}

          {isAR && (
            <div className={`${styles.said} mt-5`}>
              <div className={styles.desc}>
                <Typography>{beforeDots}</Typography>
                <br />
                <Typography>{afterDots}</Typography>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Poetry;

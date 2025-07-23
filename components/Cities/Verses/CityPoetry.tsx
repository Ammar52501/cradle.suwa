import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "./index.module.scss";
import { memo } from "react";

interface Poet {
  id: string;
  poetId: string;
  poetName: string;
  poetIcon: string;
  placeName: string;
  entrance: string;
  poetryParts: string;
}

interface CityPoetryProps {
  poet: Poet;
  lineHeight?: number;
  clamp?: number;
  unit?: string;
  isAR?: boolean;
}

const CityPoetry = memo(
  ({
    poet,
    // @ts-ignore
    lineHeight = 24,
    // @ts-ignore
    clamp = 3,
    // @ts-ignore
    unit = "px",
    isAR,
  }: CityPoetryProps) => {
    // const [expanded, setExpanded] = useState(false);
    // const textRef = useRef<HTMLDivElement>(null);
    // const [showButton, setShowButton] = useState(false);
    // const [maxHeight, setMaxHeight] = useState(lineHeight * clamp + unit);
    // const [contentHeight, setContentHeight] = useState<number>(0);
    const [beforeDots, afterDots] = poet.poetryParts.split("...");
    // useLayoutEffect(() => {
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
    // }, [poet.entrance, lineHeight, clamp, unit]);
    // const toggleExpanded = () => {
    //   if (!showButton) return;
    //   setExpanded((prev) => !prev);
    // };
    return (
      <div className={styles.box}>
        <div className={styles.box_container}>
          <Link href={`/poet/${poet.poetId}`} className={styles.info}>
            <div className={styles.img_container}>
              <img src={poet.poetIcon} alt={poet.poetName} />
            </div>

            <div className={styles.text_container}>
              <div className={styles.name}>
                <Typography>{poet.poetName}</Typography>
              </div>
              <div className={styles.type}>
                <Typography>{poet.placeName}</Typography>
              </div>
            </div>
          </Link>
          {/* <div
            onClick={toggleExpanded}
            ref={textRef}
            className={`relative tracking-[0] text-card-foreground font-main mt-4 text-[16px] font-normal transition-all duration-300 ease-in-out overflow-hidden ${
              !expanded && showButton ? "cursor-pointer" : "cursor-text"
            }`}
            style={{
              maxHeight: expanded ? contentHeight : maxHeight,
              lineHeight: lineHeight + unit,
            }}
          > */}
          {/* <p
              aria-hidden={true}
              className={`absolute top-0 left-0 w-full h-full line-clamp-${clamp} ${
                expanded
                  ? "opacity-0 -z-10 pointer-events-none"
                  : ""
              }`}
            >
              {poet.entrance}
            </p> */}
          <p
            className="font-main"
            // className={`${
            //   expanded
            //     ? ""
            //     : "opacity-0 -z-10 pointer-events-none"
            // }`}
          >
            {poet.entrance}
          </p>
          {/* </div> */}
          {/* {showButton && (
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

export default CityPoetry;

import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

type BootLine = {
  at: number;
  glyph: ">" | "✓";
  text: string;
};

const BOOT_LINES: BootLine[] = [
  { at: 0, glyph: ">", text: "akcious.dev: booting..." },
  { at: 15, glyph: "✓", text: "loading 3D engine" },
  { at: 35, glyph: "✓", text: "compiling bots & agents" },
  { at: 55, glyph: "✓", text: "initializing trading hooks" },
  { at: 75, glyph: "✓", text: "loading portfolio assets" },
  { at: 95, glyph: ">", text: "ready." },
];

const BAR_WIDTH = 20;

function renderBar(percent: number): string {
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = Math.round((clamped / 100) * BAR_WIDTH);
  return (
    "[" +
    "█".repeat(filled) +
    "░".repeat(BAR_WIDTH - filled) +
    "]"
  );
}

const SESSION_BOOT_KEY = "akcious_booted";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isTouchPrimary, setIsTouchPrimary] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsTouchPrimary(window.matchMedia("(pointer: coarse)").matches);
    }
    try {
      if (sessionStorage.getItem(SESSION_BOOT_KEY) === "1") {
        setIsLoading(false);
      }
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — ignore
    }
  }, []);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const t = setTimeout(() => setLoaded(true), 600);
      return () => clearTimeout(t);
    }
  }, [percent, loaded]);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          try {
            sessionStorage.setItem(SESSION_BOOT_KEY, "1");
          } catch {
            // sessionStorage may be unavailable
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!loaded) return;
    const onKey = () => setIsLoaded(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loaded]);

  const visibleLines = BOOT_LINES.filter((l) => percent >= l.at);
  const shownPercent = Math.min(100, Math.round(percent));

  return (
    <div
      className={`loading-screen ${clicked ? "loading-clicked" : ""}`}
      onClick={() => loaded && setIsLoaded(true)}
      data-cursor="disable"
    >
      <div className="loading-card">
        <div className="loading-titlebar">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-title-label">
            akcious.dev — ~/portfolio
          </span>
        </div>
        <div className="loading-output">
          {visibleLines.map((line, i) => (
            <div className="loading-line" key={i}>
              <span
                className={
                  line.glyph === "✓"
                    ? "loading-glyph loading-glyph-ok"
                    : "loading-glyph"
                }
              >
                {line.glyph}
              </span>
              <span className="loading-line-text">{line.text}</span>
            </div>
          ))}
          <div className="loading-line loading-progress-line">
            <span className="loading-glyph">{">"}</span>
            <span className="loading-line-text">
              {renderBar(percent)} {shownPercent}%
            </span>
          </div>
          {loaded && (
            <div className="loading-prompt">
              {isTouchPrimary ? "TAP ANYWHERE TO ENTER" : "PRESS ANY KEY TO ENTER"}
              <span className="loading-cursor">{"▌"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};

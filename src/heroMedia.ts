/**
 * Hero media configuration.
 * The video lives in /public and is served as a static file at "/hero-scrub.mp4".
 * To replace it later: drop the new file into public/ with the same name
 * (re-encoded for scrubbing: ffmpeg -i in.mp4 -an -g 1 -crf 21 -movflags +faststart hero-scrub.mp4)
 */
export const heroMedia: {
  videoSrc: string | null;
  imageDark: string | null;
  imageLit: string | null;
} = {
  videoSrc: "/hero-scrub.mp4",
  imageDark: null,
  imageLit: null,
};

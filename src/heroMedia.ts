/**
 * Hero media: two encodes of the same shot, served from the GitHub CDN.
 *  - videoSrc:       2560px, keyframe-per-frame — desktop scroll-scrubbing
 *  - videoSrcMobile: 720p, small & fast — mobile autoplay
 */
export const heroMedia: {
  videoSrc: string | null;
  videoSrcMobile: string | null;
  imageDark: string | null;
  imageLit: string | null;
} = {
  videoSrc:
    "https://cdn.jsdelivr.net/gh/subdel/blacknest@main/public/hero-scrub.mp4",
  videoSrcMobile:
    "https://cdn.jsdelivr.net/gh/subdel/blacknest@main/public/hero-mobile.mp4",
  imageDark: null,
  imageLit: null,
};
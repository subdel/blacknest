/**
 * Hero media configuration — three modes, auto-detected in this order:
 *
 * 1. VIDEO SCRUB (best): provide a short video of the chalet where the camera
 *    approaches and the lights turn on over the duration. Scrolling scrubs
 *    through the video timeline.
 *      - Put the file at: src/assets/video/hero-scrub.mp4
 *      - Then: import heroVideo from './assets/video/hero-scrub.mp4';
 *        and set `videoSrc: heroVideo`
 *      - IMPORTANT for smooth scrubbing, re-encode with a keyframe on every
 *        frame:  ffmpeg -i in.mp4 -an -g 1 -crf 23 -movflags +faststart hero-scrub.mp4
 *
 * 2. IMAGE CROSSFADE (easy): provide TWO stills of the exact same shot —
 *    one with the chalet dark, one with windows lit. Scrolling zooms in
 *    and crossfades dark → lit.
 *      - Set `imageDark` and `imageLit` to imported images.
 *
 * 3. DEMO FALLBACK (active now): uses the existing hero image with a
 *    simulated darkness → light reveal so you can feel the interaction
 *    before generating final assets.
 */

import heroVideo from './assets/video/hero-scrub.mp4';
// import darkImg from './assets/images/chalet_dark.jpg';
// import litImg from './assets/images/chalet_lit.jpg';

export const heroMedia: {
  videoSrc: string | null;
  imageDark: string | null;
  imageLit: string | null;
} = {
  videoSrc: heroVideo,
  imageDark: null,  // ← optional fallback pair (dark frame)
  imageLit: null,   // ← optional fallback pair (lit frame)
};

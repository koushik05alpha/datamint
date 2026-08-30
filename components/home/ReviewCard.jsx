'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
   REVIEWS SECTION
   ============================================================ */
function ReviewCard({ playbackId, poster, quote, boldWord }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    const h = window.scrollY;
    video.paused ? video.play?.().catch(() => {}) : video.pause?.();
    requestAnimationFrame(() => window.scrollTo(0, h));
  };

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    video.addEventListener('play', () => card.classList.add('is-playing'));
    video.addEventListener('pause', () => card.classList.remove('is-playing'));
    video.addEventListener('ended', () => card.classList.remove('is-playing'));
  }, []);

  return (
    <div className="review-card" ref={cardRef}>
      <div className="review-card__media">
        <video
          ref={videoRef}
          className="review-card__video"
          src={`https://stream.mux.com/${playbackId}.m3u8`}
          poster={poster}
          playsInline
        />
        <div className="review-card__hint">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Tap to play
        </div>
        <button className="review-card__tap" onClick={togglePlay} aria-label="Play review" />
      </div>
      <div className="review-card__content">
        <p className="review-card__quote">
          {boldWord ? (
            <>
              &ldquo;<strong>{boldWord}</strong> {quote}&rdquo;
            </>
          ) : (
            <>&ldquo;{quote}&rdquo;</>
          )}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;

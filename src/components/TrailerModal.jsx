
export default function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) return null;

  return (
    <div className="trailer-backdrop" onClick={onClose}>
      <div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer"
        />
      </div>
    </div>
  );
}
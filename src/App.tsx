import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Heart, Sparkles } from 'lucide-react';

// Gentle background floating particles
const BACKGROUND_PARTICLES = [
  { id: 1, type: 'heart', top: '12%', left: '8%', size: 14, duration: '14s', delay: '0s', opacity: 0.28 },
  { id: 2, type: 'sparkle', top: '22%', right: '10%', size: 12, duration: '12s', delay: '2s', opacity: 0.25 },
  { id: 3, type: 'heart', top: '48%', left: '6%', size: 16, duration: '16s', delay: '5s', opacity: 0.2 },
  { id: 4, type: 'sparkle', top: '65%', right: '8%', size: 13, duration: '13s', delay: '3s', opacity: 0.22 },
  { id: 5, type: 'heart', top: '80%', left: '12%', size: 15, duration: '15s', delay: '1s', opacity: 0.24 },
  { id: 6, type: 'heart', top: '35%', right: '14%', size: 13, duration: '17s', delay: '4s', opacity: 0.22 },
  { id: 7, type: 'sparkle', top: '78%', right: '18%', size: 11, duration: '14s', delay: '6s', opacity: 0.2 },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Directly use the exact uploaded image file as requested
  const imageSrc = '/Screenshot 2026-09-25 233615.png';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set gentle volume level
    audio.volume = 0.35;

    // Attempt to autoplay immediately when the website opens
    const attemptAutoplay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Browser blocked autoplay with sound prior to user interaction
            console.log('Autoplay was prevented by browser policy, awaiting interaction:', error);
            setIsPlaying(false);
          });
      }
    };

    attemptAutoplay();

    // Fallback: If autoplay was blocked by browser policy, the very first tap/click
    // anywhere on the page starts the audio immediately without needing to search for the button
    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-12 md:py-16 overflow-hidden bg-gradient-to-b from-[#FFF9FA] via-[#FFF3F5] to-[#FCEEF2]">
      {/* Audio element configured for autoplay, continuous loop, and gentle volume */}
      <audio
        ref={audioRef}
        src="/audio/idea10.mp3"
        preload="auto"
        autoPlay
        loop
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Gentle floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {BACKGROUND_PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="floating-particle absolute text-[#E892A8]"
            style={
              {
                top: particle.top,
                left: particle.left,
                right: particle.right,
                opacity: particle.opacity,
                '--duration': particle.duration,
                '--delay': particle.delay,
              } as React.CSSProperties
            }
          >
            {particle.type === 'heart' ? (
              <Heart size={particle.size} fill="currentColor" strokeWidth={0} />
            ) : (
              <Sparkles size={particle.size} strokeWidth={1.5} />
            )}
          </div>
        ))}
      </div>

      {/* Main Digital Birthday Card Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Tasteful Rounded Frame preserving the exact uploaded photo */}
        <div className="relative mb-8 group">
          {/* Subtle glowing halo when music is playing */}
          <div
            className={`absolute -inset-2.5 rounded-3xl sm:rounded-[2rem] bg-gradient-to-tr from-[#F8B4C4]/40 to-[#ECA0B2]/20 blur-md transition-opacity duration-1000 ${
              isPlaying ? 'opacity-100 scale-105' : 'opacity-40'
            }`}
            aria-hidden="true"
          />

          {/* Delicate outer decorative frame with rounded corners */}
          <div className="relative p-2 rounded-3xl sm:rounded-[2rem] bg-white/90 shadow-[0_8px_30px_rgba(224,142,166,0.18)] ring-1 ring-[#F3CCD6]/70 backdrop-blur-sm">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl sm:rounded-[1.75rem] overflow-hidden ring-1 ring-[#FCE8ED] bg-[#FDF5F6]">
              {/* Exact uploaded photo used directly as <img> source */}
              <img
                src={imageSrc}
                alt="Jemima"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-102"
              />
            </div>
          </div>

          {/* Discreet music wave badge on frame corner */}
          {isPlaying && (
            <div
              className="absolute -bottom-2 right-1 bg-white/95 px-2.5 py-1 rounded-full shadow-sm ring-1 ring-[#F2CBD5] flex items-center gap-1.5 animate-fadeIn"
              title="Now Playing: Idea 10"
            >
              <Music className="w-3 h-3 text-[#C95A78]" />
              <div className="flex items-center gap-0.5 h-2.5">
                <span className="w-0.5 h-2 bg-[#D46B87] rounded-full animate-pulse" />
                <span
                  className="w-0.5 h-3 bg-[#C95A78] rounded-full animate-pulse"
                  style={{ animationDelay: '200ms' }}
                />
                <span
                  className="w-0.5 h-1.5 bg-[#D46B87] rounded-full animate-pulse"
                  style={{ animationDelay: '400ms' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#38262D] tracking-tight mb-5 leading-tight">
          Happy Birthday, Jemima! 🎀
        </h1>

        {/* Message */}
        <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5C454E] font-normal max-w-md px-3 mb-6">
          Wishing you a beautiful birthday filled with happiness, peace, laughter and many beautiful
          moments. May this new year of your life be kind to you. 💗
        </p>

        {/* Small Line Underneath */}
        <p className="font-sans text-xs sm:text-sm tracking-wide text-[#9E7D88] font-medium uppercase mb-9">
          A little birthday surprise, just for you.
        </p>

        {/* Music Control Button (Autoplay Fallback & Manual Toggle) */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause Idea 10 music' : 'Play Idea 10 music'}
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer select-none bg-white text-[#B24B68] ring-1 ring-[#F0C2CF] hover:bg-[#FFF5F7] hover:ring-[#E5A4B5] hover:shadow-[0_4px_16px_rgba(201,90,120,0.15)] active:scale-98"
          >
            {isPlaying ? (
              <>
                <span className="text-[#C95A78] transition-transform duration-300 group-hover:scale-110">
                  ♡
                </span>
                <span className="font-sans tracking-wide">Pause</span>
                <Pause className="w-3.5 h-3.5 text-[#C95A78] opacity-70 ml-0.5" />
              </>
            ) : (
              <>
                <span className="text-[#C95A78] transition-transform duration-300 group-hover:scale-110">
                  ♡
                </span>
                <span className="font-sans tracking-wide">Play Idea 10</span>
                <Music className="w-3.5 h-3.5 text-[#C95A78] opacity-70 ml-0.5" />
              </>
            )}
          </button>

          {/* Gentle music status note */}
          {isPlaying && (
            <span className="text-xs text-[#9E7D88] font-sans italic opacity-85 transition-opacity duration-300">
              ♪ Playing softly in the background
            </span>
          )}
        </div>
      </main>
    </div>
  );
}

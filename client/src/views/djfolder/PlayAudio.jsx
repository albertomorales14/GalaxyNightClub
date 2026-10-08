import { useEffect, useRef } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import logService from "../../Utils/logService";

function PlayAudio({ name, audioSrc, isPlaying, onPlay, onPause }) {

    const audioRef = useRef(null);

    // Reproduce o para el audio cuando cambia el DJ activo
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(error => {
                logService.sendLog('error', `Error al reproducir el audio de ${name} (PlayAudio): ${error.message}`);
                onPause();
            });
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isPlaying, name, onPause]);

    return (
        <>
            <audio ref={audioRef} src={audioSrc} preload="none" onEnded={onPause} />
            <button className="dj-audio-btn" onClick={isPlaying ? onPause : onPlay}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <span>{isPlaying ? 'Pausar audio' : 'Reproducir audio'}</span>
                    </div>
                    <div>
                        <div className="play-audio-btn">
                            {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                        </div>
                    </div>
                </div>
            </button>
        </>
    )
}

export default PlayAudio;

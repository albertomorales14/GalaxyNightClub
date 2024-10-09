import React, { useEffect, useMemo, useState } from "react";
import { IoMdPause } from "react-icons/io";
import { IoMdPlay } from "react-icons/io";
import logService from "../../Utils/logService";

function PlayAudio(props) {

    // useMemo para memorizar el objeto 'Audio' y crear un nuevo objeto solo si cambia 'audioSrc'
    const audio = useMemo(() => new Audio(props.audioSrc), [props.audioSrc]);
    const [loadedComponent, setLoadedComponent] = useState(false);

    useEffect(() => {

        if (props.isPlaying) {
            // Reproducir audio, si falla mostrar error en log
            audio.play().catch(error => {
                logService.sendLog('error', 'Error al reproducir el audio de ' + props.name + ' (PlayAudio.js): ' + error);
            });
            logService.sendLog('info', 'Reproduciendo audio de ' + props.name + '... (PlayAudio.js)');
            setLoadedComponent(true);
        } else {
            // Pausar el audio si no está activo
            audio.pause();
            audio.currentTime = 0;
            if (loadedComponent) {
                logService.sendLog('info', 'Pausando audio de ' + props.name + ' (PlayAudio.js)');
            }
        }

        return () => {
            // El audio se pausa al desmontar el componente
            audio.pause();
        };
    }, [props.isPlaying, props.audioSrc, audio]);

    return (
        <>
            {props.isPlaying ? (
                <button className="dj-audio-btn" onClick={props.onPause}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span>
                                Pausar audio
                            </span>
                        </div>
                        <div>
                            <div id="play-btn" className="play-audio-btn">
                                <IoMdPause />
                            </div>
                        </div>
                    </div>
                </button>
            ) : (
                <button className="dj-audio-btn" onClick={props.onPlay}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span>
                                Reproducir audio
                            </span>
                        </div>
                        <div>
                            <div id="play-btn" className="play-audio-btn">
                                <IoMdPlay />
                            </div>
                        </div>
                    </div>
                </button>
            )}
        </>
    )
}

export default PlayAudio;
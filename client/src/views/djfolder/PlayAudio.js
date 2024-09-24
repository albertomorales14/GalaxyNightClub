import React, { useState } from "react";
import { IoMdPause } from "react-icons/io";
import { IoMdPlay } from "react-icons/io";
import names from "./DJNames";
// Audios DJ
import solomun from "../../audio/solomun.mp3";
import taleOfUs from "../../audio/tale-of-us.mp3";
import dixon from "../../audio/dixon.mp3";
import madonna from "../../audio/the-black-madonna.mp3";


class PlayAudio extends React.Component {

    constructor(props) {
        super(props);
        let { dj } = this.props;
        this.state = {
            audio: new Audio(
                dj == names.SOLOMUN ? solomun :
                dj == names.TALE_OF_US ? taleOfUs :
                dj == names.DIXON ? dixon : madonna),
            isPlaying: this.props.isActive
        };
    }

    playPause = () => {

        let isPlaying = this.state.isPlaying; // Get state of song
        
        if (isPlaying) { // Pause the song if it is playing
            this.state.audio.pause();
        } else { // Play the song if it is paused
            this.state.audio.play();
        }
    
        this.setState({ isPlaying: !isPlaying }); // Change the state of song
    };

    render() {
        return (
            <>
            {this.state.isPlaying ? (
                <button className="dj-audio-btn" onClick={() => {this.playPause(); this.props.onPause();} }>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span>
                                Pausar audio
                            </span>
                        </div>
                        <div>
                            <button id="play-btn" className="play-audio-btn">
                                <IoMdPause />
                            </button>
                        </div>
                    </div>
                </button>
            ) : (
                <button className="dj-audio-btn" onClick={() => {this.playPause(); this.props.onPlay();} }>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span>
                                Reproducir audio
                            </span>
                        </div>
                        <div>
                            <button id="play-btn" className="play-audio-btn">
                                <IoMdPlay />
                            </button>
                        </div>
                    </div>
                </button>
            )}
            </>
        )
    }
}

export default PlayAudio;


/*

<button className="dj-audio-btn" onClick={() => {this.playPause(); this.props.onPlay();} }>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span>
                                {this.state.isPlaying ? "Pausar audio" : "Reproducir audio"}
                            </span>
                        </div>
                        <div>
                            <button id="play-btn" className="play-audio-btn">
                                {this.state.isPlaying ? <IoMdPause /> : <IoMdPlay />}
                            </button>
                        </div>
                    </div>
                </button>

*/
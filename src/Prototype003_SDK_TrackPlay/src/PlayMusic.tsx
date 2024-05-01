import React, { useState } from 'react';
import useCookie from 'react-use-cookie';
import Sound from 'react-sound';

const MusicPlayer = () => {
    // State to manage play status
    const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);

    // Example audio URL (you should replace this with your own)
    const audioUrl = 'https://example.com/path/to/your/audio/file.mp3';

    return (
        <div>
            <button onClick={() => setPlayStatus(Sound.status.PLAYING)}>Play</button>
            <button onClick={() => setPlayStatus(Sound.status.PAUSED)}>Pause</button>
            <button onClick={() => setPlayStatus(Sound.status.STOPPED)}>Stop</button>

            <Sound
                url={audioUrl}
                playStatus={playStatus}
                onPlaying={({ position, duration }) => console.log(`Position: ${position}, Duration: ${duration}`)}
                onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
            />
        </div>
    );
};

export default MusicPlayer;

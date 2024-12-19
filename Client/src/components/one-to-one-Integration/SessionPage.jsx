import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SessionPage = () => {
  const jitsiContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure we have session details
    if (!location.state?.roomName) {
      navigate('/dashboard');
      return;
    }

    // Dynamically load Jitsi Meet script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.JitsiMeetExternalAPI) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: location.state.roomName,
          width: '100%',
          height: window.innerHeight,
          parentNode: jitsiContainerRef.current,
          userInfo: location.state.user,
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
          }
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        // Event listeners for session management
        api.addEventListeners({
          videoConferenceJoined: () => {
            console.log('Session started successfully');
          },
          videoConferenceLeft: () => {
            navigate('/dashboard');
          }
        });

        // Cleanup
        return () => {
          api.dispose();
        };
      }
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [location.state, navigate]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0 
    }}>
      <div ref={jitsiContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SessionPage;
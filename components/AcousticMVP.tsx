import React, { useState, useRef } from 'react';
import { BeakerIcon } from './Icons';

type Status = 'idle' | 'recording' | 'processing' | 'finished';

/**
 * Generates a much more plausible-looking mock Mel spectrogram for a vowel sound.
 * This simulates the backend image generation process with higher fidelity for the UI demo.
 */
const generateRealisticMockSpectrogram = (): Promise<string> => {
    return new Promise((resolve) => {
        const width = 500;
        const height = 200;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return resolve('');

        // Viridis-like color map function (value from 0.0 to 1.0)
        const getViridisColor = (value: number) => {
            const r = Math.floor(255 * Math.sqrt(value));
            const g = Math.floor(255 * (value ** 3));
            const b = Math.floor(255 * Math.sin(value * Math.PI * 0.5));
            return `rgb(${r},${g},${b})`;
        };

        // Dark purple background, typical for this colormap
        canvasCtx.fillStyle = '#440154';
        canvasCtx.fillRect(0, 0, width, height);
        
        // Add faint background noise
        for (let i = 0; i < width * height * 0.2; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            canvasCtx.fillStyle = `rgba(128, 128, 255, ${Math.random() * 0.1})`;
            canvasCtx.fillRect(x, y, 1, 1);
        }

        // Define the formant bands for an "aaah" sound.
        // y is from top, so lower frequency is higher y value.
        const formants = [
            { y: height * 0.75, thickness: 12, intensity: 0.95 }, // F1 (strongest)
            { y: height * 0.55, thickness: 8, intensity: 0.8 },  // F2
            { y: height * 0.30, thickness: 6, intensity: 0.6 },  // F3
            { y: height * 0.20, thickness: 5, intensity: 0.5 },  // F4
        ];
        
        // Draw the formants over time (x-axis)
        for (let x = 0; x < width; x++) {
            formants.forEach(f => {
                // Simulate jitter (frequency variation) & shimmer (intensity variation)
                const yJitter = (Math.random() - 0.5) * f.thickness * 0.4;
                const intensityShimmer = 1.0 + (Math.random() - 0.5) * 0.3;
                const currentIntensity = f.intensity * intensityShimmer;

                // Create a gradient for a softer-edged formant band
                const gradient = canvasCtx.createRadialGradient(x, f.y + yJitter, 0, x, f.y + yJitter, f.thickness);
                gradient.addColorStop(0, getViridisColor(currentIntensity));
                gradient.addColorStop(0.5, getViridisColor(currentIntensity * 0.5));
                gradient.addColorStop(1, `rgba(0,0,0,0)`);
                
                canvasCtx.fillStyle = gradient;
                canvasCtx.fillRect(x - f.thickness, f.y + yJitter - f.thickness, f.thickness * 2, f.thickness * 2);
            });
        }

        resolve(canvas.toDataURL('image/png'));
    });
};


const AcousticMVP: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [spectrogramUrl, setSpectrogramUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (status === 'recording') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.addEventListener("dataavailable", event => {
        audioChunksRef.current.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setStatus('processing');
        
        // Simulate backend processing including spectrogram generation
        const specUrl = await generateRealisticMockSpectrogram();
        setSpectrogramUrl(specUrl);

        setTimeout(() => {
          setStatus('finished');
        }, 500); // Shorter delay for UI smoothness
      });

      mediaRecorderRef.current.start();
      setStatus('recording');

      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          // Clean up the stream
           stream.getTracks().forEach(track => track.stop());
        }
      }, 5000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access was denied. Please allow microphone access in your browser settings to use this feature.");
      setStatus('idle');
    }
  };

  const resetDemo = () => {
    setAudioUrl(null);
    setSpectrogramUrl(null);
    setStatus('idle');
  }

  const getButtonContent = () => {
    switch (status) {
      case 'idle':
        return 'Start 5-Second Vowel Test';
      case 'recording':
        return (
          <>
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Recording... (5s)
          </>
        );
      case 'processing':
        return 'Processing...';
      case 'finished':
        return 'Run Test Again';
      default:
        return 'Start Test';
    }
  };

  const handleButtonClick = () => {
    if (status === 'finished') {
      resetDemo();
    } else {
      startRecording();
    }
  }

  return (
    <div className="bg-brand-light p-6 rounded-xl border border-brand-secondary/30 mt-8 shadow-inner">
      <h4 className="text-xl font-bold text-brand-dark mb-4 text-center">Interactive Demo: Acoustic Biomarker Capture</h4>
      
      <div className="flex flex-col items-center">
        <p className="text-brand-muted mb-4 text-center">
          {status === 'idle' && 'Click the button to simulate recording a sustained "aaah" vowel.'}
          {status === 'recording' && 'Please sustain the vowel "aaah" into your microphone.'}
          {status === 'processing' && 'Simulating audio upload and cloud-based analysis...'}
          {status === 'finished' && 'Analysis simulation complete. See mock results below.'}
        </p>

        <button
          onClick={handleButtonClick}
          disabled={status === 'recording' || status === 'processing'}
          className={`px-6 py-3 font-bold text-white rounded-lg shadow-md transition-all duration-300 flex items-center justify-center w-64
            ${status === 'idle' || status === 'finished' ? 'bg-brand-primary hover:bg-brand-primary/80' : ''}
            ${status === 'recording' ? 'bg-red-600 cursor-not-allowed' : ''}
            ${status === 'processing' ? 'bg-gray-500 cursor-not-allowed' : ''}
          `}
        >
          {getButtonContent()}
        </button>

        {status === 'finished' && (
          <div className="mt-6 w-full animate-fade-in-up">
            <h5 className="font-bold text-lg text-center mb-4">Simulated Analysis Results</h5>
            
            {audioUrl && (
              <div className="mb-4 text-center">
                <p className="text-sm font-semibold text-brand-dark">1. Raw Audio Captured:</p>
                <audio controls src={audioUrl} className="mx-auto mt-2"></audio>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow border">
                  <p className="text-sm text-brand-muted">Jitter (Local)</p>
                  <p className="text-2xl font-bold text-brand-secondary">1.15%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                  <p className="text-sm text-brand-muted">Shimmer (Local)</p>
                  <p className="text-2xl font-bold text-brand-secondary">4.82%</p>
              </div>
               <div className="bg-white p-4 rounded-lg shadow border">
                  <p className="text-sm text-brand-muted">Harmonic-to-Noise</p>
                  <p className="text-2xl font-bold text-brand-secondary">15.3 dB</p>
              </div>
            </div>

            {spectrogramUrl && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow border">
                <h6 className="font-semibold text-brand-dark">2. Backend-Generated Mel Spectrogram (Visualization)</h6>
                 <p className="text-xs text-brand-muted mb-2">In the real app, this image would be generated on the cloud from the uploaded audio.</p>
                <div className="mt-2 bg-black p-2 rounded-md flex justify-center">
                    <img src={spectrogramUrl} alt="Generated Mel Spectrogram" className="rounded-md w-full h-auto object-contain" />
                </div>
              </div>
            )}

            <div className="mt-4 bg-white p-4 rounded-lg shadow border">
              <h6 className="font-semibold text-brand-dark flex items-center">
                <BeakerIcon className="h-5 w-5 mr-2 text-brand-primary" />
                3. Multimodal LLM Qualitative Summary (Mock)
              </h6>
              <p className="mt-2 text-sm text-gray-700">
                The analysis indicates elevated jitter and shimmer values, suggesting vocal instability and potential tremor. The Harmonic-to-Noise ratio is slightly below healthy thresholds, which may correlate with breathiness in phonation. Spectrogram analysis shows minor spectral noise and formant instability. These simulated findings are consistent with markers sometimes seen in early-stage neurological voice disorders.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcousticMVP;

export const BLUEPRINT_DATA = [
  {
    id: 'analysis',
    title: 'Foundational Clinical & Technical Analysis',
    icon: 'LightBulbIcon',
    content: [
      {
        subtitle: 'Deconstruction of PENSIEVE-AI & Synthesis of Novel Modalities',
        description: 'The original PENSIEVE-AI demonstrated high accuracy using digital pen kinematics for the Clock Drawing Test (CDT) and Rey-Osterrieth Complex Figure (ROCF) test. However, its reliance on a single modality can be enhanced for greater ecological validity and differential diagnosis capabilities.',
        cards: [
          { 
            title: 'Vocal Biomarkers (Linguistic)',
            icon: 'CheckCircleIcon',
            text: 'Analyze prosody, semantic density, and pauses from speech recordings. This targets the content and structure of language, helping differentiate FTD (impaired language) from typical Alzheimer\'s (memory-first deficits).'
          },
          { 
            title: 'Dual-Task Analysis',
            icon: 'CheckCircleIcon',
            text: 'Incorporate a simple secondary task during drawing (e.g., counting backwards by sevens). Measure declines in primary task performance (drawing) to assess executive function, a key indicator of vascular dementia and frontal lobe dysfunction.'
          },
          { 
            title: 'Acoustic Biomarkers: Perturbation',
            icon: 'WaveformIcon',
            text: 'Extracts objective, time-domain features like Jitter (frequency instability) and Shimmer (amplitude instability) from speech. These metrics quantify vocal tremors and breathiness, which are key indicators in conditions such as Parkinson\'s Disease.'
          },
          { 
            title: 'Acoustic Biomarkers: Spectral & AI',
            icon: 'SignalIcon',
            text: 'Applies Fourier transforms to analyze spectral qualities like Formants and Harmonic-to-Noise Ratio (HNR). This data is fed to an orchestrator LLM for a qualitative evaluation of phonation, identifying subtle sub-vocalization artifacts.'
          }
        ]
      }
    ]
  },
  {
    id: 'architecture',
    title: 'Cloud-Native System Architecture',
    icon: 'ServerStackIcon',
    content: [
      {
        subtitle: 'Component Breakdown & Technology Choices',
        description: 'The architecture is designed for scalability and security (HIPAA/GDPR) using a microservices approach hosted on Google Cloud Platform (GCP). The frontend client is envisioned using a cross-platform framework like Flutter to target web and Android devices seamlessly, allowing for a single codebase for multiple platforms.'
      }
    ]
  },
  {
    id: 'data-spec',
    title: 'Multimodal Data Specification & Fusion',
    icon: 'CircleStackIcon',
    content: [
      {
        subtitle: 'Data Schema: Complex Figure Copy Task',
        description: 'A robust and granular data schema is critical for capturing the rich information embedded in user interactions. The data must be structured for both high-fidelity rendering and deep analytical processing.',
        details: [
          {
            title: 'Temporal Kinematics',
            text: 'Capture as a time-series array of objects. Metrics include: stroke velocity (pixels/ms), inter-stroke latency (ms), pen pressure (if available), and total time-on-task.'
          },
          {
            title: 'Spatial Data',
            text: 'Store as vector paths (e.g., SVG path strings with associated timestamps for each point). This is superior to rasterized images as it preserves stroke order, direction, and is resolution-independent.'
          },
          {
            title: 'Proposed Fusion Strategy',
            text: 'Employ a feature-level fusion strategy. An early-stage model could involve extracting features from each modality (kinematic stats, NLP sentiment from speech, dual-task error rate) and concatenating them into a single vector for a final classifier (e.g., XGBoost or a small neural network). A more advanced approach would use a multimodal transformer architecture for late fusion.'
          }
        ]
      }
    ]
  },
  {
    id: 'prototype',
    title: 'Prototype Definition & Validation',
    icon: 'CodeBracketIcon',
    content: [
      {
        subtitle: 'MVP 1: Foundational Drawing Task (Clock Drawing Test)',
        description: 'The initial MVP focuses on a single, well-validated task: the Clock Drawing Test (CDT). The core user journey is: 1) User receives instruction to "draw a clock showing ten past eleven". 2) User draws the clock on a digital canvas. 3) On completion, the kinematic and spatial data are packaged and sent to the cloud backend for analysis.',
        codeBlock: {
          title: "API Payload: /ingest/drawing-data",
          language: "json",
          code: 
`{
  "sessionId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "userId": "user-9876",
  "timestamp": "2024-07-21T14:30:00Z",
  "task": "ClockDrawingTest",
  "stimulus": "Draw a clock showing ten past eleven.",
  "kinematics": {
    "totalTimeMs": 45320,
    "totalStrokes": 18
  },
  "spatialData": {
    "format": "svg_paths",
    "strokes": [
      { "path": "M10 10 C 20 20, 40 20, 50 10", "startTime": 120, "endTime": 540 },
      { "path": "M60 10 L 70 25", "startTime": 880, "endTime": 1100 }
    ]
  }
}`
        }
      },
      {
        subtitle: 'MVP 2: Linguistic Vocal Biomarkers',
        description: 'User Journey: A text prompt ("Please describe this picture...") is displayed. The user taps a button to record their spoken response.\n\nData Capture: Raw audio stream (e.g., FLAC).\n\nBackend (GCP): Audio is transcribed via Google Speech-to-Text. A Gemini model then analyzes the transcript for semantic density, topic coherence, and pause analysis.',
        codeBlock: {
          title: "API Payload: /ingest/linguistic-data",
          language: "json",
          code:
`{
  "sessionId": "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
  "userId": "user-9876",
  "task": "LinguisticVocal",
  "stimulus": "Picture Description",
  "audioData": {
    "format": "flac",
    "sampleRate": 16000,
    "data": "base64-encoded-audio-string..."
  }
}`
        }
      },
      {
        subtitle: 'MVP 3: Dual-Task Analysis',
        description: 'User Journey: User performs a drawing task (e.g., ROCF). Simultaneously, auditory beeps occur randomly. The user must tap a button each time they hear a beep.\n\nData Capture: Full drawing data plus a timestamped array of beep and tap events.\n\nBackend (GCP): The system calculates tap response latency and accuracy, correlating misses with specific drawing phases to assess cognitive load.',
        codeBlock: {
          title: "API Payload: /ingest/dual-task-data",
          language: "json",
          code:
`{
  "sessionId": "c3d4e5f6-a7b8-9012-3456-7890abcdef12",
  "userId": "user-9876",
  "task": "DualTaskROCF",
  "primaryTaskData": {
    "kinematics": { "..."},
    "spatialData": { "..." }
  },
  "secondaryTaskData": {
    "events": [
      { "type": "stimulus_beep", "timestamp": 5120 },
      { "type": "response_tap", "timestamp": 5680, "latencyMs": 560 },
      { "type": "stimulus_beep", "timestamp": 15230 },
      { "type": "response_missed", "timestamp": 17230 }
    ]
  }
}`
        }
      },
      {
        subtitle: 'MVP 4: Acoustic Biomarkers (Perturbation & Spectral)',
        description: 'User Journey: User is prompted to sustain a vowel ("aaah") for 5 seconds, then read a standard sentence.\n\nData Capture: Raw audio stream (e.g., WAV).\n\nBackend (GCP): A Cloud Function with libraries (e.g., Praat, Librosa) processes the audio to extract Jitter, Shimmer, and HNR. A separate process generates a Mel-spectrogram for AI analysis.',
        codeBlock: {
          title: "API Payload: /ingest/acoustic-data",
          language: "json",
          code:
`{
  "sessionId": "d4e5f6a1-b8c9-0123-4567-890abcdef123",
  "userId": "user-9876",
  "task": "AcousticVocal",
  "stimulus": "Sustained vowel and standard sentence",
  "audioData": {
    "format": "wav",
    "sampleRate": 44100,
    "data": "base64-encoded-audio-string..."
  }
}`
        }
      }
    ]
  },
  {
    id: 'validation',
    title: 'Internal Validation Framework',
    icon: 'ChartBarIcon',
    content: [
      {
        subtitle: 'Continuous Validation & Monitoring',
        description: 'A robust internal validation framework is essential to build trust and iterate on the models before external clinical trials.',
        details: [
          {
            title: 'Synthetic Data Generation',
            text: 'Use a Variational Autoencoder (VAE) or Generative Adversarial Network (GAN) trained on a small, labeled dataset to generate synthetic-but-plausible examples of both "healthy" and "impaired" drawing patterns. This bootstraps model development while larger datasets are collected.'
          },
          {
            title: 'Intra-test Reliability',
            text: 'Regularly run automated analyses on incoming data to calculate feature stability and importance. Track how key kinematic features (e.g., latency, jerkiness) correlate with model predictions over time to detect data drift.'
          },
          {
            title: 'Researcher Dashboard',
            text: 'Develop a simple web dashboard (e.g., using Streamlit or a custom React app) for researchers to monitor model performance (AUC, Precision-Recall curves), data ingestion rates, and visualize feature importance plots in near-real-time.'
          }
        ]
      }
    ]
  },
  {
    id: 'ethical',
    title: 'Ethical & Clinical Guardrails',
    icon: 'ShieldCheckIcon',
    content: [
       {
        subtitle: 'Implementation Safeguards for Global Deployment',
        description: 'Ensuring fairness, privacy, and security is paramount. These principles must be baked into the architecture from day one.',
        cards: [
          { 
            title: 'Bias Mitigation',
            icon: 'UserGroupIcon',
            text: 'Actively source diverse training data across cultures and education levels. Use model explainability techniques (e.g., SHAP) to audit models for demographic bias. Explore federated learning to train models without centralizing sensitive data.'
          },
          { 
            title: 'Global Accessibility',
            icon: 'GlobeAltIcon',
            text: 'Design the UI with WCAG 2.1 AA standards. Ensure instructions are localized and culturally adapted. Test on a wide range of devices and internet connection speeds.'
          },
          { 
            title: 'Data Security & Privacy',
            icon: 'LockClosedIcon',
            text: 'Enforce end-to-end encryption for data in transit (TLS 1.3) and at rest (AES-256). Utilize cloud IAM roles for least-privilege access. De-identify all data at the earliest possible point in the pipeline. Maintain comprehensive audit trails.'
          }
        ]
       }
    ]
  }
];
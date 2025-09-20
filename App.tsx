
import React, { useState, useCallback } from 'react';
import type { VideoData } from './types';
import { generateVideoDetails } from './services/geminiService';
import UrlInputForm from './components/UrlInputForm';
import VideoPreview from './components/VideoPreview';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import FacebookIcon from './components/icons/FacebookIcon';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchVideo = useCallback(async () => {
    if (!url) {
      setError('Please enter a Facebook video URL.');
      return;
    }
    // Simple regex to check for a facebook.com URL
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/;
    if (!facebookRegex.test(url)) {
      setError('Please enter a valid Facebook URL.');
      setVideoData(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const details = await generateVideoDetails(url);
      
      setVideoData({
        thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/1280/720`,
        title: details.title,
        description: details.description,
        downloadLinks: [
          { quality: 'HD (720p)', url: '#' },
          { quality: 'SD (360p)', url: '#' },
        ],
      });
    } catch (err) {
      console.error(err);
      setError('Failed to fetch video details. This might be a temporary issue with the AI service or an invalid URL.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-4 mb-4">
            <FacebookIcon className="w-16 h-16 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Video Saver
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Paste a Facebook video link below to generate a preview and download options.
          </p>
        </header>

        <main>
          <UrlInputForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleFetchVideo}
            isLoading={isLoading}
          />

          <div className="mt-8 min-h-[300px] flex items-center justify-center">
            {isLoading && <Loader />}
            {error && !isLoading && <ErrorMessage message={error} />}
            {videoData && !isLoading && !error && <VideoPreview videoData={videoData} />}
            {!videoData && !isLoading && !error && (
                <div className="text-center text-gray-500">
                    <p>Your video preview will appear here.</p>
                </div>
            )}
          </div>
        </main>
      </div>
      <footer className="w-full max-w-2xl mx-auto text-center mt-12 pb-4">
        <p className="text-sm text-gray-600">
            Disclaimer: This app is a demonstration and does not actually download videos from Facebook. It uses AI to generate video details for illustrative purposes. Please respect copyright laws.
        </p>
      </footer>
    </div>
  );
};

export default App;

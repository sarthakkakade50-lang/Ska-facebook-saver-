
import React from 'react';
import type { VideoData } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface VideoPreviewProps {
  videoData: VideoData;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoData }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-1">
          <img
            src={videoData.thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-auto object-cover rounded-md aspect-video"
          />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-white mb-2">{videoData.title}</h2>
          <p className="text-gray-400 mb-4 text-sm">{videoData.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {videoData.downloadLinks.map((link) => (
              <a
                key={link.quality}
                href={link.url}
                onClick={(e) => e.preventDefault()}
                title="Download is disabled for this demo"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>{link.quality}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;

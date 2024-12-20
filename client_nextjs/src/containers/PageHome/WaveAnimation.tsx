import React from 'react';
import bgBackground from 'images/Background-home3-2.svg';

const WaveAnimation: React.FC = () => {
    return (
        <div className="relative h-64 soverflow-hidden "  >
            {/* Cercles défilants */}
            <div className="absolute inset-0 flex space-x-4 overflow-hidden">
                <div className="circle-animation bg-primary-900"></div>
                {/* <div className="circle-animation bg-secondary-900"></div>
                <div className="circle-animation bg-gray-600 dark:bg-gray-400"></div> */}
            </div>
        </div>
    );
};

export default WaveAnimation;

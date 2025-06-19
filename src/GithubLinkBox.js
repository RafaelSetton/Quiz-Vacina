import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function GithubLinkBox({ href, children }) {
    return (
        <a
            href={ href }
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-black text-2xl flex items-center space-x-2 pt-1"
            aria-label="GitHub Repository"
        >
            <FaGithub size={ 18 } />
            <span className="text-gray-900 text-xs font-semibold">{ children }</span>
        </a>

    );
};
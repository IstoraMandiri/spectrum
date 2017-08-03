import React from 'react';

export default {
  menuStyle: 'default', // default, hamburger, hidden
  overlay: {
    header: 'Spectrum Developer Edition',
    content: (
      <div>
        <li>This is the first open source relesase of Spectrum, and is intended for developers only</li>
        <li>Do not use this version for anything more than testing or developing</li>
        <li>This version of Spectrum has localStorage enabled, which is a feature to aid development</li>
        <li>Tests coverage is not complete Spectrum, nor has it been audited for security vulnerabilities</li>
        <li>As such, do not use keystores that have any more than $10 value</li>
        <li>By using this app your accpet that the developer cannot take responsibility for any losses</li>
        <li>Tested on Chrome OSX & Android</li>
        <li>* For more infromation, and to report issues (for a bounty), please visit the Github Repo.</li>
      </div>
    ),
  },
};

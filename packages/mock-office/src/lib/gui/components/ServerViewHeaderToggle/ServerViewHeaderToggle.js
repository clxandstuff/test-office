import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ServerViewHeaderToggle = ({ toggled, serverId, onSwitchButtonClick }) => {
  const toggleClassNames = classnames({
    'server-view-header-toggle': true,
    'server-view-header-toggle--up': toggled
  });

  return (
    <button
      className={toggleClassNames}
      onClick={() => onSwitchButtonClick(serverId, toggled)}
    >
      <svg
        className="server-view-header-toggle-icon"
        width="60px"
        height="60px"
      >
        <title>icons_power/on@3x</title>
        <desc>Created with Sketch.</desc>
        <defs />
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.75"
        >
          <path
            className="server-view-header-toggle__icon"
            transform="translate(4, 4)"
            d="M26.0503929,17 C25.3931535,17 24.8637106,17.5364493 24.8637106,18.1941509
                    L24.8637106,23.6945939 C24.8637106,24.3559698 25.3968048,24.8887448 26.0503929,
                    24.8887448 C26.7039809,24.8887448 27.2370751,24.3522955 27.2370751,23.6945939
                    L27.2370751,18.1941509 C27.2370751,17.5364493 26.7076322,17 26.0503929,17
                    M18.0357237,27.6738723 C17.7728279,24.8262816 18.9814181,22.2469155 20.9859983
                    ,20.608173 C21.7673829,19.968843 22.9358084,20.5163152 22.9358084,21.5267506
                    C22.9358084,21.897856 22.7605446,22.2395669 22.4757409,22.4710485 C21.0553735,
                    23.6358049 20.2009623,25.4729602 20.4090881,27.5011797 C20.6792866,30.143009
                    22.7824526,32.2814577 25.4041075,32.5754026 C28.8254036,32.9612052 31.7318987,
                    30.2642612 31.7318987,26.8985927 C31.7318987,25.1128778 30.9103495,23.5145527
                    29.6286962,22.4673742 C29.3438924,22.2358926 29.1722799,21.8941817 29.1722799,
                    21.5267506 C29.1722799,20.5273382 30.3224489,19.9614943 31.0965308,20.5861271
                    C32.9294984,22.0742229 34.1052632,24.3486212 34.1052632,26.8985927 C34.1052632,
                    31.5612929 30.169093,35.3201494 25.4625287,34.9784017 C21.5702111,34.7028284
                    18.3972054,31.5833387 18.0357237,27.6738723"
            id="Fill-1"
            fill="#83878E"
          />
          <circle
            stroke="#83878E"
            id="Oval"
            strokeWidth="2"
            cx="28"
            cy="28"
            r="26"
            transform="translate(2, 2)"
          />
        </g>
      </svg>
    </button>
  );
};

ServerViewHeaderToggle.propTypes = {
  toggled: PropTypes.bool.isRequired,
  serverId: PropTypes.string.isRequired,
  onSwitchButtonClick: PropTypes.func.isRequired
};

export default ServerViewHeaderToggle;

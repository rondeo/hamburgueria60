import React, { useEffect, useRef } from 'react';

import noop from 'infrastructure/commons/noop';

export default function Sentinel({ onVisibilityChange = noop, ...props }) {
  const element = useRef(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      onVisibilityChange(entries[0].intersectionRatio);
    });
    intersectionObserver.observe(element.current);

    return () => {
      intersectionObserver.unobserve(element.current);
    };
  }, [onVisibilityChange]);

  return <div ref={element} {...props} />;
}

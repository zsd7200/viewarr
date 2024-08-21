import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppend = (wrapperId: string) => {
  if (!document) return null;
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

type ReactPortalProps = {
  children: React.ReactNode,
  wrapperId: string
}

export default function ReactPortal({children, wrapperId}: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let el = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!el) {
      el = createWrapperAndAppend(wrapperId);
      systemCreated = true;
    }

    setWrapperElement(el!);

    return () => {
      if (systemCreated && el?.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  }, [wrapperId]);

  if (!wrapperElement) {
    return <></>;
  }

  return createPortal(children, wrapperElement);
};
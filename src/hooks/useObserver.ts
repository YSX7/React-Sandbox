import React, { MutableRefObject, useEffect, useRef } from "react";

export const useObserver = (
  ref: React.RefObject<HTMLDivElement>,
  canLoad: boolean,
  isLoading: boolean,
  callback: () => void
) => {
  const observer = useRef() as MutableRefObject<IntersectionObserver>;

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    var observerCallback: IntersectionObserverCallback = function (
      entries,
      observer
    ) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(observerCallback);
    observer.current.observe(ref.current as HTMLDivElement);
  }, [isLoading]);
};

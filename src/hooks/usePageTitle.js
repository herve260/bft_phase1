import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Build Future Tourism` : "Build Future Tourism";
  }, [title]);
}

import { useEffect, useState } from "react";
import { copyToClipboardFallBack } from "./copyToClipboardFallBack";

export const useClipboard = () => {
  const copiedDuration = 2000;
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async (strToCopy: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(strToCopy);
      setHasCopied(true);
    } else {
      try {
        await copyToClipboardFallBack(strToCopy);
        setHasCopied(true);
      } catch {
        throw new Error("Failed to copy text");
      }
    }
  };

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, copiedDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hasCopied, copiedDuration]);

  return { copyToClipboard, hasCopied };
};

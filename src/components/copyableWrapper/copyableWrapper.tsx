import { FC } from "react";
import "./copyableWrapper.css";
import { useClipboard } from "./useClipboard";

interface CopyableWrapperProps {
  children: string;
}

function CopyButton({
  handleClick,
  copied,
}: {
  handleClick: () => Promise<void>;
  copied: boolean;
}) {
  return (
    <button
      title="Copy"
      className={`copy-button ${copied ? "copied" : ""}`}
      onClick={handleClick}
    >
      {copied ? "✔" : "Copy"}
    </button>
  );
}

const CopyableWrapper: FC<CopyableWrapperProps> = ({ children }) => {
  const { copyToClipboard, hasCopied } = useClipboard();
  return (
    <>
      {children}
      <CopyButton
        handleClick={() => copyToClipboard(children)}
        copied={hasCopied}
      />
    </>
  );
};

export { CopyableWrapper };

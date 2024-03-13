export const copyToClipboardFallBack = (strToCopy: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(strToCopy);
  } else {
    const textAreaElement = document.createElement("textarea");
    textAreaElement.value = strToCopy;
    textAreaElement.style.position = "fixed";
    textAreaElement.style.left = "-999999px";
    textAreaElement.style.top = "-999999px";
    document.body.appendChild(textAreaElement);
    textAreaElement.focus();
    textAreaElement.select();
    return new Promise<void>((resolve, reject) => {
      document.execCommand("copy") ? resolve() : reject();
      textAreaElement.remove();
    });
  }
};

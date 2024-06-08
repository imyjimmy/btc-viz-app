const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard:', text);
  } catch (error) {
    console.log('Error copying to clipboard:', error);
  }
};

export { copyToClipboard }
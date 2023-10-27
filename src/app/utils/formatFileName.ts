function formatFileName(str: string) {
  // remove illegal characters filename
  return str.replace(/[/\\?%*:|"<>]/g, "-");
}

export default formatFileName;

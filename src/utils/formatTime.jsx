function formatTime(timestamp) {
  const difference = timestamp - Date.now();

  if (difference <= 0) {
    return "";
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

export default formatTime;
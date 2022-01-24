function getIsTouchDevice() {
  return matchMedia('(hover: none)').matches;
}

export default getIsTouchDevice;

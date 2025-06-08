import "@testing-library/jest-dom";
window.matchMedia = function (query) {
  return {
    addEventListener: () => {},
    dispatchEvent: () => false,
    media: query,
    matches: false,
    onchange: null,
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  };
};

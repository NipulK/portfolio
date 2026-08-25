import "@testing-library/jest-dom/vitest";

class TestIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "IntersectionObserver", { value: TestIntersectionObserver, writable: true });

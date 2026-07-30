function topla(a, b) {
  return a + b;
}

test('5 ve 10 toplandığında 15 sonucunu vermelidir', () => {
  expect(topla(5, 10)).toBe(15);
});
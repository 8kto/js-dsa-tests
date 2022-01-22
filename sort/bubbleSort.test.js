const bubbleSort = (arr) => arr.sort();

describe('bubble sort', () => {
  it('sorts stuff', () => {
    expect(bubbleSort([2, 1])).toEqual([1, 2]);
    expect(bubbleSort([2, -1, 1000, 0, 14004, 0, -25, 2])).toEqual([
      -1,
      -25,
      0,
      0,
      1000,
      14004,
      2,
      2,
    ]);
  });
});
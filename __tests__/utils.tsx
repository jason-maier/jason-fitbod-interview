import { calculateBrzycki, groupSetsByDate } from "../app/utils/utils";

describe("calculateBrzycki should return the correct value", () => {
  it("should return 133 for 100x10", () => {
    expect(calculateBrzycki(100, 10)).toBe(133);
  });
  it("should return 129 for 100x9", () => {
    expect(calculateBrzycki(100, 9)).toBe(129);
  });
  it("should return 3 for 3x3", () => {
    expect(calculateBrzycki(3, 3)).toBe(3);
  });
});

describe("groupSetsByDate should return the correct value", () => {
  it("should return the correct object", () => {
    const today = new Date("01 March 2024").setHours(0, 0, 0, 0);
    const tomorrow = new Date("02 March 2024").setHours(0, 0, 0, 0);

    const sets = [
      { date: today, reps: 10, weight: 100 },
      { date: today, reps: 9, weight: 100 },
      { date: tomorrow, reps: 10, weight: 100 },
    ];

    const result = {
      "3/1/2024": [
        {
          date: today,
          reps: 10,
          weight: 100,
        },
        { date: today, reps: 9, weight: 100 },
      ],
      "3/2/2024": [{ date: tomorrow, reps: 10, weight: 100 }],
    };
    expect(groupSetsByDate(sets)).toEqual(result);
  });
});

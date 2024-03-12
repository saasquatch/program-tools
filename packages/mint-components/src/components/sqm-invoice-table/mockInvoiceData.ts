import { DateTime } from "luxon";

export default (count = 4) => {
  const data = [...Array(count)].map(() => getMockData()) as Invoice[];
  return { data };
};

const getMockData = (): Invoice => {
  const today = DateTime.now();

  const invoiceId = Math.random().toString(36).slice(2, 12);

  const earnings = Math.floor(Math.random() * 100) + 1;

  const taxedAmount = Math.round(earnings * 0.2);

  return {
    downloadURL: "https://example.com",
    dateCreated: today.toMillis(),
    invoiceId,
    program: "my-program",
    earnings: `$${earnings}.00`,
    taxedAmount: `$${taxedAmount}.00`,
    netEarnings: `$${earnings - taxedAmount}.00`,
  };
};

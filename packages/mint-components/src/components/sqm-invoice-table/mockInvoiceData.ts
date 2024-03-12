import { DateTime } from "luxon";

export default (count = 4) => {
  const data = [...Array(count)].map(() => getMockData()) as Invoice[];
  return { data };
};

const getMockData = (): Invoice => {
  const today = DateTime.now();

  //  set random data
  //   const randomUnitNumber = Math.floor(Math.random() * 3);
  //   const randomStatus = status || statuses[Math.floor(Math.random() * 5)];
  //   const unit = units[randomUnitNumber];
  //   const prettyValue = prettyValues[randomUnitNumber];
  //   const randomValue = Math.floor(Math.random() * 100) + 2;

  return {
    downloadURL: "https://example.com",
    dateCreated: today.toMillis(),
    invoiceId: "asdfg",
    program: "my-program",
    earnings: "$20.00",
    taxedAmount: "$2.00",
    netEarnings: "$18.00",
  };
};

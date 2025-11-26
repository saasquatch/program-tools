import { createInterface } from "node:readline";

export async function select(
  promptMessage: string,
  options: { value: string; isDefault: boolean }[],
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(options) || options.length === 0) {
      return reject(new Error("Options must be a non-empty array of strings."));
    }

    console.log(promptMessage);
    options.forEach((option, index) => {
      const msg = `${index + 1} ${option.value}`;
      if (option.isDefault) {
        console.log(`${msg} \x1b[32m[default]\x1b[0m`);
      } else {
        console.log(msg);
      }
    });

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askForSelection = () => {
      rl.question("Enter the number of your choice: ", (answer) => {
        const choice =
          answer.length > 0
            ? options[parseInt(answer, 10) - 1]
            : options.find((o) => o.isDefault);

        if (choice) {
          rl.close();
          resolve(choice.value);
          console.log();
          return;
        } else {
          console.log("Invalid choice. Please enter a valid number.");
          askForSelection();
        }
      });
    };

    askForSelection();
  });
}

interface GenerateCodeOptions {
  prefix?: string;
  length: number;
  is_random?: boolean;
}

export const generateTicketCode = (opts: GenerateCodeOptions) => {
  const { prefix, length = 8, is_random = true } = opts;

  // create generate code from capital alphabet and numbers
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters = alphabet + numbers;

  let code = "";

  // if has prefix
  if (prefix) {
    code += prefix ? `${prefix}-` : "";
  }

  if (is_random) {
    // generate code based on length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);

      // code += characters[randomIndex];

      // if random and not has prefix
      code += characters[randomIndex];
    }
  }

  // if not random
  // generate code when not random
  if (!is_random) {
    for (let ii = 0; ii < length; ii++) {
      // code += numbers[ii % characters.length];
      code += `00${ii}`;
    }
  }

  return code;
};

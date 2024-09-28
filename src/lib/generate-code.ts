export const generateTicketCode = (length: number) => {
  // create generate code from capital alphabet and numbers
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters = alphabet + numbers;

  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};

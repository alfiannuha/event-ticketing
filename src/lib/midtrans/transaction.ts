import snap from "./init";

const createTransaction = async (params: any, callback: Function) =>
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      // transaction token
      callback(transaction);
      // const transactionToken = transaction.token;
      // console.log("transactionToken:", transactionToken);
    });

export default createTransaction;

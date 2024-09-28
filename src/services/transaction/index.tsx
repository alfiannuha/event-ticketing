import instance from "@/lib/axios/instance";

const transactionServices = {
  generateTransation: (data: any) => instance.post("/api/transaction", data),
};

export default transactionServices;

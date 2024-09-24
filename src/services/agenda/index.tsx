import instance from "@/lib/axios/instance";

const agendaServices = {
  getAllAgenda: () => instance.get("/api/agenda"),
};

export default agendaServices;

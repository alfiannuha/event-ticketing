import instance from "@/lib/axios/instance";

const eventsServices = {
  getAllEvents: () => instance.get("/api/events"),
  getAllActiveEvents: () => instance.get("/api/events_active"),
  getDetailEvent: (id: string) => instance.get(`/api/events/${id}`),
  createEvents: (data: any) => instance.post("/api/events", data),
  updateEvents: (id: string, data: any) =>
    instance.put("/api/events", { id, data }),
  deleteEvents: (id: string) =>
    instance.delete(`/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

export default eventsServices;

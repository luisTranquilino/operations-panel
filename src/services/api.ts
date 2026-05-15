import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://defaultc58f85657ab4440f84f2dd75f3745a.69.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/c1a1fc57c756457c93c5d1615292d6cf/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qz255uOgcXYmx-NqLf6D5VSCNmUCZu_Qr5B2k6whgfs",
  headers: {
    "Content-Type": "application/json",
  },
});

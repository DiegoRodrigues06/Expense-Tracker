import api from "./apiConnection";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    
    // Se a API retornar o token (mesmo que esteja desativado agora, a estrutura será essa)
    if (response.data.token) {
      localStorage.setItem("@ExpenseTracker:token", response.data.token);
      
      // Configura o header de autorização para as próximas requisições
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    }
    
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
};
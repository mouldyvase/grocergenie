// AuthService.js
export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    return !!token; // Returns true if the token is present, indicating the user is authenticated
  };
  
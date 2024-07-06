export const logout = () => {
    // Clear any authentication tokens or user details stored (if any)
    // For example, clear localStorage or sessionStorage items
    localStorage.removeItem('token'); // Example: Remove token from localStorage

    // Redirect to the login page
    window.location.href = '/'; // Redirect to your login page route
};
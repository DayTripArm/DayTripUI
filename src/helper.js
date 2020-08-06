export const isAuthorized = () => {
    return !(!localStorage.userType && !localStorage.id);
};

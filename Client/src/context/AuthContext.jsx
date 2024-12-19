import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfilePicture = (newProfilePicture) => {
    if (user) {
      const updatedUser = { ...user, profilePicture: newProfilePicture };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const removeProfilePicture = () => {
    if (user) {
      const updatedUser = { ...user };
      delete updatedUser.profilePicture;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };


  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateProfilePicture,
      removeProfilePicture,
      useUserType
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserType = () => {
  const { user } = useAuth();
  return user?.userType || null; 
};

export const useAuth = () => useContext(AuthContext);

import React from 'react';
import Sidebar from '../pages/Sidebar'; // Or wherever Sidebar is located

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}

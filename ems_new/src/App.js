import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import EmployeeProfile from './pages/EmployeeProfile';
import ApplyLeave from './pages/ApplyLeave';
import Trainings from './pages/Trainings';
import Tasks from './pages/Tasks';
import TaskAssigned from './pages/TaskAssigned';
import TransferPosting from './pages/TransferPosting';
import Explanation from './pages/Explanation';
import ShowCause from './pages/ShowCause';
import Messages from './pages/Messages';
import Documents from './pages/Documents';
import Deliverables from './pages/Deliverables';
import AddDeliverablesAD from './pages/Add_deliverables_AD';
import Login from './pages/Login';

// Components
import Layout from './components/Layout';
import { AuthProvider } from './pages/auth';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <PrivateRoute>
                  <Layout>
                    <Attendance />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <EmployeeProfile />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/apply_leave"
              element={
                <PrivateRoute>
                  <Layout>
                    <ApplyLeave />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/trainings"
              element={
                <PrivateRoute>
                  <Layout>
                    <Trainings />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Layout>
                    <Tasks />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskAssigned />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/new"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskAssigned />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/task_assigned"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskAssigned />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/transfer_posting"
              element={
                <PrivateRoute>
                  <Layout>
                    <TransferPosting />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/explanation"
              element={
                <PrivateRoute>
                  <Layout>
                    <Explanation />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/showcause"
              element={
                <PrivateRoute>
                  <Layout>
                    <ShowCause />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <PrivateRoute>
                  <Layout>
                    <Messages />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <PrivateRoute>
                  <Layout>
                    <Documents />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/deliverables"
              element={
                <PrivateRoute>
                  <Layout>
                    <Deliverables />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/add_deliverables"
              element={
                <PrivateRoute>
                  <Layout>
                    <AddDeliverablesAD />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;

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
import Messages from './pages/Messages'; // Assuming Messages is in pages as per previous context

// Components
import Layout from './components/Layout';
import Documents from './pages/Documents'; // Import the Documents component
import Deliverables from './pages/Deliverables'; // Import the Deliverables component
import AddDeliverablesAD from './pages/Add_deliverables_AD'; // Corrected import to PascalCase and updated path
import Login from './pages/Login';
import { AuthProvider } from './pages/auth';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <Routes>
          {/* Route without layout */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with layout */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/attendance"
            element={
              <Layout>
                <Attendance />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <EmployeeProfile />
              </Layout>
            }
          />
          <Route
            path="/apply_leave"
            element={
              <Layout>
                <ApplyLeave />
              </Layout>
            }
          />
          <Route
            path="/trainings"
            element={
              <Layout>
                <Trainings />
              </Layout>
            }
          />
          <Route
            path="/tasks"
            element={
              <Layout>
                <Tasks />
              </Layout>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <Layout>
                <TaskAssigned />
              </Layout>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <Layout>
                <TaskAssigned />
              </Layout>
            }
          />
          <Route
            path="/task_assigned"
            element={
              <Layout>
                <TaskAssigned />
              </Layout>
            }
          />
          <Route
            path="/transfer_posting"
            element={
              <Layout>
                <TransferPosting />
              </Layout>
            }
          />
          <Route
            path="/explanation"
            element={
              <Layout>
                <Explanation />
              </Layout>
            }
          />
          <Route
            path="/showcause"
            element={
              <Layout>
                <ShowCause />
              </Layout>
            }
          />
          <Route
            path="/messages"
            element={
              <Layout>
                <Messages />
              </Layout>
            }
          />
          <Route
            path="/documents"
            element={
              <Layout>
                <Documents />
              </Layout>
            }
          />
          {/* Deliverables Routes */}
          <Route
            path="/deliverables"
            element={
              <Layout>
                <Deliverables />
              </Layout>
            }
          />
          <Route
            path="/add_deliverables"
            element={
              <Layout>
                <AddDeliverablesAD /> {/* Updated component name to PascalCase */}
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;

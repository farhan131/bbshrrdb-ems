import React, { useState, useEffect } from 'react';
import Header from './Header'; // Assuming Header component is in the same directory or a common 'components' directory

const Deliverables = () => {
  const [userId, setUserId] = useState(''); // userId will be simulated
  const [deliverables, setDeliverables] = useState([]); // Raw list of deliverables
  const [categorizedDeliverables, setCategorizedDeliverables] = useState({}); // Deliverables grouped by status
  const [loading, setLoading] = useState(true);

  // Simulate user ID and initial loading
  useEffect(() => {
    const simulatedUserId = 'employee_' + Math.random().toString(36).substring(2, 10);
    setUserId(simulatedUserId);

    // Pre-populate with sample deliverables
    const initialDeliverables = [
      {
        id: 'del1',
        employeeId: simulatedUserId,
        title: 'Q3 Sales Report',
        description: 'Compile and analyze sales data for the third quarter.',
        dueDate: new Date('2025-09-30'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-15T14:30:00Z'),
        viewLink: '#' // Placeholder link
      },
      {
        id: 'del2',
        employeeId: simulatedUserId,
        title: 'HR Policy Update Review',
        description: 'Review and provide feedback on the updated HR policies.',
        dueDate: new Date('2025-07-25'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-10T09:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del3',
        employeeId: simulatedUserId,
        title: 'Annual Performance Review Form',
        description: 'Complete self-assessment for annual performance review.',
        dueDate: new Date('2025-06-30'),
        status: 'Completed',
        lastUpdated: new Date('2025-06-28T16:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del4',
        employeeId: simulatedUserId,
        title: 'New Employee Onboarding Guide',
        description: 'Draft the first version of the onboarding guide.',
        dueDate: new Date('2025-08-15'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-01T11:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del5',
        employeeId: simulatedUserId,
        title: 'Software License Renewal',
        description: 'Initiate renewal process for all team software licenses.',
        dueDate: new Date('2025-07-20'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-16T10:00:00Z'),
        viewLink: '#'
      },
      // Existing New Deliverables
      {
        id: 'del6',
        employeeId: simulatedUserId,
        title: 'Maintain Office Cleanliness',
        description: 'Ensure daily cleanliness and hygiene standards are met in the workspace.',
        dueDate: new Date('2025-07-17'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T09:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del7',
        employeeId: simulatedUserId,
        title: 'Submit Monthly PMR Report',
        description: 'Prepare and submit the monthly Project Monitoring Report for June.',
        dueDate: new Date('2025-07-31'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T11:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del8',
        employeeId: simulatedUserId,
        title: 'Complete Site Visit Report - North Region',
        description: 'Document findings and observations from the recent site visits in the North region.',
        dueDate: new Date('2025-08-05'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T13:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del9',
        employeeId: simulatedUserId,
        title: 'Submit Weekly Monitoring Report',
        description: 'Compile and submit the weekly progress and monitoring report for this week.',
        dueDate: new Date('2025-07-19'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T15:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del10',
        employeeId: simulatedUserId,
        title: 'Trainee Training Completion Report - Q2',
        description: 'Prepare a report on the number of trainees who successfully completed their programs in Q2.',
        dueDate: new Date('2025-07-10'),
        status: 'Completed',
        lastUpdated: new Date('2025-07-08T10:00:00Z'),
        viewLink: '#'
      },
      // Newly Added Deliverables
      {
        id: 'del11',
        employeeId: simulatedUserId,
        title: 'Declining Academic Performance Report',
        description: 'Analyze and report on factors contributing to declining academic performance.',
        dueDate: new Date('2025-08-20'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T16:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del12',
        employeeId: simulatedUserId,
        title: 'Family Support Program Outline',
        description: 'Develop an outline for new family support and parenting programs.',
        dueDate: new Date('2025-09-01'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T16:15:00Z'),
        viewLink: '#'
      },
      {
        id: 'del13',
        employeeId: simulatedUserId,
        title: 'Job Training & Employment Strategy',
        description: 'Formulate a strategy for enhanced job training and employment initiatives.',
        dueDate: new Date('2025-09-15'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T16:30:00Z'),
        viewLink: '#'
      },
      {
        id: 'del14',
        employeeId: simulatedUserId,
        title: 'Skills Gap Assessment Report',
        description: 'Compile a report on identified skills gaps within the workforce.',
        dueDate: new Date('2025-08-10'),
        status: 'Completed',
        lastUpdated: new Date('2025-07-10T14:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del15',
        employeeId: simulatedUserId,
        title: 'Curriculum Framework Development',
        description: 'Develop the new curriculum framework for upcoming training programs.',
        dueDate: new Date('2025-08-25'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T16:45:00Z'),
        viewLink: '#'
      },
      {
        id: 'del16',
        employeeId: simulatedUserId,
        title: 'Training Modules Creation',
        description: 'Create comprehensive training modules for new courses.',
        dueDate: new Date('2025-09-05'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T17:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del17',
        employeeId: simulatedUserId,
        title: 'Session Plans & Lesson Plans',
        description: 'Draft detailed session and lesson plans for all training programs.',
        dueDate: new Date('2025-09-10'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T17:15:00Z'),
        viewLink: '#'
      },
      {
        id: 'del18',
        employeeId: simulatedUserId,
        title: 'Trainer Manuals Development',
        description: 'Develop comprehensive manuals for all trainers.',
        dueDate: new Date('2025-09-20'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T17:30:00Z'),
        viewLink: '#'
      },
      {
        id: 'del19',
        employeeId: simulatedUserId,
        title: 'Participant Handbooks Design',
        description: 'Design and finalize participant handbooks for all courses.',
        dueDate: new Date('2025-09-25'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T17:45:00Z'),
        viewLink: '#'
      },
      {
        id: 'del20',
        employeeId: simulatedUserId,
        title: 'Batch-wise Training Schedules',
        description: 'Prepare detailed batch-wise training schedules for the next quarter.',
        dueDate: new Date('2025-08-01'),
        status: 'Completed',
        lastUpdated: new Date('2025-07-05T09:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del21',
        employeeId: simulatedUserId,
        title: 'Daily Attendance Records',
        description: 'Maintain and submit daily attendance records for all training sessions.',
        dueDate: new Date('2025-07-17'), // Today
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T18:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del22',
        employeeId: simulatedUserId,
        title: 'Pre- and Post-Training Assessment Results',
        description: 'Compile and analyze assessment results for recent training batches.',
        dueDate: new Date('2025-07-28'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T18:15:00Z'),
        viewLink: '#'
      },
      {
        id: 'del23',
        employeeId: simulatedUserId,
        title: 'Photographic Evidence of Sessions',
        description: 'Organize and archive photographic evidence from all training sessions.',
        dueDate: new Date('2025-07-22'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T18:30:00Z'),
        viewLink: '#'
      },
      {
        id: 'del24',
        employeeId: simulatedUserId,
        title: 'Baseline and Endline Surveys Report',
        description: 'Analyze and report findings from baseline and endline surveys.',
        dueDate: new Date('2025-08-30'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T18:45:00Z'),
        viewLink: '#'
      },
      {
        id: 'del25',
        employeeId: simulatedUserId,
        title: 'Participant & Trainer Feedback Forms Analysis',
        description: 'Analyze feedback forms from participants and trainers.',
        dueDate: new Date('2025-08-15'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T19:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del26',
        employeeId: simulatedUserId,
        title: 'Skill Progression Reports',
        description: 'Generate reports on skill progression of trainees over time.',
        dueDate: new Date('2025-09-01'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T19:15:00Z'),
        viewLink: '#'
      },
      {
        id: 'del27',
        employeeId: simulatedUserId,
        title: 'Training Completion Certificates Issuance',
        description: 'Prepare and issue training completion certificates to eligible participants.',
        dueDate: new Date('2025-07-20'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T19:30:00Z'),
        viewLink: '#'
      },
      {
        id: 'del28',
        employeeId: simulatedUserId,
        title: 'MIS Reports (Enrolment, Dropout, Completion)',
        description: 'Generate MIS reports for enrolment, dropout, and completion rates.',
        dueDate: new Date('2025-07-25'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T19:45:00Z'),
        viewLink: '#'
      },
      {
        id: 'del29',
        employeeId: simulatedUserId,
        title: 'Third-Party Evaluation Report Coordination',
        description: 'Coordinate and review the third-party evaluation report.',
        dueDate: new Date('2025-10-01'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T20:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del30',
        employeeId: simulatedUserId,
        title: 'Monthly Progress Report - July',
        description: 'Prepare and submit the monthly progress report for July.',
        dueDate: new Date('2025-08-05'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T20:15:00Z'),
        viewLink: '#'
      },
      {
        id: 'del31',
        employeeId: simulatedUserId,
        title: 'Mid-term Project Report',
        description: 'Compile and submit the mid-term project report.',
        dueDate: new Date('2025-09-10'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T20:30:00Z'),
        viewLink: '#'
      },
      {
        id: 'del32',
        employeeId: simulatedUserId,
        title: 'Final Project Report',
        description: 'Prepare and submit the final project report.',
        dueDate: new Date('2025-12-15'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T20:45:00Z'),
        viewLink: '#'
      },
      {
        id: 'del33',
        employeeId: simulatedUserId,
        title: 'Financial Expenditure Report - Q3',
        description: 'Generate a report comparing budget vs actual financial expenditure for Q3.',
        dueDate: new Date('2025-10-10'),
        status: 'Pending',
        lastUpdated: new Date('2025-07-17T21:00:00Z'),
        viewLink: '#'
      },
      {
        id: 'del34',
        employeeId: simulatedUserId,
        title: 'Case Studies / Success Stories Compilation',
        description: 'Compile compelling case studies and success stories from recent initiatives.',
        dueDate: new Date('2025-08-20'),
        status: 'In Progress',
        lastUpdated: new Date('2025-07-17T21:15:00Z'),
        viewLink: '#'
      },
    ].sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()); // Sort by last updated date descending

    setDeliverables(initialDeliverables);
    setLoading(false);
  }, []);

  // Effect to categorize deliverables whenever 'deliverables' or 'userId' changes
  useEffect(() => {
    if (!userId) return;

    const categorized = deliverables.reduce((acc, del) => {
      const status = del.status || 'Uncategorized';
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(del);
      return acc;
    }, {});
    setCategorizedDeliverables(categorized);
  }, [deliverables, userId]);

  // Removed handleSimulateNewDeliverable function as it's no longer needed.

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="text-lg animate-pulse">Loading deliverables...</p>
      </div>
    );
  }

  const deliverableStatusOrder = [
    'Pending',
    'In Progress',
    'Completed',
    'Uncategorized', // Always last
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-inter antialiased">
      {/* Main Page Header */}
      <Header /> {/* Replaced existing main header with the imported Header component */}

      <main className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Removed the "Simulate New Deliverable" button */}

        {Object.keys(categorizedDeliverables).length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10 p-4 rounded-lg">
            <p className="text-lg mb-4">No deliverables to display.</p>
          </div>
        ) : (
          deliverableStatusOrder.map(status => {
            const dels = categorizedDeliverables[status];
            if (!dels || dels.length === 0) return null;

            return (
              <section key={status} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                {/* Header by status */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-blue-400 pb-2">
                  {status} Deliverables
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-white dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {dels.map(del => (
                        <tr key={del.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
                            {del.title}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {del.dueDate?.toLocaleDateString() || 'N/A'}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${del.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                              ${del.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                              ${del.status === 'Pending' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                            `}>
                              {del.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {del.lastUpdated?.toLocaleDateString() || 'N/A'}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm">
                            <a
                              href={del.viewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
    </div>
  );
};

export default Deliverables;

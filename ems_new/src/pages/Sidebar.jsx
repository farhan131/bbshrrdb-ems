import { useState, useEffect } from "react";
import {
  HomeIcon,
  UserIcon,
  MailIcon,
  FileTextIcon,
  MenuIcon,
  BriefcaseIcon,
  ClipboardIcon,
  AlertCircleIcon,
  BookOpenIcon,
  CheckSquareIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Define all navigation items
const navItems = [
  { label: "Dashboard", icon: <HomeIcon size={20} />, to: "/dashboard" },
  { label: "Attendance", icon: <CheckSquareIcon size={20} />, to: "/attendance" },
  { label: "Profile", icon: <UserIcon size={20} />, to: "/profile" },
  { label: "Apply for Leave", icon: <BriefcaseIcon size={20} />, to: "/apply_leave" },
  { label: "Trainings", icon: <BookOpenIcon size={20} />, to: "/trainings" },
  { label: "Tasks", icon: <ClipboardIcon size={20} />, to: "/tasks" },
  { label: "Task Assigned", icon: <ClipboardIcon size={20} />, to: "/task_assigned" },
  { label: "Transfer Posting", icon: <ClipboardIcon size={20} />, to: "/transfer_posting" },
  { label: "Explanation", icon: <AlertCircleIcon size={20} />, to: "/explanation" },
  { label: "Showcause", icon: <AlertCircleIcon size={20} />, to: "/showcause" },
  { label: "Messages", icon: <MailIcon size={20} />, to: "/messages" },
  { label: "Documents", icon: <FileTextIcon size={20} />, to: "/documents" },
  { label: "Deliverables Form", icon: <ClipboardIcon size={20} />, to: "/add_deliverables" }, // Added new link for Add Deliverables

  { label: "Deliverables Status", icon: <ClipboardIcon size={20} />, to: "/deliverables" },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-16"
      } bg-blue-800 text-white flex flex-col transition-all duration-300 h-screen sticky top-0`}
    >
      {/* Top Branding & Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-blue-700">
        {isExpanded && <h1 className="text-xl font-bold">Employee Portal</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 focus:outline-none"
          aria-label="Toggle Sidebar"
          aria-expanded={isExpanded}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="mt-4 flex-1 overflow-y-auto" aria-label="Sidebar Navigation">
        <ul>
          {navItems.map(({ label, icon, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`flex items-center py-2 px-4 hover:bg-blue-700 ${
                  location.pathname === to ? "bg-blue-700" : ""
                }`}
              >
                <span className="w-6 h-6">{icon}</span>
                <span className={`ml-2 ${isExpanded ? "inline" : "hidden"} md:inline`}>
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

// import { useState, useEffect } from "react";
// import {
//   HomeIcon,
//   UserIcon,
//   MailIcon,
//   FileTextIcon,
//   MenuIcon,
//   BriefcaseIcon,
//   ClipboardIcon,
//   AlertCircleIcon,
//   BookOpenIcon,
//   CheckSquareIcon
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// // Define all navigation items
// const navItems = [
//   { label: "Dashboard", icon: <HomeIcon size={20} />, to: "/dashboard" },
//   { label: "Attendance", icon: <CheckSquareIcon size={20} />, to: "/attendance" },
//   { label: "Profile", icon: <UserIcon size={20} />, to: "/profile" },
//   { label: "Apply for Leave", icon: <BriefcaseIcon size={20} />, to: "/apply_leave" },
//   { label: "Trainings", icon: <BookOpenIcon size={20} />, to: "/trainings" },
//   { label: "Tasks", icon: <ClipboardIcon size={20} />, to: "/tasks" },
//   { label: "Task Assigned", icon: <ClipboardIcon size={20} />, to: "/task_assigned" }, // ✅ Added here
//   { label: "Transfer Posting", icon: <ClipboardIcon size={20} />, to: "/transfer_posting" },
//   { label: "Explanation", icon: <AlertCircleIcon size={20} />, to: "/explanation" },
//   { label: "Showcause", icon: <AlertCircleIcon size={20} />, to: "/showcause" },
//   { label: "Messages", icon: <MailIcon size={20} />, to: "/messages" },
//   { label: "Documents", icon: <FileTextIcon size={20} />, to: "/documents" },
//   { label: "Deliverables", icon: <ClipboardIcon size={20} />, to: "/deliverables" },
// ];

// const Sidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);
//   const location = useLocation();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsExpanded(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   return (
//     <aside
//       className={`${
//         isExpanded ? "w-64" : "w-16"
//       } bg-blue-800 text-white flex flex-col transition-all duration-300 h-screen sticky top-0`}
//     >
//       {/* Top Branding & Toggle */}
//       <div className="p-4 flex items-center justify-between border-b border-blue-700">
//         {isExpanded && <h1 className="text-xl font-bold">Employee Portal</h1>}
//         <button
//           onClick={toggleSidebar}
//           className="p-2 focus:outline-none"
//           aria-label="Toggle Sidebar"
//           aria-expanded={isExpanded}
//         >
//           <MenuIcon className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Nav Menu */}
//       <nav className="mt-4 flex-1 overflow-y-auto" aria-label="Sidebar Navigation">
//         <ul>
//           {navItems.map(({ label, icon, to }) => (
//             <li key={label}>
//               <Link
//                 to={to}
//                 className={`flex items-center py-2 px-4 hover:bg-blue-700 ${
//                   location.pathname === to ? "bg-blue-700" : ""
//                 }`}
//               >
//                 <span className="w-6 h-6">{icon}</span>
//                 <span className={`ml-2 ${isExpanded ? "inline" : "hidden"} md:inline`}>
//                   {label}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// // import { useState, useEffect } from "react";
// // import {
// //   HomeIcon,
// //   UserIcon,
// //   MailIcon,
// //   FileTextIcon,
// //   MenuIcon,
// //   BriefcaseIcon,
// //   ClipboardIcon,
// //   AlertCircleIcon,
// //   BookOpenIcon,
// //   CheckSquareIcon
// // } from "lucide-react";


// // import { Link, useLocation } from "react-router-dom";

// // // Define all navigation items
// // const navItems = [
// //   { label: "Dashboard", icon: <HomeIcon size={20} />, to: "/dashboard" },
// //   { label: "Attendance", icon: <CheckSquareIcon size={20} />, to: "/attendance" },
// //   { label: "Profile", icon: <UserIcon size={20} />, to: "/profile" },
// //   { label: "Apply for Leave", icon: <BriefcaseIcon size={20} />, to: "/apply_leave" },
// //   { label: "Trainings", icon: <BookOpenIcon size={20} />, to: "/trainings" },
// //   { label: "Tasks", icon: <ClipboardIcon size={20} />, to: "/tasks" },
// //   { label: "Transfer Posting", icon: <ClipboardIcon size={20} />, to: "/transfer_posting" },
// //   { label: "Explanation", icon: <AlertCircleIcon size={20} />, to: "/explanation" },
// //   { label: "Showcause", icon: <AlertCircleIcon size={20} />, to: "/showcause" },
// //   { label: "Messages", icon: <MailIcon size={20} />, to: "/messages" },
// //   { label: "Documents", icon: <FileTextIcon size={20} />, to: "/documents" },
// //   { label: "Deliverables", icon: <ClipboardIcon size={20} />, to: "/deliverables" },
// // ];

// // const Sidebar = () => {
// //   const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);
// //   const location = useLocation();

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsExpanded(window.innerWidth >= 768);
// //     };
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const toggleSidebar = () => {
// //     setIsExpanded((prev) => !prev);
// //   };

// //   return (
// //     <aside
// //       className={`${
// //         isExpanded ? "w-64" : "w-16"
// //       } bg-blue-800 text-white flex flex-col transition-all duration-300 h-screen sticky top-0`}
// //     >
// //       {/* Top Branding & Toggle */}
// //       <div className="p-4 flex items-center justify-between border-b border-blue-700">
// //         {isExpanded && <h1 className="text-xl font-bold">Employee Portal</h1>}
// //         <button
// //           onClick={toggleSidebar}
// //           className="p-2 focus:outline-none"
// //           aria-label="Toggle Sidebar"
// //           aria-expanded={isExpanded}
// //         >
// //           <MenuIcon className="w-6 h-6" />
// //         </button>
// //       </div>

// //       {/* Nav Menu */}
// //       <nav className="mt-4 flex-1 overflow-y-auto" aria-label="Sidebar Navigation">
// //         <ul>
// //           {navItems.map(({ label, icon, to }) => (
// //             <li key={label}>
// //               <Link
// //                 to={to}
// //                 className={`flex items-center py-2 px-4 hover:bg-blue-700 ${
// //                   location.pathname === to ? "bg-blue-700" : ""
// //                 }`}
// //               >
// //                 <span className="w-6 h-6">{icon}</span>
// //                 <span className={`ml-2 ${isExpanded ? "inline" : "hidden"} md:inline`}>
// //                   {label}
// //                 </span>
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>
// //     </aside>
// //   );
// // };

// // export default Sidebar;

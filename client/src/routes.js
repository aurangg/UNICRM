import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

//Customization
//Custom pages
//custom admin pages
import Anavteacher from "./views/Admin/Teacher/navteacher";
import Aaddteacher from "./views/Admin/Teacher/addteacher";
import Aeditteacher from "./views/Admin/Teacher/editteacher";
import Anavcourse from "./views/Admin/Course/navcourse";
import Aaddcourse from './views/Admin/Course/addcourse';
import Aeditcourse from './views/Admin/Course/editcourse';
import Practice from './views/Admin/Course/practice';
import Anavmentor from "./views/Admin/Mentor/navmentor";
import Anavhod from "./views/Admin/Hod/navhod";
import Aaddsemester from "./views/Admin/Semester/addsemester"; 
import Anavsemester from "./views/Admin/Semester/navsemester";
import Aeditsemester from "./views/Admin/Semester/editsemester";
import Aaddsection from "./views/Admin/Section/addsection";
import Aeditsection from "./views/Admin/Section/editsection";
import Anavsection from "./views/Admin/Section/navsection";

//custom Teacher pages
import TDashboard from "./views/Dashboard/TDashboard.js";
import Tnavcourse from "./views/Teacher/Course/navcourse";
import Tnavcourses from "./views/Teacher/Course/navcourses";
import Tdailylog from "./views/Teacher/Dailylog/dailylog";
import UploadSample from "./views/Teacher/Course/uploadsample.js";
import Section from './views/Teacher/selectSection.js';
import Sections from './views/Teacher/sections.js';
import CourseFolder from './views/Teacher/coursefolder.js';
import CourseFolders from './views/Teacher/coursefolders.js';
import AddAssignment from './views/Teacher/addAssignment.js';
import AddQuiz from './views/Teacher/addQuiz.js';
import AddCourseOutline from './views/Teacher/addCourseOutline';
import AddMid from './views/Teacher/addMids';
import AddFinal from './views/Teacher/addFinals';
import AddAttendance from './views/Teacher/addAttendance';
import AddResult from './views/Teacher/addResult';
import Assignments from './views/Teacher/assignment';
import Progress from './views/Teacher/progress.js';
import CFCSections from './views/Teacher/sectionsCFC.js';
import CFCDetails from './views/Teacher/details.js';
import AddDeadlines from './views/Teacher/addDeadlines.js';
import Check from './views/Teacher/check.js';

//custom Mentor pages
import MDashboard from "./views/Dashboard/MDashboard.js";

//custom Hod pages
import HDashboard from "./views/Dashboard/HDashboard.js";
//custom committee pages
import CDashboard from "./views/Dashboard/CDashboard.js";

// custom icons
import Person from "@material-ui/icons/Person";
import Assignment from "@material-ui/icons/Assignment";
//custom Auth pages
import UOLlogin from './views/Auth/uolLogin';
import Auth from './hoc/authhoc';

var dashRoutes = [
  /*Cutomization start*/
  /*Cutomization end*/
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Auth(Dashboard,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/navsemester",
    name: "Semester",
    icon: Assignment,
    component: Auth(Anavsemester,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/addsemester",
    name: "Add Semester",
    invisible: true,
    icon: Assignment,
    component: Auth(Aaddsemester,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/editsemester/:id",
    name: "Edit Semester",
    invisible: true,
    icon: Assignment,
    component: Auth(Aeditsemester,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/navteacher",
    name: "Teacher",
    icon: Person,
    component: Auth(Anavteacher,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/addteacher",
    name: "Add Teacher",
    invisible: true,
    icon: Person,
    component: Auth(Aaddteacher,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/editteacher/:id",
    name: "Edit Teacher",
    invisible: true,
    icon: Person,
    component: Auth(Aeditteacher,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/navcourse",
    name: "Course",
    icon: Assignment,
    component: Auth(Anavcourse,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/addcourse",
    name: "Add Course",
    invisible: true,
    icon: Assignment,
    component: Auth(Aaddcourse,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/editcourse/:id",
    name: "Edit Course",
    invisible: true,
    icon: Assignment,
    component: Auth(Aeditcourse,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/navsections",
    name: "Sections",
    icon: Assignment,
    component: Auth(Anavsection,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/addsections",
    name: "Add Sections",
    invisible: true,
    icon: Assignment,
    component: Auth(Aaddsection,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/editsections/:id",
    name: "Edit Sections",
    invisible: true,
    icon: Assignment,
    component: Auth(Aeditsection,true,"admin"),
    layout: "/admin"
  },
  {
    path: "/practice",
    name: "practice",
    icon: Assignment,
    component: Practice,
    layout: "/admin"
  },
  {
    path: "/navMentor",
    name: "Mentor",
    icon: Person,
    component: Anavmentor,
    layout: "/admin"
  },
  {
    path: "/navhod",
    name: "HOD",
    icon: Person,
    component: Anavhod,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Pages",
    icon: Image,
    state: "pageCollapse",
    views: [
      {
        path: "/pricing-page",
        name: "Pricing Page",
        mini: "PP",
        component: PricingPage,
        layout: "/auth"
      },
      {
        path: "/rtl-support-page",
        name: "RTL Support",
        mini: "RS",
        component: RTLSupport,
        layout: "/rtl"
      },
      {
        path: "/timeline-page",
        name: "Timeline Page",
        mini: "T",
        component: TimelinePage,
        layout: "/admin"
      },
      {
        path: "/login-page",
        name: "Login Page",
        mini: "L",
        component: LoginPage,
        layout: "/auth"
      },
      {
        path: "/register-page",
        name: "Register Page",
        mini: "R",
        component: RegisterPage,
        layout: "/auth"
      },
      {
        path: "/lock-screen-page",
        name: "Lock Screen Page",
        mini: "LS",
        component: LockScreenPage,
        layout: "/auth"
      },
      {
        path: "/user-page",
        name: "User Profile",
        mini: "UP",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/error-page",
        name: "Error Page",
        mini: "E",
        component: ErrorPage,
        layout: "/auth"
      }
    ]
  },
  {
    collapse: true,
    name: "Components",
    icon: Apps,
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        mini: "MC",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            mini: "B",
            component: Buttons,
            layout: "/admin"
          }
        ]
      },
      {
        path: "/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        mini: "GS",
        component: GridSystem,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "Panels",
        mini: "P",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        mini: "N",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        mini: "I",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        mini: "T",
        component: Typography,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms,
        layout: "/admin"
      },
      {
        path: "/wizard",
        name: "Wizard",
        mini: "W",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    icon: GridOn,
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        mini: "RT",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        mini: "ET",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        mini: "RT",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    icon: Place,
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        mini: "GM",
        component: GoogleMaps,
        layout: "/admin"
      },
      {
        path: "/full-screen-maps",
        name: "Full Screen Map",
        mini: "FSM",
        component: FullScreenMap,
        layout: "/admin"
      },
      {
        path: "/vector-maps",
        name: "Vector Map",
        mini: "VM",
        component: VectorMap,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: WidgetsIcon,
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    icon: Timeline,
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: DateRange,
    component: Calendar,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Auth(TDashboard,true,"teacher"),
    layout: "/teacher"
  },
  {
    path: "/dailylog",
    name: "Daily Log",
    icon: Assignment,
    component: Auth(Tdailylog,true,"teacher"),
    layout: "/teacher"
  },
  // {
  //   path: "/navcourse",
  //   name: "Course",
  //   icon: Assignment,
  //   component: Auth(Tnavcourse,true,"teacher"),
  //   layout: "/teacher"
  // },
  {
    path: "/navcourses",
    name: "Course",
    icon: Assignment,
    component: Auth(Tnavcourses,true,"teacher"),
    layout: "/teacher"
  },
  // {
  //   path: "/sections/:id",
  //   name: "Section",
  //   icon: Assignment,
  //   component: Auth(Section,true,"teacher"),
  //   layout: "/teacher"
  // },
  {
    path: "/sections",
    component: Auth(Sections,true,"teacher"),
    layout: "/teacher"
  },
  {
    path: "/uploadfile",
    name: "Upload File",
    icon: DashboardIcon,
    component: Auth(UploadSample,true,"teacher"),
    layout: "/teacher"
  },
  {
    path: "/progress",
    name: "Courses Progress",
    icon: DashboardIcon,
    component:Auth(Progress, true, "teacher"),
    layout:"/teacher"
  },
  {
    path: "/deadlines",
    name: "Add Deadlines",
    icon: DashboardIcon,
    component:Auth(AddDeadlines, true, "teacher"),
    layout:"/teacher"
  },
  // {
  //   path: "/coursefolder/:id",
  //   name: "Course Folder",
  //   icon: DashboardIcon,
  //   component: Auth(CourseFolder,true,"teacher"),
  //   layout: "/teacher"
  // },
  {
    path: "/coursefolders/",
    component: Auth(CourseFolders,true,"teacher"),
    layout: "/teacher"
  },
  {
    path: "/assignment",
    component: Auth(Assignments, true, "teacher"),
    layout: "/teacher"
  },
  {
    path: "/addAssignment",
    // name: "Course Folder",
    // icon: DashboardIcon,
    component: Auth(AddAssignment,true,"teacher"),
    layout: "/teacher"
  },
  {
    path: "/addQuiz",
    // name: "Course Folder",
    // icon: DashboardIcon,
    component: Auth(AddQuiz,true,"teacher"),
    layout: "/teacher"
  },
  {
    path:"/addCourseOutline",
    component:Auth(AddCourseOutline, true, "teacher"),
    layout:"/teacher"
  },
  {
    path:"/addMids",
    component:Auth(AddMid, true, "teacher"),
    layout:"/teacher"
  },
  {
    path:"/addFinals",
    component:Auth(AddFinal, true, "teacher"),
    layout:"/teacher"
  },
  {
    path:"/addAttendance",
    component:Auth(AddAttendance, true, "teacher"),
    layout:"/teacher"
  },
  {
    path:"/addResult",
    component:Auth(AddResult, true, "teacher"),
    layout:"/teacher"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: MDashboard,
    layout: "/mentor"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: HDashboard,
    layout: "/hod"
  },
  {
    path: "/sectionscfc",
    component:Auth(CFCSections, true, "teacher"),
    layout:"/teacher"
  },
  {
    path: "/check",
    component:Auth(Check, true, "teacher"),
    layout: "/teacher"
  },
  {
    path:"/details",
    component:Auth(CFCDetails, true, "teacher"),
    layout:"/teacher"
  },
  {
    path: "/login-page",
    name: "Login Page",
    mini: "R",
    component: Auth(UOLlogin,false,"uolauth"),
    layout: "/uolauth"
  }
];
export default dashRoutes;

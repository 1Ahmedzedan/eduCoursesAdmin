import React, { Children } from 'react'
import Packages from './views/theme/Packages/Packages'
import ProfileInfo from './views/theme/UserDetail/ProfileInfo/ProfileInfo'
import ProfileCourses from './views/theme/UserDetail/ProfileCourses/ProfileCourses'
import ProfileFinalExamContainer from './views/theme/UserDetail/ProfileFinalExamContainer/ProfileFinalExamContainer'
import ProfileQuizesContainer from './views/theme/UserDetail/ProfileQuizesContainer/ProfileQuizesContainer'
import { element } from 'prop-types'
import Pages from './views/theme/Pages/Pages'
const ProfileContainer = React.lazy(
  () => import('./views/theme/UserDetail/ProfileContainer/ProfileContainer'),
)
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Courses = React.lazy(() => import('./views/theme/Courses/Courses'))
const Lessons = React.lazy(() => import('./views/theme/Lessons/Lessons'))
const Users = React.lazy(() => import('./views/theme/Users/Users'))
const FinalExamAnswers = React.lazy(() => import('./views/theme/FinalExamAnswers/FinalExamAnswers'))
const QuizAnswerContainer = React.lazy(
  () => import('./views/theme/QuizAnswerContainer/QuizAnswerContainer'),
)
const AddCourse = React.lazy(() => import('./views/theme/AddCourse/AddCourse'))
const EditCourse = React.lazy(() => import('./views/theme/EditCourse/EditCourse'))
const AddPackage = React.lazy(() => import('./views/theme/AddPackage/AddPackage'))
const EditPackage = React.lazy(() => import('./views/theme/EditPackage/EditPackage'))
const AddLesson = React.lazy(() => import('./views/theme/AddLesson/AddLesson'))
const AddQuestion = React.lazy(() => import('./views/theme/AddQuestion/AddQuestion'))
const EditQuestion = React.lazy(() => import('./views/theme/EditQuestion/EditQuestion'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/courses', name: 'Colors', element: Courses },
  { path: '/lessons/:courseID', name: 'Colors', element: Lessons },
  { path: '/finalExam/:courseID', name: 'Colors', element: FinalExamAnswers },
  { path: '/lessonQuestion/:courseID/:lessonID', name: 'Colors', element: QuizAnswerContainer },
  { path: '/packages', name: 'Colors', element: Packages },
  { path: '/addCourse', name: 'addCourse', element: AddCourse },
  { path: '/addLesson/:courseID', name: 'addCourse', element: AddLesson },
  { path: '/editCourse/:courseID', name: 'addCourse', element: EditCourse },
  { path: '/addPackage', name: 'addCourse', element: AddPackage },
  { path: '/editPackage/:pkgID', name: 'addCourse', element: EditPackage },
  { path: '/editQuestion/:lessonID/:QuestionIdx', name: 'addCourse', element: EditQuestion },
  {
    path: '/editQuestionFinalExam/:courseID/:QuestionIdx',
    name: 'addCourse',
    element: EditQuestion,
  },
  { path: '/addQuestion/:courseID/:lessonID', name: 'addCourse', element: AddQuestion },
  { path: '/addQuestion/:courseID', name: 'addCourse', element: AddQuestion },
  { path: '/users', name: 'users', element: Users },
  { path: '/userInfo/:userID', name: 'users', element: ProfileInfo },
  { path: '/userCourses/:userID', name: 'userCourses', element: ProfileCourses },
  {
    path: '/userAttendedFinalExams/:userID',
    name: 'userFinalExams',
    element: ProfileFinalExamContainer,
  },
  {
    path: '/userAttendedQuizes/:userID',
    name: 'userQuizes',
    element: ProfileQuizesContainer,
  },

  {
    path: '/pages',
    name: 'pages',
    element: Pages,
  },
]

export default routes

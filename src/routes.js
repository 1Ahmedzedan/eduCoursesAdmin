import React, { Children } from 'react'
import Packages from './views/theme/Packages/Packages'
import ProfileInfo from './views/theme/UserDetail/ProfileInfo/ProfileInfo'
import ProfileCourses from './views/theme/UserDetail/ProfileCourses/ProfileCourses'
import ProfileFinalExamContainer from './views/theme/UserDetail/ProfileFinalExamContainer/ProfileFinalExamContainer'
import ProfileQuizesContainer from './views/theme/UserDetail/ProfileQuizesContainer/ProfileQuizesContainer'
import Pages from './views/theme/Pages/Pages'
import AboutPageForm from './views/theme/AboutPageForm/AboutPageForm'
import TermsPageForm from './views/theme/TermsPageForm/TermsPageForm'
import ContactPageForm from './views/theme/ContactPageForm/ContactPageForm'
import Chapters from './views/theme/Chapters/Chapters'
import AddChapter from './views/theme/AddChapter/AddChapter'
import { element } from 'prop-types'
import PromoCode from './views/theme/PromoCode/PromoCode'
import AddPromoCode from './views/theme/AddPromoCode/AddPromoCode'
import PracticeTests from './views/theme/PracticeTests/PracticeTests'

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

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/courses', name: 'Courses', element: Courses },
  { path: '/chapters/:courseID', name: 'Chapters', element: Chapters },
  { path: '/lessons/:courseID/:chapterID', name: 'Lessons', element: Lessons },
  { path: '/PracticeTests/:courseID', name: 'PracticeTests', element: PracticeTests },
  { path: '/PracticeTestView/:courseID/:idx', name: 'PracticeTestView', element: FinalExamAnswers },
  {
    path: '/lessonQuestion/:courseID/:lessonID/:level',
    name: 'lessonQuestion',
    element: QuizAnswerContainer,
  },
  { path: '/packages', name: 'Packages', element: Packages },
  { path: '/addCourse', name: 'addCourse', element: AddCourse },
  { path: '/addChapter/:courseID', name: 'addChapter', element: AddChapter },
  { path: '/addLesson/:courseID/:chapterID', name: 'addLesson', element: AddLesson },
  { path: '/editCourse/:courseID', name: 'addCourse', element: EditCourse },
  { path: '/addPackage', name: 'addCourse', element: AddPackage },
  { path: '/editPackage/:pkgID', name: 'addCourse', element: EditPackage },
  { path: '/editQuestion/:lessonID/:QuestionIdx/:level', name: 'addCourse', element: EditQuestion },
  {
    path: '/editQuestionPracticeTest/:courseID/:idx/:QuestionIdx',
    name: 'addCourse',
    element: EditQuestion,
  },
  {
    path: '/lessonQuestion/addQuestion/:courseID/:lessonID/:level',
    name: 'addCourse',
    element: AddQuestion,
  },
  { path: '/addNewTest/:courseID', name: 'addNewPracticeTest', element: AddQuestion },
  {
    path: '/practiceTestView/addQuestion/:courseID/:idx',
    name: 'addQuestionToPracticeTest',
    element: AddQuestion,
  },
  { path: '/users', name: 'Users', element: Users },
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
    name: 'Pages',
    element: Pages,
  },
  {
    path: '/AboutPage',
    name: 'AboutPage',
    element: AboutPageForm,
  },
  {
    path: '/TermsPage',
    name: 'TermsPage',
    element: TermsPageForm,
  },
  {
    path: '/ContactPage',
    name: 'TermsPage',
    element: ContactPageForm,
  },

  {
    path: '/promoCode',
    name: 'promoCode',
    element: PromoCode,
  },

  {
    path: '/addPromoCode',
    name: 'addPromoCode',
    element: AddPromoCode,
  },
]

export default routes

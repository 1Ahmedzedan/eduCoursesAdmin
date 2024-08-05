import { useNavigate } from "react-router-dom";
import styles from "./FinalExamsTable.module.css";
import { useResetFinalExam } from "../../hooks/quiz/useResetFinalExam";
import { useGetUser } from "../../hooks/Auth/useGetUser";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

function TableRow({ finalExam }) {
  const navigate = useNavigate();
  const { resetFinalExam, isReseting } = useResetFinalExam();
  const { user } = useGetUser();
  const grade = +finalExam.courseGrade;
  const finalGrade =
    +finalExam.courseQuestions.right +
    +finalExam.courseQuestions.wrong +
    +finalExam.courseQuestions.notSolved;
  const passGrade = Math.ceil(finalGrade / 2);

  function handleResetingExam() {
    resetFinalExam(
      { userId: user.id, courseId: finalExam.courseId },
      {
        onSuccess: () => {
          toast.success(`Resting ${finalExam.courseName} Successfully!`);
        },
      }
    );
  }
  return (
    <tr>
      <td>{finalExam.courseName}</td>
      <td>5-7-2024</td>
      <td>
        <div className={`${styles.grade_container}`}>
          <span
            className={
              passGrade <= grade
                ? grade === finalGrade
                  ? styles.prefect_grade
                  : styles.high_grade
                : styles.low_grade
            }
          >
            {grade}
          </span>{" "}
          / {finalGrade}
        </div>
      </td>
      <td>
        <div className={`${styles.control_btns}`}>
          <button onClick={handleResetingExam} disabled={isReseting}>
            {isReseting ? <BeatLoader color="white" size={8} /> : "Reset"}
          </button>
          <button onClick={() => navigate(`/examAnswer/${finalExam.courseId}`)}>
            Show Answers
          </button>
        </div>
      </td>
    </tr>
  );
}
export default TableRow;

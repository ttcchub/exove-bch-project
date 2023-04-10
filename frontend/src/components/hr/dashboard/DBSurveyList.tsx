import React, { useEffect, useState } from "react";
import classes from "./HRDashboard.module.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import { SurveyType } from "../../../redux/types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { RootState } from "../../../redux/store";
import { initialiseSurveys } from "../../../redux/reducers/survey/surveysSlice";

const DBSurveyList = () => {
  const dispatch = useAppDispatch();
  const [surveyList, setsurveyList] = useState<SurveyType[]>([]);
  const surveys: SurveyType[] = useAppSelector(
    (state: RootState) => state.surveys
  );
  const entries = Object.values(surveys);

  console.log(entries);

  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get<SurveyType[]>("http://localhost:5010/api/v1/surveys")
      .then((response) => {
        setsurveyList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setsurveyList]);

  console.log(surveyList);

  return (
    <div className={classes.surveys_container}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Survey ID</th>
            <th>Survey Name</th>
            <th>Description</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {surveyList.map((survey: SurveyType) => (
            <tr key={survey._id}>
              <td>{survey._id}</td>
              <td>{survey.surveyName}</td>
              <td>{survey.description}</td>
              <td>
                <ul>
                  {survey.questions.map((question) => (
                    <li key={question._id}>{question.question}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DBSurveyList;

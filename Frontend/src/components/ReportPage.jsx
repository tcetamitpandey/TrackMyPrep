import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../style_folder/ReportPage.css';
import { useSelector } from 'react-redux';
import user_test_report from "../store/user_test_report"

import {useAuth} from "../context/Auth_context"



export default function ReportPage({ reportProp }) {

    const {user} = useAuth()

 const defaultReport = useSelector((state)=> state.userReport)
  const location = useLocation();
  const report = location.state?.reportData || reportProp || defaultReport;

  const percent = Math.round(report.score);

  return (
    <div className="paper-report">
      {/* Header */}
      <header className="report-header">
        <h1>Report Card</h1>
        <p>TrackMyPrep College of Computer Science & Engineering</p>
      </header>

      {/* Student Info */}
      <section className="student-info">
        <p><b>User: </b> { user && user.email ? user.email : "" } </p>
        
      </section>

      {/* Infographic Score */}
      <section className="score-graphic">
        <div className="circle-progress">
          <div className="circle-inner">
            <span>{percent}%</span>
          </div>
          <svg>
            <circle cx="60" cy="60" r="54"></circle>
            <circle
              cx="60"
              cy="60"
              r="54"
              style={{ strokeDashoffset: `calc(339 - (339 * ${percent}) / 100)` }}
            ></circle>
          </svg>
        </div>

        <div className="bar-progress">
          <div className="bar-label">Correct</div>
          <div className="bar">
            <div
              className="bar-fill correct"
              style={{ width: `${(report.correct / report.total_questions) * 100}%` }}
            ></div>
          </div>
          <div className="bar-label">Incorrect</div>
          <div className="bar">
            <div
              className="bar-fill incorrect"
              style={{ width: `${(report.incorrect / report.total_questions) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Breakdown Table */}
      <section className="breakdown">
        <h2>Question-wise Breakdown</h2>
        <div className="breakdown-list">
            {(report.breakdown || []).map((b, i) => (
            <div key={i} className={`breakdown-card ${b.result.toLowerCase()}`}>
                <header className="breakdown-header">
                <span className="q-number">Q{i + 1}</span>
                <span className={`badge ${b.result.toLowerCase()}`}>{b.result}</span>
                </header>

                <div className="breakdown-body">
                <p className="question"><b>Question:</b> {b.question}</p>
                <p className="answer"><b>Your Answer:</b> {b.user_answer}</p>
                <p className="correct"><b>Correct Answer:</b> {b.correct_answer}</p>
                <p className="marks"><b>Marks Obtain:</b> {b.marks}</p>
                </div>
            </div>
            ))}
        </div>
        </section>



      {/* Teacher Remarks */}
        <section className="remarks">
            <h2>Teacher Remarks</h2>
            <div>
                <p><b>Strengths:</b></p>
                <ul>{(report.strengths || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div>
                <p><b>Weaknesses:</b></p>
                <ul>{(report.weaknesses || []).map((w, i) => <li key={i}>{w}</li>)}</ul>
            </div>
            <div>
                <p><b>Recommendations:</b></p>
                <ul>{(report.recommendations || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
        </section>


      {/* Footer */}
      <footer className="report-footer">
        <p>Digitally Evaluated by AI • {new Date().toLocaleDateString()}</p>
        <p><i>“This is a computer generated report and does not require a signature.”</i></p>
        <p><i>“Made with &#x2764;&#xfe0f; By Amit Pandey.”</i></p>
      </footer>

      {/* Actions */}
      <div className="actions">
        <Link to="/dashboard" className="btn outline">⬅ Back</Link>
        <Link to="/mock/interview/landing" className="btn primary">🔄 Retake Test</Link>
      </div>
    </div>
  );
}

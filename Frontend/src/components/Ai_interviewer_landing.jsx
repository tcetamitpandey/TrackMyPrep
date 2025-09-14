import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style_folder/AiInterviewer.css"; // we'll add styles here

import {set_Selected_subject} from "../store/select_topic_for_exam"
import { useDispatch } from "react-redux";



const skills = [
    "Angular",
    "AWS",
    "Azure",
    "BigQuery",
    "Blockchain & Web3",
    "C++",
    "Cloud Security",
    "Cybersecurity",
    "Data Analytics & BI (Tableau, Power BI, Looker)",
    "Data Engineering (Hadoop, Spark, Kafka, SQL/NoSQL)",
    "Data Structures & Algorithms",
    "DevOps",
    "Django",
    "Docker",
    "Figma",
    "Flutter",
    "Go",
    "Google Cloud",
    "GraphQL",
    "Java",
    "JavaScript",
    "Jenkins",
    "Kubernetes",
    "Machine Learning (TensorFlow, PyTorch, Scikit-learn)",
    "MongoDB",
    "Node.js",
    "PostgreSQL",
    "Python",
    "React",
    "React Native",
    "Rust",
    "Snowflake",
    "Solidity",
    "Spring Boot",
    "SQL",
    "System Design",
    "Terraform",
    "TypeScript",
    "Vue.js"
  ]

export default function Ai_interviewer() {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const navigate =useNavigate()

  function handleToggle(skill) {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  const dispatch = useDispatch()

  function handleFormSubmit(e) {
    e.preventDefault();

    dispatch(set_Selected_subject(selectedSkills))
    navigate("/mock/interview/test")

    console.log("Selected skills:", selectedSkills);
  }

  return (
    <div className="ai_interview_container">
      <div className="ai_interview_container_content">
        <p>
          <strong> Ai Powered</strong> Mock Interview
        </p>
        <p>Ready to Test your Skills ?..</p>
        <p>15 Questions · 30 minutes · Ready to take the challenge?</p>
      </div>

      <div className="ai_interview_container_bottom">
        <div className="select_skills_for_test">
          <h2>Select Most Relevant Skills (Max 5)</h2>

          <form onSubmit={handleFormSubmit} className="skills_form">
            <div className="skills_grid">
              {skills.map((skill, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`skill_button ${
                    selectedSkills.includes(skill) ? "selected" : ""
                  }`}
                  onClick={() => handleToggle(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="next_btn_container">
                {/* <Link to={"/subscription"}> */}
                {/* <Link to={"/mock/interview/test"}> */}
                    <button type="submit" className="next_btn" disabled={selectedSkills.length===0}>
                    Next
                    </button>
                {/* </Link> */}
                
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

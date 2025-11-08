import React, { useState } from "react";

export default function MarksEntry() {
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [marksData, setMarksData] = useState([]);

  const students = [
    { regd: "22CSE001", name: "Aditya Kumar" },
    { regd: "22CSE002", name: "Priya Singh" },
    { regd: "22CSE003", name: "Rahul Verma" },
    { regd: "22ECE001", name: "Keerthi Rao" },
    { regd: "22ECE002", name: "Varun B" },
  ];

  const loadMarks = () => {
    const initial = students.map((s) => ({
      ...s,
      marks: "",
      status: "Present",
    }));

    setMarksData(initial);
  };

  const updateMarks = (index, value) => {
    const updated = [...marksData];
    updated[index].marks = value;
    setMarksData(updated);
  };

  const toggleStatus = (index) => {
    const updated = [...marksData];
    updated[index].status =
      updated[index].status === "Present" ? "Absent" : "Present";
    updated[index].marks = updated[index].status === "Absent" ? "0" : "";
    setMarksData(updated);
  };

  const submitMarks = () => {
    console.log("MARKS SUBMITTED:", {
      subject,
      examType,
      marks: marksData,
    });
    alert("✅ Marks Submitted Successfully!");
  };

  return (
    <div>
      <h1 className="section-title">Marks Entry</h1>

      <div className="glass-card space-y-4 mb-6 p-5">
        <div>
          <label className="text-sm">Select Subject</label>
          <select className="input mt-1" onChange={(e) => setSubject(e.target.value)}>
            <option value="">Choose</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">Operating Systems</option>
            <option value="CN">Computer Networks</option>
            <option value="Maths">Maths</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Exam Type</label>
          <select className="input mt-1" onChange={(e) => setExamType(e.target.value)}>
            <option value="">Choose</option>
            <option value="Mid-1">Mid 1</option>
            <option value="Mid-2">Mid 2</option>
            <option value="Assignment">Assignment</option>
            <option value="Final">Final Exam</option>
          </select>
        </div>

        <button className="btn-primary w-full" onClick={loadMarks} disabled={!subject || !examType}>
          Load Students
        </button>
      </div>

      {marksData.length > 0 && (
        <div className="card-soft overflow-x-auto">
          <table className="table-modern w-full">
            <thead>
              <tr>
                <th>Regd No</th>
                <th>Name</th>
                <th>Status</th>
                <th>Marks</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((stu, index) => (
                <tr key={index}>
                  <td>{stu.regd}</td>
                  <td>{stu.name}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-white ${stu.status === "Present" ? "bg-green-500" : "bg-red-500"}`}>
                      {stu.status}
                    </span>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input py-1"
                      value={stu.marks}
                      onChange={(e) => updateMarks(index, e.target.value)}
                      disabled={stu.status === "Absent"}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(index)}
                      className={`px-3 py-1 rounded-lg text-white ${
                        stu.status === "Present" ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {stu.status === "Present" ? "Mark Absent" : "Mark Present"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn-primary w-full mt-4 py-3" onClick={submitMarks}>
            Submit Marks
          </button>
        </div>
      )}
    </div>
  );
}

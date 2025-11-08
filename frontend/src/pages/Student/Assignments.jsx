import React, { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function Assignments() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedMsg, setUploadedMsg] = useState("");

  // ✅ Dummy Assignment List
  const assignments = [
    {
      title: "DBMS Assignment 1",
      subject: "DBMS",
      deadline: "2025-02-10",
      description: "Write a report on Normalization with examples."
    },
    {
      title: "Operating Systems - Unit 2 Notes",
      subject: "OS",
      deadline: "2025-02-12",
      description: "Prepare handwritten notes for Process Scheduling."
    },
    {
      title: "Computer Networks Assignment 3",
      subject: "CN",
      deadline: "2025-02-15",
      description: "Explain TCP vs UDP with real-world use cases."
    }
  ];

  // ✅ File upload handler
  const handleUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile({ index, file });
    setUploadedMsg(`✅ ${file.name} uploaded successfully`);
  };

  return (
    <div>
      <h1 className="section-title">Assignments</h1>

      <div className="space-y-6">
        {assignments.map((a, idx) => (
          <div key={idx} className="card-soft p-5 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-[#4C1D95]">{a.title}</h2>
                <p className="text-sm text-slate-600">{a.subject}</p>
              </div>
              <FileText size={28} className="text-[#7C3AED] neon-icon" />
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-slate-600">{a.description}</p>

            {/* Deadline */}
            <p className="mt-2 text-sm font-medium text-red-600">
              Deadline: {a.deadline}
            </p>

            {/* Upload section */}
            <div className="mt-4">
              <label
                htmlFor={`file-upload-${idx}`}
                className="btn-primary flex items-center gap-2 cursor-pointer w-fit"
              >
                <Upload size={18} /> Upload File
              </label>

              <input
                id={`file-upload-${idx}`}
                type="file"
                className="hidden"
                onChange={(e) => handleUpload(e, idx)}
              />

              {/* Show filename */}
              {selectedFile?.index === idx && (
                <p className="text-sm mt-2 text-green-600 flex items-center gap-2">
                  <CheckCircle size={16} />
                  {uploadedMsg}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

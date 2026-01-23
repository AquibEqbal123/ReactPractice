import { useState } from "react";
import { useOutletContext } from "react-router-dom"; // ✅ ADD


import {
  User,
  Mail,
  Phone,
  Calendar,
  Pencil,
  Save,
  X,
  Upload,
  FileText,
  Briefcase,
  Building2,
  IdCard,
} from "lucide-react";

// export default function Profile() {
//   const [edit, setEdit] = useState(false);

//   const [data, setData] = useState({
//     name: "Rahul Sharma",
//     father: "Suresh Sharma",
//     dob: "15 August 1994",
//     gender: "Male",
//     marital: "Married",
//     phone: "+91 9876543210",
//     email: "rahul.sharma@example.com",

//     employeeId: "EMP12345",
//     position: "Software Engineer",
//     joiningDate: "12 Mar 2020",
//     company: "ABC Technologies Pvt Ltd",
//   });

//   const documents = [
//     { title: "ID Proof", file: "Aadhar_Card.pdf", size: "1.2 MB" },
//     { title: "Address Proof", file: "N/A" },
//     { title: "Resume", file: "N/A" },
//     { title: "Offer Letter", file: "N/A" },
//   ];

export default function Profile() {
  const { employee } = useOutletContext();   // ✅ ADD (FIRST LINE)

  const [edit, setEdit] = useState(false);

  // ✅ INITIALIZE DATA FROM LOGGED-IN EMPLOYEE
  const [data, setData] = useState(employee);

  // 🔒 SAFETY CHECK
  if (!employee) {
    return <p className="p-6">Please login again</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 w-full overflow-x-hidden">


      <div className="flex">
        {/* <Sidebar /> */}

        <main className="flex-1 p-6 min-w-0">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <User size={22} /> My Profile
            </h1>

            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                <Pencil size={16} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEdit(false)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  <Save size={16} /> Save
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md text-sm"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* PROFILE CARD */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="grid grid-cols-12 gap-8">
              {/* LEFT */}
              <div className="col-span-12 md:col-span-3">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <img
                    src="https://i.pravatar.cc/200?img=12"
                    className="w-28 h-28 rounded-full mx-auto mb-3"
                  />

                  <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-full">
                    <Upload size={16} /> Update Photo
                  </button>

                  <div className="mt-4 text-sm space-y-2 text-left">
                    <p className="flex items-center gap-2">
                      <Mail size={14} /> {employee.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} /> {employee.phone}
                    </p>

                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="col-span-12 md:col-span-9">
                {/* PERSONAL DETAILS */}
                <Section title="Personal Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Full Name" value={data.name} edit={edit}
                      onChange={(v) => setData({ ...data, name: v })} />
                    <Field label="Father's Name" value={data.father} edit={edit}
                      onChange={(v) => setData({ ...data, father: v })} />
                    <Field label="Date of Birth" value={data.dob} edit={edit}
                      onChange={(v) => setData({ ...data, dob: v })} />
                    <Field label="Gender" value={data.gender} edit={edit}
                      onChange={(v) => setData({ ...data, gender: v })} />
                    <Field label="Marital Status" value={data.marital} edit={edit}
                      onChange={(v) => setData({ ...data, marital: v })} />
                    <Field label="Contact Number" value={data.phone} edit={edit}
                      onChange={(v) => setData({ ...data, phone: v })} />
                  </div>
                </Section>

                {/* COMPANY DETAILS */}
                <Section title="Employment Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Static label="Employee ID" value={employee._id} icon={<IdCard size={14} />} />
                    <Static label="Designation" value={employee.designation} icon={<Briefcase size={14} />} />
                    <Static label="Joining Date" value={employee.joiningDate} icon={<Calendar size={14} />} />
                    <Static label="Department" value={employee.department?.name} icon={<Building2 size={14} />} />
                  </div>
                </Section>
              </div>
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <FileText size={18} /> Employee Documents
              </h2>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                <Upload size={16} /> Add Document
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {documents.map((doc, i) => (
                <div key={i} className="border rounded-lg p-4 text-sm">
                  <p className="font-medium mb-1">{doc.title}</p>
                  <p className="text-gray-500">{doc.file}</p>
                  {doc.size && (
                    <p className="text-xs text-gray-400 mt-1">{doc.size}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-blue-600 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, edit, onChange }) {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      {!edit ? (
        <p className="font-medium">{value}</p>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}

function Static({ label, value, icon }) {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
        {icon} {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

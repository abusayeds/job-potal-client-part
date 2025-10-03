import React from 'react';
import { 
  FaFileAlt,
  FaClipboardList,
  FaEdit,
  FaUsers,
  FaTools,
  FaRocket,
  FaHandsHelping,
  FaCheckCircle,
  FaStarOfLife,
  FaLightbulb,
  FaDownload,
  FaSearch
} from 'react-icons/fa';

const ResumeWritingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Master Your Resume Writing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive guide to creating a standout resume for your next career opportunity. Step-by-step instructions and expert tips.
          </p>
        </div>

        {/* Section 1: Overview */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full">
              <FaFileAlt className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Purpose of a Resume</h2>
          </div>
          <p className="text-lg text-gray-700">
            A resume serves as your official application for a position in an organization —effectively communicating your education, skills, and experience. It must adhere to rigorous standards and cannot be assumed to be complete by reviewers.
          </p>
        </SectionCard>

        {/* Section 2: Pre-Writing Considerations */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full">
              <FaClipboardList className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Pre-Writing Considerations</h2>
          </div>
          <p className="text-lg text-gray-700">
            Before drafting your resume, thoroughly review the job announcement, especially sections detailing:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
            <li><strong>Duties:</strong> What the job entails and what you will be expected to do.</li>
            <li><strong>Qualifications & Specialized Experience:</strong> Requirements for the role.</li>
            <li><strong>“How to Apply”:</strong> Including any assessment preview and the application process.</li>
            <li><strong>“How You Will Be Evaluated”:</strong> Key factors in the evaluation process.</li>
          </ul>
        </SectionCard>

        {/* Section 3: Essential Resume Content */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-teal-600 to-teal-400 rounded-full">
              <FaEdit className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Essential Resume Content</h2>
          </div>
          <p className="text-lg text-gray-700">
            To ensure your resume is considered, it must address all requirements and qualifications listed in the job announcement.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
            <li> Address all requirements and qualifications listed in the announcement.</li>
            <li> Be comprehensive, often exceeding one to two pages.</li>
            <li> Include start and end dates, hours worked per week for every position.</li>
            <li> Be customized for each job announcement.</li>
          </ul>
        </SectionCard>

        {/* Section 4: Structuring Your Resume */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-full">
              <FaUsers className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Structuring Your Resume</h2>
          </div>
          <p className="text-lg text-gray-700">
            Structure your resume to make it easy for hiring managers to find key information quickly.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
            <li><strong>Contact Information:</strong> Full name, address, email, phone number.</li>
            <li><strong>Work Experience:</strong> For each position, include job title, start/end dates, and scope of responsibility.</li>
            <li><strong>Education:</strong> Degrees, certifications, and relevant training.</li>
          </ul>
        </SectionCard>

        {/* Section 5: Formatting & Organization */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full">
              <FaTools className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Formatting & Organization</h2>
          </div>
          <p className="text-lg text-gray-700">
            Follow formatting best practices to make your resume clean and easy to read.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
            <li> Use reverse chronological order for work experience.</li>
            <li> Choose between bullet points or paragraphs, but be consistent.</li>
            <li> Avoid jargon, acronyms, or overly technical terms.</li>
          </ul>
        </SectionCard>

        {/* Section 6: Tailoring & Revision */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-red-600 to-red-400 rounded-full">
              <FaRocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Tailoring & Revision</h2>
          </div>
          <p className="text-lg text-gray-700">
            Tailor your resume to align each element with the specific job requirements to make a strong impression.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
            <li> Mirror job terminology used in the job announcement.</li>
            <li> Align each element (skills, education) to job requirements.</li>
            <li> Omit irrelevant content that doesn’t contribute to the application.</li>
          </ul>
        </SectionCard>

        {/* Section 7: Tools & Resources */}
        <SectionCard>
          <div className="flex items-center mb-8">
            <div className="p-5 bg-gradient-to-br from-green-600 to-green-400 rounded-full">
              <FaHandsHelping className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 ml-6">Tools & Resources</h2>
          </div>
          <p className="text-lg text-gray-700">
            You may upload an existing resume or use the REMOTISJOBS Resume Builder, which supports multiple versions for different applications.
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md flex items-center">
              <FaDownload className="inline mr-2" />
              Download Resume Template
            </button>
          </div>
        </SectionCard>

      </div>
    </div>
  );
};

// SectionCard component to wrap sections
const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12 hover:shadow-xl transition-shadow duration-300">
    {children}
  </div>
);

export default ResumeWritingPage;

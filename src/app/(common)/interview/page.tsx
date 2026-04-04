"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaRegClock,
  FaUser,
  FaCommentAlt,
  FaFileAlt,
  FaHandshake,
  FaUsers,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaRegEye,
  FaRegComment,
  FaRegMoneyBillAlt,
  FaCalendarAlt,
  FaRegCheckCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaVideo,
  FaDesktop,
  FaChevronDown,
  FaChevronUp,
  FaBullseye,
  FaLightbulb,
  FaBookOpen,
  FaAward,
} from "react-icons/fa"; // FontAwesome

const JobInterviewGuide = () => {
  const [activeTab, setActiveTab] = useState("in-person");
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const inPersonTips = [
    {
      icon: FaRegClock,
      title: "Punctuality Is Essential",
      description:
        "Arrive 10-15 minutes early to show respect for the interviewer's time and compose yourself.",
      color: "text-blue-600",
    },
    {
      icon: FaUser,
      title: "Master the Interviewer's Name",
      description:
        "Know the correct name, spelling, and pronunciation. Also note reception staff names as they may influence hiring.",
      color: "text-purple-600",
    },
    {
      icon: FaCommentAlt,
      title: "Prepare Thoughtful Questions",
      description:
        "Bring a succinct list of questions that show you've researched the role and organization.",
      color: "text-green-600",
    },
    {
      icon: FaFileAlt,
      title: "Bring Necessary Documents",
      description:
        "Carry multiple copies of your résumé, transcripts, a reliable pen, and notepad for post-interview notes.",
      color: "text-orange-600",
    },
    {
      icon: FaHandshake,
      title: "Present Yourself Warmly",
      description:
        "Greet with a confident handshake, smile, and maintain appropriate eye contact.",
      color: "text-pink-600",
    },
    {
      icon: FaUsers,
      title: "Establish Rapport",
      description:
        "Don't rush into the interview. Build rapport naturally, following the interviewer's lead.",
      color: "text-indigo-600",
    },
    {
      icon: FaHeart,
      title: "Channel Controlled Nervousness",
      description:
        "Nervousness is natural. With experience, you'll become more comfortable with the process.",
      color: "text-red-600",
    },
    {
      icon: FaStar,
      title: "Emphasize Strengths",
      description:
        "Convey transferable skills and eagerness to learn. Highlight what you can contribute.",
      color: "text-yellow-600",
    },
    {
      icon: FaShieldAlt,
      title: "Be Honest",
      description:
        "Avoid embellishment. Integrity is crucial as inconsistencies may undermine credibility.",
      color: "text-teal-600",
    },
    {
      icon: FaRegEye,
      title: "Listen Actively",
      description:
        "Understand each question clearly. Ask for clarification if needed and respond concisely.",
      color: "text-cyan-600",
    },
    {
      icon: FaAward,
      title: "Honor Former Affiliations",
      description:
        "Speak respectfully of former employers and colleagues. Loyalty is often prized by employers.",
      color: "text-violet-600",
    },
    {
      icon: FaRegComment,
      title: "Use Proper Language",
      description:
        "Communicate accurately. Favor grammatical precision over rushed fluency.",
      color: "text-lime-600",
    },
  ];

  const generalTips = [
    {
      icon: FaRegEye,
      title: "Prepare for Sensitive Inquiries",
      description:
        "Some interviewers might ask legally questionable questions. Respond calmly with composure.",
      color: "text-amber-600",
    },
    {
      icon: FaRegMoneyBillAlt,
      title: "Defer Compensation Discussions",
      description:
        "Don't raise salary until the interviewer does. Research salary surveys for preparation.",
      color: "text-emerald-600",
    },
    {
      icon: FaCalendarAlt,
      title: "Manage Expectations",
      description:
        "Don't expect immediate offers. Multiple interview rounds over several weeks are common.",
      color: "text-rose-600",
    },
    {
      icon: FaRegCheckCircle,
      title: "Conclude Strongly",
      description:
        "Ask about next steps, express gratitude, and reaffirm interest before departing.",
      color: "text-blue-600",
    },
    {
      icon: FaEnvelope,
      title: "Send Follow-Up Thank-You",
      description:
        "Send a short thank-you note expressing appreciation and genuine interest in the position.",
      color: "text-purple-600",
    },
  ];

  const phoneInterviewTips = [
    {
      icon: FaPhoneAlt,
      title: "Maintain Professional Enthusiasm",
      description:
        "Stand while speaking to enhance vocal projection and convey energy.",
      color: "text-blue-600",
    },
    {
      icon: FaRegClock,
      title: "Exercise Patience",
      description:
        "If employer doesn't call on time, wait 10 minutes before reaching out to clarify confusion.",
      color: "text-green-600",
    },
    {
      icon: FaBullseye,
      title: "Speak with Purpose",
      description:
        "Since nonverbal cues are absent, end responses with questions like 'Would you like additional details?'",
      color: "text-orange-600",
    },
    {
      icon: FaRegEye,
      title: "Respect Interviewer's Lead",
      description:
        "Allow the employer to conclude the call, then express gratitude and restate interest.",
      color: "text-purple-600",
    },
  ];

  const videoInterviewTips = [
    {
      icon: FaVideo,
      title: "Dress Professionally",
      description:
        "Select attire appropriate for in-person interviews. Full professional dress helps you embody the role.",
      color: "text-indigo-600",
    },
    {
      icon: FaDesktop,
      title: "Prepare Technical Setup",
      description:
        "Test equipment in advance. Ensure good lighting and position camera at eye level.",
      color: "text-teal-600",
    },
    {
      icon: FaUser,
      title: "Adopt Proper Posture",
      description:
        "Sit upright and avoid slouching or leaning to convey attentiveness.",
      color: "text-pink-600",
    },
    {
      icon: FaFileAlt,
      title: "Discreet Use of Notes",
      description:
        "Prepare cue cards with key points, but ensure they remain invisible on camera.",
      color: "text-cyan-600",
    },
  ];

  const TipCard = ({ tip, index }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 p-3 rounded-lg bg-gray-50 ${tip.color}`}>
          <tip.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {tip.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{tip.description}</p>
        </div>
      </div>
    </div>
  );

  const ExpandableSection = ({ id, title, children, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex space-x-3">
          <Icon className="w-5 h-5 text-blue-600 mt-[5px]" />
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        {expandedSections[id] ? (
          <FaChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <FaChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[id] && <div className="px-6 pb-6">{children}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaLightbulb className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Master Your Job Interview
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guidelines to help you succeed in any interview
              format. From preparation to follow-up, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Interview Format Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("in-person")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                activeTab === "in-person"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <FaUsers className="w-5 h-5" />
              <span>In-Person Interview</span>
            </button>
            <button
              onClick={() => setActiveTab("phone")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                activeTab === "phone"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <FaPhoneAlt className="w-5 h-5" />
              <span>Phone Interview</span>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                activeTab === "video"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <FaVideo className="w-5 h-5" />
              <span>Video Interview</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid gap-6">
            {activeTab === "in-person" && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    In-Person Interview Excellence
                  </h2>
                  <p className="text-gray-600">
                    Master the fundamentals of face-to-face interviews
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inPersonTips.map((tip, index) => (
                    <TipCard key={index} tip={tip} index={index} />
                  ))}
                </div>
              </>
            )}

            {activeTab === "phone" && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Phone Interview Protocol
                  </h2>
                  <p className="text-gray-600">
                    Excel in voice-only interview situations
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {phoneInterviewTips.map((tip, index) => (
                    <TipCard key={index} tip={tip} index={index} />
                  ))}
                </div>
              </>
            )}

            {activeTab === "video" && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Video Interview Mastery
                  </h2>
                  <p className="text-gray-600">
                    Navigate virtual interviews with confidence
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {videoInterviewTips.map((tip, index) => (
                    <TipCard key={index} tip={tip} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Universal Tips Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Universal Interview Principles
            </h2>
            <p className="text-gray-600">
              Essential tips that apply to all interview formats
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalTips.map((tip, index) => (
              <TipCard key={index} tip={tip} index={index} />
            ))}
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          <ExpandableSection
            id="preparation"
            title="Pre-Interview Preparation Checklist"
            icon={FaBookOpen}
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Research Phase
                  </h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Company history and values</li>
                    <li>• Recent news and developments</li>
                    <li>• Job role requirements</li>
                    <li>• Industry trends</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Documentation
                  </h4>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Multiple resume copies</li>
                    <li>• Portfolio samples</li>
                    <li>• Reference list</li>
                    <li>• Question notes</li>
                  </ul>
                </div>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="questions"
            title="Smart Questions to Ask Interviewers"
            icon={FaCommentAlt}
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Role-Specific
                  </h4>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• Day-to-day responsibilities</li>
                    <li>• Success metrics</li>
                    <li>• Growth opportunities</li>
                    <li>• Team dynamics</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    Company Culture
                  </h4>
                  <ul className="text-orange-800 space-y-1 text-sm">
                    <li>• Work environment</li>
                    <li>• Professional development</li>
                    <li>• Company challenges</li>
                    <li>• Future plans</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-900 mb-2">
                    Next Steps
                  </h4>
                  <ul className="text-teal-800 space-y-1 text-sm">
                    <li>• Timeline for decision</li>
                    <li>• Interview process</li>
                    <li>• Additional requirements</li>
                    <li>• Contact preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            id="followup"
            title="Post-Interview Follow-Up Strategy"
            icon={FaEnvelope}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Thank-You Note Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaRegCheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Send within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRegCheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        Personalize for each interviewer
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRegCheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        Reiterate key qualifications
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Follow-Up Best Practices
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaRegCheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        Keep it concise and professional
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRegCheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        Address any concerns raised
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRegCheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        Express genuine enthusiasm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ExpandableSection>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Ace Your Next Interview?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Apply these proven strategies and boost your confidence in any
              interview setting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={"/find-job"}>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Browse Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInterviewGuide;

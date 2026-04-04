"use client";
import Container from "@/components/Container";
import { cn } from "@/utils/cn";
import { Button } from "antd";
import React, { useState } from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiMapPin,
  BiPhone,
  BiSearch,
  BiShield,
} from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      category: "Job Seekers",
      icon: <FaUsers className="w-5 h-5" />,
      questions: [
        {
          question: "How do I create an account on RemotisJobs?",
          answer:
            'Creating an account is simple! Click on the "Sign Up" button in the top right corner, fill in your basic information including name, email, and password. You\'ll receive a verification email to activate your account. Once verified, you can complete your profile and start applying for jobs.',
        },
        {
          question: "How do I upload my CV/Resume?",
          answer:
            'After logging into your account, go to your profile section and click on "Upload CV/Resume". You can upload files in PDF, DOC, or DOCX format up to 5MB in size. We recommend keeping your resume updated and tailored to the types of positions you\'re seeking.',
        },
        {
          question: "How do I search for suitable jobs?",
          answer:
            "Use our advanced search feature on the homepage. You can filter jobs by location, salary range, job type (full-time, part-time, contract), experience level, and industry. You can also set up job alerts to receive notifications when new positions matching your criteria are posted.",
        },
        {
          question: "Can I apply for multiple jobs at once?",
          answer:
            "Yes, you can apply for as many jobs as you like. Each application is tracked in your dashboard where you can monitor the status of all your applications. We recommend customizing your cover letter for each position to increase your chances of success.",
        },
        {
          question: "How do I track my job applications?",
          answer:
            "Your dashboard provides a comprehensive view of all your applications. You can see which jobs you've applied for, application dates, current status (pending, reviewed, shortlisted, rejected), and any messages from employers.",
        },
      ],
    },
    {
      category: "Employers",
      icon: <FiFileText className="w-5 h-5" />,
      questions: [
        {
          question: "How do I post a job on RemotisJobs?",
          answer:
            'Register as an employer, complete your company profile, and click "Post a Job". Fill in the job details including title, description, requirements, salary range, and benefits. You can choose between free basic listings or premium featured listings for better visibility.',
        },
        {
          question: "What are the pricing plans for employers?",
          answer:
            "We offer flexible pricing plans: Basic Plan - 1 job posting for 30 days ($150/month), Standard Plan - 5 job postings with discounted rate ($600/month) – Enterprise Plan - unlimited postings with support.",
        },
        {
          question: "How do I manage job applications?",
          answer:
            "Your employer dashboard shows all candidates who applied for your positions. You can filter candidates, view their profiles and resumes, schedule interviews, send messages, and update application statuses. Our ATS integration helps streamline your hiring process.",
        },
        {
          question: "Can I search for candidates actively?",
          answer:
            "Yes, with our premium plans you get access to our candidate database. You can search for candidates based on skills, experience, location, and availability. You can then reach out to potential candidates directly through our messaging system.",
        },
        {
          question: "How do I promote my company brand?",
          answer:
            "Create a comprehensive company profile with your logo, description, culture, and benefits. Premium employers can feature their company page, post company updates, and showcase employee testimonials to attract top talent.",
        },
      ],
    },
    {
      category: "Account & Privacy",
      icon: <BiShield className="w-5 h-5" />,
      questions: [
        {
          question: "How is my personal information protected?",
          answer:
            "We take data security seriously. All personal information is encrypted and stored securely. We comply with GDPR and other privacy regulations. Your information is only shared with employers when you apply for their positions, and you can control your privacy settings in your account.",
        },
        {
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account at any time from your account settings. This will permanently remove all your data including profile, applications, and messages. Please note that this action cannot be undone, so make sure to download any important information first.",
        },
        {
          question: "How do I change my password?",
          answer:
            "Go to Dashboard Settings > Account > Change Password. Enter your current password and then your new password twice to confirm. We recommend using a strong password with at least 12 characters including letters, numbers, and special characters.",
        },
        {
          question: "Why am I not receiving email notifications?",
          answer:
            "Check your spam/junk folder first. Ensure that notifications are enabled in your account settings. Add our email addresses to your safe sender list. If the issue persists, contact our support team for assistance.",
        },
      ],
    },
    {
      category: "Technical Support",
      icon: <CgMail className="w-5 h-5" />,
      questions: [
        {
          question: "I'm having trouble uploading my resume. What should I do?",
          answer:
            "Ensure your file is in PDF, DOC, or DOCX format and under 5MB. Try using a different browser or clearing your browser cache. If the problem persists, try uploading from a desktop computer or contact our technical support team.",
        },
        {
          question: "The website is loading slowly. How can I fix this?",
          answer:
            "Try refreshing the page, clearing your browser cache and cookies, or using a different browser. Check your internet connection speed. If you continue experiencing issues, please report it to our technical team with details about your browser and device.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach our support team through multiple channels: Email us at support@remotisjobs.com, use the live chat feature (available 9 AM - 6 PM) EST, or submit a ticket through your account dashboard.",
        },
      ],
    },
  ];

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const toggleAccordion = (categoryIndex: number, questionIndex: number) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="">
      <Container
        className="text-center bg-gradient-to-br from-primary via-purple-600 to-blue-700 text-white"
        mClassName="px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Frequently <br className="md:hidden" /> Asked Questions
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
          Find answers to common questions about using RemotisJobs. Can&apos;t
          find what you&apos;re looking for? Contact our support team.
        </p>
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="absolute inset-y-0 right-6 lg:right-8 pl-3 flex items-center pointer-events-none z-10">
            <BiSearch className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search faqs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pr-10 pl-3 sm:pl-6 py-4 border border-transparent rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/30 transition-all"
          />
        </div>
      </Container>

      {/* FAQ Content */}
      <section className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
                  <div className="text-blue-600">{category.icon}</div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.category}
                </h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const isActive =
                    activeIndex === `${categoryIndex}-${questionIndex}`;
                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          toggleAccordion(categoryIndex, questionIndex)
                        }
                        className={cn(
                          "w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset hover:bg-gray-50 transition-colors rounded-t-xl",
                          {
                            "rounded-b-xl": !isActive,
                          }
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {isActive ? (
                              <BiChevronUp className="w-5 h-5 text-blue-600" />
                            ) : (
                              <BiChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isActive && (
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse the categories above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <Container mClassName="drop-shadow-lg">
        <div className="bg-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still need help?
            </h2>
            <p className="text-lg text-gray-600">
              Our support team is here to assist you with any questions or
              issues.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CgMail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-3">Get help via email</p>
              <a
                href="mailto:support@remotisjobs.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support@remotisjobs.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BiPhone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-3">Call us directly</p>
              <a
                href="tel:+1-800-REMOTIS"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                +1-800-REMOTIS
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BiMapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-3">Chat with us now</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Start Chat
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button href="/contact" type="primary" size="large">
              Contact Support Team
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;

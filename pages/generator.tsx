import { useState } from 'react';
import { generateCoverLetter } from 'services/generator';

export default function Generator() {
  const [inputs, setInputs] = useState({
    job: '',
    company: '',
    experience: ''
  });
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const { job, company, experience } = inputs;
    const prompt = `Write a cover letter for a job application, based on the following information job description: ${job}, applicant experience: ${experience}`;
    const response = await generateCoverLetter(prompt);
    setCoverLetter(response.data.choices);
  };
  return (
    <div className="flex items-center flex-col">
      <div>
        <label
          htmlFor="job"
          className="block text-sm font-medium text-white-700"
        >
          Job description:
        </label>
        <div className="mt-1">
          <textarea
            id="job"
            name="job"
            rows={3}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 text-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Position, responsabilities, seniority required, etc."
          ></textarea>
        </div>
        <p className="mt-2 mb-10 text-sm text-gray-500">
          Brief description of the job you are applying to
        </p>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-white-700"
        >
          Company description:
        </label>

        <label
          htmlFor="company"
          className="block text-sm font-medium text-white-700"
        >
          Tell us about you:
        </label>
        <div className="mt-1">
          <textarea
            id="experience"
            name="experience"
            rows={3}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 text-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Years of experience, previous companies, abilities, etc."
          ></textarea>
        </div>
        <p className="mt-2 mb-10 text-sm text-gray-500">
          Brief description of yourself and your experience
        </p>
        <button onClick={handleSubmit}> Generate cover letter </button>
      </div>
      <div>
        "Hello"
        {coverLetter ? (
          coverLetter.map((item: any) => {
            return (
              <textarea style={{ color: 'black' }} value={item.text}></textarea>
            );
          })
        ) : (
          <h1>"Your cover letter will appear here"</h1>
        )}
      </div>
    </div>
  );
}

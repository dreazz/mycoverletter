import { useState } from 'react';
import { generateCoverLetter } from 'services/generator';

export default function HomePage() {
  const [inputs, setInputs] = useState({
    job: '',
    company: '',
    experience: ''
  });
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const { job, company, experience } = inputs;
    setIsLoading(true);
    const prompt = `Write a cover letter for a job application, based on the following information job description: ${job}, applicant experience: ${experience}`;
    const response = await generateCoverLetter(prompt);
    setCoverLetter(response.data.choices);
    setIsLoading(false);
  };
  return (
    <div className="flex mt-20 items-center justify-around">
      <div className="w-4/12 bg-[#1e2434] p-3 rounded flex flex-col justify-center">
        <label
          htmlFor="job"
          className="block text-sm font-medium text-white-700"
        >
          Copy and paste the job decription:
        </label>
        <div className="mt-1">
          <textarea
            id="job"
            name="job"
            rows={3}
            onChange={handleChange}
            className="h-20 mt-1 block w-full rounded-md border-gray-300 text-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Position, responsabilities, seniority required, etc."
          ></textarea>
        </div>

        <label
          htmlFor="company"
          className="mt-10 block text-sm font-medium text-white-700"
        >
          Your cv in 5 lines:
        </label>
        <div className="mt-1">
          <textarea
            id="experience"
            name="experience"
            rows={3}
            onChange={handleChange}
            className="h-30 block w-full rounded-md border-gray-300 text-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Your name, years of experience, previous companies, abilities, etc."
          ></textarea>

          {isLoading ? (
            <>
              <button
                type="button"
                className="inline-flex items-center mt-10 px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#7b2ef3] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
                disabled
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white"
                  viewBox="0 0 24 24"
                  color="white"
                >
                  {' '}
                </svg>
                Processing...
              </button>
            </>
          ) : (
            <button
              className="mt-10 py-2 px-3 bg-[#7b2ef3] text-white text-sm font-semibold rounded-md shadow focus:outline-none "
              onClick={handleSubmit}
            >
              {coverLetter ? 'Generate again' : 'Generate cover letter'}
            </button>
          )}
        </div>
      </div>
      <div className="w-4/12 bg-[#1e2434] rounded p-2 flex flex-col justify-center ">
        {coverLetter ? (
          coverLetter.map((item: any) => {
            return (
              <>
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(item.text);
                  }}
                  className="w-24 mt-2 py-2 px-3 bg-[#e7dffc] text-black text-sm font-semibold rounded-md shadow focus:outline-none"
                >
                  Copy text
                </button>
                <div className="max-w-80 bg-[#1e2434] mt-5"></div>
                <div
                  className="w-30 bg-[#2b3343] text-white-700"
                  contentEditable
                >
                  {item.text}
                </div>
              </>
            );
          })
        ) : (
          <h1>"Your cover letter will appear here"</h1>
        )}
      </div>
    </div>
  );
}

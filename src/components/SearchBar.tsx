// import { useSearchContext } from "../context/SearchContext";
// import  { FormEvent, useEffect, useState } from "react";
// import { MapPin, Briefcase, Search, RotateCcw } from "lucide-react";

// const industryOptions = [
//   'Tech',
//   'Healthcare', 
//   'Finance',
//   'Education',
//   'Retail',
//   'Marketing',
//   'Hospitality',
//   'Construction',
//   'Entertainment'  
// ];

// const SearchBar = () => {
//   const search = useSearchContext();

//   const [jobTitle, setJobTitle] = useState(search.jobTitle);
//   const [jobLocation, setJobLocation] = useState(search.jobLocation);
//   const [companysIndustry, setCompanysIndustry] = useState(search.companysIndustry);
//   const [sortOption, setSortOption] = useState(search.sortOption);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (companysIndustry) {
//       setIsLoading(true);
//       search.saveSearchValues(jobTitle, jobLocation, companysIndustry, sortOption);

//       const timer = setTimeout(() => {
//         setIsLoading(false);
//         // Trigger any necessary updates or actions after search
//       }, 1500);

//       return () => clearTimeout(timer);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [companysIndustry]);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); 
//     search.saveSearchValues(jobTitle, jobLocation, companysIndustry, sortOption);

//     setTimeout(() => {
//       setIsLoading(false);
//       // Trigger any necessary updates or actions after search
//     }, 1500);
//   };

//   const handleReset = () => {
//     setJobTitle('');
//     setJobLocation('');
//     setCompanysIndustry('');
//     setSortOption('');
//   };

//   return (
//     <div className="flex justify-center items-center w-full px-4 py-6">
//       <div className="bg-gray-300 p-6 rounded-lg w-full max-w-6xl">
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Job Title */}
//           <div>
//             <label htmlFor="jobTitle" className="block text-sm font-medium text-white">
//               Job Title
//             </label>
//             <div className="relative mt-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Briefcase className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"  
//                 name="jobTitle"
//                 id="jobTitle"
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="e.g. Software Engineer"
//               />
//             </div>
//           </div>

//           {/* Job Location */}
//           <div>
//             <label htmlFor="jobLocation" className="block text-sm font-medium text-white">
//               Location
//             </label>
//             <div className="relative mt-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MapPin className="h-5 w-5 text-gray-400" />  
//               </div>
//               <input  
//                 type="text"
//                 name="jobLocation" 
//                 id="jobLocation"
//                 value={jobLocation}
//                 onChange={(e) => setJobLocation(e.target.value)} 
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="e.g. San Francisco, CA"
//               />
//             </div>
//           </div>

//           {/* Industry */}  
//           <div>
//             <label htmlFor="companysIndustry" className="block text-sm font-medium text-white">
//               Industry  
//             </label>
//             <select
//               id="companysIndustry" 
//               name="companysIndustry"
//               value={companysIndustry}
//               onChange={(e) => setCompanysIndustry(e.target.value)}
//               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//             >
//               <option value="">All Industries</option>
//               {industryOptions.map((industry) => (
//                 <option key={industry} value={industry}>
//                   {industry}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort */}
//             {/* Sort */}
//             <div>
//             <label htmlFor="sortOption" className="block text-sm font-medium text-white">
//               Sort by  
//             </label>
//             <select
//               id="sortOption"
//               name="sortOption" 
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//             >
//               <option value="">Relevance</option>
//               <option value="salary_Desc">Salary: High to Low</option>
//               <option value="salary_Asc">Salary: Low to High</option>
//             </select>l
//           </div>

//           {/* Search & Reset Buttons */}
//           <div className="md:col-span-4 mt-4 md:mt-0 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={handleReset}  
//               className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <RotateCcw className="mr-2 h-4 w-4" />
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" /> 
//                   Searching...
//                 </div>
//               ) : (
//                 <>
//                   <Search className="mr-2 h-4 w-4" /> 
//                   Search
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useEffect, useState } from "react";
import { MapPin, Briefcase, Search, RotateCcw } from "lucide-react";

const industryOptions = [
  "Tech",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Marketing",
  "Hospitality",
  "Construction",
  "Entertainment",
];

const SearchBar = () => {
  const search = useSearchContext();

  const [jobTitle, setJobTitle] = useState(search.jobTitle);
  const [jobLocation, setJobLocation] = useState(search.jobLocation);
  const [companysIndustry, setCompanysIndustry] = useState(search.companysIndustry);
  const [sortOption, setSortOption] = useState(search.sortOption);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (companysIndustry) {
      setIsLoading(true);
      search.saveSearchValues(jobTitle, jobLocation, companysIndustry, sortOption);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companysIndustry]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    search.saveSearchValues(jobTitle, jobLocation, companysIndustry, sortOption);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setJobTitle("");
    setJobLocation("");
    setCompanysIndustry("");
    setSortOption("");
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Job Location */}
          <div>
            <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="jobLocation"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="companysIndustry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              id="companysIndustry"
              value={companysIndustry}
              onChange={(e) => setCompanysIndustry(e.target.value)}
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">All Industries</option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sortOption" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Relevance</option>
              <option value="salary_Desc">Salary: High to Low</option>
              <option value="salary_Asc">Salary: Low to High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 lg:col-span-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium transition"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium transition"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

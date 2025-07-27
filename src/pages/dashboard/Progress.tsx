import { DollarSign, Download, Eye, TrendingUp, Users } from "lucide-react";
import ProgressBar from "../../components/progress";
import { getuser } from "../../services/AuthServices";

interface DashboardProps {
  openKYC?: () => void
}

export default function Progress({ openKYC }: DashboardProps) {

  const user = getuser();

  return (
    // <section className="lg:h-[401px] flex lg:flex-row flex-col-reverse gap-5 font-inter">
    //   {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //     <div className="border-stone-200">
    //       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <p className="text-sm font-medium text-stone-600">Total Earnings</p>
    //         <DollarSign className="h-4 w-4 text-orange-600" />
    //       </div>
    //       <div>
    //         <div className="text-2xl font-bold text-stone-900">$10,450</div>
    //         <p className="text-xs text-green-600 flex items-center mt-1">
    //           <TrendingUp className="mr-1" size={12} />
    //           +12.5% from last month
    //         </p>
    //       </div>
    //     </div>

    //     <div className="border-stone-200">
    //       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <p className="text-sm font-medium text-stone-600">Total Downloads</p>
    //         <Download className="h-4 w-4 text-orange-600" />
    //       </div>
    //       <div>
    //         <div className="text-2xl font-bold text-stone-900">2,847</div>
    //         <p className="text-xs text-green-600 flex items-center mt-1">
    //           <TrendingUp className="mr-1" size={12} />
    //           +8.2% from last month
    //         </p>
    //       </div>
    //     </div>

    //     <div className="border-stone-200">
    //       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <p className="text-sm font-medium text-stone-600">Profile Views</p>
    //         <Eye className="h-4 w-4 text-orange-600" />
    //       </div>
    //       <div>
    //         <div className="text-2xl font-bold text-stone-900">15,234</div>
    //         <p className="text-xs text-green-600 flex items-center mt-1">
    //           <TrendingUp className="mr-1" size={12} />
    //           +15.3% from last month
    //         </p>
    //       </div>
    //     </div>

    //     <div className="border-stone-200">
    //       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <p className="text-sm font-medium text-stone-600">Collaborations</p>
    //         <Users className="h-4 w-4 text-orange-600" />
    //       </div>
    //       <div>
    //         <div className="text-2xl font-bold text-stone-900">47</div>
    //         <p className="text-xs text-green-600 flex items-center mt-1">
    //           <TrendingUp className="mr-1" size={12} />
    //           +23.1% from last month
    //         </p>
    //       </div>
    //     </div>
    //   </div> */}
    //   <div className="lg:w-[30%] grid gap-5">
    //     <div className="w-full h-[242px] rounded-3xl bg-white text-primary_black py-9 px-8 shadow">
    //       <div>
    //         <div className="flex items-center justify-between">
    //           <p className="text-[15px] font-bold leading-[18px]">
    //             Your Balance is
    //           </p>
    //           <button className="border-none outline-none text-[#B0B0B0] text-lg">
    //             <RxOpenInNewWindow />
    //           </button>
    //         </div>
    //         <p className="text-[40px] font-bold leading-[48px] mb-3 mt-2">
    //           $0
    //         </p>
    //         <p className="text-[15px] font-bold leading-[18px]">0 Credits</p>
    //         <div className="my-6 bg-primary_black w-full h-[1px]"></div>
    //         <div className="flex justify-between">
    //           <div className="flex items-center gap-2">
    //             <TfiWallet size={10} />
    //             <p className="text-[10px]">Wallet</p>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <RiHistoryLine size={10} />
    //             <p className="text-[10px]">Earning History</p>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <FaChartBar size={10} />
    //             <p className="text-[10px]">Statistics</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-full h-[139px] rounded-3xl bg-white text-primary_black overflow-hidden py-9 px-8 shadow">
    //       <div>
    //         <p>Ranking unavailable</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="lg:w-[70%] bg-white rounded-3xl overflow-hidden shadow">
    //     <div className="w-full flex lg:flex-row flex-col h-full">
    //       <div
    //         style={{
    //           background: `url('https://plus.unsplash.com/premium_photo-1708275671997-f240e96b24fd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    //           backgroundSize: "cover",
    //           backgroundPositionY: "20%",
    //         }}
    //         className="lg:w-[40%] w-full lg:h-full h-[273px] border"
    //       ></div>
    //       <div className="lg:w-[60%] lg:h-full lg:p-10 p-4">
    //         <div className="text-primary_black">
    //           <p className="lg:text-4xl text-2xl text-accent font-inter font-bold lg:leading-[42px] leading-[30.26px]">
    //             No challenge available
    //           </p>
    //           {/* <div className="my-6 bg-primary_black w-full h-[1px]"></div>
    //           <ul className="grid gap-6">
    //             {Array.from({ length: 3 }, (_, index) => (
    //               <li key={index}>
    //                 <div className="flex items-center gap-1 font-semibold">
    //                   <IoIosArrowRoundForward size={20} />
    //                   <p className="text-sm">
    //                     <span className="text-blue-600">Submit</span> a
    //                     collection of black people ideating.
    //                   </p>
    //                 </div>
    //               </li>
    //             ))}
    //           </ul> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section>
      <p className="mb-2 font-semibold">Welcome back, {(user.user.full_name).split(" ")[0]}</p>

      <div className="mb-6 bg-white border border-orange-200 rounded-xl flex items-center justify-between p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="w-fit h-fit flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-semibold text-stone-900">Verify your account</p>
          </div>
          <p className="text-sm text-stone-600">
            Please verify your email and complete your profile to unlock all features and boost your credibility.
          </p>
        </div>
        <button
          className="ml-4 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
          onClick={openKYC}
        >
          Verify
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border-stone-200 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-stone-600">Total Earnings</p>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900">$10,450</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="mr-1" size={12} />
              +12.5% from last month
            </p>
          </div>
        </div>

        <div className="border-stone-200 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-stone-600">Total Downloads</p>
            <Download className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900">2,847</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="mr-1" size={12} />
              +8.2% from last month
            </p>
          </div>
        </div>

        <div className="border-stone-200 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-stone-600">Profile Views</p>
            <Eye className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900">15,234</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="mr-1" size={12} />
              +15.3% from last month
            </p>
          </div>
        </div>

        <div className="border-stone-200 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-stone-600">Collaborations</p>
            <Users className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900">47</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="mr-1" size={12} />
              +23.1% from last month
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="p-4 mt-8 rounded-lg border-stone-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-stone-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-white" size={16} />
                  </div>
                  <p className="text-2xl font-bold">Contributors Challenge</p>
                </div>
                <p className="text-sm text-neutral-500">Participate in bounty challenges for high-demand content</p>
              </div>
              <div className="bg-orange-600 px-2 text-sm rounded-xl text-white">3 Active</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Challenge 1 */}
              <div className="bg-white flex flex-col justify-between rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 rounded-lg">High Priority</div>
                    <span className="text-sm text-orange-600 font-bold">$500 Bounty</span>
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">African Tech Startups</h4>
                  <p className="text-sm text-stone-600 mb-3">
                    Modern African entrepreneurs, co-working spaces, and tech innovation scenes
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Submissions</span>
                      <span className="font-medium">12/50</span>
                    </div>
                    <ProgressBar value={24} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Deadline</span>
                      <span className="font-medium text-red-600">5 days left</span>
                    </div>
                  </div>
                </div>
                <button className="w-full text-white py-2 rounded-lg bg-orange-600 hover:bg-orange-700">
                  Join Challenge
                </button>
              </div>

              {/* Challenge 2 */}
              <div className="bg-white rounded-xl flex flex-col justify-between p-4 border border-amber-200 hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 rounded-lg">Medium Priority</div>
                    <span className="text-sm font-bold text-amber-600">$300 Bounty</span>
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">Sustainable Agriculture</h4>
                  <p className="text-sm text-stone-600 mb-3">
                    Modern farming techniques, organic agriculture, and rural innovation in Africa
                  </p>
                </div>
                <div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Submissions</span>
                      <span className="font-medium">8/30</span>
                    </div>
                    <ProgressBar value={27} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Deadline</span>
                      <span className="font-medium text-orange-600">12 days left</span>
                    </div>
                  </div>
                  <button className="w-full text-white py-2 rounded-lg bg-orange-600 hover:bg-orange-700">
                    Join Challenge
                  </button>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="bg-white rounded-xl lex flex-col justify-between p-4 border border-stone-200 hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>Standard</div>
                    <span className="text-sm font-bold text-stone-600">$200 Bounty</span>
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">African Fashion Week</h4>
                  <p className="text-sm text-stone-600 mb-3">
                    Behind-the-scenes, runway shows, designers, and fashion week atmosphere
                  </p>
                </div>
                <div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Submissions</span>
                      <span className="font-medium">25/40</span>
                    </div>
                    <ProgressBar value={63} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Deadline</span>
                      <span className="font-medium text-green-600">20 days left</span>
                    </div>
                  </div>
                  <button className="w-full text-white py-2 rounded-lg bg-orange-600 hover:bg-orange-700">
                    Join Challenge
                  </button>
                </div>
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="mt-6 pt-4 border-t border-orange-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">$1,200</div>
                  <p className="text-sm text-stone-600">Total Bounties</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900">45</div>
                  <p className="text-sm text-stone-600">Active Submissions</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <p className="text-sm text-stone-600">Your Submissions</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">$150</div>
                  <p className="text-sm text-stone-600">Earned This Month</p>
                </div>
              </div>
            </div>

            {/* View All Challenges Button */}
            <div className="mt-4 text-center">
              <button className="bg-transparent border-orange-600 text-orange-600 hover:bg-orange-50">
                View All Challenges
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react'
const Viewjob = () => {
  return (
    <>
    <div>
   <div className="h-64 bg-white text-gray-600 flex flex-col justify-center items-center">
  <h1 className="text-4xl font-semibold mb-4 mt-24">Pricing</h1>
</div>
<div
  className="relative py-20 text-white bg-cover bg-center bg-no-repeat h-[500px]"
  style={{
    backgroundImage: "url('widget-testimonial-background-1.jpg')",
  }}
>
  <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
    <h2 className="text-4xl font-semibold mb-4 pt-28">Priced to Hire</h2>
    <p className="text-lg font-light">
      Manually create a price table with options for anything you want.<br />
      Or automatically generate one using WooCommerce Paid Listings.
    </p>
  </div>
</div>

<div className="bg-gray-100 py-16 px-4">
  <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Plans and Pricing</h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Small Team Plan */}
    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition border-t-4 border-[#5bbc2e]">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Small Team</h3>
      <p className="text-gray-800 text-xl font-bold">$69.00</p>
      <p className="text-sm text-gray-500 mb-4">1 job for 60 days</p>

      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li>✓ Post 1 Job</li>
        <li>✓ Edit Your Job Listings</li>
        <li>✓ See Job Posting Stats</li>
        <li>✓ Job Listing Expires in 60 Days</li>
      </ul>

      <button className="w-full py-2 px-4 bg-[#5bbc2e] text-white rounded hover:bg-green-600 transition">
        Get Started
      </button>
    </div>

    {/* Enterprise Plan */}
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-[#5bbc2e]">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Enterprise</h3>
      <p className="text-gray-800 text-xl font-bold">$199.00</p>
      <p className="text-sm text-gray-500 mb-4">20 jobs for 190 days</p>

      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li>✓ Post Unlimited Jobs</li>
        <li>✓ Unlimited Featured Jobs</li>
        <li>✓ Edit Your Job Listings</li>
        <li>✓ See Job Posting Stats</li>
        <li>✓ 24/7 Critical Support</li>
        <li>✓ Job Listing Expires in 190 Days</li>
      </ul>

      <button className="w-full py-2 px-4 bg-[#5bbc2e] text-white rounded hover:bg-green-600 transition">
        Get Started
      </button>
    </div>

    {/* Corporate Plan */}
    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition border-t-4 border-[#5bbc2e]">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Corporate</h3>
      <p className="text-gray-800 text-xl font-bold">$199.00</p>
      <p className="text-sm text-gray-500 mb-4">20 jobs for 190 days</p>

      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li>✓ Post Unlimited Jobs</li>
        <li>✓ Unlimited Featured Jobs</li>
        <li>✓ Edit Your Job Listings</li>
        <li>✓ See Job Posting Stats</li>
        <li>✓ 24/7 Critical Support</li>
        <li>✓ Job Listing Expires in 190 Days</li>
      </ul>

      <button className="w-full py-2 px-4 bg-[#5bbc2e] text-white rounded hover:bg-green-600 transition">
        Get Started
      </button>
    </div>
    
  </div>
</div>


    <div className="bg-white py-12 px-4">
  <h2 className="text-4xl text-center text-gray-600 mb-15">
    Hundreds of Jobs From All Over India
  </h2>

  {/* Job List */}
  <div className="space-y-4 max-w-7xl mx-auto">
    {[
      {
        logo: 'company-logo-sspace-150x150-1-150x150.jpg',
        title: 'UX Designer',
        company: 'CodePen',
        location: 'Bangalore, Karnataka',
      },
      {
        logo: 'company-logo-disqus-150x150-1-150x150.jpg',
        title: 'Web Designer / Developer',
        company: 'Disney',
        location: 'Mumbai, Maharashtra',
      },
      {
        logo: 'listing-codepen-logo-150x150.jpg',
        title: 'Graphic Designer',
        company: 'Creative Studio',
        location: 'Pune, Maharashtra',
      },
      {
        logo: 'company-logo-pinterest-300x300-1-150x150.jpg',
        title: 'Senior Designer',
        company: 'Docker',
        location: 'Hyderabad, Telangana',
      },
      {
        logo: 'company-logo-fitbit-300x300-1-150x150.jpg',
        title: 'Design Technologist',
        company: 'Fitbit',
        location: 'Gurgaon, Haryana',
      },
      {
        logo: 'company-logo-paypal-300x300-1-150x150.jpg',
        title: 'Front-End Engineer',
        company: 'PayPal',
        location: 'Chennai, Tamil Nadu',
      },
      {
        logo: 'ZOHO_New.png',
        title: 'UI Developer',
        company: 'Zoho Corp',
        location: 'Coimbatore, Tamil Nadu',
      },
      {
        logo: 'images.png',
        title: 'Software Developer',
        company: 'TCS',
        location: 'Noida, Uttar Pradesh',
      },
      {
        logo: 'infosys.png',
        title: 'Product Designer',
        company: 'Infosys',
        location: 'Mysore, Karnataka',
      },
    ].map((job, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-t last:border-b bg-white hover:bg-gray-50 hover:border-l-4 hover:border-[#5bbc2e] transition duration-300"
      >
        <div className="flex items-center gap-4">
          <img
            src={job.logo}
            alt="Company logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{job.title}</h4>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-700 text-sm gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[#5bbc2e]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 3.05a7 7 0 119.9 9.9l-4.95 4.95-4.95-4.95a7 7 0 010-9.9zm4.95 1.414a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{job.location}</span>
          </div>
          <button className="text-[#5bbc2e] hover:underline font-medium">
            View Job
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination */}
  <div className="mt-10 flex justify-center">
    <button className="px-6 py-2 bg-[#5bbc2e] text-white font-semibold rounded hover:bg-[#4da628] transition">
      Load More Listings
    </button>
  </div>
</div>
</div>
    </>
  )
}

export default Viewjob

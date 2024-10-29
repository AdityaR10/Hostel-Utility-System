import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="https://www.manit.ac.in/sites/default/files/documents/Manit%20Logo%20color_0.jpg"
              alt="MANIT Logo"
              className="mr-3"
            />
            <span className="text-xl font-bold">MANIT</span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-white">
              Home
            </a>
            <a href="#" className="text-white">
              Projects
            </a>
            <a href="#" className="text-white">
              Contacts
            </a>
            <a href="#" className="text-white">
              Community
            </a>
            <a href="#" className="text-white">
              Blog
            </a>
            <a href="#" className="text-white">
              Login
            </a>
            <a href="signup" className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign Up
            </a>
          </nav>
        </div>
      </header>
      <main>
        <section className="bg-blue-800 text-white py-20">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">
                Here we can see all the notices,circulars and other information 
              </h1>
              <p className="mb-6">
                We need to get the document from cow page and show it here, when this button explore notices is clicked all latest notices should be shown.
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded">
                Explore Notices
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://placehold.co/600x400"
                alt="People working on laptops"
                className="rounded"
              />
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/400x300"
                  alt="Group of people discussing"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">
                    Hostel Authorities Login
                  </h2>
                  <p className="text-gray-700 mb-4">
                    You’ll benefit from a friendly, open and welcoming work
                    environment, and you’ll be working with a team of excellent.
                  </p>
                  <Link href="/hostel">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Go To Hostel
                    </button>
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/400x300"
                  alt="People collaborating on a project"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">Student Dashboard</h2>
                  <p className="text-gray-700 mb-4">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature.
                  </p>
                  <Link href="student">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
              {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
                  <ul className="text-gray-700">
                    <li className="mb-2">Amazing Talk</li>
                    <li className="mb-2">Workshop</li>
                    <li className="mb-2">Networking</li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        {/* <section className="py-20">
          <div className="container mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
              <h2 className="text-xl font-bold mb-4">News Updates</h2>
              <p className="text-gray-700 mb-4">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature.
              </p>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <select className="w-full px-4 py-2 border rounded">
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
                <button className="bg-blue-500 text-white px-6 py-3 rounded">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="bg-blue-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MANIT. All rights reserved.<br></br>
            Mentored by: Dr. Meenu Chawla: Created by Aditya and Akshat 
          </p>
        </div>
      </footer>
    </div>
  );
}

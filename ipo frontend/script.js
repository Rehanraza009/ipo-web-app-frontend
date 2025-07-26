// IPO Data (Example Data)
const ipoData = [
    {
        id: 1,
        name: 'Tech Innovators Inc. IPO',
        logo: 'https://placehold.co/64x64/6B7280/ffffff?text=TI', // Placeholder
        status: 'Upcoming',
        openDate: '2025-08-10',
        closeDate: '2025-08-14',
        priceRange: '₹250-260',
        minInvestment: '₹14,950',
        description: 'Tech Innovators Inc. is a leading disruptor in AI-driven solutions, specializing in machine learning and data analytics platforms. Their IPO aims to fund expansion into new markets and further R&D. This is a highly anticipated offering for investors looking into the future of technology.'
    },
    {
        id: 2,
        name: 'Green Energy Solutions IPO',
        logo: 'https://placehold.co/64x64/065F46/ffffff?text=GE', // Placeholder
        status: 'Ongoing',
        openDate: '2025-07-20',
        closeDate: '2025-07-24',
        priceRange: '₹120-130',
        minInvestment: '₹14,300',
        description: 'Green Energy Solutions is at the forefront of renewable energy development, focusing on sustainable solar and wind power projects. Their IPO will enable them to scale operations and invest in next-generation clean energy technologies. A great opportunity for environmentally conscious investors.'
    },
    {
        id: 3,
        name: 'HealthCare Pharma Ltd. IPO',
        logo: 'https://placehold.co/64x64/991B1B/ffffff?text=HP', // Placeholder
        status: 'Past',
        openDate: '2025-06-01',
        closeDate: '2025-06-05',
        priceRange: '₹500-520',
        minInvestment: '₹15,600',
        description: 'HealthCare Pharma Ltd. is a well-established pharmaceutical company known for its innovative drug discovery and manufacturing. Their recent IPO was oversubscribed, reflecting strong investor confidence in the healthcare sector and their robust product pipeline.'
    },
    {
        id: 4,
        name: 'Global Logistics Corp IPO',
        logo: 'https://placehold.co/64x64/1E40AF/ffffff?text=GL', // Placeholder
        status: 'Upcoming',
        openDate: '2025-09-01',
        closeDate: '2025-09-05',
        priceRange: '₹180-190',
        minInvestment: '₹14,250',
        description: 'Global Logistics Corp provides comprehensive supply chain and logistics solutions worldwide. This upcoming IPO is expected to fuel their expansion into automated warehousing and last-mile delivery services, capitalizing on the growing e-commerce market.'
    }
];

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const sidebar = document.getElementById('sidebar');
const closeSidebarButton = document.getElementById('close-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');

let isSidebarOpen = false;
let activeSection = 'home'; // Default active section
let currentIpoId = null; // Stores the ID of the currently viewed IPO details

/**
 * Toggles the visibility of the sidebar on mobile devices.
 */
function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
        sidebar.classList.remove('-translate-x-full', 'animate-slide-out-left');
        sidebar.classList.add('translate-x-0', 'animate-slide-in-left');
        sidebarOverlay.classList.remove('hidden');
    } else {
        sidebar.classList.remove('translate-x-0', 'animate-slide-in-left');
        sidebar.classList.add('-translate-x-full', 'animate-slide-out-left');
        sidebarOverlay.classList.add('hidden');
    }
}

/**
 * Renders content into the main content area based on the active section.
 */
function renderContent() {
    let contentHtml = '';
    switch (activeSection) {
        case 'home':
        case 'all-ipos':
        case 'upcoming-ipos':
        case 'past-ipos':
            const filteredIpos = ipoData.filter(ipo => {
                if (activeSection === 'all-ipos') return true;
                return ipo.status.toLowerCase() === activeSection.replace('-ipos', '');
            });

            const sectionTitle = activeSection === 'home' ? 'Current IPOs' :
                                 activeSection === 'all-ipos' ? 'All IPO Listings' :
                                 activeSection === 'upcoming-ipos' ? 'Upcoming IPOs' :
                                 'Past IPOs';

            contentHtml = `
                <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up border border-slate-700">
                    <h2 class="text-3xl font-bold text-slate-100 mb-6">${sectionTitle}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${filteredIpos.map(ipo => `
                            <div class="ipo-card bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600 transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer opacity-0 translate-y-10">
                                <div class="flex items-center mb-4">
                                    <img src="${ipo.logo}" alt="${ipo.name} Logo" class="w-12 h-12 rounded-full mr-4 object-cover shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/48x48/6B7280/ffffff?text=N/A';" />
                                    <div>
                                        <h3 class="text-xl font-semibold text-slate-100">${ipo.name}</h3>
                                        <span class="px-3 py-1 text-xs font-medium rounded-full ${ipo.status === 'Upcoming' ? 'bg-green-500' : ipo.status === 'Ongoing' ? 'bg-blue-500' : 'bg-gray-500'} text-white shadow-sm">
                                            ${ipo.status}
                                        </span>
                                    </div>
                                </div>
                                <p class="text-slate-300 mb-4 text-sm">${ipo.description.substring(0, 100)}...</p>
                                <div class="text-slate-400 text-sm mb-4">
                                    <p><span class="font-medium text-slate-200">Price:</span> ${ipo.priceRange}</p>
                                    <p><span class="font-medium text-slate-200">Open:</span> ${ipo.openDate}</p>
                                    <p><span class="font-medium text-slate-200">Close:</span> ${ipo.closeDate}</p>
                                </div>
                                <button class="view-details-button btn-primary w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200" data-ipo-id="${ipo.id}">
                                    View Details
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
        case 'login':
            contentHtml = `
                <div class="flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in-scale-up">
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
                        <h2 class="text-3xl font-bold text-slate-100 mb-6 text-center">Login to Bluestock</h2>
                        <form>
                            <div class="mb-4">
                                <label for="login-email" class="block text-slate-300 text-sm font-medium mb-2">Email</label>
                                <input type="email" id="login-email" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="your@example.com">
                            </div>
                            <div class="mb-6">
                                <label for="login-password" class="block text-slate-300 text-sm font-medium mb-2">Password</label>
                                <input type="password" id="login-password" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="••••••••">
                            </div>
                            <button type="submit" class="btn-primary w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg">
                                Login
                            </button>
                            <p class="text-center text-slate-400 text-sm mt-4">
                                Don't have an account? <a href="#" data-section="register" class="text-cyan-400 hover:underline nav-item">Register here</a>
                            </p>
                            <p class="text-center text-slate-400 text-sm mt-2">
                                <a href="#" data-section="forgot-password" class="text-cyan-400 hover:underline nav-item">Forgot Password?</a>
                            </p>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'register':
            contentHtml = `
                <div class="flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in-scale-up">
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
                        <h2 class="text-3xl font-bold text-slate-100 mb-6 text-center">Register for Bluestock</h2>
                        <form>
                            <div class="mb-4">
                                <label for="reg-name" class="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
                                <input type="text" id="reg-name" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="John Doe">
                            </div>
                            <div class="mb-4">
                                <label for="reg-email" class="block text-slate-300 text-sm font-medium mb-2">Email</label>
                                <input type="email" id="reg-email" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="your@example.com">
                            </div>
                            <div class="mb-4">
                                <label for="reg-password" class="block text-slate-300 text-sm font-medium mb-2">Password</label>
                                <input type="password" id="reg-password" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="••••••••">
                            </div>
                            <div class="mb-6">
                                <label for="reg-confirm-password" class="block text-slate-300 text-sm font-medium mb-2">Confirm Password</label>
                                <input type="password" id="reg-confirm-password" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="••••••••">
                            </div>
                            <button type="submit" class="btn-primary w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg">
                                Register
                            </button>
                            <p class="text-center text-slate-400 text-sm mt-4">
                                Already have an account? <a href="#" data-section="login" class="text-cyan-400 hover:underline nav-item">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'ipo-details':
            const selectedIpo = ipoData.find(ipo => ipo.id === currentIpoId);
            if (selectedIpo) {
                contentHtml = `
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up border border-slate-700">
                        <button class="text-cyan-400 hover:underline mb-6 flex items-center transition-colors duration-200" onclick="navigateBackToHome()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left mr-2"><path d="m15 18-6-6 6-6"/></svg>
                            Back to IPOs
                        </button>
                        <div class="flex items-center mb-6">
                            <img src="${selectedIpo.logo}" alt="${selectedIpo.name} Logo" class="w-16 h-16 rounded-full mr-6 object-cover shadow-md" onerror="this.onerror=null;this.src='https://placehold.co/64x64/6B7280/ffffff?text=N/A';" />
                            <div>
                                <h2 class="text-4xl font-extrabold text-slate-100">${selectedIpo.name}</h2>
                                <span class="px-4 py-1 mt-2 text-lg font-medium rounded-full ${selectedIpo.status === 'Upcoming' ? 'bg-green-600' : 'bg-blue-600'} text-white inline-block shadow-sm">
                                    ${selectedIpo.status}
                                </span>
                            </div>
                        </div>
                        <p class="text-slate-300 mb-6 text-lg leading-relaxed">${selectedIpo.description}</p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-slate-400 mb-8">
                            <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                                <p class="font-semibold text-slate-200">Open Date:</p>
                                <p>${selectedIpo.openDate}</p>
                            </div>
                            <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                                <p class="font-semibold text-slate-200">Close Date:</p>
                                <p>${selectedIpo.closeDate}</p>
                            </div>
                            <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                                <p class="font-semibold text-slate-200">Price Range:</p>
                                <p>${selectedIpo.priceRange}</p>
                            </div>
                            <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                                <p class="font-semibold text-slate-200">Minimum Investment:</p>
                                <p>${selectedIpo.minInvestment}</p>
                            </div>
                            <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                                <p class="font-semibold text-slate-200">Issue Size:</p>
                                <p>₹1,200 Crores</p> </div>
                            <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                                <p class="font-semibold text-slate-200">Listing Date (Expected):</p>
                                <p>${selectedIpo.status === 'Upcoming' ? 'TBD' : '2025-06-25'}</p> </div>
                        </div>

                        <h3 class="text-2xl font-semibold text-slate-100 mb-4">Company Overview</h3>
                        <p class="text-slate-300 mb-6 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <button class="apply-ipo-button btn-primary w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center" data-ipo-id="${selectedIpo.id}">
                            Apply for IPO
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link ml-2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                        </button>
                    </div>
                `;
            } else {
                contentHtml = `
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up text-center border border-slate-700">
                        <h2 class="text-3xl font-bold text-slate-100 mb-4">IPO Not Found</h2>
                        <p class="text-slate-300 mb-6">The requested IPO could not be found. Please go back to the home page.</p>
                        <button class="btn-primary bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg" onclick="navigateBackToHome()">
                            Go to Home
                        </button>
                    </div>
                `;
            }
            break;
        case 'apply-ipo':
            const ipoToApply = ipoData.find(ipo => ipo.id === currentIpoId);
            if (ipoToApply) {
                contentHtml = `
                    <div class="flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in-scale-up">
                        <div class="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
                            <h2 class="text-3xl font-bold text-slate-100 mb-6 text-center">Apply for ${ipoToApply.name}</h2>
                            <form>
                                <div class="mb-4">
                                    <label for="apply-quantity" class="block text-slate-300 text-sm font-medium mb-2">Quantity (Lots)</label>
                                    <input type="number" id="apply-quantity" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="e.g., 1" min="1">
                                </div>
                                <div class="mb-4">
                                    <label for="apply-price" class="block text-slate-300 text-sm font-medium mb-2">Bid Price (₹)</label>
                                    <input type="text" id="apply-price" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" value="${ipoToApply.priceRange.split('-')[1] || ipoToApply.priceRange.replace('₹', '')}" placeholder="e.g., ${ipoToApply.priceRange.split('-')[1] || ipoToApply.priceRange.replace('₹', '')}">
                                    <p class="text-slate-400 text-xs mt-1">Price Range: ${ipoToApply.priceRange}</p>
                                </div>
                                <div class="mb-6">
                                    <label for="investor-type" class="block text-slate-300 text-sm font-medium mb-2">Investor Type</label>
                                    <select id="investor-type" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                        <option value="retail">Retail Investor</option>
                                        <option value="hni">HNI</option>
                                        <option value="qib">QIB</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn-primary w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg">
                                    Submit Application
                                </button>
                                <p class="text-center text-slate-400 text-sm mt-4">
                                    <a href="#" class="text-cyan-400 hover:underline" onclick="navigateBackToIpoDetails(${ipoToApply.id})">Cancel</a>
                                </p>
                            </form>
                        </div>
                    </div>
                `;
            } else {
                contentHtml = `
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up text-center border border-slate-700">
                        <h2 class="text-3xl font-bold text-slate-100 mb-4">IPO Not Found</h2>
                        <p class="text-slate-300 mb-6">Cannot apply for an unknown IPO. Please go back to the home page.</p>
                        <button class="btn-primary bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg" onclick="navigateBackToHome()">
                            Go to Home
                        </button>
                    </div>
                `;
            }
            break;
        case 'user-dashboard':
            contentHtml = `
                <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up border border-slate-700">
                    <h2 class="text-3xl font-bold text-slate-100 mb-6">User Dashboard</h2>
                    <p class="text-slate-300 mb-4">Welcome to your personal dashboard. Here you can manage your investments and profile.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                            <h3 class="text-xl font-semibold text-slate-100 mb-3">My Investments</h3>
                            <ul class="text-slate-300">
                                <li class="mb-2">No active investments yet.</li>
                                </ul>
                        </div>
                        <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                            <h3 class="text-xl font-semibold text-slate-100 mb-3">Recent Activity</h3>
                            <ul class="text-slate-300">
                                <li class="mb-2">Logged in: 2025-07-22</li>
                                <li class="mb-2">Viewed IPO: Bluestock Fintech IPO</li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-end">
                        <button data-section="profile-edit" class="nav-item btn-primary bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                            Edit Profile
                        </button>
                    </div>
                </div>
            `;
            break;
        case 'forgot-password':
            contentHtml = `
                <div class="flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in-scale-up">
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
                        <h2 class="text-3xl font-bold text-slate-100 mb-6 text-center">Forgot Password</h2>
                        <p class="text-slate-300 mb-6 text-center">Enter your email address to receive a password reset link.</p>
                        <form>
                            <div class="mb-4">
                                <label for="forgot-email" class="block text-slate-300 text-sm font-medium mb-2">Email</label>
                                <input type="email" id="forgot-email" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="your@example.com">
                            </div>
                            <button type="submit" class="btn-primary w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg">
                                Reset Password
                            </button>
                            <p class="text-center text-slate-400 text-sm mt-4">
                                Remembered your password? <a href="#" data-section="login" class="text-cyan-400 hover:underline nav-item">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'admin-page':
            contentHtml = `
                <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up border border-slate-700">
                    <h2 class="text-3xl font-bold text-slate-100 mb-6">Admin Panel</h2>
                    <p class="text-slate-300 mb-4">Welcome, Admin. Manage IPOs, users, and system settings here.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                            <h3 class="text-xl font-semibold text-slate-100 mb-3">Manage IPOs</h3>
                            <p class="text-slate-300 mb-4">Add, edit, or remove IPO listings.</p>
                            <button class="btn-primary bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
                                Go to IPO Management
                            </button>
                        </div>
                        <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                            <h3 class="text-xl font-semibold text-slate-100 mb-3">Manage Users</h3>
                            <p class="text-slate-300 mb-4">View and manage user accounts.</p>
                            <button class="btn-primary bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
                                Go to User Management
                            </button>
                        </div>
                        <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                            <h3 class="text-xl font-semibold text-slate-100 mb-3">System Settings</h3>
                            <p class="text-slate-300 mb-4">Configure application settings.</p>
                            <button class="btn-primary bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
                                Go to Settings
                            </button>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-end">
                        <button data-section="admin-profile" class="nav-item btn-primary bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                            Admin Profile
                        </button>
                    </div>
                </div>
            `;
            break;
        case 'admin-profile':
            contentHtml = `
                <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up border border-slate-700">
                    <h2 class="text-3xl font-bold text-slate-100 mb-6">Admin Profile</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
                        <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                            <p class="font-semibold text-slate-200">Name:</p>
                            <p>Admin User</p>
                        </div>
                        <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                            <p class="font-semibold text-slate-200">Email:</p>
                            <p>admin@bluestock.com</p>
                        </div>
                        <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                            <p class="font-semibold text-slate-200">Role:</p>
                            <p>Administrator</p>
                        </div>
                        <div class="bg-slate-700 p-4 rounded-lg shadow-inner">
                            <p class="font-semibold text-slate-200">Last Login:</p>
                            <p>2025-07-22 10:30 AM</p>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-end">
                        <button data-section="profile-edit" class="nav-item btn-primary bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                            Edit Profile
                        </button>
                    </div>
                </div>
            `;
            break;
        case 'profile-edit':
            contentHtml = `
                <div class="flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in-scale-up">
                    <div class="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
                        <h2 class="text-3xl font-bold text-slate-100 mb-6 text-center">Edit Profile</h2>
                        <form>
                            <div class="mb-4">
                                <label for="edit-name" class="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
                                <input type="text" id="edit-name" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" value="John Doe">
                            </div>
                            <div class="mb-4">
                                <label for="edit-email" class="block text-slate-300 text-sm font-medium mb-2">Email</label>
                                <input type="email" id="edit-email" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" value="john.doe@example.com">
                            </div>
                            <div class="mb-4">
                                <label for="edit-phone" class="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
                                <input type="tel" id="edit-phone" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" value="+91 98765 43210">
                            </div>
                            <div class="mb-6">
                                <label for="edit-address" class="block text-slate-300 text-sm font-medium mb-2">Address</label>
                                <textarea id="edit-address" class="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows="3">123, Main Street, Anytown, India</textarea>
                            </div>
                            <button type="submit" class="btn-primary w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg">
                                Save Changes
                            </button>
                            <p class="text-center text-slate-400 text-sm mt-4">
                                <a href="#" data-section="user-dashboard" class="text-cyan-400 hover:underline nav-item">Cancel</a>
                            </p>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'about':
            contentHtml = `
                <div class="bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in-scale-up border border-slate-700">
                    <h2 class="text-3xl font-bold text-slate-100 mb-4">About Bluestock Fintech IPO Web App</h2>
                    <p class="text-slate-300 mb-4 leading-relaxed">
                        This application is designed to provide a seamless and intuitive experience for tracking Initial Public Offerings (IPOs).
                        Developed by Bluestock Fintech, it aims to empower users with timely information and easy access to investment opportunities.
                    </p>
                    <p class="text-slate-300 leading-relaxed">
                        Our platform focuses on delivering a user-friendly interface, real-time updates, and comprehensive details for both
                        upcoming and past IPOs, helping you make informed decisions.
                    </p>
                    <div class="mt-6 text-slate-400 text-sm">
                        <p>&copy; 2025 Bluestock Fintech. All rights reserved.</p>
                        <p>Version 1.0.0</p>
                    </div>
                </div>
            `;
            break;
        default:
            contentHtml = '';
    }
    mainContent.innerHTML = contentHtml;

    // Trigger animations for newly rendered cards
    setTimeout(() => {
        const cards = mainContent.querySelectorAll('.ipo-card');
        cards.forEach(card => {
            card.classList.remove('opacity-0', 'translate-y-10');
            card.classList.add('opacity-100', 'translate-y-0', 'animate-fade-in-scale-up');
        });
    }, 50); // Small delay to ensure elements are in DOM before animation

    // Add event listeners for "View Details" buttons
    document.querySelectorAll('.view-details-button').forEach(button => {
        button.addEventListener('click', (event) => {
            currentIpoId = parseInt(event.currentTarget.dataset.ipoId);
            activeSection = 'ipo-details';
            updateNavActiveState(); // Keep existing nav item active or clear
            renderContent();
            if (window.innerWidth < 1024) { toggleSidebar(); }
        });
    });

    // Add event listeners for "Apply for IPO" button
    document.querySelectorAll('.apply-ipo-button').forEach(button => {
        button.addEventListener('click', (event) => {
            currentIpoId = parseInt(event.currentTarget.dataset.ipoId);
            activeSection = 'apply-ipo';
            updateNavActiveState(); // Keep existing nav item active or clear
            renderContent();
            if (window.innerWidth < 1024) { toggleSidebar(); }
        });
    });

    // Re-attach event listeners for newly rendered nav-item links within content
    document.querySelectorAll('#main-content .nav-item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            activeSection = event.currentTarget.dataset.section;
            currentIpoId = null; // Clear IPO ID when navigating away from details
            updateNavActiveState();
            renderContent();
            if (window.innerWidth < 1024) { toggleSidebar(); }
        });
    });
}

/**
 * Navigates back to the home page (dashboard).
 */
function navigateBackToHome() {
    activeSection = 'home';
    currentIpoId = null;
    updateNavActiveState();
    renderContent();
}

/**
 * Navigates back to the IPO details page.
 * @param {number} ipoId - The ID of the IPO to view.
 */
function navigateBackToIpoDetails(ipoId) {
    currentIpoId = ipoId;
    activeSection = 'ipo-details';
    updateNavActiveState();
    renderContent();
}

/**
 * Updates the active navigation item's styling.
 */
function updateNavActiveState() {
    navItems.forEach(item => {
        if (item.dataset.section === activeSection) {
            item.classList.add('bg-cyan-700', 'text-white', 'shadow-md'); /* Active nav item color */
            item.classList.remove('text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
        } else {
            item.classList.remove('bg-cyan-700', 'text-white', 'shadow-md');
            item.classList.add('text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
        }
    });
}

// Event Listeners
mobileMenuButton.addEventListener('click', toggleSidebar);
closeSidebarButton.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar); // Close sidebar when overlay is clicked

navItems.forEach(item => {
    item.addEventListener('click', (event) => {
        activeSection = event.currentTarget.dataset.section;
        currentIpoId = null; // Clear IPO ID when navigating away from details
        updateNavActiveState();
        renderContent();
        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024) { // Tailwind's 'lg' breakpoint is 1024px
            toggleSidebar();
        }
    });
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    updateNavActiveState();
    // Initialize Lucide icons
    lucide.createIcons();
});

// Adjust sidebar visibility on window resize for desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) { // If desktop view
        sidebar.classList.remove('-translate-x-full', 'animate-slide-out-left', 'translate-x-0', 'animate-slide-in-left');
        sidebar.classList.add('lg:relative', 'lg:translate-x-0', 'lg:animate-none');
        sidebarOverlay.classList.add('hidden');
        isSidebarOpen = false; // Ensure state is consistent
    } else {
        // If mobile view, ensure sidebar starts closed if not explicitly opened
        if (!isSidebarOpen) {
            sidebar.classList.add('-translate-x-full');
        }
    }
});
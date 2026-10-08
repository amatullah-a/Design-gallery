import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Eye, 
  Edit2, 
  Trash2,
  Image as ImageIcon,
  CreditCard,
  User,
  Calendar,
  Search as SearchIcon
} from 'lucide-react';

const App = () => {
  // Mock data expanded with 5 more rows
  const shopData = [
    { 
      id: 1, 
      img: null,
      code: 'US2025', 
      name: 'Tecaher PP', 
      received: 0.00, 
      totalPayments: 153, 
      refunded: 0, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 0, 
      instApp: { paid: 0, progress: 0, cancelled: 0 },
      instLink: { paid: 0, progress: 0, cancelled: 0 },
      outstanding: 153,
      optout: 0,
      sepa: '-',
      type: 'Full Payment',
      price: 44.00,
      year: '2025/26',
      userType: 'Staff',
      created: '08/05/2026',
      published: true
    },
    { 
      id: 2, 
      img: null,
      code: 'US2025', 
      name: 'Std PP Stripe', 
      received: 38.00, 
      totalPayments: 6, 
      refunded: 0, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 0, 
      instApp: { paid: 1, progress: 0, cancelled: 0 },
      instLink: { paid: 0, progress: 0, cancelled: 0 },
      outstanding: 5,
      optout: 0,
      sepa: '-',
      type: 'Partial Payment',
      price: 42.00,
      year: '2025/26',
      userType: 'Student',
      created: '08/05/2026',
      published: true
    },
    { 
      id: 3, 
      img: null,
      code: 'US2026', 
      name: 'Adhoc payment stripe off', 
      received: 47.00, 
      totalPayments: 6, 
      refunded: 0, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 0, 
      instApp: { paid: 0, progress: 0, cancelled: 0 },
      instLink: { paid: 0, progress: 0, cancelled: 0 },
      outstanding: 6,
      optout: 0,
      sepa: '-',
      type: 'Full Payment',
      price: 16.00,
      year: '2025/26',
      userType: 'Student',
      created: '07/05/2026',
      published: true
    },
    { 
      id: 4, 
      img: null,
      code: 'US2026', 
      name: 'VA-pp', 
      received: 132.00, 
      totalPayments: 6, 
      refunded: 0, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 0, 
      instApp: { paid: 2, progress: 0, cancelled: 0 },
      instLink: { paid: 0, progress: 0, cancelled: 0 },
      outstanding: 4,
      optout: 0,
      sepa: '-',
      type: 'Partial Payment',
      price: 0.00,
      year: '2025/26',
      userType: 'Student',
      created: '07/05/2026',
      published: true
    },
    { 
      id: 5, 
      img: null,
      code: 'US2025', 
      name: 'VO-PP Stripe fee', 
      received: 216.00, 
      totalPayments: 9, 
      refunded: 0, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 1, 
      instApp: { paid: 2, progress: 0, cancelled: 0 },
      instLink: { paid: 3, progress: 0, cancelled: 0 },
      outstanding: 3,
      optout: 0,
      sepa: '-',
      type: 'Partial Payment',
      price: 12.00,
      year: '2025/26',
      userType: 'Student',
      created: '07/05/2026',
      published: true
    },
    { 
      id: 6, 
      img: null,
      code: 'US2025', 
      name: 'PP-stripe fees disable', 
      received: 467.00, 
      totalPayments: 25, 
      refunded: 3, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 0, 
      instApp: { paid: 6, progress: 1, cancelled: 0 },
      instLink: { paid: 5, progress: 0, cancelled: 0 },
      outstanding: 10,
      optout: 0,
      sepa: 'Active',
      type: 'Partial Payment',
      price: 44.00,
      year: '2025/26',
      userType: 'Student',
      created: '07/05/2026',
      published: true
    },
    { 
      id: 7, 
      img: null,
      code: 'US2025', 
      name: 'PP-Stripe fees check', 
      received: 72.00, 
      totalPayments: 4, 
      refunded: 2, 
      fullApp: 0, 
      fullLink: 0, 
      cash: 0, 
      instApp: { paid: 1, progress: 0, cancelled: 0 },
      instLink: { paid: 1, progress: 0, cancelled: 0 },
      outstanding: 0,
      optout: 0,
      sepa: '-',
      type: 'Partial Payment',
      price: 24.00,
      year: '2025/26',
      userType: 'Student',
      created: '06/05/2026',
      published: true
    }
  ];

  const MetricTrio = ({ data }) => (
    <div className="flex gap-1 justify-center">
      <span className="w-5 h-5 flex items-center justify-center bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold border border-emerald-100" title="Paid">{data.paid}</span>
      <span className="w-5 h-5 flex items-center justify-center bg-amber-50 text-amber-700 rounded text-[10px] font-bold border border-amber-100" title="In Progress">{data.progress}</span>
      <span className="w-5 h-5 flex items-center justify-center bg-slate-100 text-slate-500 rounded text-[10px] font-bold border border-slate-200" title="Cancelled">{data.cancelled}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S2</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight">Test App School 2</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-medium">Kritika @ Unique</p>
          </div>
          <div className="w-9 h-9 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">K</div>
        </div>
      </header>

      <main className="p-4 lg:p-8 max-w-[1800px] mx-auto">
        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Shop</h2>
            <p className="text-slate-400 text-sm mt-1">Overview and management of shop inventory and payments.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold bg-white text-slate-800 border border-slate-200 rounded hover:bg-slate-50 transition-all shadow-sm">Find Student</button>
            <button className="px-4 py-2 text-xs font-bold bg-white text-slate-800 border border-slate-200 rounded hover:bg-slate-50 transition-all shadow-sm">Balance O/S</button>
            <button className="px-4 py-2 text-xs font-bold bg-white text-slate-800 border border-slate-200 rounded hover:bg-slate-50 transition-all shadow-sm">Add</button>
            <button className="px-4 py-2 text-xs font-bold bg-white text-slate-800 border border-slate-200 rounded hover:bg-slate-50 transition-all shadow-sm">Publish</button>
            <button className="px-4 py-2 text-xs font-bold bg-white text-slate-800 border border-slate-200 rounded hover:bg-slate-50 transition-all shadow-sm">Unpublish</button>
            <button className="px-4 py-2 text-xs font-bold bg-red-600 text-white border border-red-700 rounded hover:bg-red-700 transition-all shadow-sm">Delete</button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-t-xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div className="relative flex-1 min-w-[300px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search accounts or names..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900/5 transition-all outline-none" />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-md hover:bg-slate-50 flex items-center gap-2 px-3">
              <Filter size={14} className="text-slate-500"/>
              <span className="text-xs font-medium text-slate-600">Filters</span>
            </button>
            <button className="p-2 border border-slate-200 rounded-md hover:bg-slate-50">
              <Download size={14} className="text-slate-500"/>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
            <table className="w-full text-[11px] whitespace-nowrap border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-tighter">
                  <th className="px-3 py-3 text-center border-r border-slate-100">S.No.</th>
                  <th className="px-3 py-3 border-r border-slate-100">Image</th>
                  <th className="px-3 py-3 border-r border-slate-100">Account Code</th>
                  <th className="px-3 py-3 border-r border-slate-100">Name</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-right">Rec. (EUR)</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Total Pmt</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center text-red-500">Refunded</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Full (App)</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Full (Link)</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Cash/Adj</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center bg-slate-50">Inst. App (P/I/C)</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center bg-slate-50">Inst. Link (P/I/C)</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center text-slate-900 font-bold">Outstanding</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Optout</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Sepa DD</th>
                  <th className="px-3 py-3 border-r border-slate-100">Pmt Type</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-right">Price</th>
                  <th className="px-3 py-3 border-r border-slate-100">Financial</th>
                  <th className="px-3 py-3 border-r border-slate-100">User Type</th>
                  <th className="px-3 py-3 border-r border-slate-100">Created</th>
                  <th className="px-3 py-3 border-r border-slate-100 text-center">Published</th>
                  <th className="px-3 py-3 text-center" colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shopData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-3 py-4 text-center text-slate-400 border-r border-slate-100">{row.id}</td>
                    <td className="px-3 py-4 border-r border-slate-100">
                      <div className="w-8 h-8 rounded border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-300">
                        <ImageIcon size={14} />
                      </div>
                    </td>
                    <td className="px-3 py-4 border-r border-slate-100 font-mono text-slate-500 uppercase">{row.code}</td>
                    <td className="px-3 py-4 border-r border-slate-100 font-semibold text-slate-800">{row.name}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-right font-bold text-slate-900">€{row.received.toFixed(2)}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center font-medium">{row.totalPayments}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center text-red-500">{row.refunded}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center text-slate-400">{row.fullApp}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center text-slate-400">{row.fullLink}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center text-slate-400">{row.cash}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center"><MetricTrio data={row.instApp} /></td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center"><MetricTrio data={row.instLink} /></td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center font-bold text-slate-900">{row.outstanding}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center text-slate-400">{row.optout}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center text-slate-400">{row.sepa}</td>
                    <td className="px-3 py-4 border-r border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <CreditCard size={10} className="text-slate-400" />
                        <span>{row.type}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 border-r border-slate-100 text-right font-medium">€{row.price.toFixed(2)}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-slate-500">{row.year}</td>
                    <td className="px-3 py-4 border-r border-slate-100">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {row.userType}
                      </span>
                    </td>
                    <td className="px-3 py-4 border-r border-slate-100 text-slate-400">{row.created}</td>
                    <td className="px-3 py-4 border-r border-slate-100 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] uppercase font-bold">Yes</span>
                    </td>
                    <td className="px-2 py-4">
                      <button className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded transition-colors"><Edit2 size={14}/></button>
                    </td>
                    <td className="px-2 py-4">
                      <button className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded transition-colors"><Eye size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium tracking-tight">Showing 1 to {shopData.length} of 124 entries</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-slate-50 text-slate-400 border border-transparent hover:border-slate-200 transition-all"><ChevronLeft size={16}/></button>
              <button className="w-8 h-8 rounded bg-slate-900 text-white text-xs font-bold shadow-sm">1</button>
              <button className="w-8 h-8 rounded text-slate-600 hover:bg-slate-50 text-xs font-medium transition-all">2</button>
              <button className="w-8 h-8 rounded text-slate-600 hover:bg-slate-50 text-xs font-medium transition-all">3</button>
              <button className="p-1.5 rounded hover:bg-slate-50 text-slate-400 border border-transparent hover:border-slate-200 transition-all"><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 border-t border-slate-200 py-8 bg-white">
        <div className="max-w-[1800px] mx-auto px-8 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-slate-900">Unique Schoolapp</span> Admin Panel
          </p>
          <p className="text-[10px] text-slate-300 font-medium">
            © 2026 All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
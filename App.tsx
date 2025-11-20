import React, { useState, useMemo, useEffect } from 'react';
import { JobApplication, JobStatus, INITIAL_JOBS } from './types';
import { StatsCards } from './components/StatsCards';
import { JobModal } from './components/JobModal';
import { Plus, Search, Filter, MapPin, Building2, Banknote, Calendar, Edit3, Trash2, ExternalLink, ChevronDown, FileText } from 'lucide-react';

const App: React.FC = () => {
  // Initialize state from localStorage if available, otherwise use INITIAL_JOBS
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    try {
      const savedJobs = localStorage.getItem('jobTrackerData');
      if (savedJobs) {
        return JSON.parse(savedJobs);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    return INITIAL_JOBS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
  
  // State for delete confirmation modal
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  // Save to localStorage whenever jobs state changes
  useEffect(() => {
    try {
      localStorage.setItem('jobTrackerData', JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  const handleAddJob = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job: JobApplication) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setJobToDelete(id);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(prev => prev.filter(j => j.id !== jobToDelete));
      setJobToDelete(null);
    }
  };

  const handleSaveJob = (savedJob: JobApplication) => {
    if (editingJob) {
      setJobs(prev => prev.map(j => j.id === savedJob.id ? savedJob : j));
    } else {
      setJobs(prev => [savedJob, ...prev]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case JobStatus.APPLIED: return 'bg-blue-50 text-blue-600 border border-blue-100';
      case JobStatus.VIEWED: return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
      case JobStatus.INTERVIEW_SCHEDULED: return 'bg-purple-50 text-purple-600 border border-purple-100';
      case JobStatus.INTERVIEWED: return 'bg-yellow-50 text-yellow-600 border border-yellow-100';
      case JobStatus.OFFER: return 'bg-green-50 text-green-600 border border-green-100';
      case JobStatus.GHOSTED: return 'bg-gray-100 text-gray-500 border border-gray-200';
      case JobStatus.REJECTED: return 'bg-red-50 text-red-600 border border-red-100';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              JobTracker <span className="text-blue-600">Pro</span>
            </h1>
            <p className="text-slate-500 mt-1 text-sm">จัดการและติดตามการสมัครงานของคุณได้ง่ายๆ</p>
          </div>
          <button
            onClick={handleAddJob}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus size={20} />
            เพิ่มงานใหม่
          </button>
        </div>

        {/* Stats */}
        <StatsCards jobs={jobs} />

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="ค้นหาบริษัท หรือ ตำแหน่งงาน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-slate-900 placeholder-slate-400"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-48">
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none cursor-pointer text-slate-900"
              >
                <option value="All" className="text-slate-900">สถานะทั้งหมด</option>
                {Object.values(JobStatus).map(s => <option key={s} value={s} className="text-slate-900">{s}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Job Table (Desktop) & Cards (Mobile) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">บริษัท / ตำแหน่ง</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">เงินเดือน</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">สถานะ</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">วันที่สมัคร</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ช่องทาง</th>
                   <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      ไม่พบข้อมูลการสมัครงาน
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 text-sm sm:text-base">{job.company}</span>
                          <span className="text-sm text-slate-500 font-medium">{job.position}</span>
                          {job.jobDescription && (
                            <span className="flex items-center gap-1 text-xs text-indigo-500 mt-1">
                               <FileText size={10} /> มี JD
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-100/50 px-2 py-1 rounded-md w-fit">
                          <Banknote size={14} className="text-slate-400" />
                          {job.salary}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                           <Calendar size={14} />
                           {new Date(job.dateApplied).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric' })}
                        </div>
                      </td>
                       <td className="px-6 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1">
                           <ExternalLink size={12} className="text-slate-400"/>
                           {job.channel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditJob(job)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="แก้ไข"
                          >
                            <Edit3 size={16} className="pointer-events-none" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteClick(job.id, e)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="ลบ"
                          >
                            <Trash2 size={16} className="pointer-events-none" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Showing {filteredJobs.length} applications
        </div>
      </div>

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
        job={editingJob}
      />

      {/* Custom Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all scale-100">
            <h3 className="text-lg font-bold text-slate-900 mb-2">ยืนยันการลบข้อมูล</h3>
            <p className="text-slate-500 mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium shadow-lg shadow-red-200 transition-colors"
              >
                ลบข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
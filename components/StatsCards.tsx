import React from 'react';
import { JobApplication, JobStatus } from '../types';
import { Briefcase, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface StatsCardsProps {
  jobs: JobApplication[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ jobs }) => {
  const total = jobs.length;
  
  const interviewing = jobs.filter(j => 
    j.status === JobStatus.INTERVIEWED || 
    j.status === JobStatus.INTERVIEW_SCHEDULED
  ).length;
  
  const applied = jobs.filter(j => 
    j.status === JobStatus.APPLIED || 
    j.status === JobStatus.VIEWED
  ).length;
  
  const offers = jobs.filter(j => j.status === JobStatus.OFFER).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">งานทั้งหมด</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{total}</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
          <Briefcase size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">รอเรียกสัมภาษณ์</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{applied}</p>
        </div>
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
          <Clock size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">สัมภาษณ์แล้ว</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{interviewing}</p>
        </div>
        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
          <CheckCircle2 size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">ได้งานแล้ว</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{offers}</p>
        </div>
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
          <CheckCircle2 size={24} />
        </div>
      </div>
    </div>
  );
};
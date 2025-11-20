import React, { useState, useEffect } from 'react';
import { JobApplication, JobStatus } from '../types';
import { X, Sparkles, Loader2, ChevronDown, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: JobApplication) => void;
  job: JobApplication | null;
}

export const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, onSave, job }) => {
  const [formData, setFormData] = useState<JobApplication>({
    id: '',
    company: '',
    position: '',
    salary: '',
    dateApplied: new Date().toISOString().split('T')[0],
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: new Date().toISOString().split('T')[0],
    contact: '',
    notes: '',
    jobDescription: ''
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        id: crypto.randomUUID(),
        company: '',
        position: '',
        salary: '',
        dateApplied: new Date().toISOString().split('T')[0],
        channel: 'JobThai',
        status: JobStatus.APPLIED,
        dateUpdated: new Date().toISOString().split('T')[0],
        contact: '',
        notes: '',
        jobDescription: ''
      });
    }
    setAiResponse(null);
  }, [job, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAnalyzeJD = async () => {
    if (!formData.jobDescription && !formData.position) return;
    
    setAiLoading(true);
    setAiResponse(null);

    try {
      // ใช้ process.env.API_KEY โดยตรงสำหรับการใช้งานทั่วไป
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("ไม่พบ API Key");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      let prompt = `I am applying for the position of "${formData.position}" at "${formData.company}". `;
      if (formData.jobDescription) {
        prompt += `Here is the job description:\n${formData.jobDescription}\n\n`;
        prompt += `Please analyze this job description and provide:
1. A summary of the key 3 skills required.
2. 3 potential interview questions specific to this role.
3. A short advice on how to stand out for this application.
Answer in Thai.`;
      } else {
        prompt += `I don't have the full job description yet. Please provide general advice for this role and 3 common interview questions for this position in Thai.`;
      }

      // ใช้โมเดล gemini-2.5-flash ตามมาตรฐานล่าสุด
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAiResponse(response.text || 'AI ไม่สามารถสร้างคำตอบได้ในขณะนี้');
    } catch (error: any) {
      console.error('Error calling Gemini:', error);
      
      let errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI';
      const errorStr = error.toString();

      if (errorStr.includes('404')) {
         errorMessage = 'ไม่พบ Model (404): กรุณาลองใหม่อีกครั้ง';
      } else if (errorStr.includes('403') || errorStr.includes('API key')) {
         errorMessage = 'API Key ไม่ถูกต้อง (403): ตรวจสอบการตั้งค่า Key';
      } else if (errorStr.includes('quota') || errorStr.includes('429')) {
        errorMessage = 'ใช้งานเกินโควต้า (Quota Exceeded): กรุณารอสักครู่แล้วลองใหม่';
      }
      
      setAiResponse(`⚠️ ${errorMessage}`);
    } finally {
      setAiLoading(false);
    }
  };

  if (!isOpen) return null;

  const isError = aiResponse?.startsWith('⚠️');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white z-10 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {job ? 'แก้ไขข้อมูลการสมัครงาน' : 'เพิ่มงานใหม่'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">ข้อมูลทั่วไป</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">บริษัท</label>
                <input
                  required
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="ระบุชื่อบริษัท"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ตำแหน่ง</label>
                <input
                  required
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="ระบุตำแหน่งงาน"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">เงินเดือน</label>
                  <input
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="ระบุเงินเดือน"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ช่องทาง</label>
                  <input
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="เช่น JobThai, LinkedIn"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">วันที่สมัคร</label>
                  <input
                    type="date"
                    name="dateApplied"
                    value={formData.dateApplied}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">สถานะ</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white appearance-none text-slate-700"
                    >
                      {Object.values(JobStatus).map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ข้อมูลติดต่อ</label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="เบอร์โทร หรือ อีเมล"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">หมายเหตุ</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="บันทึกเพิ่มเติม..."
                />
              </div>
            </div>

            {/* Right Column: JD & AI */}
            <div className="space-y-4 flex flex-col h-full">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">รายละเอียดงาน (JD)</h3>
                 <button
                    type="button"
                    onClick={handleAnalyzeJD}
                    disabled={aiLoading || (!formData.position && !formData.jobDescription)}
                    className="flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    วิเคราะห์ด้วย AI
                 </button>
              </div>
              
              <div className="flex-1 flex flex-col gap-4">
                <div className="relative flex-1">
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    className="w-full h-full min-h-[200px] px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none text-sm leading-relaxed"
                    placeholder="วางรายละเอียดงาน (Job Description) ที่นี่ เพื่อให้ AI ช่วยวิเคราะห์..."
                  />
                </div>

                {aiResponse && (
                  <div className={`rounded-xl p-4 animate-fadeIn border ${
                    isError ? 'bg-red-50 border-red-100' : 'bg-indigo-50 border-indigo-100'
                  }`}>
                    <h4 className={`${
                      isError ? 'text-red-800' : 'text-indigo-800'
                    } font-semibold text-sm flex items-center gap-2 mb-2`}>
                      {isError ? <AlertCircle size={16} /> : <Sparkles size={16} />}
                      {isError ? 'เกิดข้อผิดพลาด' : 'คำแนะนำจาก AI'}
                    </h4>
                    <div className={`text-sm whitespace-pre-wrap leading-relaxed ${
                      isError ? 'text-red-700' : 'text-slate-700'
                    }`}>
                      {aiResponse}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-md shadow-blue-200 transition-all"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
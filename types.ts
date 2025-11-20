export enum JobStatus {
  APPLIED = 'สมัครแล้ว',
  VIEWED = 'บริษัทดูเรซูเม่แล้ว',
  INTERVIEW_SCHEDULED = 'นัดสัมภาษณ์',
  INTERVIEWED = 'สัมภาษณ์แล้ว รอผล',
  OFFER = 'ผ่านสัมภาษณ์ / เสนองาน',
  GHOSTED = 'บริษัทเงียบ / ไม่ติดต่อ',
  REJECTED = 'ไม่ผ่าน',
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  salary: string;
  dateApplied: string;
  channel: string;
  status: JobStatus | string;
  dateUpdated: string;
  contact: string;
  notes: string;
  jobDescription: string;
}

export const INITIAL_JOBS: JobApplication[] = [
  {
    id: '1',
    company: 'บริษัท บี-ลุค จำกัด',
    position: 'Marketing',
    salary: 'ตามโครงสร้างบริษัท',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'สมัครผ่านเมลและส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '2',
    company: 'Incube',
    position: 'Creative Marketing',
    salary: 'ตามตกลง',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.INTERVIEWED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '3',
    company: 'PRTR Recruitment',
    position: 'Marketing Specialist',
    salary: '30K-35K',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '4',
    company: 'บริษัท ฟรีเวชั่น จำกัด',
    position: 'Digital Marketing Officer',
    salary: 'ตามโครงสร้างบริษัท',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'สมัครผ่านเมล, งานWFH',
    jobDescription: ''
  },
  {
    id: '5',
    company: 'บริษัท ทัดซ์ อินสไป จำกัด',
    position: 'Marketing & AI Content Specialist',
    salary: 'ตามตกลง',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'สมัครผ่านเมลและส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '6',
    company: 'บริษัท แอมทูบี มาร์เก็ตติ้ง จำกัด',
    position: 'Digital Marketing Executive',
    salary: 'ตามตกลง',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '7',
    company: 'บริษัท ไบฟรอส คอนเน็ค จำกัด',
    position: 'Creative',
    salary: 'ตามโครงสร้างบริษัท',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '8',
    company: 'บริษัท ดิจิตอลนุก จำกัด',
    position: 'ตัดต่อวิดีโอ & Graphic',
    salary: 'ตามประสบการณ์',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'สมัครผ่านเมล, งานWFH',
    jobDescription: ''
  },
  {
    id: '9',
    company: 'Demon Healthcare',
    position: 'เจ้าหน้าที่ยิงแอด',
    salary: 'ตามตกลง',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครยื่นPortfolioกับResume, งานWFH',
    jobDescription: ''
  },
  {
    id: '10',
    company: 'Line man Wongnai',
    position: 'Key Account Executive',
    salary: 'Up to 30K',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครยื่นPortfolioกับResume, งานWFH',
    jobDescription: ''
  },
  {
    id: '11',
    company: 'บริษัท พีเพิล แวลู โซลูชั่น จำกัด',
    position: 'Brand Manager / Marketing Manager',
    salary: '40K-50K',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '12',
    company: 'บริษัท ไบฟรอส คอนเน็ค จำกัด',
    position: 'Marketing Executives',
    salary: '25K-30K',
    dateApplied: '2025-11-18',
    channel: 'JobThai',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-18',
    contact: '',
    notes: 'ส่งสมัครด่วน, งานWFH',
    jobDescription: ''
  },
  {
    id: '13',
    company: 'บริษัท โนวิเทธ กรุ๊ป จำกัด',
    position: 'Digital Marketing',
    salary: 'ตามโครงสร้างบริษัท(เรียกไป 25K)',
    dateApplied: '2025-11-19',
    channel: 'jobsdb',
    status: JobStatus.APPLIED,
    dateUpdated: '2025-11-19',
    contact: '',
    notes: 'ส่งสมัครยื่นPortfolioกับResume, งานWFH',
    jobDescription: ''
  }
];
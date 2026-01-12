'use client';

import { useState } from 'react';

const taskLibrary = {
  core: {
    cdm: [
      { task: "Appoint Principal Designer", duration: "Before design", responsibility: "Client" },
      { task: "Appoint Principal Contractor", duration: "Before construction", responsibility: "Client" },
      { task: "Pre-construction information pack", duration: "5-10 days", responsibility: "Client/PD" },
      { task: "Construction Phase Plan", duration: "Before works start", responsibility: "PC" },
      { task: "F10 Notification to HSE", duration: "5 days before start", responsibility: "Client" },
      { task: "H&S File preparation", duration: "Throughout + handover", responsibility: "PD/PC" },
    ],
    asbestos: [
      { task: "Management survey review", duration: "2-3 days", responsibility: "Client" },
      { task: "Refurbishment & Demolition survey", duration: "5-15 days", responsibility: "Client" },
      { task: "Licensed removal (if required)", duration: "Variable", responsibility: "Licensed contractor" },
      { task: "Air clearance certification", duration: "1-2 days", responsibility: "Analyst" },
      { task: "Asbestos register update", duration: "Ongoing", responsibility: "Client" },
    ],
    hse: [
      { task: "Site-specific risk assessment", duration: "3-5 days", responsibility: "PC" },
      { task: "Method statements", duration: "2-5 days per trade", responsibility: "Contractors" },
      { task: "COSHH assessments", duration: "2-3 days", responsibility: "Contractors" },
    ]
  },
  hrb: {
    gateway1: [
      { task: "Fire Statement submission", duration: "With planning app", responsibility: "Applicant" },
      { task: "BSR consultation", duration: "15 working days", responsibility: "LPA" },
    ],
    gateway2: [
      { task: "Building Control application to BSR", duration: "8+ weeks", responsibility: "Client" },
      { task: "Competence declarations", duration: "With application", responsibility: "All dutyholders" },
      { task: "Construction control plan", duration: "With application", responsibility: "PC" },
      { task: "Change control plan", duration: "With application", responsibility: "Client/PC" },
      { task: "Fire & emergency file (initial)", duration: "With application", responsibility: "PD" },
      { task: "Golden thread setup", duration: "Before works", responsibility: "Client" },
      { task: "Start notice to BSR", duration: "5 days before start", responsibility: "Client" },
    ],
    gateway3: [
      { task: "Compliance declaration", duration: "At completion", responsibility: "PD/PC" },
      { task: "As-built drawings/info", duration: "Before certificate", responsibility: "PD/PC" },
      { task: "Golden thread handover", duration: "Before certificate", responsibility: "Client" },
      { task: "BSR final inspection", duration: "Within 8 weeks", responsibility: "BSR" },
      { task: "Completion certificate", duration: "After inspection", responsibility: "BSR" },
    ],
    ongoing: [
      { task: "Mandatory Occurrence Reports", duration: "Within 10 days", responsibility: "All dutyholders" },
      { task: "BSR inspections", duration: "Unannounced", responsibility: "BSR" },
      { task: "Golden thread maintenance", duration: "Ongoing", responsibility: "Client/PC" },
    ]
  },
  section20: {
    qualifyingWorks: [
      { task: "Notice of Intention (NOI)", duration: "Issue + 30 day period", responsibility: "Landlord" },
      { task: "Obtain estimates", duration: "20-40 days", responsibility: "Landlord" },
      { task: "Notice of Estimates", duration: "Issue + 30 day observation", responsibility: "Landlord" },
      { task: "Consider observations", duration: "5-10 days", responsibility: "Landlord" },
      { task: "Notice of Reasons (if not lowest)", duration: "With contract award", responsibility: "Landlord" },
      { task: "Statement of account", duration: "Within 18 months", responsibility: "Landlord" },
    ]
  },
  buildingControl: {
    standard: [
      { task: "Full Plans application", duration: "5-8 weeks", responsibility: "Client/Designer" },
      { task: "Staged inspections", duration: "Throughout", responsibility: "BC Body" },
      { task: "Completion certificate", duration: "At practical completion", responsibility: "BC Body" },
    ],
    fireSafety: [
      { task: "Fire risk assessment update", duration: "Before works", responsibility: "Responsible Person" },
      { task: "Interim fire safety measures", duration: "During works", responsibility: "PC" },
      { task: "Fire door certification", duration: "With installation", responsibility: "Installer" },
      { task: "Emergency lighting certification", duration: "At completion", responsibility: "Installer" },
      { task: "Fire alarm certification", duration: "At completion", responsibility: "Installer" },
    ]
  },
  listed: [
    { task: "Listed Building Consent", duration: "8-13 weeks", responsibility: "Client" },
    { task: "Conservation officer liaison", duration: "Ongoing", responsibility: "Designer" },
    { task: "Heritage impact assessment", duration: "10-20 days", responsibility: "Specialist" },
    { task: "Photographic record", duration: "Before + after", responsibility: "Contractor" },
  ],
  external: [
    { task: "Scaffolding licence", duration: "5-10 days", responsibility: "PC" },
    { task: "Road/footway closure", duration: "10-20 days", responsibility: "PC" },
    { task: "Party Wall notices", duration: "2 months minimum", responsibility: "Client" },
    { task: "Hoarding licence", duration: "5-10 days", responsibility: "PC" },
  ],
  occupied: [
    { task: "Decant assessment", duration: "10-20 days", responsibility: "Client" },
    { task: "Resident liaison plan", duration: "Before works", responsibility: "PC" },
    { task: "Access booking system", duration: "Setup + ongoing", responsibility: "PC" },
    { task: "Vulnerable resident protocol", duration: "Before works", responsibility: "Client/PC" },
  ],
  mAndE: [
    { task: "Electrical installation cert (EIC)", duration: "At completion", responsibility: "Electrician" },
    { task: "Gas Safe notification", duration: "At completion", responsibility: "Gas engineer" },
    { task: "Pressure systems certification", duration: "At completion", responsibility: "Engineer" },
    { task: "Ventilation commissioning", duration: "At completion", responsibility: "Installer" },
    { task: "Part L compliance", duration: "With design", responsibility: "Designer" },
  ]
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    buildingHeight: null,
    hasResidentialUnits: null,
    isListed: null,
    hasLeaseholders: null,
    costPerLeaseholder: null,
    workType: [],
    prePre2000: null,
    isOccupied: null,
    hasExternalWorks: null,
  });
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const toggleWorkType = (type) => {
    setAnswers(prev => ({
      ...prev,
      workType: prev.workType.includes(type) 
        ? prev.workType.filter(t => t !== type)
        : [...prev.workType, type]
    }));
  };

  const generateTasks = () => {
    let tasks = [];
    let phase = 1;

    tasks.push({ phase: phase, phaseName: "Pre-Construction", tasks: [] });
    
    if (answers.prePre2000) {
      tasks[phase-1].tasks.push(...taskLibrary.core.asbestos.map(t => ({ ...t, category: "Asbestos" })));
    }

    tasks[phase-1].tasks.push(...taskLibrary.core.cdm.map(t => ({ ...t, category: "CDM 2015" })));
    tasks[phase-1].tasks.push(...taskLibrary.core.hse.map(t => ({ ...t, category: "HSE" })));

    if (answers.isListed) {
      tasks[phase-1].tasks.push(...taskLibrary.listed.map(t => ({ ...t, category: "Heritage" })));
    }

    if (answers.hasLeaseholders && (answers.costPerLeaseholder === 'over250' || answers.costPerLeaseholder === 'unknown')) {
      phase++;
      tasks.push({ 
        phase: phase, 
        phaseName: "Section 20 Consultation", 
        tasks: taskLibrary.section20.qualifyingWorks.map(t => ({ ...t, category: "Section 20" }))
      });
    }

    if (answers.buildingHeight === 'hrb') {
      phase++;
      tasks.push({ 
        phase: phase, 
        phaseName: "BSA Gateway 1 - Planning", 
        tasks: taskLibrary.hrb.gateway1.map(t => ({ ...t, category: "Building Safety Act" }))
      });
      
      phase++;
      tasks.push({ 
        phase: phase, 
        phaseName: "BSA Gateway 2 - Before Construction", 
        tasks: taskLibrary.hrb.gateway2.map(t => ({ ...t, category: "Building Safety Act" }))
      });
    }

    if (answers.buildingHeight !== 'hrb') {
      phase++;
      tasks.push({ 
        phase: phase, 
        phaseName: "Building Control", 
        tasks: taskLibrary.buildingControl.standard.map(t => ({ ...t, category: "Building Regs" }))
      });
    }

    if (answers.hasExternalWorks) {
      phase++;
      tasks.push({ 
        phase: phase, 
        phaseName: "External Works Permits", 
        tasks: taskLibrary.external.map(t => ({ ...t, category: "Permits & Licences" }))
      });
    }

    phase++;
    let constructionTasks = [];
    
    if (answers.isOccupied) {
      constructionTasks.push(...taskLibrary.occupied.map(t => ({ ...t, category: "Occupied Works" })));
    }

    constructionTasks.push(...taskLibrary.buildingControl.fireSafety.map(t => ({ ...t, category: "Fire Safety" })));

    if (answers.buildingHeight === 'hrb') {
      constructionTasks.push(...taskLibrary.hrb.ongoing.map(t => ({ ...t, category: "BSA Ongoing" })));
    }

    tasks.push({ phase: phase, phaseName: "Construction Phase", tasks: constructionTasks });

    phase++;
    let completionTasks = [];

    if (answers.workType.includes('me')) {
      completionTasks.push(...taskLibrary.mAndE.map(t => ({ ...t, category: "M&E Certification" })));
    }

    if (answers.buildingHeight === 'hrb') {
      completionTasks.push(...taskLibrary.hrb.gateway3.map(t => ({ ...t, category: "BSA Gateway 3" })));
    }

    tasks.push({ phase: phase, phaseName: "Completion & Handover", tasks: completionTasks });

    setGeneratedTasks(tasks.filter(p => p.tasks.length > 0));
    setShowResults(true);
  };

  const exportToCSV = () => {
    let csv = "Phase,Phase Name,Category,Task,Duration,Responsibility\n";
    generatedTasks.forEach(phase => {
      phase.tasks.forEach(task => {
        csv += `${phase.phase},"${phase.phaseName}","${task.category}","${task.task}","${task.duration}","${task.responsibility}"\n`;
      });
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'programme-tasks.csv';
    a.click();
  };

  const questions = [
    {
      title: "Building Classification",
      subtitle: "What is the building height?",
      options: [
        { value: 'hrb', label: '≥18m or ≥7 storeys', desc: 'Higher-Risk Building - Full BSA regime' },
        { value: 'relevant', label: '11-18m or 5-6 storeys', desc: 'Relevant Building - Fire Safety Act applies' },
        { value: 'standard', label: '<11m', desc: 'Standard - Building Regs + CDM' },
      ],
      key: 'buildingHeight'
    },
    {
      title: "Building Classification",
      subtitle: "Does the building contain 2+ residential units?",
      options: [
        { value: true, label: 'Yes', desc: 'Residential building' },
        { value: false, label: 'No', desc: 'Non-residential or single dwelling' },
      ],
      key: 'hasResidentialUnits'
    },
    {
      title: "Building Classification",
      subtitle: "Is the building listed or in a conservation area?",
      options: [
        { value: true, label: 'Yes', desc: 'Heritage consent requirements apply' },
        { value: false, label: 'No', desc: 'Standard planning route' },
      ],
      key: 'isListed'
    },
    {
      title: "Tenure Mix",
      subtitle: "Are there leaseholders in the building?",
      options: [
        { value: true, label: 'Yes', desc: 'Section 20 consultation may apply' },
        { value: false, label: 'No', desc: 'Tenanted or freehold only' },
      ],
      key: 'hasLeaseholders'
    },
    {
      title: "Tenure Mix",
      subtitle: "Will works cost exceed £250 per leaseholder?",
      options: [
        { value: 'over250', label: 'Yes, over £250', desc: 'Full Section 20 consultation required' },
        { value: 'under250', label: 'No, under £250', desc: 'No consultation required' },
        { value: 'unknown', label: 'Not yet known', desc: 'Include consultation to be safe' },
      ],
      key: 'costPerLeaseholder',
      condition: () => answers.hasLeaseholders
    },
    {
      title: "Work Type",
      subtitle: "Select all work types that apply:",
      multiSelect: true,
      options: [
        { value: 'me', label: 'Mechanical & Electrical', desc: 'Heating, ventilation, electrical systems' },
        { value: 'structural', label: 'Structural', desc: 'Load-bearing elements, foundations' },
        { value: 'external', label: 'External envelope', desc: 'Roof, cladding, windows' },
        { value: 'internal', label: 'Internal refurbishment', desc: 'Kitchens, bathrooms, decoration' },
      ],
      key: 'workType'
    },
    {
      title: "Building Age",
      subtitle: "Was the building constructed before 2000?",
      options: [
        { value: true, label: 'Yes, pre-2000', desc: 'Asbestos R&D survey mandatory' },
        { value: false, label: 'No, 2000 or later', desc: 'Asbestos unlikely but check' },
      ],
      key: 'prePre2000'
    },
    {
      title: "Occupancy",
      subtitle: "Will the building be occupied during works?",
      options: [
        { value: true, label: 'Yes, occupied', desc: 'Decant and resident liaison protocols required' },
        { value: false, label: 'No, vacant', desc: 'Standard site protocols' },
      ],
      key: 'isOccupied'
    },
    {
      title: "External Works",
      subtitle: "Will works require scaffolding on highways or road closures?",
      options: [
        { value: true, label: 'Yes', desc: 'Permits and licences required' },
        { value: false, label: 'No', desc: 'Works contained within site' },
      ],
      key: 'hasExternalWorks'
    },
  ];

  const activeQuestions = questions.filter(q => !q.condition || q.condition());
  const currentQuestion = activeQuestions[step];
  const isLastStep = step === activeQuestions.length - 1;

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.multiSelect) {
      return answers[currentQuestion.key]?.length > 0;
    }
    return answers[currentQuestion.key] !== null && answers[currentQuestion.key] !== undefined;
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4 md:mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">Generated Task Sequence</h1>
                <p className="text-slate-500 text-sm md:text-base">
                  {generatedTasks.reduce((acc, p) => acc + p.tasks.length, 0)} tasks across {generatedTasks.length} phases
                </p>
              </div>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={exportToCSV}
                  className="px-3 md:px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition font-medium"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => { setShowResults(false); setStep(0); setAnswers({
                    buildingHeight: null, hasResidentialUnits: null, isListed: null,
                    hasLeaseholders: null, costPerLeaseholder: null, workType: [],
                    prePre2000: null, isOccupied: null, hasExternalWorks: null,
                  }); }}
                  className="px-3 md:px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition font-medium"
                >
                  Start New
                </button>
              </div>
            </div>

            <div className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">Classification Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
                <div><span className="text-blue-600">Building:</span> <span className="font-medium">{answers.buildingHeight === 'hrb' ? 'HRB' : answers.buildingHeight === 'relevant' ? 'Relevant' : 'Standard'}</span></div>
                <div><span className="text-blue-600">Listed:</span> <span className="font-medium">{answers.isListed ? 'Yes' : 'No'}</span></div>
                <div><span className="text-blue-600">Leaseholders:</span> <span className="font-medium">{answers.hasLeaseholders ? 'Yes' : 'No'}</span></div>
                <div><span className="text-blue-600">Occupied:</span> <span className="font-medium">{answers.isOccupied ? 'Yes' : 'No'}</span></div>
              </div>
            </div>
          </div>

          {generatedTasks.map((phase, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-slate-200 mb-3 md:mb-4 overflow-hidden">
              <div className="bg-slate-800 text-white px-4 md:px-6 py-2 md:py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="bg-white text-slate-800 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm">
                    {phase.phase}
                  </span>
                  <h2 className="font-semibold text-sm md:text-base">{phase.phaseName}</h2>
                </div>
                <span className="text-slate-300 text-xs md:text-sm">{phase.tasks.length} tasks</span>
              </div>
              <div className="divide-y divide-slate-100">
                {phase.tasks.map((task, tIdx) => (
                  <div key={tIdx} className="px-4 md:px-6 py-2 md:py-3 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-slate-50 gap-1 md:gap-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium px-1.5 md:px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {task.category}
                        </span>
                        <span className="font-medium text-slate-800 text-sm">{task.task}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
                      <span className="text-slate-500">{task.duration}</span>
                      <span className="text-slate-600 font-medium md:w-32 md:text-right">{task.responsibility}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 text-xs md:text-sm">
              <strong>Note:</strong> This task sequence is generated based on the information provided. 
              Actual durations may vary. Always verify against current legislation.
            </p>
          </div>
          
          <div className="mt-6 text-center text-slate-400 text-xs">
            © Ubiqs Property Limited
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Programme Task Sequencer</h1>
          <p className="text-slate-500 text-sm md:text-base">Ubiqs Property Limited</p>
        </div>

        <div className="mb-4 md:mb-6">
          <div className="flex justify-between text-xs md:text-sm text-slate-500 mb-1 md:mb-2">
            <span>Question {step + 1} of {activeQuestions.length}</span>
            <span>{Math.round(((step + 1) / activeQuestions.length) * 100)}%</span>
          </div>
          <div className="h-1.5 md:h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((step + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-8">
          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm font-medium text-blue-600 mb-1">{currentQuestion?.title}</p>
            <h2 className="text-lg md:text-xl font-semibold text-slate-800">{currentQuestion?.subtitle}</h2>
          </div>

          <div className="space-y-2 md:space-y-3">
            {currentQuestion?.options.map((option, idx) => {
              const isSelected = currentQuestion.multiSelect 
                ? answers[currentQuestion.key]?.includes(option.value)
                : answers[currentQuestion.key] === option.value;
              
              return (
                <button
                  key={idx}
                  onClick={() => currentQuestion.multiSelect 
                    ? toggleWorkType(option.value) 
                    : updateAnswer(currentQuestion.key, option.value)
                  }
                  className={`w-full p-3 md:p-4 rounded-lg border-2 text-left transition ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-800 text-sm md:text-base">{option.label}</div>
                      <div className="text-xs md:text-sm text-slate-500">{option.desc}</div>
                    </div>
                    <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 md:px-6 py-2 text-slate-600 text-sm md:text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:text-slate-800 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => isLastStep ? generateTasks() : setStep(s => s + 1)}
              disabled={!canProceed()}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white text-sm md:text-base rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition"
            >
              {isLastStep ? 'Generate Tasks' : 'Next →'}
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-slate-400 text-xs">
          © Ubiqs Property Limited
        </div>
      </div>
    </div>
  );
}

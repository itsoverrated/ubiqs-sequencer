"use client";
import { useState } from "react";

const allTasks = [
  { phase: 1, phaseName: "Pre-Construction", category: "Asbestos", task: "Management survey review", duration: "2-3 days", responsibility: "Client", riba: 1 },
  { phase: 1, phaseName: "Pre-Construction", category: "Asbestos", task: "Refurbishment & Demolition survey", duration: "5-15 days", responsibility: "Client", riba: 1 },
  { phase: 1, phaseName: "Pre-Construction", category: "Asbestos", task: "Licensed removal (if required)", duration: "Variable", responsibility: "Licensed contractor", riba: 5 },
  { phase: 1, phaseName: "Pre-Construction", category: "Asbestos", task: "Air clearance certification", duration: "1-2 days", responsibility: "Analyst", riba: 5 },
  { phase: 1, phaseName: "Pre-Construction", category: "Asbestos", task: "Asbestos register update", duration: "Ongoing", responsibility: "Client", riba: 7 },
  { phase: 1, phaseName: "Pre-Construction", category: "CDM 2015", task: "Appoint Principal Designer", duration: "Before design", responsibility: "Client", riba: 2 },
  { phase: 1, phaseName: "Pre-Construction", category: "CDM 2015", task: "Appoint Principal Contractor", duration: "Before construction", responsibility: "Client", riba: 4 },
  { phase: 1, phaseName: "Pre-Construction", category: "CDM 2015", task: "Pre-construction information pack", duration: "5-10 days", responsibility: "Client/PD", riba: 3 },
  { phase: 1, phaseName: "Pre-Construction", category: "CDM 2015", task: "Construction Phase Plan", duration: "Before works start", responsibility: "PC", riba: 4 },
  { phase: 1, phaseName: "Pre-Construction", category: "CDM 2015", task: "F10 Notification to HSE", duration: "5 days before start", responsibility: "Client", riba: 5 },
  { phase: 1, phaseName: "Pre-Construction", category: "CDM 2015", task: "H&S File preparation", duration: "Throughout + handover", responsibility: "PD/PC", riba: 6 },
  { phase: 1, phaseName: "Pre-Construction", category: "HSE", task: "Site-specific risk assessment", duration: "3-5 days", responsibility: "PC", riba: 4 },
  { phase: 1, phaseName: "Pre-Construction", category: "HSE", task: "Method statements", duration: "2-5 days per trade", responsibility: "Contractors", riba: 4 },
  { phase: 1, phaseName: "Pre-Construction", category: "HSE", task: "COSHH assessments", duration: "2-3 days", responsibility: "Contractors", riba: 4 },
  { phase: 2, phaseName: "Section 20 Consultation", category: "Section 20", task: "Notice of Intention (NOI)", duration: "Issue + 30 day period", responsibility: "Landlord", riba: 3 },
  { phase: 2, phaseName: "Section 20 Consultation", category: "Section 20", task: "Obtain estimates", duration: "20-40 days", responsibility: "Landlord", riba: 4 },
  { phase: 2, phaseName: "Section 20 Consultation", category: "Section 20", task: "Notice of Estimates", duration: "Issue + 30 day observation", responsibility: "Landlord", riba: 4 },
  { phase: 2, phaseName: "Section 20 Consultation", category: "Section 20", task: "Consider observations", duration: "5-10 days", responsibility: "Landlord", riba: 4 },
  { phase: 2, phaseName: "Section 20 Consultation", category: "Section 20", task: "Notice of Reasons (if not lowest)", duration: "With contract award", responsibility: "Landlord", riba: 4 },
  { phase: 2, phaseName: "Section 20 Consultation", category: "Section 20", task: "Statement of account", duration: "Within 18 months", responsibility: "Landlord", riba: 7 },
  { phase: 3, phaseName: "Building Control", category: "Building Regs", task: "Full Plans application", duration: "5-8 weeks", responsibility: "Client/Designer", riba: 4 },
  { phase: 3, phaseName: "Building Control", category: "Building Regs", task: "Staged inspections", duration: "Throughout", responsibility: "BC Body", riba: 5 },
  { phase: 3, phaseName: "Building Control", category: "Building Regs", task: "Completion certificate", duration: "At practical completion", responsibility: "BC Body", riba: 6 },
  { phase: 4, phaseName: "External Works Permits", category: "Permits & Licences", task: "Scaffolding licence", duration: "5-10 days", responsibility: "PC", riba: 5 },
  { phase: 4, phaseName: "External Works Permits", category: "Permits & Licences", task: "Road/footway closure", duration: "10-20 days", responsibility: "PC", riba: 5 },
  { phase: 4, phaseName: "External Works Permits", category: "Permits & Licences", task: "Party Wall notices", duration: "2 months minimum", responsibility: "Client", riba: 3 },
  { phase: 4, phaseName: "External Works Permits", category: "Permits & Licences", task: "Hoarding licence", duration: "5-10 days", responsibility: "PC", riba: 5 },
  { phase: 5, phaseName: "Construction Phase", category: "Occupied Works", task: "Decant assessment", duration: "10-20 days", responsibility: "Client", riba: 3 },
  { phase: 5, phaseName: "Construction Phase", category: "Occupied Works", task: "Resident liaison plan", duration: "Before works", responsibility: "PC", riba: 4 },
  { phase: 5, phaseName: "Construction Phase", category: "Occupied Works", task: "Access booking system", duration: "Setup + ongoing", responsibility: "PC", riba: 5 },
  { phase: 5, phaseName: "Construction Phase", category: "Occupied Works", task: "Vulnerable resident protocol", duration: "Before works", responsibility: "Client/PC", riba: 4 },
  { phase: 5, phaseName: "Construction Phase", category: "Fire Safety", task: "Fire risk assessment update", duration: "Before works", responsibility: "Responsible Person", riba: 4 },
  { phase: 5, phaseName: "Construction Phase", category: "Fire Safety", task: "Interim fire safety measures", duration: "During works", responsibility: "PC", riba: 5 },
  { phase: 5, phaseName: "Construction Phase", category: "Fire Safety", task: "Fire door certification", duration: "With installation", responsibility: "Installer", riba: 5 },
  { phase: 5, phaseName: "Construction Phase", category: "Fire Safety", task: "Emergency lighting certification", duration: "At completion", responsibility: "Installer", riba: 6 },
  { phase: 5, phaseName: "Construction Phase", category: "Fire Safety", task: "Fire alarm certification", duration: "At completion", responsibility: "Installer", riba: 6 },
  { phase: 6, phaseName: "Completion & Handover", category: "M&E Certification", task: "Electrical installation cert (EIC)", duration: "At completion", responsibility: "Electrician", riba: 6 },
  { phase: 6, phaseName: "Completion & Handover", category: "M&E Certification", task: "Gas Safe notification", duration: "At completion", responsibility: "Gas engineer", riba: 6 },
  { phase: 6, phaseName: "Completion & Handover", category: "M&E Certification", task: "Pressure systems certification", duration: "At completion", responsibility: "Engineer", riba: 6 },
  { phase: 6, phaseName: "Completion & Handover", category: "M&E Certification", task: "Ventilation commissioning", duration: "At completion", responsibility: "Installer", riba: 6 },
  { phase: 6, phaseName: "Completion & Handover", category: "M&E Certification", task: "Part L compliance", duration: "With design", responsibility: "Designer", riba: 4 },
];

const ribaStages = {
  0: "Strategic Definition",
  1: "Preparation & Briefing",
  2: "Concept Design",
  3: "Spatial Coordination",
  4: "Technical Design",
  5: "Manufacturing & Construction",
  6: "Handover",
  7: "Use"
};

const steps = [
  {
    title: "Building Type",
    description: "What type of building is this project for?",
    options: [
      { id: "hrb", label: "Higher-Risk Building (18m+ / 7+ storeys)", description: "Additional Building Safety Act requirements" },
      { id: "standard", label: "Standard Residential", description: "Standard compliance requirements" },
      { id: "commercial", label: "Commercial / Mixed Use", description: "May require additional permits" },
    ],
  },
  {
    title: "Leaseholder Impact",
    description: "Will leaseholders be charged for this work?",
    options: [
      { id: "s20_full", label: "Yes - Full Section 20 Required", description: "Works exceed £250 per leaseholder" },
      { id: "s20_partial", label: "Yes - But under threshold", description: "Works under £250 per leaseholder" },
      { id: "no_leaseholders", label: "No leaseholders affected", description: "Tenanted or freehold only" },
    ],
  },
  {
    title: "Asbestos Status",
    description: "What is the asbestos status of the building?",
    options: [
      { id: "asbestos_known", label: "Asbestos present - survey exists", description: "R&D survey may still be needed" },
      { id: "asbestos_unknown", label: "Unknown - survey required", description: "Management survey needed first" },
      { id: "asbestos_clear", label: "Confirmed asbestos-free", description: "Recent survey confirms no ACMs" },
    ],
  },
  {
    title: "Work Location",
    description: "Where will the works take place?",
    options: [
      { id: "external", label: "External works only", description: "Roof, facade, windows, grounds" },
      { id: "internal_communal", label: "Internal communal areas", description: "Corridors, stairwells, plant rooms" },
      { id: "internal_dwelling", label: "Inside dwellings", description: "Kitchens, bathrooms, rewires" },
      { id: "mixed", label: "Mixed internal and external", description: "Multiple work areas" },
    ],
    multi: true,
  },
  {
    title: "Occupied Building",
    description: "Will residents remain during works?",
    options: [
      { id: "occupied", label: "Yes - building remains occupied", description: "Requires resident liaison plan" },
      { id: "decant", label: "Partial decant required", description: "Some residents temporarily moved" },
      { id: "vacant", label: "Building is vacant", description: "No residents during works" },
    ],
  },
];

export default function ProgrammeSequencer() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [tasks, setTasks] = useState(null);
  const [viewMode, setViewMode] = useState("phase"); // "phase" or "riba"

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleSelect = (optionId) => {
    if (currentStep.multi) {
      const current = selections[step] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      setSelections({ ...selections, [step]: updated });
    } else {
      setSelections({ ...selections, [step]: optionId });
    }
  };

  const isSelected = (optionId) => {
    if (currentStep.multi) {
      return (selections[step] || []).includes(optionId);
    }
    return selections[step] === optionId;
  };

  const canProceed = () => {
    if (currentStep.multi) {
      return (selections[step] || []).length > 0;
    }
    return selections[step] !== undefined;
  };

  const generateTasks = () => {
    let filtered = [...allTasks];

    if (selections[0] !== "hrb") {
      filtered = filtered.filter((t) => !t.task.includes("Building Safety"));
    }

    if (selections[1] === "no_leaseholders" || selections[1] === "s20_partial") {
      filtered = filtered.filter((t) => t.category !== "Section 20");
    }

    if (selections[2] === "asbestos_clear") {
      filtered = filtered.filter((t) => t.category !== "Asbestos");
    }

    if (selections[4] === "vacant") {
      filtered = filtered.filter((t) => t.category !== "Occupied Works");
    }

    setTasks(filtered);
  };

  const downloadCSV = () => {
    const headers = ["RIBA Stage", "RIBA Stage Name", "Phase", "Phase Name", "Category", "Task", "Duration", "Responsibility"];
    const rows = tasks.map((t) => [
      t.riba,
      ribaStages[t.riba],
      t.phase,
      t.phaseName,
      t.category,
      t.task,
      t.duration,
      t.responsibility,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "programme-tasks.csv";
    a.click();
  };

  const groupedByPhase = tasks
    ? tasks.reduce((acc, t) => {
        const key = t.phaseName;
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
      }, {})
    : {};

  const groupedByRiba = tasks
    ? tasks.reduce((acc, t) => {
        const key = t.riba;
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
      }, {})
    : {};

  if (tasks) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Programme Tasks</h1>
                <p className="text-slate-500">{tasks.length} tasks generated</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("phase")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === "phase"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  By Phase
                </button>
                <button
                  onClick={() => setViewMode("riba")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === "riba"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  By RIBA Stage
                </button>
              </div>
            </div>

            {viewMode === "phase" ? (
              Object.entries(groupedByPhase).map(([phaseName, phaseTasks]) => (
                <div key={phaseName} className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-700 mb-3 pb-2 border-b">{phaseName}</h2>
                  <div className="space-y-2">
                    {phaseTasks.map((t, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-50 rounded-lg">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
                          RIBA {t.riba}
                        </span>
                        <div className="flex-1">
                          <span className="font-medium text-slate-800">{t.task}</span>
                          <span className="text-slate-400 mx-2">•</span>
                          <span className="text-sm text-slate-500">{t.category}</span>
                        </div>
                        <div className="text-sm text-slate-500 sm:text-right">
                          <span className="text-slate-400">{t.duration}</span>
                          <span className="text-slate-300 mx-2">|</span>
                          <span>{t.responsibility}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              Object.entries(groupedByRiba)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([ribaStage, ribaTasks]) => (
                  <div key={ribaStage} className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-700 mb-3 pb-2 border-b">
                      <span className="text-blue-600">Stage {ribaStage}</span> - {ribaStages[ribaStage]}
                    </h2>
                    <div className="space-y-2">
                      {ribaTasks.map((t, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-50 rounded-lg">
                          <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded w-fit">
                            {t.phaseName}
                          </span>
                          <div className="flex-1">
                            <span className="font-medium text-slate-800">{t.task}</span>
                            <span className="text-slate-400 mx-2">•</span>
                            <span className="text-sm text-slate-500">{t.category}</span>
                          </div>
                          <div className="text-sm text-slate-500 sm:text-right">
                            <span className="text-slate-400">{t.duration}</span>
                            <span className="text-slate-300 mx-2">|</span>
                            <span>{t.responsibility}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
              <button
                onClick={() => {
                  setTasks(null);
                  setStep(0);
                  setSelections({});
                }}
                className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
              >
                Start Over
              </button>
              <button
                onClick={downloadCSV}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Download CSV
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-slate-400 text-xs">© Ubiqs Property Limited</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Programme Sequencer</h1>
          <p className="text-slate-500">Generate your compliance task list</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-blue-600" : i < step ? "w-8 bg-blue-300" : "w-8 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">{currentStep.title}</h2>
          <p className="text-slate-500 mb-6">{currentStep.description}</p>

          <div className="space-y-3">
            {currentStep.options.map((option) => {
              const selected = isSelected(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    selected ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{option.label}</div>
                      <div className="text-sm text-slate-500 mt-1">{option.description}</div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selected ? "border-blue-600 bg-blue-600" : "border-slate-300"
                      }`}
                    >
                      {selected && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-6 py-2 text-slate-600 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:text-slate-800 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => (isLastStep ? generateTasks() : setStep((s) => s + 1))}
              disabled={!canProceed()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition"
            >
              {isLastStep ? "Generate Tasks" : "Next →"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-400 text-xs">© Ubiqs Property Limited</div>
      </div>
    </div>
  );
}

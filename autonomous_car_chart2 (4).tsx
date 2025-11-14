import React, { useState, useEffect } from 'react';
import { Cpu, Radio, Zap, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Chart2() {
  const [activeStep, setActiveStep] = useState(0);
  const [cycleRunning, setCycleRunning] = useState(true);

  const steps = [
    { id: 0, name: 'Sensing', color: 'bg-blue-500', icon: Radio },
    { id: 1, name: 'Processing', color: 'bg-purple-500', icon: Cpu },
    { id: 2, name: 'Acting', color: 'bg-green-500', icon: Zap },
    { id: 3, name: 'Feedback', color: 'bg-orange-500', icon: RotateCcw }
  ];

  useEffect(() => {
    if (!cycleRunning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, [cycleRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          WORKING MECHANISM & DATA FLOW
        </h1>
        <p className="text-2xl text-cyan-300">Sense → Decide → Act — The Intelligence Cycle</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
        
        {/* Left: Step-by-Step Operation */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-6 rounded-xl border border-cyan-500 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-cyan-300 flex items-center gap-3">
            <span className="text-4xl">⚙️</span>
            Step-by-Step Operation
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg border border-blue-400">
              <h3 className="text-xl font-bold mb-2 text-blue-300">1. Sensing the Path</h3>
              <p className="text-sm leading-relaxed">IR sensors detect black/white line contrast</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>→ Left sensor detects black = turn left</li>
                <li>→ Right sensor detects black = turn right</li>
                <li>→ Both read white = move straight</li>
              </ul>
            </div>

            <div className="bg-purple-900 bg-opacity-40 p-4 rounded-lg border border-purple-400">
              <h3 className="text-xl font-bold mb-2 text-purple-300">2. Detecting Obstacles</h3>
              <p className="text-sm leading-relaxed">Ultrasonic sensor measures distance ahead</p>
              <div className="mt-2 text-sm">
                <p className="font-semibold text-yellow-300">If obstacle too close:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Car stops</li>
                  <li>• Reverses slightly</li>
                  <li>• Turns to safe direction</li>
                  <li>• Continues path</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-900 bg-opacity-40 p-4 rounded-lg border border-green-400">
              <h3 className="text-xl font-bold mb-2 text-green-300">3. Movement Control</h3>
              <p className="text-sm leading-relaxed">Arduino processes inputs and sends signals to L293D Motor Driver IC, which runs DC motors accordingly</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-900 bg-opacity-30 rounded-lg border border-cyan-400">
            <p className="text-sm italic text-cyan-200">✳️ This entire process happens continuously — the car "thinks" in real time</p>
          </div>
        </div>

        {/* Center: Closed-Loop Data Flow */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-6 rounded-xl border border-purple-500 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-purple-300 flex items-center gap-3">
            <span className="text-4xl">🔄</span>
            System Architecture
          </h2>

          <div className="flex flex-col items-center justify-center space-y-4 my-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <React.Fragment key={step.id}>
                  <div
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-500 ${
                      isActive
                        ? `${step.color} border-white scale-105 shadow-2xl`
                        : 'bg-slate-700 border-slate-600 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-8 h-8 ${isActive ? 'animate-pulse' : ''}`} />
                      <div>
                        <h3 className="text-xl font-bold">{step.name}</h3>
                        <p className="text-sm mt-1">
                          {step.id === 0 && 'IR + Ultrasonic Sensors'}
                          {step.id === 1 && 'Arduino Logic Processing'}
                          {step.id === 2 && 'Motors via L293D Driver'}
                          {step.id === 3 && 'Environment Response'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-8 h-8 rotate-90 text-cyan-400 animate-bounce" />
                  )}
                </React.Fragment>
              );
            })}
            <RotateCcw className="w-8 h-8 text-orange-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <div className="mt-6 p-4 bg-purple-900 bg-opacity-30 rounded-lg border border-purple-400">
            <p className="text-sm text-center italic">This closed-loop feedback keeps the vehicle adaptive and self-correcting — just like real autonomous cars</p>
          </div>

          <button
            onClick={() => setCycleRunning(!cycleRunning)}
            className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors"
          >
            {cycleRunning ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </div>

        {/* Right: Decision Logic */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-6 rounded-xl border border-green-500 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-green-300 flex items-center gap-3">
            <span className="text-4xl">🧠</span>
            Decision Logic
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-700 bg-opacity-50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed mb-3">Pre-defined rules in Arduino code control motion. Each sensor reading is compared to threshold values.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">•</span>
                  <span>The program chooses action: Move / Turn / Stop / Reverse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">•</span>
                  <span>This logic represents the foundation of AI-based decision systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-yellow-500">
              <h3 className="text-lg font-bold mb-3 text-yellow-300 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Sample Pseudocode
              </h3>
              <pre className="text-xs font-mono bg-black bg-opacity-50 p-3 rounded overflow-x-auto">
{`IF obstacle < 10cm THEN
  stop()
  reverse()
  turn()
ELSE IF left_IR = BLACK THEN
  turnLeft()
ELSE IF right_IR = BLACK THEN
  turnRight()
ELSE
  moveForward()
END IF`}
              </pre>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-lg border border-cyan-400">
              <h3 className="text-lg font-bold mb-2 text-cyan-300">Sensor Thresholds</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Obstacle Distance:</span>
                  <span className="font-bold text-yellow-300">&lt; 10 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>IR Black Detection:</span>
                  <span className="font-bold text-yellow-300">&lt; 500 (analog)</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span className="font-bold text-yellow-300">~50 ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-cyan-900 to-blue-900 p-8 rounded-2xl border-2 border-cyan-400 shadow-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-cyan-200">🎯 Key Takeaway</h2>
        <p className="text-xl text-center leading-relaxed">
          The car continuously <span className="font-bold text-yellow-300">senses</span>, <span className="font-bold text-purple-300">analyzes</span>, and <span className="font-bold text-green-300">acts</span>, demonstrating the basic intelligence loop of an autonomous vehicle. This is the bridge between manual control and AI-driven automation.
        </p>
      </div>
    </div>
  );
}
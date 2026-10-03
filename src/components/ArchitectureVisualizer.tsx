import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface VisualizerProps {
  type: 'kubernetes' | 'aws';
}

export const ArchitectureVisualizer: React.FC<VisualizerProps> = ({ type }) => {
  // Simulator state for Kubernetes self-healing
  const [k8sStage, setK8sStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const k8sSteps = [
    { label: 'APPLICATION', desc: 'Active HTTP Traffic', status: 'normal' },
    { label: 'CONTAINER', desc: 'Docker Container Runtime', status: 'normal' },
    { label: 'KUBERNETES', desc: 'Pod Replica in Cluster', status: 'normal' },
    { label: 'HEALTH CHECK', desc: 'Liveness Probe Probing', status: 'normal' },
    { label: 'FAILURE DETECTED', desc: 'Exit Code 1 / Deadlock', status: 'alert' },
    { label: 'AUTOMATED REMEDIATION', desc: 'Kubelet Restarts Pod', status: 'remediating' },
    { label: 'SERVICE RECOVERED', desc: 'Traffic Restored • 0 Downtime', status: 'healthy' },
  ];

  const awsSteps = [
    { label: 'USER', desc: 'Client Request (HTTPS)', tag: 'Route 53' },
    { label: 'LOAD BALANCER', desc: 'AWS Application Load Balancer', tag: 'ALB / TLS' },
    { label: 'APPLICATION', desc: 'Ingress & Routing Controller', tag: 'Public Subnet' },
    { label: 'COMPUTE', desc: 'EC2 Multi-AZ Auto-Scaling', tag: 'Private Subnet' },
    { label: 'DATABASE / STORAGE', desc: 'S3 Buckets & Secure Storage', tag: 'IAM Encrypted' },
    { label: 'MONITORING', desc: 'CloudWatch Alarms & Metrics', tag: 'Telemetry' },
  ];

  const runK8sSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setK8sStage(0);

    const timeouts = [
      setTimeout(() => setK8sStage(1), 600),
      setTimeout(() => setK8sStage(2), 1200),
      setTimeout(() => setK8sStage(3), 1800),
      setTimeout(() => setK8sStage(4), 2600), // Failure detected
      setTimeout(() => setK8sStage(5), 3600), // Automated remediation
      setTimeout(() => {
        setK8sStage(6); // Recovered
        setIsSimulating(false);
      }, 4800),
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  if (type === 'kubernetes') {
    return (
      <div className="mt-8 p-6 md:p-8 rounded-3xl bg-[#0B0B0D] text-white border border-white/10 shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[#FF2E93] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93] animate-ping" />
              <span>LIVE ORCHESTRATION PIPELINE</span>
            </div>
            <h4 className="text-base sm:text-lg font-display font-bold text-white mt-1">
              Autonomous Self-Healing Sequence
            </h4>
          </div>

          <button
            onClick={runK8sSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-md ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-[#FF2E93] hover:bg-[#E01E7E] text-white'
            }`}
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>HEALING SIMULATION RUNNING...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>SIMULATE CRASH & AUTO-RECOVERY</span>
              </>
            )}
          </button>
        </div>

        {/* The Animated Horizontal/Vertical Pipeline */}
        <div className="pt-8 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[720px] gap-2">
            {k8sSteps.map((step, idx) => {
              const isActive = isSimulating ? k8sStage === idx : idx === 0 || idx === 6;
              const isPast = isSimulating ? k8sStage > idx : false;
              const isAlert = idx === 4 && (k8sStage === 4 || (!isSimulating && false));
              const isRemediating = idx === 5 && (k8sStage === 5 || (!isSimulating && false));
              const isHealthy = idx === 6 && (k8sStage === 6 || !isSimulating);

              return (
                <React.Fragment key={step.label}>
                  {/* Step Node */}
                  <div className="flex flex-col items-center text-center relative group min-w-[90px]">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border ${
                        isAlert
                          ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/40 scale-110'
                          : isRemediating
                          ? 'bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-500/40 scale-110'
                          : isHealthy
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                          : isActive
                          ? 'bg-[#FF2E93] text-white border-[#FF2E93] shadow-md scale-105'
                          : isPast
                          ? 'bg-white/10 text-white border-white/20'
                          : 'bg-white/5 text-gray-500 border-white/10'
                      }`}
                    >
                      {isAlert ? (
                        <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
                      ) : isHealthy ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <span>0{idx + 1}</span>
                      )}
                    </div>

                    <span
                      className={`mt-2 font-display text-[11px] font-bold tracking-tight uppercase transition-colors ${
                        isAlert
                          ? 'text-rose-400'
                          : isHealthy
                          ? 'text-emerald-400'
                          : isActive
                          ? 'text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500 mt-0.5 leading-tight">
                      {step.desc}
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  {idx < k8sSteps.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-1">
                      <div
                        className={`h-[2px] w-full transition-all duration-300 ${
                          isPast || isActive ? 'bg-[#FF2E93]' : 'bg-white/10'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Live Metrics Telemetry Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">HEALTH PROBE</span>
            <span className="text-white font-bold">TCP:8080 /healthz</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">FAILURE THRESHOLD</span>
            <span className="text-white font-bold">3 Consecutive Fails</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">REMEDIATION MTTR</span>
            <span className="text-[#FF2E93] font-bold">1.4s Autonomous</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">STATUS</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> RECOVERED
            </span>
          </div>
        </div>
      </div>
    );
  }

  // AWS Platform Architecture Visualizer
  return (
    <div className="mt-8 p-6 md:p-8 rounded-3xl bg-[#0B0B0D] text-white border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#FF9900] text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF9900]" />
            <span>AWS CLOUD INFRASTRUCTURE TOPOLOGY</span>
          </div>
          <h4 className="text-base sm:text-lg font-display font-bold text-white mt-1">
            2-Tier Isolated VPC & Telemetry Flow
          </h4>
        </div>
        <div className="text-xs font-mono text-gray-400">
          VPC: 10.0.0.0/16 • MULTI-AZ ACTIVE
        </div>
      </div>

      {/* The AWS Architecture Step Diagram */}
      <div className="pt-8 overflow-x-auto pb-4">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {awsSteps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center text-center relative group min-w-[95px]">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 group-hover:bg-[#FF9900]/20 text-white border border-white/15 group-hover:border-[#FF9900] flex items-center justify-center font-mono text-xs font-bold transition-all duration-300">
                  <span>0{idx + 1}</span>
                </div>
                <span className="mt-2 font-display text-[11px] font-bold text-gray-200 group-hover:text-white uppercase tracking-tight">
                  {step.label}
                </span>
                <span className="text-[9px] font-mono text-gray-400 mt-0.5 leading-tight">
                  {step.desc}
                </span>
                <span className="mt-1 text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#FF9900] border border-white/10">
                  {step.tag}
                </span>
              </div>

              {idx < awsSteps.length - 1 && (
                <div className="flex-1 flex items-center justify-center px-1">
                  <div className="h-[2px] w-full bg-gradient-to-r from-white/10 via-[#FF9900]/40 to-white/10" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* AWS Security & Network Attributes */}
      <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-gray-500 block text-[10px]">INGRESS SECURITY</span>
          <span className="text-white font-bold">HTTPS (443) Only</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-gray-500 block text-[10px]">COMPUTE ISOLATION</span>
          <span className="text-white font-bold">Private Subnet + NAT</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-gray-500 block text-[10px]">STORAGE ENCRYPTION</span>
          <span className="text-white font-bold">AWS KMS SSE-S3</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-gray-500 block text-[10px]">OBSERVABILITY</span>
          <span className="text-[#FF9900] font-bold">CloudWatch Synthetics</span>
        </div>
      </div>
    </div>
  );
};

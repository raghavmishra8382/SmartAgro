import React, { useState, useCallback } from "react";
import {
  ListChecks, Plus, Trash2, CheckCircle2, Circle,
  Clock, Sparkles, CheckSquare, Target, Zap, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  loadTasks, addTask, deleteTask, toggleTask, Task,
} from "@/lib/taskStore";

type FilterType = "all" | "today" | "done" | "pending";
type PriorityType = Task["priority"];

const PRIORITY_CONFIG = {
  high:   { label: "Urgent", color: "text-rose-600",   bg: "bg-rose-100/80 border-rose-200/50",   dot: "bg-rose-500" },
  medium: { label: "Normal", color: "text-amber-600",  bg: "bg-amber-100/80 border-amber-200/50",  dot: "bg-amber-400" },
  low:    { label: "Low",    color: "text-emerald-600", bg: "bg-emerald-100/80 border-emerald-200/50", dot: "bg-emerald-500" },
};

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const pulseGlow = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: { opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
};

const taskVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }
};

const Tasks: React.FC = () => {
  const [tasks, setTasks]       = useState<Task[]>(() => loadTasks());
  const [filter, setFilter]     = useState<FilterType>("all");
  const [newLabel, setNewLabel] = useState("");
  const [newTime, setNewTime]   = useState("");
  const [newPriority, setNewPriority] = useState<PriorityType>("medium");
  const [showForm, setShowForm] = useState(false);

  const handleAdd = useCallback(() => {
    if (!newLabel.trim()) return;
    setTasks(addTask(newLabel, newTime || undefined, newPriority));
    setNewLabel(""); setNewTime(""); setNewPriority("medium");
    setShowForm(false);
  }, [newLabel, newTime, newPriority]);

  const handleToggle = useCallback((id: string) => setTasks(toggleTask(id)), []);
  const handleDelete = useCallback((id: string) => setTasks(deleteTask(id)), []);

  const filtered = tasks.filter(t => {
    if (filter === "done")    return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  const stats = {
    total:   tasks.length,
    done:    tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    high:    tasks.filter(t => t.priority === "high" && !t.done).length,
  };

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden selection:bg-violet-200">
      
      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div variants={pulseGlow} initial="initial" animate="animate" className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-violet-400/10 rounded-full blur-[120px]" />
        <motion.div variants={pulseGlow} initial="initial" animate="animate" className="absolute top-[30%] -right-[10%] w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px]" style={{ animationDelay: "2s" }} />
        <motion.div variants={pulseGlow} initial="initial" animate="animate" className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] bg-fuchsia-400/10 rounded-full blur-[150px]" style={{ animationDelay: "1s" }} />
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* ── Command Center (Hero) ── */}
        <motion.div variants={fadeUp} className="relative w-full rounded-[2.5rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 md:p-12 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
            {/* Header Info */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50/80 border border-violet-100/50 shadow-sm backdrop-blur-sm">
                <Target className="h-4 w-4 text-violet-600" />
                <span className="text-xs font-bold text-violet-800 tracking-wide uppercase">
                  Action Plan
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Farm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">Activities</span>
              </h1>
              <p className="text-lg text-gray-600/90 font-medium max-w-lg leading-relaxed">
                Stay on top of your agricultural operations. Track, manage, and complete your daily goals with precision.
              </p>
            </div>

            {/* Quick Add Button / Mini form */}
            <div className="flex-shrink-0 w-full xl:w-80">
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full relative group rounded-[2rem] bg-gray-900 text-white p-8 overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(139,92,246,0.25)] transition-all duration-500 hover:-translate-y-2 border border-gray-800 text-left"
                  >
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-violet-500/30 rounded-full blur-[60px] group-hover:bg-violet-400/50 transition-colors duration-700" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Plus className="h-6 w-6 text-violet-300" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-2">New Task</h3>
                      <p className="text-sm text-gray-400 font-medium">Create a new activity for today.</p>
                    </div>
                  </button>
                ) : (
                  <div className="w-full rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/80 shadow-2xl p-6 relative overflow-hidden transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl" />
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-violet-600" /> Create Task
                    </h3>
                    <div className="space-y-3 relative z-10">
                      <input
                        autoFocus
                        value={newLabel}
                        onChange={e => setNewLabel(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleAdd()}
                        placeholder="What needs to be done?"
                        className="w-full bg-white/50 backdrop-blur-sm border border-gray-200/80 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder-gray-400"
                      />
                      <input
                        value={newTime}
                        onChange={e => setNewTime(e.target.value)}
                        placeholder="Time (Optional)"
                        className="w-full bg-white/50 backdrop-blur-sm border border-gray-200/80 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder-gray-400"
                      />
                      <div className="flex gap-2">
                        {(["high", "medium", "low"] as PriorityType[]).map(p => (
                          <button
                            key={p}
                            onClick={() => setNewPriority(p)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                              newPriority === p
                                ? `${PRIORITY_CONFIG[p].bg} ${PRIORITY_CONFIG[p].color} shadow-inner border-transparent`
                                : "border-gray-200/60 bg-white/40 text-gray-500 hover:bg-white"
                            }`}
                          >
                            {PRIORITY_CONFIG[p].label}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleAdd}
                          disabled={!newLabel.trim()}
                          className="flex-1 bg-violet-600 text-white font-bold py-3 rounded-xl text-sm transition-all hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => { setShowForm(false); setNewLabel(""); }}
                          className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 text-sm font-bold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </motion.div>

        {/* ── Floating Stats Row ── */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Total Tasks",   value: stats.total,   icon: ListChecks, color: "text-gray-900", bg: "bg-gray-100/50", iconCol: "text-gray-600" },
            { label: "Pending", value: stats.pending, icon: Activity, color: "text-amber-600", bg: "bg-amber-100/50", iconCol: "text-amber-600" },
            { label: "Completed",    value: stats.done,    icon: CheckSquare, color: "text-emerald-600", bg: "bg-emerald-100/50", iconCol: "text-emerald-600" },
            { label: "Urgent",  value: stats.high,    icon: Zap, color: "text-rose-600", bg: "bg-rose-100/50", iconCol: "text-rose-600" },
          ].map((s, i) => (
            <motion.div key={s.label} whileHover={{ y: -5 }} className="rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 p-5 md:p-6 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all">
              <div className={`p-3 rounded-2xl ${s.bg} shadow-inner`}>
                <s.icon className={`h-6 w-6 ${s.iconCol}`} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                <h4 className={`text-3xl font-black ${s.color}`}>{s.value}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main Content Area ── */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 gap-8">
          
          {/* Tasks Container Wrapper */}
          <div className="rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg p-6 md:p-8 relative overflow-hidden min-h-[400px]">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-violet-400 to-transparent opacity-50" />
            
            {/* Filter Tabs - Premium Glassmorphism */}
            <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {(["all", "pending", "done"] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold capitalize transition-all whitespace-nowrap flex items-center gap-2 ${
                    filter === f
                      ? "bg-gray-900 text-white shadow-xl shadow-gray-900/20"
                      : "bg-white/50 text-gray-500 hover:bg-white/80 hover:text-gray-900 border border-white/40"
                  }`}
                >
                  {f}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === f ? "bg-white/20" : "bg-gray-200"}`}>
                    {f === "all" ? stats.total : f === "pending" ? stats.pending : stats.done}
                  </span>
                </button>
              ))}
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-24 h-24 bg-white/50 backdrop-blur-md rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-white/60">
                      <Sparkles className="h-10 w-10 text-violet-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">All caught up!</h3>
                    <p className="text-gray-500 font-medium max-w-sm">
                      {filter === "done" ? "You haven't completed any tasks yet." : "You have no pending tasks. Enjoy your day or add a new activity."}
                    </p>
                  </motion.div>
                ) : (
                  filtered.map(task => {
                    const pc = PRIORITY_CONFIG[task.priority];
                    return (
                      <motion.div
                        layout
                        variants={taskVariant}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        key={task.id}
                        className={`group relative flex items-center gap-4 bg-white/70 backdrop-blur-xl rounded-[1.5rem] border ${
                          task.done ? "border-gray-100 opacity-60" : "border-white"
                        } shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 md:p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white transition-all overflow-hidden`}
                      >
                        {/* Status Strip */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${task.done ? "bg-emerald-400" : pc.dot}`} />

                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggle(task.id)}
                          className="flex-shrink-0 transition-transform hover:scale-110 focus:outline-none ml-2"
                        >
                          {task.done
                            ? <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                            : <Circle className="h-7 w-7 text-gray-300 group-hover:text-violet-400 transition-colors" />}
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-4">
                          <p className={`text-base md:text-lg font-bold truncate transition-colors ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                            {task.label}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            {task.time && (
                              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold bg-gray-100/80 px-2.5 py-1 rounded-lg">
                                <Clock className="h-3.5 w-3.5" /> {task.time}
                              </span>
                            )}
                            {!task.done && (
                              <span className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${pc.bg} ${pc.color}`}>
                                <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${pc.dot}`} />
                                {pc.label}
                              </span>
                            )}
                            {task.done && (
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete Action */}
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="opacity-0 md:opacity-0 md:group-hover:opacity-100 mr-2 p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all focus:opacity-100"
                          aria-label="Delete task"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Tasks;

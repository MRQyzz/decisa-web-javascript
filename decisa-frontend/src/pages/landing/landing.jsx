import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  ArrowRight,
  Sparkles,
  Target,
  CheckSquare,
  TrendingUp,
  Brain,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    icon: Target,
    title: "Set Your Goal",
    description: "Tell Decisa what you want to achieve.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Get insights, timelines, and key areas.",
  },
  {
    icon: CheckSquare,
    title: "Actionable Tasks",
    description: "Turn AI suggestions into real tasks.",
  },
  {
    icon: TrendingUp,
    title: "Make Progress",
    description: "Stay organized and move toward your goals.",
  },
];
const technologies = [
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Prisma",
  "PostgreSQL",
];
export default function Landing() {
  const navigate = useNavigate();
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return _jsxs("div", {
    className: "min-h-screen overflow-x-hidden bg-[#09090B] text-white",
    children: [
      _jsxs("div", {
        className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        children: [
          _jsx("div", {
            className:
              "absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-[140px]",
          }),
          _jsx("div", {
            className:
              "absolute -left-40 top-[500px] h-[380px] w-[380px] rounded-full bg-blue-500/15 blur-[140px]",
          }),
          _jsx("div", {
            className:
              "absolute left-1/2 top-[280px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/[0.04] blur-[120px]",
          }),
        ],
      }),
      _jsx("header", {
        className: "relative z-50 border-b border-white/[0.06]",
        children: _jsxs("nav", {
          className:
            "mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10",
          children: [
            _jsxs("button", {
              onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
              className: "flex items-center gap-3",
              children: [
                _jsx("div", {
                  className:
                    "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-indigo-500/20",
                  children: _jsx(Sparkles, {
                    size: 16,
                    className: "text-white",
                  }),
                }),
                _jsx("span", {
                  className: "text-sm font-semibold tracking-[0.22em]",
                  children: "DECISA",
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "hidden items-center gap-8 text-sm text-zinc-400 md:flex",
              children: [
                _jsx("button", {
                  onClick: scrollToHowItWorks,
                  className: "transition hover:text-white",
                  children: "How It Works",
                }),
                _jsx("a", {
                  href: "#features",
                  className: "transition hover:text-white",
                  children: "Features",
                }),
                _jsx("a", {
                  href: "#about",
                  className: "transition hover:text-white",
                  children: "About",
                }),
              ],
            }),
            _jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                _jsx("button", {
                  onClick: () => navigate("/login"),
                  className:
                    "hidden rounded-full border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white sm:block",
                  children: "Sign In",
                }),
                _jsxs("button", {
                  onClick: () => navigate("/register"),
                  className:
                    "flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200",
                  children: ["Get Started", _jsx(ArrowRight, { size: 15 })],
                }),
              ],
            }),
          ],
        }),
      }),
      _jsxs("main", {
        children: [
          _jsxs("section", {
            className: "relative",
            children: [
              _jsx("div", {
                className:
                  "pointer-events-none absolute left-0 top-24 hidden h-40 w-[420px] -translate-x-1/3 -rotate-12 rounded-full border border-indigo-400/10 lg:block",
              }),
              _jsx("div", {
                className:
                  "pointer-events-none absolute right-0 top-80 hidden h-64 w-[420px] translate-x-1/3 rotate-12 rounded-full border border-blue-400/10 lg:block",
              }),
              _jsx("div", {
                className:
                  "pointer-events-none absolute left-[13%] top-52 hidden h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_20px_5px_rgba(96,165,250,0.35)] lg:block",
              }),
              _jsx("div", {
                className:
                  "pointer-events-none absolute right-[14%] top-[430px] hidden h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_20px_5px_rgba(129,140,248,0.35)] lg:block",
              }),
              _jsxs("div", {
                className:
                  "mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-24 text-center lg:px-10",
                children: [
                  _jsxs("div", {
                    className:
                      "mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl",
                    children: [
                      _jsx(Sparkles, { size: 14, className: "text-blue-400" }),
                      _jsx("span", { children: "Your Goals" }),
                      _jsx("span", {
                        className: "text-zinc-600",
                        children: "+",
                      }),
                      _jsx("span", { children: "AI" }),
                      _jsx("span", {
                        className: "text-zinc-600",
                        children: "=",
                      }),
                      _jsx("span", {
                        className: "text-white",
                        children: "Action",
                      }),
                    ],
                  }),
                  _jsxs("h1", {
                    className:
                      "max-w-5xl text-5xl font-medium tracking-[-0.04em] sm:text-6xl lg:text-8xl",
                    children: [
                      "Decide better.",
                      _jsx("br", {}),
                      _jsx("span", {
                        className:
                          "bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent",
                        children: "Do what matters.",
                      }),
                    ],
                  }),
                  _jsx("p", {
                    className:
                      "mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg",
                    children:
                      "Decisa turns your goals into clear, actionable plans with AI-powered guidance.",
                  }),
                  _jsxs("div", {
                    className:
                      "mt-10 flex flex-col items-center gap-3 sm:flex-row",
                    children: [
                      _jsxs("button", {
                        onClick: () => navigate("/register"),
                        className:
                          "group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-7 py-3.5 text-sm font-medium shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02] hover:shadow-indigo-500/30",
                        children: [
                          "Get Started",
                          _jsx(ArrowRight, {
                            size: 16,
                            className:
                              "transition-transform group-hover:translate-x-0.5",
                          }),
                        ],
                      }),
                      _jsxs("button", {
                        onClick: scrollToHowItWorks,
                        className:
                          "flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white",
                        children: [
                          "See How It Works",
                          _jsx(ChevronDown, { size: 16 }),
                        ],
                      }),
                    ],
                  }),
                  _jsx("div", {
                    id: "how-it-works",
                    className: "mt-28 w-full max-w-6xl scroll-mt-24",
                    children: _jsx("div", {
                      className:
                        "grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-0",
                      children: steps.map((step, index) => {
                        const Icon = step.icon;
                        return _jsxs(
                          "div",
                          {
                            className:
                              "relative flex flex-col items-center px-6",
                            children: [
                              index !== steps.length - 1 &&
                                _jsx("div", {
                                  className:
                                    "absolute left-[calc(50%+70px)] top-7 hidden h-px w-[calc(100%-140px)] bg-gradient-to-r from-white/10 to-white/[0.03] md:block",
                                }),
                              _jsx("div", {
                                className:
                                  "relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#111116] shadow-xl shadow-black/30",
                                children: _jsx(Icon, {
                                  size: 21,
                                  strokeWidth: 1.7,
                                  className: "text-zinc-200",
                                }),
                              }),
                              _jsx("h3", {
                                className: "mt-5 text-sm font-medium",
                                children: step.title,
                              }),
                              _jsx("p", {
                                className:
                                  "mt-2 max-w-[180px] text-xs leading-5 text-zinc-500",
                                children: step.description,
                              }),
                            ],
                          },
                          step.title,
                        );
                      }),
                    }),
                  }),
                  _jsxs("div", {
                    className:
                      "mt-20 flex items-center gap-3 text-xs text-zinc-600",
                    children: [
                      _jsx("div", {
                        className:
                          "flex h-7 w-7 items-center justify-center rounded-full border border-white/10",
                        children: _jsx(ChevronDown, { size: 14 }),
                      }),
                      _jsx("span", { children: "Scroll to explore" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsx("section", {
            id: "features",
            className: "border-t border-white/[0.06]",
            children: _jsxs("div", {
              className: "mx-auto max-w-7xl px-6 py-32 lg:px-10",
              children: [
                _jsxs("div", {
                  className: "max-w-xl",
                  children: [
                    _jsx("p", {
                      className:
                        "text-xs font-medium uppercase tracking-[0.2em] text-indigo-400",
                      children: "Built around your goals",
                    }),
                    _jsx("h2", {
                      className:
                        "mt-4 text-3xl font-medium tracking-tight sm:text-4xl",
                      children: "From intention to execution.",
                    }),
                    _jsx("p", {
                      className:
                        "mt-5 text-sm leading-6 text-zinc-500 sm:text-base",
                      children:
                        "Decisa helps you understand what you want to achieve and turn it into concrete actions you can actually work on.",
                    }),
                  ],
                }),
                _jsxs("div", {
                  className: "mt-16 grid gap-4 md:grid-cols-2",
                  children: [
                    _jsx(FeatureCard, {
                      icon: _jsx(Target, { size: 20 }),
                      title: "Goals",
                      description:
                        "Define meaningful goals with priorities and target dates.",
                    }),
                    _jsx(FeatureCard, {
                      icon: _jsx(Sparkles, { size: 20 }),
                      title: "AI Goal Analysis",
                      description:
                        "Let AI evaluate your goal and identify key areas, difficulty, and realistic timelines.",
                    }),
                    _jsx(FeatureCard, {
                      icon: _jsx(CheckSquare, { size: 20 }),
                      title: "Actionable Tasks",
                      description:
                        "Turn AI recommendations into tasks that you can accept, edit, and complete.",
                    }),
                    _jsx(FeatureCard, {
                      icon: _jsx(TrendingUp, { size: 20 }),
                      title: "Plans",
                      description:
                        "Organize your work and keep your tasks connected to bigger objectives.",
                    }),
                  ],
                }),
              ],
            }),
          }),
          _jsx("section", {
            id: "about",
            className: "border-t border-white/[0.06]",
            children: _jsx("div", {
              className: "mx-auto max-w-7xl px-6 py-32 lg:px-10",
              children: _jsxs("div", {
                className: "grid gap-16 lg:grid-cols-2 lg:items-center",
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx("p", {
                        className:
                          "text-xs font-medium uppercase tracking-[0.2em] text-blue-400",
                        children: "Why Decisa",
                      }),
                      _jsxs("h2", {
                        className:
                          "mt-4 text-3xl font-medium tracking-tight sm:text-5xl",
                        children: [
                          "A goal is only useful",
                          _jsx("br", {}),
                          "when you can act on it.",
                        ],
                      }),
                    ],
                  }),
                  _jsxs("div", {
                    children: [
                      _jsx("p", {
                        className: "text-base leading-8 text-zinc-500",
                        children:
                          "Big goals can easily become overwhelming. Decisa helps bridge the gap between knowing what you want and knowing what to do next.",
                      }),
                      _jsxs("button", {
                        onClick: () => navigate("/register"),
                        className:
                          "group mt-8 flex items-center gap-2 text-sm font-medium text-white",
                        children: [
                          "Start planning with Decisa",
                          _jsx(ArrowRight, {
                            size: 16,
                            className:
                              "transition-transform group-hover:translate-x-1",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          _jsx("section", {
            className: "border-t border-white/[0.06]",
            children: _jsxs("div", {
              className:
                "relative mx-auto max-w-7xl overflow-hidden px-6 py-32 text-center lg:px-10",
              children: [
                _jsx("div", {
                  className:
                    "pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]",
                }),
                _jsx("p", {
                  className: "text-xs uppercase tracking-[0.2em] text-zinc-500",
                  children: "Start today",
                }),
                _jsx("h2", {
                  className:
                    "mx-auto mt-5 max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl",
                  children: "Ready to make your next goal actionable?",
                }),
                _jsx("p", {
                  className:
                    "mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base",
                  children: "Turn your ideas into clear steps with Decisa.",
                }),
                _jsxs("button", {
                  onClick: () => navigate("/register"),
                  className:
                    "mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200",
                  children: ["Get Started", _jsx(ArrowRight, { size: 16 })],
                }),
              ],
            }),
          }),
        ],
      }),
      _jsx("footer", {
        className: "border-t border-white/[0.06]",
        children: _jsxs("div", {
          className: "mx-auto max-w-7xl px-6 py-10 lg:px-10",
          children: [
            _jsxs("div", {
              className:
                "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
              children: [
                _jsxs("div", {
                  children: [
                    _jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        _jsx("div", {
                          className:
                            "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500",
                          children: _jsx(Sparkles, { size: 14 }),
                        }),
                        _jsx("span", {
                          className: "text-sm font-semibold tracking-[0.2em]",
                          children: "DECISA",
                        }),
                      ],
                    }),
                    _jsx("p", {
                      className: "mt-3 text-xs text-zinc-600",
                      children: "Decide better. Do what matters.",
                    }),
                  ],
                }),
                _jsx("div", {
                  className: "flex flex-wrap items-center gap-x-6 gap-y-3",
                  children: technologies.map((tech, index) =>
                    _jsxs(
                      "div",
                      {
                        className: "flex items-center gap-6",
                        children: [
                          _jsx("span", {
                            className:
                              "text-xs text-zinc-600 transition hover:text-zinc-400",
                            children: tech,
                          }),
                          index !== technologies.length - 1 &&
                            _jsx("span", {
                              className:
                                "hidden h-4 w-px bg-white/[0.08] sm:block",
                            }),
                        ],
                      },
                      tech,
                    ),
                  ),
                }),
              ],
            }),
            _jsx("div", {
              className:
                "mt-10 border-t border-white/[0.05] pt-6 text-xs text-zinc-700",
              children: "\u00A9 2026 Decisa. Built with purpose.",
            }),
          ],
        }),
      }),
    ],
  });
}
/* -----------------------------
   Feature Card
------------------------------ */
function FeatureCard({ icon, title, description }) {
  return _jsxs("div", {
    className:
      "group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition duration-300 hover:border-indigo-400/20 hover:bg-white/[0.035]",
    children: [
      _jsx("div", {
        className:
          "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-indigo-300",
        children: icon,
      }),
      _jsx("h3", { className: "mt-6 text-base font-medium", children: title }),
      _jsx("p", {
        className: "mt-3 max-w-md text-sm leading-6 text-zinc-500",
        children: description,
      }),
    ],
  });
}

import { create } from "zustand";

export type GoalStatus = "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Returned for Rework";

export interface Goal {
  id: string;
  title: string;
  description: string;
  thrustArea: string;
  target: number;
  uom: string;
  weightage: number;
  status: GoalStatus;
  employeeId: string;
  managerId: string;
  employeeName: string;
}

interface GoalState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id" | "status">) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  submitGoalsForApproval: (employeeId: string) => void;
  approveGoal: (id: string) => void;
  rejectGoal: (id: string) => void;
}

// Mock initial data
const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Increase Q3 Sales",
    description: "Boost enterprise software sales by 15%",
    thrustArea: "Revenue",
    target: 15,
    uom: "%",
    weightage: 40,
    status: "Approved",
    employeeId: "emp-1",
    managerId: "mgr-1",
    employeeName: "Sarah Connor",
  },
  {
    id: "2",
    title: "Reduce Customer Churn",
    description: "Decrease churn rate from 5% to 3%",
    thrustArea: "Customer Success",
    target: 3,
    uom: "%",
    weightage: 30,
    status: "Pending Approval",
    employeeId: "emp-2",
    managerId: "mgr-1",
    employeeName: "John Doe",
  }
];

export const useGoalStore = create<GoalState>((set) => ({
  goals: initialGoals,
  
  addGoal: (goalData) => set((state) => ({
    goals: [
      ...state.goals,
      {
        ...goalData,
        id: Math.random().toString(36).substr(2, 9),
        status: "Draft",
      }
    ]
  })),

  updateGoal: (id, updates) => set((state) => ({
    goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g))
  })),

  removeGoal: (id) => set((state) => ({
    goals: state.goals.filter((g) => g.id !== id)
  })),

  submitGoalsForApproval: (employeeId) => set((state) => ({
    goals: state.goals.map((g) => 
      g.employeeId === employeeId && g.status === "Draft" 
        ? { ...g, status: "Pending Approval" } 
        : g
    )
  })),

  approveGoal: (id) => set((state) => ({
    goals: state.goals.map((g) => (g.id === id ? { ...g, status: "Approved" } : g))
  })),

  rejectGoal: (id) => set((state) => ({
    goals: state.goals.map((g) => (g.id === id ? { ...g, status: "Returned for Rework" } : g))
  })),
}));

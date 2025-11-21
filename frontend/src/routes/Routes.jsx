import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import Dashboards from "../pages/Dashboards.jsx";
import Expenses from "../pages/Expenses.jsx";
import { BudgetForm } from "../pages/Expenses.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/budget-form" element={<BudgetForm />} />
        </Routes>
    );
};
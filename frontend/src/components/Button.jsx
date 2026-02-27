import { Loader2 } from "lucide-react"; 

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  isLoading = false, 
  className = "", 
  icon: Icon 
}) {
  
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    outline: "bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10",
    danger: "bg-red-600 hover:bg-red-500 text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </button>
  );
}
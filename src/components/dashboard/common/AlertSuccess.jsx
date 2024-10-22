// components/dashboard/common/AlertSuccess.jsx
function AlertSuccess({ successMessage, onClose }) {
  return (
    <div className="w-full bg-zinc-200 dark:bg-zinc-950 border-l-4 border-green-500 flex items-center justify-between px-4 py-2 gap-8 shadow-sm rounded-md">
      <div className="flex items-center gap-4">
        <svg
          className="w-6 h-6 text-green-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <h2 className="text-black dark:text-white font-medium">Éxito</h2>
          <p className="text-sm text-green-500">
            {successMessage}
          </p>
        </div>
      </div>
      <button onClick={onClose}>
        <svg
          className="w-6 h-6 text-zinc-400 dark:text-zinc-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default AlertSuccess;

import { useState, useCallback, use } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { PopupType } from "../utils/props";

interface PopupState {
  isOpen: boolean;
  message: string;
  type: PopupType;
  title?: string;
}

interface PopupOptions {
  message: string;
  type?: PopupType;
  title?: string;
  duration?: number;
}

export function usePopup() {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    message: "",
    type: "info",
    title: undefined,
  });
  const [visible, setVisible] = useState<boolean>(false);

  const showPopup = useCallback(
    ({ message, type = "info", title, duration = 3000 }: PopupOptions) => {
      setPopup({
        isOpen: true,
        message,
        type,
        title,
      });
      

      setVisible(true);

      if (duration > 0) {
        setTimeout(() => {
          closePopup();
        }, duration);
      }
    },
    []
  );

  const closePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }, []);

  const PopupComponent = () => {
    if (!visible) return null;

    const icons = {
      success: <CheckCircle className="text-green-500" size={24} />,
      error: <AlertCircle className="text-red-500" size={24} />,
      info: <Info className="text-blue-500" size={24} />,
      warning: <AlertTriangle className="text-yellow-500" size={24} />,
    };

    const bgColors = {
      success: "bg-green-50 border-green-200",
      error: "bg-red-50 border-red-200",
      info: "bg-blue-50 border-blue-200",
      warning: "bg-yellow-50 border-yellow-200",
    };

    return (
      <div
        className={`fixed top-4 right-4 z-50  ${
          popup.isOpen
            ? "animate-in slide-in-from-top-[100px] duration-300"
            : "animate-out slide-out-to-top-[120px] duration-500"
        }  `}
      >
        <div
          className={`relative bg-white rounded-xl shadow-2xl p-6 border-2 ${
            bgColors[popup.type]
          } w-fit max-w-md`}
        >
          <button
            onClick={closePopup}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>

          <div className="flex flex-row items-center gap-3">
            <div>{icons[popup.type]}</div>
            <div className="text-left pr-6">
              {popup.title && (
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {popup.title}
                </h3>
              )}
              <p className="text-gray-700">{popup.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return {
    showPopup,
    visible,
    closePopup,
    PopupComponent,
  };
}

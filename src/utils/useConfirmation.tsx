import { useState } from "react";
import { Check, X } from "lucide-react";

type Color = "green" | "red";

interface ConfirmationConfig {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  color?: Color;
}
const colors = {
  green: "text-green-600 hover:bg-green-50",
  red: "text-red-600 hover:bg-red-50",
};

export function useConfirmation() {
  const [visible, setVisible] = useState<boolean>(false);
  const [texts, setTexts] = useState<string[]>([]);
  const [config, setConfig] = useState<ConfirmationConfig>({
    title: "",
    message: "",
    onConfirm: () => {},
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    color: "green",
  });

  const showConfirmation = ({
    title,
    message,
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    color,
  }: ConfirmationConfig) => {
    setConfig({ title, message, onConfirm, confirmText, cancelText, color });
    setTexts(message.split("!*#"));

    setVisible(true);
  };

  const handleConfirm = () => {
    config.onConfirm();
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const ConfirmationComponent = () => {
    if (!visible) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleCancel}
        />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {config.title}
            </h3>
          </div>

          <div className="px-6 pb-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              {texts.map((text, index) =>
                index % 2 === 0 ? (
                  text
                ) : (
                  <span className="font-bold">{text}</span>
                )
              )}
            </p>
          </div>

          <div className="flex border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <X size={16} />
              {config.cancelText}
            </button>
            <div className="w-px bg-gray-100" />
            <button
              onClick={handleConfirm}
              className={`flex-1 px-6 py-3 text-sm font-medium ${colors[config.color||"green"]} transition-colors flex items-center justify-center gap-2`}
            >
              <Check size={16} />
              {config.confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return { showConfirmation, ConfirmationComponent, visible };
}

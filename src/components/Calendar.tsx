import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

interface Props {
  date: Date;
  setDate: (date: Date | null) => void;
}

export default function Calendar({ date, setDate }: Props) {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
    <div
      onClick={onClick}
      className="w-[350px] px-4 py-3 h-[50px] border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500"
    >
      <span className="text-gray-700 capitalize select-none">
        {formatDate(date)}
      </span>
      <CalendarIcon size={20} className="text-gray-400" />
    </div>
  );

  return (
    <DatePicker
      selected={date}
      onChange={(d) => setDate(d)}
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
      locale={es}
      maxDate={new Date()}
      showPopperArrow={false}
      popperPlacement="bottom-start"
    />
  );
}
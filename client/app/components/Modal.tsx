import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white w-[360px] rounded-lg p-6 w-full max-w-md">
        <button
          className="absolute top-10 right-10 m-2 text-white text-3xl"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="text-center text-3xl font-bold mb-2">
          Ваша одежда готова!
        </div>
        <div className="text-center">Регистрация / Логин</div>
        <div className="flex flex-col">
          <Link href={"/login"}>
            <button className="px-4 py-2 bg-white text-[#254D32] font-semibold rounded border-2 mt-6  md:w-[100%]">
              Войти
            </button>
          </Link>
          <Link href={"/register"}>
            <button className="px-4 py-2 bg-[#254D32] text-white font-semibold rounded shadow-md mt-3  md:w-[100%]">
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;

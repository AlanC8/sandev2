import React from 'react';

interface MyModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({ visible, setVisible, children }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full mx-4">
        <div className="p-4">
          {children}
        </div>
        <div className="text-right p-4">
          <button
            onClick={() => setVisible(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;

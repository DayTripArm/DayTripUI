import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import ModalLogin from 'app/components/modals/ModalLogin';
import ModalRegister from 'app/components/modals/ModalRegister';
import ModalOnboarding from 'app/components/modals/ModalOnboarding';

const Modal5 = ({ onClose }) => (
  <Modal title='Title' size='sm' onClose={() => onClose(false)}>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci eget commodo ante sapien. Elit
      est facilisi in nunc, lorem laoreet mi sed nisl.
    </div>
    <div className='text-right mt-3'>
      <button className='btn btn-secondary mr-1'>Action 1</button>
      <button className='btn btn-secondary'>Action 2</button>
    </div>
  </Modal>
);

const Modals = () => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);

  return (
    <div className='mb-4'>
      <button className='btn btn-primary mr-5 mb-3' onClick={() => setOpenModal1(true)}>
        Login Modal
      </button>
      <button className='btn btn-primary mr-5 mb-3' onClick={() => setOpenModal2(true)}>
        Sign Up Modal
      </button>
      <button className='btn btn-primary mr-5 mb-3' onClick={() => setOpenModal3(true)}>
        Welcome Modal
      </button>
      <button className='btn btn-primary mr-5 mb-3' onClick={() => setOpenModal5(true)}>
        Custom Small Modal
      </button>
      {openModal1 && <ModalLogin onClose={setOpenModal1} />}
      {openModal2 && <ModalRegister onClose={setOpenModal2} />}
      {openModal3 && <ModalOnboarding onClose={setOpenModal3} />}
      {openModal5 && <Modal5 onClose={setOpenModal5} />}
    </div>
  );
};

export default Modals;

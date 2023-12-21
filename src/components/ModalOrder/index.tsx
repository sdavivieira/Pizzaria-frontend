import Modal from 'react-modal'
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id:string) => void

}
export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){
  const customstyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customstyles}
    >
      <button
      type="button"
      onClick={onRequestClose}
      className='react-modal-close'
      style={{background: 'transparent', border: 0}}
      >
        <FiX size={45} color="#f3478"/>
      </button>
      <div className={styles.container}>
        <h2>Detalhes do Pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0]?.order?.table}</strong>
        </span>
        {order.map(item =>(
          <section key={item.id} className={styles.containerItem}>
            <span>{item.amount} - <strong>{item.product.description}</strong></span>
          </section>
        ))}

        <button className={styles.buttonOrder} onClick={()=>handleFinishOrder(order[0]?.order_id)}>
          ConcluirPedido
        </button>
      </div>
      </Modal>
  )
}
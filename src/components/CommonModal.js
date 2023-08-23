import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faX } from '@fortawesome/free-solid-svg-icons';

const CommonModal = ({
  setDisplay,
  modalSize,
  modalTitle,
  children,
  handleModalOk,
  handleModalCancel,
}) => {
  // JSX
  return (
    <>
      <ModalStyle modalSize={modalSize}>
        <div className="modal-box">
          {modalSize === 'small' ? (
            <div className="modal-title-small">
              <div>{modalTitle}</div>
              <button onClick={() => setDisplay(false)}>
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </div>
          ) : (
            <div className="modal-title">
              <div>{modalSize === 'big' ? modalTitle : null}</div>
              <button onClick={() => setDisplay(false)}>
                <FontAwesomeIcon icon={faX} size="lg" />
              </button>
            </div>
          )}

          <div className="modal-contents">{children}</div>

          <div className="modal-footer">
            <CommonButton
              value={modalSize === 'middle' ? '등록' : '확인'}
              onClick={() => {
                handleModalOk();
                // alert('요청 중입니다');
                setDisplay(false);
              }}
              btnType="modal"
              disabled={modalSize === 'big' ? true : false}
            />
            <CommonButton
              value="취소"
              onClick={() => {
                handleModalCancel();
                setDisplay(false);
              }}
              btnType="modal"
              disabled={modalSize === 'big' ? true : false}
            />
          </div>
        </div>
      </ModalStyle>
    </>
  );
};

export default CommonModal;

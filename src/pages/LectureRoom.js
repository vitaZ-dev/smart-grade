import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Lwrap, Ltable, PlusModal, Pagenation } from '../styles/LectureRoomCss';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import CommonButton from '../components/CommonButton';

const LectureRoom = () => {
  //강의실 추가 모달창 안 호실 인풋창 state
  const [roomNumber, setRoomNumber] = useState('');
  //강의실 추가 모달창 안 최대수용인원 인풋창 state
  const [capacityNumber, setCapacityNumber] = useState('');
  const gogo = () => {
    console.log('gogo');
  };

  const bye = () => {
    alert('삭제하시겠습니까?');
  };

  //modal 활성화 여부
  const [showModal, setshowModal] = useState(false);

  //modal활성화 시 배경 변경
  const [modalBlack, setModalBlack] = useState(false);

  //강의실추가 버튼 클릭시 함수실행
  const modalOpen = () => {
    setshowModal(true);
  };

  //취소 , x 클릭시 함수 실행
  const modalClose = () => {
    setshowModal(false);
  };

  //modal활성화 시 배경 변경

  return (
    <Lwrap>
      {showModal === true ? <Lwrap /> : null}
      <SearchBar>
        <Dropdown placeholder="건물명" />
      </SearchBar>
      <CommonButton btnType="page" value="강의실 추가" onClick={modalOpen} />

      {/* modal이 활성화되면 modal을 띄워라 아니면 null  */}
      {showModal === true ? (
        <PlusModal>
          <div className="LectureLoomTitle">
            <p>
              <strong>강의실 추가</strong>
            </p>
            <p onClick={modalClose}>
              <FontAwesomeIcon icon={faX} />
            </p>
          </div>
          <div className="placeTitle">
            <p>장소 :</p>
            <div className="controls">
              <div className="dropDownControl">
                <Dropdown placeholder="건물명" />
              </div>
              <div className="inputControl">
                <Input text="number" length="short" value={roomNumber} setValue={setRoomNumber} />
                <p>호</p>
              </div>
            </div>
          </div>
          <div className="capacityTitle">
            <p>최대수용인원 : </p>
            <div className="inputControl">
              <Input
                text="number"
                length="short"
                value={capacityNumber}
                setValue={setCapacityNumber}
              />
              <p>명</p>
            </div>
          </div>
          <div className="btns">
            <CommonButton
              btnType="modal"
              color="blue"
              value="등록"
              onClick={gogo}
              className="registeration"
            ></CommonButton>
            <CommonButton
              btnType="modal"
              color="gray"
              value="취소"
              onClick={modalClose}
              className="cancellation"
            ></CommonButton>
          </div>
        </PlusModal>
      ) : null}

      <Ltable>
        <colgroup>
          <col className="number" width="7%" />
          <col className="place" width="30%" />
          <col className="capacity" width="20%" />
          <col className="management" width="15%" />
          <col className="note" width="25%" />
        </colgroup>
        <th>번호</th>
        <th>장소</th>
        <th>최대 수용인원</th>
        <th>관리</th>
        <th>비고</th>
        {Array(10)
          .fill()
          .map((item, idx) => (
            <tr key={idx}>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>
                <CommonButton color="red" btnType="table" value="삭제" onClick={bye} />
              </td>
              <td>5</td>
            </tr>
          ))}

        {/* <tr>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
        <tr>
          <td>9</td>
          <td>10</td>
          <td>11</td>
          <td>11</td>
          <td>12</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr> */}
      </Ltable>
      <Pagenation>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </Pagenation>
    </Lwrap>
  );
};

export default LectureRoom;

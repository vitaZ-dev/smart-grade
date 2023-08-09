import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faO, faX } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import { PlusModal } from '../../styles/LectureRoomCss';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';
import axios from 'axios';
import useQuerySearch from '../../hooks/useSearchFetch';
import CommonModal from '../../components/CommonModal';
import { useSelector } from 'react-redux';
import { async } from 'q';

const Major = () => {
  ////SearchBar////
  //검색 시 사용할 쿼리스트링(상태)
  const situation = useState([]);

  //검색 시 사용할 쿼리스트링(전공명)
  const majorN = useState([]);

  //검색 시 사용할 쿼리스트링목록
  const queries = { situation, majorN };

  //검색버튼 클릭시 state 변경 함수
  const [click, setClick] = useState(false);

  ////DropDown////
  //DropDown value state
  const [value, setValue] = useState(null);
  //DropDown 메뉴 Item 상태데이터 state
  const [status, setStatus] = useState('');
  // DropDown 메뉴 Item 전공명데이터 state
  const [majsornm, setMajsornm] = useState('');

  // 상태 임시 데이터
  const _status = [
    {
      id: 1,
      title: '운영',
    },
    {
      id: 2,
      title: '폐지',
    },
  ];
  //전공명 임시 데이터
  const _majsornm = [
    {
      id: 1,
      title: 'ㄱ전공',
    },
    {
      id: 2,
      title: 'aa전공',
    },
    {
      id: 3,
      title: 'g전공',
    },
    {
      id: 4,
      title: 'e전공',
    },
    {
      id: 5,
      title: 'd전공',
    },
    {
      id: 6,
      title: 'ㄱgf전공',
    },
  ];

  //table header
  const tableHeader = [
    { title: '전공 명', width: 3 },
    { title: '졸업학점', width: 1 },
    { title: '폐지여부', width: 1 },
    { title: '관리', width: 2 },
    { title: '비고', width: 1 },
  ];

  //추후 API GET 요청 데이터
  // const _data = [
  //   {
  //     imajor: '1',
  //     majorName: 'a관',
  //     graduationScore: 130,
  //     status: '',
  //     management: '',
  //     note: '',
  //   },
  //   {
  //     imajor: '1',
  //     majorName: 'a관',
  //     graduationScore: 130,
  //     status: '',
  //     management: '',
  //     note: '',
  //   },
  //   {
  //     imajor: '1',
  //     majorName: 'a관',
  //     graduationScore: 130,
  //     status: '',
  //     management: '',
  //     note: '',
  //   },
  // ];

  //modalTitle state
  const [modalTitle, setmodalTitle] = useState('강의실추가', '전공추가');
  //전공명 imajor
  const [imajor, setImajor] = useState(null);
  //전공명 state
  // const [majorName, setMajorName] = useState('');
  //전공학점 state
  const [majorScore, setMajorScore] = useState(null);
  //모달창 활성화
  const [showModal, setShowModal] = useState(false);
  // 변경할 항목 ID 를 저장해 주어야 함.
  const [selectMajorID, setSelectMajorID] = useState(null);
  const [selectMajorName, setSelectMajorName] = useState('');

  const { allMajorList } = useSelector(state => state.major);
  //console.log(allMajorList);

  // //버튼 onClick시 모달창 열기
  const modalOpen = () => {
    setShowModal(true);
  };

  // //취소, x 누를시 모달창 닫기
  // const modalClose = () => {
  //   setshowModal(false);
  // };

  //변경버튼 클릭시 모달창 활성화
  const [changeModalShow, setChangeModalShow] = useState(false);

  //폐지버튼 클릭시 모달창 활성화
  const [disUseModalShow, setDisUseModalShow] = useState(false);

  //변경버튼 클릭시 모달창 오픈
  const changeModalOpen = (_imajor, _imajorName) => {
    if (selectMajorID === _imajor) {
      // 선택된 번호와 현재 수정 중인 ID 가 같다면 팝업창 안띄우고 처리
      // 과목명 앞뒤 공백 제거하기
      const tempStr = selectMajorName.trim();
      const temp = isDataArr.map(item => {
        if (item.imajor === selectMajorID) {
          if (item.majorName !== tempStr) {
            item.isChange = 1;
            item.originName = item.majorName;
            item.majorName = tempStr;
          }
        }
        return item;
      });
      console.log(temp);
      setDataArr(temp);

      setSelectMajorID(null);
      setSelectMajorName('');
    } else {
      // 다르므로 모달 창 띄우기
      setSelectMajorID(_imajor);
      setSelectMajorName(_imajorName);
      setChangeModalShow(true);
    }
  };
  const handleChangeName = e => {
    console.log(e.target.value);
    setSelectMajorName(e.target.value);
  };

  //폐지버튼 클릭시 모달창 오픈
  const disUseModalOpen = _majorId => {
    console.log(_majorId);
    if (selectMajorID === _majorId) {
      // 초기화
      setSelectMajorID(null);
      setSelectMajorName('');
    } else {
      setDisUseModalShow(true);
      setMajorId(_majorId);
    }
  };
  const [majorId, setMajorId] = useState();
  //api test
  const MajorDeleteTest = async _id => {
    try {
      const res = await axios.delete(`/api/major?imajor=${_id}`);
      const result = res.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //api get hook test

  const url = '/api/major';
  const { data, pending } = useQuerySearch(url, click);
  const [isDataArr, setDataArr] = useState([]);
  useEffect(() => {
    if (data) {
      const temp = data.major.map(item => {
        // 강제로 변경상태 기록
        item.isChange = 0;
        return item;
      });
      setDataArr(temp);
      console.log(data.major);
    }
  }, [data]);
  // console.log(data?.major);

  //button changedShow
  const [changeClickShow, setChangeClickShow] = useState(false);

  //변경 버튼 클릭시
  const changeClickShowOpen = () => {
    console.log('텍스트필드 활성화 ', selectMajorID);
    setChangeClickShow(true);
  };
  const chnageClickCloseWin = () => {
    // 초기화
    setSelectMajorID(null);
    setSelectMajorName('');
    setShowModal(false);
  };
  //button disabled
  const [disabled, setDisabled] = useState(false);

  //폐지모달창 확인 클릭시
  const disuesModalOk = async _id => {
    setDisabled(true);
    await MajorDeleteTest(_id);
    const temp = data.major.map(item => {
      // 강제로 변경상태 기록
      if (_id === item.imajor) {
        item.delYn = 1;
      }
      return item;
    });
    setDataArr(temp);
  };

  const handleModalOk = () => {
    //setDisplay(false); //setter쓰면 이중으로 됨.
    //하지만 function은 써줘야 함.
  };

  //commonModal close state
  const handleModalCancel = () => {
    //setDisplay(false);
  };

  return (
    <>
      {changeModalShow === true ? (
        <CommonModal
          setDisplay={setChangeModalShow}
          modalSize="small"
          modalTitle="전공명 변경"
          handleModalOk={changeClickShowOpen}
          handleModalCancel={chnageClickCloseWin}
        >
          <p>해당 전공명을 변경하시겠습니까?</p>
        </CommonModal>
      ) : null}
      {disUseModalShow === true ? (
        <CommonModal
          setDisplay={setDisUseModalShow}
          modalSize="small"
          modalTitle="전공 폐지"
          handleModalOk={() => disuesModalOk(majorId)}
          handleModalCancel={() => setShowModal(false)}
        >
          <p>해당 전공을 폐지 하겠습니까?</p>
        </CommonModal>
      ) : null}
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="상태"
          data={_status}
          propertyName={{ key: '', value: '' }}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
        />
        <Dropdown
          length="long"
          placeholder="전공명"
          data={allMajorList}
          propertyName={{ key: 'imajor', value: 'majorName' }}
          value={imajor}
          setValue={setImajor}
          reset
          search
        />
      </SearchBar>
      <CommonButton btnType="page" value="전공추가" onClick={modalOpen} />
      {showModal === true ? (
        <CommonModal
          setDisplay={setShowModal}
          modalSize="small"
          modalTitle="전공 추가"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              borderBottom: '1px solid #dae8ff',
            }}
          >
            <p>전공명</p> <Input type="text" length="long" />
          </div>
          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',

              borderBottom: '1px solid #dae8ff',
            }}
          >
            <p>졸업학점</p> <Input type="number" length="short" />
          </div>
        </CommonModal>
      ) : null}
      <Table header={tableHeader} data={data?.major} hasPage={true} maxPage={5} pending={pending}>
        {isDataArr.map((item, index) => {
          return (
            <div key={item.imajor}>
              <div>
                {/* {changeClickShow === true ? <Input length="long" type="text"></Input> : null} */}
                {selectMajorID === item.imajor ? (
                  <Input
                    length="long"
                    type="text"
                    value={selectMajorName}
                    setValue={handleChangeName}
                  ></Input>
                ) : (
                  item.majorName
                )}
              </div>
              <div>{item.graduationScore}</div>
              <div>{item.delYn === 0 ? null : '폐지'}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color={item.delYn ? 'gray' : 'blue'}
                  value={selectMajorID === item.imajor ? '확인' : '변경'}
                  onClick={() => changeModalOpen(item.imajor, item.majorName)}
                  disabled={item.delYn}
                ></CommonButton>
                <CommonButton
                  btnType="table"
                  color={item.delYn ? 'gray' : 'red'}
                  value={selectMajorID === item.imajor ? '취소' : '폐지'}
                  onClick={() => disUseModalOpen(item.imajor)}
                  disabled={item.delYn}
                ></CommonButton>
              </div>

              <div>{item.isChange === 0 ? null : <span>변경 구({item.originName})</span>}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};
export default Major;

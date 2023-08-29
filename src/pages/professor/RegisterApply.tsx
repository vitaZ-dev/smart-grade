import React, { useEffect, useState } from 'react';
import { Button, FormTable, Row } from '../../styles/UserStyle';
import { ButtonContainer, RegisterLayout } from '../../styles/RegisterStyle';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import RegisterTimetable from '../../components/professor/RegisterTimetable';
import { ObjectType } from '../../types/components';
import RegisterScore from '../../components/professor/RegisterScore';

const RegisterApply = () => {
  const [openRegisterTimetable, setOpenRegisterTimetable] = useState<boolean>(false);
  const [openRegisterScore, setOpenRegisterScore] = useState<boolean>(false);
  const [lectureName, setLectureName] = useState<string>('');
  const [lectureRoom, setLectureRoom] = useState<string | number | null>('');
  const [studentNum, setStudentNum] = useState<string>('');
  const [grade, setGrade] = useState<string | number | null>('');
  const [credit, setCredit] = useState<string | number | null>('');
  const [score, setScore] = useState<ObjectType | null>(null);
  const [time, setTime] = useState<ObjectType | null>(null);

  const navigate = useNavigate();

  const handleLecutreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLectureName(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, ''));
  };

  useEffect(() => {
    if (lectureRoom !== '') {
      setOpenRegisterTimetable(true);
    } else {
      setTime(null);
    }
  }, [lectureRoom]);

  return (
    <>
      <RegisterLayout>
        <ButtonContainer>
          <Button>생성</Button>
          <Button negative onClick={() => navigate(-1)}>
            취소
          </Button>
        </ButtonContainer>
        <FormTable>
          <Row col={2}>
            <div>강의명</div>
            <div>
              <Input
                type="text"
                isForm
                placeholder="강의명을 입력하세요."
                reset={setLectureName}
                value={lectureName}
                setValue={handleLecutreNameChange}
              />
            </div>
            <div>강의실</div>
            <div>
              <Dropdown
                isForm
                placeholder="강의실을 선택하세요."
                data={[
                  { id: 0, title: '테스트 1' },
                  { id: 1, title: '테스트 2' },
                ]}
                propertyName={{ key: 'title', value: 'title' }}
                value={lectureRoom}
                setValue={setLectureRoom}
                reset
                search
              />
            </div>
          </Row>
          <Row col={2}>
            <div>수강 인원 수</div>
            <div>
              <Input
                type="number"
                isForm
                placeholder="수강 인원을 입력하세요."
                reset={setStudentNum}
                value={studentNum}
                setValue={e => setStudentNum(e.target.value)}
              />
            </div>
            <div>학년 제한</div>
            <div>
              <Dropdown
                isForm
                placeholder="학년을 선택하세요."
                data={[
                  { id: 1, title: '1학년' },
                  { id: 2, title: '2학년' },
                  { id: 3, title: '3학년' },
                  { id: 4, title: '4학년' },
                ]}
                propertyName={{ key: 'id', value: 'title' }}
                value={grade}
                setValue={setGrade}
                reset
              />
            </div>
          </Row>
          <Row col={2}>
            <div>학점</div>
            <div>
              <Dropdown
                isForm
                placeholder="학점을 선택하세요."
                data={[
                  { id: 2, title: '2학점' },
                  { id: 3, title: '3학점' },
                  { id: 4, title: '4학점' },
                ]}
                propertyName={{ key: 'id', value: 'title' }}
                value={credit}
                setValue={setCredit}
                reset
              />
            </div>
            <div>배점</div>
            <div onClick={() => setOpenRegisterScore(true)}>
              <span>배점을 등록하세요.</span>
            </div>
          </Row>
          <Row col={2}>
            <div>강의 기간</div>
            <div></div>
            <div>강의 시간</div>
            <div>
              {time ? (
                `${time.week} ${time.startTime} ~ ${time.endTime}`
              ) : (
                <span>(강의실 선택 필요)</span>
              )}
            </div>
          </Row>
        </FormTable>
      </RegisterLayout>
      {openRegisterTimetable && (
        <RegisterTimetable
          setOpenRegisterTimetable={setOpenRegisterTimetable}
          lectureRoom={lectureRoom}
          setLectureRoom={setLectureRoom}
          setTime={setTime}
        />
      )}
      {openRegisterScore && <RegisterScore />}
    </>
  );
};

export default RegisterApply;

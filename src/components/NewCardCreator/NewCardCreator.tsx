import { Typography } from '@alfalab/core-components/typography';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { ChangeEvent, FC, useState } from 'react';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';
import { Attach } from '@alfalab/core-components/attach';

import styles from './NewCardCreator.module.scss';
import { api, createCardType } from '../../api';
import { toast } from 'react-toastify';
import { catchHandler } from '../../helpers/catchHandler';

type Props = {
  cardsPack_id: string;
};

export const NewCardCreator: FC<Props> = ({ cardsPack_id }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [questionImg, setQuestionImg] = useState<any>();
  const [answerImg, setAnswerImg] = useState<File>();
  const [questionVideo, setQuestionVideo] = useState<File>();
  const [answerVideo, setAnswerVideo] = useState<File>();
  const [base64QuestionImg, setBase64QuestionImg] = useState<string>();
  const [base64AnswerImg, setBase64AnswerImg] = useState<string>();
  const [base64QuestionVideo, setBase64QuestionVideo] = useState<string>();
  const [base64AnswerVideo, setBase64AnswerVideo] = useState<string>();
  const handleModalOpen = () => setOpen((v) => !v);

  const questionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.currentTarget.value);
  };

  const answerChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.value);
  };

  const getReaderHandler = (base64Setter: (param: any) => void) => {
    return (readerEvt: any) => {
      let binaryString = readerEvt.target.result;
      base64Setter(btoa(binaryString));
    };
  };

  const questionUploadHandler = (event: ChangeEvent<HTMLInputElement>, payload: { files: File[] }) => {
    const reader = new FileReader();
    payload.files.forEach((f) => {
      if (reader !== undefined) {
        if (f.type === 'image/png' || f.type === 'image/jpg' || f.type === 'image/jpeg') {
          reader.onloadend = () => {
            setQuestionImg(f);
          };
          reader.readAsDataURL(f);
          if (questionImg) {
            reader.onload = getReaderHandler(setBase64QuestionImg);
            reader.readAsBinaryString(questionImg);
          }
        }
        if (f.type === 'video/mp4') {
          reader.onloadend = () => {
            setQuestionVideo(f);
          };
          reader.readAsDataURL(f);
          if (questionVideo) {
            reader.onload = getReaderHandler(setBase64QuestionVideo);
            reader.readAsBinaryString(questionVideo);
          }
        }
      }
    });
  };

  const answerUploadHandler = (event: ChangeEvent<HTMLInputElement>, payload: { files: File[] }) => {
    const reader = new FileReader();
    payload.files.forEach((f) => {
      if (reader !== undefined) {
        if (f.type === 'image/png' || f.type === 'image/jpg' || f.type === 'image/jpeg') {
          reader.onloadend = () => {
            setAnswerImg(f);
          };
          reader.readAsDataURL(f);
          if (answerImg) {
            reader.onload = getReaderHandler(setBase64AnswerImg);
            reader.readAsBinaryString(answerImg);
          }
        }
        if (f.type === 'video/mp4') {
          reader.onloadend = () => {
            setAnswerVideo(f);
          };
          reader.readAsDataURL(f);
          if (answerVideo) {
            reader.onload = getReaderHandler(setBase64AnswerVideo);
            reader.readAsBinaryString(answerVideo);
          }
        }
      }
    });
  };

  const createHandler = () => {
    let newCard: createCardType = {
      cardsPack_id: cardsPack_id,
      question: question,
      answer: answer,
      questionImg: base64QuestionImg,
      questionVideo: base64QuestionVideo,
      answerImg: base64AnswerImg,
      answerVideo: base64AnswerVideo,
    };
    api
      .createNewCard(newCard)
      .then(() => {
        toast.success('CARD CREATED SUCCESSFULLY!');
      })
      .catch(catchHandler)
      .finally();
    handleModalOpen();
  };

  return (
    <>
      <Button type="button" size="xs" onClick={handleModalOpen}>
        Create New Card
      </Button>
      <ModalDesktop open={open} onClose={handleModalOpen} size="m">
        <ModalDesktop.Content className={styles.modalContent}>
          <Typography.Title tag="div" view="xlarge">
            Card Info
          </Typography.Title>
          <div className={styles.contentBlock}>
            <Typography.Text tag="p">Question:</Typography.Text>
            <Input label="" name="Question" block value={question} onChange={questionChangeHandler} />
            <Attach
              className={styles.attach}
              noFileText={'File is absent!'}
              buttonContent={'Select image or video!'}
              accept={'.jpeg, .png, .jpg, .mp4'}
              onChange={questionUploadHandler}
            />
          </div>
          <div className={styles.contentBlock}>
            <Typography.Text tag="p">Answer:</Typography.Text>
            <Input label="" name="Answer" block value={answer} onChange={answerChangeHandler} />
            <Attach
              className={styles.attach}
              noFileText={'File is absent!'}
              buttonContent={'Select image or video!'}
              accept={'.jpeg, .png, .jpg, .mp4'}
              onChange={answerUploadHandler}
            />
          </div>
        </ModalDesktop.Content>
        <ModalDesktop.Footer className={styles.modalFooter}>
          <Button view="secondary" size="s" onClick={handleModalOpen}>
            Cancel
          </Button>
          <Button view="primary" size="s" onClick={createHandler}>
            Create
          </Button>
        </ModalDesktop.Footer>
      </ModalDesktop>
    </>
  );
};

import { hapticFeedback } from '@telegram-apps/sdk-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Postman from '@/images/post.png';

function ThirdPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClose = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('light');
    }
    void navigate(-1);
  };

  return (
    <div className="px-2 h-screen w-full max-w-[382px] mx-auto relative">
      <div className="h-[48px]">
        <div className="absolute top-5 right-0">
          <div
            className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClose();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100%-170px)] gap-4">
        <img
          src={Postman}
          alt="Postman"
          className="w-[170px]"
        />
        <h1 className="font-helvetica font-bold text-[20px] leading-[24px] tracking-[0.02em] text-black text-center">
          {t('third.title')}
        </h1>
        <p className="font-helvetica font-normal text-[14px] leading-[16.8px] tracking-[0.06em] text-black text-center max-w-[280px]">
          {t('third.description')}
        </p>
        <button
          type="button"
          className="w-[158px] h-[48px] px-8 py-2.5 rounded-[30px] bg-gradient-to-r from-[#FF7A28] to-[#FF5926] cursor-pointer"
        >
          <span className="font-helvetica text-[16px] leading-[19.2px] tracking-[0.02em] font-bold text-black">
            {t('third.add')}
          </span>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-2 mb-8">
        <div className="max-w-[382px] mx-auto">
          <button
            type="button"
            className="w-full h-[56px] rounded-[30px] bg-[#EDEDED]"
            onClick={handleClose}
          >
            <span className="font-helvetica text-[16px] leading-[19.2px] tracking-[0.02em] font-bold text-black">
              {t('third.not_now')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThirdPage;

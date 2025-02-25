import { hapticFeedback } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { createApi } from '@/api';
import type { Category } from '@/api/types';
import Logo from '@/images/Logo';

function CheckmarkIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5463 0.162444C14.0089 0.464139 14.1393 1.08372 13.8377 1.54632L6.01157 13.5463C5.83529 13.8166 5.53941 13.9852 5.21702 13.9991C4.89462 14.013 4.58533 13.8705 4.38645 13.6164L0.212539 8.28303C-0.127839 7.8481 -0.0511913 7.21959 0.383736 6.87922C0.818663 6.53884 1.44717 6.61549 1.78755 7.05041L5.09995 11.2829L12.1624 0.453787C12.4641 -0.00881276 13.0837 -0.139251 13.5463 0.162444Z"
        fill="#FFFEF8"
      />
    </svg>
  );
}

function PlusmarkIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.36087 14V7.63913H0V6.36087H6.36087V0H7.63913V6.36087H14V7.63913H7.63913V14H6.36087Z" fill="#242424" />
    </svg>

  );
}

function FirstPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const api = createApi();
  const isButtonActive = selectedCategories.length >= 3;

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api.main.getCategories();
      setCategories(data);
    };

    void fetchCategories();
  }, [api]);

  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const data = await api.main.init();
        setSelectedCategories(data.user_categories);
      } catch (error) {
        console.error('Error fetching user categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUserCategories();
  }, [api]);

  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-[#78A6FF] to-[#9378FF]',
      'bg-gradient-to-r from-[#FF7A28] to-[#FF5926]',
      'bg-gradient-to-r from-[#58CFB5] to-[#58CC77]',
    ];
    return gradients[index % 3];
  };

  const toggleCategory = (category: Category) => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('light');
    }

    setSelectedCategories((prev) => (
      prev.some((cat) => cat.category === category.category) ?
        prev.filter((c) => c.category !== category.category) :
        [...prev, category]
    ));
  };

  const handleSubmit = async () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('heavy');
    }

    try {
      await api.main.sendCategories(selectedCategories);
      void navigate('/second');
    } catch (error) {
      console.error('Error sending categories:', error);
    }
  };

  const getHeaderText = () => {
    const remainingCount = 3 - selectedCategories.length;

    if (remainingCount <= 0) {
      return t('categories.selectComplete');
    }

    return t('categories.selectRemaining', { count: remainingCount });
  };

  return (
    <div className="px-2 h-screen w-full max-w-[382px] mx-auto">
      <div className="flex flex-col items-center">
        <Logo className="w-[80px] mt-5" />
        <h1 className="font-helvetica text-[20px] leading-[24px] tracking-[0.02em] font-bold mt-6 text-black">
          {getHeaderText()}
        </h1>

        <div className="mt-6 w-full overflow-y-auto max-h-[calc(100vh-300px)]">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.some(
                (selectedCat) => selectedCat.category === category.category,
              );
              const selectedIndex = selectedCategories
                .findIndex((c) => c.category === category.category);
              return (
                <button
                  key={category.category}
                  type="button"
                  onClick={() => { toggleCategory(category); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleCategory(category);
                    }
                  }}
                  className={`h-[40px] px-3 py-[2px] rounded-[30px] border border-[#EDEDED] flex items-center justify-center whitespace-nowrap cursor-pointer transition-all
                    ${isSelected ? getGradientClass(selectedIndex) : ''}`}
                >
                  <span className={`font-helvetica text-[16px] leading-[18.4px] tracking-[0.5px] font-normal flex items-center gap-2
  ${isSelected ? 'text-white' : 'text-black'}`}
                  >
                    <span className="flex items-center justify-center w-[14px]">
                      {isSelected ? <CheckmarkIcon /> : <PlusmarkIcon />}
                    </span>
                    {category.category_name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-2 mb-8">
        <div className="max-w-[382px] mx-auto">
          <button
            type="button"
            onClick={() => {
              void handleSubmit();
            }}
            disabled={!isButtonActive}
            className={`w-full h-[56px] rounded-[30px] ${
              isButtonActive ?
                'bg-gradient-to-r from-[#FF7A28] to-[#FF5926] cursor-pointer' :
                'bg-[#EDEDED] cursor-not-allowed'
            }`}
          >
            <span className="font-helvetica text-[16px] leading-[19.2px] tracking-[0.02em] font-bold text-black">
              {t('categories.ready')}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default FirstPage;

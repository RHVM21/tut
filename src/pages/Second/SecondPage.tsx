/* eslint-disable max-len */
import { hapticFeedback } from '@telegram-apps/sdk-react';
import type { PanInfo } from 'framer-motion';
import { motion } from 'framer-motion';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';
import { createApi } from '@/api';
import type { Category, NewsItem } from '@/api/types';
import Logo from '@/images/Logo';

function SecondPage(): JSX.Element {
  // const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);
  const api = createApi();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSelectedCategories = async () => {
      const data = await api.main.init();
      setSelectedCategories(data.user_categories);

      if (data.user_categories.length > 0) {
        const firstCategory = data.user_categories[0];
        setActiveCategory(firstCategory.category);
        const newsData = await api.main.getTopNews(firstCategory.category);
        setNews(newsData);
      }
    };

    void fetchSelectedCategories();
  }, [api]);

  useEffect(() => {
    setVisibleNews([]);
    const interval = setInterval(() => {
      setVisibleNews((prev) => {
        if (prev.length < news.length) {
          return [...prev, news[prev.length]];
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);

    return () => { clearInterval(interval); };
  }, [news]);

  // const handleMyNewsClick = () => {
  //   if (hapticFeedback.isSupported()) {
  //     hapticFeedback.impactOccurred('light');
  //   }
  //   void navigate('/third');
  // };

  const categoriesContainerRef = useRef<HTMLDivElement>(null);

  const handleEditCategories = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('light');
    }
    setIsMenuOpen(false);
    void navigate('/main');
  };

  const handleCategoryClick = async (categoryId: string) => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('light');
    }
    setActiveCategory(categoryId);
    const newsData = await api.main.getTopNews(categoryId);
    setNews(newsData);
    const categoryElement = categoriesContainerRef.current?.querySelector(`[data-category="${categoryId}"]`);
    categoryElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const currentIndex = selectedCategories.findIndex((cat) => cat.category === activeCategory);

    if (info.offset.x < -swipeThreshold && currentIndex < selectedCategories.length - 1) {
      const nextCategory = selectedCategories[currentIndex + 1];
      void handleCategoryClick(nextCategory.category);
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      const prevCategory = selectedCategories[currentIndex - 1];
      void handleCategoryClick(prevCategory.category);
    }
  };

  return (
    <div className="px-2 h-screen w-full max-w-[382px] mx-auto flex flex-col">
      <div className="flex items-center justify-between mt-5">
        <Logo className="w-[36px]" />
        {/* <div className="flex items-center gap-3">
          <div
            className="h-[40px] px-3 py-[2px] rounded-[30px] border border-[#EDEDED] flex items-center justify-center cursor-pointer"
            onClick={handleMyNewsClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleMyNewsClick();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span className="font-helvetica text-[12px] leading-[12px] tracking-[0.06em] font-bold text-black">
              {t('my_news')}
            </span>
          </div>
          <div className="flex gap-[2px] rotate-90">
            <div className="w-[3px] h-[3px] rounded-[120px] bg-gradient-to-r from-[#78A6FF] to-[#9378FF]" />
            <div className="w-[3px] h-[3px] rounded-[120px] bg-gradient-to-r from-[#78A6FF] to-[#9378FF]" />
            <div className="w-[3px] h-[3px] rounded-[120px] bg-gradient-to-r from-[#78A6FF] to-[#9378FF]" />
          </div>
        </div> */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <button
            type="button"
            className="flex gap-[2px] rotate-90 cursor-pointer p-2"
            onClick={() => {
              if (hapticFeedback.isSupported()) {
                hapticFeedback.impactOccurred('light');
              }
              setIsMenuOpen(!isMenuOpen);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsMenuOpen(!isMenuOpen);
              }
            }}
          >
            <div className="w-[3px] h-[3px] rounded-[120px] bg-gradient-to-r from-[#78A6FF] to-[#9378FF]" />
            <div className="w-[3px] h-[3px] rounded-[120px] bg-gradient-to-r from-[#78A6FF] to-[#9378FF]" />
            <div className="w-[3px] h-[3px] rounded-[120px] bg-gradient-to-r from-[#78A6FF] to-[#9378FF]" />
          </button>

          {isMenuOpen && (
          <div className="absolute top-8 right-0 bg-white rounded-[12px] shadow-lg py-2 min-w-[200px] z-10">
            <button
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-[#F5F5F5] font-helvetica text-[14px]"
              onClick={handleEditCategories}
            >
              {t('edit_categories')}
            </button>
          </div>
          )}
        </div>

      </div>

      <div className="mt-6 overflow-x-auto hide-scrollbar" ref={categoriesContainerRef}>
        <div className="flex gap-4 whitespace-nowrap pb-2">
          {selectedCategories.map((category) => (
            <span
              key={category.category}
              data-category={category.category}
              role="button"
              tabIndex={0}
              onClick={() => {
                void handleCategoryClick(category.category);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  void handleCategoryClick(category.category);
                }
              }}
              className={`font-helvetica text-[12px] leading-[12px] tracking-[0.06em] font-bold text-black cursor-pointer h-[32px] flex items-center
              ${activeCategory === category.category ? 'bg-[#EDEDED] px-[8px] py-[4px] rounded-[30px]' : ''}`}
            >
              {category.category_name}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        className="mt-4 flex-1 overflow-y-auto hide-scrollbar"
        drag="x"
        dragDirectionLock
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{
          x: 0,
          cursor: 'default',
        }}
      >
        {visibleNews.map((item) => (
          <div
            key={item.link}
            className="flex gap-3 mb-4 cursor-pointer animate-fadeIn"
            onClick={() => window.open(item.link, '_blank')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.open(item.link, '_blank');
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              src={item.profile_photo_url}
              alt={item.channel_name}
              className="w-[24px] h-[24px] rounded-[9px] object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 pb-4 border-b-2 border-[#EDEDED]">
              <h3 className="font-helvetica text-[14px] font-bold mb-1 truncate">
                {item.channel_name}
              </h3>
              <p className="font-helvetica text-[14px] line-clamp-2 text-ellipsis">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default SecondPage;

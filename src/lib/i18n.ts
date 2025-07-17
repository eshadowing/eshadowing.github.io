// Internationalization system for the app
export type Language = 'en' | 'ko' | 'vi';

export interface Translations {
  // Beta Access Popup
  betaAccess: {
    title: string;
    alreadyRegistered: string;
    alreadyRegisteredDesc: string;
    registeredEmail: string;
    notifyLaunch: string;
    discountSecured: string;
    gotIt: string;
    demoNotice: string;
    tryBuilding: string;
    earlyAccessInterest: string;
    joinWaitlist: string;
    exclusiveOffer: string;
    discount100: string;
    first100People: string;
    emailAddress: string;
    emailPlaceholder: string;
    joining: string;
    joinBetaWaitlist: string;
    welcomeWaitlist: string;
    welcomeWaitlistDesc: string;
    earlyAccessSecured: string;
    errorMessage: string;
  };
  
  // Navigation
  navigation: {
    home: string;
    chat: string;
    progress: string;
    profile: string;
  };
  
  // Chat Page
  chat: {
    title: string;
    enterTopic: string;
    start: string;
    popularTopics: string;
    listening: string;
    topics: {
      languageLearning: string;
      languageLearningDesc: string;
      codingHelp: string;
      codingHelpDesc: string;
      careerAdvice: string;
      careerAdviceDesc: string;
      travelPlanning: string;
      travelPlanningDesc: string;
      healthFitness: string;
      healthFitnessDesc: string;
      creativeWriting: string;
      creativeWritingDesc: string;
    };
  };
  
  // Profile Page
  profile: {
    title: string;
    subtitle: string;
    likes: string;
    videos: string;
    uploadVideo: string;
    shareSubtitle: string;
    chooseVideoFile: string;
    importYoutube: string;
    yourVideos: string;
  };
  
  // Progress Page
  progress: {
    title: string;
    subtitle: string;
    totalPractice: string;
    pronunciationScore: string;
    overallAccuracy: string;
    improvementWeek: string;
    thisWeek: string;
    dailyGoal: string;
    days: string;
    sentencesShadowed: string;
    sentences: string;
    recentAchievements: string;
    achievements: {
      sevenDayStreak: string;
      sevenDayStreakDesc: string;
      pronunciationPro: string;
      pronunciationProDesc: string;
      fastLearner: string;
      fastLearnerDesc: string;
    };
  };
  
  // Video Card
  video: {
    preloading: string;
    allSentences: string;
  };
  
  // Common
  common: {
    close: string;
    sentencesCompleted: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    betaAccess: {
      title: 'Early Access',
      alreadyRegistered: '🎉 You\'re Already Registered!',
      alreadyRegisteredDesc: 'Great news! You\'ve already secured your spot on our beta waitlist with your 100% discount!',
      registeredEmail: '📧 Registered email:',
      notifyLaunch: 'We\'ll notify you as soon as our app officially launches. Your premium account will be completely free!',
      discountSecured: '✅ 100% Discount Secured',
      gotIt: 'Got it! 👍',
      demoNotice: '🚀 This is a demo – not the final version of our app.',
      tryBuilding: 'Want to see what we\'re building? Give it a try!',
      earlyAccessInterest: 'If you\'re interested in getting early access:',
      joinWaitlist: '👉 Enter your email to join our Beta Waitlist',
      exclusiveOffer: 'EXCLUSIVE OFFER',
      discount100: '100% DISCOUNT',
      first100People: '🎁 The first 100 people to sign up will receive a 100% discount on a Premium Account after our official launch!',
      emailAddress: 'Email Address',
      emailPlaceholder: 'Enter your email for early access...',
      joining: 'Joining...',
      joinBetaWaitlist: '🚀 Join Beta Waitlist',
      welcomeWaitlist: '🎉 Welcome to the Beta Waitlist!',
      welcomeWaitlistDesc: 'You\'ve been added to our exclusive beta waitlist. We\'ll notify you when the app launches with your 100% discount!',
      earlyAccessSecured: '✨ Early Access Secured',
      errorMessage: 'Something went wrong. Please try again.',
    },
    navigation: {
      home: 'Home',
      chat: 'Chat',
      progress: 'Progress',
      profile: 'Profile',
    },
    chat: {
      title: 'AI Voice Chat',
      enterTopic: 'Enter a topic...',
      start: 'Start',
      popularTopics: 'Popular Topics',
      listening: 'Listening...',
      topics: {
        languageLearning: 'Language Learning',
        languageLearningDesc: 'Practice conversations in different languages',
        codingHelp: 'Coding Help',
        codingHelpDesc: 'Get help with programming questions',
        careerAdvice: 'Career Advice',
        careerAdviceDesc: 'Discuss career goals and professional development',
        travelPlanning: 'Travel Planning',
        travelPlanningDesc: 'Plan your next adventure',
        healthFitness: 'Health & Fitness',
        healthFitnessDesc: 'Discuss wellness and fitness goals',
        creativeWriting: 'Creative Writing',
        creativeWritingDesc: 'Brainstorm ideas and improve your writing',
      },
    },
    profile: {
      title: 'Your Profile',
      subtitle: 'Language learning progress',
      likes: 'Likes',
      videos: 'Videos',
      uploadVideo: 'Upload Your Video',
      shareSubtitle: 'Share your shadowing practice and help others learn!',
      chooseVideoFile: 'Choose Video File',
      importYoutube: 'Import From Youtube Link',
      yourVideos: 'Your Videos',
    },
    progress: {
      title: 'Your Progress',
      subtitle: 'Track your shadowing journey',
      totalPractice: 'Total Practice',
      pronunciationScore: 'Pronunciation Score',
      overallAccuracy: 'Overall accuracy',
      improvementWeek: '+5% improvement this week!',
      thisWeek: 'This Week',
      dailyGoal: 'Daily Goal',
      days: 'days',
      sentencesShadowed: 'Sentences Shadowed',
      sentences: 'sentences',
      recentAchievements: 'Recent Achievements',
      achievements: {
        sevenDayStreak: '7-Day Streak',
        sevenDayStreakDesc: 'Practiced every day this week',
        pronunciationPro: 'Pronunciation Pro',
        pronunciationProDesc: 'Scored 90%+ on 5 sentences',
        fastLearner: 'Fast Learner',
        fastLearnerDesc: 'Completed 10 sentences in 24h',
      },
    },
    video: {
      preloading: 'Preloading...',
      allSentences: 'All Sentences',
    },
    common: {
      close: 'Close',
      sentencesCompleted: 'Sentences Completed',
    },
  },
  ko: {
    betaAccess: {
      title: '얼리 액세스',
      alreadyRegistered: '🎉 이미 등록되었습니다!',
      alreadyRegisteredDesc: '좋은 소식입니다! 베타 대기자 명단에 이미 등록되어 100% 할인 혜택을 받으실 수 있습니다!',
      registeredEmail: '📧 등록된 이메일:',
      notifyLaunch: '앱이 정식 출시되는 즉시 알려드리겠습니다. 프리미엄 계정을 완전 무료로 이용하실 수 있습니다!',
      discountSecured: '✅ 100% 할인 확보',
      gotIt: '알겠습니다! 👍',
      demoNotice: '🚀 이것은 데모 버전입니다 – 최종 버전이 아닙니다.',
      tryBuilding: '저희가 만들고 있는 것을 보고 싶으신가요? 한번 써보세요!',
      earlyAccessInterest: '얼리 액세스에 관심이 있으시다면:',
      joinWaitlist: '👉 베타 대기자 명단에 등록하려면 이메일을 입력하세요',
      exclusiveOffer: '독점 혜택',
      discount100: '100% 할인',
      first100People: '🎁 처음 가입하는 100명에게 정식 출시 후 프리미엄 계정 100% 할인 혜택을 드립니다!',
      emailAddress: '이메일 주소',
      emailPlaceholder: '얼리 액세스를 위한 이메일을 입력하세요...',
      joining: '등록 중...',
      joinBetaWaitlist: '🚀 베타 대기자 명단 참여',
      welcomeWaitlist: '🎉 베타 대기자 명단에 오신 것을 환영합니다!',
      welcomeWaitlistDesc: '독점 베타 대기자 명단에 추가되었습니다. 앱 출시 시 100% 할인 혜택과 함께 알려드리겠습니다!',
      earlyAccessSecured: '✨ 얼리 액세스 확보',
      errorMessage: '문제가 발생했습니다. 다시 시도해 주세요.',
    },
    navigation: {
      home: '홈',
      chat: '채팅',
      progress: '진행상황',
      profile: '프로필',
    },
    chat: {
      title: 'AI 음성 채팅',
      enterTopic: '주제를 입력하세요...',
      start: '시작',
      popularTopics: '인기 주제',
      listening: '듣고 있습니다...',
      topics: {
        languageLearning: '언어 학습',
        languageLearningDesc: '다양한 언어로 대화 연습하기',
        codingHelp: '코딩 도움',
        codingHelpDesc: '프로그래밍 질문에 대한 도움받기',
        careerAdvice: '커리어 조언',
        careerAdviceDesc: '진로 목표와 전문성 개발 논의하기',
        travelPlanning: '여행 계획',
        travelPlanningDesc: '다음 모험 계획하기',
        healthFitness: '건강 & 피트니스',
        healthFitnessDesc: '웰니스와 피트니스 목표 논의하기',
        creativeWriting: '창의적 글쓰기',
        creativeWritingDesc: '아이디어 브레인스토밍과 글쓰기 실력 향상',
      },
    },
    profile: {
      title: '나의 프로필',
      subtitle: '언어 학습 진행상황',
      likes: '좋아요',
      videos: '동영상',
      uploadVideo: '동영상 업로드',
      shareSubtitle: '쉐도잉 연습을 공유하고 다른 사람들의 학습을 도와주세요!',
      chooseVideoFile: '동영상 파일 선택',
      importYoutube: '유튜브 링크에서 가져오기',
      yourVideos: '나의 동영상',
    },
    progress: {
      title: '나의 진행상황',
      subtitle: '쉐도잉 여정 추적하기',
      totalPractice: '총 연습 시간',
      pronunciationScore: '발음 점수',
      overallAccuracy: '전체 정확도',
      improvementWeek: '이번 주 +5% 향상!',
      thisWeek: '이번 주',
      dailyGoal: '일일 목표',
      days: '일',
      sentencesShadowed: '쉐도잉한 문장',
      sentences: '문장',
      recentAchievements: '최근 성취',
      achievements: {
        sevenDayStreak: '7일 연속',
        sevenDayStreakDesc: '이번 주 매일 연습함',
        pronunciationPro: '발음 전문가',
        pronunciationProDesc: '5개 문장에서 90%+ 점수 달성',
        fastLearner: '빠른 학습자',
        fastLearnerDesc: '24시간 내에 10개 문장 완료',
      },
    },
    video: {
      preloading: '미리 로딩 중...',
      allSentences: '모든 문장',
    },
    common: {
      close: '닫기',
      sentencesCompleted: '완료된 문장',
    },
  },
  vi: {
    betaAccess: {
      title: 'Truy cập sớm',
      alreadyRegistered: '🎉 Bạn đã đăng ký rồi!',
      alreadyRegisteredDesc: 'Tin tốt lành! Bạn đã bảo đảm vị trí trong danh sách beta và nhận được giảm giá 100%!',
      registeredEmail: '📧 Email đã đăng ký:',
      notifyLaunch: 'Chúng tôi sẽ thông báo ngay khi ứng dụng chính thức ra mắt. Tài khoản premium của bạn sẽ hoàn toàn miễn phí!',
      discountSecured: '✅ Giảm giá 100% đã được bảo đảm',
      gotIt: 'Đã hiểu! 👍',
      demoNotice: '🚀 Đây là phiên bản demo – không phải phiên bản cuối cùng của ứng dụng.',
      tryBuilding: 'Muốn xem chúng tôi đang xây dựng gì? Hãy thử ngay!',
      earlyAccessInterest: 'Nếu bạn quan tâm đến việc có quyền truy cập sớm:',
      joinWaitlist: '👉 Nhập email để tham gia danh sách chờ Beta',
      exclusiveOffer: 'ƯU ĐÃI ĐỘC QUYỀN',
      discount100: 'GIẢM GIÁ 100%',
      first100People: '🎁 100 người đầu tiên đăng ký sẽ nhận được giảm giá 100% cho tài khoản Premium sau khi ra mắt chính thức!',
      emailAddress: 'Địa chỉ Email',
      emailPlaceholder: 'Nhập email để truy cập sớm...',
      joining: 'Đang tham gia...',
      joinBetaWaitlist: '🚀 Tham gia danh sách chờ Beta',
      welcomeWaitlist: '🎉 Chào mừng bạn đến với danh sách chờ Beta!',
      welcomeWaitlistDesc: 'Bạn đã được thêm vào danh sách chờ beta độc quyền. Chúng tôi sẽ thông báo khi ứng dụng ra mắt cùng với giảm giá 100% của bạn!',
      earlyAccessSecured: '✨ Truy cập sớm đã được bảo đảm',
      errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
    },
    navigation: {
      home: 'Trang chủ',
      chat: 'Trò chuyện',
      progress: 'Tiến trình',
      profile: 'Hồ sơ',
    },
    chat: {
      title: 'Trò chuyện bằng giọng nói AI',
      enterTopic: 'Nhập chủ đề...',
      start: 'Bắt đầu',
      popularTopics: 'Chủ đề phổ biến',
      listening: 'Đang nghe...',
      topics: {
        languageLearning: 'Học ngôn ngữ',
        languageLearningDesc: 'Luyện tập hội thoại bằng các ngôn ngữ khác nhau',
        codingHelp: 'Trợ giúp lập trình',
        codingHelpDesc: 'Nhận trợ giúp về các câu hỏi lập trình',
        careerAdvice: 'Tư vấn nghề nghiệp',
        careerAdviceDesc: 'Thảo luận về mục tiêu nghề nghiệp và phát triển chuyên môn',
        travelPlanning: 'Lập kế hoạch du lịch',
        travelPlanningDesc: 'Lên kế hoạch cho cuộc phiêu lưu tiếp theo',
        healthFitness: 'Sức khỏe & Thể hình',
        healthFitnessDesc: 'Thảo luận về sức khỏe và mục tiêu thể hình',
        creativeWriting: 'Viết sáng tạo',
        creativeWritingDesc: 'Động não ý tưởng và cải thiện kỹ năng viết',
      },
    },
    profile: {
      title: 'Hồ sơ của bạn',
      subtitle: 'Tiến trình học ngôn ngữ',
      likes: 'Lượt thích',
      videos: 'Video',
      uploadVideo: 'Tải lên video',
      shareSubtitle: 'Chia sẻ luyện tập shadowing và giúp đỡ người khác học tập!',
      chooseVideoFile: 'Chọn file video',
      importYoutube: 'Nhập từ liên kết Youtube',
      yourVideos: 'Video của bạn',
    },
    progress: {
      title: 'Tiến trình của bạn',
      subtitle: 'Theo dõi hành trình shadowing',
      totalPractice: 'Tổng thời gian luyện tập',
      pronunciationScore: 'Điểm phát âm',
      overallAccuracy: 'Độ chính xác tổng thể',
      improvementWeek: 'Cải thiện +5% tuần này!',
      thisWeek: 'Tuần này',
      dailyGoal: 'Mục tiêu hàng ngày',
      days: 'ngày',
      sentencesShadowed: 'Câu đã shadow',
      sentences: 'câu',
      recentAchievements: 'Thành tích gần đây',
      achievements: {
        sevenDayStreak: 'Chuỗi 7 ngày',
        sevenDayStreakDesc: 'Luyện tập mỗi ngày trong tuần',
        pronunciationPro: 'Chuyên gia phát âm',
        pronunciationProDesc: 'Đạt điểm 90%+ cho 5 câu',
        fastLearner: 'Người học nhanh',
        fastLearnerDesc: 'Hoàn thành 10 câu trong 24 giờ',
      },
    },
    video: {
      preloading: 'Đang tải trước...',
      allSentences: 'Tất cả câu',
    },
    common: {
      close: 'Đóng',
      sentencesCompleted: 'Câu đã hoàn thành',
    },
  },
};

// Language detection and management
class I18nManager {
  private currentLanguage: Language = 'en';
  
  constructor() {
    this.detectLanguage();
  }
  
  private detectLanguage(): void {
    // Get user's browser language
    const browserLang = navigator.language || navigator.languages[0];
    
    // Check language preference
    if (browserLang.startsWith('vi')) {
      this.currentLanguage = 'vi';
    } else if (browserLang.startsWith('ko')) {
      this.currentLanguage = 'ko';
    } else {
      this.currentLanguage = 'en';
    }
    
    // Check localStorage for saved preference
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ko' || savedLang === 'vi')) {
      this.currentLanguage = savedLang;
    }
  }
  
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }
  
  public setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    localStorage.setItem('preferred-language', lang);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }
  
  public t(path: string): string {
    const keys = path.split('.');
    let value: any = translations[this.currentLanguage];
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // Fallback to English if translation is missing
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return path; // Return the path if even English translation is missing
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : path;
  }
}

// Export a singleton instance
export const i18n = new I18nManager();

// Helper hook for components
export const useTranslation = () => {
  return {
    t: (path: string) => i18n.t(path),
    currentLanguage: i18n.getCurrentLanguage(),
    setLanguage: (lang: Language) => i18n.setLanguage(lang),
  };
};

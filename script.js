// 백엔드 API URL (실제 서버 주소로 변경 필요)
const API_BASE_URL = 'http://localhost:8080/api';

// 띠별 기본 특성 (AI 추론용)
const zodiacTraits = {
    '쥐': {
        personality: ['신중함', '꼼꼼함', '민첩함', '적응력'],
        workStyle: ['세밀한 작업', '빠른 판단', '위험 감지'],
        risks: ['성급함', '과신', '작은 실수']
    },
    '소': {
        personality: ['성실함', '끈기', '신뢰성', '안정성'],
        workStyle: ['체계적 작업', '꾸준함', '협력'],
        risks: ['고집', '변화 거부', '과로']
    },
    '호랑이': {
        personality: ['용기', '리더십', '결단력', '자신감'],
        workStyle: ['주도적 작업', '빠른 결정', '도전'],
        risks: ['성급함', '과도한 자신감', '독단']
    },
    '토끼': {
        personality: ['온화함', '협력', '평화', '배려'],
        workStyle: ['팀워크', '조화', '안정적 작업'],
        risks: ['우유부단', '스트레스', '갈등 회피']
    },
    '용': {
        personality: ['카리스마', '야심', '창의성', '리더십'],
        workStyle: ['혁신적 작업', '큰 그림', '목표 지향'],
        risks: ['과도한 야심', '방심', '완벽주의']
    },
    '뱀': {
        personality: ['직감', '신중함', '분석력', '집중력'],
        workStyle: ['정밀 작업', '깊은 사고', '관찰'],
        risks: ['의심', '과도한 신중함', '고립']
    },
    '말': {
        personality: ['활동성', '자유로움', '열정', '모험'],
        workStyle: ['역동적 작업', '빠른 실행', '변화'],
        risks: ['성급함', '집중력 부족', '변덕']
    },
    '양': {
        personality: ['온순함', '예술성', '평화', '감성'],
        workStyle: ['조화로운 작업', '창의적 접근', '배려'],
        risks: ['우유부단', '의존성', '스트레스']
    },
    '원숭이': {
        personality: ['영리함', '호기심', '유연성', '창의성'],
        workStyle: ['창의적 해결', '빠른 학습', '적응'],
        risks: ['산만함', '경솔함', '과신']
    },
    '닭': {
        personality: ['정확성', '계획성', '책임감', '완벽주의'],
        workStyle: ['체계적 점검', '정밀 작업', '규칙 준수'],
        risks: ['과도한 완벽주의', '스트레스', '융통성 부족']
    },
    '개': {
        personality: ['충실함', '책임감', '협력', '보호본능'],
        workStyle: ['팀 안전', '상호 지원', '신뢰 구축'],
        risks: ['과도한 걱정', '스트레스', '번아웃']
    },
    '돼지': {
        personality: ['관대함', '성실함', '낙천성', '인내'],
        workStyle: ['꾸준한 작업', '여유로운 접근', '협력'],
        risks: ['방심', '과도한 낙관', '게으름']
    }
};

// MBTI별 안전 작업 조언
const mbtiSafetyAdvice = {
    'INTJ': {
        general: '체계적인 계획을 세워 작업하는 것이 안전사고 예방에 도움이 됩니다.',
        specific: '작업 전 체크리스트를 만들어 단계별로 확인하며 진행하세요. 예상 가능한 위험 시나리오를 미리 분석하고 대응책을 준비하세요.'
    },
    'INTP': {
        general: '논리적 사고로 위험요소를 분석하여 사전에 대비하세요.',
        specific: '전기 회로의 원리를 정확히 이해하고 작업하세요. 왜 이 안전수칙이 필요한지 논리적으로 파악하면 더 철저히 지킬 수 있습니다.'
    },
    'ENTJ': {
        general: '리더십을 발휘하여 팀 전체의 안전을 책임지세요.',
        specific: '팀원들의 안전장비 착용 상태를 점검하고, 위험한 작업 시 명확한 지시와 역할 분담을 통해 사고를 예방하세요.'
    },
    'ENTP': {
        general: '창의적 아이디어로 더 안전한 작업 방법을 제안해보세요.',
        specific: '기존 작업 방식의 위험 요소를 찾아내고, 더 안전하고 효율적인 방법을 제안하세요. 단, 새로운 방법은 반드시 안전성을 먼저 검증하세요.'
    },
    'INFJ': {
        general: '직감을 믿고 위험한 상황을 미리 감지하세요.',
        specific: '평소와 다른 느낌이나 분위기를 감지하면 즉시 작업을 중단하고 점검하세요. 동료들의 컨디션 변화도 세심하게 관찰하세요.'
    },
    'INFP': {
        general: '자신과 동료의 감정 상태를 파악하여 컨디션 관리에 신경쓰세요.',
        specific: '스트레스나 피로감이 높을 때는 더욱 신중하게 작업하세요. 마음이 불안하거나 집중이 안 될 때는 잠시 휴식을 취하세요.'
    },
    'ENFJ': {
        general: '동료들의 안전을 세심하게 챙기는 것이 전체 안전으로 이어집니다.',
        specific: '신입이나 경험이 부족한 동료와 함께 작업할 때 더욱 세심하게 지도하고, 모든 팀원이 안전수칙을 이해했는지 확인하세요.'
    },
    'ENFP': {
        general: '긍정적 에너지로 팀 분위기를 좋게 만들어 집중력을 높이세요.',
        specific: '밝은 에너지로 팀 분위기를 좋게 하되, 안전에 관해서는 진지하게 접근하세요. 안전 교육을 재미있게 진행하여 모두가 참여하도록 하세요.'
    },
    'ISTJ': {
        general: '규칙과 절차를 철저히 지키는 것이 최고의 안전 대책입니다.',
        specific: '매뉴얼과 안전수칙을 정확히 숙지하고 한 단계도 빠뜨리지 말고 진행하세요. 정해진 절차를 지키는 것이 가장 안전합니다.'
    },
    'ISFJ': {
        general: '세심한 배려로 모든 안전장비와 환경을 점검하세요.',
        specific: '작업 전후 안전장비의 상태를 꼼꼼히 점검하고, 작업 환경의 작은 변화도 놓치지 마세요. 동료들의 안전도 함께 챙기세요.'
    },
    'ESTJ': {
        general: '체계적인 관리로 작업장 안전을 총괄하세요.',
        specific: '안전 관리 시스템을 체계적으로 운영하고, 정기적인 안전 점검과 교육을 통해 사고를 예방하세요. 명확한 지시로 팀을 이끄세요.'
    },
    'ESFJ': {
        general: '팀원들과의 소통을 통해 안전 정보를 공유하세요.',
        specific: '동료들과 안전에 관한 정보를 적극적으로 공유하고, 서로의 안전 상태를 확인하며 작업하세요. 팀워크로 안전사고를 예방하세요.'
    },
    'ISTP': {
        general: '실용적 접근으로 장비와 도구의 안전성을 확인하세요.',
        specific: '장비의 작동 상태를 직접 확인하고, 도구의 안전성을 실제로 점검하세요. 손으로 만져보고 눈으로 확인하는 실용적 점검이 중요합니다.'
    },
    'ISFP': {
        general: '조용히 관찰하며 위험 요소를 찾아내는 능력을 활용하세요.',
        specific: '작업 환경을 조용히 관찰하여 다른 사람이 놓칠 수 있는 위험 요소를 찾아내세요. 자신만의 페이스로 안전하게 작업하세요.'
    },
    'ESTP': {
        general: '현장 감각을 살려 즉각적인 위험 상황에 대응하세요.',
        specific: '순간적인 판단력을 활용하여 위험 상황에 빠르게 대응하세요. 하지만 성급한 행동보다는 안전을 우선시하여 신중하게 판단하세요.'
    },
    'ESFP': {
        general: '밝은 에너지로 안전한 작업 분위기를 만들어가세요.',
        specific: '즐거운 분위기로 작업하되 안전에는 절대 소홀하지 마세요. 동료들과 소통하며 서로의 안전을 확인하고 격려하세요.'
    }
};

// 전기 정비 작업 안전 요소들
const electricalSafetyElements = {
    equipment: ['절연장갑', '안전모', '안전화', '안전벨트', '절연공구', '측정기', '접지선', '차단기'],
    procedures: ['전원차단', '잠금태그아웃', '전압측정', '접지확인', '절연저항측정', '회로도확인', '작업허가서', '안전브리핑'],
    risks: ['감전', '화재', '폭발', '아크플래시', '단락', '과전류', '누전', '정전기'],
    environments: ['고온', '습도', '분진', '가스', '밀폐공간', '고소', '소음', '진동'],
    teamwork: ['상호확인', '신호수', '비상연락', '응급처치', '대피경로', '소화기위치', '구급함', '안전교육']
};

// 운세 톤 변화 요소들
const fortuneTones = {
    positive: ['길한', '좋은', '밝은', '순조로운', '안정적인', '평화로운', '활기찬', '희망적인'],
    caution: ['신중한', '조심스러운', '차분한', '세심한', '주의깊은', '안전한', '꼼꼼한', '철저한'],
    energy: ['역동적인', '활발한', '적극적인', '열정적인', '도전적인', '창의적인', '혁신적인', '진취적인']
};

// 행운 당첨 관리
let monthlyWinners = JSON.parse(localStorage.getItem('monthlyWinners') || '[]');
let currentMonth = new Date().getMonth();

// 월이 바뀌면 당첨자 목록 초기화
if (localStorage.getItem('lastMonth') != currentMonth) {
    monthlyWinners = [];
    localStorage.setItem('lastMonth', currentMonth);
    localStorage.setItem('monthlyWinners', JSON.stringify(monthlyWinners));
}

// 무작위 요소 선택 함수
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 무작위 시드 생성 (시간 기반)
function generateSeed(birthdate, mbti) {
    const now = new Date();
    const timeString = now.getHours().toString() + now.getMinutes().toString();
    const dateString = now.getDate().toString() + now.getMonth().toString();
    return parseInt(birthdate.slice(-2) + mbti.charCodeAt(0) + timeString + dateString) % 1000;
}

// AI 추론 방식 운세 생성
function generateAIFortune(zodiac, mbti, seed) {
    const traits = zodiacTraits[zodiac];
    const mbtiInfo = mbtiSafetyAdvice[mbti];

    // 시드 기반 무작위성
    const randomIndex = seed % 3;
    const toneKey = Object.keys(fortuneTones)[randomIndex];
    const tone = getRandomElement(fortuneTones[toneKey]);

    const personality = getRandomElement(traits.personality);
    const workStyle = getRandomElement(traits.workStyle);
    const risk = getRandomElement(traits.risks);

    // 동적 운세 생성
    const fortuneTemplates = [
        `오늘은 ${tone} 기운이 감도는 날입니다. ${zodiac}띠의 ${personality} 특성을 살려 작업에 임하세요.`,
        `${personality}한 성향이 빛나는 하루입니다. ${workStyle}에 집중하면 좋은 결과가 있을 것입니다.`,
        `${tone} 에너지가 넘치는 날이지만, ${risk} 경향을 주의하며 신중하게 행동하세요.`,
        `${zodiac}띠 특유의 ${personality} 능력이 발휘되는 시기입니다. ${workStyle} 방식으로 접근해보세요.`
    ];

    return getRandomElement(fortuneTemplates);
}

// AI 추론 방식 안전 조언 생성
function generateAISafetyAdvice(zodiac, mbti, seed) {
    const traits = zodiacTraits[zodiac];
    const mbtiInfo = mbtiSafetyAdvice[mbti];

    // 무작위 안전 요소 선택
    const equipment = getRandomElement(electricalSafetyElements.equipment);
    const procedure = getRandomElement(electricalSafetyElements.procedures);
    const risk = getRandomElement(electricalSafetyElements.risks);
    const environment = getRandomElement(electricalSafetyElements.environments);
    const teamwork = getRandomElement(electricalSafetyElements.teamwork);

    const zodiacPersonality = getRandomElement(traits.personality);
    const zodiacRisk = getRandomElement(traits.risks);

    // MBTI 첫 글자에 따른 접근 방식
    const mbtiApproach = mbti[0] === 'E' ? '동료들과 소통하며' : '개인적으로 집중하여';
    const mbtiStyle = mbti[1] === 'S' ? '실무적으로' : '이론적으로';
    const mbtiDecision = mbti[2] === 'T' ? '논리적 판단으로' : '상황을 고려하여';
    const mbtiAction = mbti[3] === 'J' ? '계획적으로' : '유연하게';

    // 동적 안전 조언 생성
    const safetyTemplates = [
        `${zodiac}띠의 ${zodiacPersonality} 특성을 활용하여 ${equipment} 점검을 ${mbtiStyle} 수행하세요. ${zodiacRisk} 경향을 주의하며 ${procedure} 절차를 철저히 지키세요.`,
        `${mbtiApproach} ${risk} 위험을 예방하고, ${mbtiDecision} ${environment} 환경에서의 안전을 확보하세요. ${teamwork} 활동을 ${mbtiAction} 진행하는 것이 중요합니다.`,
        `오늘은 ${zodiacPersonality}한 접근이 필요한 날입니다. ${equipment}와 ${procedure}에 특히 신경쓰고, ${mbtiStyle} ${risk} 위험 요소를 분석하세요.`,
        `${mbti} 성격의 장점을 살려 ${mbtiApproach} 작업하되, ${zodiacRisk} 위험을 피하기 위해 ${equipment} 사용과 ${procedure} 준수를 ${mbtiAction} 실행하세요.`
    ];

    return getRandomElement(safetyTemplates);
}

function getZodiac(birthdate) {
    // 6자리 생년월일 처리 (YYMMDD)
    if (birthdate.length !== 6) {
        throw new Error('생년월일은 6자리로 입력해주세요.');
    }

    let year = parseInt(birthdate.substring(0, 2));

    // 2자리 연도를 4자리로 변환 (00-30은 2000년대, 31-99는 1900년대로 가정)
    if (year <= 30) {
        year += 2000;
    } else {
        year += 1900;
    }

    // 12지 동물 순서 (1900년 = 쥐띠 기준)
    // 1900년부터 시작하여 12년 주기로 반복
    const zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

    // 1900년을 기준으로 계산 (1900년 = 쥐띠)
    const zodiacIndex = (year - 1900) % 12;
    return zodiacAnimals[zodiacIndex];
}

function getFortune() {
    const birthdate = document.getElementById('birthdate').value;
    const mbti = document.getElementById('mbti').value;

    if (!birthdate || !mbti) {
        alert('생년월일과 MBTI를 모두 입력해주세요.');
        return;
    }

    // 입력값 검증
    if (birthdate.length !== 6) {
        alert('생년월일을 6자리로 정확히 입력해주세요.');
        return;
    }

    // 새로운 페이지로 이동 (URL 파라미터로 데이터 전달)
    const params = new URLSearchParams({
        birthdate: birthdate,
        mbti: mbti
    });

    window.location.href = `result.html?${params.toString()}`;
}

// 추가 안전 팁 생성 함수
function generateAdditionalSafetyTips(zodiac, mbti, seed) {
    const traits = zodiacTraits[zodiac];
    const equipment = getRandomElement(electricalSafetyElements.equipment);
    const procedure = getRandomElement(electricalSafetyElements.procedures);
    const environment = getRandomElement(electricalSafetyElements.environments);

    const tipTemplates = [
        `${zodiac}띠의 특성상 ${environment} 환경에서 ${equipment} 사용 시 각별한 주의가 필요합니다.`,
        `${mbti} 성격은 ${procedure} 과정에서 강점을 보이니 이를 적극 활용하세요.`,
        `오늘은 특히 ${getRandomElement(traits.personality)} 성향을 살려 안전 작업에 집중하는 것이 좋겠습니다.`,
        `${getRandomElement(electricalSafetyElements.risks)} 위험 요소에 대해 ${getRandomElement(traits.workStyle)} 방식으로 대응하세요.`
    ];

    return getRandomElement(tipTemplates);
}

// 행운 버튼 클릭 횟수 추적
let luckButtonClicked = false;

function tryLuck() {
    // 이미 클릭했는지 확인
    if (luckButtonClicked) {
        alert('과욕은 불행을 부릅니다');
        return;
    }

    // 첫 번째 클릭으로 표시
    luckButtonClicked = true;

    // 이미 8명이 당첨되었는지 확인
    if (monthlyWinners.length >= 8) {
        alert('이번 달 행운의 주인공은 이미 모두 선정되었습니다. 다음 달을 기대해주세요!');
        return;
    }

    // 1/300 확률 계산
    const random = Math.random();
    const isWinner = random < (1 / 1);

    if (isWinner) {
        monthlyWinners.push(new Date().toISOString());
        localStorage.setItem('monthlyWinners', JSON.stringify(monthlyWinners));
        document.getElementById('luck-modal').classList.remove('hidden');
    } else {
        alert('아쉽게도 이번엔 행운이 함께하지 않았네요. 다음 기회에 도전해보세요!');
    }
}

function closeLuckModal() {
    document.getElementById('luck-modal').classList.add('hidden');
}

function showNameInput() {
    document.getElementById('luck-modal').classList.add('hidden');
    document.getElementById('name-input-modal').classList.remove('hidden');
    
    // 이름 입력 필드에 포커스
    setTimeout(() => {
        document.getElementById('winner-name').focus();
    }, 100);
}

function showPrizeInfo() {
    const winnerName = document.getElementById('winner-name').value.trim();
    
    if (!winnerName) {
        alert('성함을 입력해주세요.');
        return;
    }
    
    // 상품권 안내 페이지로 이동
    const params = new URLSearchParams({
        name: winnerName
    });
    
    window.location.href = `prize.html?${params.toString()}`;
}

// 페이지 로드 시 입력 검증 추가
window.onload = function () {
    const birthdateInput = document.getElementById('birthdate');

    // 숫자만 입력 가능하도록 제한
    birthdateInput.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (e.target.value.length > 6) {
            e.target.value = e.target.value.slice(0, 6);
        }
    });

    // 포커스 아웃 시 유효성 검사
    birthdateInput.addEventListener('blur', function (e) {
        const value = e.target.value;
        if (value.length === 6) {
            const month = parseInt(value.substring(2, 4));
            const day = parseInt(value.substring(4, 6));

            if (month < 1 || month > 12) {
                alert('올바른 월을 입력해주세요 (01-12)');
                e.target.focus();
                return;
            }

            if (day < 1 || day > 31) {
                alert('올바른 일을 입력해주세요 (01-31)');
                e.target.focus();
                return;
            }
        }
    });
};
